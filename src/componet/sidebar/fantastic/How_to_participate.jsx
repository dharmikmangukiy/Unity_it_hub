import React from "react";
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
import "./How_to_participate.css";
const How_to_participate = () => {
  return (
    <>
      <div>
        <div className="app-content--inner">
          <div className="app-content--inner__wrapper mh-100-vh">
            <div style={{ opacity: 1 }}>
              <Grid container>
                <Grid item sm={12}></Grid>
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
                          <h5 className="font-weight-bold mb-0 ">
                            HOW TO PARTICIPATE ?
                          </h5>
                        </Grid>
                      </Grid>
                    </div>
                    <ul className="dot">
                      <li>
                        Prize lots are bonus points that you get after trading
                        on your real accounts.
                      </li>
                      <li>
                        Prize lots are bonus points that you get after trading
                        on your real accounts.
                      </li>
                      <li>
                        Prize lots are bonus points that you get after trading
                        on your real accounts.
                      </li>
                      <li>
                        Prize lots are bonus points that you get after trading
                        on your real accounts.
                      </li>
                      <li>
                        Prize lots are bonus points that you get after trading
                        on your real accounts.
                      </li>
                      <li>
                        Prize lots are bonus points that you get after trading
                        on your real accounts.
                      </li>
                    </ul>

                    <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                      <Grid container>
                        <Grid item md={6}>
                          <h5 className="font-weight-bold mb-0 ">
                            Terms & Conditions
                          </h5>
                        </Grid>
                      </Grid>
                    </div>
                    <ul className="dot">
                      <li>
                        Prize lots are bonus points that you get after trading
                        on your real accounts.
                      </li>
                      <li>
                        Prize lots are bonus points that you get after trading
                        on your real accounts.
                      </li>
                    </ul>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default How_to_participate;
