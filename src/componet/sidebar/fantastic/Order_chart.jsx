import React from "react";
import "./Order_chart.css";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  InputBase,
  styled,
  MenuItem,
  Select,
  TextField,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { IsApprove, Url } from "../../../global";
import { useNavigate, useParams } from "react-router-dom";

const Order_chart = () => {
  const { id } = useParams();
  const [image, setimage] = useState();
  const navigate = useNavigate();
  const [mainLoader, setMainLoader] = useState(true);
  useEffect(() => {
    fatchimage(id);
  }, []);
  const fatchimage = async (prop) => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("fantastic_id", prop);

    param.append("action", "view_my_participants");
    await axios
      .post(Url + "/ajaxfiles/fantastic_four_offer.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
        } else {
          setMainLoader(false);
          setimage(res.data.data);
        }
      });
  };
  return (
    <>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          {mainLoader == true ? (
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
                    style={{ borderRadius: "10px", padding: "20px" }}
                    className="w-100 mb-5 internal-transfer-form"
                  >
                    <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                      <Grid container>
                        <Grid item md={6}>
                          <h5 className="font-weight-bold mb-0 text-dark">
                            My Participation Tour
                          </h5>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="flex">
                      <div className=" ">
                        <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                          <Grid container>
                            <Grid item md={12}>
                              <div className="bordeer d-flex">
                                <div className="order-chartHeder">
                                  <img
                                    className="image4"
                                    src={image?.offer_image[0]}
                                  />

                                  <span className="manue">
                                    Explore {image?.country_name} with Package
                                  </span>
                                </div>
                                <div className="order-chartHeder1">
                                  <span className="menue2">
                                    {image?.winner_announce_datetime}
                                  </span>
                                </div>
                              </div>
                            </Grid>
                          </Grid>
                        </div>

                        <div className="card-header d-flex align-items-center justify-content-between card-header-alt  pt-1">
                          <Grid container>
                            <Grid item md={12}>
                              <div className="bordeer2 d-flex ">
                                <img
                                  className="image5"
                                  src="./image/Gradient-Trophy-IconG16watermarked2k-transformed.png"
                                />

                                <span className="manue3 ">
                                  {image?.is_winner_announce == 0 ? (
                                    <>
                                      Winner announce at <br />{" "}
                                      {image?.winning_date}
                                    </>
                                  ) : image?.is_winner_announce == 1 &&
                                    image?.is_winner == 0 ? (
                                    <>
                                      Winner announce at <br />{" "}
                                      {image?.winning_date}
                                    </>
                                  ) : image?.is_winner_announce == 1 &&
                                    image?.is_winner == 1 ? (
                                    <>
                                      Winner announce at <br />{" "}
                                      {image?.winning_date}
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </span>
                                <img
                                  className="image6"
                                  src="./image/Gold-BalloonsG03watermarked2k-transformed.png"
                                />
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                      <div>
                        <div className="second_box  ">
                          <div className="text-center back">
                            <span className="">Fantastic Four</span>
                          </div>
                          <table class="table">
                            <tr>
                              <td>Total Participants : </td>
                              <td>{image?.participants}</td>
                            </tr>
                            <tr>
                              <td>Total Domestic Tour : </td>
                              <td>{image?.domestic_count}</td>
                            </tr>
                            <tr>
                              <td>Total International Tour : </td>
                              <td>{image?.international_count}</td>
                            </tr>
                          </table>
                        </div>
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

export default Order_chart;
