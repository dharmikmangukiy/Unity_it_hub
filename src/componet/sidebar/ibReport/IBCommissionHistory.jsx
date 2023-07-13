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
  FormHelperText,
  Autocomplete,
  TextField,
} from "@mui/material";
import "./ibreport.css";
import CloseIcon from "@mui/icons-material/Close";
import CommonTable from "../../customComponet/CommonTable";
import { ColorButton } from "../../customComponet/CustomElement";
import { NavLink, useNavigate } from "react-router-dom";
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
  const [methodType, setMethodType] = useState({
    list: [],
    subList: [],
    mt5List: [],
    popLoaderMt5: true,
    popLoaderDepositMethod: true,
  });
  const [data, setData] = useState({
    withdrawal_from: "",
    payment_method: "",
    user_bank_id: "",
    upi_name: "",
    crypto_name: "",
    upi_crypto_ac_number: "",
    mt5_acc_no: "",
    amount: "",
    isLoder: false,
  });
  const [infoTrue, setinfoTrue] = useState({
    withdrawal_from: false,
    payment_method: false,
    user_bank_id: false,
    upi_name: false,
    crypto_name: false,
    upi_crypto_ac_number: false,
    mt5_acc_no: false,
    amount: false,
  });

  const [resData, setResData] = useState({});

  const trueFalse = (event) => {
    var { name, value } = event.target;
    setinfoTrue((prevalue) => {
      return {
        ...prevalue,
        [name]: true,
      };
    });
  };
  console.log("check true false", infoTrue, data);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };
  const onsubmit = () => {
    if (data.withdrawal_from == "") {
      Toast("error", "Select is required");
    } else if (
      data.withdrawal_from == "Withdraw" &&
      data.payment_method == ""
    ) {
      Toast("error", "Please Select Transaction Gateways");
    } else if (
      data.withdrawal_from == "Withdraw" &&
      data.payment_method == "Bank" &&
      data.user_bank_id == ""
    ) {
      Toast("error", "Please Select Bank Account");
    } else if (
      data.withdrawal_from == "Withdraw" &&
      data.payment_method == "UPI" &&
      data.upi_name == ""
    ) {
      Toast("error", "Please Select UPI Type");
    } else if (
      data.withdrawal_from == "Withdraw" &&
      data.payment_method == "UPI" &&
      data.upi_name &&
      data.upi_crypto_ac_number == ""
    ) {
      Toast("error", "Please Enter UPI Id");
    } else if (
      data.withdrawal_from == "Withdraw" &&
      data.payment_method == "Crypto" &&
      data.crypto_name == ""
    ) {
      Toast("error", "Please Select Crypto type");
    } else if (
      data.withdrawal_from == "Withdraw" &&
      data.payment_method == "Crypto" &&
      data.crypto_name &&
      data.upi_crypto_ac_number == ""
    ) {
      Toast("error", "Please Enter Crypto Address");
    } else if (
      data.withdrawal_from == "MT5" &&
      (data.mt5_acc_no == "" ||
        data.mt5_acc_no == null ||
        data.mt5_acc_no == undefined)
    ) {
      Toast("error", "Please Select MT5 Account");
    } else if (data.amount == "") {
      Toast("error", "Amount is required");
    } else if (data.amount > resData.balance) {
      Toast("error", "Insufficient fund Balance.");
    } else {
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }

      if (data.payment_method == "Bank" && data.withdrawal_from == "Withdraw") {
        param.append("user_bank_id", data.user_bank_id);
      } else if (
        data.payment_method == "UPI" &&
        data.withdrawal_from == "Withdraw"
      ) {
        param.append("upi_name", data.upi_name);
        param.append("upi_crypto_ac_number", data.upi_crypto_ac_number);
      } else if (
        data.payment_method == "Crypto" &&
        data.withdrawal_from == "Withdraw"
      ) {
        param.append("crypto_name", data.crypto_name);
        param.append("upi_crypto_ac_number", data.upi_crypto_ac_number);
      }

      if (data.withdrawal_from == "Withdraw") {
        param.append("payment_method", data.payment_method);
      }
      if (data.withdrawal_from == "MT5") {
        param.append("withdrawal_from", "MT5");
        param.append("mt5_acc_no", data.mt5_acc_no.mt5_acc_no);
      } else {
        param.append("withdrawal_from", data.withdrawal_from);
      }

      param.append("amount", data.amount);
      data.isLoder = true;
      setData({ ...data });
      axios
        .post(Url + "/ajaxfiles/insert_ib_commission_withdraw.php", param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            navigate("/");
          }
          if (res.data.status == "error") {
            data.isLoder = false;
            setData({ ...data });
            Toast("error", res.data.message);
          } else {
            data.isLoder = false;
            setData({ ...data });
            setRefresh(!refresh);
            Toast("success", res.data.message);
            setOpen(false);
            setMethodType({
              list: [],
              subList: [],
              mt5List: [],
              popLoaderMt5: true,
              popLoaderDepositMethod: true,
            });
            setData({
              withdrawal_from: "",
              payment_method: "",
              user_bank_id: "",
              upi_name: "",
              crypto_name: "",
              upi_crypto_ac_number: "",
              mt5_acc_no: "",
              amount: "",
              isLoder: false,
            });
            setinfoTrue({
              withdrawal_from: false,
              payment_method: false,
              user_bank_id: false,
              upi_name: false,
              crypto_name: false,
              upi_crypto_ac_number: false,
              mt5_acc_no: false,
              amount: false,
            });
          }
        });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setMethodType({
      list: [],
      subList: [],
      mt5List: [],
      popLoaderMt5: true,
      popLoaderDepositMethod: true,
    });
    setData({
      withdrawal_from: "",
      payment_method: "",
      user_bank_id: "",
      upi_name: "",
      crypto_name: "",
      upi_crypto_ac_number: "",
      mt5_acc_no: "",
      amount: "",
      isLoder: false,
    });
    console.log("data", data);
    setinfoTrue({
      withdrawal_from: false,
      payment_method: false,
      user_bank_id: false,
      upi_name: false,
      crypto_name: false,
      upi_crypto_ac_number: false,
      mt5_acc_no: false,
      amount: false,
    });
  };

  const getMethodType = () => {
    const param = new FormData();
    param.append("action", "withdrawal_payment_methods");
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    axios.post(`${Url}/ajaxfiles/common_api.php`, param).then((res) => {
      if (res.data.message == "Session has been expired") {
        navigate("/");
      }
      if (res.data.status == "error") {
        Toast("error", res.data.message);
      } else {
        methodType.list = res.data.payment_method;
        methodType.subList = res.data.data;
        methodType.popLoaderDepositMethod = false;
        setMethodType({ ...methodType });
      }
    });
  };
  const fetchMT5AccountList = async () => {
    const param = new FormData();
    param.append("action", "get_mt5_ac_list_downline");
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
        Toast("error", res.data.message);
      } else {
        methodType.mt5List = res.data.mt5_accounts;
        methodType.popLoaderMt5 = false;
        setMethodType({ ...methodType });
        if (res.data.mt5_accounts.length !== 0) {
          data.mt5_acc_no = res.data.mt5_accounts[0];
          setData({ ...data });
        }
      }
    });
  };
  const gotoProfile = (e) => {
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
  const menuItem = () => {
    if (data.payment_method == "Bank") {
      return (
        <FormControl className="w-100">
          {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
          <label
            htmlFor="bankAccount"
            className="text-info font-weight-bold form-label-head w-100 mt-4  required"
          >
            BANK ACCOUNT
          </label>
          <Select
            value={data.user_bank_id}
            name="user_bank_id"
            onChange={handleChange}
            displayEmpty
            inputProps={{
              "aria-label": "Without label",
            }}
            input={<BootstrapInput />}
            className="mt-0 ml-0"
            style={{ width: "100%" }}
            onBlur={trueFalse}
          >
            <MenuItem value="">Select Option</MenuItem>

            {methodType.subList.map((item, index) => {
              if (item.payment_type == "Bank") {
                return item.payment_bank.map((item1, index1) => {
                  return (
                    <MenuItem value={item1.user_bank_id}>
                      {item1.bank_account_holder_name} {"("}
                      {item1.bank_account_number}
                      {")"}
                    </MenuItem>
                  );
                });
              }
              {
              }
            })}
          </Select>
          {methodType.subList.map((item, index) => {
            if (item.payment_type == "bank") {
              if (item.payment_bank.length == "0") {
                return (
                  <p>
                    No Bank Account added
                    <NavLink to="/bankAccounts">
                      <ColorButton
                        type="submit"
                        variant="contained"
                        size="small"
                        className="mt-2 text-capitalize"
                        sx={{ marginLeft: "10px" }}
                      >
                        Add new Bank Account
                      </ColorButton>
                    </NavLink>
                  </p>
                );
              }
            }
          })}
          {/* {methodType.subList[0].payment_bank.length == "0" ? (
              <p>
                No Bank Account added
                <NavLink to="/bankAccounts">
                  <ColorButton
                    type="submit"
                    variant="contained"
                    size="small"
                    className="mt-2 text-capitalize"
                    sx={{ marginLeft: "10px" }}
                  >
                    Add new Bank Account
                  </ColorButton>
                </NavLink>
              </p>
            ) : (
              ""
            )} */}
          {data.user_bank_id == "" && infoTrue.user_bank_id == true ? (
            <FormHelperText>Please Select Bank Account</FormHelperText>
          ) : (
            ""
          )}
        </FormControl>
      );
    } else if (data.payment_method == "UPI") {
      return (
        <FormControl className="py-4 w-100">
          {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
          <label
            htmlFor="upitype"
            className="text-info font-weight-bold form-label-head w-100  required"
          >
            UPI Type
          </label>
          <Select
            value={data.upi_name}
            name="upi_name"
            onChange={handleChange}
            displayEmpty
            inputProps={{
              "aria-label": "Without label",
            }}
            input={<BootstrapInput />}
            className="mt-0 ml-0"
            style={{ width: "100%" }}
            onBlur={trueFalse}
          >
            <MenuItem value="">Select Option</MenuItem>
            {methodType.subList.map((item, index) => {
              if (item.payment_type == "UPI") {
                return item.payment_upi.map((item1, index1) => {
                  return <MenuItem value={item1}>{item1}</MenuItem>;
                });
              }
              {
              }
            })}
          </Select>
          {data.upi_name == "" && infoTrue.upi_name == true ? (
            <FormHelperText>Please Select UPI Type</FormHelperText>
          ) : (
            ""
          )}
          {data.upi_name ? (
            <>
              {" "}
              <label
                htmlFor="upi_crypto_ac_number"
                className="text-info font-weight-bold form-label-head w-100 mt-4 required"
              >
                UPI Id
              </label>
              <BootstrapInput
                name="upi_crypto_ac_number"
                type="text"
                value={data.upi_crypto_ac_number}
                onChange={handleChange}
                displayEmpty
                onBlur={trueFalse}
                inputProps={{
                  "aria-label": "Without label",
                }}
              />
              {data.upi_crypto_ac_number == "" &&
              infoTrue.upi_crypto_ac_number == true ? (
                <FormHelperText>Please Enter UPI Id</FormHelperText>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </FormControl>
      );
    } else if (data.payment_method == "Crypto") {
      return (
        <FormControl className="py-4 w-100">
          {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
          <label
            htmlFor="crypto_name"
            className="text-info font-weight-bold form-label-head w-100  required"
          >
            Crypto type
          </label>
          <Select
            value={data.crypto_name}
            name="crypto_name"
            onChange={handleChange}
            displayEmpty
            inputProps={{
              "aria-label": "Without label",
            }}
            input={<BootstrapInput />}
            className="mt-0 ml-0"
            style={{ width: "100%" }}
            onBlur={trueFalse}
          >
            <MenuItem value="">Select Option</MenuItem>
            {methodType.subList.map((item, index) => {
              if (item.payment_type == "Crypto") {
                return item.payment_crypto.map((item1, index1) => {
                  return <MenuItem value={item1.slug}>{item1.name}</MenuItem>;
                });
              }
            })}
          </Select>
          {data.crypto_name == "" && infoTrue.crypto_name == true ? (
            <FormHelperText>Please Select Crypto type</FormHelperText>
          ) : (
            ""
          )}
          {data.crypto_name ? (
            <>
              {" "}
              <label
                htmlFor="upi_crypto_ac_number"
                className="text-info font-weight-bold form-label-head w-100 mt-4 required"
              >
                Crypto Address
              </label>
              <BootstrapInput
                name="upi_crypto_ac_number"
                onChange={handleChange}
                displayEmpty
                inputProps={{
                  "aria-label": "Without label",
                }}
                onBlur={trueFalse}
              />
              {data.upi_crypto_ac_number == "" &&
              infoTrue.upi_crypto_ac_number == true ? (
                <FormHelperText>Please Enter Crypto Address</FormHelperText>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </FormControl>
      );
    }
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
                {/* <TopButton /> */}
                <p className="main-heading">Rebate Commission Statement</p>
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
                          <h5 className="mb-0">${resData.earning}</h5>
                          <p className="no-margin">Total Earning</p>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="row1 boxSection">
                    <div className="card padding-9 animate fadeLeft boxsize">
                      <div className="row">
                        <div className="col s12 m12 text-align-center">
                          <h5 className="mb-0">${resData.balance}</h5>
                          <p className="no-margin">Available</p>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="row1 boxSection">
                    <div className="card padding-9 animate fadeLeft boxsize">
                      <div className="row">
                        <div className="col s12 m12 text-align-center">
                          <h5 className="mb-0">${resData.pending}</h5>
                          <p className="no-margin">Pending</p>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="row1 boxSection">
                    <div className="card padding-9 animate fadeLeft boxsize">
                      <div className="row">
                        <div className="col s12 m12 text-align-center">
                          <h5 className="mb-0">${resData.withdaw}</h5>
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

                    <Grid item md={6} sx={{ marginTop: "17px" }}>
                      <ColorButton
                        className="depositFilter"
                        onClick={(e) => setRefresh(!refresh)}
                      >
                        Filter
                      </ColorButton>
                      <ColorButton
                        className="depositFilter"
                        sx={{ marginLeft: "10px" }}
                        onClick={(e) => {
                          fetchMT5AccountList();
                          getMethodType();
                          setOpen(true);
                        }}
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
                    csv="datatable/ib_commission_history_export.php"
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
                IB Withdrawal
              </h5>
              <CloseIcon
                onClick={() => {
                  setMethodType({
                    list: [],
                    subList: [],
                    mt5List: [],
                    popLoaderMt5: true,
                    popLoaderDepositMethod: true,
                  });
                  setData({
                    withdrawal_from: "",
                    payment_method: "",
                    user_bank_id: "",
                    upi_name: "",
                    crypto_name: "",
                    upi_crypto_ac_number: "",
                    mt5_acc_no: "",
                    amount: "",
                    isLoder: false,
                  });
                  setinfoTrue({
                    withdrawal_from: false,
                    payment_method: false,
                    user_bank_id: false,
                    upi_name: false,
                    crypto_name: false,
                    upi_crypto_ac_number: false,
                    mt5_acc_no: false,
                    amount: false,
                  });
                  setOpen(false);
                }}
              />
            </DialogTitle>
            <DialogContent className="create-account-content ml-4">
              {methodType.popLoaderDepositMethod == true ||
              methodType.popLoaderMt5 == true ? (
                <>
                  <div className="card-body position-relative pt-0 mr-4 get-mt5-account-details">
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
                </>
              ) : (
                <>
                  <Grid
                    container
                    spacing={2}
                    className="MuiGrid-justify-xs-space-between mt-2"
                  >
                    <FormControl
                      className="w-100 "
                      error={data.withdrawal_from == "" ? true : false}
                    >
                      {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
                      <label
                        htmlFor="transactionGateway"
                        className="text-info font-weight-bold form-label-head w-100 required"
                      >
                        Select
                      </label>
                      <Select
                        value={data.withdrawal_from}
                        name="withdrawal_from"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        displayEmpty
                        inputProps={{
                          "aria-label": "Without label",
                        }}
                        input={<BootstrapInput />}
                        className="mt-0 ml-0"
                        id="fullWidth"
                        onBlur={trueFalse}
                      >
                        <MenuItem value="Withdraw">Withdraw</MenuItem>
                        <MenuItem value="MT5">Transfer To MT5</MenuItem>
                      </Select>
                      {data.withdrawal_from == "" &&
                      infoTrue.withdrawal_from == true ? (
                        <FormHelperText>Select is required</FormHelperText>
                      ) : (
                        ""
                      )}
                    </FormControl>
                    {data.withdrawal_from == "Withdraw" ? (
                      <>
                        <FormControl
                          className="w-100 "
                          error={data.payment_method == "" ? true : false}
                        >
                          {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
                          <label
                            htmlFor="transactionGateway"
                            className="text-info font-weight-bold form-label-head w-100 mt-4 required"
                          >
                            TRANSACTION GATEWAYS
                          </label>
                          <Select
                            value={data.payment_method}
                            name="payment_method"
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{
                              "aria-label": "Without label",
                            }}
                            input={<BootstrapInput />}
                            className="mt-0 ml-0"
                            id="fullWidth"
                            onBlur={trueFalse}
                          >
                            <MenuItem value="">Select Option </MenuItem>
                            {methodType.list.map((item) => {
                              return <MenuItem value={item}>{item} </MenuItem>;
                            })}
                          </Select>
                          {data.payment_method == "" &&
                          infoTrue.payment_method == true ? (
                            <FormHelperText>
                              Please Select Transaction Gateways
                            </FormHelperText>
                          ) : (
                            ""
                          )}
                        </FormControl>
                        {menuItem()}
                      </>
                    ) : (
                      ""
                    )}
                    {data.withdrawal_from == "MT5" ? (
                      <>
                        <FormControl
                          className="w-100 "
                          error={data.mt5_acc_no == "" ? true : false}
                        >
                          {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
                          <label
                            htmlFor="transactionGateway"
                            className="text-info font-weight-bold form-label-head w-100 mt-4 required"
                          >
                            MT5 Account
                          </label>

                          <Autocomplete
                            id="tags-standard"
                            value={data.mt5_acc_no}
                            options={methodType.mt5List}
                            // getOptionLabel={(option) => option.mt5_acc_no}
                            getOptionLabel={(option) =>
                              option
                                ? `${option.mt5_acc_no}(${
                                    option.is_self == true
                                      ? `${option.ib_group_name}-Self`
                                      : option.ib_group_name
                                  })`
                                : ""
                            }
                            renderOption={(props, option) => {
                              return (
                                <li {...props} key={option.mt5_acc_no}>
                                  {option.mt5_acc_no}(
                                  {option.is_self == true
                                    ? `${option.ib_group_name}-Self`
                                    : option.ib_group_name}
                                  )
                                </li>
                              );
                            }}
                            onChange={(event, newValue) => {
                              data.mt5_acc_no = newValue;
                              setData({ ...data });
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                name="mt5_acc_no"
                                onBlur={trueFalse}
                                className="autoComplte-textfild mobileCode"
                                helperText={
                                  (data.mt5_acc_no == "" ||
                                    data.mt5_acc_no == null ||
                                    data.mt5_acc_no == undefined) &&
                                  infoTrue.mt5_acc_no == true
                                    ? "Please Select MT5 Account"
                                    : ""
                                }
                              />
                            )}
                          />
                          {/* <Select
                            value={data.mt5_acc_no}
                            name="mt5_acc_no"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            displayEmpty
                            inputProps={{
                              "aria-label": "Without label",
                            }}
                            input={<BootstrapInput />}
                            className="mt-0 ml-0"
                            id="fullWidth"
                            onBlur={trueFalse}
                          >
                            {methodType.mt5List.map((item) => {
                              if (item.ib_group_name !== "SPIN")
                                return (
                                  <MenuItem value={item.mt5_acc_no}>
                                    {item.mt5_acc_no}({item.ib_group_name})
                                  </MenuItem>
                                );
                            })}
                          </Select>
                          {data.mt5_acc_no == "" &&
                          infoTrue.mt5_acc_no == true ? (
                            <FormHelperText>
                              Please Select MT5 Account
                            </FormHelperText>
                          ) : (
                            ""
                          )} */}
                        </FormControl>
                      </>
                    ) : (
                      ""
                    )}
                    <FormControl
                      className="pb-4 w-100"
                      error={
                        data.amount == "" || data.amount > resData.balance
                          ? true
                          : false
                      }
                    >
                      {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
                      <label
                        htmlFor="amount"
                        className="text-info font-weight-bold form-label-head w-100 mt-4 required"
                      >
                        Amount In USD
                      </label>
                      <BootstrapInput
                        value={data.amount}
                        type="text"
                        name="amount"
                        onChange={(e) => {
                          if (!isNaN(Number(e.target.value))) {
                            handleChange(e);
                          }
                        }}
                        displayEmpty
                        inputProps={{
                          "aria-label": "Without label",
                        }}
                        onBlur={trueFalse}
                      />
                      {data.amount == "" && infoTrue.amount == true ? (
                        <FormHelperText>
                          Please Enter Amount In USD
                        </FormHelperText>
                      ) : data.amount > resData.balance &&
                        infoTrue.amount == true ? (
                        <FormHelperText>
                          Insufficient fund Balance.
                        </FormHelperText>
                      ) : (
                        ""
                      )}
                    </FormControl>
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    className="MuiGrid-justify-xs-space-between mt-4 displayflxend"
                  >
                    {data.isLoder == true ? (
                      <ColorButton
                        tabindex="0"
                        size="large"
                        disabled
                        sx={{
                          padding: "20px 50px",
                          marginLeft: "10px",
                        }}
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
                        </svg>{" "}
                      </ColorButton>
                    ) : (
                      <ColorButton
                        onClick={onsubmit}
                        variant="contained"
                        size="medium"
                        className=" text-capitalize "
                      >
                        Submit
                      </ColorButton>
                    )}
                  </Grid>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default IBCommissionHistory;
