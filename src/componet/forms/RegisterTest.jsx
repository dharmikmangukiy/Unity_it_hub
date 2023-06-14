import {
  Autocomplete,
  Checkbox,
  createFilterOptions,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Url } from "../../global";
import "./newRegister.css";
import Counter from "../customComponet/Counter";
import Toast from "../commonComponet/Toast";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Convert_PassWord } from "./Encryption";
var key = "";
var valueOfKey = "";
const RegisterTest = (prop) => {
  var regex = /^[a-zA-Z ]*$/;
  const { id, id1 } = useParams();
  const [timer, setTimer] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [compaign, setCompaign] = useState({
    campaign_id: "",
    ref: "",
  });
  const [msg, setMsg] = useState({
    phone: "",
    email: "",
  });
  const [info, setinfo] = useState({
    email: "",
    password: "",
    phone: "",
    code: "",
    fullName: "",
    password: "",
    contry: [],
    otp: "",
    tos: false,
    showPassword: false,
    send_otp: false,
  });
  console.log(key, valueOfKey);
  useEffect(() => {
    if (id == "campaign") {
      var compaignData = id1.split("&");
      var compaignId = compaignData[0].split("=");
      var refId = compaignData[1].split("=");
      compaign.campaign_id = compaignId[1];
      compaign.ref = refId[1];
      setCompaign({ ...compaign });
    }
    if (id == "share") {
      var fullparth = location.search
        .replace(/%3D/g, "=")
        .replace(/%3F/g, "?")
        .replace(/%2F/g, "/")
        .replace(/%3A/g, "/")
        .split("?");
      console.log("id", fullparth);
      if (fullparth.length >= 3) {
        if (fullparth[1].split("=")[0] == "pkey") {
          key = fullparth[1].split("=")[1];
        }
        if (fullparth[2].split("=")[0] == "pvalue") {
          valueOfKey = fullparth[2].split("=")[1];
        }
      }
    }
    // var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // if (
    //   /android/i.test(userAgent) ||
    //   (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
    // ) {
    //   if (id == "campaign") {
    //     window.open(
    //       `https://mydev.rightfx.com/share?register?pkey=campaign_id?pvalue=${compaign.ref}`,
    //       "_parent"
    //     );

    //     // window.open(`${Url}/deeplink/campaign_id/${compaign.ref}`, "_parent");
    //   } else if (id == "managercode") {
    //     // window.open(`${Url}/deeplink/managercode/${id1}`, "_parent");
    //     window.open(
    //       `https://mydev.rightfx.com/share?register?pkey=managercode?pvalue=${id1}`,

    //       "_parent"
    //     );
    //   } else if (id == "affiliate") {
    //     window.open(
    //       `https://mydev.rightfx.com/share?register?pkey=affiliate?pvalue=${id1}`,
    //       "_parent"
    //     );
    //   } else if (id == "sponsor") {
    //     window.open(
    //       `https://mydev.rightfx.com/share?register?pkey=sponsor?pvalue=${id1}`,
    //       "_parent"
    //     );
    //   } else if (id == "referrer") {
    //     window.open(
    //       `https://mydev.rightfx.com/share?register?pkey=referrer?pvalue=${id1}`,
    //       "_parent"
    //     );
    //   } else if (id == "referral_sponsor") {
    //     // window.open(`${Url}/deeplink/referral_sponsor/${id1}`, "_parent");
    //     window.open(
    //       `https://mydev.rightfx.com/share?register?pkey=referral_sponsor?pvalue=${id1}`,
    //       "_parent"
    //     );
    //   } else {
    //     window.open(
    //       `https://mydev.rightfx.com/share?register?pkey=${id}?pvalue=${id1}`,
    //       "_parent"
    //     );
    //   }

    // }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    // if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    //   console.log("iPhone");
    // }
    getContry();
    if (fullparth[1].split("=")[1] == "sponsor") {
      ibLink();
    }
    if (fullparth[1].split("=")[1] == "affiliate") {
      affiliateLink();
    }
  }, []);
  const [infoTrue, setinfoTrue] = useState({
    email: false,
    password: false,
    phone: false,
    code: false,
    otp: false,
    fullName: false,
    password: false,
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

  const affiliateLink = () => {
    const param = new FormData();
    param.append("wallet_code", valueOfKey);

    axios
      .post(Url + "/ajaxfiles/affiliate_url_visit_logs.php", param)
      .then((res) => {});
  };
  const ibLink = () => {
    const param = new FormData();
    param.append("wallet_code", valueOfKey);

    axios
      .post(Url + "/ajaxfiles/ib_url_visit_logs.php", param)
      .then((res) => {});
  };

  const sendOtp = () => {
    if (info.fullName == "") {
      Toast("error", "Full Name is requied");
    } else if (info.phone == "") {
      Toast("error", "Mobile Number is required");
    } else if (
      info.phone.toString().length < 4 ||
      info.phone.toString().length > 12
    ) {
      Toast("error", "Mobile Number is not valid");
    } else if (info.email == "") {
      Toast("error", "Email is required");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(info.email)
    ) {
      Toast("error", "Enter a valid email");
    } else if (info.password == "") {
      Toast("error", "Owner password is required");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
        info.password
      )
    ) {
      Toast(
        "error",
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    } else if (info.tos == false) {
      Toast("error", "You must tick the consent form");
    } else {
      const param = new FormData();
      param.append("user_full_name", info.fullName);
      param.append("user_email_address", info.email);
      param.append("user_country_code", info.code.phonecode);
      param.append("user_phone", info.phone);
      param.append("encryption", 1);
      param.append(
        "user_password",
        Convert_PassWord({ message: info.password })
      );
      //   param.append("send_otp ", "send_otp ");

      param.append("action", "send_otp");

      axios
        .post(Url + "/ajaxfiles/register_otp_manage.php", param)
        .then((res) => {
          if (res.data.status == "error") {
            Toast("error", res.data.message);
          } else {
            setTimer(true);

            Toast("success", res.data.message);
          }
        });
    }
  };
  const verifyPhone = (prop) => {
    const param = new FormData();
    param.append("action", "validate_phone");
    param.append("user_phone", prop);
    axios
      .post(Url + "/ajaxfiles/register_validation.php", param)
      .then((res) => {
        if (res.data.status == "error") {
          msg.phone = res.data.message;
          setMsg({ ...msg });
        } else {
          msg.phone = "";
          setMsg({ ...msg });
        }
      });
  };
  const verifyEmail = (prop) => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(prop)) {
    } else {
      const param = new FormData();
      param.append("action", "validate_email");
      param.append("user_email_address", prop);
      axios
        .post(Url + "/ajaxfiles/register_validation.php", param)
        .then((res) => {
          if (res.data.status == "error") {
            msg.email = res.data.message;
            setMsg({ ...msg });
          } else {
            msg.email = "";
            setMsg({ ...msg });
          }
        });
    }
  };
  const getContry = () => {
    const param = new FormData();
    axios.post(Url + "/datatable/get_countries.php", param).then((res) => {
      if (res.data.status == "error") {
        Toast("error", res.data.message);
      } else {
        // countryData.data = res.data.aaData;
        // setCountryData({ ...countryData });
        let test = res.data.aaData.filter(
          (x) => x.nicename == res.data.user_country
        )[0];
        info.code = test;
        info.contry = res.data.aaData;
        setinfo({ ...info });
      }
    });
  };

  const input1 = (event) => {
    const { name, value } = event.target;
    setinfo((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitForm();
  };

  const onSubmitForm = () => {
    if (info.fullName == "") {
      Toast("error", "Full Name is requied");
    } else if (info.phone == "") {
      Toast("error", "Mobile Number is required");
    } else if (
      info.phone.toString().length < 4 ||
      info.phone.toString().length > 12
    ) {
      Toast("error", "Mobile Number is not valid");
    } else if (info.email == "") {
      Toast("error", "Email is required");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(info.email)
    ) {
      Toast("error", "Enter a valid email");
    } else if (info.password == "") {
      Toast("error", "Password is required");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
        info.password
      )
    ) {
      Toast(
        "error",
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    } else if (info.tos == false) {
      Toast("error", "You must tick the consent form");
    } else {
      const param = new FormData();
      param.append("user_full_name", info.fullName);
      param.append("user_email_address", info.email);
      param.append("user_country_code", info.code.phonecode);
      param.append("encryption", 1);
      param.append("user_phone", info.phone);
      param.append(
        "user_password",
        Convert_PassWord({ message: info.password })
      );

      //   param.append("send_otp ", "send_otp ");
      if (info.send_otp) {
        param.append("send_otp", info.otp);
      } else {
        param.append("action", "send_otp");
      }
      // if (id == "sponsor") {
      //   param.append("sponsor_id", id1);
      // }
      // if (id == "new") {
      //   param.append("is_affiliate", 1);
      // }
      if (id == "manager") {
        param.append("managercode", id1);
      }

      if (id == "campaign") {
        param.append("campaign_id", compaign.ref);
      } else {
        if (id && id1) {
          param.append(id, id1);
        }
      }

      if (key && valueOfKey) {
        param.append(key, valueOfKey);
      }
      info.isLoader = true;
      setinfo({ ...info });
      axios
        .post(
          Url +
            `${
              info.send_otp == false
                ? "/ajaxfiles/register_otp_manage.php"
                : "/ajaxfiles/registration.php"
            }`,
          param
        )
        .then((res) => {
          if (res.data.status == "error") {
            Toast("error", res.data.message);
            info.isLoader = false;
            setinfo({ ...info });
          } else {
            info.isLoader = false;

            if (res.data?.send_otp == 1) {
              info.send_otp = true;
              setTimer(true);
            } else if (res.data?.send_otp == 0) {
              if (res.data.return_url) {
                window.open(res.data.return_url, "_self");
              } else {
                localStorage.clear();
                prop.fetchUserPref("/dashboard");
                navigate("/dashboard");
              }
            }
            setinfo({ ...info });
            Toast("success", res.data.message);
          }
        });
    }
  };
  const filterOptions = createFilterOptions({
    stringify: (option) => option.phonecode,
  });

  return (
    <div>
      <div className="loginCard">
        <div className="card1">
          <div className="loginPading">
            {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
            <div className="textCenter">
              <img
                src="./image/logo1.png"
                className="m-3"
                style={{ width: "70%" }}
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="reg-textField">
                <TextField
                  id="standard-search"
                  label="Full Name"
                  sx={{ width: "100%" }}
                  variant="standard"
                  name="fullName"
                  // error={
                  //   info.fullName == "" && infoTrue.fullName == true
                  //     ? true
                  //     : false
                  // }
                  helperText={
                    info.fullName == "" && infoTrue.fullName == true
                      ? "Full Name is requied"
                      : ""
                  }
                  value={info.fullName}
                  onChange={(e) => {
                    if (regex.test(e.target.value)) {
                      input1(e);
                    }
                  }}
                  onBlur={trueFalse}
                />
              </div>
              <div className="reg-textField">
                <div className=" d-flex">
                  <div style={{ width: "35%", marginTop: "19px" }}>
                    <Autocomplete
                      options={info.contry}
                      value={info.code}
                      getOptionLabel={(option) =>
                        option ? option.phonecode : ""
                      }
                      renderOption={(props, option) => {
                        return (
                          <li {...props} key={option.name}>
                            {option.phonecode}
                          </li>
                        );
                      }}
                      onChange={(event, newValue) => {
                        if (newValue == null) {
                        } else {
                          info.code = newValue;
                          setinfo({ ...info });
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          //   sx={{ width: "15%" }}
                          className="w-100"
                          variant="standard"
                          size="small"
                          onBlur={trueFalse}
                          name="country"
                        />
                      )}
                    />
                  </div>
                  <div style={{ width: "65%" }}>
                    <TextField
                      id="standard-search"
                      label="Mobile Number"
                      variant="standard"
                      className="w-100"
                      name="phone"
                      value={info.phone}
                      onBlur={trueFalse}
                      onChange={(e) => {
                        if (
                          Number(e.target.value) > 0 ||
                          e.target.value == ""
                        ) {
                          input1(e);
                        }
                        if (
                          e.target.value.toString().length >= 4 &&
                          e.target.value.toString().length < 12
                        ) {
                          verifyPhone(e.target.value);
                        }
                      }}
                      // error={
                      //   (info.phone.toString().length < 4 ||
                      //     info.phone.toString().length > 12 ||
                      //     info.phone == "" ||
                      //     msg.phone != "") &&
                      //   infoTrue.phone
                      //     ? true
                      //     : false
                      // }
                      // helperText={
                      //   info.phone == "" && infoTrue.phone
                      //     ? "Mobile Number is required"
                      //     : (info.phone.toString().length < 4 ||
                      //         info.phone.toString().length > 12) &&
                      //       infoTrue.phone
                      //     ? "Mobile Number is not valid"
                      //     : msg.phone != "" && infoTrue.phone
                      //     ? msg.phone
                      //     : ""
                      // }
                    />
                  </div>
                </div>
                {info.phone == "" && infoTrue.phone ? (
                  <span className="error">Mobile Number is required</span>
                ) : (info.phone.toString().length < 4 ||
                    info.phone.toString().length > 12) &&
                  infoTrue.phone ? (
                  <span className="error">Mobile Number is not valid</span>
                ) : msg.phone != "" && infoTrue.phone ? (
                  <span className="error">{msg.phone}</span>
                ) : (
                  ""
                )}
              </div>

              <div className="reg-textField">
                <TextField
                  id="standard-search"
                  label="Email"
                  sx={{ width: "100%" }}
                  variant="standard"
                  name="email"
                  value={info.email}
                  onChange={(e) => {
                    input1(e);
                    verifyEmail(e.target.value);
                  }}
                  onBlur={trueFalse}
                  // error={
                  //   (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                  //     info.email
                  //   ) ||
                  //     info.email == "" ||
                  //     msg.email != "") &&
                  //   infoTrue.email == true
                  //     ? true
                  //     : false
                  // }
                  helperText={
                    info.email == "" && infoTrue.email
                      ? "Email is required"
                      : !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                          info.email
                        ) && infoTrue.email
                      ? "Enter a valid email"
                      : msg.email != "" && infoTrue.email
                      ? msg.email
                      : ""
                  }
                />
              </div>

              <div className="reg-textField">
                <TextField
                  id="standard-password-input"
                  label="Password"
                  type={info.showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  variant="standard"
                  sx={{ width: "100%" }}
                  value={info.password}
                  onBlur={trueFalse}
                  onChange={input1}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          // aria-label="toggle password visibility"
                          onClick={() => {
                            info.showPassword = !info.showPassword;
                            setinfo({ ...info });
                          }}
                          edge="end"
                        >
                          {info.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  // error={
                  //   (!info.password.match(/[A-Z]/g) ||
                  //     !info.password.match(/[a-z]/g) ||
                  //     !info.password.match(/[0-9]/g) ||
                  //     info.password == "" ||
                  //     info.password.length < 8 ||
                  //     info.password.length > 20 ||
                  //     !info.password.match(/[!@#$%^&*()_+=]/g)) &&
                  //   infoTrue.password == true
                  //     ? true
                  //     : false
                  // }
                  helperText={
                    info.password == "" && infoTrue.password == true
                      ? "Enter your password"
                      : infoTrue.password == true &&
                        (info.password.length < 8 || info.password.length > 20)
                      ? "Password must contain atleast 8-20 characters"
                      : infoTrue.password == true &&
                        (!info.password.match(/[A-Z]/g) ||
                          !info.password.match(/[a-z]/g) ||
                          !info.password.match(/[0-9]/g) ||
                          !info.password.match(/[!@#$%^&*()_+=]/g))
                      ? "Atleast one lower case, upper case,special character and number required"
                      : ""
                  }
                />
              </div>
              {info.send_otp ? (
                <div className="reg-textField">
                  <TextField
                    id="standard-search"
                    label="Enter OTP"
                    variant="standard"
                    className="w-100"
                    name="otp"
                    value={info.otp}
                    onBlur={trueFalse}
                    onChange={(e) => {
                      if (Number(e.target.value) > 0 || e.target.value == "") {
                        input1(e);
                      }
                    }}
                    // error={info.otp == "" && infoTrue.otp ? true : false}
                    helperText={
                      info.otp == "" && infoTrue.otp ? "OTP is required" : ""
                    }
                  />
                </div>
              ) : (
                ""
              )}

              <div className="row mbr-4 ">
                <ul className="validation-reg">
                  <li
                    className={
                      info.password.length >= 8 && info.password.length <= 20
                        ? "val-reg-true"
                        : "val-reg-false"
                    }
                  >
                    {" "}
                    {info.password.length >= 8 && info.password.length <= 20 ? (
                      <CheckIcon />
                    ) : (
                      <CloseIcon />
                    )}
                    8-20 characters
                  </li>
                  <li
                    className={
                      info.password.match(/[A-Z]/g) &&
                      info.password.match(/[a-z]/g)
                        ? "val-reg-true"
                        : "val-reg-false"
                    }
                  >
                    {info.password.match(/[A-Z]/g) &&
                    info.password.match(/[a-z]/g) ? (
                      <CheckIcon />
                    ) : (
                      <CloseIcon />
                    )}
                    LATIN LETTERS EX.A-Z,a-z
                  </li>
                  <li
                    className={
                      info.password.match(/[0-9]/g)
                        ? "val-reg-true"
                        : "val-reg-false"
                    }
                  >
                    {info.password.match(/[0-9]/g) ? (
                      <CheckIcon />
                    ) : (
                      <CloseIcon />
                    )}
                    Numbers EX.0-9
                  </li>
                  <li
                    className={
                      info.password.match(/[!@$%^&*()_+=]/g)
                        ? "val-reg-true"
                        : "val-reg-false"
                    }
                  >
                    {info.password.match(/[!@$%^&*()_+=]/g) ? (
                      <CheckIcon />
                    ) : (
                      <CloseIcon />
                    )}
                    Special Characters Ex.@$%^&*
                  </li>
                </ul>
              </div>
              <div className="row mbr-4">
                <div className="d-flex" style={{ marginBottom: "10px" }}>
                  {/* <FormGroup>
                                  <FormControlLabel control={<CheckBox name="tos" checked={info.tos} onChange={input1} />} label="tos" />
                                </FormGroup> */}
                  {/* <input
                    type="checkbox"
                    name="tos"
                    style={{
                      height: "auto",
                      width: "20px",
                      marginBottom: "auto",
                    }}
                    value={info.tos}
                    onChange={(e) => {
                      info.tos = e.target.checked;
                      setinfo({ ...info });
                    }}
                    
                    className="form-check-input"
                  /> */}
                  <Checkbox
                    id="gridCheck"
                    onChange={(e) => {
                      info.tos = e.target.checked;
                      setinfo({ ...info });
                    }}
                    className="form-check-input marginregonput"
                    value={info.tos}
                    size="small"
                    sx={{
                      color: "#5d2067",
                      "&.Mui-checked": {
                        color: "#5d2067",
                      },
                      marginRight: "5px",
                      marginTop: "2px",
                    }}
                  />
                  <label
                    htmlFor="gridCheck"
                    // className="form-check-label"
                    style={{ fontSize: "12px", cursor: "pointer" }}
                  >
                    <span>
                      I declare and confirm that I am not a citizen or resident
                      of the US for tax purposes and I am not violating any laws
                      of my country of residence. also here i confirm that i
                      have read and agree {"with "}
                    </span>
                    <a
                      href="https://rightfx.com/legal-documents"
                      target="_blank"
                    >
                      Customer Agreement and All T&C.
                    </a>
                  </label>
                  {/* <div className="invalid-tooltip">
                    Accept Terms &amp; Conditions is required
                  </div> */}
                </div>
              </div>
              <div className="text-center mx-auto">
                <div className="loginButton-main">
                  {info.send_otp == true ? (
                    <button
                      onClick={sendOtp}
                      disabled={timer}
                      type="button"
                      className="btn btn-primary loginbutton"
                    >
                      {timer ? (
                        <Counter reset={timer} setReset={setTimer} />
                      ) : (
                        "Resend OTP"
                      )}
                    </button>
                  ) : (
                    ""
                  )}
                  {info.isLoader == true ? (
                    <button
                      type="submit"
                      className="btn btn-primary loginbutton"
                      disabled
                    >
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
                    </button>
                  ) : (
                    <div>
                      <button
                        type="submit"
                        disabled={!info.tos}
                        className="btn btn-primary loginbutton"
                      >
                        Register
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="centerflexjus mt-3 logblock">
                <div>
                  <span style={{ color: "rgb(124 120 120)" }}>
                    Already have an account ?{" "}
                    <NavLink to="/login" className="logblock1 main-color">
                      Login
                    </NavLink>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterTest;
