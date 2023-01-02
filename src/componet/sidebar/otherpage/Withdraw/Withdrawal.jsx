import React, { useState, useEffect } from "react";
import { FormHelperText, Grid } from "@mui/material";
import TopButton from "../../../customComponet/TopButton";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ColorButton } from "../../../customComponet/CustomElement";
import { BootstrapInput } from "../../../customComponet/CustomElement";
import { IsApprove, Url } from "../../../../global";
import axios from "axios";
import { use } from "i18next";
import Counter from "../../../customComponet/Counter";

export const Withdrawal = () => {
  const [option, setOption] = useState("");
  const [disable, setDisable] = useState(false);
  const [checked, setChecked] = useState();
  const navigate = useNavigate();
  const [mainLoader, setMainLoader] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [ageErrors, setAgeErrors] = useState({});
  const [upiType, setUpiType] = useState("");
  const [timer, setTimer] = useState(true);
  const [cryptoType, setCryptoType] = useState("");
  const [bankMenu, setBankMenu] = useState([]);
  const [infoTrue, setinfoTrue] = useState({
    amount: false,
    payment_method: false,
    upi_crypto_ac_number: false,
    upi_name: false,
    user_bank_id: false,
    crypto_name: false,
  });
  const [age, setAge] = useState({
    amount: "",
    payment_method: "",
    upi_crypto_ac_number: "",
    upi_name: "",
    user_bank_id: "",
    crypto_name: "",
  });

  const [isLoader, setIsLoader] = useState(false);
  const [isLoader1, setIsLoader1] = useState(false);

  const [sendOtp, setSendOtp] = useState(true);
  const [finalData, setFinalData] = useState([]);
  const [status, setStatus] = useState();
  const [walletbalance, setwalletbalance] = useState("");
  const [scriptRun, setScriptRun] = useState(false);
  useEffect(() => {
    if (scriptRun) {
      const script = document.createElement("script");
      script.src = "/dimage/socket.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [scriptRun]);
  const trueFalse = (event) => {
    var { name, value } = event.target;
    setinfoTrue((prevalue) => {
      return {
        ...prevalue,
        [name]: true,
      };
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAge((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
    if (value == "Bank" && name == "payment_method") {
      axios.post(`${Url}/ajaxfiles/view_bank_details.php`).then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        setBankMenu(res.data.data);
      });
    }
    console.log(event.target.value);
  };
  const walletbalancefun = () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("action", "get_wallet_balance");
    axios.post(Url + "/ajaxfiles/common_api.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      setwalletbalance(res.data.wallet_balance);
    });
  };
  const input = (event) => {
    if (!setChecked(event.target.checked)) {
      setDisable(!disable);
    } else {
      setDisable(disable);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setAgeErrors(validate(age));
    setIsSubmit(true);
  };
  const withdrawAmount = () => {
    console.log("withdrawAmount", age);
    const param = new FormData();
    param.append("payment_method", age.payment_method);
    if (age.payment_method == "Bank") {
      param.append("user_bank_id", age.user_bank_id);
      console.log("age.user_bank_id", age.user_bank_id);
    } else if (age.payment_method == "UPI") {
      param.append("upi_name", age.upi_name);
      param.append("upi_crypto_ac_number", age.upi_crypto_ac_number);
    } else if (age.payment_method == "Crypto") {
      param.append("crypto_name", age.crypto_name);
      param.append("upi_crypto_ac_number", age.upi_crypto_ac_number);
    } else if (age.payment_method == "cash") {
      // param.append("username", info.email);
    }
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("amount", age.amount);
    param.append("otp", age.otp);
    axios.post(Url + "/ajaxfiles/withdraw_amount.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        navigate("/");
      }
      if (res.data.status == "error") {
        notify(res.data.message);
        setIsLoader1(false);
      } else {
        setIsLoader1(false);
        toast.success(res.data.message);

        setAge({
          amount: "",
          payment_method: "",
          upi_crypto_ac_number: "",
          upi_name: "",
          user_bank_id: "",
          crypto_name: "",
        });
        setinfoTrue({
          amount: false,
          payment_method: false,
          upi_crypto_ac_number: false,
          upi_name: false,
          user_bank_id: false,
          crypto_name: false,
        });
        setSendOtp(true);
        setScriptRun(!scriptRun);
      }
    });
  };
  const verifyOtp = () => {
    if (age.otp) {
      setIsLoader1(true);
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      param.append("otp", age.otp);
      param.append("action", "verify_withdraw_otp");
      axios
        .post(Url + "/ajaxfiles/withdraw_send_otp.php", param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            navigate("/");
          }
          if (res.data.status == "error") {
            notify(res.data.message);
            setIsLoader1(false);
          } else {
            toast.success(res.data.message);
            // setScriptRun(true);=
            withdrawAmount(); // client.emit('playSound');
          }
        });
    } else {
      notify("otp is required");
    }
  };
  const validate = (values) => {
    const errors = {};
    if (!values.payment_method) {
      errors.payment_method = "Transaction getway required";
      notify("Transaction getway required");
    } else if (values.payment_method == "Bank") {
      if (!values.user_bank_id) {
        errors.user_bank_id = "BANK ACCOUNT is required";
        notify("BANK ACCOUNT is required");
      }
    } else if (values.payment_method == "UPI") {
      if (!values.upi_name) {
        errors.upi_name = "Upi type is required";
        notify("Upi type is required");
      } else if (!values.upi_crypto_ac_number) {
        errors.upi_crypto_ac_number = "UPIID is required";
        notify("UPIID is required");
      }
    } else if (values.payment_method == "Crypto") {
      if (!values.crypto_name) {
        errors.crypto_name = "Crypto type is required";
        notify("Crypto type is required");
      } else if (!values.upi_crypto_ac_number) {
        errors.upi_crypto_ac_number = "Crypto Address is required";
        notify("Crypto Address is required");
      }
    } else if (values.payment_method == "BANK") {
      if (!values.account) {
        errors.account = "Must mention from account";
        notify("Must mention from account");
      } else if (!values.bankAccount) {
        errors.bankAccount = "Enter the Bank Account";
        notify("Enter the Bank Account");
      }
    } else if (!values.amount) {
      errors.amount = "AMOUNT is required";
      notify("Amount is required");
    }
    return errors;
  };
  const notify = (p) => {
    toast.error(p);
  };
  toast.configure();
  console.log("age", age);
  console.log("FinalData", finalData);

  const fatchKycStatus = async () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    await axios
      .post(Url + "/ajaxfiles/get_kyc_status.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          setMainLoader(false);
          setStatus(res.data.kyc_data.master_status);
        } else {
          setMainLoader(false);

          setStatus(res.data.kyc_data.master_status);
          // if (res.data.kyc_data.master_status == "2") {

          // } else {

          // }
        }
      });
  };
  useEffect(() => {
    fatchKycStatus();
    walletbalancefun();
  }, []);

  useEffect(() => {
    if (Object.keys(ageErrors).length === 0 && isSubmit) {
      setIsLoader(true);
      const param = new FormData();
      param.append("payment_method", age.payment_method);

      if (age.payment_method == "Bank") {
        param.append("user_bank_id", age.user_bank_id);
        console.log("age.user_bank_id", age.user_bank_id);
      } else if (age.payment_method == "UPI") {
        param.append("upi_name", age.upi_name);
        param.append("upi_crypto_ac_number", age.upi_crypto_ac_number);
      } else if (age.payment_method == "Crypto") {
        param.append("crypto_name", age.crypto_name);
        param.append("upi_crypto_ac_number", age.upi_crypto_ac_number);
      } else if (age.payment_method == "cash") {
        // param.append("username", info.email);
      }

      param.append("amount", age.amount);
      param.append("action", "send_withdraw_otp");
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      axios
        .post(Url + "/ajaxfiles/withdraw_send_otp.php", param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            navigate("/");
          }
          if (res.data.status == "ok") {
            toast.success(res.data.message);
            setTimer(true);
            setSendOtp(false);
            setIsLoader(false);
          } else {
            console.log("dbsad");

            setIsLoader(false);
            notify(res.data.message);
            setFinalData(param);
          }
        });
      // const param = new FormData();
      // param.append("username", info.email);
      // param.append("password", info.password);
      // axios.post(Url + '/ajaxfiles/login_check.php', param).then((res) => {
    }
  }, [ageErrors, isSubmit, navigate]);

  const menuItem = () => {
    if (option == "bank") {
      return (
        <Grid
          item
          md={12}
          className="pb-0"
          style={{ padding: "12px", paddingTop: "0" }}
        >
          <FormControl className="py-4 w-100">
            {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
            <label
              htmlFor="bankAccount"
              className="text-info font-weight-bold form-label-head w-100  required"
            >
              BANK ACCOUNT
            </label>
            <Select
              value={age.bankAccount}
              name="user_bank_id"
              onChange={handleChange}
              disabled={!sendOtp}
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
              {!bankMenu
                ? ""
                : bankMenu.map((item) => {
                    return (
                      <MenuItem value={item.user_bank_id}>
                        {item.bank_account_holder_name} {"("}
                        {item.bank_account_number}
                        {")"}
                      </MenuItem>
                    );
                  })}
            </Select>
            {bankMenu.length == "0" ? (
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
            )}
            {age.user_bank_id == "" && infoTrue.user_bank_id == true ? (
              <FormHelperText>Please Select Bank Account</FormHelperText>
            ) : (
              ""
            )}
            {/* <p>
              No Bank Account added
              <NavLink to="/bankAccounts">

                <ColorButton
                  type="submit"
                  variant="contained"
                  size="small"
                  className="mt-2 p-3 text-capitalize"
                >
                  Add new Bank Account
                </ColorButton>
              </NavLink>
            </p> */}
          </FormControl>
        </Grid>
      );
    } else if (option == "UPI") {
      return (
        <Grid
          item
          md={12}
          className="pb-0"
          style={{ padding: "12px", paddingTop: "0" }}
        >
          <FormControl className="py-4 w-100">
            {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
            <label
              htmlFor="upitype"
              className="text-info font-weight-bold form-label-head w-100  required"
            >
              Upi type
            </label>
            <Select
              value={age.upi_name}
              name="upi_name"
              onChange={handleChange}
              disabled={!sendOtp}
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
              <MenuItem value="Google Pay">Google Pay</MenuItem>
              <MenuItem value="Phone Pay">Phone Pay</MenuItem>
              <MenuItem value="Paytm">Paytm</MenuItem>
            </Select>
            {age.upi_name == "" && infoTrue.upi_name == true ? (
              <FormHelperText>Please Select Upi type</FormHelperText>
            ) : (
              ""
            )}
            {age.upi_name ? (
              <>
                {" "}
                <label
                  htmlFor="upi_crypto_ac_number"
                  className="text-info font-weight-bold form-label-head w-100 mt-4 required"
                >
                  Upi Id
                </label>
                <BootstrapInput
                  name="upi_crypto_ac_number"
                  type="text"
                  disabled={!sendOtp}
                  value={age.upi_crypto_ac_number}
                  onChange={handleChange}
                  displayEmpty
                  onBlur={trueFalse}
                  inputProps={{
                    "aria-label": "Without label",
                  }}
                />
                {age.upi_crypto_ac_number == "" &&
                infoTrue.upi_crypto_ac_number == true ? (
                  <FormHelperText>Please Enter Upi Id</FormHelperText>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </FormControl>
        </Grid>
      );
    } else if (option == "Crypto") {
      return (
        <Grid
          item
          md={12}
          className="pb-0"
          style={{ padding: "12px", paddingTop: "0" }}
        >
          <FormControl className="py-4 w-100">
            {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
            <label
              htmlFor="crypto_name"
              className="text-info font-weight-bold form-label-head w-100  required"
            >
              Crypto type
            </label>
            <Select
              value={age.crypto_name}
              name="crypto_name"
              onChange={handleChange}
              disabled={!sendOtp}
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
              <MenuItem value="BTC">Bitcoin</MenuItem>
              <MenuItem value="ETH ">Ethereum</MenuItem>
              <MenuItem value="USDT">USDT</MenuItem>
              <MenuItem value="LIT">Litecoin</MenuItem>
            </Select>
            {age.crypto_name == "" && infoTrue.crypto_name == true ? (
              <FormHelperText>Please Select Crypto type</FormHelperText>
            ) : (
              ""
            )}
            {age.crypto_name ? (
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
                  disabled={!sendOtp}
                  displayEmpty
                  inputProps={{
                    "aria-label": "Without label",
                  }}
                  onBlur={trueFalse}
                />
                {age.upi_crypto_ac_number == "" &&
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
        </Grid>
      );
    }
  };

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          {mainLoader == true ? (
            <div className="loader1">
              <div className="clock">
                <div className="pointers"></div>
              </div>
            </div>
          ) : (
            <div style={{ opacity: 1 }}>
              <Grid container>
                <Grid item sm={12}></Grid>
                <Grid item xl={1}></Grid>
                <Grid item xl={10} md={12} lg={12}>
                  <TopButton />
                  <Grid container spacing={5}>
                    <Grid item md={6} className="mb-2 mb-md-5">
                      <Paper
                        elevation={1}
                        style={{ borderRadius: "10px" }}
                        className="w-100 h-100"
                      >
                        <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                          <h5 className="font-weight-bold mb-0 text-dark">
                            Withdrawal
                          </h5>
                          <h5 className="walltebalcss">
                            Wallet Balance : {`$${walletbalance}`}
                          </h5>
                        </div>
                        <div className="divider"></div>

                        <div className="card-body position-relative">
                          {status == "1" ? (
                            ""
                          ) : (
                            <div className="loader">
                              <ColorButton
                                variant="contained"
                                size="large"
                                sx={{ textTransform: "uppercase" }}
                                onClick={() => {
                                  navigate("/myDocuments");
                                }}
                              >
                                first complete your kyc process
                              </ColorButton>
                            </div>
                          )}

                          {walletbalance == 0 && status == "1" ? (
                            <div
                              className="loader"
                              style={{ flexDirection: "column" }}
                            >
                              <p style={{ padding: "0 15px" }}>
                                You don't have sufficient wallet balance, please
                                transfer amount into your wallet from your mt5
                                account
                              </p>
                              <ColorButton
                                variant="contained"
                                size="large"
                                sx={{ textTransform: "uppercase" }}
                                onClick={() => {
                                  navigate("/internal_transfer");
                                }}
                              >
                                Goto Transfer
                              </ColorButton>
                            </div>
                          ) : (
                            ""
                          )}

                          <Grid container spacing={6}>
                            <Grid item md={12} className="pt-1">
                              <form onSubmit={handleSubmit}>
                                <Grid
                                  container
                                  spacing={3}
                                  style={{ marginLeft: "-12px" }}
                                >
                                  <Grid
                                    item
                                    md={12}
                                    className="pb-0"
                                    style={{ padding: "12px" }}
                                  >
                                    <FormControl
                                      className="py-4 w-100 "
                                      error={
                                        age.payment_method == "" ? true : false
                                      }
                                    >
                                      {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
                                      <label
                                        htmlFor="transactionGateway"
                                        className="text-info font-weight-bold form-label-head w-100 mt-4 required"
                                      >
                                        TRANSACTION GATEWAYS
                                      </label>
                                      <Select
                                        value={age.payment_method}
                                        name="payment_method"
                                        onChange={handleChange}
                                        disabled={!sendOtp}
                                        displayEmpty
                                        inputProps={{
                                          "aria-label": "Without label",
                                        }}
                                        input={<BootstrapInput />}
                                        className="mt-0 ml-0"
                                        id="fullWidth"
                                        onBlur={trueFalse}
                                      >
                                        <MenuItem
                                          value=""
                                          onClick={() => setOption("")}
                                        >
                                          Select Option
                                        </MenuItem>
                                        <MenuItem
                                          value="Bank"
                                          onClick={() => setOption("bank")}
                                        >
                                          BANK
                                        </MenuItem>
                                        <MenuItem
                                          value="UPI"
                                          onClick={() => setOption("UPI")}
                                        >
                                          UPI
                                        </MenuItem>
                                        <MenuItem
                                          value="Cash"
                                          onClick={() => setOption("Cash")}
                                        >
                                          CASH
                                        </MenuItem>
                                        <MenuItem
                                          value="Crypto"
                                          onClick={() => setOption("Crypto")}
                                        >
                                          CRYPTO
                                        </MenuItem>
                                      </Select>
                                      {age.payment_method == "" &&
                                      infoTrue.payment_method == true ? (
                                        <FormHelperText>
                                          Please Select Transaction Gateways
                                        </FormHelperText>
                                      ) : (
                                        ""
                                      )}
                                    </FormControl>
                                  </Grid>
                                  <hr className="my-2"></hr>
                                  <Grid item md={12} className="py-0"></Grid>

                                  {menuItem()}

                                  {option !== "Cash" && option != "" ? (
                                    <hr className="m-0"></hr>
                                  ) : (
                                    ""
                                  )}
                                  <Grid
                                    item
                                    md={12}
                                    className="py-0"
                                    style={{ padding: "12px" }}
                                  >
                                    <FormControl
                                      className="pb-4 w-100"
                                      error={
                                        age.amount == "" ||
                                        age.amount > walletbalance
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
                                        value={age.amount}
                                        type="text"
                                        name="amount"
                                        disabled={!sendOtp}
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
                                      {age.amount == "" &&
                                      infoTrue.amount == true ? (
                                        <FormHelperText>
                                          Please Enter Amount In USD
                                        </FormHelperText>
                                      ) : age.amount > walletbalance &&
                                        infoTrue.amount == true ? (
                                        <FormHelperText>
                                          Insufficient fund in your wallet.
                                        </FormHelperText>
                                      ) : (
                                        ""
                                      )}
                                    </FormControl>
                                  </Grid>
                                  {sendOtp ? (
                                    ""
                                  ) : (
                                    <>
                                      <hr className="m-0" />{" "}
                                      <Grid
                                        item
                                        md={12}
                                        className="py-0"
                                        style={{ padding: "12px" }}
                                      >
                                        <FormControl
                                          className="w-100"
                                          error={age.otp == "" ? true : false}
                                        >
                                          {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
                                          <label
                                            htmlFor="otp"
                                            className="text-info font-weight-bold form-label-head w-100 mt-4 required"
                                          >
                                            Enter OTP
                                          </label>
                                          <BootstrapInput
                                            name="otp"
                                            type="text"
                                            // onChange={(e) => {
                                            //   if (
                                            //     !isNaN(Number(e.target.value))
                                            //   ) {
                                            //     handleChange(e);
                                            //   }
                                            // }}
                                            onChange={(e) => {
                                              if (
                                                e.target.value === "" ||
                                                /^[0-9]*$/.test(e.target.value)
                                              ) {
                                                console.log("ok right");
                                                handleChange(e);
                                              }
                                            }}
                                            value={age.otp}
                                            // onChange={(e) => {
                                            //   if (
                                            //     !isNaN(Number(e.target.value))
                                            //   ) {
                                            //     handleChange(e);
                                            //   }
                                            // }}
                                            displayEmpty
                                            inputProps={{
                                              "aria-label": "Without label",
                                            }}
                                            onBlur={trueFalse}
                                          />
                                          {age.otp == "" &&
                                          infoTrue.otp == true ? (
                                            <FormHelperText>
                                              Please Enter OTP
                                            </FormHelperText>
                                          ) : (
                                            ""
                                          )}
                                        </FormControl>
                                      </Grid>
                                    </>
                                  )}
                                </Grid>
                                {option && (
                                  <FormControl>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={checked}
                                          onChange={input}
                                          required
                                        />
                                      }
                                      label={`I confirm, the Amount I added is correct`}
                                    />
                                  </FormControl>
                                )}
                                <Grid
                                  container
                                  spacing={3}
                                  sx={{ marginTop: "12px" }}
                                >
                                  <Grid
                                    item
                                    md={12}
                                    className="d-flex centerflexjus"
                                  >
                                    {!sendOtp ? (
                                      isLoader1 == true ? (
                                        <ColorButton
                                          tabindex="0"
                                          size="large"
                                          disabled
                                          sx={{ padding: "20px 50px" }}
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
                                          </svg>{" "}
                                        </ColorButton>
                                      ) : (
                                        <>
                                          <ColorButton
                                            onClick={verifyOtp}
                                            className=""
                                          >
                                            Submit
                                          </ColorButton>
                                        </>
                                      )
                                    ) : (
                                      ""
                                    )}
                                    {isLoader == true ? (
                                      <ColorButton
                                        tabindex="0"
                                        size="large"
                                        disabled
                                        sx={{
                                          padding: "20px 50px",
                                          marginLeft: "10px",
                                        }}
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
                                        </svg>{" "}
                                      </ColorButton>
                                    ) : sendOtp ? (
                                      <ColorButton
                                        type="submit"
                                        disabled={
                                          !disable || age.amount > walletbalance
                                            ? true
                                            : false
                                        }
                                        className="m-auto"
                                      >
                                        Send OTP
                                      </ColorButton>
                                    ) : (
                                      <>
                                        <ColorButton
                                          sx={{ marginLeft: "10px" }}
                                          disabled={timer}
                                          type="submit"
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
                                      </>
                                    )}
                                  </Grid>
                                </Grid>
                              </form>
                            </Grid>
                          </Grid>
                        </div>
                      </Paper>
                    </Grid>
                    <Grid item md={6} className="mb-2 mb-md-5">
                      <Paper
                        elevation={1}
                        style={{ borderRadius: "10px" }}
                        className="w-100 h-100"
                      >
                        <div className="card-body position-relative">
                          <Grid container spacing={6}>
                            <Grid item md={12} className="p-md-5">
                              <h5 className="text-center text-danger font-weight-bold">
                                <i>Important Notice</i>
                              </h5>
                              <div className="text-dark pt-4 text-align-justify">
                                <i className="text-align-justify">
                                  Right Fx, in accordance with international
                                  laws on combating terrorist financing and
                                  money laundering, does not accept payments
                                  from third parties & payments to third parties
                                  are not carried out.
                                  <br></br>
                                  <br></br>
                                  Right Fx may require additional documentation
                                  /information from you to prove your bank
                                  account held in your name as third party
                                  payments are not permitted.
                                  <br></br>
                                  <br></br>
                                  All withdrawals will be returned to the
                                  original source of funding. any profits on
                                  your account must be retumed to you via bank
                                  transfer.
                                </i>
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
          )}
        </div>
      </div>
    </div>
  );
};
