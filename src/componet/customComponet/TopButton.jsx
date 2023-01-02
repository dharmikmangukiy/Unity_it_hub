import React, { useEffect, useState } from "react";
import { ColorButton } from "./CustomElement";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { IsApprove, Url } from "../../global";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GreenButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#ff0000"),
  backgroundColor: "#39b54a",
  textTransform: "initial",
  fontSize: "14px",
  padding: "10px 22px",
  "&:hover": {
    backgroundColor: "#339c41",
  },
}));
const TopButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  var [isloader, setIsLoader] = useState(false);
  var isPamm = localStorage.getItem("is_pamm");

  toast.configure();

  const requestPamm = async () => {
    setIsLoader(true);
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    await axios
      .post(`${Url}/ajaxfiles/pamm/request_pamm_investor.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        setIsLoader(false);
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      });
  };

  return (
    <div className="" style={{ marginBottom: "40px" }}>
      <Box sx={{ "& button": { m: 0.9 } }} className="topButtons">
        <ColorButton
          variant="contained"
          size="large"
          className="download_platform_btn"
          onClick={() => navigate("/Platforms/desktop")}
        >
          {t("Download_Platform")}
        </ColorButton>
        <ColorButton
          variant="contained"
          size="large"
          onClick={() => navigate("/Web_Trader")}
        >
          {t("Web_Trader")}
        </ColorButton>
        <GreenButton
          variant="contained"
          size="large"
          onClick={() => navigate("/deposit")}
        >
          {t("Deposit")}
        </GreenButton>
      </Box>
    </div>
  );
};

export default TopButton;
