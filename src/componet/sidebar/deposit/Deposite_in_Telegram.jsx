import React from "react";
import { Paper, Grid } from "@mui/material";
import "./Deposite_in_Progress.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BorderTop } from "@mui/icons-material";
import { ColorButton } from "../../customComponet/CustomElement";
import { useEffect } from "react";
import axios from "axios";
import { IsApprove, Url } from "../../../global";

import { useState } from "react";
import Toast from "../../commonComponet/Toast";
const Deposite_in_Telegram = () => {
  const { id } = useParams();
  const [telData, setTelData] = useState({
    data: "",
    mainLoder: true,
  });
  const navigate = useNavigate();
  useEffect(() => {
    getTelegram();
  }, []);

  const getTelegram = (type) => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("deposit_id", id);

    // param.append("action", "get_mt5_ac_list");
    axios.post(Url + "/ajaxfiles/view_deposit.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        navigate("/");
      }
      if (res.data.status == "error") {
        navigate("/deposit");
      } else {
        telData.mainLoder = false;
        telData.data = res.data?.data;
        setTelData({ ...telData });
        // toast.error(res.data.message);
      }
    });
  };
  return (
    <>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          {telData.mainLoder == true ? (
            <div className="loader1">
              <span className="loader2"></span>
            </div>
          ) : (
            <div style={{ opacity: 1 }}>
              <Grid container>
                <Grid item sm={11}></Grid>
                <Grid item xl={1}></Grid>
                <Grid item xl={10} md={12} lg={12}>
                  <Paper
                    elevation={1}
                    style={{
                      borderRadius: "10px",
                      margin: "10px",
                      borderTop: "5px solid #5D2067",
                    }}
                    className="w-100 mb-5 internal-transfer-form"
                  >
                    <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                      <Grid containeSelect Bonus Amountr>
                        <Grid item md={12}>
                          <h5 className="font-weight-bold mb-0 text-dark">
                            Deposit in progress{" "}
                            <AccessTimeIcon style={{ marginLeft: "5px" }} />
                          </h5>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="pading">
                      <span className="val1">Sent :</span>
                      <span className=" val2">{telData.data?.amount}</span>
                    </div>
                    <div className="divider"></div>
                    <div className="pading">
                      <span className="val1">Plateform :</span>
                      <span className=" val3">
                        {" "}
                        {telData.data?.deposit_to == "wallet"
                          ? "RightFx"
                          : "Meta Trader 5"}
                      </span>
                      {telData.data?.deposit_to == "wallet" ? (
                        ""
                      ) : (
                        <>
                          {" "}
                          <br />
                          <span className="val1">Account No : </span>
                          <span className=" val4">
                            {telData.data?.mt5_acc_no}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="divider"></div>
                    <div className="pading">
                      <div className="d-flex justify-content-between mr-5">
                        <div className="val1 bold ">
                          Our partner reviews your requests Monday through
                          Saturday from 11 a.m. to 8 p.m. IST (UTC +5:30).
                        </div>
                        <span>
                          <ErrorOutlineIcon />
                        </span>
                      </div>
                      <div className="val1 pt-2">
                        Copy request ID and send it to our partner in the
                        Telegram chat.
                      </div>
                    </div>
                    <div>
                      <div className="text-center">
                        <img
                          src={telData.data?.qrcode_url}
                          className="telImage"
                        />
                      </div>
                      <div className="telReqhed">
                        <span>Request ID:</span>
                        <div className="telReqHedCopy">
                          {telData.data?.deposit_refrence_no}
                          <button
                            className="copy_link"
                            onClick={(e) => {
                              navigator.clipboard.writeText(
                                telData.data?.deposit_refrence_no
                              );
                              Toast("success", "Copied Successfully");
                            }}
                          >
                            <span className="blinking">
                              <i className="material-icons">content_copy</i>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="divider"></div>
                    <div
                      className=" text-right pading"
                      style={{ padding: "20px 15px" }}
                    >
                      {" "}
                      <a href={telData.data?.telegram_url} target="_blank">
                        <ColorButton
                          style={{ borderRadius: "50px" }}
                          variant="contained"
                          size="large"
                          // component={Link}
                          // to="https://t.me/rightfx_bot"
                          // disableElevation
                        >
                          <b>Join Telegram Bot</b>
                        </ColorButton>
                      </a>
                    </div>
                    <div className="pb-3">
                      <h5 className="val1 bold pading ">
                        Four Ways to starting trading
                      </h5>
                      <div className="val1  pt-1">
                        <span className="mr-3">1.</span>
                        <b>
                          <a
                            href="https://download.metatrader.com/cdn/mobile/mt5/android?server=RightGroup-Live"
                            target="_blank"
                          >
                            {" "}
                            Download
                          </a>
                        </b>{" "}
                        the RightFX Trading App
                      </div>
                      <div className="val1 pt-1">
                        <span className="mr-3">2.</span>
                        <b>
                          <a
                            href="https://download.metatrader.com/cdn/mobile/mt5/ios?server=RightGroup-Live"
                            target="_blank"
                          >
                            {" "}
                            Download
                          </a>
                        </b>{" "}
                        the Meta Trader 5 forex Trading App
                      </div>
                      <div className="val1  pt-1">
                        <span className="mr-3">3.</span>
                        <b>
                          <a
                            href="https://download.metatrader.com/cdn/web/right.group.financial/mt5/rightgroup5setup.exe"
                            target="_blank"
                          >
                            {" "}
                            Download
                          </a>
                        </b>{" "}
                        the Platform for your Desktop
                      </div>
                      <div className="val1  pt-1 ">
                        <span className="mr-3">4.</span>
                        <b
                          onClick={() => {
                            navigate("/Web_Trader");
                          }}
                        >
                          {" "}
                          Log in
                        </b>{" "}
                        to the MetaTrader 5 web platform
                      </div>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Deposite_in_Telegram;
