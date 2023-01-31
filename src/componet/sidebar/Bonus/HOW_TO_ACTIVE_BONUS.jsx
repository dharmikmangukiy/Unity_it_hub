import React from "react";
import { Grid, Paper } from "@mui/material";
import { useState } from "react";
import "./BonusDeshboard.css";
import { useEffect } from "react";

function HOW_TO_ACTIVE_BONUS() {
  const [mainLoader, setMainLoader] = useState(false);
  // const [close, setclose] = useState(true);
  // const closepop = () => {
  //   setclose(false);
  // };

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
                    <Grid item md={12} className="How_style">
                      <h2 className="ul-h1-style">HOW TO ACTIVE BONUS ?</h2>
                      <ul className="ul-style">
                        <li>
                          Make any deposit (the bonus will scale on its amount).
                        </li>
                        <li>Tap Bonuses on the main screen of the app.</li>
                        <li>
                          Choose the bonus amount-10%, 30%, or 50% of the
                          deposit.
                        </li>
                        <li>
                          Then activate the bonus, and you can enjoy higher
                          trading power right away!
                        </li>
                        <li>
                          Instantly increases your free margin and your
                          potential profits.
                        </li>
                        <li>
                          Becomes an integral part of your balance, ready to be
                          reinvested or withdrawn after trading a certain
                          volume.
                        </li>
                      </ul>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </div>
      {/* {close == true ? (
        <div className="popmain">
          <div className="popmain1">
            <div style={{ color: "#ff0505" }} className="d-flex">
              <div>ATTENTION</div>
              <div className="popicon">
                <i class="material-icons md-48" onClick={closepop}>
                  close
                </i>
              </div>
            </div>
            <div>RIGHTFX DOES NOT OFFER ANY GREY LABEL SERVICE.</div>
            <div>
              BE AWARE OF IMPOSTERS OFFERING SUCH SERVICE IN THE NAME OF RIGHTFX
            </div>
          </div>
        </div>
      ) : (
        ""
      )} */}
    </>
  );
}

export default HOW_TO_ACTIVE_BONUS;
