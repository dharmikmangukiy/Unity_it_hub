import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { Url } from "../../global.js";
import axios from "axios";
import Toast from "../commonComponet/Toast";
import Counter from "../customComponet/Counter.jsx";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#ff0000"),
  backgroundColor: "black",
  textTransform: "initial",
  fontSize: "13px",
  padding: "15px 22px",
  borderRadius: "100px",
  "&:hover": {
    color: "#ff0000",
    borderRadius: "100px",
    backgroundColor: "black",
  },
}));
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    // color: "white",
    fontWeight: "700",
    fontSize: "19px",
  },
  "& label": {
    fontWeight: "700",
    fontSize: "19px",
  },
  "& .MuiInputBase-root": {
    fontSize: "20px",
    fontWeight: "500",
    fontFamily: "Cairo, sans-serif",
  },
  "& .MuiInput-underline:after": {
    // borderBottomColor: "white",
  },
});

export default function ForgotPassword() {
  const [data, setData] = useState({
    user_name: "",
    otp: "",
    resend: false,
    showPassword: false,
    showPassword1: false,

    verifyOtp: false,
    password: "",
    confirm_password: "",
  });
  const [timer, setTimer] = useState(true);

  const [infoTrue, setinfoTrue] = useState({
    user_name: false,
    otp: false,
    password: false,
    confirm_password: false,
  });
  const input1 = (event) => {
    const { name, value } = event.target;
    setData((prevalue) => {
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

  const [isLoader, setIsLoader] = useState(false);
  const navigate = useNavigate();

  const onVerifyOtp = () => {
    if (!data.user_name) {
      Toast("error", "Email or Mobile is requied");
      return false;
    } else if (!data.otp) {
      Toast("error", "OTP is requied");
    } else {
      setIsLoader(true);

      const param = new FormData();
      param.append("user_name", data.user_name);
      param.append("otp", data.otp);
      param.append("action", "check_otp_valid");
      axios
        .post(Url + "/ajaxfiles/forgot_password_mobile.php", param)
        .then((res) => {
          if (res.data.status == "error") {
            Toast("error", res.data.message);
            setIsLoader(false);
          } else {
            Toast("success", res.data.message);
            setIsLoader(false);
            data.resend = true;
            data.verifyOtp = true;

            setIsLoader(false);

            setData({ ...data });
          }
        });
    }
  };
  const onReset = () => {
    if (!data.user_name) {
      Toast("error", "Email or Mobile is requied");
      return false;
    } else if (!data.otp) {
      Toast("error", "OTP is requied");
    } else if (!data.password) {
      Toast("error", "Enter your password");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
        data.password
      )
    ) {
      Toast(
        "error",
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    } else if (!data.confirm_password) {
      Toast("error", "Enter your Confirm Password");
    } else if (data.confirm_password !== data.password) {
      Toast("error", "Confirm password did not matched");
    } else {
      setIsLoader(true);
      data.verifyOtp = true;
      const param = new FormData();
      param.append("user_name", data.user_name);
      param.append("otp", data.otp);
      param.append("password", data.password);
      param.append("confirm_password", data.confirm_password);

      param.append("action", "verify_otp");
      axios
        .post(Url + "/ajaxfiles/forgot_password_mobile.php", param)
        .then((res) => {
          if (res.data.status == "error") {
            Toast("error", res.data.message);
            setIsLoader(false);
          } else {
            Toast("success", res.data.message);
            setIsLoader(false);
            data.resend = true;
            data.verifyOtp = true;

            setIsLoader(false);

            setData({ ...data });
            navigate("/login");
          }
        });
    }
  };

  const onSumbit = () => {
    if (!data.user_name) {
      Toast("error", "Email or Mobile is requied");
      return false;
    } else {
      if (!data.resend) {
        setIsLoader(true);
      }
      setTimer(true);

      const param = new FormData();
      param.append("user_name", data.user_name);
      param.append("action", "send_otp");
      axios
        .post(Url + "/ajaxfiles/forgot_password_mobile.php", param)
        .then((res) => {
          if (res.data.status == "error") {
            Toast("error", res.data.message);
            setIsLoader(false);
          } else {
            Toast("success", res.data.message);
            setIsLoader(false);
            data.resend = true;
            setData({ ...data });
            setTimer(true);
          }
        });
    }
  };

  return (
    <>
      <div className="loginCard">
        <div className="card1">
          <div className="loginPading">
            <div className="textCenter">
              <img
                src="./image/logo1.png"
                className="m-3"
                style={{ width: "70%" }}
              />
            </div>
            <div className="text-center">
              <h4 className="mb-1 font-weight-bold ">Forgot Password</h4>
              <p className="mb-0 ">
                Fill in your Email or Mobile to reset password.
              </p>
            </div>
            <div>
              {data.verifyOtp == false ? (
                <>
                  <div className="my-4">
                    <CssTextField
                      id="standard-search"
                      label="Email or Mobile"
                      name="user_name"
                      value={data.user_name}
                      // onChange={(e) => setData(e.target.value)}
                      sx={{ width: "100%" }}
                      onBlur={trueFalse}
                      onChange={input1}
                      error={
                        data.user_name == "" && infoTrue.user_name
                          ? true
                          : false
                      }
                      helperText={
                        data.user_name == "" && infoTrue.user_name
                          ? "Email or Mobile is requied"
                          : ""
                      }
                      variant="standard"
                    />
                  </div>
                  {data.resend == true ? (
                    <div className="my-4">
                      <CssTextField
                        id="standard-search"
                        label="OTP"
                        name="otp"
                        value={data.otp}
                        // onChange={(e) => setData(e.target.value)}
                        sx={{ width: "100%" }}
                        onBlur={trueFalse}
                        onChange={(e) => {
                          if (
                            Number(e.target.value) > 0 ||
                            e.target.value == ""
                          ) {
                            input1(e);
                          }
                        }}
                        error={data.otp == "" && infoTrue.otp ? true : false}
                        helperText={
                          data.otp == "" && infoTrue.otp ? "OTP is requied" : ""
                        }
                        variant="standard"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <>
                  <div className="my-4">
                    <CssTextField
                      id="standard-password-input"
                      label="Password"
                      type={data.showPassword ? "text" : "password"}
                      name="password"
                      autoComplete="current-password"
                      variant="standard"
                      sx={{ width: "100%" }}
                      value={data.password}
                      onBlur={trueFalse}
                      onChange={input1}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              // aria-label="toggle password visibility"
                              onClick={() => {
                                data.showPassword = !data.showPassword;
                                setData({ ...data });
                              }}
                              edge="end"
                            >
                              {data.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      error={
                        (!data.password.match(/[A-Z]/g) ||
                          !data.password.match(/[a-z]/g) ||
                          !data.password.match(/[0-9]/g) ||
                          data.password == "" ||
                          data.password.length < 8 ||
                          data.password.length > 20 ||
                          !data.password.match(/[!@$%^&*()_+=]/g)) &&
                        infoTrue.password == true
                          ? true
                          : false
                      }
                      helperText={
                        data.password == "" && infoTrue.password == true
                          ? "Enter your password"
                          : infoTrue.password == true &&
                            (data.password.length < 8 ||
                              data.password.length > 20)
                          ? "Password must contain atleast 8-20 characters"
                          : infoTrue.password == true &&
                            (!data.password.match(/[A-Z]/g) ||
                              !data.password.match(/[a-z]/g) ||
                              !data.password.match(/[0-9]/g) ||
                              !data.password.match(/[!@$%^&*()_+=]/g))
                          ? "Atleast one lower case, upper case,special character and number required"
                          : ""
                      }
                    />
                  </div>
                  <div className="my-4">
                    <CssTextField
                      id="standard-password-input"
                      label="Confirm Password"
                      type={data.showPassword1 ? "text" : "password"}
                      name="confirm_password"
                      variant="standard"
                      sx={{ width: "100%" }}
                      value={data.confirm_password}
                      onBlur={trueFalse}
                      onChange={input1}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              // aria-label="toggle password visibility"
                              onClick={() => {
                                data.showPassword1 = !data.showPassword1;
                                setData({ ...data });
                              }}
                              edge="end"
                            >
                              {data.showPassword1 ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      error={
                        (data.confirm_password == "" ||
                          data.confirm_password !== data.password) &&
                        infoTrue.confirm_password
                          ? true
                          : false
                      }
                      helperText={
                        data.confirm_password == "" &&
                        infoTrue.confirm_password == true
                          ? "Enter your Confirm Password"
                          : data.confirm_password !== data.password &&
                            infoTrue.confirm_password == true
                          ? "Confirm password did not matched"
                          : ""
                      }
                    />
                  </div>
                </>
              )}

              <div className="text-center py-4">
                {data.resend == true && data.verifyOtp == false ? (
                  <button
                    onClick={onSumbit}
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
                )}{" "}
                {isLoader == true ? (
                  <button className="btn btn-primary loginbutton" disabled>
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
                  <>
                    {data.resend == true && data.verifyOtp == false ? (
                      <>
                        <button
                          onClick={onVerifyOtp}
                          className="btn btn-primary loginbutton"
                        >
                          Verify OTP
                        </button>{" "}
                      </>
                    ) : data.resend == true && data.verifyOtp == true ? (
                      <>
                        <button
                          onClick={onReset}
                          className="btn btn-primary loginbutton"
                        >
                          Reset Password
                        </button>{" "}
                      </>
                    ) : (
                      <button
                        onClick={onSumbit}
                        className="btn btn-primary loginbutton"
                      >
                        Send OTP
                      </button>
                    )}
                  </>
                )}
                {/* {isLoader == true ? (
                  <ColorButton size="large" >
                    <i class="fa fa-refresh fa-spin fa-3x fa-fw" style={{fontSize:"20px"}}></i>
                    <span style={{ textTransform: "capitalize" }}>
                     
                    </span>
                  </ColorButton>
                ) : (
                  <ColorButton tabindex="0" onClick={onSumbit} size="large">
                    <span style={{ textTransform: "capitalize" }}>
                      Reset Password
                    </span>
                  </ColorButton>
                )} */}
              </div>
              <div className="text-right mt-3">
                <span style={{ color: "color: rgb(124, 120, 120)" }}>
                  Back To
                </span>
                <NavLink to="/login" className="">
                  {" "}
                  Login
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
