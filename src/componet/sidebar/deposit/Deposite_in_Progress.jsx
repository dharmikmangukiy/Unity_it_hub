import React from "react";
import { Paper, Grid } from "@mui/material";
import "./Deposite_in_Progress.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BorderTop } from "@mui/icons-material";
import { ColorButton } from "../../customComponet/CustomElement";

const Deposit_in_Progress = () => {
  const { id, id1 } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
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
                    <span className=" val2">$ {id}</span>
                  </div>
                  <div className="divider"></div>
                  <div className="pading">
                    <span className="val1">Plateform :</span>
                    <span className=" val3">
                      {" "}
                      {id1 == "wallte" ? "RightFx" : "Meta Trader 5"}
                    </span>
                    {id1 == "wallte" ? (
                      ""
                    ) : (
                      <>
                        {" "}
                        <br />
                        <span className="val1">Account No :</span>
                        <span className=" val4">{id1}</span>
                      </>
                    )}
                  </div>
                  <div className="divider"></div>
                  <div className="pading">
                    <div className="d-flex justify-content-between mr-5">
                      <div className="val1 bold ">
                        The payment service processes your Deposit.{" "}
                      </div>
                      <span>
                        <ErrorOutlineIcon />
                      </span>
                    </div>
                    <div className="val1 pt-2">
                      if everything is all right, you'll recived a notification
                      and email we will <br /> also make a record in your{" "}
                      <b>Deposit History</b>{" "}
                    </div>
                  </div>
                  <div className="divider"></div>
                  <div className=" text-center pading">
                    {" "}
                    <ColorButton
                      style={{ borderRadius: "50px" }}
                      variant="contained"
                      size="large"
                      component={Link}
                      to="/deposit_history"
                      disableElevation
                    >
                      <b> View Deposit History</b>
                    </ColorButton>
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
        </div>
      </div>
    </>
  );
};

export default Deposit_in_Progress;
