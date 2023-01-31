import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Navigate, useNavigate } from "react-router-dom";
import { NavLink, useParams } from "react-router-dom";

import { Url } from "../../global.js";
import axios from "axios";
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
const ResetPassword = () => {
  const navigate = useNavigate();
  const { id, id1 } = useParams();
  const [info, setinfo] = useState({
    password: "",
    confirmPassword: "",
  });
  console.log("q", id);
  const [isLoader, setIsLoader] = useState(false);
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

  const onSubmit = () => {
    if (!info.password) {
      Toast("error", "password is requied");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
        info.password
      )
    ) {
      Toast(
        "error",
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    } else if (!info.confirmPassword) {
      Toast("error", "Confirm password is requied");
    } else if (!info.confirmPassword == info.password) {
      Toast("error", "password must match");
    } else {
      setIsLoader(true);
      const param = new FormData();
      param.append("action", "reset_password");
      param.append("q", id);
      param.append("p", id1);
      param.append("new_password", info.password);
      param.append("confirm_password", info.confirmPassword);
      axios.post(Url + "/ajaxfiles/reset_password.php", param).then((res) => {
        if (res.data.status == "error") {
          Toast("error", res.data.message);
          setIsLoader(false);
        } else {
          setIsLoader(false);
          Toast("success", res.data.message);
          navigate("/login");
        }
      });
    }
  };
  useEffect(() => {
    const param = new FormData();
    param.append("action", "verify_url");
    param.append("q", id);
    param.append("p", id1);
    axios.post(Url + "/ajaxfiles/reset_password.php", param).then((res) => {
      if (res.data.status == "error") {
        navigate("/");
      } else {
      }
    });
  }, []);

  return (
    <div className="loginCard">
      <div className="card1">
        <div className="loginPading">
          <div className="textCenter">
            <img
              src="./image/logo1.png"
              className="m-3"
              style={{ width: "70%" }}
            />{" "}
          </div>
          <div className="text-center">
            <h4 className="mb-1 font-weight-bold ">Reset PassWord</h4>
          </div>
          <div>
            <div className="my-4">
              <CssTextField
                id="standard-password-input"
                label="Password"
                type="password"
                name="password"
                // autoComplete="current-password"
                variant="standard"
                sx={{ width: "100%" }}
                value={info.password}
                onChange={input1}
              />
            </div>
            <div className="my-4">
              <CssTextField
                id="standard-password-input"
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                // autoComplete="current-password"
                variant="standard"
                sx={{ width: "100%" }}
                value={info.confirmPassword}
                onChange={input1}
              />
            </div>

            <div className="text-center py-4">
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
                <button
                  onClick={onSubmit}
                  className="btn btn-primary loginbutton"
                >
                  Reset Password
                </button>
              )}
              {/* {isLoader == true ? (
                  <ColorButton size="large">
                    <i
                      className="fa fa-refresh fa-spin fa-3x fa-fw"
                      style={{ fontSize: "20px" }}
                    ></i>
                    <span style={{ textTransform: "capitalize" }}>
                      Reset Password
                    </span>
                  </ColorButton>
                ) : (
                  <ColorButton tabindex="0" onClick={onSubmit} size="large">
                    <span style={{ textTransform: "capitalize" }}>
                      Reset Password
                    </span>
                  </ColorButton>
                )} */}
            </div>
            <div className="text-right mt-3">
              <span style={{ color: "color: rgb(124, 120, 120)" }}>
                Back To{" "}
              </span>
              <NavLink to="/login" className="">
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
