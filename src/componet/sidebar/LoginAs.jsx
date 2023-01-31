import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Toast from "../commonComponet/Toast";

import axios from "axios";
import { Url } from "../../global";

const LoginAs = (prop) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getUserLoginToken = () => {
    const param = new FormData();
    // param.append('is_app', 1);
    // param.append('AADMIN_LOGIN_ID', 1);
    // param.append('action', "login_as_user");
    param.append("login_token", id);

    axios.post(Url + "/ajaxfiles/login_as_admin.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      if (res.data.status == "error") {
        Toast("error", res.data.message);
      } else {
        localStorage.clear();
        localStorage.setItem("login", false);
        localStorage.setItem("user_id", res.data.user_data.user_id);
        localStorage.setItem("auth_key", res.data.user_data.auth_key);
        localStorage.setItem("wallet_code", res.data.user_data.wallet_code);
        localStorage.setItem("is_pamm", res.data.user_data.is_pamm);
        localStorage.setItem("is_ib_account", res.data.user_data.is_ib_account);
        localStorage.setItem("mt5_acc_no", res.data.user_data.mt5_acc_no);
        localStorage.setItem("setModel", true);
        prop.setLogin("false");
        navigate("/dashboard");
      }
    });
  };

  useEffect(() => {
    getUserLoginToken();
  }, []);

  return <div></div>;
};

export default LoginAs;
