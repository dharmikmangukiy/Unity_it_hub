import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import WindowIcon from "@mui/icons-material/Window";
import AppleIcon from "@mui/icons-material/Apple";
import LanguageIcon from "@mui/icons-material/Language";
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTheme } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import DownloadIcon from "@mui/icons-material/Download";
import { useTranslation } from "react-i18next";
import ProgresBar from "../customComponet/ProgresBar";
import { BootstrapInput, ColorButton } from "../customComponet/CustomElement";
import TopButton from "../customComponet/TopButton";
import CloseIcon from "@mui/icons-material/Close";
import AndroidIcon from "@mui/icons-material/Android";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { IsApprove, Url } from "../../global.js";
import OpenDemoModel from "../customComponet/OpenDemoModel";
import { useNavigate } from "react-router-dom";

import { DialogContent, DialogTitle } from "@mui/material";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import MobileStepper from "@mui/material/MobileStepper";
import SettingsIcon from "@mui/icons-material/Settings";
import InputLabel from "@mui/material/InputLabel";
import { NavLink } from "react-router-dom";
import { Tab, Tabs, Typography } from "@mui/material";
import Toast from "../commonComponet/Toast";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const GreenButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#ff0000"),
  backgroundColor: "#17b53b",
  textTransform: "initial",

  fontSize: "13px",
  padding: "15px 22px",
  "&:hover": {
    backgroundColor: "#339c41",
  },
}));

