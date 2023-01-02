import {
  CardContent,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  BootstrapInput,
  ColorButton,
} from "../../customComponet/CustomElement";
import TopButton from "../../customComponet/TopButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IsApprove, Url } from "../../../global";
import Chart from "react-apexcharts";

const PammDashboard = () => {
  const navigate = useNavigate();
  var [data, setData] = useState({});
  const [mainLoader, setMainLoader] = useState(true);
  const [year, setYear] = useState("");
  const [isLoderButton, setIsLoaderButton] = useState(false);
  const [prefrence, setPrefrence] = useState({});
  var [dailySalesOptions, setdailySalesOptions] = useState({
    series: [
      {
        name: "P&L",
        data: [],
      },
    ],
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#3d9730"],
    stroke: {
      curve: "smooth",
    },

    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [],
    },
  });
  var [chartvalue, setchartvalue] = useState({
    options: {
      series: [44, 55, 41],
      labels: ["My Balance", "Total Investment", "Total Withdrawal"],
    },
  });
  const changeYear = (prop) => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("filter_profit_years", prop);
    setIsLoaderButton(true);

    axios.post(Url + "/ajaxfiles/pamm/dashboard.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        dailySalesOptions.series[0].data = res.data.get_monthly_pnl_data.y;
        dailySalesOptions.xaxis.categories = res.data.get_monthly_pnl_data.x;
        setdailySalesOptions({ ...dailySalesOptions });
        setIsLoaderButton(false);
      }
    });
  };
  const getDashboard = async () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    axios.post(Url + "/ajaxfiles/pamm/dashboard.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        var lab = [res.data.my_balance];
        var ser = ["Wallet Balance"];
        data = res.data;
        setData({ ...data });
        chartvalue.options.series = lab.concat(res.data.pamm_investment.y);
        chartvalue.options.labels = ser.concat(res.data.pamm_investment.x);
        setchartvalue({ ...chartvalue });
        setPrefrence(res.data);
        dailySalesOptions.series[0].data = res.data.get_monthly_pnl_data.y;
        dailySalesOptions.xaxis.categories = res.data.get_monthly_pnl_data.x;
        setdailySalesOptions({ ...dailySalesOptions });
        setYear(res.data.current_year);
        setMainLoader(false);
      }
    });
  };
  console.log("chartvalue", chartvalue);
  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          {mainLoader == true ? (
            <div className="loader1">
              <div className="clock">
                <div className="pointers"></div>
              </div>
            </div>
          ) : (
            <div style={{ opacity: 1 }}>
              <Grid container>
                <Grid item sm={12}></Grid>
                <Grid item xl={1}></Grid>
                <Grid item xl={10} md={12} lg={12}>
                  <TopButton />
                  <h4 className="font-weight-bold mb-3">Pamm Dashboard</h4>

                  <Grid container spacing={6}>
                    <Grid item md={6}>
                      <div className="row1 boxSection">
                        <div className="card padding-9 animate fadeLeft boxsize">
                          <div className="row">
                            <div className="col s12 m12 text-align-center">
                              <h5 className="mb-0">${data.my_balance}</h5>
                              <p className="no-margin font-weight-700 text-uppercase">
                                Wallet Balance
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="card padding-9 animate fadeLeft boxsize">
                          <div className="row">
                            <div className="col s12 m12 text-align-center">
                              <h5 className="mb-0">${data.total_investment}</h5>
                              <p className="no-margin font-weight-700 text-uppercase">
                                Total Investment
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="card padding-9 animate fadeLeft boxsize">
                          <div className="row">
                            <div className="col s12 m12 text-align-center">
                              <h5 className="mb-0">${data.total_withdrawal}</h5>
                              <p className="no-margin font-weight-700 text-uppercase">
                                Total Withdrawal
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="card padding-9 animate fadeLeft boxsize">
                          <div className="row">
                            <div className="col s12 m12 text-align-center">
                              <h5 className="mb-0">${data.total_pnl}</h5>
                              <p className="no-margin font-weight-700 text-uppercase">
                                Total P&L
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="card padding-9 animate fadeLeft boxsize">
                          <div className="row">
                            <div className="col s12 m12 text-align-center">
                              <h5 className="mb-0">${data.current_value}</h5>
                              <p className="no-margin font-weight-700 text-uppercase">
                                Current Value
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={6}>
                      <Paper
                        elevation={2}
                        style={{ borderRadius: "10px", height: "100%" }}
                        className="w-100"
                      >
                        <CardContent className="py-3">
                          <div>
                            <Grid container spacing={2}>
                              <Grid item md={12} lg={12} xl={12}>
                                <div className="remainderContentSection">
                                  <Chart
                                    options={chartvalue.options}
                                    series={chartvalue.options.series}
                                    // type="area"
                                    // type="donut"
                                    height="300px"
                                    type="pie"
                                  />
                                </div>
                              </Grid>
                            </Grid>
                          </div>
                        </CardContent>
                      </Paper>
                    </Grid>
                  </Grid>
                  <Grid container spacing={6} sx={{ marginTop: "10px" }}>
                    <Grid item md={12}>
                      <Paper
                        elevation={2}
                        style={{ borderRadius: "10px", height: "100%" }}
                        className="w-100"
                      >
                        <CardContent className="py-3">
                          <div
                            className="section-header"
                            style={{ marginBottom: "15px" }}
                          >
                            <p className="profitANDLOSS">
                              Profit And Loss Chart
                            </p>

                            <FormControl fullWidth={true}>
                              <label className="small font-weight-bold text-dark">
                                Years
                              </label>
                              <Select
                                value={year}
                                onChange={(e) => {
                                  console.log("e.target.value", e.target.value);
                                  setYear(e.target.value);
                                  changeYear(e.target.value);
                                }}
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                                input={<BootstrapInput />}
                              >
                                {prefrence.filter_profit_years.map(
                                  (item, index) => {
                                    return (
                                      <MenuItem value={item}>{item}</MenuItem>
                                    );
                                  }
                                )}
                              </Select>
                            </FormControl>
                          </div>
                          <Grid
                            container
                            spacing={2}
                            sx={{ marginTop: "21px" }}
                          >
                            <Grid item md={12} lg={12} xl={12}>
                              <div className="remainderContentSection">
                                {isLoderButton ? (
                                  <div className="loderforChart">
                                    <svg class="spinner" viewBox="0 0 50 50">
                                      <circle
                                        class="path"
                                        cx="25"
                                        cy="25"
                                        r="20"
                                        fill="none"
                                        strokeWidth="5"
                                      ></circle>
                                    </svg>
                                  </div>
                                ) : (
                                  <Chart
                                    options={dailySalesOptions}
                                    series={dailySalesOptions.series}
                                    type="line"
                                    height="300px"
                                  />
                                )}
                              </div>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PammDashboard;
