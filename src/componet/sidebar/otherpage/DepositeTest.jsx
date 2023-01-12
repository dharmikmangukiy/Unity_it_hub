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
import { NavLink, useParams } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import useCountdown from "../../customComponet/useCountdown";
import {
  BootstrapInput,
  ColorButton,
} from "../../customComponet/CustomElement";
import "./otherpage.css";
import "react-toastify/dist/ReactToastify.css";
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
  const [hideBonus, setHideBonus] = useState(true);
  const [info, setInfo] = useState({
    amount: "",
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
        setDataArray({ ...dataArray });
        // setDepositType(type);
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
        // setDepositType(type);
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
                                //   onChange={(e) => {
                                //     setSelectedMT5AccountList(e.target.value);
                                //   }}
                                displayEmpty
                                //   value={selectedMT5AccountList}
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
                                  <li className={`lideposit mar-10 `}>
                                    <a href="/deposit#depositDetails">
                                      <div
                                        title={item.title}
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
                        <div id="depositDetails"></div>
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
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositeTest;
