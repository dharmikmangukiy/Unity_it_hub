import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  InputBase,
  styled,
  MenuItem,
  Select,
  TextField,
  FormHelperText,
} from "@mui/material";
import TopButton from "../../customComponet/TopButton";
import { ColorButton } from "../../customComponet/CustomElement";
import { BootstrapInput } from "../../customComponet/CustomElement";
import axios from "axios";
import { IsApprove, Url } from "../../../global";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./otherpage.css";
import { useNavigate } from "react-router-dom";
import Counter from "../../customComponet/Counter";

const InternalTransfer = () => {
  const navigate = useNavigate();
  const [age, setAge] = React.useState("");
  const [isInputWallet, setIsInputWallet] = React.useState(false);
  const [isInputMT5, setIsInputMT5] = React.useState(false);
  const [isInputToMT5, setIsInputToMT5] = React.useState(false);
  // const [isOTP, setIsOTP] = React.useState(false);
  const [mt5AccountList, setMT5AccountList] = React.useState({
    data: [],
  });
  const [timer, setTimer] = useState(true);
  const [infoTrue, setinfoTrue] = useState({
    from_account: false,
    from_account_mt5: false,
    from_account_balance: false,
    from_account_equity: false,
    to_account: false,
    mt5_account: false,
    wallet_code: false,
    amount: false,
    otp: false,
  });
  const trueFalse = (event) => {
    var { name, value } = event.target;
    setinfoTrue((prevalue) => {
      return {
        ...prevalue,
        [name]: true,
      };
    });
  };

  const [form, setForm] = React.useState({
    from_account: "",
    from_account_mt5: "",
    from_account_balance: "",
    from_account_equity: "",
    to_account: "",
    mt5_account: "",
    wallet_code: "",
    amount: "",
    currency: "",
    otp: "",
    isOTP: false,
    resendOtp: false,
    resendOtploder: false,
    isLoader: false,
  });
  toast.configure();
  const handleChange = (event) => {
    setAge(() => {
      const { name, value } = event.target;
      setAge((prevalue) => {
        return {
          ...prevalue,
          [name]: value,
        };
      });
      console.log(event.target.value);
    });
  };

  const input = (event) => {
    const { name, value } = event.target;
    console.log("input value", name, value);
    form[name] = value;
    setForm({ ...form });

    if (name == "from_account" && value == "MT5") {
      fetchMT5AccountList();
      setIsInputMT5(true);
      setIsInputWallet(false);
      setIsInputToMT5(false);
    } else if (name == "from_account" && value == "wallet") {
      fetchFromAccountDetails();
      setIsInputMT5(false);
      setIsInputWallet(false);
      setIsInputToMT5(false);
      form.from_account_balance = "";
      form.from_account_equity = "";
      setForm({ ...form });
    } else if (name == "from_account_mt5") {
      fetchFromAccountMt5Details();
    } else if (name == "to_account" && value == "wallet") {
      setIsInputWallet(true);
      setIsInputToMT5(false);
    } else if (name == "to_account" && value == "MT5") {
      fetchMT5AccountList();
      setIsInputToMT5(true);
      setIsInputWallet(false);
    }

    if (form.from_account == "MT5" && form.to_account == "wallet") {
      form.wallet_code = localStorage.getItem("wallet_code");
      setForm({ ...form });
    } else {
      form.wallet_code = "";
      setForm({ ...form });
    }
  };

  const fetchFromAccountDetails = async () => {
    const param = new FormData();
    param.append("action", "view_balance");
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("from_transfer", form.from_account);
    await axios
      .post(`${Url}/ajaxfiles/internal_transfer.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          form.from_account_balance = res.data.formated_balance;
          console.log("form", form);
          setForm({ ...form });
        }
      });
  };

  const fetchMT5AccountList = async () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("action", "get_mt5_ac_list");
    await axios
      .post(`${Url}/ajaxfiles/internal_transfer.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          mt5AccountList.data = res.data.mt5_accounts;
          setMT5AccountList({ ...mt5AccountList });
          console.log(mt5AccountList);
        }
      });
  };

  const fetchFromAccountMt5Details = async () => {
    const param = new FormData();
    param.append("action", "view_mt5_balance");
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("from_mt5_account_id", form.from_account_mt5);
    await axios
      .post(`${Url}/ajaxfiles/internal_transfer.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          console.log(res.data);
          form.from_account_balance = res.data.formated_balance;
          form.from_account_equity = res.data.formated_equity;
          setForm({ ...form });
        }
      });
  };

  const submit = async () => {
    if (form.from_account == "") {
      toast.error("Please select From Account");
    } else if (form.from_account == "MT5" && form.from_account_mt5 == "") {
      toast.error("Please select From MT5 Account");
    } else if (form.to_account == "") {
      toast.error("Please select to account");
    } else if (form.to_account == "MT5" && form.mt5_account == "") {
      toast.error("Please select MT5 account");
    } else if (form.amount == "") {
      toast.error("Please enter account");
    } else if (form.isOTP == false) {
      if (form.resendOtp == true) {
        form.resendOtploder = true;
        setForm({ ...form });
      } else {
        form.isLoader = true;
        setForm({ ...form });
      }

      const param = new FormData();
      param.append("action", "request_otp");
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      param.append("from_transfer", form.from_account);
      param.append("to_transfer", form.to_account);
      param.append("wallet_id", form.wallet_code);
      param.append("mt5_account_id", form.mt5_account);
      param.append("amount", form.amount);
      param.append("from_mt5_account_id", form.from_account_mt5);
      await axios
        .post(`${Url}/ajaxfiles/internal_transfer.php`, param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            navigate("/");
          }
          if (form.resendOtp == true) {
            form.resendOtploder = false;
            setForm({ ...form });
          } else {
            form.isLoader = false;
            setForm({ ...form });
          }

          if (res.data.status == "error") {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            console.log(res.data);
            setTimer({ ...timer });
            form.resendOtp = true;
            form.isOTP = true;
            setForm({ ...form });
            setinfoTrue({
              from_account: false,
              from_account_mt5: false,
              from_account_balance: false,
              from_account_equity: false,
              to_account: false,
              mt5_account: false,
              wallet_code: false,
              amount: false,
              otp: false,
            });
            // setIsOTP(true);
          }
        });
    } else if (form.otp == "" && form.isOTP == true) {
      toast.error("Please enter OTP");
    } else {
      form.isLoader = true;
      setForm({ ...form });
      const param = new FormData();
      param.append("action", "add_transfer");
      param.append("from_transfer", form.from_account);
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      param.append("to_transfer", form.to_account);
      param.append("wallet_id", form.wallet_code);
      param.append("mt5_account_id", form.mt5_account);
      param.append("amount", form.amount);
      param.append("from_mt5_account_id", form.from_account_mt5);
      param.append("verify_otp", form.otp);
      await axios
        .post(`${Url}/ajaxfiles/internal_transfer.php`, param)
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
            // setIsOTP(false);
            setIsInputMT5(false);
            setIsInputWallet(false);
            setIsInputToMT5(false);
            setForm({
              from_account: "",
              from_account_mt5: "",
              from_account_balance: "",
              from_account_equity: "",
              to_account: "",
              mt5_account: "",
              wallet_code: "",
              amount: "",
              isOTP: false,
              currency: "",
              otp: "",
            });
          }
        });
    }
  };
  return (
    <div className="app-content--inner">
      <div className="app-content--inner__wrapper mh-100-vh">
        <div style={{ opacity: 1 }}>
          <Grid container>
            <Grid item sm={12}></Grid>
            <Grid item xl={1}></Grid>
            <Grid item xl={10} md={12} lg={12}>
              {/* <TopButton /> */}
              <Grid container spacing={6}>
                <Grid item md={12}>
                  <Paper
                    elevation={1}
                    style={{ borderRadius: "10px" }}
                    className="w-100 mb-5 internal-transfer-form"
                  >
                    <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                      <Grid container>
                        <Grid item md={6}>
                          <h5 className="font-weight-bold mb-0 text-dark">
                            Internal Transfer
                          </h5>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="divider"></div>
                    <div className="card-body position-relative pt-0">
                      <form>
                        <Grid container spacing={3}>
                          <Grid item md={4} className="d-flex pb-0 ">
                            <div className="from_account_section">
                              <FormControl
                                className="form-control pt-3"
                                error={form.from_account == "" ? true : false}
                              >
                                <label className="text-info font-weight-bold form-label-head w-100 required">
                                  FROM ACCOUNT
                                </label>
                                <Select
                                  value={form.from_account}
                                  name="from_account"
                                  onChange={input}
                                  displayEmpty
                                  onBlur={trueFalse}
                                  disabled={form.isLoader}
                                  inputProps={{
                                    "aria-label": "Without label",
                                  }}
                                  input={<BootstrapInput />}
                                  sx={{ width: "100%" }}
                                >
                                  <MenuItem value="">Select Option</MenuItem>
                                  <MenuItem value="MT5">MT5</MenuItem>
                                  <MenuItem value="wallet">wallet</MenuItem>
                                </Select>
                                {form.from_account == "" &&
                                infoTrue.from_account == true ? (
                                  <FormHelperText>
                                    Please Select From Account
                                  </FormHelperText>
                                ) : (
                                  ""
                                )}
                              </FormControl>
                              {isInputMT5 ? (
                                <FormControl
                                  className="form-control pt-3"
                                  error={
                                    form.from_account_mt5 == "" ? true : false
                                  }
                                >
                                  <label className="text-info font-weight-bold form-label-head w-100 required">
                                    From MT5 Account ID
                                  </label>
                                  <Select
                                    value={form.from_account_mt5}
                                    name="from_account_mt5"
                                    onChange={input}
                                    disabled={form.isLoader}
                                    displayEmpty
                                    onBlur={trueFalse}
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                    input={<BootstrapInput />}
                                    sx={{ width: "100%" }}
                                  >
                                    <MenuItem value="">Select Option</MenuItem>
                                    {mt5AccountList.data.map((item) => {
                                      return (
                                        <MenuItem value={item.mt5_acc_no}>
                                          {item.mt5_acc_no} ({item.mt5_name})
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                  {form.from_account_mt5 == "" &&
                                  infoTrue.from_account_mt5 == true ? (
                                    <FormHelperText>
                                      Please Select From MT5 Account ID
                                    </FormHelperText>
                                  ) : (
                                    ""
                                  )}
                                </FormControl>
                              ) : (
                                ""
                              )}
                              {form.from_account_balance != "" ? (
                                <div className="show-balance-element">
                                  Balance {form.from_account_balance}
                                </div>
                              ) : (
                                ""
                              )}
                              {form.from_account_equity != "" ? (
                                <div
                                  className="show-balance-element"
                                  style={{ background: "#39b54a" }}
                                >
                                  Equity {form.from_account_equity}{" "}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </Grid>
                          <Grid
                            item
                            md={4}
                            className="d-flex pb-0 removeTopPadding"
                          >
                            <div className="from_account_section">
                              {form.from_account == "MT5" ? (
                                <FormControl
                                  className="form-control pt-3"
                                  error={form.to_account == "" ? true : false}
                                >
                                  <label className="text-info font-weight-bold form-label-head w-100 required">
                                    TO ACCOUNT
                                  </label>
                                  <Select
                                    value={form.to_account}
                                    name="to_account"
                                    onChange={input}
                                    disabled={form.isLoader}
                                    displayEmpty
                                    onBlur={trueFalse}
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                    input={<BootstrapInput />}
                                  >
                                    <MenuItem value="">Select Option</MenuItem>
                                    <MenuItem value="wallet">wallet</MenuItem>
                                  </Select>
                                  {form.to_account == "" &&
                                  infoTrue.to_account == true ? (
                                    <FormHelperText>
                                      Please Select To Account
                                    </FormHelperText>
                                  ) : (
                                    ""
                                  )}
                                </FormControl>
                              ) : (
                                <FormControl
                                  className="form-control pt-3"
                                  error={form.to_account == "" ? true : false}
                                >
                                  <label className="text-info font-weight-bold form-label-head w-100 required">
                                    TO ACCOUNT
                                  </label>
                                  <Select
                                    value={form.to_account}
                                    name="to_account"
                                    onChange={input}
                                    disabled={form.isLoader}
                                    displayEmpty
                                    onBlur={trueFalse}
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                    input={<BootstrapInput />}
                                  >
                                    <MenuItem value="">Select Option</MenuItem>

                                    <MenuItem value="MT5">MT5</MenuItem>
                                  </Select>
                                  {form.to_account == "" &&
                                  infoTrue.to_account == true ? (
                                    <FormHelperText>
                                      Please Select To Account
                                    </FormHelperText>
                                  ) : (
                                    ""
                                  )}
                                </FormControl>
                              )}

                              {isInputToMT5 ? (
                                <FormControl
                                  className="form-control pt-3"
                                  error={form.mt5_account == "" ? true : false}
                                >
                                  <label className="text-info font-weight-bold form-label-head w-100 required">
                                    MT5 Account ID
                                  </label>
                                  <Select
                                    value={form.mt5_account}
                                    name="mt5_account"
                                    onChange={input}
                                    disabled={form.isLoader}
                                    displayEmpty
                                    onBlur={trueFalse}
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                    input={<BootstrapInput />}
                                    sx={{ width: "100%" }}
                                  >
                                    <MenuItem value="">Select Option</MenuItem>
                                    {mt5AccountList.data.map((item) => {
                                      return (
                                        <MenuItem value={item.mt5_acc_no}>
                                          {item.mt5_acc_no} ({item.mt5_name})
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                  {form.mt5_account == "" &&
                                  infoTrue.mt5_account == true ? (
                                    <FormHelperText>
                                      Please Select MT5 Account ID
                                    </FormHelperText>
                                  ) : (
                                    ""
                                  )}
                                </FormControl>
                              ) : (
                                ""
                              )}
                            </div>
                          </Grid>
                          <Grid item md={4} className="pb-0 removeTopPadding">
                            <FormControl
                              className="form-control pt-md-3"
                              error={form.amount == "" ? true : false}
                            >
                              <div className="text-info font-weight-bold form-label-head w-100 required">
                                AMOUNT
                              </div>
                              <BootstrapInput
                                type="text"
                                value={form.amount}
                                disabled={form.isLoader}
                                name="amount"
                                onChange={(e) => {
                                  if (!isNaN(Number(e.target.value))) {
                                    input(e);
                                  }
                                }}
                                displayEmpty
                                onBlur={trueFalse}
                                inputProps={{ "aria-label": "Without label" }}
                              />
                              {form.amount == "" && infoTrue.amount == true ? (
                                <FormHelperText>
                                  Please Enter Amount
                                </FormHelperText>
                              ) : (
                                ""
                              )}
                            </FormControl>
                            {form.isOTP ? (
                              <FormControl
                                className="form-control pt-md-3"
                                error={form.otp == "" ? true : false}
                              >
                                <div className="text-info font-weight-bold form-label-head w-100 required">
                                  OTP
                                </div>
                                <BootstrapInput
                                  type="text"
                                  value={form.otp}
                                  disabled={form.isLoader}
                                  name="otp"
                                  onChange={(e) => {
                                    if (!isNaN(Number(e.target.value))) {
                                      input(e);
                                    }
                                  }}
                                  displayEmpty
                                  onBlur={trueFalse}
                                  inputProps={{ "aria-label": "Without label" }}
                                />
                                {form.otp == "" && infoTrue.otp == true ? (
                                  <FormHelperText>
                                    Please Enter OTP
                                  </FormHelperText>
                                ) : (
                                  ""
                                )}
                              </FormControl>
                            ) : (
                              ""
                            )}
                          </Grid>
                          <hr className="mar-10px" />
                          <Grid item md={12}>
                            <div className="mb-4 text-center">
                              {form.isLoader ? (
                                <ColorButton
                                  disabled
                                  className="internallodarbutton"
                                  sx={{
                                    padding: "20px 60px",
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
                                  </svg>
                                </ColorButton>
                              ) : (
                                <ColorButton onClick={submit}>
                                  Transfer
                                </ColorButton>
                              )}
                              {form.resendOtp == true ? (
                                form.resendOtploder ? (
                                  <ColorButton
                                    disabled
                                    // className="internallodarbutton"
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
                                    </svg>
                                  </ColorButton>
                                ) : (
                                  <ColorButton
                                    sx={{ marginLeft: "10px" }}
                                    disabled={timer}
                                    onClick={(e) => {
                                      form.isOTP = false;
                                      setForm({ ...form });
                                      submit(e);
                                    }}
                                  >
                                    {timer ? (
                                      <Counter
                                        reset={timer}
                                        setReset={setTimer}
                                      />
                                    ) : (
                                      "Resend OTP"
                                    )}
                                  </ColorButton>
                                )
                              ) : (
                                ""
                              )}
                            </div>
                          </Grid>
                        </Grid>
                      </form>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default InternalTransfer;
