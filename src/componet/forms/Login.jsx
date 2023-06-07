import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { IsApprove, Url } from "../../global.js";
import axios from "axios";
import { useParams } from "react-router-dom";
// import logo from './logo2.png';
// import ForgotPassword from './ForgotPassword';
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
//import CssTextField from './CssTextField';
import { Email, Phone } from "@mui/icons-material";
import Toast from "../commonComponet/Toast.jsx";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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

export default function Login1(prop) {
  const [Dopen, setDOpen] = React.useState(false);
  const descriptionElementRef = React.useRef(null);
  const navigate = useNavigate();
  const [isSubmit, setisSubmit] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [infoErrors, setInfoErrors] = useState({});

  const [infoTrue, setinfoTrue] = useState({
    email: false,
  });
  const [msg, setMsg] = useState({
    phone: "",
  });
  const [isLoader, setIsLoader] = useState(false);
  const { id } = useParams();
  const [info, setinfo] = useState({
    email: "",
    password: "",
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
    setInfoErrors(validate(info));
    setisSubmit(true);
  };
  const verifyPhoneEmail = (prop) => {
    const param = new FormData();
    param.append("action", "validate_phone");
    param.append("username", prop);
    axios
      .post(Url + "/ajaxfiles/check_username_exist.php", param)
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
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is requied";
      notify("Email or Mobile is requied");
    } else if (!values.password) {
      errors.password = " password is requied";
      notify("Password is requied");
    }
    return errors;
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const notify = (p) => {
    Toast("error", p);
  };
  const notify1 = (p) => {
    Toast("success", p);
  };

  useEffect(() => {
    if (id == "success") {
      Toast("success", "Your account has been verified successfully");
    }
  }, []);

  useEffect(() => {
    if (Object.keys(infoErrors).length === 0 && isSubmit) {
      setIsLoader(true);
      const param = new FormData();
      param.append("username", info.email);
      param.append("password", info.password);
      axios.post(Url + "/ajaxfiles/login_check.php", param).then((res) => {
        // setLoader(false);
        if (res.data.status == "error") {
          Toast("error", res.data.message);
          setIsLoader(false);
        } else {
          if (res.data.return_url) {
            window.open(res.data.return_url, "_self");
          } else {
            localStorage.clear();
            notify1("Login successful");
            localStorage.setItem("login", false);
            if (IsApprove !== "") {
              IsApprove.user_id = res.data.user_data.user_id;
              IsApprove.auth = res.data.user_data.auth_key;
            }
            setIsLoader(false);
            prop.fetchUserPref("/dashboard");
            navigate("/dashboard");
          }
        }
      });
    }
  }, [infoErrors]);
  return (
    <>
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
              <div className="my-4">
                <CssTextField
                  id="standard-search"
                  label="Email or Mobile"
                  sx={{ width: "100%" }}
                  variant="standard"
                  name="email"
                  onBlur={trueFalse}
                  value={info.email}
                  // error={
                  //   (info.email == "" || msg.phone != "") &&
                  //   infoTrue.email == true
                  //     ? true
                  //     : false
                  // }
                  helperText={
                    info.email == "" && infoTrue.email == true
                      ? "Email or Mobile is requied"
                      : msg.phone != "" && infoTrue.email == true
                      ? msg.phone
                      : ""
                  }
                  onChange={(e) => {
                    input1(e);
                    if (e.target.value.length > 3) {
                      verifyPhoneEmail(e.target.value);
                    }
                  }}
                />
              </div>

              <div className="mb-3">
                <CssTextField
                  id="standard-password-input"
                  label="Password"
                  type={!showPassword ? "password" : "text"}
                  name="password"
                  autoComplete="current-password"
                  variant="standard"
                  sx={{ width: "100%" }}
                  value={info.password}
                  onBlur={trueFalse}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          //</InputAdornment>
                          onClick={handleClickShowPassword}
                          // onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}{" "}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  // endAdornment={
                  //   <InputAdornment position="end">
                  //     <IconButton
                  //       aria-label="toggle password visibility"
                  //       // onClick={handleClickShowPassword}
                  //       // onMouseDown={handleMouseDownPassword}
                  //     >
                  //       <Visibility />
                  //     </IconButton>
                  //   </InputAdornment>
                  // }
                  // error={
                  //   info.password == "" && infoTrue.password == true
                  //     ? true
                  //     : false
                  // }
                  helperText={
                    info.password == "" && infoTrue.password == true
                      ? "Password is requied"
                      : ""
                  }
                  onChange={input1}
                />
              </div>

              <div className="text-right pb-4">
                <NavLink className="main-color" to="/ForgotPassword">
                  Forgot Password ?
                </NavLink>
              </div>

              <div className="text-center w-50 mx-auto">
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
                {isLoader == true ? (
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
                  <button type="submit" className="btn btn-primary loginbutton">
                    Log In
                  </button>
                )}
              </div>

              <div
                className="centerflexjus mt-3 logblock"
                style={{ fontSize: "13px" }}
              >
                <div>
                  <span style={{ color: "rgb(124 120 120)" }}>
                    Don't have an account?{" "}
                  </span>
                </div>
                <div>
                  <NavLink to="/register" className="logblock1 main-color">
                    Apply for a live account
                  </NavLink>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
