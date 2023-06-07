import React from "react";
import { Grid, Paper } from "@mui/material";
import TopButton from "../../customComponet/TopButton";
import { ColorButton } from "../../customComponet/CustomElement";
const Android = () => {
  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item sm={11}></Grid>
              <Grid item xl={1}></Grid>
              <Grid item xl={10} md={12} lg={12}>
                {/* <TopButton /> */}

                <Grid container spacing={6}>
                  <Grid item md={12}>
                    <h4 className="font-weight-bold mb-3">
                      Platforms Download
                    </h4>

                    <Paper
                      elevation={1}
                      style={{ borderRadius: "10px" }}
                      className="w-100  platforms"
                    >
                      <div className="card-body position-relative">
                        <div className="ribbon">
                          <img
                            src="./image/Ribbons.png"
                            style={{ width: "30vw", maxWidth: "220px" }}
                          />
                        </div>
                        <Grid container spacing={3}>
                          <Grid className="text-center" md={12}>
                            <div>
                              <h3 className="text-dark font-weight-bold pt-3">
                                MT5 PLATFORM
                              </h3>
                              <h4 className="text-info font-weight-bold pt-3 d-flex align-items-center justify-content-center">
                                Android MOBILE TRADING
                              </h4>
                              <p className="text-dark pt-3 mx-500 mx-auto">
                                MT5 Platform is available on Android device, for
                                traders who want access to Mobile Trading.
                                <br />
                                <br />
                                Please click on the button for the mobile
                                platform you require.
                              </p>
                              <p className="p-4">
                                <img
                                  src="./image/screens.png"
                                  className="w-100"
                                />
                              </p>
                              <div className="text-info font-weight-bold pt-3 pb-5 d-flex align-items-center justify-content-center">
                                <a
                                  href="https://download.mql5.com/cdn/mobile/mt5/android?server=RightGroup-Live"
                                  target="_blank"
                                >
                                  <img
                                    src="./image/androidStore.png"
                                    className="image-responsive"
                                  />
                                </a>
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Android;
