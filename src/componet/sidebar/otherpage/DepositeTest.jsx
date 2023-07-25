import React, { useState, useEffect, useRef } from "react";
import { FormHelperText, Grid, MenuItem, Select } from "@mui/material";
import { Paper } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { NavLink, useParams } from "react-router-dom";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  BootstrapInput,
  ColorButton,
} from "../../customComponet/CustomElement";
import "./otherpage.css";
import "./deposit.css";

import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import axios from "axios";
import { IsApprove, Url } from "../../../global";
import { useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Toast from "../../commonComponet/Toast";
import { toast } from "react-toastify";
import CustomImageModal from "../../customComponet/CustomImageModal";
const DepositeTest = (prop) => {
  const { id } = useParams();
  const [dataArray, setDataArray] = useState({
    accountList: [],
    paymentOption: [],
  });
  const [dataOFBonus, setDataOFBonus] = useState({
    aed_rate: "",
    usd_rate: "",
    bonusAmount: "",
    bonus_image1: "",
    bonus_image2: "",
    bonus_image3: "",
    lot: "",
  });
  const [mainLoader, setMainLoader] = useState({
    paymentOption: true,
    accountList: true,
  });
  const [spinMt5, setSpinMt5] = useState("");
  const [hideBonus, setHideBonus] = useState(true);
  const [info, setInfo] = useState({
    amount: "",
    image: [],
    depositTo: "",
    selectPaymentOption: "",
    selsectRadio: "",
    bank_details: [],
    utn: "",
    is_auto: "",
    slug: "",
    qrcode_url: "",
    cryptoData: "",
  });
  const [epayData, setEpayData] = useState({
    refrence_no: "",
    customer_id: "",
    amount: "",
    epay_is_demo: "0",
  });
  const [bankShow, setBankShow] = useState({
    show_bank_method: true,
    minimum_deposit: "",
  });
  const [infoTrue, setinfoTrue] = useState({
    amount: false,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;

    setInfo((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
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
  const navigate = useNavigate();
  useEffect(() => {
    getPaymentOption();
    getMt5AccountList();
    if (id) {
      info.depositTo = id;
      setInfo({ ...info });
    }
  }, []);
  // useEffect(() => {
  //   const script = document.createElement("script");

  //   script.src = "https://epay.me/sdk/v2/stage-websdk.js";

  //   // script.async = true;

  //   document.body.appendChild(script);

  //   setTimeout(() => {

  //   }, 100);
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);
  const onsubmitEpay = () => {
    if (info.selectPaymentOption == "") {
      Toast("error", "Please select deposit type");
    } else if (info.depositTo == "") {
      Toast("error", "Please select mt5 account");
    } else if (info.amount == "") {
      Toast("error", "Amount is required");
    } else {
      const script = document.createElement("script");
      if (epayData.epay_is_demo == 0) {
        script.src = " https://epay.me/sdk/v2/websdk.js";
        script.async = true;
      } else if (epayData.epay_is_demo == 1) {
        script.src = "https://epay.me/sdk/v2/stage-websdk.js";
        script.async = true;
      }

      document.body.appendChild(script);
      info.isLoader = true;
      setInfo({ ...info });
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      if (info.depositTo == "wallet") {
        param.append("deposit_to", "wallet");
      } else {
        param.append("deposit_to", "MT5");
        param.append("mt5_acc_no", info.depositTo);
      }
      param.append("bonus_percentage", info.selsectRadio);
      param.append("deposit_method", info.slug);
      param.append("amount", info.amount);
      axios.post(Url + "/ajaxfiles/add_deposit.php", param).then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          Toast("error", res.data.message);
          info.isLoader = false;
          setInfo({ ...info });
        } else {
          info.isLoader = false;
          epayData.refrence_no = res.data.refrence_no;
          epayData.customer_id = res.data.customer_id;
          epayData.amount = res.data.amount;
          epayData.mid = res.data.mid;
          setEpayData({ ...epayData });
          setInfo({ ...info });
          var oneTime = true;
          const option = {
            channelId: "WEB",
            merchantId: res.data.mid,
            orderID: res.data.refrence_no,
            orderDescription: "ds",
            emailId: "gray@rightfx.com",
            customerId: res.data.customer_id,
            merchantType: "ECOMMS",
            orderAmount: res.data.amount,
            orderCurrency: "USD",
            showSavedCardsFeature: true,
            merchantLogo: "",
            successHandler: async function (res1) {
              if (res1.response.transt == "failed" && res1.status == "ok") {
                if (oneTime) {
                  const param1 = new FormData();
                  param1.append("mid", res.data.mid);
                  param1.append("orderid", res.data.refrence_no);
                  axios
                    .post(Url + "/api/epay_deposit_failed.php", param1)
                    .then((res2) => {
                      Toast("error", res2.data.message);
                    });

                  oneTime = false;
                }
              } else if (
                res1.status == "ok" &&
                res1.response.transt == "completed"
              ) {
                navigate(`/deposit_history`);
              }

              document.body.removeChild(script);
            },
            failedHandler: async function (res) {
              document.body.removeChild(script);
              if (oneTime) {
                Toast("error", "Please Try Again");
                oneTime = false;
              }
            },
          };
          // eslint-disable-next-line
          const epay = new Epay(option);
          epay.open(option);
          // Toast("success", res.data.message);
        }
      });
    }
  };
  const onsubmit = async () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }

    if (info.selectPaymentOption == "") {
      Toast("error", "Please select deposit type");
    } else if (info.depositTo == "") {
      Toast("error", "Please select mt5 account");
    } else if (info.amount == "") {
      Toast("error", "Amount is required");
    } else if (
      (info.slug == "upi" ||
        info.slug == "bank" ||
        info.slug == "phonepe" ||
        info.slug == "paytm" ||
        info.slug == "gpay") &&
      (!info.image || info.image?.length == 0)
    ) {
      Toast("error", "image is required");
    } else if (
      (info.slug == "USDT.TRC20" ||
        info.slug == "BTC" ||
        info.slug == "ETH" ||
        info.slug == "LTC") &&
      (!info.image || info.image?.length == 0) &&
      info.is_auto == "0"
    ) {
      Toast("error", "image is required");
    } else if (
      (info.slug == "USDT.TRC20" ||
        info.slug == "BTC" ||
        info.slug == "ETH" ||
        info.slug == "LTC") &&
      !info.utn &&
      info.is_auto == "0"
    ) {
      Toast("error", "Crypto Address is required");
    } else {
      param.append("deposit_method", info.slug);
      param.append("amount", info.amount);
      // param.append("bonus_percentage", info.selsectRadio);
      if (info.depositTo == "wallet") {
        param.append("deposit_to", "wallet");
      } else {
        param.append("deposit_to", "MT5");
        param.append("mt5_acc_no", info.depositTo);
      }
      param.append("bonus_percentage", info.selsectRadio);

      param.append("crypto_address", info.utn);

      if (
        (info.slug == "upi" ||
          info.slug == "bank" ||
          info.slug == "phonepe" ||
          info.slug == "paytm" ||
          info.slug == "gpay") &&
        info.image
      ) {
        // param.append("deposit_proof", info.image);
        info.image.map((item, index) => {
          param.append(`deposit_proof[${index}]`, item);
        });
      }

      if (
        (info.slug == "USDT.TRC20" ||
          info.slug == "BTC" ||
          info.slug == "ETH" ||
          info.slug == "LTC") &&
        info.image &&
        info.is_auto == "0"
      ) {
        info.image.map((item, index) => {
          param.append(`deposit_proof[${index}]`, item);
        });
      }
      info.isLoader = true;
      setInfo({ ...info });
      await axios
        .post(Url + "/ajaxfiles/add_deposit.php", param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            navigate("/");
          }
          if (res.data.status == "error") {
            Toast("error", res.data.message);
            info.isLoader = false;
            setInfo({ ...info });
          } else {
            info.isLoader = false;
            setInfo({ ...info });
            if (res.data.data) {
              //   setSeconds(res.data.data.timeout);
              //   setCryptoData(res.data.data);
              //   setShowData("none");
              info.cryptoData = res.data.data;
              setInfo({ ...info });
            } else if (info.slug == "cash") {
              navigate(`/deposit/t/${res.data.deposit_id}`);
            } else {
              navigate(`/deposit/${info.amount}/${info.depositTo}`);
            }
            Toast("success", res.data.message);
            window.client.emit("playSound");
          }
        });
    }
  };

  const getMt5AccountList = async (type) => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("action", "get_mt5_ac_list");
    await axios.post(Url + "/ajaxfiles/account_list.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        navigate("/");
      }
      if (res.data.status == "error") {
        Toast("error", res.data.message);
      } else {
        dataArray.accountList = res.data.mt5_accounts;
        if (res.data.mt5_accounts.length != 0) {
          if (id) {
            res.data.mt5_accounts.map((item, index) => {
              if (item.mt5_acc_no == id) {
                bankShow.minimum_deposit = parseFloat(item.minimum_deposit);
                bankShow.show_bank_method = item.show_bank_method;
                setBankShow({ ...bankShow });
              }
            });
          } else {
            info.depositTo = res.data.mt5_accounts[0].mt5_acc_no;
            setInfo({ ...info });
            bankShow.minimum_deposit = parseFloat(
              res.data.mt5_accounts[0].minimum_deposit
            );
            bankShow.show_bank_method =
              res.data.mt5_accounts[0].show_bank_method;
            setBankShow({ ...bankShow });
          }
          let test = res.data.mt5_accounts.filter(
            (x) => x.ib_group_name == "SPIN"
          )[0];
          if (test == undefined || test == "" || test == null) {
          } else {
            setSpinMt5(test.mt5_acc_no);
          }
        } else {
          info.depositTo =
            res.data.mt5_accounts.length == 0
              ? "wallet"
              : res.data.mt5_accounts[0].mt5_acc_no;
          setInfo({ ...info });
          bankShow.show_bank_method = true;
          setBankShow({ ...bankShow });
        }
        // setSpinMt5()
        setDataArray({ ...dataArray });
        // setDepositType(type);
        mainLoader.accountList = false;
        setMainLoader({ ...mainLoader });
      }
    });
  };
  const onCyptoSubmit = () => {
    navigate(navigate(`/deposit/${info.amount}/${info.depositTo}`));
  };
  const getPaymentOption = () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("action", "deposit_methods");
    axios.post(Url + "/ajaxfiles/common_api.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        navigate("/");
      }
      if (res.data.status == "error") {
        Toast("error", res.data.message);
      } else {
        dataOFBonus.bonusAmount = res.data.deposit_bonus_max_amount;
        dataOFBonus.usd_rate = res.data.usd_rate;
        dataOFBonus.bonus_image1 = res.data.bonus_image1;
        dataOFBonus.bonus_image2 = res.data.bonus_image2;
        dataOFBonus.bonus_image3 = res.data.bonus_image3;
        dataOFBonus.aed_rate = res.data.aed_rate;
        epayData.epay_is_demo = res.data.epay_is_demo;
        setEpayData({ ...epayData });
        dataOFBonus.lot = parseFloat(
          ((res.data.deposit_bonus_max_amount * 40) / 100).toFixed(2)
        );
        setDataOFBonus({ ...dataOFBonus });
        dataArray.paymentOption = res.data.data;
        setDataArray({ ...dataArray });
        mainLoader.paymentOption = false;
        setMainLoader({ ...mainLoader });
        // setDepositType(type);
      }
    });
  };

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          {mainLoader.accountList == true ||
          mainLoader.paymentOption == true ? (
            <div className="loader1">
              <span className="loader2"></span>
            </div>
          ) : (
            <div style={{ opacity: 1 }}>
              <Grid container>
                <Grid item sm={11}></Grid>
                <Grid item xl={1}></Grid>
                <Grid item xl={10} md={12} lg={12}>
                  <div className="webView">
                    <Grid container spacing={3}>
                      <Grid item md={12} className="d-flex">
                        <Paper
                          elevation={1}
                          style={{ borderRadius: "10px" }}
                          className="w-100 mb-3"
                        >
                          <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                            <Grid container spacing={3}>
                              <Grid item md={12} xs={12} sm={12}>
                                <div className="">
                                  <h5 className="font-weight-bold mb-0 text-dark ">
                                    Make a Deposit
                                  </h5>
                                </div>
                              </Grid>
                            </Grid>
                          </div>
                          <div className="divider"></div>
                          <Grid container spacing={3} sx={{ padding: "10px" }}>
                            {" "}
                            <Grid
                              item
                              md={4}
                              // style={{ padding: "9px 0px 0px 16px" }}
                            >
                              <FormControl className="w-100">
                                <label className="text-info font-weight-bold form-label-head w-100 required">
                                  Deposit To
                                </label>
                                <Select
                                  onChange={(e) => {
                                    info.depositTo = e.target.value;
                                    setInfo({ ...info });
                                    // setSelectedMT5AccountList(e.target.value);
                                  }}
                                  displayEmpty
                                  value={info.depositTo}
                                  inputProps={{ "aria-label": "Without label" }}
                                  input={<BootstrapInput />}
                                >
                                  {dataArray.accountList.map((item) => {
                                    return (
                                      <MenuItem
                                        value={item.mt5_acc_no}
                                        onClick={() => {
                                          bankShow.show_bank_method =
                                            item.show_bank_method;
                                          bankShow.minimum_deposit =
                                            item.minimum_deposit;
                                          setBankShow({ ...bankShow });
                                        }}
                                      >
                                        {item.mt5_acc_no} ({item.ib_group_name})
                                      </MenuItem>
                                    );
                                  })}
                                  <MenuItem
                                    value="wallet"
                                    onClick={() => {
                                      bankShow.show_bank_method = true;
                                      setBankShow({ ...bankShow });
                                    }}
                                  >
                                    Wallet
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid
                              item
                              md={8}
                              // style={{ padding: "9px 0px 0px 16px" }}
                            >
                              <Grid container spacing={3}>
                                <Grid item md={4}>
                                  {" "}
                                  <label className="text-info font-weight-bold form-label-head w-100 required">
                                    Amount in USD
                                  </label>
                                  <FormControl
                                    className="w-100"
                                    error={
                                      info.amount == "" && infoTrue == true
                                        ? true
                                        : false
                                    }
                                  >
                                    <BootstrapInput
                                      value={info.amount}
                                      name="amount"
                                      type="text"
                                      className="w-100"
                                      onBlur={trueFalse}
                                      onChange={(e) => {
                                        if (!isNaN(Number(e.target.value))) {
                                          // setAmount(e.target.value);
                                          info.amount = e.target.value;
                                          setInfo({ ...info });
                                        }
                                      }}
                                      displayEmpty
                                      inputProps={{
                                        "aria-label": "Without label",
                                      }}
                                      //   startAdornment={
                                      //     <InputAdornment position="start">
                                      //       $
                                      //     </InputAdornment>
                                      //   }

                                      //   InputProps={{
                                      //     startAdornment: (
                                      //       <InputAdornment position="start">
                                      //         <AccountCircle />
                                      //       </InputAdornment>
                                      //     ),
                                      //   }}
                                    />
                                    {info.amount == "" && infoTrue.amount ? (
                                      <FormHelperText>
                                        Amount is required
                                      </FormHelperText>
                                    ) : (
                                      ""
                                    )}
                                  </FormControl>
                                </Grid>
                                <Grid item md={4}>
                                  <label className="text-info font-weight-bold form-label-head w-100">
                                    INR
                                  </label>
                                  <BootstrapInput
                                    value={(
                                      info.amount * dataOFBonus.usd_rate
                                    ).toFixed(2)}
                                    name="otp"
                                    type="text"
                                    disabled
                                    className="w-100"
                                    onChange={(e) => {
                                      if (!isNaN(Number(e.target.value))) {
                                        // setAmount(e.target.value);
                                        info.amount = e.target.value;
                                        setInfo({ ...info });
                                      }
                                    }}
                                    displayEmpty
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                  />
                                </Grid>
                                <Grid item md={4}>
                                  <label className="text-info font-weight-bold form-label-head w-100 ">
                                    AED
                                  </label>
                                  <BootstrapInput
                                    value={(
                                      info.amount * dataOFBonus.aed_rate
                                    ).toFixed(2)}
                                    name="otp"
                                    type="text"
                                    disabled
                                    className="w-100"
                                    onChange={(e) => {
                                      if (!isNaN(Number(e.target.value))) {
                                        // setAmount(e.target.value);
                                        info.amount = e.target.value;
                                        setInfo({ ...info });
                                      }
                                    }}
                                    displayEmpty
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>

                          <div>
                            <ul className="pd-0 gridDeposit">
                              {dataArray.paymentOption.map((item, index) => {
                                if (item.status == 1) {
                                  return (
                                    <li
                                      onClick={() => {
                                        info.selectPaymentOption = item.title;
                                        info.image = [];
                                        info.utn = "";
                                        info.cryptoData = "";
                                        info.qrcode_url = item.qr_code;
                                        info.slug = item.slug;
                                        info.bank_details = item.bank_details;
                                        info.is_auto = item?.is_auto;
                                        info.isLoader = false;
                                        setInfo({ ...info });
                                      }}
                                      className={`lideposit mar-10 ${
                                        item.title == info.selectPaymentOption
                                          ? "active"
                                          : ""
                                      }`}
                                    >
                                      <a>
                                        <div
                                          title={item.title}
                                          onClick={() => {
                                            info.selectPaymentOption =
                                              item.title;
                                            info.image = [];
                                            info.utn = "";
                                            info.cryptoData = "";
                                            info.bank_details =
                                              item.bank_details;
                                            info.qrcode_url = item.qr_code;
                                            info.slug = item.slug;
                                            info.is_auto = item.is_auto;
                                            info.isLoader = false;
                                            setInfo({ ...info });
                                          }}
                                          //   onClick={modalopen}
                                          className=""
                                        >
                                          <img
                                            src={item.image_url}
                                            alt={item.title}
                                            title={item.title}
                                            className="h-80 m-auto"
                                            style={{
                                              objectFit: "contain",
                                              width: "100px",
                                              height: "40px",
                                            }}
                                          ></img>
                                        </div>
                                      </a>
                                    </li>
                                  );
                                  {
                                    /* if (
                                    item.slug == "bank" &&
                                    ((info.amount >=
                                      parseFloat(bankShow.minimum_deposit) &&
                                      bankShow.show_bank_method == false) ||
                                      bankShow.show_bank_method == true)
                                  ) {
                                    return (
                                      <li
                                        onClick={() => {
                                          info.selectPaymentOption = item.title;
                                          info.image = "";
                                          info.utn = "";
                                          info.cryptoData = "";
                                          info.qrcode_url = item.qr_code;
                                          info.slug = item.slug;
                                          info.bank_details = item.bank_details;

                                          setInfo({ ...info });
                                        }}
                                        className={`lideposit mar-10 ${
                                          item.title == info.selectPaymentOption
                                            ? "active"
                                            : ""
                                        }`}
                                      >
                                        <a>
                                          <div
                                            title={item.title}
                                            onClick={() => {
                                              info.selectPaymentOption =
                                                item.title;
                                              info.image = "";
                                              info.utn = "";
                                              info.cryptoData = "";
                                              info.bank_details =
                                                item.bank_details;
                                              info.qrcode_url = item.qr_code;
                                              info.slug = item.slug;
                                              setInfo({ ...info });
                                            }}
                                            //   onClick={modalopen}
                                            className=""
                                          >
                                            <img
                                              src={item.image_url}
                                              alt={item.title}
                                              title={item.title}
                                              className="h-80 m-auto"
                                              style={{
                                                objectFit: "contain",
                                                width: "100px",
                                                height: "40px",
                                              }}
                                            ></img>
                                          </div>
                                        </a>
                                      </li>
                                    );
                                  } else if (item.slug !== "bank") {
                                    return (
                                      <li
                                        onClick={() => {
                                          info.selectPaymentOption = item.title;
                                          info.image = "";
                                          info.utn = "";
                                          info.cryptoData = "";
                                          info.qrcode_url = item.qr_code;
                                          info.slug = item.slug;
                                          info.bank_details = item.bank_details;

                                          setInfo({ ...info });
                                        }}
                                        className={`lideposit mar-10 ${
                                          item.title == info.selectPaymentOption
                                            ? "active"
                                            : ""
                                        }`}
                                      >
                                        <a>
                                          <div
                                            title={item.title}
                                            onClick={() => {
                                              info.selectPaymentOption =
                                                item.title;
                                              info.image = "";
                                              info.utn = "";
                                              info.cryptoData = "";
                                              info.bank_details =
                                                item.bank_details;
                                              info.qrcode_url = item.qr_code;
                                              info.slug = item.slug;
                                              setInfo({ ...info });
                                            }}
                                            //   onClick={modalopen}
                                            className=""
                                          >
                                            <img
                                              src={item.image_url}
                                              alt={item.title}
                                              title={item.title}
                                              className="h-80 m-auto"
                                              style={{
                                                objectFit: "contain",
                                                width: "100px",
                                                height: "40px",
                                              }}
                                            ></img>
                                          </div>
                                        </a>
                                      </li>
                                    );
                                  } */
                                  }
                                }
                              })}
                            </ul>
                          </div>
                        </Paper>
                      </Grid>
                    </Grid>
                    {spinMt5 == info.depositTo ? (
                      ""
                    ) : (
                      <>
                        {" "}
                        {info.depositTo !== "wallet" &&
                        info.cryptoData == "" &&
                        prop.permission.is_deposit_bonus_claim_active == "1" ? (
                          <Grid container spacing={3}>
                            <Grid item md={12} className="d-flex">
                              <Paper
                                elevation={1}
                                style={{ borderRadius: "10px" }}
                                className="w-100 mb-3"
                              >
                                <div
                                  className="card-header d-flex align-items-center justify-content-between card-header-alt p-3"
                                  style={
                                    hideBonus == false
                                      ? { borderRadius: "4.65rem 4.65rem 0 0" }
                                      : { borderRadius: "4.65rem" }
                                  }
                                >
                                  <Grid container spacing={3}>
                                    <Grid item md={12} xs={12} sm={12}>
                                      <div
                                        className=""
                                        style={{
                                          justifyContent: "space-between",
                                          display: "flex",
                                        }}
                                      >
                                        <h5
                                          className="font-weight-bold mb-0 text-dark text-align-center "
                                          //   style={{ textAlign: "center" }}
                                        >
                                          Advantages of Bonus
                                        </h5>

                                        <span>
                                          <ColorButton
                                            sx={{ padding: "0px 12px" }}
                                            onClick={() => {
                                              setHideBonus(!hideBonus);
                                            }}
                                          >
                                            {hideBonus == true ? (
                                              <ArrowDropDownIcon />
                                            ) : (
                                              <ArrowDropUpIcon />
                                            )}
                                          </ColorButton>
                                        </span>
                                      </div>
                                    </Grid>
                                  </Grid>
                                </div>
                                {hideBonus == true ? (
                                  ""
                                ) : (
                                  <>
                                    {" "}
                                    <div className="divider"></div>
                                    <Grid container spacing={3}>
                                      <Grid item md={12}>
                                        <div>
                                          <div
                                            style={{
                                              padding: "10px",
                                              textAlign: "center",
                                            }}
                                          >
                                            <ul
                                              style={{
                                                display: "flex",
                                                gap: "30px",
                                                paddingLeft: "0",
                                                justifyContent: "center",
                                              }}
                                            >
                                              <li
                                                className={`bounsBox mar-10 `}
                                              >
                                                <img
                                                  src={dataOFBonus.bonus_image1}
                                                  alt="50%"
                                                  style={{
                                                    width: "100%",
                                                    borderRadius: "10px",
                                                  }}
                                                />
                                              </li>
                                              <li className={`bounsBox mar-10`}>
                                                <img
                                                  src={dataOFBonus.bonus_image2}
                                                  alt="50%"
                                                  style={{
                                                    width: "100%",
                                                    borderRadius: "10px",
                                                  }}
                                                />
                                              </li>{" "}
                                              <li
                                                className={`bounsBox mar-10 `}
                                              >
                                                <img
                                                  src={dataOFBonus.bonus_image3}
                                                  alt="50%"
                                                  style={{
                                                    width: "100%",
                                                    borderRadius: "10px",
                                                  }}
                                                />
                                              </li>
                                              {/* <li className={`bounsBox mar-10 `}>
                                    <img
                                      src="https://admin.rightfx.com/uploads/bonus_offer_image/bonus_offer_1673360159_50.png"
                                      alt="50%"
                                      style={{
                                        width: "100%",
                                        borderRadius: "10px",
                                      }}
                                    />
                                  </li> */}
                                            </ul>
                                            <Grid container spacing={2}>
                                              <Grid item md={12}>
                                                <div>
                                                  <h5
                                                    className="font-weight-bold mb-0 "
                                                    style={{
                                                      marginTop: "30px",
                                                      color: "#5d2067",
                                                    }}
                                                  >
                                                    Select Bonus Amount
                                                  </h5>
                                                  <div
                                                    className="d-flex"
                                                    style={{ padding: "10px" }}
                                                  >
                                                    <FormControl className="w-100">
                                                      <RadioGroup
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="row-radio-buttons-group"
                                                        value={
                                                          info.selsectRadio
                                                        }
                                                        className="w-100"
                                                        onChange={(e) => {
                                                          info.selsectRadio =
                                                            e.target.value;
                                                          setInfo({ ...info });
                                                        }}
                                                      >
                                                        <div className="radioButoon-main">
                                                          <FormControlLabel
                                                            value={10}
                                                            control={
                                                              <Radio
                                                                size="small"
                                                                className="radiobutoon-padding"
                                                              />
                                                            }
                                                            label="10%"
                                                          />
                                                          <div className="radiobutoon-padding">
                                                            Bonus Amount :{" "}
                                                            {(
                                                              (info.amount *
                                                                10) /
                                                              100
                                                            ).toFixed(2) >
                                                            dataOFBonus.bonusAmount
                                                              ? dataOFBonus.bonusAmount
                                                              : (
                                                                  (info.amount *
                                                                    10) /
                                                                  100
                                                                ).toFixed(2)}
                                                          </div>
                                                          <div className="radiobutoon-padding">
                                                            Lots Required:{" "}
                                                            {(
                                                              (((info.amount *
                                                                10) /
                                                                100) *
                                                                40) /
                                                              100
                                                            ).toFixed(2) >
                                                            dataOFBonus.lot
                                                              ? dataOFBonus.lot
                                                              : (
                                                                  (((info.amount *
                                                                    10) /
                                                                    100) *
                                                                    40) /
                                                                  100
                                                                ).toFixed(2)}
                                                          </div>
                                                        </div>
                                                        <div className="radioButoon-main">
                                                          <FormControlLabel
                                                            value={20}
                                                            control={
                                                              <Radio
                                                                size="small"
                                                                className="radiobutoon-padding"
                                                              />
                                                            }
                                                            label="20%"
                                                          />
                                                          <div className="radiobutoon-padding">
                                                            Bonus Amount :{" "}
                                                            {(
                                                              (info.amount *
                                                                20) /
                                                              100
                                                            ).toFixed(2) >
                                                            dataOFBonus.bonusAmount
                                                              ? dataOFBonus.bonusAmount
                                                              : (
                                                                  (info.amount *
                                                                    20) /
                                                                  100
                                                                ).toFixed(2)}
                                                          </div>
                                                          <div className="radiobutoon-padding">
                                                            Lots Required:{" "}
                                                            {(
                                                              (((info.amount *
                                                                20) /
                                                                100) *
                                                                40) /
                                                              100
                                                            ).toFixed(2) >
                                                            dataOFBonus.lot
                                                              ? dataOFBonus.lot
                                                              : (
                                                                  (((info.amount *
                                                                    20) /
                                                                    100) *
                                                                    40) /
                                                                  100
                                                                ).toFixed(2)}
                                                          </div>
                                                        </div>
                                                        <div className="radioButoon-main">
                                                          <FormControlLabel
                                                            value={30}
                                                            control={
                                                              <Radio
                                                                size="small"
                                                                className="radiobutoon-padding"
                                                              />
                                                            }
                                                            label="30%"
                                                          />
                                                          <div className="radiobutoon-padding">
                                                            Bonus Amount :{" "}
                                                            {(
                                                              (info.amount *
                                                                30) /
                                                              100
                                                            ).toFixed(2) >
                                                            dataOFBonus.bonusAmount
                                                              ? dataOFBonus.bonusAmount
                                                              : (
                                                                  (info.amount *
                                                                    30) /
                                                                  100
                                                                ).toFixed(2)}
                                                          </div>
                                                          <div className="radiobutoon-padding">
                                                            Lots Required:{" "}
                                                            {(
                                                              (((info.amount *
                                                                30) /
                                                                100) *
                                                                40) /
                                                              100
                                                            ).toFixed(2) >
                                                            dataOFBonus.lot
                                                              ? dataOFBonus.lot
                                                              : (
                                                                  (((info.amount *
                                                                    30) /
                                                                    100) *
                                                                    40) /
                                                                  100
                                                                ).toFixed(2)}
                                                          </div>
                                                        </div>
                                                        <div className="radioButoon-main">
                                                          <FormControlLabel
                                                            value={40}
                                                            control={
                                                              <Radio
                                                                size="small"
                                                                className="radiobutoon-padding"
                                                              />
                                                            }
                                                            label="40%"
                                                          />
                                                          <div className="radiobutoon-padding">
                                                            Bonus Amount :{" "}
                                                            {(
                                                              (info.amount *
                                                                40) /
                                                              100
                                                            ).toFixed(2) >
                                                            dataOFBonus.bonusAmount
                                                              ? dataOFBonus.bonusAmount
                                                              : (
                                                                  (info.amount *
                                                                    40) /
                                                                  100
                                                                ).toFixed(2)}
                                                          </div>
                                                          <div className="radiobutoon-padding">
                                                            Lots Required:{" "}
                                                            {(
                                                              (((info.amount *
                                                                40) /
                                                                100) *
                                                                40) /
                                                              100
                                                            ).toFixed(2) >
                                                            dataOFBonus.lot
                                                              ? dataOFBonus.lot
                                                              : (
                                                                  (((info.amount *
                                                                    40) /
                                                                    100) *
                                                                    40) /
                                                                  100
                                                                ).toFixed(2)}
                                                          </div>
                                                        </div>
                                                        <div className="radioButoon-main">
                                                          <FormControlLabel
                                                            value={50}
                                                            control={
                                                              <Radio
                                                                size="small"
                                                                className="radiobutoon-padding"
                                                              />
                                                            }
                                                            label="50%"
                                                          />
                                                          <div className="radiobutoon-padding">
                                                            Bonus Amount :{" "}
                                                            {(
                                                              (info.amount *
                                                                50) /
                                                              100
                                                            ).toFixed(2) >
                                                            dataOFBonus.bonusAmount
                                                              ? dataOFBonus.bonusAmount
                                                              : (
                                                                  (info.amount *
                                                                    50) /
                                                                  100
                                                                ).toFixed(2)}
                                                          </div>
                                                          <div className="radiobutoon-padding">
                                                            Lots Required:{" "}
                                                            {(
                                                              (((info.amount *
                                                                50) /
                                                                100) *
                                                                40) /
                                                              100
                                                            ).toFixed(2) >
                                                            dataOFBonus.lot
                                                              ? dataOFBonus.lot
                                                              : (
                                                                  (((info.amount *
                                                                    50) /
                                                                    100) *
                                                                    40) /
                                                                  100
                                                                ).toFixed(2)}
                                                          </div>
                                                        </div>
                                                      </RadioGroup>
                                                    </FormControl>
                                                  </div>
                                                </div>
                                              </Grid>
                                            </Grid>
                                          </div>
                                        </div>
                                      </Grid>
                                      {/* <Grid item md={4}>
                            <div className="w-100">
                              <img
                                src="./rightfx_login_files/bonus30.png"
                                className="w-100"
                                alt="Bonus 50%"
                              />
                            </div>
                          </Grid> */}
                                    </Grid>
                                  </>
                                )}
                              </Paper>
                            </Grid>
                          </Grid>
                        ) : (
                          ""
                        )}
                      </>
                    )}

                    {info.slug == "upi" ||
                    info.slug == "phonepe" ||
                    info.slug == "paytm" ||
                    info.slug == "gpay" ? (
                      <Grid container spacing={3}>
                        <Grid item md={12} className="d-flex">
                          <Paper
                            elevation={1}
                            style={{ borderRadius: "10px" }}
                            className="w-100 mb-3"
                          >
                            <div
                              className="card-header d-flex align-items-center justify-content-between card-header-alt p-3"
                              //   style={
                              //     hideBonus == false
                              //       ? { borderRadius: "4.65rem 4.65rem 0 0" }
                              //       : { borderRadius: "4.65rem" }
                              //   }
                            >
                              <Grid container spacing={3}>
                                <Grid item md={12} xs={12} sm={12}>
                                  <div className="">
                                    <h5
                                      className="font-weight-bold mb-0 text-dark text-align-center "
                                      //   style={{ textAlign: "center" }}
                                    >
                                      {info.selectPaymentOption}
                                    </h5>
                                  </div>
                                </Grid>
                              </Grid>
                            </div>
                            <div className="divider"></div>
                            <Grid container spacing={3}>
                              <Grid item md={6}>
                                <div
                                  style={{
                                    marginTop: "10px",
                                    padding: "10px",

                                    height: "90%",
                                  }}
                                >
                                  <div>
                                    <h5
                                      className="font-weight-bold mb-0 "
                                      style={{
                                        color: "#5d2067",
                                        textAlign: "center",
                                      }}
                                    >
                                      {info.selectPaymentOption} Details
                                    </h5>
                                  </div>
                                  <div className="instUpi">
                                    <img src={info.qrcode_url} alt="" />
                                  </div>
                                </div>
                              </Grid>
                              <Grid item md={6}>
                                <div style={{ padding: "10px", height: "90%" }}>
                                  <div
                                    style={{
                                      textAlign: "center",
                                      marginTop: "10px",
                                    }}
                                  >
                                    <h5
                                      className="font-weight-bold mb-0 "
                                      style={{
                                        color: "#5d2067",
                                      }}
                                    >
                                      Instruction
                                    </h5>
                                  </div>
                                  <div
                                    style={{
                                      height: "100%",
                                    }}
                                  >
                                    <ol className="instUpi">
                                      <li>Scan code to make payment.</li>
                                      <li>
                                        You Need to take a screenshot of
                                        successful payment where UTR Number is
                                        clearly visible.
                                      </li>
                                      <li>
                                        Upload screenshot in given upload field.
                                      </li>
                                      <li>
                                        Press submit button to submit your
                                        deposit request.
                                      </li>
                                      <li>
                                        UPI transaction limit can be very as per
                                        your bank.
                                      </li>
                                      <li>
                                        Maximum amount per transaction is
                                        1,00,000 INR.
                                      </li>
                                    </ol>
                                  </div>
                                </div>
                              </Grid>
                              <Grid item md={12}>
                                <div style={{ padding: "10px" }}>
                                  <div className="Neon Neon-theme-dragdropbox">
                                    <input
                                      className="imageUplodeUpi"
                                      name="files[]"
                                      id="filer_input2"
                                      //   multiple="multiple"
                                      type="file"
                                      onChange={(e) => {
                                        if (
                                          (e.target.files[0].type ==
                                            "image/jpeg" ||
                                            e.target.files[0].type ==
                                              "image/png" ||
                                            e.target.files[0].type ==
                                              "image/jpg") &&
                                          info.image?.length < 5
                                        ) {
                                          info.image = [
                                            ...info.image,
                                            e.target.files[0],
                                          ];
                                          setInfo({ ...info });
                                        } else if (info.image?.length >= 5) {
                                          Toast(
                                            "error",
                                            "You can upload max 5 deposit proof"
                                          );
                                        } else {
                                          Toast(
                                            "error",
                                            "Only JPG, JPEG and PNG types are accepted."
                                          );
                                        }
                                      }}
                                    />
                                    <div className="Neon-input-dragDrop">
                                      <div className="Neon-input-inner">
                                        <a className="Neon-input-choose-btn blue">
                                          Browse Files
                                        </a>
                                        <div
                                          className="Neon-input-text"
                                          style={{ marginTop: "10px" }}
                                        >
                                          <span>or drop your images here</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      marginTop: "12px",
                                      color: "#171737",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {info.image == "" ||
                                    info.image == null ||
                                    info.image == undefined ? (
                                      ""
                                    ) : (
                                      <div className="deposit-image-flex">
                                        {info.image?.map((item, index) => {
                                          var imagep =
                                            URL.createObjectURL(item);
                                          return (
                                            <div
                                            // style={{ position: "relative" }}
                                            >
                                              <div className="text-right">
                                                <CloseOutlinedIcon
                                                  className="fontimgclose"
                                                  onClick={() => {
                                                    info.image.splice(index, 1);
                                                    setInfo({ ...info });
                                                  }}
                                                />
                                              </div>
                                              <div>
                                                <CustomImageModal
                                                  image={imagep}
                                                  alt=""
                                                  className="width-150px"
                                                />
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </Grid>
                              <Grid
                                item
                                md={12}
                                sx={{ paddingTop: "0px !important" }}
                              >
                                <div
                                  style={{
                                    padding: "10px 10px 17px 10px",
                                  }}
                                >
                                  <div>
                                    <label className="text-info font-weight-bold form-label-head w-100 ">
                                      Enter UTR Number (Optional)
                                    </label>
                                    <FormControl
                                      className="w-100"
                                      // error={
                                      //   info.utn == "" && infoTrue.utn == true
                                      //     ? true
                                      //     : false
                                      // }
                                    >
                                      <BootstrapInput
                                        value={info.utn}
                                        name="utn"
                                        type="text"
                                        onBlur={trueFalse}
                                        className="w-100"
                                        onChange={(e) => {
                                          // setAmount(e.target.value);
                                          info.utn = e.target.value;
                                          setInfo({ ...info });
                                        }}
                                        displayEmpty
                                        inputProps={{
                                          "aria-label": "Without label",
                                        }}
                                      />
                                      {/* {info.utn == "" &&
                                      infoTrue.utn == true ? (
                                        <FormHelperText>
                                          UTR Number is required
                                        </FormHelperText>
                                      ) : (
                                        ""
                                      )} */}
                                    </FormControl>
                                  </div>
                                  <div
                                    style={{
                                      textAlign: "center",
                                      marginTop: "20px",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    {info.isLoader == true ? (
                                      <ColorButton
                                        className="makeapaymentbutoon"
                                        disabled
                                      >
                                        <svg
                                          className="spinner"
                                          viewBox="0 0 50 50"
                                        >
                                          <circle
                                            className="path"
                                            cx="25"
                                            cy="25"
                                            r="20"
                                            fill="none"
                                            stroke-width="5"
                                          ></circle>
                                        </svg>
                                      </ColorButton>
                                    ) : (
                                      <ColorButton onClick={onsubmit}>
                                        Submit
                                      </ColorButton>
                                    )}
                                  </div>
                                </div>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      </Grid>
                    ) : (
                      ""
                    )}
                    {(info.slug == "USDT.TRC20" ||
                      info.slug == "BTC" ||
                      info.slug == "ETH" ||
                      info.slug == "LTC") &&
                    info.is_auto == "0" ? (
                      <Grid container spacing={3}>
                        <Grid item md={12} className="d-flex">
                          <Paper
                            elevation={1}
                            style={{ borderRadius: "10px" }}
                            className="w-100 mb-3"
                          >
                            <div
                              className="card-header d-flex align-items-center justify-content-between card-header-alt p-3"
                              //   style={
                              //     hideBonus == false
                              //       ? { borderRadius: "4.65rem 4.65rem 0 0" }
                              //       : { borderRadius: "4.65rem" }
                              //   }
                            >
                              <Grid container spacing={3}>
                                <Grid item md={12} xs={12} sm={12}>
                                  <div className="">
                                    <h5
                                      className="font-weight-bold mb-0 text-dark text-align-center "
                                      //   style={{ textAlign: "center" }}
                                    >
                                      {info.selectPaymentOption}
                                    </h5>
                                  </div>
                                </Grid>
                              </Grid>
                            </div>
                            <div className="divider"></div>
                            <Grid container spacing={3}>
                              <Grid item md={6}>
                                <div
                                  style={{
                                    marginTop: "10px",
                                    padding: "10px",

                                    height: "90%",
                                  }}
                                >
                                  <div>
                                    <h5
                                      className="font-weight-bold mb-0 "
                                      style={{
                                        color: "#5d2067",
                                        textAlign: "center",
                                      }}
                                    >
                                      {info.selectPaymentOption} Details
                                    </h5>
                                  </div>
                                  <div className="instUpi">
                                    <img src={info.qrcode_url} alt="" />
                                  </div>
                                </div>
                              </Grid>
                              <Grid item md={6}>
                                <div style={{ padding: "10px", height: "90%" }}>
                                  <div
                                    style={{
                                      textAlign: "center",
                                      marginTop: "10px",
                                    }}
                                  >
                                    <h5
                                      className="font-weight-bold mb-0 "
                                      style={{
                                        color: "#5d2067",
                                      }}
                                    >
                                      Instruction
                                    </h5>
                                  </div>
                                  <div
                                    style={{
                                      height: "100%",
                                    }}
                                  >
                                    <ol className="instUpi">
                                      <li>
                                        Use your Crypto wallet app to scan the
                                        QR code displayed on the payment page..
                                      </li>
                                      <li>
                                        Once the QR code is scanned, Confirm
                                        that the amount displayed matches the
                                        payment amount mentioned on the payment
                                        portal.
                                      </li>
                                      <li>
                                        If the amount is correct, proceed to
                                        complete the payment within your wallet
                                        app.
                                      </li>
                                      <li>
                                        After the payment is successfully
                                        processed, take a screenshot or capture
                                        a picture of the transaction
                                        confirmation. Ensure that the screenshot
                                        clearly shows the payment amount and the
                                        transaction ID..
                                      </li>
                                      <li>
                                        UPI transaction limit can be very as per
                                        your bank.
                                      </li>
                                      <li>
                                        Once the screenshot is uploaded, submit
                                        the payment and screenshot for approval.
                                      </li>
                                      <li>
                                        You can leave Page after successfully
                                        submit request, we will notify you
                                        regarding the status of your payment.
                                      </li>
                                    </ol>
                                  </div>
                                </div>
                              </Grid>
                              <Grid item md={12}>
                                <div style={{ padding: "10px" }}>
                                  <div className="Neon Neon-theme-dragdropbox">
                                    <input
                                      className="imageUplodeUpi"
                                      name="files[]"
                                      id="filer_input2"
                                      //   multiple="multiple"
                                      type="file"
                                      onChange={(e) => {
                                        if (
                                          (e.target.files[0].type ==
                                            "image/jpeg" ||
                                            e.target.files[0].type ==
                                              "image/png" ||
                                            e.target.files[0].type ==
                                              "image/jpg") &&
                                          info.image?.length < 5
                                        ) {
                                          info.image = [
                                            ...info.image,
                                            e.target.files[0],
                                          ];
                                          setInfo({ ...info });
                                        } else if (info.image?.length >= 5) {
                                          Toast(
                                            "error",
                                            "You can upload max 5 deposit proof"
                                          );
                                        } else {
                                          Toast(
                                            "error",
                                            "Only JPG, JPEG and PNG types are accepted."
                                          );
                                        }
                                      }}
                                    />
                                    <div className="Neon-input-dragDrop">
                                      <div className="Neon-input-inner">
                                        <a className="Neon-input-choose-btn blue">
                                          Browse Files
                                        </a>
                                        <div
                                          className="Neon-input-text"
                                          style={{ marginTop: "10px" }}
                                        >
                                          <span>or drop your images here</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      marginTop: "12px",
                                      color: "#171737",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {info.image == "" ||
                                    info.image == null ||
                                    info.image == undefined ? (
                                      ""
                                    ) : (
                                      <div className="deposit-image-flex">
                                        {info.image?.map((item, index) => {
                                          var imagep =
                                            URL.createObjectURL(item);
                                          return (
                                            <div
                                            // style={{ position: "relative" }}
                                            >
                                              <div className="text-right">
                                                <CloseOutlinedIcon
                                                  className="fontimgclose"
                                                  onClick={() => {
                                                    info.image.splice(index, 1);
                                                    setInfo({ ...info });
                                                  }}
                                                />
                                              </div>
                                              <div>
                                                <CustomImageModal
                                                  image={imagep}
                                                  alt=""
                                                  className="width-150px"
                                                />
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </Grid>
                              <Grid
                                item
                                md={12}
                                sx={{ paddingTop: "0px !important" }}
                              >
                                <div
                                  style={{
                                    padding: "10px 10px 17px 10px",
                                  }}
                                >
                                  <div>
                                    <label className="text-info font-weight-bold form-label-head w-100 ">
                                      Enter Crypto Address
                                    </label>
                                    <FormControl
                                      className="w-100"
                                      // error={
                                      //   info.utn == "" && infoTrue.utn == true
                                      //     ? true
                                      //     : false
                                      // }
                                    >
                                      <BootstrapInput
                                        value={info.utn}
                                        name="utn"
                                        type="text"
                                        onBlur={trueFalse}
                                        className="w-100"
                                        onChange={(e) => {
                                          // setAmount(e.target.value);
                                          info.utn = e.target.value;
                                          setInfo({ ...info });
                                        }}
                                        displayEmpty
                                        inputProps={{
                                          "aria-label": "Without label",
                                        }}
                                      />
                                      {info.utn == "" &&
                                      infoTrue.utn == true ? (
                                        <FormHelperText>
                                          Crypto Address is required
                                        </FormHelperText>
                                      ) : (
                                        ""
                                      )}
                                    </FormControl>
                                  </div>
                                  <div
                                    style={{
                                      textAlign: "center",
                                      marginTop: "20px",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    {info.isLoader == true ? (
                                      <ColorButton
                                        className="makeapaymentbutoon"
                                        disabled
                                      >
                                        <svg
                                          className="spinner"
                                          viewBox="0 0 50 50"
                                        >
                                          <circle
                                            className="path"
                                            cx="25"
                                            cy="25"
                                            r="20"
                                            fill="none"
                                            stroke-width="5"
                                          ></circle>
                                        </svg>
                                      </ColorButton>
                                    ) : (
                                      <ColorButton onClick={onsubmit}>
                                        Submit
                                      </ColorButton>
                                    )}
                                  </div>
                                </div>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      </Grid>
                    ) : (
                      ""
                    )}
                    {info.slug == "cash" ? (
                      <>
                        <Grid container spacing={3}>
                          <Grid item md={12} className="d-flex">
                            <div style={{ textAlign: "center", width: "100%" }}>
                              {info.isLoader == true ? (
                                <ColorButton
                                  className="makeapaymentbutoon"
                                  disabled
                                >
                                  <svg className="spinner" viewBox="0 0 50 50">
                                    <circle
                                      className="path"
                                      cx="25"
                                      cy="25"
                                      r="20"
                                      fill="none"
                                      stroke-width="5"
                                    ></circle>
                                  </svg>
                                </ColorButton>
                              ) : (
                                <ColorButton onClick={onsubmit}>
                                  Continue
                                </ColorButton>
                              )}
                            </div>
                          </Grid>
                        </Grid>
                      </>
                    ) : (
                      ""
                    )}
                    {info.slug == "epay" ? (
                      <>
                        <Grid container spacing={3}>
                          <Grid item md={12} className="d-flex">
                            <div style={{ textAlign: "center", width: "100%" }}>
                              {info.isLoader == true ? (
                                <ColorButton
                                  className="makeapaymentbutoon"
                                  disabled
                                >
                                  <svg className="spinner" viewBox="0 0 50 50">
                                    <circle
                                      className="path"
                                      cx="25"
                                      cy="25"
                                      r="20"
                                      fill="none"
                                      stroke-width="5"
                                    ></circle>
                                  </svg>
                                </ColorButton>
                              ) : (
                                <ColorButton onClick={onsubmitEpay}>
                                  Submit
                                </ColorButton>
                              )}
                            </div>
                          </Grid>
                        </Grid>
                      </>
                    ) : (
                      ""
                    )}
                    {(info.slug == "USDT.TRC20" ||
                      info.slug == "BTC" ||
                      info.slug == "ETH" ||
                      info.slug == "LTC") &&
                    (info.cryptoData == "" || info.cryptoData == null) &&
                    info.is_auto == "1" ? (
                      <>
                        <Grid container spacing={3}>
                          <Grid item md={12} className="d-flex">
                            <div style={{ textAlign: "center", width: "100%" }}>
                              {info.isLoader == true ? (
                                <ColorButton
                                  className="makeapaymentbutoon"
                                  disabled
                                >
                                  <svg className="spinner" viewBox="0 0 50 50">
                                    <circle
                                      className="path"
                                      cx="25"
                                      cy="25"
                                      r="20"
                                      fill="none"
                                      stroke-width="5"
                                    ></circle>
                                  </svg>
                                </ColorButton>
                              ) : (
                                <ColorButton onClick={onsubmit}>
                                  Submit
                                </ColorButton>
                              )}
                            </div>
                          </Grid>
                        </Grid>
                      </>
                    ) : (
                      ""
                    )}

                    {(info.slug == "USDT.TRC20" ||
                      info.slug == "BTC" ||
                      info.slug == "ETH" ||
                      info.slug == "LTC") &&
                    info.cryptoData !== "" &&
                    info.is_auto == "1" ? (
                      <Grid
                        container
                        spacing={3}
                        sx={{ paddingBottom: "30px" }}
                      >
                        <Grid item md={12} className="d-flex">
                          <Paper
                            elevation={1}
                            style={{ borderRadius: "10px" }}
                            className="w-100 mb-3"
                          >
                            <div
                              className="card-header d-flex align-items-center justify-content-between card-header-alt p-3"
                              //   style={
                              //     hideBonus == false
                              //       ? { borderRadius: "4.65rem 4.65rem 0 0" }
                              //       : { borderRadius: "4.65rem" }
                              //   }
                            >
                              <Grid container spacing={3}>
                                <Grid item md={12} xs={12} sm={12}>
                                  <div className="">
                                    <h5
                                      className="font-weight-bold mb-0 text-dark text-align-center "
                                      //   style={{ textAlign: "center" }}
                                    >
                                      {info.selectPaymentOption}
                                    </h5>
                                  </div>
                                </Grid>
                              </Grid>
                            </div>
                            <div className="divider"></div>
                            <Grid container spacing={3}>
                              <Grid item md={6}>
                                <div
                                  style={{
                                    marginTop: "10px",
                                    padding: "10px",
                                    height: "90%",
                                  }}
                                >
                                  <div>
                                    <h5
                                      className="font-weight-bold mb-0 "
                                      style={{
                                        color: "#5d2067",
                                        textAlign: "center",
                                      }}
                                    >
                                      {info.selectPaymentOption} Details
                                    </h5>
                                  </div>
                                  <div className="instcypto">
                                    <div>
                                      <img
                                        src={info.cryptoData.qrcode_url}
                                        alt=""
                                      />
                                    </div>

                                    <div>
                                      <div>
                                        <div
                                          style={{
                                            fontSize: "21px",
                                            fontWeight: "600",
                                          }}
                                        >
                                          {info.selectPaymentOption} Address{" "}
                                        </div>

                                        <div>
                                          {" "}
                                          {info.cryptoData.crypto_address}{" "}
                                          <button
                                            className="copy_link"
                                            onClick={(e) => {
                                              navigator.clipboard.writeText(
                                                info.cryptoData.crypto_address
                                              );
                                            }}
                                          >
                                            <span className="blinking">
                                              <i
                                                className="material-icons"
                                                style={{ fontSize: "17px" }}
                                              >
                                                content_copy
                                              </i>
                                            </span>
                                          </button>
                                        </div>
                                        {info.cryptoData.total_crypto_amount ? (
                                          <div>
                                            <span
                                              style={{
                                                fontSize: "21px",
                                                fontWeight: "600",
                                              }}
                                            >
                                              Transfer{" "}
                                              {info.selectPaymentOption} :{" "}
                                              {
                                                info.cryptoData
                                                  .total_crypto_amount
                                              }
                                            </span>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Grid>
                              <Grid item md={6}>
                                <div style={{ padding: "10px", height: "90%" }}>
                                  <div
                                    style={{
                                      textAlign: "center",
                                      marginTop: "10px",
                                    }}
                                  >
                                    <h5
                                      className="font-weight-bold mb-0 "
                                      style={{
                                        color: "#5d2067",
                                      }}
                                    >
                                      Instruction
                                    </h5>
                                  </div>
                                  <div
                                    style={{
                                      height: "100%",
                                    }}
                                  >
                                    <ol className="instUpi">
                                      <li>
                                        Use Below Give QR Code to make payment
                                        from your Wallet.
                                      </li>
                                      <li>
                                        Enter Amount that you want to transfer
                                        and make payment.
                                      </li>
                                      <li>
                                        Press submit button to submit your
                                        deposit request.
                                      </li>
                                      <li>
                                        Your payment will be credited into
                                        respective account once reflected in
                                        company's account.
                                      </li>
                                      <li>
                                        Do not make any mistake while entering
                                        wallet address, if you make any mistake
                                      </li>
                                      <li>your funds can be lost forever.</li>
                                    </ol>
                                  </div>
                                </div>
                              </Grid>
                              <Grid
                                item
                                md={12}
                                sx={{ paddingTop: "0px !important" }}
                              >
                                <div
                                  style={{
                                    padding: "0px 10pxpx 17px 10px",
                                  }}
                                >
                                  <div
                                    style={{
                                      textAlign: "center",
                                      marginTop: "20px",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    {info.isLoader == true ? (
                                      <ColorButton
                                        className="makeapaymentbutoon"
                                        disabled
                                      >
                                        <svg
                                          className="spinner"
                                          viewBox="0 0 50 50"
                                        >
                                          <circle
                                            className="path"
                                            cx="25"
                                            cy="25"
                                            r="20"
                                            fill="none"
                                            stroke-width="5"
                                          ></circle>
                                        </svg>
                                      </ColorButton>
                                    ) : (
                                      <ColorButton onClick={onCyptoSubmit}>
                                        Submit
                                      </ColorButton>
                                    )}
                                  </div>
                                </div>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      </Grid>
                    ) : (
                      ""
                    )}
                    {info.slug == "bank" &&
                    ((info.amount >= parseFloat(bankShow.minimum_deposit) &&
                      bankShow.show_bank_method == false) ||
                      bankShow.show_bank_method == true) ? (
                      <Grid container spacing={3}>
                        <Grid item md={12} className="d-flex">
                          <Paper
                            elevation={1}
                            style={{ borderRadius: "10px" }}
                            className="w-100 mb-3"
                          >
                            <div
                              className="card-header d-flex align-items-center justify-content-between card-header-alt p-3"
                              //   style={
                              //     hideBonus == false
                              //       ? { borderRadius: "4.65rem 4.65rem 0 0" }
                              //       : { borderRadius: "4.65rem" }
                              //   }
                            >
                              <Grid container spacing={3}>
                                <Grid item md={12} xs={12} sm={12}>
                                  <div className="">
                                    <h5
                                      className="font-weight-bold mb-0 text-dark text-align-center "
                                      //   style={{ textAlign: "center" }}
                                    >
                                      {info.selectPaymentOption}
                                    </h5>
                                  </div>
                                </Grid>
                              </Grid>
                            </div>
                            <div className="divider"></div>
                            <Grid container spacing={3}>
                              <Grid item md={6}>
                                <div
                                  style={{
                                    marginTop: "10px",
                                    padding: "10px",
                                    height: "90%",
                                  }}
                                >
                                  <div>
                                    <h5
                                      className="font-weight-bold mb-0 "
                                      style={{
                                        color: "#5d2067",
                                        textAlign: "center",
                                      }}
                                    >
                                      {info.selectPaymentOption} Details
                                    </h5>
                                  </div>
                                  <div className="instBank">
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <div className="f-600">Bank Name</div>
                                      <div>
                                        {info.bank_details[0].bank_name}
                                        <button
                                          className="copy_link"
                                          onClick={(e) => {
                                            navigator.clipboard.writeText(
                                              info.bank_details[0].bank_name
                                            );
                                            Toast(
                                              "success",
                                              "Copied to clipboard was successful!"
                                            );
                                          }}
                                        >
                                          <span className="blinking">
                                            <i
                                              className="material-icons"
                                              style={{ fontSize: "17px" }}
                                            >
                                              content_copy
                                            </i>
                                          </span>
                                        </button>
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <div className="f-600">
                                        Bank Holder Name
                                      </div>
                                      <div>
                                        {info.bank_details[0].bank_ac_name}{" "}
                                        <button
                                          className="copy_link"
                                          onClick={(e) => {
                                            navigator.clipboard.writeText(
                                              info.bank_details[0].bank_ac_name
                                            );
                                            Toast(
                                              "success",
                                              "Copied to clipboard was successful!"
                                            );
                                          }}
                                        >
                                          <span className="blinking">
                                            <i
                                              className="material-icons"
                                              style={{ fontSize: "17px" }}
                                            >
                                              content_copy
                                            </i>
                                          </span>
                                        </button>
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <div className="f-600">
                                        Bank Account Number{" "}
                                      </div>
                                      <div>
                                        {info.bank_details[0].bank_ac_number}
                                        <button
                                          className="copy_link"
                                          onClick={(e) => {
                                            navigator.clipboard.writeText(
                                              info.bank_details[0]
                                                .bank_ac_number
                                            );
                                            Toast(
                                              "success",
                                              "Copied to clipboard was successful!"
                                            );
                                          }}
                                        >
                                          <span className="blinking">
                                            <i
                                              className="material-icons"
                                              style={{ fontSize: "17px" }}
                                            >
                                              content_copy
                                            </i>
                                          </span>
                                        </button>
                                      </div>
                                    </div>{" "}
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <div className="f-600">IFSC Code</div>
                                      <div>
                                        {info.bank_details[0].bank_ifsc_code}
                                        <button
                                          className="copy_link"
                                          onClick={(e) => {
                                            navigator.clipboard.writeText(
                                              info.bank_details[0]
                                                .bank_ifsc_code
                                            );
                                            Toast(
                                              "success",
                                              "Copied to clipboard was successful!"
                                            );
                                          }}
                                        >
                                          <span className="blinking">
                                            <i
                                              className="material-icons"
                                              style={{ fontSize: "17px" }}
                                            >
                                              content_copy
                                            </i>
                                          </span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Grid>
                              <Grid item md={6}>
                                <div style={{ padding: "10px", height: "90%" }}>
                                  <div
                                    style={{
                                      textAlign: "center",
                                      marginTop: "10px",
                                    }}
                                  >
                                    <h5
                                      className="font-weight-bold mb-0 "
                                      style={{
                                        color: "#5d2067",
                                      }}
                                    >
                                      Instruction
                                    </h5>
                                  </div>
                                  <div
                                    style={{
                                      height: "100%",
                                    }}
                                  >
                                    <ol className="instUpi">
                                      <li>
                                        Use Given bank details to make payment
                                      </li>
                                      <li>
                                        You Need to take a screenshot of
                                        successful payment where UTR /
                                        transaction Number is clearly visible.
                                      </li>
                                      <li>
                                        Upload screenshot in given upload field.
                                      </li>
                                      <li>
                                        Press submit button to submit your
                                        deposit request.
                                      </li>
                                      <li>
                                        Your payment will be credited into
                                        respective account once reflected in our
                                        bank account.
                                      </li>
                                      <li>
                                        Transaction limit can be very as per
                                        your bank.
                                      </li>
                                    </ol>
                                  </div>
                                </div>
                              </Grid>
                              <Grid item md={12}>
                                <div style={{ padding: "10px" }}>
                                  <div className="Neon Neon-theme-dragdropbox">
                                    <input
                                      className="imageUplodeUpi"
                                      name="files[]"
                                      id="filer_input2"
                                      //   multiple="multiple"
                                      type="file"
                                      onChange={(e) => {
                                        if (
                                          (e.target.files[0].type ==
                                            "image/jpeg" ||
                                            e.target.files[0].type ==
                                              "image/png" ||
                                            e.target.files[0].type ==
                                              "image/jpg") &&
                                          info.image?.length < 5
                                        ) {
                                          info.image = [
                                            ...info.image,
                                            e.target.files[0],
                                          ];
                                          setInfo({ ...info });
                                        } else if (info.image?.length >= 5) {
                                          Toast(
                                            "error",
                                            "You can upload max 5 deposit proof"
                                          );
                                        } else {
                                          Toast(
                                            "error",
                                            "Only JPG, JPEG and PNG types are accepted."
                                          );
                                        }
                                      }}
                                    />
                                    <div className="Neon-input-dragDrop">
                                      <div className="Neon-input-inner">
                                        <a className="Neon-input-choose-btn blue">
                                          Browse Files
                                        </a>
                                        <div
                                          className="Neon-input-text"
                                          style={{ marginTop: "10px" }}
                                        >
                                          <span>or drop your images here</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      marginTop: "12px",
                                      color: "#171737",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {info.image == "" ||
                                    info.image == null ||
                                    info.image == undefined ? (
                                      ""
                                    ) : (
                                      <div className="deposit-image-flex">
                                        {info.image?.map((item, index) => {
                                          var imagep =
                                            URL.createObjectURL(item);
                                          return (
                                            <div
                                            // style={{ position: "relative" }}
                                            >
                                              <div className="text-right">
                                                <CloseOutlinedIcon
                                                  className="fontimgclose"
                                                  onClick={() => {
                                                    info.image.splice(index, 1);
                                                    setInfo({ ...info });
                                                  }}
                                                />
                                              </div>
                                              <div>
                                                <CustomImageModal
                                                  image={imagep}
                                                  alt=""
                                                  className="width-150px"
                                                />
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </Grid>
                              <Grid
                                item
                                md={12}
                                sx={{ paddingTop: "0px !important" }}
                              >
                                <div
                                  style={{
                                    padding: "0px 10px 17px 10px",
                                  }}
                                >
                                  <div>
                                    <label className="text-info font-weight-bold form-label-head w-100 ">
                                      Enter UTR Number (Optional)
                                    </label>
                                    <FormControl
                                      className="w-100"
                                      error={
                                        info.utn == "" && infoTrue.utn == true
                                          ? true
                                          : false
                                      }
                                    >
                                      <BootstrapInput
                                        value={info.utn}
                                        name="utn"
                                        type="text"
                                        className="w-100"
                                        onChange={(e) => {
                                          // setAmount(e.target.value);
                                          info.utn = e.target.value;
                                          setInfo({ ...info });
                                        }}
                                        displayEmpty
                                        inputProps={{
                                          "aria-label": "Without label",
                                        }}
                                      />
                                    </FormControl>
                                  </div>
                                  <div
                                    style={{
                                      textAlign: "center",
                                      marginTop: "20px",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    {info.isLoader == true ? (
                                      <ColorButton
                                        className="makeapaymentbutoon"
                                        disabled
                                      >
                                        <svg
                                          className="spinner"
                                          viewBox="0 0 50 50"
                                        >
                                          <circle
                                            className="path"
                                            cx="25"
                                            cy="25"
                                            r="20"
                                            fill="none"
                                            stroke-width="5"
                                          ></circle>
                                        </svg>
                                      </ColorButton>
                                    ) : (
                                      <ColorButton onClick={onsubmit}>
                                        Submit
                                      </ColorButton>
                                    )}
                                    {/* <ColorButton>Submit</ColorButton> */}
                                  </div>
                                </div>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      </Grid>
                    ) : (
                      ""
                    )}
                  </div>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepositeTest;
