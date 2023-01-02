import React, { useState } from "react";
import { CardContent, Grid } from "@mui/material";
import TopButton from "../../customComponet/TopButton";
import { Paper } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import { ColorButton } from "../../customComponet/CustomElement";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OpenDemoModel from "../../customComponet/OpenDemoModel";
import { useNavigate } from "react-router-dom";
import { BootstrapInput } from "../../customComponet/CustomElement";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { IsApprove, Url } from "../../../global.js";
import "./account_list.css";
import CommonTable from "../../customComponet/CommonTable";

const BootstrapInput1 = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(0),
  },
  "& .MuiInputBase-input": {
    font: "inherit",
    color: "currentColor",
    width: "100%",
    border: "0",
    height: "1.1876em",
    margin: "0",
    display: "block",
    padding: "6px 0 7px",
    minWidth: "0",
    background: "none",
    boxSizing: "content-box",
    animationName: "mui-auto-fill-cancel",
    letterSpacing: "inherit",
  },
}));
// const BootstrapInput1 = styled(InputBase)(({ theme }) => ({
//   "label + &": {
//     marginTop: 0,
//   },
//   "& .MuiInputBase-input": {
//     borderRadius: 9,
//     position: "relative",
//     backgroundColor: theme.palette.background.paper,
//     border: "1px solid #ced4da",
//     fontSize: 16,
//     padding: "8px 26px 8px 10px",
//     transition: theme.transitions.create(["border-color", "box-shadow"]),
//     // Use the system font instead of the default Roboto font.
//     fontFamily: [
//       "-apple-system",
//       "BlinkMacSystemFont",
//       '"Segoe UI"',
//       "Roboto",
//       '"Helvetica Neue"',
//       "Arial",
//       "sans-serif",
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(","),
//     "&:focus": {
//       borderRadius: 9,
//       borderColor: "#80bdff",
//     },
//   },
// }));
export const DemoAccounts = () => {
  const navigate = useNavigate();
  const [Dopen, setDOpen] = React.useState(false);
  const [Drefresh, setDrefresh] = React.useState(false);
  const [clOpen, setCLOpen] = React.useState(false);
  const descriptionElementRef = React.useRef(null);
  const [accountDetails, setAccountDetails] = React.useState({});
  const [leveragesList, setLeveragesList] = React.useState({
    data: [],
  });
  const [mt5AccountList, setMT5AccountList] = React.useState({
    data: [],
  });
  toast.configure();
  React.useEffect(() => {
    if (clOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [clOpen]);
  // React.useEffect(() => {
  //   fetchMT5AccountList();
  // }, []);
  React.useEffect(() => {
    if (Drefresh == false) {
      fetchMT5AccountList();
    }
  }, [Drefresh]);
  const [accountType, setAccountType] = useState(0);
  const [age, setAge] = React.useState("");
  const [showButton, setShowButton] = useState("false");
  const [mt5Account, setMT5Account] = React.useState("");
  const [changeleverageLoader, setChangeleverageLoader] = React.useState(false);
  const [mT5AccountLoader, setMT5AccountLoader] = React.useState(true);
  const [closePositionRefresh, setClosePositionRefresh] = React.useState(true);
  const [recentRefresh, setRecentRefresh] = React.useState(true);
  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;
  const [filterData, setFilterData] = useState({
    deposit_from: "",
    deposit_to: "",
  });
  const [closeFilterData, setCloseFilterData] = useState({
    deposit_from: "",
    deposit_to: "",
  });
  const [param, setParam] = useState({
    mt5_acc_no: localStorage.getItem("mt5_acc_no"),
    transfer_status: "",
  });
  const [closeParam, setCloseParam] = useState({
    mt5_acc_no: localStorage.getItem("mt5_acc_no"),
  });
  /* const [param, setParam] = useState({
    'mt5_acc_no': localStorage.getItem('mt5_acc_no')
  }); */
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const getLeverage = async () => {
    const param = new FormData();
    param.append("action", "get_leverages");
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    await axios.post(`${Url}/ajaxfiles/account_list.php`, param).then((res) => {
      if (res.data.message == "Session has been expired") {
        navigate("/");
      }
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        leveragesList.data = res.data.leverages;
        setLeveragesList({ ...leveragesList });
      }
    });
    setCLOpen(true);
  };

  const changeLeverage = async () => {
    if (age == "") {
      toast.error("Please select leverage");
    } else {
      setChangeleverageLoader(true);
      const param = new FormData();
      param.append("action", "change_mt5_leverage");
      param.append("mt5_id", localStorage.getItem("mt5_acc_no"));
      param.append("new_leverage", age);
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      await axios
        .post(`${Url}/ajaxfiles/account_list.php`, param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            navigate("/");
          }
          setChangeleverageLoader(false);
          if (res.data.status == "error") {
            toast.error(res.data.message);
          } else {
            setAge("");
            toast.success(res.data.message);
            setCLOpen(false);
          }
        });
    }
  };

  const fetchMT5AccountList = async () => {
    const param = new FormData();
    param.append("action", "get_mt5_demo_ac_list");
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    await axios.post(`${Url}/ajaxfiles/account_list.php`, param).then((res) => {
      if (res.data.message == "Session has been expired") {
        navigate("/");
      }
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        // mt5AccountList.data = [];

        // setMT5AccountList({ ...mt5AccountList });
        if (res.data.mt5_accounts.length > 0) {
          // if(res.data.mt5_accounts.length>0){
          mt5AccountList.data = res.data.mt5_accounts;
          // mt5AccountList.data = [];

          setMT5AccountList({ ...mt5AccountList });
          console.log("mt5Account", mt5AccountList.data[0].mt5_acc_no);
          setMT5Account(mt5AccountList.data[0].mt5_acc_no);
          console.log("mt5Account", mt5Account);
          fetchMT5AccountDetaiils(mt5AccountList.data[0].mt5_acc_no);
        } else {
          setMT5AccountLoader(false);
        }
      }
    });
  };

  const fetchMT5AccountDetaiils = async (mt5_acc_no = "") => {
    console.log("mt5Account", mt5Account);
    setMT5AccountLoader(true);
    const param = new FormData();
    param.append("action", "get_mt5_ac_details");
    param.append("mt5_acc_no", mt5_acc_no);
    /* if (mt5Account == "") {
    } else {
      param.append("mt5_acc_no", mt5Account);
    } */
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    await axios.post(`${Url}/ajaxfiles/account_list.php`, param).then((res) => {
      if (res.data.message == "Session has been expired") {
        navigate("/");
      }
      if (res.data.status == "ok") {
        // toast.error(res.data.message);
        // if(res.data.message =="MT5 account not exist.")
        // {
        //   setShowButton(true)
        // }
        // setAccountDetails({ ...res.data.data });
        setMT5AccountLoader(false);
        console.log("saddsv", mT5AccountLoader);
        setAccountDetails({ ...res.data.data });
      } else {
      }
    });
  };

  const column = [
    {
      name: "LOGIN",
      selector: (row) => {
        return <span>{row.trade_login}</span>;
      },
      reorder: true,
      grow: 0.1,
    },
    {
      name: "SYMBOL",
      selector: (row) => {
        return <span title={row.trade_symbol}>{row.trade_symbol}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 1,
    },
    {
      name: "TRADE NO",
      selector: (row) => {
        return <span title={row.trade_no}>{row.trade_no}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 1,
    },
    {
      name: "DATE",
      selector: (row) => {
        return <span title={row.trade_time}>{row.trade_time}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 1,
    },
    {
      name: "TYPE",
      selector: (row) => {
        return <span title={row.trade_type}>{row.trade_type}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 1,
    },
    {
      name: "TRADE VOLUME",
      selector: (row) => {
        return <span title={row.trade_volume}>{row.trade_volume}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "TRADE OPEN RATE",
      selector: (row) => {
        return <span title={row.trade_open_rate}>{row.trade_open_rate}</span>;
      },
      reorder: true,
      wrap: true,
      grow: 0.1,
    },
    {
      name: "S/L",
      selector: (row) => {
        return <span title={row.trade_s_l}>{row.trade_s_l}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "T/P",
      selector: (row) => {
        return <span title={row.trade_t_p}>{row.trade_t_p}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "CURRENT PRICE",
      selector: (row) => {
        return <span title={row.trade_curr_rate}>{row.trade_curr_rate}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "PROFIT",
      selector: (row) => {
        return <span title={row.trade_profit}>{row.trade_profit}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 0.5,
    },
  ];

  const TradeColumn = [
    {
      name: "LOGIN",
      selector: (row) => {
        return <span>{row.mt5}</span>;
      },
      reorder: true,
      grow: 0.1,
    },
    {
      name: "DATE",
      selector: (row) => {
        return <span title={row.trade_datetime}>{row.trade_datetime}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 1,
    },
    {
      name: "TRADE NO",
      selector: (row) => {
        return <span title={row.order}>{row.order}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 1,
    },
    {
      name: "SYMBOL",
      selector: (row) => {
        return <span title={row.symbol}>{row.symbol}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 1,
    },
    {
      name: "PRICE",
      selector: (row) => {
        return <span title={row.price}>{row.price}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 1,
    },
    {
      name: "LOT",
      selector: (row) => {
        return <span title={row.volume}>{row.volume}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "EXPERT POSITION ID",
      selector: (row) => {
        return (
          <span title={row.expert_position_id}>{row.expert_position_id}</span>
        );
      },
      reorder: true,
      wrap: true,
      grow: 0.1,
    },
    {
      name: "COMMENT",
      selector: (row) => {
        return <span title={row.comment}>{row.comment}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 0.1,
    },
    {
      name: "ACTION",
      selector: (row) => {
        return <span title={row.action}>{row.action}</span>;
      },
      reorder: true,
      sortable: true,
      wrap: true,
      grow: 0.1,
    },
  ];

  /* const fetchPlantDetaiils = async() => {
    // setMT5AccountLoader(true);
      const param = new FormData();
      await axios.post(`${Url}/ajaxfiles/get_mt5_live_packages.php`, param).then((res) => {
        // setMT5AccountLoader(false);
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          // setAccountDetails({...res.data.data});
        }
      });
  } */

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item sm={12}></Grid>
              <Grid item xl={1}></Grid>
              <Grid item xl={10} md={12} lg={12}>
                <TopButton />
                <Grid container>
                  <Grid item md={12}>
                    <Grid container>
                      <Grid item md={12} lg={8}>
                        <Paper
                          elevation={2}
                          style={{ borderRadius: "10px" }}
                          className="w-100 mb-5 trading-accounts-wrapper"
                        >
                          <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                            <div>
                              <h5 className="font-weight-bold mb-0 text-dark">
                                Demo Account
                              </h5>
                            </div>
                          </div>
                          <div className="divider"></div>
                          {mT5AccountLoader ? (
                            <div className="card-body position-relative pt-0 get-mt5-account-details">
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
                            </div>
                          ) : (
                            <div className="card-body position-relative pt-0">
                              {mt5AccountList.data.length == 0 ? (
                                <div className="loader">
                                  <ColorButton
                                    variant="contained"
                                    size="large"
                                    className="centerLoader"
                                    onClick={() => {
                                      setDOpen(true);
                                      setAccountType(0);
                                      setDrefresh(true);
                                    }}
                                  >
                                    Open Demo Account
                                  </ColorButton>
                                </div>
                              ) : (
                                ""
                              )}

                              <Grid container spacing={3}>
                                <Grid item md={3}>
                                  <FormControl className="form-control py-3">
                                    {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
                                    <label
                                      htmlFor="accountNo"
                                      className="text-info font-weight-bold form-label-head w-100"
                                    >
                                      ACCOUNT NO
                                    </label>
                                    <Select
                                      value={mt5Account}
                                      onChange={(e) => {
                                        fetchMT5AccountDetaiils(e.target.value);
                                        setMT5Account(e.target.value);
                                      }}
                                      displayEmpty
                                      inputProps={{
                                        "aria-label": "Without label",
                                      }}
                                      input={<BootstrapInput1 />}
                                    >
                                      {mt5AccountList.data.map((item) => {
                                        return (
                                          <MenuItem value={item.mt5_acc_no}>
                                            {item.mt5_acc_no}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item md={2}>
                                  <FormControl className="form-control py-3">
                                    {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
                                    <label
                                      htmlFor="accountNo"
                                      className="text-info font-weight-bold form-label-head w-100"
                                    >
                                      ACCOUNT TYPE
                                    </label>
                                    <label
                                      htmlFor=""
                                      className="text-dark font-weight-bold w-100 text-uppercase"
                                    >
                                      Executive
                                    </label>
                                  </FormControl>
                                </Grid>
                                <Grid item md={2}>
                                  <FormControl className="form-control py-3">
                                    {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
                                    <label
                                      htmlFor="accountNo"
                                      className="text-info font-weight-bold form-label-head w-100"
                                    >
                                      CURRENCY
                                    </label>
                                    <label
                                      htmlFor=""
                                      className="text-dark font-weight-bold w-100 text-uppercase"
                                    >
                                      USD
                                    </label>
                                  </FormControl>
                                </Grid>
                                <Grid item md={3}>
                                  <FormControl className="form-control py-3">
                                    {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
                                    <label
                                      htmlFor="accountNo"
                                      className="text-info font-weight-bold form-label-head w-100"
                                    >
                                      BALANCE
                                    </label>
                                    <label
                                      htmlFor=""
                                      className="text-dark font-weight-bold w-100 text-uppercase"
                                    >
                                      {accountDetails.mt_balance}
                                    </label>
                                  </FormControl>
                                </Grid>
                                <Grid item md={2}>
                                  <FormControl className="form-control py-3">
                                    {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
                                    <label
                                      htmlFor="accountNo"
                                      className="text-info font-weight-bold form-label-head w-100"
                                    >
                                      LEVERAGE
                                    </label>
                                    <label
                                      htmlFor=""
                                      className="text-dark font-weight-bold w-100 text-uppercase"
                                    >
                                      {accountDetails.leverage}
                                    </label>
                                  </FormControl>
                                </Grid>
                              </Grid>
                              <hr />

                              <Grid container spacing={6}>
                                <Grid
                                  item
                                  md={3}
                                  className="align-items-center"
                                >
                                  <FormControl className="form-control">
                                    <label
                                      htmlFor=""
                                      className="text-info font-weight-bold form-label-head w-100"
                                    >
                                      CREDIT
                                    </label>
                                    <label
                                      htmlFor=""
                                      className="text-dark font-weight-bold w-100"
                                    >
                                      {accountDetails.mt_credit}
                                    </label>
                                  </FormControl>
                                </Grid>
                                <Grid
                                  item
                                  md={2}
                                  className="align-items-center"
                                >
                                  <FormControl className="form-control">
                                    <label
                                      htmlFor=""
                                      className="text-info font-weight-bold form-label-head w-100"
                                    >
                                      EQUITY
                                    </label>
                                    <label
                                      htmlFor=""
                                      className="text-dark font-weight-bold w-100"
                                    >
                                      {accountDetails.mt_equity}
                                    </label>
                                  </FormControl>
                                </Grid>
                                <Grid
                                  item
                                  md={3}
                                  className="align-items-center"
                                >
                                  <FormControl className="form-control">
                                    <label
                                      htmlFor=""
                                      className="text-info font-weight-bold form-label-head w-100"
                                    >
                                      MARGIN FREE
                                    </label>
                                    <label
                                      htmlFor=""
                                      className="text-dark font-weight-bold w-100"
                                    >
                                      {accountDetails.mt_free_margin}
                                    </label>
                                  </FormControl>
                                </Grid>
                                {/* <Grid item md={3} className="align-items-center">
                                <FormControl>
                                  <label
                                    htmlFor=""
                                    className="text-info font-weight-bold form-label-head w-100"
                                  >
                                    MARGIN FREE
                                  </label>
                                  <label
                                    htmlFor=""
                                    className="text-dark font-weight-bold w-100"
                                  >
                                    0.00
                                  </label>
                                </FormControl>
                              </Grid> */}
                                <Grid
                                  item
                                  md={2}
                                  className="align-items-center"
                                >
                                  <FormControl className="form-control">
                                    <label
                                      htmlFor=""
                                      className="text-info font-weight-bold form-label-head w-100"
                                    >
                                      MARGIN
                                    </label>
                                    <label
                                      htmlFor=""
                                      className="text-dark font-weight-bold w-100"
                                    >
                                      {accountDetails.total_margin_used}
                                    </label>
                                  </FormControl>
                                </Grid>
                              </Grid>

                              <hr />
                              <div className="d-flex justify-content-center flex-column flex-md-row">
                                <ColorButton
                                  onClick={() => {
                                    setDOpen(true);
                                    setDrefresh(true);
                                  }}
                                >
                                  Open Additional Demo Account
                                </ColorButton>
                                {/* <ColorButton
                                  className="mx-md-3 my-2 my-md-0"
                                  onClick={() => {
                                    navigate("/change_password");
                                  }}
                                >
                                  Change Password
                                </ColorButton>
                                <ColorButton onClick={getLeverage}>
                                  Change Leverage
                                </ColorButton> */}
                                {Dopen ? (
                                  <OpenDemoModel
                                    Dopen={Dopen}
                                    setDOpen={setDOpen}
                                    nav={1}
                                    type={0}
                                    refresh={setDrefresh}
                                  />
                                ) : (
                                  ""
                                )}

                                <Dialog
                                  open={clOpen}
                                  onClose={() => setCLOpen(false)}
                                  scroll="paper"
                                  aria-labelledby="scroll-dialog-title"
                                  aria-describedby="scroll-dialog-description"
                                >
                                  <div
                                    id="form-dialog-title"
                                    className="d-flex align-items-center p-3"
                                  >
                                    <h5 className="w-100 text-center text-primary m-0 font-weight-bold">
                                      CHANGE LEVERAGE
                                    </h5>
                                    <Button
                                      onClick={() => setCLOpen(false)}
                                      sx={{ color: "#ff0000" }}
                                    >
                                      <CloseIcon />
                                    </Button>
                                  </div>
                                  <DialogContent className="create-account-content">
                                    <Grid container spacing={6}>
                                      <Grid item md={12}>
                                        <form>
                                          <Grid container spacing={3}>
                                            <Grid item md={12}>
                                              <FormControl className="w-100">
                                                {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
                                                <label
                                                  htmlFor="accountNo"
                                                  className="text-info font-weight-bold form-label-head w-100 required"
                                                >
                                                  LEVERAGE
                                                </label>
                                                <Select
                                                  value={age}
                                                  onChange={handleChange}
                                                  displayEmpty
                                                  inputProps={{
                                                    "aria-label":
                                                      "Without label",
                                                  }}
                                                  input={<BootstrapInput />}
                                                >
                                                  <MenuItem value="">
                                                    Select Option
                                                  </MenuItem>
                                                  {leveragesList.data.map(
                                                    (item) => {
                                                      return (
                                                        <MenuItem
                                                          value={
                                                            item.leverage_value
                                                          }
                                                        >
                                                          {item.leverage_data}
                                                        </MenuItem>
                                                      );
                                                    }
                                                  )}
                                                </Select>
                                              </FormControl>
                                            </Grid>
                                          </Grid>
                                          <Grid container spacing={3}>
                                            <Grid
                                              item
                                              md={12}
                                              className="text-center my-3"
                                            >
                                              {changeleverageLoader ? (
                                                <ColorButton
                                                  variant="contained"
                                                  className="m-auto p-3 text-center text-capitalize disabled-transfar-button"
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
                                                  onClick={changeLeverage}
                                                >
                                                  {" "}
                                                  Change Leverage
                                                </ColorButton>
                                              )}
                                            </Grid>
                                          </Grid>
                                        </form>
                                      </Grid>
                                    </Grid>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          )}
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={12}>
                    <Paper
                      elevation={1}
                      style={{ borderRadius: "10px" }}
                      className="w-100 mb-5"
                    >
                      <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                        <div>
                          <h5 className="font-weight-bold mb-0 text-dark">
                            Open Positions
                          </h5>
                        </div>
                      </div>
                      <div className="divider"></div>
                      <div className="card-body position-relative">
                        <Grid container spacing={3}>
                          <Grid
                            item
                            md={12}
                            className="position-relative mh-150"
                          >
                            <div className="d-flex align-items-center text-dark w-100 h-100">
                              {/* <i className="m-auto">
                                You haven't made any Open Positions.
                              </i> */}
                              <CommonTable
                                url={`${Url}/datatable/open_position.php`}
                                column={column}
                                mt5Account={mt5Account}
                                sort="0"
                                fetchData="mt5_open_trade_data"
                              />
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    </Paper>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item md={12}>
                    <Paper
                      elevation={1}
                      style={{ borderRadius: "10px" }}
                      className="w-100 mb-5 "
                    >
                      <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                        <div>
                          <h5 className="font-weight-bold mb-0 text-dark">
                            Trade History
                          </h5>
                        </div>
                      </div>
                      <div className="divider"></div>
                      <div className="card-body position-relative">
                        <Grid container spacing={3}>
                          <Grid
                            item
                            md={12}
                            className="position-relative mh-150"
                          >
                            <div className="d-flex align-items-center text-dark w-100 h-100">
                              <CardContent className="py-3 filter-section-width-100">
                                <div>
                                  <Grid container spacing={2}>
                                    <Grid item sm={6} md={3}>
                                      <FormControl fullWidth={true}>
                                        <label className="small font-weight-bold text-dark">
                                          {" "}
                                          Date From
                                        </label>
                                        <BootstrapInput
                                          type="date"
                                          value={closeFilterData.deposit_from}
                                          name="deposit_from"
                                          onChange={(e) =>
                                            setCloseFilterData({
                                              ...closeFilterData,
                                              deposit_from: e.target.value,
                                            })
                                          }
                                        ></BootstrapInput>
                                      </FormControl>
                                    </Grid>
                                    <Grid item sm={6} md={3}>
                                      <FormControl fullWidth={true}>
                                        <label className="small font-weight-bold text-dark">
                                          {" "}
                                          Date To
                                        </label>
                                        <BootstrapInput
                                          value={closeFilterData.deposit_to}
                                          type="date"
                                          name="deposit_to"
                                          onChange={(e) =>
                                            setCloseFilterData({
                                              ...closeFilterData,
                                              deposit_to: e.target.value,
                                            })
                                          }
                                        ></BootstrapInput>
                                      </FormControl>
                                    </Grid>
                                    <Grid item sm={6} md={3}>
                                      <FormControl fullWidth={true}>
                                        <label className="small font-weight-bold text-dark">
                                          {" "}
                                          Account Number
                                        </label>
                                        <Select
                                          value={closeParam.mt5_acc_no}
                                          onChange={(e) =>
                                            setCloseParam({
                                              ...closeParam,
                                              mt5_acc_no: e.target.value,
                                            })
                                          }
                                          displayEmpty
                                          inputProps={{
                                            "aria-label": "Without label",
                                          }}
                                          input={<BootstrapInput />}
                                        >
                                          <MenuItem value="">
                                            Select Account Number
                                          </MenuItem>
                                          {mt5AccountList.data.map((item) => {
                                            return (
                                              <MenuItem value={item.mt5_acc_no}>
                                                {item.mt5_acc_no}
                                              </MenuItem>
                                            );
                                          })}
                                        </Select>
                                      </FormControl>
                                    </Grid>
                                  </Grid>
                                  <Grid container spacing={2}>
                                    <Grid item sm={12} md={12}>
                                      {/* <div className="filter-submit">
                                        <ColorButton className=" d-block ml-auto mb-3 mr-3 " onClick={(e) => setClosePositionRefresh(!closePositionRefresh)}>
                                          Sumbit
                                        </ColorButton>
                                      </div> */}
                                    </Grid>
                                  </Grid>
                                  <CommonTable
                                    url={`${Url}/datatable/trade_history_demo.php`}
                                    column={TradeColumn}
                                    sort="0"
                                    filter={closeFilterData}
                                    mt5Account={mt5Account}
                                    refresh={closePositionRefresh}
                                  />
                                </div>
                              </CardContent>
                            </div>
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
