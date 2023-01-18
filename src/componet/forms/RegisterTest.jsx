import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Url } from "../../global";
import "./newRegister.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Counter from "../customComponet/Counter";

const RegisterTest = () => {
  const { id, id1 } = useParams();
  console.log(id, id1);
  const [timer, setTimer] = useState(true);
  const navigate = useNavigate();
  const [compaign, setCompaign] = useState({
    campaign_id: "",
    ref: "",
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
    send_otp: false,
  });
  useEffect(() => {
    getContry();
    if (id == "campaign") {
      var compaignData = id1.split("&");
      var compaignId = compaignData[0].split("=");
      var refId = compaignData[1].split("=");
      compaign.campaign_id = compaignId[1];
      compaign.ref = refId[1];
      setCompaign({ ...compaign });
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
  toast.configure();

  const sendOtp = () => {
    if (info.fullName == "") {
      toast.error("Full Name is requied");
    } else if (info.phone == "") {
      toast.error("Mobile Number is required");
    } else if (
      info.phone.toString().length < 4 ||
      info.phone.toString().length > 12
    ) {
      toast.error("Mobile Number is not valid");
    } else if (info.email == "") {
      toast.error("Email is required");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(info.email)
    ) {
      toast.error("Enter a valid email");
    } else if (info.password == "") {
      toast.error("Owner password is required");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
        info.password
      )
    ) {
      toast.error(
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    } else {
      const param = new FormData();
      param.append("user_full_name", info.fullName);
      param.append("user_email_address", info.email);
      param.append("user_country_code", info.code.phonecode);
      param.append("user_phone", info.phone);
      param.append("user_password", info.password);
      //   param.append("send_otp ", "send_otp ");

      param.append("action", "send_otp");

      axios
        .post(Url + "/ajaxfiles/register_otp_manage.php", param)
        .then((res) => {
          if (res.data.status == "error") {
            toast.error(res.data.message);
          } else {
            setTimer(true);

            toast.success(res.data.message);
          }
        });
    }
  };
  const getContry = () => {
    const param = new FormData();
    axios.post(Url + "/datatable/get_countries.php", param).then((res) => {
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        // countryData.data = res.data.aaData;
        // setCountryData({ ...countryData });
        let test = res.data.aaData.filter(
          (x) => x.nicename == res.data.user_country
        )[0];
        // console.log("code", test);
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
    // console.log(info);
  };
  const handleSubmit = (e) => {
    onSubmitForm();

    e.preventDefault();
  };
  const onSubmitForm = () => {
    if (info.fullName == "") {
      toast.error("Full Name is requied");
    } else if (info.phone == "") {
      toast.error("Mobile Number is required");
    } else if (
      info.phone.toString().length < 4 ||
      info.phone.toString().length > 12
    ) {
      toast.error("Mobile Number is not valid");
    } else if (info.email == "") {
      toast.error("Email is required");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(info.email)
    ) {
      toast.error("Enter a valid email");
    } else if (info.password == "") {
      toast.error("Owner password is required");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
        info.password
      )
    ) {
      toast.error(
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    } else {
      const param = new FormData();
      param.append("user_full_name", info.fullName);
      param.append("user_email_address", info.email);
      param.append("user_country_code", info.code.phonecode);
      param.append("user_phone", info.phone);
      param.append("user_password", info.password);
      //   param.append("send_otp ", "send_otp ");
      if (info.send_otp) {
        param.append("send_otp", info.otp);
      } else {
        param.append("action", "send_otp");
      }
      if (id == "sponsor") {
        param.append("sponsor_id", id1);
      }

      if (id == "manager") {
        param.append("managercode", id1);
      }

      if (id == "campaign") {
        param.append("campaign_id", compaign.ref);
      }
      if (id == "affiliate") {
        param.append("sponsor_id", id);
        param.append("affiliate", 1);
      }
      if (id == "new") {
        param.append("is_affiliate", 1);
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
            toast.error(res.data.message);
            info.isLoader = false;
            setinfo({ ...info });
          } else {
            info.isLoader = false;
            if (res.data?.send_otp == 1) {
              info.send_otp = true;
              setTimer(true);
            } else if (res.data?.send_otp == 0) {
              navigate("/login");
            }
            setinfo({ ...info });
            toast.success(res.data.message);
          }
        });
    }
  };
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
                  error={
                    info.fullName == "" && infoTrue.fullName == true
                      ? true
                      : false
                  }
                  helperText={
                    info.fullName == "" && infoTrue.fullName == true
                      ? "Full Name is requied"
                      : ""
                  }
                  value={info.fullName}
                  onChange={input1}
                  onBlur={trueFalse}
                />
              </div>
              <div className="reg-textField d-flex">
                <div style={{ width: "25%", marginTop: "19px" }}>
                  <Autocomplete
                    disablePortal
                    options={info.contry}
                    value={info.code}
                    getOptionLabel={(option) =>
                      option ? option.phonecode : ""
                    }
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
                <div style={{ width: "75%" }}>
                  <TextField
                    id="standard-search"
                    label="Mobile Number"
                    variant="standard"
                    className="w-100"
                    name="phone"
                    value={info.phone}
                    onBlur={trueFalse}
                    onChange={(e) => {
                      if (Number(e.target.value) > 0 || e.target.value == "") {
                        input1(e);
                      }
                    }}
                    error={
                      (info.phone.toString().length < 4 ||
                        info.phone.toString().length > 12 ||
                        info.phone == "") &&
                      infoTrue.phone
                        ? true
                        : false
                    }
                    helperText={
                      info.phone == "" && infoTrue.phone
                        ? "Mobile Number is required"
                        : (info.phone.toString().length < 4 ||
                            info.phone.toString().length > 12) &&
                          infoTrue.phone
                        ? "Mobile Number is not valid"
                        : ""
                    }
                  />
                </div>
              </div>
              <div className="reg-textField">
                <TextField
                  id="standard-search"
                  label="Email"
                  sx={{ width: "100%" }}
                  variant="standard"
                  name="email"
                  value={info.email}
                  onChange={input1}
                  onBlur={trueFalse}
                  error={
                    (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                      info.email
                    ) ||
                      info.email == "") &&
                    infoTrue.email == true
                      ? true
                      : false
                  }
                  helperText={
                    info.email == "" && infoTrue.email
                      ? "Email is required"
                      : !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                          info.email
                        ) && infoTrue.email
                      ? "Enter a valid email"
                      : ""
                  }
                />
              </div>

              <div className="reg-textField">
                <TextField
                  id="standard-password-input"
                  label="Password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  variant="standard"
                  sx={{ width: "100%" }}
                  value={info.password}
                  onBlur={trueFalse}
                  onChange={input1}
                  error={
                    (!info.password.match(/[A-Z]/g) ||
                      !info.password.match(/[a-z]/g) ||
                      !info.password.match(/[0-9]/g) ||
                      info.password == "" ||
                      info.password.length < 8 ||
                      info.password.length > 20 ||
                      !info.password.match(/[!@#$%^&*()_+=]/g)) &&
                    infoTrue.password == true
                      ? true
                      : false
                  }
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
                    label="OTP"
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
                    error={info.otp == "" && infoTrue.otp ? true : false}
                    helperText={
                      info.otp == "" && infoTrue.otp ? "Otp is required" : ""
                    }
                  />
                </div>
              ) : (
                ""
              )}

              {/* <div className="text-right pb-4">
                <NavLink className="" to="/ForgotPassword">
                  Forgot Password ?
                </NavLink>
              </div> */}

              <div className="text-center mx-auto">
                {/* {isLoader == true ? (
                  <ColorButton className=" font-weight-bold w-100 my-2 p-3 ">
                    <i
                      class="fa fa-refresh fa-spin fa-3x fa-fw"
                      style={{ fontSize: "20px" }}
                    ></i>
                    <span style={{ textTransform: "capitalize" }}>Log In</span>
                    <span className="MuiTouchRipple-root"></span>
                  </ColorButton>
                ) : (
                  <ColorButton
                    type="submit"
                    size="large"
                    className=" font-weight-bold w-100 my-2 p-3 "
                  >
                    <span style={{ textTransform: "capitalize" }}>Log In</span>
                    <span className="MuiTouchRipple-root"></span>
                  </ColorButton>
                )} */}
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
                    Already have an account?
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
