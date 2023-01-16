import { FormControl, Grid, Paper } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IsApprove, Url } from "../global";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const IBDashboard = (prop) => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    data: "",
    link: "",
  });
  const getDashboardData = async () => {
    const param = new FormData();
    // setMainLoader(true);
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    await axios
      .post(`${Url}/ajaxfiles/get_dashboard.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          prop.setLogin("true");
          navigate("/");
        }
        if (res.data.ibData) {
          console.log(res.data.ibData);
          info.data = res.data.ibData;
          info.link = res.data.wallet_code;
          setInfo({ ...info });
        }
      });
  };
  useEffect(() => {
    getDashboardData();
  }, []);
  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item sm={11}></Grid>
              <Grid item xl={1}></Grid>
              <Grid item xl={10} md={12} lg={12}>
                <div>
                  <Grid container sx={{ justifyContent: "center" }}>
                    <Grid item md={12}>
                      <div className="row1 boxSection">
                        <div className="card padding-9 animate fadeLeft boxsize">
                          <div className="row">
                            <div className="col s12 m12 text-align-center">
                              <h5 className="mb-0">{info.data.total_client}</h5>
                              <p className="no-margin font-weight-700 text-uppercase">
                                total client
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="card padding-9 animate fadeLeft boxsize">
                          <div className="row">
                            <div className="col s12 m12 text-align-center">
                              <h5 className="mb-0">
                                {info.data.total_deposit}
                              </h5>
                              <p className="no-margin font-weight-700 text-uppercase">
                                total deposit
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="card padding-9 animate fadeLeft boxsize">
                          <div className="row">
                            <div className="col s12 m12 text-align-center">
                              <h5 className="mb-0">{info.data.total_lot}</h5>
                              <p className="no-margin font-weight-700 text-uppercase">
                                total lot
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="card padding-9 animate fadeLeft boxsize">
                          <div className="row">
                            <div className="col s12 m12 text-align-center">
                              <h5 className="mb-0">{info.data.total_rebate}</h5>
                              <p className="no-margin font-weight-700 text-uppercase">
                                total rebate
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="card padding-9 animate fadeLeft boxsize">
                          <div className="row">
                            <div className="col s12 m12 text-align-center">
                              <h5 className="mb-0">
                                {info.data.total_rebate_availabel}
                              </h5>
                              <p className="no-margin font-weight-700 text-uppercase">
                                rebate availabel
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="card padding-9 animate fadeLeft boxsize">
                          <div className="row">
                            <div className="col s12 m12 text-align-center">
                              <h5 className="mb-0">
                                {info.data.total_rebate_withdraw}
                              </h5>
                              <p className="no-margin font-weight-700 text-uppercase">
                                rebate withdraw
                              </p>
                            </div>
                          </div>
                        </div>{" "}
                        <div className="card padding-9 animate fadeLeft boxsize">
                          <div className="row">
                            <div className="col s12 m12 text-align-center">
                              <h5 className="mb-0">{info.data.total_subib}</h5>
                              <p className="no-margin font-weight-700 text-uppercase">
                                total subib
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Paper
                        elevation={1}
                        style={{ borderRadius: "10px" }}
                        className="w-100 mb-5"
                      >
                        <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                          <h5 className="font-weight-bold mb-0 text-dark">
                            My Reference Links
                          </h5>
                        </div>
                        <div className="divider"></div>
                        <div className="card-body position-relative">
                          <Grid
                            container
                            spacing={3}
                            style={{
                              marginLeft: "-12px",
                              marginRight: "-12px",
                            }}
                          >
                            <Grid item md={8}>
                              <FormControl>
                                <label className="text-dark font-weight-bold form-label-head w-100">
                                  IB Link
                                </label>
                                <div className="sponsorlink-content-section">
                                  <label className="text-info font-weight-bold w-100">
                                    <a>
                                      {Url + `/register/sponsor/${info.link}`}
                                    </a>
                                  </label>
                                  <button
                                    className="copy_link"
                                    onClick={(e) => {
                                      navigator.clipboard
                                        .writeText(
                                          Url + `/register/sponsor/${info.link}`
                                        )
                                        .then(
                                          function () {
                                            console.log(
                                              "Async: Copying to clipboard was successful!"
                                            );
                                            toast.success(
                                              "The IB link has been successfully copying"
                                            );
                                          },
                                          function (err) {
                                            console.error(
                                              "Async: Could not copy text: ",
                                              err
                                            );
                                            toast.error(
                                              "The IB link Could not copy, Please try again"
                                            );
                                          }
                                        );
                                    }}
                                  >
                                    <span className="blinking">
                                      <i className="material-icons">
                                        content_copy
                                      </i>
                                    </span>
                                  </button>
                                </div>
                              </FormControl>
                            </Grid>
                            <Grid item md={4}>
                              <FormControl>
                                <label className="text-dark font-weight-bold form-label-head w-100">
                                  Referral Cilck
                                </label>
                                <div className="sponsorlink-content-section">
                                  <label className="text-info font-weight-bold w-100">
                                    {info.data.total_reffral_click}
                                  </label>
                                </div>
                              </FormControl>
                            </Grid>
                            {/* <hr className="mt-2.5 mb-1"></hr>
                          <Grid item md={12}>
                            <FormControl>
                              <label className="text-dark font-weight-bold form-label-head w-100">
                                Sales Manager Link
                              </label>
                              <label className="text-info font-weight-bold w-100">
                              <a>{Url+'?salesmanagerId=272727'}</a>
                              </label>
                            </FormControl>
                          </Grid> */}
                          </Grid>
                        </div>
                      </Paper>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IBDashboard;
