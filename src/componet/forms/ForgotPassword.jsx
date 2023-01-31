import React, { useState } from "react";
import logo1 from "../sidebar/loginLogo.png";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { Url } from "../../global.js";
import axios from "axios";
import Toast from "../commonComponet/Toast";
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
  const [data, setData] = useState();
  const [isLoader, setIsLoader] = useState(false);
  const navigate = useNavigate();

  const onSumbit = () => {
    if (!data) {
      Toast("error", "Email is requied");
      return false;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data)) {
      Toast("error", "Email format is invaild");
    } else {
      setIsLoader(true);
      const param = new FormData();
      param.append("user_email", data);
      axios.post(Url + "/ajaxfiles/forgot_password.php", param).then((res) => {
        if (res.data.status == "error") {
          Toast("error", res.data.message);
          setIsLoader(false);
        } else {
          Toast("success", res.data.message);
          setIsLoader(false);
          navigate("/login");
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
              <p className="font-size-lg mb-0 ">
                Fill in your email to reset password.
              </p>
            </div>
            <div>
              <div className="my-4">
                <CssTextField
                  id="standard-search"
                  label="Email address"
                  onChange={(e) => setData(e.target.value)}
                  sx={{ width: "100%" }}
                  variant="standard"
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
                    onClick={onSumbit}
                    className="btn btn-primary loginbutton"
                  >
                    Reset Password
                  </button>
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
