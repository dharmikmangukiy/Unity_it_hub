import React, { useEffect, useState } from "react";
import {
  Button,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import TopButton from "../../customComponet/TopButton";
import CommonTable from "../../customComponet/CommonTable";
import { IsApprove, Url } from "../../../global";
import {
  BootstrapInput,
  ColorButton,
} from "../../customComponet/CustomElement";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./ticket.css";
import { useNavigate } from "react-router-dom";
import NewDate from "../../commonComponet/NewDate";

const Ticket = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [infoTrue, setinfoTrue] = useState({
    title: false,
    subject: false,
    description: false,
    file: false,
  });
  const [form, setForm] = useState({
    title: "",
    subject: "",
    description: "",
    file: "",
    isLoader: false,
    refresh: false,
  });
  toast.configure();

  const column = [
    {
      name: "Ticket ID",
      selector: (row) => row.ticketChatID,
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "Ticket Subject",
      selector: (row) => {
        return <span title={row.ticketTitle}>{row.ticketTitle}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "Ticket Type",
      selector: (row) => {
        return <span title={row.subject}>{row.subject}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "Message",
      selector: (row) => {
        return <span title={row.ticketBody}>{row.ticketBody}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "Status",
      selector: (row) => {
        return <span title={row.status}>{row.status}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "Date",
      selector: (row) => {
        return (
          <span title={row.ticketDateTime}>
            <NewDate newDate={row.ticketDateTime} />
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.7,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => {
        return (
          <div>
            <Button
              onClick={(e) => {
                chatSection(row);
              }}
            >
              View
            </Button>
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setForm({ ...form, file: e.target.files[0] });
    setSelectedFile(e.target.files[0]);
  };
  const trueFalse = (event) => {
    var { name, value } = event.target;
    setinfoTrue((prevalue) => {
      return {
        ...prevalue,
        [name]: true,
      };
    });
  };

  const submitForm = async () => {
    if (form.title == "") {
      toast.error("Please enter ticket title");
    } else if (form.subject == "") {
      toast.error("Please select ticket subject");
    } else if (form.description == "") {
      toast.error("Please enter ticket description");
    } else {
      form.isLoader = true;
      setForm({ ...form });
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      param.append("ticketTitle", form.title);
      param.append("subject", form.subject);
      param.append("ticketBody", form.description);
      if (form.file != "") {
        param.append("attachment", form.file);
      }
      await axios
        .post(`${Url}/ajaxfiles/customer_support.php`, param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            navigate("/");
          }
          form.isLoader = false;
          setForm({ ...form });
          if (res.data.status == "error") {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            setSelectedFile(undefined);
            console.log(res.data);
            setinfoTrue({
              title: false,
              subject: false,
              description: false,
              file: false,
            });
            setForm({
              title: "",
              subject: "",
              description: "",
              file: "",
              isLoader: false,
              refresh: !form.refresh,
            });
          }
        });
    }
  };

  const chatSection = (data) => {
    console.log(data);
    navigate(`/view_ticket/${data.ticketChatID}`);
  };

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item sm={12}></Grid>
              <Grid item xl={1}></Grid>
              <Grid item xl={10} md={12} lg={12}>
                {/* <TopButton /> */}
                <Grid container>
                  <Grid item md={12}>
                    <Paper
                      elevation={1}
                      style={{ borderRadius: "10px" }}
                      className="w-100 mb-5"
                    >
                      <div className="card-header">
                        <h5 className="font-weight-bold mb-0 text-dark">
                          Create Ticket
                        </h5>
                      </div>
                      <div className="divider"></div>
                      <div className="card-body position-relative pt-0">
                        <Grid container spacing={3}>
                          <Grid
                            item
                            md={12}
                            className="d-flex position-relative mh-150 w-100"
                          >
                            <Paper
                              elevation={0}
                              style={{ borderRadius: "10px" }}
                              className="w-100"
                            >
                              <CardContent className="py-3">
                                <Grid container spacing={2}>
                                  <Grid item sm={6} md={6}>
                                    <FormControl
                                      fullWidth={true}
                                      error={form.title == "" ? true : false}
                                    >
                                      <label className="small font-weight-bold text-dark">
                                        {" "}
                                        Ticket Subject
                                      </label>
                                      <BootstrapInput
                                        name="title"
                                        onChange={(e) => {
                                          setForm({
                                            ...form,
                                            title: e.target.value,
                                          });
                                        }}
                                        value={form.title}
                                        displayEmpty
                                        inputProps={{
                                          "aria-label": "Without label",
                                        }}
                                        onBlur={trueFalse}
                                      />
                                      {form.title == "" &&
                                      infoTrue.title == true ? (
                                        <FormHelperText>
                                          Please Enter Title
                                        </FormHelperText>
                                      ) : (
                                        ""
                                      )}
                                    </FormControl>
                                  </Grid>
                                  <Grid item sm={6} md={6}>
                                    <FormControl
                                      fullWidth={true}
                                      error={form.subject == "" ? true : false}
                                    >
                                      <label className="small font-weight-bold text-dark">
                                        {" "}
                                        Category
                                      </label>
                                      <Select
                                        displayEmpty
                                        inputProps={{
                                          "aria-label": "Without label",
                                        }}
                                        name="subject"
                                        input={<BootstrapInput />}
                                        value={form.subject}
                                        onChange={(e) => {
                                          setForm({
                                            ...form,
                                            subject: e.target.value,
                                          });
                                        }}
                                        onBlur={trueFalse}
                                      >
                                        <MenuItem value="">
                                          Select option
                                        </MenuItem>

                                        <MenuItem value="Trading Operations">
                                          Trading Operations
                                        </MenuItem>
                                        <MenuItem value="Non-trading Operations">
                                          Non-trading Operations
                                        </MenuItem>
                                        <MenuItem value="Account Opening">
                                          Account Opening
                                        </MenuItem>
                                        <MenuItem value="Compliance Policies/requirments">
                                          Compliance Policies/requirments
                                        </MenuItem>
                                        <MenuItem value="Deposit and withdrawals">
                                          Deposit and withdrawals
                                        </MenuItem>
                                      </Select>
                                      {form.subject == "" &&
                                      infoTrue.subject == true ? (
                                        <FormHelperText>
                                          Please Select Subject
                                        </FormHelperText>
                                      ) : (
                                        ""
                                      )}
                                    </FormControl>
                                  </Grid>
                                  <Grid item sm={6} md={6}>
                                    <FormControl
                                      fullWidth={true}
                                      error={
                                        form.description == "" ? true : false
                                      }
                                    >
                                      <label className="small font-weight-bold text-dark">
                                        {" "}
                                        Description
                                      </label>
                                      <BootstrapInput
                                        name="description"
                                        type="textarea"
                                        value={form.description}
                                        onChange={(e) => {
                                          if (e.target.value.length <= 400) {
                                            setForm({
                                              ...form,
                                              description: e.target.value,
                                            });
                                          }
                                        }}
                                        displayEmpty
                                        inputProps={{
                                          "aria-label": "Without label",
                                        }}
                                        onBlur={trueFalse}
                                      />
                                      <div
                                        className="d-flex"
                                        style={{
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        {(form.description == "" ||
                                          form.description.length == 400) &&
                                        infoTrue.description == true ? (
                                          <FormHelperText>
                                            {form.description == ""
                                              ? "Please Enter Description"
                                              : "You have exceeded the limit of 400 characters"}
                                          </FormHelperText>
                                        ) : (
                                          ""
                                        )}
                                        <span>
                                          {form.description.length}/400
                                        </span>
                                      </div>
                                    </FormControl>
                                  </Grid>
                                  <Grid item sm={6} md={6}>
                                    <p></p>
                                    <label
                                      htmlFor="contained-button-file"
                                      className="ticket-file-upload"
                                    >
                                      <Input
                                        accept="image/x-png,image/gif,image/jpeg"
                                        id="contained-button-file"
                                        multiple
                                        type="file"
                                        onChange={onSelectFile}
                                      />
                                      {selectedFile ? (
                                        <img
                                          src={preview}
                                          className="deposit-upload-image-preview"
                                        />
                                      ) : (
                                        <Button
                                          className="site-button-color"
                                          variant="contained"
                                          component="span"
                                        >
                                          <i className="material-icons">
                                            backup
                                          </i>
                                          &nbsp;Upload
                                        </Button>
                                      )}
                                    </label>
                                  </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                  <Grid item sm={12} md={12}>
                                    <div className="filter-submit">
                                      {form.isLoader ? (
                                        <ColorButton
                                          className="d-block ml-auto mb-3 mr-3 "
                                          sx={{
                                            display: "flex !important",
                                            justifyContent: "center",
                                            padding: "21px 64px",
                                          }}
                                          disabled
                                        >
                                          <svg
                                            class="spinner"
                                            viewBox="0 0 50 50"
                                          >
                                            <circle
                                              class="path"
                                              cx="25"
                                              cy="25"
                                              r="20"
                                              fill="none"
                                              stroke-width="5"
                                            ></circle>
                                          </svg>
                                        </ColorButton>
                                      ) : (
                                        <ColorButton
                                          className="d-block ml-auto mb-3 mr-3 "
                                          onClick={submitForm}
                                        >
                                          Sumbit
                                        </ColorButton>
                                      )}
                                    </div>
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </Paper>
                          </Grid>
                        </Grid>
                      </div>
                    </Paper>
                    <Paper
                      elevation={1}
                      style={{ borderRadius: "10px" }}
                      className="w-100 mb-5"
                    >
                      <div className="card-header">
                        <h5 className="font-weight-bold mb-0 text-dark">
                          Ticket List
                        </h5>
                      </div>
                      <div className="divider"></div>
                      <div className="card-body position-relative pt-0">
                        <Grid container spacing={3}>
                          <Grid
                            item
                            md={12}
                            className="d-flex position-relative mh-150 w-100"
                          >
                            <Paper
                              elevation={0}
                              style={{ borderRadius: "10px" }}
                              className="w-100"
                            >
                              <CommonTable
                                url={`${Url}/datatable/ticket_list.php`}
                                column={column}
                                sort="2"
                                refresh={form.refresh}
                              />
                            </Paper>
                          </Grid>
                        </Grid>
                      </div>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
