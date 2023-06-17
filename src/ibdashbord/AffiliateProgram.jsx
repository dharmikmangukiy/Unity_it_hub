import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import "./Affiliate.css";
import Brightness1Icon from "@mui/icons-material/Brightness1";
const AffiliateProgram = () => {
  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <Grid item md={12} className="trading-accounts-wrapper">
            <Paper
              elevation={1}
              style={{ borderRadius: "10px" }}
              className="trading-accounts-container "
            >
              <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                <div>
                  <h5 className="font-weight-bold mb-0 text-dark">
                    Affiliate Program
                  </h5>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <div className="Primary_box">
                  Each Client (Kyc Complated): $0.25
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center tablepading">
                <table className="table table-hover ">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="back_color_th radious_border_left"
                      >
                        Active Client
                      </th>
                      <th
                        scope="col"
                        className="back_color_th radious_border_right"
                      >
                        Commission
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1 to 5 Client</th>
                      <td>0.5% of Deposite</td>
                    </tr>
                    <tr>
                      <th scope="row">6 to 15 Client</th>
                      <td>1% of Deposite</td>
                    </tr>
                    <tr>
                      <th className="radious_border_right_bt" scope="row">
                        16 to 25 Client
                      </th>
                      <td className="radious_border_right_bt2">
                        1.5% of Deposite
                      </td>
                    </tr>
                    <tr>
                      <th className="radious_border_right_bt" scope="row">
                        More than 25 Client
                      </th>
                      <td className="radious_border_right_bt2">
                        2% of Deposite
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mx-5 uppercase_text ">
                <ul className="line_height">
                  <li>
                    {" "}
                    <Brightness1Icon className="color_dots" /> after 100 signup,
                    minimum 20% Active Clients require otherwise, your afiliate
                    program will be terminated
                  </li>
                  <li>
                    {" "}
                    <Brightness1Icon className="color_dots" /> commision on
                    deposite will be one time payment only
                  </li>
                  <li>
                    {" "}
                    <Brightness1Icon className="color_dots" /> defination of
                    "Active clients" is mimnimum $100 Deposite and at least 5
                    lots tarded in live account
                  </li>
                  <li>
                    {" "}
                    <Brightness1Icon className="color_dots" /> RightFX has all
                    rights to terminate this program if any obusive practice
                    fount
                  </li>
                </ul>
              </div>
            </Paper>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default AffiliateProgram;
