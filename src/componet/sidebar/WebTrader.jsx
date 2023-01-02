import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import TopButton from "../customComponet/TopButton";

const WebTrader = () => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://trade.mql5.com/trade/widget.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://rightfx.alphapixclients.com/dimage/webtrader.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item sm={12}></Grid>
              <Grid item xl={1}>
                {" "}
              </Grid>
              <Grid item xl={10} md={12} lg={12}>
                <TopButton />
                <div
                  id="webterminal"
                  style={{ width: "100%", height: "600px" }}
                ></div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebTrader;
