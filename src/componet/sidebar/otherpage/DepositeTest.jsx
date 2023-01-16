import React, { useState, useEffect, useRef } from "react";
import {
  FormLabel,
  Grid,
  Input,
  InputAdornment,
  MenuItem,
  Select,
} from "@mui/material";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { NavLink, useParams } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import useCountdown from "../../customComponet/useCountdown";
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
const DepositeTest = () => {
  const [dataArray, setDataArray] = useState({
    accountList: [],
    paymentOption: [],
  });
  const [mainLoader, setMainLoader] = useState({
    paymentOption: true,
    accountList: true,
  });
  const [hideBonus, setHideBonus] = useState(true);
  const [info, setInfo] = useState({
    amount: "",
    image: "",
    depositTo: "",
    selectPaymentOption: "",
    selsectRadio: "",
    utn: "",
    cryptoData: "",
  });
  const [infoTrue, setinfoTrue] = useState({
    amount: false,
  });
  //   console.log(info.image.name);
  const handleChange = (event) => {
    const { name, value } = event.target;

    setInfo((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
    console.log(event.target.value);
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
  }, []);
  const onsubmit = async () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }

    if (info.selectPaymentOption == "") {
      toast.error("Please select deposit type");
    } else if (info.depositTo == "") {
      toast.error("Please select mt5 account");
      console.log("nikunj1");
    } else if (info.amount == "") {
      toast.error("amount required");
      console.log("nikunj2", info);
    } else if (
      (info.selectPaymentOption == "UPI" ||
        info.selectPaymentOption == "PhonePe" ||
        info.selectPaymentOption == "Paytm" ||
        info.selectPaymentOption == "Google pay" ||
        info.selectPaymentOption == "India Cash") &&
      !info.image
    ) {
      toast.error("image is required");
      console.log("nikunj3");
    } else {
      param.append("deposit_method", info.selectPaymentOption);
      param.append("amount", info.amount);
      param.append("deposit_to", "MT5");

      param.append("mt5_acc_no", info.depositTo);
      console.log("nikunj4");
      info.isLoader = true;
      setInfo({ ...info });
      await axios
        .post(Url + "/ajaxfiles/add_deposit.php", param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            navigate("/");
          }
          if (res.data.status == "error") {
            toast.error(res.data.message);
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
            }
            toast.success(res.data.message);
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
        toast.error(res.data.message);
      } else {
        dataArray.accountList = res.data.mt5_accounts;
        if (res.data.mt5_accounts.length != 0) {
          info.depositTo = res.data.mt5_accounts[0].mt5_acc_no;
          setInfo({ ...info });
        }
        setDataArray({ ...dataArray });
        // setDepositType(type);
        mainLoader.accountList = false;
        setMainLoader({ ...mainLoader });
      }
    });
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
        toast.error(res.data.message);
      } else {
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
            <span class="loader2"></span>
          ) : (
            <div style={{ opacity: 1 }}>
              <Grid container>
                <Grid item sm={12}></Grid>
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
                                      <MenuItem value={item.mt5_acc_no}>
                                        {item.mt5_acc_no} ({item.acc_type})
                                      </MenuItem>
                                    );
                                  })}
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
                                  <BootstrapInput
                                    value={info.amount}
                                    name="otp"
                                    type="text"
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
                                </Grid>
                                <Grid item md={4}>
                                  <label className="text-info font-weight-bold form-label-head w-100">
                                    INR
                                  </label>
                                  <BootstrapInput
                                    value={(info.amount * 81.64).toFixed(2)}
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
                                    value={(info.amount * 3.67).toFixed(2)}
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
                                        setInfo({ ...info });
                                      }}
                                      className={`lideposit mar-10 ${
                                        item.title == info.selectPaymentOption
                                          ? "active"
                                          : ""
                                      }`}
                                    >
                                      <a href="/depositTest#depositDetails">
                                        <div
                                          title={item.title}
                                          onClick={() => {
                                            info.selectPaymentOption =
                                              item.title;
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
                                            }}
                                          ></img>
                                        </div>
                                      </a>
                                    </li>
                                  );
                                }
                              })}
                            </ul>
                          </div>
                        </Paper>
                      </Grid>
                    </Grid>
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
                                        <li className={`bounsBox mar-10 `}>
                                          <img
                                            src="https://admin.rightfx.com/uploads/bonus_offer_image/bonus_offer_1673360159_50.png"
                                            alt="50%"
                                            style={{
                                              width: "100%",
                                              borderRadius: "10px",
                                            }}
                                          />
                                        </li>
                                        <li className={`bounsBox mar-10`}>
                                          <img
                                            src="https://admin.rightfx.com/uploads/bonus_offer_image/bonus_offer_1673360159_50.png"
                                            alt="50%"
                                            style={{
                                              width: "100%",
                                              borderRadius: "10px",
                                            }}
                                          />
                                        </li>{" "}
                                        <li className={`bounsBox mar-10 `}>
                                          <img
                                            src="https://admin.rightfx.com/uploads/bonus_offer_image/bonus_offer_1673360159_50.png"
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
                                      <h5
                                        className="font-weight-bold mb-0 "
                                        style={{
                                          marginTop: "30px",
                                          color: "#5d2067",
                                        }}
                                      >
                                        Select Bonus Amount
                                      </h5>
                                      <div>
                                        <FormControl>
                                          <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            value={info.selsectRadio}
                                            onChange={(e) => {
                                              info.selsectRadio =
                                                e.target.value;
                                              setInfo({ ...info });
                                              console.log(
                                                "radio",
                                                e.target.value
                                              );
                                            }}
                                          >
                                            <FormControlLabel
                                              value="10"
                                              control={<Radio size="small" />}
                                              label="10%"
                                            />
                                            <FormControlLabel
                                              value="20"
                                              control={<Radio size="small" />}
                                              label="20%"
                                            />
                                            <FormControlLabel
                                              value="30"
                                              control={<Radio size="small" />}
                                              label="30%"
                                            />
                                            <FormControlLabel
                                              value="40"
                                              control={<Radio size="small" />}
                                              label="40%"
                                            />
                                            <FormControlLabel
                                              value="50"
                                              control={<Radio size="small" />}
                                              label="50%"
                                            />
                                          </RadioGroup>
                                        </FormControl>
                                      </div>
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
                    {info.selectPaymentOption == "UPI" ||
                    info.selectPaymentOption == "PhonePe" ||
                    info.selectPaymentOption == "Paytm" ||
                    info.selectPaymentOption == "Google pay" ? (
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

                                    paddingLeft: "59px",

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
                                    <img
                                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAADcCAMAAAAshD+zAAAAMFBMVEX///8AAABUVFSqqqo4ODjHx8eNjY1ubm5iYmKxsbHj4+OKioqbm5tMTEx+fn5ycnIqcEgyAAAFJ0lEQVR4nO2d7ZLaMAxFA2wI0P14/7ftTJ2d+m6vJRsCS9tz/3QwcuwTdyxH0pJpQgghhBBCCA3quB9S6TSXD0v9zbFzjLXT3DYfm1Ew7rTfDal0OpQPL/U3+84x1k6HtvnYjIJxgQMOOOA2h/s4JBI4N5kXA6wgbbiDsdtlM/rohgtupIz4QLhsRgfggAPuqeEuZlOazYir3aV8evmlt/LPqT7Unkrbj2Iudud6Emdpk6FmM6XLVXCfG36tvRnR3elgRYLVbF9vJ/MTyWSBAw444J4XbnUF72XDX32AtBW7s7iCoh+y7Rfrd3Et3wynfcVuX9vpirRXSScIHHDAAfcvwwWPNy/tvm5KwAEHHHDPDje3k3syojs4v8khWbOT5Svpe6rbAjiXHJ2vggskIwaPPOkqHdp2bqi2gAMOOOC+Aa5XpZOGvyWGIlv86lpea/fw3rbTyH2n7pU2do8twSPPmB1wwAEH3FPB3aLUf+XFOGKQOttHCjjggHusnh5urfMoH7S+xNlJbcqxTjRqUbckGqU2RQuupV5FalPcXLRN5mKVxvbVzt19p7EVyXMKri2fC3ATcLWAGwBxbf853FJ2YdmST2aLf63LCpfylbgCVbv8UOVcQeoeJIy/BHAumeEccfrYoupdOWeX9u3+XwQccMABtxmcG8Q9oqQXDHIA7ib0Xi8ABg444IB7INxs6kYWczA91m1rovFsCrPXs3I71rJKDuxHmUv5oMXftfVnktLFZFSprwqiVa6kPoh0peMG0bTu/4LAAQcccPeBk+1XJdvvYlzBGuZw7sG5kfa27+pV9E9CXeg8dwWB0hUJHHGvXVHusNvzuzJtDBxwwAF3O1xvAKY3zyCTyYNBveMCd3Vn4H4LuAm4TrigvkQOv+6AvbSLteUULb+bonEQl6RMk4pufqN3QdrSRxR3vXxFrlo5Nz/ggAMOuPvCBa6gtL3KFr92Mm3uelqS6OIqzk7GDSoOXVwlV+qcc4ctdsHjkrMbG2NUwAEHHHC3gMjV3eNIGiAK8gep/xqto+y1Aw444IDbDE7iES6+kScfJVkoh2SNjZRv9EcD5eDs/qje/S2PS3CO3oV2m67SOs32qqfl83lETPqOppKBAw444G6HC0LTV7mCdTuXPfu9rkM5pdu+C8WLG+l2BWn0a9CJp6Xy20W68r7AAQcccJvBpRfsnbQDviX3cK/ol0wGOOCAA65XLvk41wfTvakvcfUq+jIGV8MiBddSw6K/MytxFVfAHRSdq3rvfq8/dP7rqjL73L8CBxxwwD0QLnAF7bZXE1fRV7RJ36B0UeIqsu2fxT04tySuZTvld1rMA+fsVt31Tf93AAcccMDdF0465+qFS4Hdzer1kRNwwAEH3N8BN7cPzm8mIflWH5xXuUJvqVdxsZYvU08Pznu5aW0JnPsqSCUHvk8MAj+XTc8LuAk44L6MC9w2cL2vaFsl4fRBV7DUsRGNv4ifkWLJo4w76AoOuz+1b8P1FpP2rtxg9EvagAMOOOD+abipHjfwkfJhNEAEHHDAAfdNcJd2YnCpD7Xu3carFlNzIgfsWfrK9dyLIbaDGyyBD9LGYyvs+m6+csABBxxwKdzl8Kf0hcNTbSclhFqbUuxczYn+pmw7/hLEUFydTA4XaJfd1fwnCNyddivXbhvNfwMHHHDfAvdh9knR3wzXKwciA6fAwY0ZzBXkwMABBxxwm8FJIi9X6aR1KHKoDd537MYVO3cGDl6aKeMihBBCCCGE+vUTu/p9Nm2qdPsAAAAASUVORK5CYII="
                                      alt=""
                                    />
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
                                      paddingRight: "59px",
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
                                <div style={{ padding: "12px 59px" }}>
                                  <div className="Neon Neon-theme-dragdropbox">
                                    <input
                                      className="imageUplodeUpi"
                                      name="files[]"
                                      id="filer_input2"
                                      //   multiple="multiple"
                                      type="file"
                                      onChange={(e) => {
                                        info.image = e.target.files[0];
                                        setInfo({ ...info });
                                        console.log(e.target.files[0]);
                                      }}
                                    />
                                    <div className="Neon-input-dragDrop">
                                      <div className="Neon-input-inner">
                                        {/* <div className="Neon-input-icon">
                                    <i className="fa fa-file-image-o"></i>
                                  </div> */}
                                        {/* <div className="Neon-input-text">
                                    <h3>Drag&amp;Drop files here</h3>{" "}
                                    <span
                                      style={{
                                        display: "inline-block",
                                        margin: "15px 0",
                                      }}
                                    >
                                      or
                                    </span>
                                  </div> */}
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
                                    {info.image == "" ? "" : info.image.name}
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
                                    padding: "0px 59px 17px 59px",
                                  }}
                                >
                                  <div>
                                    <label className="text-info font-weight-bold form-label-head w-100 required">
                                      Enter UTR Number
                                    </label>
                                    <BootstrapInput
                                      value={info.utn}
                                      name="otp"
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
                                  </div>
                                  <div
                                    style={{
                                      textAlign: "center",
                                      marginTop: "20px",
                                    }}
                                  >
                                    {info.isLoader == true ? (
                                      <ColorButton
                                        className="makeapaymentbutoon"
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
                    {(info.selectPaymentOption == "USDT" ||
                      info.selectPaymentOption == "BTC" ||
                      info.selectPaymentOption == "ETH" ||
                      info.selectPaymentOption == "LTC") &&
                    (info.cryptoData == "" || info.cryptoData == null) ? (
                      <>
                        <Grid container spacing={3}>
                          <Grid item md={12} className="d-flex">
                            <div style={{ textAlign: "center", width: "100%" }}>
                              {info.isLoader == true ? (
                                <ColorButton
                                  className="makeapaymentbutoon"
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

                    {(info.selectPaymentOption == "USDT" ||
                      info.selectPaymentOption == "BTC" ||
                      info.selectPaymentOption == "ETH" ||
                      info.selectPaymentOption == "LTC") &&
                    info.cryptoData !== "" ? (
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
                                    paddingLeft: "59px",
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
                                      paddingRight: "59px",
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
                            </Grid>
                          </Paper>
                        </Grid>
                      </Grid>
                    ) : (
                      ""
                    )}
                    {info.selectPaymentOption == "India Cash" ? (
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
                                    paddingLeft: "59px",
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
                                        hdfc
                                        <button
                                          className="copy_link"
                                          onClick={(e) => {
                                            navigator.clipboard.writeText(
                                              "hdfc"
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
                                        MR Gray{" "}
                                        <button
                                          className="copy_link"
                                          onClick={(e) => {
                                            navigator.clipboard.writeText(
                                              "MR Gray"
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
                                        12345678901234
                                        <button
                                          className="copy_link"
                                          onClick={(e) => {
                                            navigator.clipboard.writeText(
                                              "12345678901234"
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
                                        BARB0SARSUR{" "}
                                        <button
                                          className="copy_link"
                                          onClick={(e) => {
                                            navigator.clipboard.writeText(
                                              "BARB0SARSUR"
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
                                      paddingRight: "59px",
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
                                      paddingRight: "59px",
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
                                <div style={{ padding: "12px 59px" }}>
                                  <div className="Neon Neon-theme-dragdropbox">
                                    <input
                                      className="imageUplodeUpi"
                                      name="files[]"
                                      id="filer_input2"
                                      //   multiple="multiple"
                                      type="file"
                                      onChange={(e) => {
                                        info.image = e.target.files[0];
                                        setInfo({ ...info });
                                        console.log(e.target.files[0]);
                                      }}
                                    />
                                    <div className="Neon-input-dragDrop">
                                      <div className="Neon-input-inner">
                                        {/* <div className="Neon-input-icon">
                                    <i className="fa fa-file-image-o"></i>
                                  </div> */}
                                        {/* <div className="Neon-input-text">
                                    <h3>Drag&amp;Drop files here</h3>{" "}
                                    <span
                                      style={{
                                        display: "inline-block",
                                        margin: "15px 0",
                                      }}
                                    >
                                      or
                                    </span>
                                  </div> */}
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
                                    {info.image == "" ? "" : info.image.name}
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
                                    padding: "0px 59px 17px 59px",
                                  }}
                                >
                                  <div>
                                    <label className="text-info font-weight-bold form-label-head w-100 required">
                                      Enter UTR Number
                                    </label>
                                    <BootstrapInput
                                      value={info.utn}
                                      name="otp"
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
                                  </div>
                                  <div
                                    style={{
                                      textAlign: "center",
                                      marginTop: "20px",
                                    }}
                                  >
                                    {info.isLoader == true ? (
                                      <ColorButton
                                        className="makeapaymentbutoon"
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
