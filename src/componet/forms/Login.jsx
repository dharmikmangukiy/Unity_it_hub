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
import { Email } from "@mui/icons-material";
import Toast from "../commonComponet/Toast.jsx";
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
  const [infoErrors, setInfoErrors] = useState({});
  const [isLoader, setIsLoader] = useState(false);
  const { id } = useParams();
  const [info, setinfo] = useState({
    email: "",
    password: "",
  });
  const input1 = (event) => {
    const { name, value } = event.target;
    setinfo((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
    console.log(info);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setInfoErrors(validate(info));
    setisSubmit(true);
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
  const notify = (p) => {
    Toast("error", p);
  };
  const notify1 = (p) => {
    Toast("success", p);
  };

  useEffect(() => {
    console.log(id);
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
          notify1("Login successful");
          console.log(res.data.user_data);
          localStorage.setItem("login", false);
          // localStorage.setItem("user_id", res.data.user_data.user_id);
          // localStorage.setItem("auth_key", res.data.user_data.auth_key);
          localStorage.setItem("wallet_code", res.data.user_data.wallet_code);
          localStorage.setItem("is_pamm", res.data.user_data.is_pamm);
          localStorage.setItem(
            "is_ib_account",
            res.data.user_data.is_ib_account
          );
          localStorage.setItem("mt5_acc_no", res.data.user_data.mt5_acc_no);
          localStorage.setItem("step", res.data.user_data.step_number);
          if (res.data.user_data.step_number < 4) {
            localStorage.setItem("setModel", true);
          } else {
            localStorage.setItem("setModel", false);
          }

          if (IsApprove !== "") {
            IsApprove.user_id = res.data.user_data.user_id;
            IsApprove.auth = res.data.user_data.auth_key;
          }

          setIsLoader(false);
          prop.setLogin("false");
          navigate("/dashboard");
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
                  value={info.email}
                  onChange={input1}
                />
              </div>

              <div className="mb-3">
                <CssTextField
                  id="standard-password-input"
                  label="Password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  variant="standard"
                  sx={{ width: "100%" }}
                  value={info.password}
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
