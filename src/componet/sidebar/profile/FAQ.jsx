import "./faq_editor.css";
import React, { useState } from "react";
import {
  Button,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CommonTable from "../common/CommonTable";
import CommonFilter from "../common/CommonFilter";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
import { Url } from "../global";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {/* {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null} */}
    </DialogTitle>
  );
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const FAQEditor = () => {
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("sm");
  const [dialogTitle, setDialogTitle] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [form, setForm] = useState({
    question: "",
    answer: "",
    order: "",
    isActive: false,
    isLoader: "",
    faqId: "",
  });
  const [searchBy, setSearchBy] = useState([
    {
      label: "QUESTIONS",
      value: false,
      name: "questions",
    },
    {
      label: "ANSWER",
      value: false,
      name: "answer",
    },
    {
      label: "DATE",
      value: false,
      name: "date",
    },
  ]);

  const column = [
    {
      name: "SR.NO",
      selector: (row) => {
        return <span>{row.sr_no}</span>;
      },
      sortable: true,
      wrap: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "QUESTIONS",
      selector: (row) => {
        return <span title={row.question}>{row.question}</span>;
      },
      sortable: true,
      wrap: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "ANSWER",
      selector: (row) => {
        return <span title={row.answer}>{row.answer}</span>;
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 1,
    },
    {
      name: "STATUS",
      selector: (row) => {
        return (
          <span
            className={`status-${row.status == "1" ? "active" : "in-active"}`}
          >
            {row.status == "1" ? "Active" : "In-Active"}
          </span>
        );
      },
      sortable: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "DATE",
      selector: (row) => {
        return <span title={row.added_datetime}>{row.added_datetime}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => {
        return (
          <div className="actionButtonGroup">
            <Button
              className="btn-edit"
              onClick={(event) => editFaqDetails(event, row.faq_id)}
              {...row}
              style={{ color: "rgb(144 145 139)" }}
            >
              <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
            </Button>
            <Button
              className="btn-close"
              onClick={(event) => actionMenuPopup(event, row.faq_id)}
              {...row}
              style={{ color: "rgb(144 145 139)" }}
            >
              <i class="fa fa-times" aria-hidden="true"></i>
            </Button>
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      grow: 0.5,
    },
  ];

  const editFaqDetails = async (e, id) => {
    const param = new FormData();
    param.append("action", "edit_faq");
    param.append("faq_id", id);
    await axios
      .post(`${Url}/admin/ajaxfiles/faq_manage.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          Toast("error", res.data.message);
        } else {
          setForm((prevalue) => {
            return {
              ...prevalue,
              question: res.data.question,
              answer: res.data.answer,
              order: res.data.display_order,
              isActive: res.data.active_status == "1" ? true : false,
              faqId: id,
            };
          });
          setDialogTitle("Edit FAQ");
          setOpen(true);
        }
      });
  };

  const [openTableMenus, setOpenTableMenus] = useState([]);

  const handleContextClick = (event, index) => {
    console.log(event.currentTarget.getAttribute("id"), index);
    let tableMenus = [...openTableMenus];
    tableMenus[index] = event.currentTarget;
    setOpenTableMenus(tableMenus);
  };

  const actionMenuPopup = (e, index) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>Do you want to delete this?</p>
            <div className="confirmation-alert-action-button">
              <Button
                variant="contained"
                className="cancelButton"
                onClick={onClose}
              >
                No
              </Button>
              <Button
                variant="contained"
                className="btn-gradient btn-danger"
                onClick={() => {
                  onClose();
                }}
              >
                Yes, Delete it!
              </Button>
            </div>
          </div>
        );
      },
    });
  };

  const handleClickOpen = (e) => {
    setForm({
      question: "",
      answer: "",
      order: "",
      isActive: false,
      isLoader: "",
      faqId: "",
    });
    setDialogTitle("Add FAQ");
    setOpen(true);
  };

  const manageContent = () => {
    if (dialogTitle == "Add FAQ") {
      return (
        <div>
          <div className="margeField">
            <TextField
              label="Question"
              variant="standard"
              sx={{ width: "100%" }}
              name="question"
              onChange={input}
            />
          </div>
          <br />
          <div className="margeField">
            <TextField
              multiline
              label="Answer"
              variant="standard"
              sx={{ width: "100%" }}
              name="answer"
              onChange={input}
            />
          </div>
          <br />
          <div className="margeField">
            <TextField
              label="Order"
              variant="standard"
              sx={{ width: "100%" }}
              name="order"
              onChange={input}
            />
            <FormControlLabel
              control={
                // <Checkbox checked={true} name="declaration" size="small"/>
                <Checkbox name="isActive" size="small" onChange={input} />
              }
              label="Active"
            />
          </div>
        </div>
      );
    } else if (dialogTitle == "Edit FAQ") {
      return (
        <div>
          <div className="margeField">
            <TextField
              label="Question"
              variant="standard"
              sx={{ width: "100%" }}
              name="question"
              value={form.question}
              onChange={input}
            />
          </div>
          <br />
          <div className="margeField">
            <TextField
              multiline
              label="Answer"
              variant="standard"
              sx={{ width: "100%" }}
              name="answer"
              value={form.answer}
              onChange={input}
            />
          </div>
          <br />
          <div className="margeField">
            <TextField
              label="Order"
              variant="standard"
              sx={{ width: "100%" }}
              name="order"
              value={form.order}
              onChange={input}
            />
            <FormControlLabel
              control={
                // <Checkbox checked={true} name="declaration" size="small"/>
                <Checkbox
                  name="isActive"
                  size="small"
                  checked={form.isActive}
                  onChange={input}
                />
              }
              label="Active"
            />
          </div>
        </div>
      );
    } else if (dialogTitle == "View") {
      return <div></div>;
    } else if (dialogTitle == "Reject") {
      return (
        <div>
          <div className="deposit-action-popup-text">
            <label>Are you want to sure reject this deposit ?</label>
          </div>
        </div>
      );
    } else if (dialogTitle == "Approve") {
      return (
        <div>
          <div className="deposit-action-popup-text">
            <label>Are you want to sure approve this deposit ?</label>
          </div>
        </div>
      );
    }
  };

  const manageDialogActionButton = () => {
    if (dialogTitle == "Add FAQ" || dialogTitle == "Edit FAQ") {
      return (
        <div className="dialogMultipleActionButton">
          <Button
            variant="contained"
            className="cancelButton"
            onClick={handleClose}
          >
            Cancel
          </Button>
          {form.isLoader == true ? (
            <Button
              variant="contained"
              className="btn-gradient btn-success"
              disabled
            >
              <svg class="spinner" viewBox="0 0 50 50">
                <circle
                  class="path"
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke-width="5"
                ></circle>
              </svg>
            </Button>
          ) : (
            <Button
              variant="contained"
              className="btn-gradient btn-success"
              onClick={formSubmit}
            >
              Add
            </Button>
          )}
        </div>
      );
    } else if (dialogTitle == "Reject") {
      return (
        <div className="dialogMultipleActionButton">
          <Button
            variant="contained"
            className="cancelButton"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button variant="contained" className="btn-gradient btn-danger">
            Reject
          </Button>
        </div>
      );
    } else if (dialogTitle == "Approve") {
      return (
        <div className="dialogMultipleActionButton">
          <Button
            variant="contained"
            className="cancelButton"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button variant="contained" className="btn-gradient btn-success">
            Approve
          </Button>
        </div>
      );
    }
  };

  const formSubmit = async () => {
    console.log(form);
    if (form.question == "") {
      Toast("error", "Please enter question");
    } else if (form.answer == "") {
      Toast("error", "Please enter answer");
    } else if (form.order == "") {
      Toast("error", "Please enter order");
    } else {
      form.isLoader = true;
      setForm({ ...form });
      const param = new FormData();
      if (form.faqId == "") {
        param.append("action", "add_faq");
      } else {
        param.append("faq_id", form.faqId);
        param.append("action", "update_faq");
      }
      param.append("question", form.question);
      param.append("answer", form.answer);
      param.append("display_order", form.order);
      param.append("status", form.isActive);
      await axios
        .post(`${Url}/admin/ajaxfiles/faq_manage.php`, param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            navigate("/");
          }
          form.isLoader = false;
          setForm({ ...form });
          if (res.data.status == "error") {
            Toast("error", res.data.message);
          } else {
            setRefresh(!refresh);
            Toast("success", res.data.message);
            setOpen(false);
            setForm({
              question: "",
              answer: "",
              order: "",
              isActive: false,
              isLoader: "",
              faqId: "",
            });
          }
        });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const input = (event) => {
    var { name, value } = event.target;
    if (event.target.getAttribute) {
      if (event.target.getAttribute("type") == "checkbox") {
        value = event.target.checked;
      }
    }

    setForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item sm={11}></Grid>
              <Grid item xl={1}></Grid>
              <Grid item xl={10} md={12} lg={12}>
                {/* <Grid item md={12} lg={12} xl={12}> */}
                <p className="main-heading">FAQ Editor</p>
                <CommonFilter search={searchBy} />
                <br />
                <Paper
                  elevation={2}
                  style={{ borderRadius: "10px" }}
                  className="pending-all-15px"
                >
                  <div className="actionGroupButton">
                    <Button
                      variant="contained"
                      className="add-faq"
                      onClick={handleClickOpen}
                    >
                      Add
                    </Button>
                  </div>
                  <br />
                  <CardContent className="py-3">
                    <Grid container spacing={2}>
                      <Grid item sm={12} md={12} lg={12}>
                        <CommonTable
                          url={`${Url}/admin/datatable/faq_list.php`}
                          column={column}
                          sort="0"
                          refresh={refresh}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Paper>

                <BootstrapDialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={open}
                  fullWidth={fullWidth}
                  maxWidth={maxWidth}
                >
                  <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                  >
                    {dialogTitle}
                  </BootstrapDialogTitle>
                  <DialogContent dividers>{manageContent()}</DialogContent>
                  <DialogActions>{manageDialogActionButton()}</DialogActions>
                </BootstrapDialog>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQEditor;
