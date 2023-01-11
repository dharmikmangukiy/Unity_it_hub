import React, { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Select,
  KeyboardDatePicker,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import CommonTable from "../../customComponet/CommonTable";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  BootstrapInput,
  ColorButton,
  ColorButton1,
  ColorButton2,
} from "../../customComponet/CustomElement";
import { IsApprove, Url } from "../../../global.js";
import axios from "axios";
import CustomImageModal from "../../customComponet/CustomImageModal";
import TopButton from "../../customComponet/TopButton";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Notification = () => {
  const [refresh, setRefresh] = React.useState(false);
  const navigate = useNavigate();
  const [open1, setOpen1] = React.useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [selectedRows, setSelectedRows] = React.useState({
    select: [],
  });
  const [isLoader1, setIsLoader1] = useState(false);

  const [makeAll, SetMakeAll] = useState(false);
  const column = [
    {
      name: "SR.NO",
      selector: (row) => {
        return <span title={row.sr_no}>{row.sr_no}</span>;
      },
      wrap: true,
      reorder: true,
      grow: 0.01,
    },
    {
      name: "Type",
      selector: (row) => {
        return (
          <span title={row.notification_type}>{row.notification_type}</span>
        );
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "Description",
      selector: (row) => {
        return <span title={row.description}>{row.description}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 1.5,
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <span title={row.description}>
            {row.is_read == "1" ? (
              ""
            ) : isLoader1 == true &&
              row.notification_id == selectedRows.select ? (
              <ColorButton disabled>
                <svg
                  class="spinner"
                  style={{ position: "unset" }}
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
                sx={{ padding: "7px 16px !important" }}
                className="responsiveButton"
                onClick={() => {
                  SetMakeAll(false);
                  selectedRows.select = row.notification_id;
                  setSelectedRows({ ...selectedRows });
                  // setOpen1(true);
                  readAll();
                }}
              >
                Mark as Read
              </ColorButton>
            )}{" "}
          </span>
        );
      },
      wrap: true,
      reorder: true,
      grow: 0.5,
    },
  ];
  const handleClose = () => {
    setOpen1(false);
  };
  const readAll = () => {
    const param = new FormData();

    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    if (makeAll) {
      param.append("action", "mark_as_read_all");
      setIsLoader(true);
    } else {
      setIsLoader1(true);
      param.append("action", "mark_as_read");
      param.append("notification_id", selectedRows.select);
    }

    axios
      .post(`${Url}/ajaxfiles/notifications_manage.php`, param)
      .then((res) => {
        if (res.data.status == "error") {
          toast.error(res.data.message);
          setIsLoader(false);
        } else {
          setIsLoader(false);
          setRefresh(!refresh);
          setIsLoader1(false);

          setOpen1(false);
        }
      });
  };
  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item sm={12}></Grid>
              <Grid item xl={1}></Grid>
              <Grid item md={12} lg={12} xl={10}>
                {/* <TopButton /> */}
                <p className="main-heading">Notification</p>

                <Paper
                  elevation={2}
                  style={{ borderRadius: "10px" }}
                  className="pending-all-15px"
                >
                  <Grid container spacing={2}>
                    <Grid item sm={6} md={3}>
                      <FormControl fullWidth={true}>
                        <label className="small font-weight-bold text-dark">
                          From
                        </label>
                        <BootstrapInput
                          type="date"
                          onChange={(e) => {
                            filterData.start_date = e.target.value;
                            setFilterData({ ...filterData });
                          }}
                        ></BootstrapInput>
                      </FormControl>
                    </Grid>
                    <Grid item sm={6} md={3}>
                      <FormControl fullWidth={true}>
                        <label className="small font-weight-bold text-dark">
                          To
                        </label>
                        <BootstrapInput
                          type="date"
                          onChange={(e) => {
                            filterData.end_date = e.target.value;
                            setFilterData({ ...filterData });
                          }}
                        ></BootstrapInput>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Paper>
                <br />
                <Paper
                  elevation={2}
                  style={{ borderRadius: "10px" }}
                  className="pending-all-15px"
                >
                  <ColorButton
                    onClick={() => {
                      setOpen1(true);
                      SetMakeAll(true);
                    }}
                  >
                    Mark All Read
                  </ColorButton>
                  <CommonTable
                    url={`${Url}/datatable/notification_list.php`}
                    column={column}
                    sort="2"
                    param={filterData}
                    refresh={refresh}
                    notification={true}
                  />
                </Paper>
              </Grid>
            </Grid>
          </div>
          <Dialog open={open1} onClose={handleClose}>
            <DialogTitle sx={{ borderBottom: "0px solid #e6e7f1 !important" }}>
              Are you sure?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Do you want to mark as read?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <ColorButton1 onClick={handleClose}>No</ColorButton1>
              {isLoader == true ? (
                <ColorButton2 disabled>
                  <svg
                    class="spinner"
                    style={{ position: "unset" }}
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
                </ColorButton2>
              ) : (
                <ColorButton2 onClick={readAll}>
                  {makeAll ? "Mark all Read" : "Mark as Read"}
                </ColorButton2>
              )}
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Notification;