const Dashboard = (prop) => {
  const navigate = useNavigate();
  const [openModel, setOpenModel] = useState(false);

  const { t } = useTranslation();
  const [Dopen, setDOpen] = React.useState(false);
  const [Drefresh, setDrefresh] = React.useState(false);
  const descriptionElementRef = React.useRef(null);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [mainLoader, setMainLoader] = useState(true);
  const [bonusImage, setBonusImage] = useState([]);
  const [liveMT5AccountLoader, setLiveMT5AccountLoader] = React.useState(false);

  const [mt5AndDemoList, setMt5AndDemoList] = useState({
    demo: [],
    live: [],
    value: "",
  });
  const maxSteps = bonusImage.length;
  const [changeleverageLoader, setChangeleverageLoader] = React.useState(false);
  const [checkAccountType, setCheckAccountType] = useState({
    real: true,
    demo: "",
  });

  const [leveragesList, setLeveragesList] = React.useState({
    data: [],
  });
  const [clOpen, setCLOpen] = React.useState(false);
  const [clOpenAccount, setClOpenAccount] = React.useState(false);
  const [metaTrader, setMetaTrader] = useState(false);
  const [clOpenTrade, setClOpenTrade] = React.useState(false);
  const [age, setAge] = React.useState("");
  const [value, setValue] = useState(0);

  const BootstrapInputs = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      border: "1px solid #ced4da",
      fontSize: 16,
      border: 0,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "white",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  }));

  const [prefrence, setPrefrence] = useState({
    balance: "",
    user_email: "",
    earning: "",
    user_name: "",
    manager_details: {
      manager_email: "",
      manager_name: "",
    },
  });

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
        className="panding-left-right-0 tabpanel"
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  React.useEffect(() => {
    if (Dopen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [Dopen]);

  React.useEffect(() => {
    if (Drefresh == false) {
      getDashboardData();
    }
  }, [Drefresh]);
  const handleStepChange = (step: number) => {
    setActiveStep(step);
    var elements = document.getElementsByClassName("MuiMobileStepper-dot");
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.add(i);
      elements[i].setAttribute("data-indexId", i);
      elements[i].addEventListener("click", getDotIndexToChangeSlider, false);
    }
  };

  var getDotIndexToChangeSlider = function () {
    var indexId = this.getAttribute("data-indexId");
    // handleStepChange(indexId);
    setActiveStep(Number(indexId));
  };
  useEffect(() => {
    getMt5andDemoList();
    getBonusFunc();
  }, []);
  const getMt5andDemoList = async () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    // param.append("action", "get_mt5_bonus_offers");

    await axios
      .post(`${Url}/ajaxfiles/get_all_mt5_balance.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          prop.setLogin("true");
          navigate("/");
        }
        if (res.data.status == "error") {
          // Toast("error",res.data.message);
        } else {
          mt5AndDemoList.demo = res.data.demo_ac_data;
          mt5AndDemoList.live = res.data.live_ac_data;
          setMt5AndDemoList({ ...mt5AndDemoList });
          // setBonusImage(res.data.mt5_bonus_offers);
        }
      });
  };
  const getBonusFunc = async () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("action", "get_mt5_bonus_offers");

    await axios
      .post(`${Url}/ajaxfiles/mt5_bonus_manage.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          prop.setLogin("true");
          navigate("/");
        }
        if (res.data.status == "error") {
          // Toast("error",res.data.message);
        } else {
          setBonusImage(res.data.mt5_bonus_offers);
        }
      });
  };
  const getLeverage = async () => {
    const param = new FormData();
    param.append("action", "get_leverages");
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    await axios.post(`${Url}/ajaxfiles/account_list.php`, param).then((res) => {
      if (res.data.message == "Session has been expired") {
        navigate("/");
      }
      if (res.data.status == "error") {
        Toast("error", res.data.message);
      } else {
        leveragesList.data = res.data.leverages;
        setLeveragesList({ ...leveragesList });
      }
    });
    setCLOpen(true);
  };
  const getTrade = async () => {
    setClOpenTrade(true);
  };
  const DropWindow = () => {
    if (metaTrader == true) {
      setMetaTrader(false);
    } else {
      setMetaTrader(true);
    }
  };
  const getAccount = async () => {
    setClOpenAccount(true);
  };
  const changeLeverage = async () => {
    if (age == "") {
      Toast("error", "Please select leverage");
    } else {
      setChangeleverageLoader(true);
      const param = new FormData();
      param.append("action", "change_mt5_leverage");
      param.append("mt5_id", mt5AndDemoList.value.mt5_acc_no);
      param.append("new_leverage", age);
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      setDrefresh(true);

      await axios
        .post(`${Url}/ajaxfiles/account_list.php`, param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            navigate("/");
          }
          setChangeleverageLoader(false);
          if (res.data.status == "error") {
            Toast("error", res.data.message);
          } else {
            setAge("");
            setDrefresh(false);
            Toast("success", res.data.message);
            setCLOpen(false);
          }
        });
    }
  };
  const getDashboardData = async () => {
    const param = new FormData();
    setMainLoader(true);
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
        if (res.data.status == "error") {
        } else {
          setPrefrence(res.data);

          setMainLoader(false);
        }
      });
  };

  const checkAccount = (e) => {
    if (e == "real") {
      checkAccountType.real = true;
      checkAccountType.demo = "";
    } else {
      checkAccountType.demo = true;
      checkAccountType.real = "";
    }
    setCheckAccountType({ ...checkAccountType });
  };
  const handleChange = (event, newValue) => {
    if (event.target.value == "change_max_leverage") {
      // getLeverage();
    }
    if (event.target.value == "account_information") {
      getAccount();
    }
  };
  const handleChanges = (e, newValue) => {
    setValue(newValue);
    if (newValue == 1) {
    }
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const selsectImage = (e) => {
    const res = bonusImage.filter(
      (x) => x.bonus_offer_image == e.target.currentSrc
    );
    bonusOpen();
  };

  const bonusOpen = async () => {
    const param = new FormData();
    param.append("action", "list_mt5_bonus_accounts");
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    await axios
      .post(`${Url}/ajaxfiles/mt5_bonus_manage.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          prop.setLogin("true");
          navigate("/");
        }
        if (res.data.status == "error") {
        } else {
          setOpenModel(true);
        }
      });
  };

  return (
    <div>
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
                  <div></div>
                  <Grid container spacing={6}>
                    {bonusImage.length == 0 ? (
                      ""
                    ) : (
                      <Grid item md={12}>
                        <Paper
                          elevation={2}
                          sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "10px",
                          }}
                        >
                          <Box
                            className="image-slider-for-dot-use"
                            sx={{
                              width: "100%",
                              flexGrow: 1,
                              hight: "100%",
                              borderRadius: "10px",
                            }}
                          >
                            <AutoPlaySwipeableViews
                              axis={
                                theme.direction === "rtl" ? "x-reverse" : "x"
                              }
                              index={activeStep}
                              onChangeIndex={handleStepChange}
                              onClick={selsectImage}
                              enableMouseEvents
                            >
                              {bonusImage.map((step, index) => (
                                <div key={step.bonus_title}>
                                  {Math.abs(activeStep - index) <= 2 ? (
                                    <>
                                      <Box
                                        component="img"
                                        sx={{
                                          height: 160,
                                          display: "flex",
                                          borderRadius: "10px",
                                          // maxWidth: 2200,
                                          overflow: "hidden",
                                          width: "100%",
                                        }}
                                        src={step.bonus_offer_image}
                                        alt={step.bonus_title}
                                      />
                                    </>
                                  ) : null}
                                </div>
                              ))}
                            </AutoPlaySwipeableViews>

                            <button
                              class="carousel-control-prev"
                              type="button"
                              data-bs-target="#carouselExample"
                              data-bs-slide="prev"
                              disabled={activeStep === 0}
                            >
                              <div class="carousel-control-prev-icon">
                                <i
                                  class="material-icons"
                                  style={{ fontSize: "24px" }}
                                  aria-hidden="true"
                                >
                                  arrow_back_ios
                                </i>
                              </div>
                              <span class="visually-hidden">Previous</span>
                            </button>
                            <button
                              class="carousel-control-next"
                              type="button"
                              data-bs-target="#carouselExample"
                              data-bs-slide="next"
                              disabled={activeStep === maxSteps - 1}
                            >
                              <div class="carousel-control-next-icon">
                                <i
                                  class="material-icons"
                                  style={{ fontSize: "24px" }}
                                  aria-hidden="true"
                                >
                                  arrow_forward_ios
                                </i>
                              </div>
                              <span class="visually-hidden">Next</span>
                            </button>
                          </Box>
                        </Paper>
                      </Grid>
                    )}

                    <Grid item md={12} className="trading-accounts-wrapper">
                      <Paper
                        elevation={1}
                        style={{ borderRadius: "10px" }}
                        className="trading-accounts-container "
                      >
                        <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                          <div>
                            <h5 className="font-weight-bold mb-0 text-dark">
                              My Account
                            </h5>
                          </div>
                          <div item className="textCenter remove-pending-top-0">
                            <ColorButton
                              variant="contained"
                              size="large"
                              onClick={() => {
                                if (value == 0) {
                                  setDOpen(true);
                                  setDrefresh(true);
                                } else {
                                  setDOpen(true);
                                  setDrefresh(true);
                                }
                              }}
                            >
                              {value == 0
                                ? "Open Additional Real Account"
                                : "Open Additional Demo Account"}
                            </ColorButton>
                          </div>
                        </div>
                        <div className="px-3">
                          <Tabs
                            value={value}
                            onChange={handleChanges}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                            className="tabsBar"
                          >
                            <Tab label="real" />
                            <Tab label="demo" />
                          </Tabs>
                        </div>
                        <div className="divider"></div>
                        {liveMT5AccountLoader ? (
                          <div className="card-body position-relative pt-0 get-mt5-account-details ">
                            <svg className="spinner" viewBox="0 0 50 50">
                              <circle
                                className="path"
                                cx="25"
                                cy="25"
                                r="20"
                                fill="none"
                                strokeWidth="5"
                              ></circle>
                            </svg>
                          </div>
                        ) : (
                          <div className="p-3">
                            <SwipeableViews
                              axis={
                                theme.direction === "rtl" ? "x-reverse" : "x"
                              }
                              index={value}
                              onChangeIndex={handleChangeIndex}
                            >
                              <TabPanel
                                value={value}
                                index={0}
                                dir={theme.direction}
                              >
                                {mt5AndDemoList.live.length == 0 ? (
                                  <div className="centerflexjus">
                                    No Real Account Available
                                  </div>
                                ) : (
                                  <>
                                    {" "}
                                    {mt5AndDemoList.live.map((val, ind) => {
                                      return (
                                        <>
                                          <div className="account-data-main w-100">
                                            <div className="accunt-data1">
                                              <div className="d-flex align-items-center">
                                                <div
                                                  style={{
                                                    backgroundColor: "#5D2067",
                                                    borderRadius: "2px",
                                                    fontWeight: "500",
                                                    color: "white",
                                                  }}
                                                  className="btn-px"
                                                >
                                                  {val.acc_type == "1"
                                                    ? "Live"
                                                    : ""}
                                                </div>
                                                <div
                                                  style={{
                                                    backgroundColor: "#b1b1b1",
                                                    borderRadius: "2px",
                                                    fontWeight: "500",
                                                    color: "white",
                                                  }}
                                                  className="btn-px"
                                                >
                                                  MT5
                                                </div>
                                              </div>
                                              <div className="d-flex align-items-center">
                                                <div className="mx-3 s_mx">
                                                  <span className="fw-700">
                                                    {val.mt5_group_name} :{" "}
                                                  </span>
                                                  <span>{val.mt5_acc_no}</span>
                                                </div>
                                                <div className="mx-3 s_mx">
                                                  <span className="fw-700">
                                                    Leverage :{" "}
                                                  </span>
                                                  <span>{val.leverage}</span>
                                                </div>
                                                <div className="mx-3 s_mx">
                                                  <span className="fw-700">
                                                    Credit :{" "}
                                                  </span>
                                                  <span>{val.mt_credit}</span>
                                                </div>
                                                <div className="mx-3 s_mx">
                                                  <span className="fw-700">
                                                    Margin Free :{" "}
                                                  </span>
                                                  <span>
                                                    {val.mt_free_margin}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="accunt-data2 d-flex w-100">
                                              <div className="item1">
                                                {val.mt_equity} USD
                                              </div>
                                              <div className="item2 d-flex">
                                                <button
                                                  className="b-hover item2-item2 d-flex mr btn-costom btn-36"
                                                  onClick={() => {
                                                    navigate(
                                                      `/deposit/${val.mt5_acc_no}`
                                                    );
                                                  }}
                                                >
                                                  <div>
                                                    <DownloadIcon />
                                                  </div>
                                                  <div className="mx-2">
                                                    Deposit
                                                  </div>
                                                </button>
                                                <ColorButton
                                                  className="item2-item2 mx-1 btn-costom btn-36"
                                                  onClick={() => {
                                                    mt5AndDemoList.value = val;
                                                    setMt5AndDemoList({
                                                      ...mt5AndDemoList,
                                                    });
                                                    getTrade();
                                                  }}
                                                >
                                                  Trade
                                                </ColorButton>
                                                <div className="item2-item3 mx-2 d-flex justify-content-center align-items-center">
                                                  <FormControl
                                                    variant="standard"
                                                    sx={{
                                                      m: 1,
                                                      minWidth: 120,
                                                    }}
                                                    className="d-flex DashBordsetting"
                                                  >
                                                    <i class="material-icons position-absolute">
                                                      settings
                                                    </i>
                                                    <Select
                                                      className="px-1"
                                                      id="demo-simple-select-standard"
                                                      onChange={handleChange}
                                                      label="Account Select"
                                                      value=""
                                                      input={
                                                        <BootstrapInputs className="setinginputPadding" />
                                                      }
                                                    >
                                                      <MenuItem
                                                        value={"withdraw"}
                                                        style={{
                                                          color: "black",
                                                          fontWeight: "500",
                                                        }}
                                                        onClick={() => {
                                                          navigate(
                                                            `/withdrawal/${val.mt5_acc_no}`
                                                          );
                                                        }}
                                                      >
                                                        Withdraw
                                                      </MenuItem>

                                                      {val.mt5_group_name !==
                                                      "SPIN" ? (
                                                        <>
                                                          {" "}
                                                          <MenuItem
                                                            value={
                                                              "transfer_funds"
                                                            }
                                                            style={{
                                                              color: "black",
                                                              fontWeight: "500",
                                                            }}
                                                            onClick={() => {
                                                              navigate(
                                                                `/internal_transfer/${val.mt5_acc_no}`
                                                              );
                                                            }}
                                                          >
                                                            Transfer funds
                                                          </MenuItem>{" "}
                                                          <MenuItem
                                                            value={
                                                              "change_max_leverage"
                                                            }
                                                            onClick={() => {
                                                              mt5AndDemoList.value =
                                                                val;
                                                              setMt5AndDemoList(
                                                                {
                                                                  ...mt5AndDemoList,
                                                                }
                                                              );
                                                              setAge(
                                                                val.leverage
                                                              );
                                                              getLeverage();
                                                            }}
                                                            style={{
                                                              color: "black",
                                                              fontWeight: "500",
                                                            }}
                                                          >
                                                            Change max leverage
                                                          </MenuItem>
                                                        </>
                                                      ) : (
                                                        ""
                                                      )}

                                                      <MenuItem
                                                        value={
                                                          "account_information"
                                                        }
                                                        onClick={(e) => {
                                                          mt5AndDemoList.value =
                                                            val;
                                                          setMt5AndDemoList({
                                                            ...mt5AndDemoList,
                                                          });
                                                        }}
                                                        style={{
                                                          color: "black",
                                                          fontWeight: "500",
                                                        }}
                                                      >
                                                        Account information
                                                      </MenuItem>
                                                      {val.mt5_group_name !==
                                                      "SPIN" ? (
                                                        <>
                                                          <MenuItem
                                                            value={
                                                              "change_trading_password"
                                                            }
                                                            style={{
                                                              color: "black",
                                                              fontWeight: "500",
                                                            }}
                                                            onClick={() => {
                                                              navigate(
                                                                `/change_password/${val.mt5_acc_no}`
                                                              );
                                                            }}
                                                          >
                                                            Change trading
                                                            password
                                                          </MenuItem>
                                                        </>
                                                      ) : (
                                                        ""
                                                      )}
                                                    </Select>
                                                  </FormControl>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="account-main-mob">
                                            <div
                                              className="fanMob-history-submain"
                                              style={{ alignItems: "center" }}
                                            >
                                              <div
                                                className="d-flex"
                                                style={{
                                                  fontSize: "15px",
                                                  alignItems: "center",
                                                }}
                                              >
                                                <span className="cir-mob"></span>{" "}
                                                Live MT5
                                              </div>
                                              <div>
                                                {" "}
                                                <FormControl
                                                  variant="standard"
                                                  sx={{
                                                    m: 1,
                                                    minWidth: 120,
                                                    padding: 0,
                                                  }}
                                                  className="d-flex DashBordsetting"
                                                >
                                                  <i class="material-icons position-absolute">
                                                    settings
                                                  </i>
                                                  <Select
                                                    className="pad-0"
                                                    id="demo-simple-select-standard"
                                                    onChange={handleChange}
                                                    label="Account Select"
                                                    value=""
                                                    input={
                                                      <BootstrapInputs className="setinginputPadding" />
                                                    }
                                                  >
                                                    <MenuItem
                                                      value={"withdraw"}
                                                      style={{
                                                        color: "black",
                                                        fontWeight: "500",
                                                      }}
                                                      onClick={() => {
                                                        navigate(
                                                          `/withdrawal/${val.mt5_acc_no}`
                                                        );
                                                      }}
                                                    >
                                                      Withdraw
                                                    </MenuItem>
                                                    {val.mt5_group_name !==
                                                    "SPIN" ? (
                                                      <>
                                                        {" "}
                                                        <MenuItem
                                                          value={
                                                            "transfer_funds"
                                                          }
                                                          style={{
                                                            color: "black",
                                                            fontWeight: "500",
                                                          }}
                                                          onClick={() => {
                                                            navigate(
                                                              `/internal_transfer/${val.mt5_acc_no}`
                                                            );
                                                          }}
                                                        >
                                                          Transfer funds
                                                        </MenuItem>
                                                        <MenuItem
                                                          value={
                                                            "change_max_leverage"
                                                          }
                                                          onClick={() => {
                                                            mt5AndDemoList.value =
                                                              val;
                                                            setMt5AndDemoList({
                                                              ...mt5AndDemoList,
                                                            });
                                                            setAge(
                                                              val.leverage
                                                            );
                                                            getLeverage();
                                                          }}
                                                          style={{
                                                            color: "black",
                                                            fontWeight: "500",
                                                          }}
                                                        >
                                                          Change max leverage
                                                        </MenuItem>
                                                      </>
                                                    ) : (
                                                      ""
                                                    )}
                                                    <MenuItem
                                                      value={
                                                        "account_information"
                                                      }
                                                      onClick={(e) => {
                                                        mt5AndDemoList.value =
                                                          val;
                                                        setMt5AndDemoList({
                                                          ...mt5AndDemoList,
                                                        });
                                                      }}
                                                      style={{
                                                        color: "black",
                                                        fontWeight: "500",
                                                      }}
                                                    >
                                                      Account information
                                                    </MenuItem>
                                                    {val.mt5_group_name !==
                                                    "SPIN" ? (
                                                      <>
                                                        <MenuItem
                                                          value={
                                                            "change_trading_password"
                                                          }
                                                          style={{
                                                            color: "black",
                                                            fontWeight: "500",
                                                          }}
                                                          onClick={() => {
                                                            navigate(
                                                              `/change_password/${val.mt5_acc_no}`
                                                            );
                                                          }}
                                                        >
                                                          Change trading
                                                          password
                                                        </MenuItem>
                                                      </>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </Select>
                                                </FormControl>
                                              </div>
                                            </div>
                                            <div className="fanMob-history-submain">
                                              <div>
                                                <span className="fw-700">
                                                  {val.mt5_group_name} :
                                                </span>
                                              </div>
                                              <div>
                                                <span className="mobsubTextColor">
                                                  {val.mt5_acc_no}
                                                </span>
                                              </div>
                                            </div>
                                            <div className="fanMob-history-submain">
                                              <div>
                                                <span className="fw-700">
                                                  Balance
                                                </span>
                                              </div>
                                              <div>
                                                <span className="mobsubTextColor">
                                                  {val.mt_equity} USD
                                                </span>
                                              </div>
                                            </div>
                                            <div className="fanMob-history-submain">
                                              <div>
                                                <span className="fw-700">
                                                  Leverage :
                                                </span>
                                              </div>
                                              <div>
                                                <span className="mobsubTextColor">
                                                  {val.leverage}
                                                </span>
                                              </div>
                                            </div>{" "}
                                            <div className="fanMob-history-submain">
                                              <div>
                                                <span className="fw-700">
                                                  Credit :
                                                </span>
                                              </div>
                                              <div>
                                                <span className="mobsubTextColor">
                                                  {val.mt_credit}
                                                </span>
                                              </div>
                                            </div>{" "}
                                            <div className="fanMob-history-submain">
                                              <div>
                                                <span className="fw-700">
                                                  Margin Free :
                                                </span>
                                              </div>
                                              <div>
                                                <span className="mobsubTextColor">
                                                  {val.mt_free_margin}
                                                </span>
                                              </div>
                                            </div>
                                            <button
                                              className="b-hover item2-item2 d-flex mr btn-costom btn-36 live-account-button-mob"
                                              onClick={() => {
                                                navigate(
                                                  `/deposit/${val.mt5_acc_no}`
                                                );
                                              }}
                                            >
                                              <div>
                                                <DownloadIcon />
                                              </div>
                                              <div className="mx-2">
                                                Deposit
                                              </div>
                                            </button>
                                            <ColorButton
                                              className="item2-item2 mx-1 btn-costom btn-36 live-account-button-mob"
                                              onClick={() => {
                                                mt5AndDemoList.value = val;
                                                setMt5AndDemoList({
                                                  ...mt5AndDemoList,
                                                });
                                                getTrade();
                                              }}
                                            >
                                              Trade
                                            </ColorButton>
                                          </div>
                                        </>
                                      );
                                    })}
                                  </>
                                )}
                              </TabPanel>
                              <TabPanel
                                value={value}
                                index={1}
                                dir={theme.direction}
                              >
                                {mt5AndDemoList.demo.length == 0 ? (
                                  <div className="centerflexjus">
                                    No Demo Account Available
                                  </div>
                                ) : (
                                  <>
                                    {" "}
                                    {mt5AndDemoList.demo.map((val, ind) => {
                                      return (
                                        <>
                                          <div className="account-data-main w-100">
                                            <div className="accunt-data1">
                                              <div className="d-flex align-items-center">
                                                <div
                                                  style={{
                                                    backgroundColor: "#28a745",
                                                    borderColor: "#28a745",
                                                    borderRadius: "2px",
                                                    fontWeight: "500",
                                                    color: "white",
                                                  }}
                                                  className="btn-px "
                                                >
                                                  DEMO
                                                </div>
                                                <div
                                                  style={{
                                                    backgroundColor: "#b1b1b1",
                                                    borderRadius: "2px",
                                                    fontWeight: "500",
                                                    color: "white",
                                                  }}
                                                  className="btn-px"
                                                >
                                                  MT5
                                                </div>
                                              </div>
                                              <div className="d-flex align-items-center">
                                                <div className="mx-3 s_mx">
                                                  <span className="fw-700">
                                                    {val.mt5_group_name}:
                                                  </span>
                                                  <span>{val.mt5_acc_no}</span>
                                                </div>
                                                <div className="mx-3 s_mx">
                                                  <span className="fw-700">
                                                    Leverage :{" "}
                                                  </span>
                                                  <span>{val.leverage}</span>
                                                </div>
                                                <div className="mx-3 s_mx">
                                                  <span className="fw-700">
                                                    Credit :{" "}
                                                  </span>
                                                  <span>{val.mt_credit}</span>
                                                </div>
                                                <div className="mx-3 s_mx">
                                                  <span className="fw-700">
                                                    Margin Free :{" "}
                                                  </span>
                                                  <span>
                                                    {val.mt_free_margin}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="accunt-data2 d-flex w-100">
                                              <div className="item1">
                                                {val.mt_balance} USD
                                              </div>
                                              <div className="item2 d-flex">
                                                <ColorButton
                                                  className="item2-item2 mx-1 btn-costom btn-36"
                                                  onClick={() => {
                                                    mt5AndDemoList.value = val;
                                                    setMt5AndDemoList({
                                                      ...mt5AndDemoList,
                                                    });
                                                    getTrade();
                                                  }}
                                                >
                                                  Trade
                                                </ColorButton>
                                                <ColorButton
                                                  className="item2-item2 mx-1 btn-costom btn-36"
                                                  onClick={() => {
                                                    navigate(
                                                      `/change_password/${val.mt5_acc_no}`
                                                    );
                                                  }}
                                                >
                                                  Change Password
                                                </ColorButton>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="account-main-mob">
                                            <div
                                              className="fanMob-history-submain"
                                              style={{ alignItems: "center" }}
                                            >
                                              <div
                                                className="d-flex"
                                                style={{
                                                  fontSize: "15px",
                                                  alignItems: "center",
                                                }}
                                              >
                                                Demo MT5
                                              </div>
                                            </div>
                                            <div className="fanMob-history-submain">
                                              <div>
                                                <span className="fw-700">
                                                  {val.mt5_group_name} :
                                                </span>
                                              </div>
                                              <div>
                                                <span className="mobsubTextColor">
                                                  {val.mt5_acc_no}
                                                </span>
                                              </div>
                                            </div>
                                            <div className="fanMob-history-submain">
                                              <div>
                                                <span className="fw-700">
                                                  Balance
                                                </span>
                                              </div>
                                              <div>
                                                <span className="mobsubTextColor">
                                                  {val.mt_equity} USD
                                                </span>
                                              </div>
                                            </div>
                                            <div className="fanMob-history-submain">
                                              <div>
                                                <span className="fw-700">
                                                  Leverage :
                                                </span>
                                              </div>
                                              <div>
                                                <span className="mobsubTextColor">
                                                  {val.leverage}
                                                </span>
                                              </div>
                                            </div>{" "}
                                            <div className="fanMob-history-submain">
                                              <div>
                                                <span className="fw-700">
                                                  Credit :
                                                </span>
                                              </div>
                                              <div>
                                                <span className="mobsubTextColor">
                                                  {val.mt_credit}
                                                </span>
                                              </div>
                                            </div>{" "}
                                            <div className="fanMob-history-submain">
                                              <div>
                                                <span className="fw-700">
                                                  Margin Free :
                                                </span>
                                              </div>
                                              <div>
                                                <span className="mobsubTextColor">
                                                  {val.mt_free_margin}
                                                </span>
                                              </div>
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "center",
                                              }}
                                            >
                                              <ColorButton
                                                className="item2-item2 mx-1 btn-costom btn-36 "
                                                sx={{
                                                  marginTop: "10px",
                                                }}
                                                onClick={() => {
                                                  mt5AndDemoList.value = val;
                                                  setMt5AndDemoList({
                                                    ...mt5AndDemoList,
                                                  });
                                                  getTrade();
                                                }}
                                              >
                                                Trade
                                              </ColorButton>

                                              <ColorButton
                                                className="item2-item2 mx-1 btn-costom btn-36"
                                                sx={{
                                                  marginTop: "10px",
                                                }}
                                                onClick={() => {
                                                  navigate(
                                                    `/change_password/${val.mt5_acc_no}`
                                                  );
                                                }}
                                              >
                                                Change Password
                                              </ColorButton>
                                            </div>
                                          </div>
                                        </>
                                      );
                                    })}
                                  </>
                                )}
                              </TabPanel>
                            </SwipeableViews>
                          </div>
                        )}
                      </Paper>
                    </Grid>
                    <Dialog
                      open={clOpen}
                      onClose={() => {
                        setCLOpen(false);
                      }}
                      scroll="paper"
                      maxWidth="xs"
                      fullWidth={true}
                    >
                      <div
                        id="form-dialog-title"
                        className="d-flex align-items-center p-3"
                      >
                        <h5 className="w-100 text-center custom-text-color m-0 font-weight-bold">
                          CHANGE LEVERAGE
                        </h5>
                        <Button
                          onClick={() => setCLOpen(false)}
                          sx={{ color: "#2A3F73" }}
                        >
                          <CloseIcon />
                        </Button>
                      </div>
                      <div className="divider"></div>
                      <DialogContent>
                        <Grid container spacing={6}>
                          <Grid item md={12}>
                            <form>
                              <Grid container spacing={3}>
                                <Grid item md={12}>
                                  <FormControl className="w-100">
                                    <label
                                      htmlFor="accountNo"
                                      className="text-info font-weight-bold form-label-head w-100 required"
                                    >
                                      LEVERAGE
                                    </label>
                                    <Select
                                      value={age}
                                      onChange={(e) => {
                                        setAge(e.target.value);
                                      }}
                                      displayEmpty
                                      inputProps={{
                                        "aria-label": "Without label",
                                      }}
                                      input={<BootstrapInput />}
                                    >
                                      <MenuItem value="">
                                        Select Option
                                      </MenuItem>
                                      {leveragesList.data.map((item) => {
                                        return (
                                          <MenuItem value={item.leverage_value}>
                                            {item.leverage_data}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                                </Grid>
                              </Grid>
                              <Grid container spacing={3}>
                                <Grid item md={12} className="text-center my-3">
                                  {changeleverageLoader ? (
                                    <ColorButton
                                      variant="contained"
                                      className="m-auto p-3 text-center text-capitalize disabled-transfar-button"
                                      sx={{
                                        padding: "23px 91px !important",
                                      }}
                                      disabled
                                    >
                                      <svg class="spinner" viewBox="0 0 50 50">
                                        <circle
                                          class="path"
                                          cx="25"
                                          cy="25"
                                          r="20"
                                          fill="none"
                                          stroke-width="5"
                                        ></circle>
                                      </svg>
                                    </ColorButton>
                                  ) : (
                                    <ColorButton onClick={changeLeverage}>
                                      {" "}
                                      Change Leverage
                                    </ColorButton>
                                  )}
                                </Grid>
                              </Grid>
                            </form>
                          </Grid>
                        </Grid>
                      </DialogContent>
                    </Dialog>
                    <Dialog
                      open={clOpenAccount}
                      onClose={() => {
                        setClOpenAccount(false);
                      }}
                      scroll="paper"
                      maxWidth="sm"
                      fullWidth={true}
                    >
                      <div
                        id="form-dialog-title"
                        className="d-flex align-items-center p-3"
                      >
                        <h5 className="w-100 text-center custom-text-color m-0 font-weight-bold">
                          Account information
                        </h5>
                        <Button
                          onClick={() => setClOpenAccount(false)}
                          sx={{ color: "#2A3F73" }}
                        >
                          <CloseIcon />
                        </Button>
                      </div>
                      <div className="divider"></div>
                      <DialogContent>
                        <Grid container spacing={6}>
                          <Grid item md={12}>
                            <form>
                              <Grid container spacing={3}>
                                <Grid
                                  item
                                  md={12}
                                  className="d-flex"
                                  style={{
                                    justifyContent: "space-between",
                                    gap: "15px",
                                  }}
                                >
                                  <div>Server</div>
                                  <div
                                    className="d-flex "
                                    style={{ paddingRight: "20px" }}
                                  >
                                    <div className="d-flex">
                                      <div>
                                        {" "}
                                        <div>Rightfx-Live</div>
                                        <div style={{ fontSize: ".8rem" }}>
                                          Right Group Financial Limited
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <i
                                        class="material-icons position-absolute"
                                        style={{ cursor: "pointer" }}
                                        onClick={(e) => {
                                          navigator.clipboard.writeText(
                                            "Right Group Financial Limited"
                                          );
                                          Toast(
                                            "success",
                                            "Copied to clipboard was successful!"
                                          );
                                        }}
                                      >
                                        content_copy{" "}
                                      </i>
                                    </div>
                                  </div>
                                </Grid>
                                <Grid
                                  item
                                  md={12}
                                  className="d-flex"
                                  style={{
                                    justifyContent: "space-between",
                                    gap: "15px",
                                  }}
                                >
                                  <div>MT5 login</div>
                                  <div
                                    className="d-flex"
                                    style={{ paddingRight: "20px" }}
                                  >
                                    {mt5AndDemoList.value?.mt5_acc_no}
                                    <div>
                                      <i
                                        class="material-icons position-absolute"
                                        style={{ cursor: "pointer" }}
                                        onClick={(e) => {
                                          navigator.clipboard.writeText(
                                            mt5AndDemoList.value?.mt5_acc_no
                                          );
                                          Toast(
                                            "success",
                                            "Copied to clipboard was successful!"
                                          );
                                        }}
                                      >
                                        content_copy{" "}
                                      </i>
                                    </div>
                                  </div>
                                </Grid>

                                <Grid item md={6} className="accountInfoGrid">
                                  <div>
                                    <span className="fw-700">Type</span>{" "}
                                  </div>
                                  <div>
                                    {mt5AndDemoList.value?.mt5_group_name}
                                  </div>
                                </Grid>
                                <Grid item md={6} className="accountInfoGrid">
                                  <div>
                                    <span className="fw-700">
                                      currency Type
                                    </span>{" "}
                                  </div>
                                  <div>USD</div>
                                </Grid>
                                <Grid item md={6} className="accountInfoGrid">
                                  <div>
                                    <span className="fw-700">Balance</span>{" "}
                                  </div>
                                  <div>{mt5AndDemoList.value?.mt_equity}</div>
                                </Grid>
                                <Grid item md={6} className="accountInfoGrid">
                                  <div>
                                    <span className="fw-700">Equity</span>{" "}
                                  </div>
                                  <div>{mt5AndDemoList.value?.mt_equity}</div>
                                </Grid>
                                <Grid item md={6} className="accountInfoGrid">
                                  <div>
                                    <span className="fw-700">
                                      Unrealized P&L
                                    </span>{" "}
                                  </div>
                                  <div>
                                    {mt5AndDemoList.value?.mt_current_profit}
                                  </div>
                                </Grid>
                                <Grid item md={6} className="accountInfoGrid">
                                  <div>
                                    <span className="fw-700">Credit</span>{" "}
                                  </div>
                                  <div>{mt5AndDemoList.value?.mt_credit}</div>
                                </Grid>
                                <Grid item md={6} className="accountInfoGrid">
                                  <div>
                                    <span className="fw-700">Margin</span>{" "}
                                  </div>
                                  <div>{mt5AndDemoList.value?.margin}</div>
                                </Grid>
                                <Grid item md={6} className="accountInfoGrid">
                                  <div>
                                    <span className="fw-700">Free Margin</span>{" "}
                                  </div>
                                  <div>
                                    {mt5AndDemoList.value?.mt_free_margin}
                                  </div>
                                </Grid>
                                <Grid item md={6} className="accountInfoGrid">
                                  <div>
                                    <span className="fw-700">Margin Level</span>{" "}
                                  </div>
                                  <div>
                                    {mt5AndDemoList.value?.margin_level}
                                  </div>
                                </Grid>

                                <Grid item md={6} className="accountInfoGrid">
                                  <div>
                                    <span className="fw-700">Max leverage</span>{" "}
                                  </div>
                                  <div>{mt5AndDemoList.value?.leverage}</div>
                                </Grid>
                              </Grid>
                              <Grid container spacing={3}>
                                <Grid item md={12} className="text-center my-3">
                                  <ColorButton
                                    onClick={() => setClOpenAccount(false)}
                                  >
                                    {" "}
                                    Done
                                  </ColorButton>
                                </Grid>
                              </Grid>
                            </form>
                          </Grid>
                        </Grid>
                      </DialogContent>
                    </Dialog>
                    <Dialog
                      open={clOpenTrade}
                      onClose={() => {
                        setClOpenTrade(false);
                      }}
                      scroll="paper"
                      maxWidth="xs"
                      fullWidth={true}
                    >
                      <div
                        id="form-dialog-title"
                        className="d-flex align-items-center p-3"
                      >
                        <h5 className="w-100 text-center custom-text-color m-0 font-weight-bold">
                          Trade
                        </h5>
                        <Button
                          onClick={() => setClOpenTrade(false)}
                          sx={{ color: "#2A3F73" }}
                        >
                          <CloseIcon />
                        </Button>
                      </div>
                      <div className="divider"></div>
                      <DialogContent>
                        <Grid container spacing={6}>
                          <Grid item md={12}>
                            <form>
                              <Grid container spacing={3}>
                                <Grid
                                  item
                                  md={6}
                                  className="d-flex"
                                  style={{
                                    justifyContent: "space-between",
                                    gap: "15px",
                                  }}
                                >
                                  <div>Server</div>
                                  <div
                                    className="d-flex "
                                    style={{ paddingRight: "20px" }}
                                  >
                                    <div className="d-flex">
                                      <div>
                                        {" "}
                                        <div>Rightfx-Live</div>
                                        <div style={{ fontSize: ".8rem" }}>
                                          Right Group Financial Limited
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <i
                                        class="material-icons position-absolute"
                                        style={{ cursor: "pointer" }}
                                        onClick={(e) => {
                                          navigator.clipboard.writeText(
                                            "Right Group Financial Limited"
                                          );
                                          Toast(
                                            "success",
                                            "Copied to clipboard was successful!"
                                          );
                                        }}
                                      >
                                        content_copy{" "}
                                      </i>
                                    </div>
                                  </div>
                                </Grid>
                                <Grid
                                  item
                                  md={6}
                                  className="d-flex"
                                  style={{
                                    justifyContent: "space-between",
                                    gap: "15px",
                                  }}
                                >
                                  <div>MT5 login</div>
                                  <div
                                    className="d-flex"
                                    style={{ paddingRight: "20px" }}
                                  >
                                    {mt5AndDemoList.value?.mt5_acc_no}
                                    <div>
                                      <i
                                        class="material-icons position-absolute"
                                        style={{ cursor: "pointer" }}
                                        onClick={(e) => {
                                          navigator.clipboard.writeText(
                                            mt5AndDemoList.value?.mt5_acc_no
                                          );
                                          Toast(
                                            "success",
                                            "Copied to clipboard was successful!"
                                          );
                                        }}
                                      >
                                        content_copy{" "}
                                      </i>
                                    </div>
                                  </div>
                                </Grid>
                                <a
                                  href="https://play.google.com/store/apps/details?id=com.rightgroup.rightapp"
                                  style={{
                                    width: "100%",
                                    color: "#393a47",
                                    marginRight: "24px",
                                  }}
                                  target="_blank"
                                >
                                  <Grid
                                    item
                                    md={12}
                                    className="d-flex trade-MetaTrader DropWindow"
                                  >
                                    <div style={{ marginRight: "10px" }}>
                                      <img
                                        src="/dimage/rightfx-favicon.png"
                                        style={{ width: "30px" }}
                                        alt=""
                                      />
                                    </div>
                                    <Grid item md={11}>
                                      <Grid
                                        item
                                        md={12}
                                        style={{ fontSize: "0.8rem" }}
                                      >
                                        Right App
                                      </Grid>
                                      <Grid
                                        item
                                        md={12}
                                        style={{ fontSize: "0.8rem" }}
                                      >
                                        Click here and trade with Right App
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </a>

                                <Grid
                                  item
                                  md={12}
                                  className="d-flex justify-content-center align-items-center"
                                  onClick={DropWindow}
                                >
                                  <span className="nav-link d-flex">
                                    Other options{" "}
                                    {metaTrader ? (
                                      <i
                                        class="material-icons"
                                        style={{ fontSize: "24px" }}
                                        aria-hidden="true"
                                      >
                                        expand_less
                                      </i>
                                    ) : (
                                      <i
                                        class="material-icons"
                                        style={{ fontSize: "24px" }}
                                        aria-hidden="true"
                                      >
                                        expand_more
                                      </i>
                                    )}
                                  </span>
                                </Grid>
                                {metaTrader ? (
                                  <Grid item md={12}>
                                    <Grid
                                      container
                                      spacing={1}
                                      className="d-flex"
                                      style={{
                                        color: "black",
                                        fontSize: ".8rem",
                                      }}
                                    >
                                      <Grid item md={6} className="d-flex">
                                        <a
                                          rel="noopener noreferrer"
                                          target="_blank"
                                          href="https://download.metatrader.com/cdn/web/right.group.financial/mt5/rightgroup5setup.exe"
                                          className="align-item-center main-color d-flex"
                                        >
                                          <WindowIcon
                                            sx={{ marginRight: "7px" }}
                                          />
                                          <div></div>
                                          Install MT5 Terminal For Windows
                                        </a>
                                      </Grid>
                                      <Grid item md={6}>
                                        <a
                                          rel="noopener noreferrer"
                                          target="_blank"
                                          href="https://download.metatrader.com/cdn/mobile/mt5/ios?server=RightGroup-Live"
                                          className="align-item-center main-color d-flex"
                                        >
                                          <AppleIcon
                                            sx={{ marginRight: "7px" }}
                                          />
                                          <div>MT5 for Mac</div>
                                        </a>
                                      </Grid>
                                      <Grid item md={6}>
                                        <a
                                          rel="noopener noreferrer"
                                          target="_blank"
                                          href="https://download.metatrader.com/cdn/mobile/mt5/android?server=RightGroup-Live"
                                          className="align-item-center main-color d-flex"
                                        >
                                          <AndroidIcon
                                            sx={{ marginRight: "7px" }}
                                          />
                                          <div>MT5 for Android</div>
                                        </a>
                                      </Grid>
                                      <Grid item md={6}>
                                        <a
                                          rel="noopener noreferrer"
                                          target="_blank"
                                          href="https://app.rightfx.com/"
                                          className="align-item-center main-color d-flex"
                                        >
                                          <LanguageIcon
                                            sx={{ marginRight: "7px" }}
                                          />
                                          <div>MT5 for Web Terminal</div>
                                        </a>
                                      </Grid>
                                    </Grid>
                                    <Grid
                                      item
                                      md={12}
                                      style={{
                                        color: "black",
                                        fontSize: ".8rem",
                                      }}
                                    ></Grid>
                                  </Grid>
                                ) : null}
                              </Grid>
                            </form>
                          </Grid>
                        </Grid>
                      </DialogContent>
                    </Dialog>
                  </Grid>
                  {(prefrence.manager_details.manager_name == "" ||
                    prefrence.manager_details.manager_name == " ") &&
                  prefrence.manager_details.manager_email == "" ? (
                    ""
                  ) : (
                    <Grid
                      container
                      spacing={6}
                      style={{ textAlign: "center", marginTop: 0 }}
                    >
                      <Grid item md={4}>
                        <Paper elevation={1} sx={{ borderRadius: "10px" }}>
                          <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                            <div>
                              <h6 className="mb-0 text-dark">
                                <AccountCircleIcon className="mr-2" />
                                {t("Your Manager")}
                              </h6>
                            </div>
                          </div>
                          <div className="divider"></div>
                          <div className="card-body">
                            <Grid container>
                              <Grid item md={12}>
                                <FormControl>
                                  <Avatar
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      margin: "10px auto",
                                    }}
                                  />
                                  <label className="text-center">
                                    {prefrence.manager_details.manager_name}
                                  </label>
                                </FormControl>
                              </Grid>
                              <Grid className="mt-2 mb-3" item md={12}></Grid>
                              <Grid
                                className="mt-2 mb-3"
                                item
                                md={12}
                                sx={{ width: "100%" }}
                              >
                                <FormControl className="w-100">
                                  <a
                                    className="text-center text-dark"
                                    href={`mailto:${prefrence.manager_details.manager_email}}`}
                                    style={{ overflowWrap: "break-word" }}
                                  >
                                    <MailOutlineIcon />
                                    {prefrence.manager_details.manager_email}
                                  </a>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </div>
                        </Paper>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </div>
          )}
          {Dopen ? (
            <OpenDemoModel
              Dopen={Dopen}
              setDOpen={setDOpen}
              type={value == 0 ? 1 : 0}
              nav={1}
              refresh={setDrefresh}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
