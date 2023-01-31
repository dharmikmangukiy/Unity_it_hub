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
  DialogContent,
  DialogTitle,
  Dialog,
} from "@mui/material";
import "./ibreport.css";
import CloseIcon from "@mui/icons-material/Close";
import CommonTable from "../../customComponet/CommonTable";
import { ColorButton } from "../../customComponet/CustomElement";
import { useNavigate } from "react-router-dom";
import { BootstrapInput } from "../../customComponet/CustomElement";
import { IsApprove, Url } from "../../../global.js";
import axios from "axios";
import CustomImageModal from "../../customComponet/CustomImageModal";
import TopButton from "../../customComponet/TopButton";
import NewDate from "../../commonComponet/NewDate";
import Toast from "../../commonComponet/Toast";

const IBCommissionHistory = () => {
  const [open, setOpen] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const navigate = useNavigate();
  const [openTableMenus, setOpenTableMenus] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [amount, setAmount] = useState("");

  const [resData, setResData] = useState({});
  const depositFilter = () => {
    console.log("dsa");
  };
  const onsubmit = () => {
    if (amount == "") {
      Toast("error", "Amount is required");
    } else {
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      param.append("amount", amount);
      axios
        .post(Url + "/ajaxfiles/insert_ib_commission_withdraw.php", param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            navigate("/");
          }
          if (res.data.status == "error") {
            Toast("error", res.data.message);
          } else {
            Toast("success", res.data.message);
            setOpen(false);
          }
        });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleContextClick = (event, index) => {
    console.log(event.currentTarget.getAttribute("id"), index);
    let tableMenus = [...openTableMenus];
    tableMenus[index] = event.currentTarget;
    setOpenTableMenus(tableMenus);
  };

  const handleContextClose = (index) => {
    let tableMenus = [...openTableMenus];
    tableMenus[index] = null;
    setOpenTableMenus(tableMenus);
  };

  const gotoProfile = (e) => {
    console.log("goto profile page", e);
    navigate("/master/" + e.user_id);
  };

  const column = [
    {
      name: "LOGIN NAME",
      selector: (row) => {
        return <span title={row.name}>{row.name}</span>;
      },
      // wrap: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "MT5 ID",
      selector: (row) => {
        return <span title={row.mt5_account_id}>{row.mt5_account_id}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "IB GROUP NAME",
      selector: (row) => {
        return <span title={row.ib_group_id}>{row.ib_group_id}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.6,
    },
    {
      name: "DATE",
      selector: (row) => {
        return (
          <span title={row.added_datetime}>
            <NewDate newDate={row.added_datetime} />
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.4,
    },
    {
      name: "TRADE NO.",
      selector: (row) => {
        return <span title={row.trade_no}>{row.trade_no}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "TYPE",
      selector: (row) => {
        return <span title={row.trade_type}>{row.trade_type}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    /* {
      name: "USER COMMENT",
      selector: (row) => {
        return (
          <span title={row.user_visible_password}>
            {row.user_visible_password}
          </span>
        );
      },
      sortable: true,
      reorder: true,
      grow: 1,
    }, */
    {
      name: "COMMISSION",
      selector: (row) => {
        return (
          <span title={row.ib_comission_amount}>{row.ib_comission_amount}</span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "LOT",
      selector: (row) => {
        return <span title={row.trade_volume}>{row.trade_volume}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "CLOSE COMMISSION",
      selector: (row) => {
        return (
          <span title={row.trade_close_price}>{row.trade_close_price}</span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
  ];

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item sm={11}></Grid>
              <Grid item xl={1}></Grid>
              <Grid item xl={10} md={12} lg={12}>
                {/* <TopButton /> */}
                <p className="main-heading">IB Commission History</p>
                <div className="ibcomhistory">
                  <div className="row1 boxSection">
                    <div className="card padding-9 animate fadeLeft boxsize">
                      <div className="row">
                        <div className="col s12 m12 text-align-center">
                          <h5 className="mb-0">{resData.total_lots}</h5>
                          <p className="no-margin">Total LOTS</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row1 boxSection">
                    <div className="card padding-9 animate fadeLeft boxsize">
                      <div className="row">
                        <div className="col s12 m12 text-align-center">
                          <h5 className="mb-0">{resData.earning}</h5>
                          <p className="no-margin">Total Earning</p>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="row1 boxSection">
                    <div className="card padding-9 animate fadeLeft boxsize">
                      <div className="row">
                        <div className="col s12 m12 text-align-center">
                          <h5 className="mb-0">{resData.balance}</h5>
                          <p className="no-margin">Available</p>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="row1 boxSection">
                    <div className="card padding-9 animate fadeLeft boxsize">
                      <div className="row">
                        <div className="col s12 m12 text-align-center">
                          <h5 className="mb-0">{resData.pending}</h5>
                          <p className="no-margin">pending</p>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="row1 boxSection">
                    <div className="card padding-9 animate fadeLeft boxsize">
                      <div className="row">
                        <div className="col s12 m12 text-align-center">
                          <h5 className="mb-0">{resData.withdaw}</h5>
                          <p className="no-margin">Withdrawal</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                          inputProps={{ max: "2022-04-13" }}
                          onChange={(e) =>
                            setFilterData({
                              ...filterData,
                              deposit_from: e.target.value,
                            })
                          }
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
                          onChange={(e) =>
                            setFilterData({
                              ...filterData,
                              deposit_to: e.target.value,
                            })
                          }
                        ></BootstrapInput>
                      </FormControl>
                    </Grid>

                    <Grid item sm={1} md={1}>
                      <ColorButton
                        className="d-block ml-auto mb-3 mr-3 btn-filter depositFilter"
                        onClick={(e) => setRefresh(!refresh)}
                      >
                        Filter
                      </ColorButton>
                    </Grid>
                    <Grid item sm={1} md={1}>
                      <ColorButton
                        className="d-block ml-auto mb-3 mr-3 btn-filter depositFilter"
                        onClick={(e) => setOpen(true)}
                      >
                        Withdrawal
                      </ColorButton>
                    </Grid>
                  </Grid>
                </Paper>
                <br />
                <Paper
                  elevation={2}
                  style={{ borderRadius: "10px" }}
                  className="pending-all-15px"
                >
                  <CommonTable
                    url={`${Url}/datatable/ib_commission_history.php`}
                    column={column}
                    sort="2"
                    filter={filterData}
                    setResData={setResData}
                    refresh={refresh}
                  />
                </Paper>
              </Grid>
            </Grid>
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            // aria-labelledby="alert-dialog-title"
            // aria-describedby="alert-dialog-description"
            style={{
              opacity: "1",
              transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            }}
            PaperProps={{
              sx: {
                width: "25%",
                maxWidth: "768px",
                borderRadius: "10px",
                elevation: "24",
                class: "border border-bottom-0",
              },
            }}
          >
            <DialogTitle
              id="alert-dialog-title"
              className="d-flex align-items-center p-3"
              style={{ borderBottom: "none" }}
            >
              {/* <ConfirmationNumberOutlinedIcon className="text-primary" /> */}
              <h5 className="ml-3 w-100 text-start mt-2 mb-2 font-weight-bold">
                IB Widthdraw
              </h5>
              <CloseIcon
                onClick={() => {
                  setOpen(false);
                }}
              />
            </DialogTitle>
            <DialogContent className="create-account-content ml-4">
              <Grid
                container
                spacing={2}
                className="MuiGrid-justify-xs-space-between mt-2"
              >
                <FormControl className="w-100">
                  <label
                    htmlFor=""
                    className="text-info font-weight-bold form-label-head w-100  required "
                  >
                    Amount
                  </label>
                  <BootstrapInput
                    // value={}
                    type="text"
                    name="amount"
                    onChange={(e) => {
                      if (!isNaN(Number(e.target.value))) {
                        setAmount(e.target.value);
                      } else if (e.target.value == "" || e.target.value == 0) {
                        setAmount(0);
                      }
                    }}
                    displayEmpty
                    // inputProps={{ "aria-label": "Without label" }}
                    className=""
                  />
                </FormControl>
              </Grid>
              <Grid
                container
                spacing={2}
                className="MuiGrid-justify-xs-space-between mt-4 displayflxend"
              >
                <ColorButton
                  onClick={onsubmit}
                  variant="contained"
                  size="medium"
                  className=" text-capitalize "
                >
                  Submit
                </ColorButton>
              </Grid>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default IBCommissionHistory;
