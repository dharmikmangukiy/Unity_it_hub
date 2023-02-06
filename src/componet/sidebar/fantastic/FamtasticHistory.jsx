import { Grid, Paper } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IsApprove, Url } from "../../../global";
import NewDate from "../../commonComponet/NewDate";
import { ColorButton } from "../../customComponet/CustomElement";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const FamtasticHistory = () => {
  const [orderList, setOrderList] = useState([]);
  const navigate = useNavigate();

  const fetchOrder = async () => {
    try {
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      param.append("action", "claimed_history");
      //   mainLoader.order = true;
      //   setMainLoader({ ...mainLoader });
      let data = await axios.post(
        `${Url}/ajaxfiles/fantastic_four_offer.php`,
        param
      );
      if (data?.status === 200) {
        // mainLoader.order = false;
        // setMainLoader({ ...mainLoader });
        setOrderList(data?.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item sm={11}></Grid>
              <Grid item xl={1}></Grid>
              <Grid item xl={10} md={12} lg={12}></Grid>

              <Paper
                elevation={1}
                style={{ borderRadius: "10px", padding: "20px" }}
                className="w-100 mb-5 internal-transfer-form"
              >
                <ColorButton
                  sx={{
                    padding: "4px 12px !important",
                    marginBottom: "10px",
                  }}
                  onClick={() => {
                    navigate("/Fantastic_tour");
                  }}
                >
                  <ArrowBackIcon sx={{ fontSize: "16px" }} />
                </ColorButton>
                <div className="fan-history-container">
                  <h1 class="fan-history-heading">
                    My Participation Tour’s History
                  </h1>
                  <div
                    className="fan-history-Submain"
                    style={{ padding: "16px 0px" }}
                  >
                    <div></div>
                    <div>Tour name</div>
                    <div>Duration</div>
                    <div>Tour type</div>

                    <div>Eligible lots</div>
                    <div>Winner Status</div>
                  </div>

                  {orderList.map((item, index) => {
                    return (
                      <div className="fan-history-main">
                        <div className="fan-history-Submain">
                          <div>
                            <img class="image4" src={item?.tour_image[0]} />
                          </div>
                          <div>{item?.tour_name}</div>
                          <div>{item?.time_duration}</div>
                          <div>
                            {item?.is_international == 0
                              ? "Domestic"
                              : "International"}
                          </div>
                          <div>{item?.lot_size}</div>
                          <div>
                            {item?.is_winner == 0 &&
                            item?.is_winner_announce == 0 ? (
                              <span className="text-color-yellow">
                                Winner will be announce at{" "}
                                {item?.winner_announce_datetime}
                              </span>
                            ) : item?.is_winner == 0 &&
                              item?.is_winner_announce == 1 ? (
                              <span className="text-color-yellow">
                                {" "}
                                Better luck next time
                              </span>
                            ) : item?.is_winner == 1 &&
                              item?.is_winner_announce == 1 ? (
                              <span className="text-color-green">
                                You are winner
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="fan-Mobhistory-container">
                  <div>
                    <h1 class="fan-history-heading">
                      My Participation Tour’s History
                    </h1>
                    {orderList.map((item, index) => {
                      return (
                        <div className="fanMob-history-main">
                          <div className="fanMob-history-img">
                            <img class="image4" src={item?.tour_image[0]} />
                          </div>
                          <div className="fanMob-history-submain">
                            <div>Tour name</div>
                            <div>
                              <span className="mobsubTextColor">
                                {item?.tour_name}
                              </span>
                            </div>
                          </div>
                          <div className="fanMob-history-submain">
                            <div>Duration</div>
                            <div>
                              <span className="mobsubTextColor">
                                {item?.time_duration}
                              </span>
                            </div>
                          </div>
                          <div className="fanMob-history-submain">
                            <div>Tour type</div>
                            <div>
                              <span className="mobsubTextColor">
                                {item?.is_international == 0
                                  ? "Domestic"
                                  : "International"}
                              </span>
                            </div>
                          </div>
                          <div className="fanMob-history-submain">
                            <div>Eligible lots</div>
                            <div>
                              <span className="mobsubTextColor">
                                {item?.lot_size}
                              </span>
                            </div>
                          </div>
                          <div className="fanMob-history-submain">
                            <div>Winner Status</div>
                            <div>
                              {" "}
                              {item?.is_winner == 0 &&
                              item?.is_winner_announce == 0 ? (
                                <span className="text-color-yellow">
                                  Winner will be announce at{" "}
                                  {item?.winner_announce_datetime}
                                </span>
                              ) : item?.is_winner == 0 &&
                                item?.is_winner_announce == 1 ? (
                                <span className="text-color-yellow">
                                  {" "}
                                  Better luck next time
                                </span>
                              ) : item?.is_winner == 1 &&
                                item?.is_winner_announce == 1 ? (
                                <span className="text-color-green">
                                  You are winner
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Paper>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamtasticHistory;
