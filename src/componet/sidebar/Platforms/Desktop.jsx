import React from "react";
import { Grid, Paper } from "@mui/material";
import TopButton from "../../customComponet/TopButton";
import { ColorButton } from "../../customComponet/CustomElement";
const Desktop = () => {
  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item sm={12}></Grid>
              <Grid item xl={1}></Grid>
              <Grid item xl={10} md={12} lg={12}>
                <TopButton />

                <Grid container spacing={6}>
                  <Grid item md={12}>
                    <h4 className="font-weight-bold mb-3">
                      Platforms Download
                    </h4>
                    <Paper
                      elevation={1}
                      style={{ borderRadius: "10px" }}
                      className="w-100 mb-5 platforms"
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
                                MT5 PLATFORMS
                              </h3>
                              <h4 className="text-info font-weight-bold pt-3 d-flex align-items-center justify-content-center">
                                WINDOWS DESKTOP
                                <img
                                  src="./image/WindowsLogo.png"
                                  className="mx-3"
                                  style={{ width: "35px" }}
                                />
                              </h4>
                              <p className="text-dark pt-3 mx-500 mx-auto">
                                MT5 is one of the most popular trading platforms
                                in the world With Right Fx you can get more,
                                from valuable research tools to expert support
                                <br />
                                <br />
                                Please click on the link below to download the
                                Right Fx MT5 Prime Platform
                              </p>
                              <p className="p-4" >
                                <img
                                  src="./image/Laptop.png"
                                  className="w-100"
                                />
                              </p>
                              <div className="pb-5">
                                <a href="https://download.mql5.com/cdn/web/right.group.financial/mt5/rightgroup5setup.exe" target="_blank">
                                  <ColorButton style={{ borderRadius: "50px" }}>
                                    DOWNLOAD MT5 PLATFORM
                                  </ColorButton>
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

export default Desktop;
