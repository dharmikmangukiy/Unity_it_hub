import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
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
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { IsApprove, Url } from "../../global.js";
import OpenDemoModel from "../customComponet/OpenDemoModel";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DialogContent, DialogTitle } from "@mui/material";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import MobileStepper from "@mui/material/MobileStepper";
import SettingsIcon from "@mui/icons-material/Settings";
import InputLabel from "@mui/material/InputLabel";
import { NavLink } from "react-router-dom";
import { Tab, Tabs, Typography } from "@mui/material";
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
const BootstrapInput1 = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(0),
  },
  "& .MuiInputBase-input": {
    // borderRadius: 9,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    // border: "1px solid #ced4da",
    fontSize: 16,
    padding: "8px 26px 8px 10px",
    // transition: theme.transitions.create(["border-color", "box-shadow"]),
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
      // borderRadius: 9,
      borderColor: "#80bdff",
    },
  },
}));

const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1647899186076-7dc8b84c2b8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
];
const Dashboard = (prop) => {
  const navigate = useNavigate();
  const [openModel, setOpenModel] = useState(false);

  /* const [verifyModal, setVerifyModal] = React.useState(() => {
    if (localStorage.getItem("setModel") == "true") {
      return true;
    }
  }); */

  const [verifyModal, setVerifyModal] = React.useState(
    localStorage.getItem("setModel") == "true" ? true : false
  );
  // console.log(verifyModal);

  const { t } = useTranslation();
  const [Dopen, setDOpen] = React.useState(false);
  const [Drefresh, setDrefresh] = React.useState(false);
  const [accountType, setAccountType] = useState(0);
  const descriptionElementRef = React.useRef(null);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [dInfo, setDInfo] = React.useState();
  const [liveMT5AccountLoader, setLiveMT5AccountLoader] = React.useState(false);
  const [demoMT5AccountLoader, setDemoMT5AccountLoader] = React.useState(false);
  const [liveMT5Account, setLiveMT5Account] = React.useState("");
  const [liveMT5AccountIndex, setLiveMT5AccountIndex] = React.useState(0);
  const [demoMT5AccountIndex, setDemoMT5AccountIndex] = React.useState(0);
  const [demoMT5Account, setDemoMT5Account] = React.useState("");
  const [liveAccountDetails, setLiveAccountDetails] = React.useState({});
  const [demoAccountDetails, setDemoAccountDetails] = React.useState({});
  const [dialogData, setDialogData] = useState({});
  const [mainLoader, setMainLoader] = useState(true);
  const [bonusImage, setBonusImage] = useState([]);
  const maxSteps = bonusImage.length;
  const [changeleverageLoader, setChangeleverageLoader] = React.useState(false);
  const [checkAccountType, setCheckAccountType] = useState({
    real: true,
    demo: "",
  });
  const [accountSelect, setAccountSelect] = useState("");
  const [bonusMt5, setBonusMt5] = useState({
    mt5: [],
    isLoder: false,
  });
  const [bonusData, setBonusData] = useState({
    data: {},
    mt5Account: [],
  });

  const [liveMT5AccountList, setLiveMT5AccountList] = React.useState({
    data: [],
  });
  const [demoMT5AccountList, setDemoMT5AccountList] = React.useState({
    data: [],
  });
  const [leveragesList, setLeveragesList] = React.useState({
    data: [],
  });
  const [clOpen, setCLOpen] = React.useState(false);
  const [age, setAge] = React.useState("");
  const [mt5Account, setMT5Account] = React.useState("");
  const [value, setValue] = useState(0);
  var [myPortfolio, setMyPortfolio] = useState([]);
  var [portfolioLoader, setPortfolioLoader] = useState(true);

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
  // React.useEffect(() => {
  //   if (clOpen) {
  //     const { current: descriptionElement } = descriptionElementRef;
  //     if (descriptionElement !== null) {
  //       descriptionElement.focus();
  //     }
  //   }
  // }, [clOpen]);
  // console.log("verifyModal", verifyModal);
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
  toast.configure();
  const handleClose = () => {
    setOpenModel(false);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
  }

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

  const continueButton = () => {
    setVerifyModal(false);
    localStorage.setItem("setModel", false);
    if (prefrence.step_number == "0") {
      navigate("/userProfile");
    } else if (prefrence.step_number == "1") {
      navigate("/open_real_account");
    } else if (prefrence.step_number == "2") {
      navigate("/myDocuments");
      console.log("locAL", localStorage.getItem("step"));
    } else if (prefrence.step_number == "3") {
      navigate("/deposit");
    } else if (prefrence.step_number == "4") {
      navigate("/userProfile");
    }
  };

  React.useEffect(() => {
    if (Dopen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [Dopen]);

  useEffect(() => {
    if (verifyModal == false || verifyModal == "false") {
      localStorage.setItem("setModel", false);
    }
  }, [verifyModal]);
  React.useEffect(() => {
    if (Drefresh == false) {
      getDashboardData();
    }
  }, [Drefresh]);
  const handleStepChange = (step: number) => {
    console.log("handleStepChange", step);
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
    getBonusFunc();
  }, []);

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
          // toast.error(res.data.message);
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
        toast.error(res.data.message);
      } else {
        leveragesList.data = res.data.leverages;
        setLeveragesList({ ...leveragesList });
      }
    });
    setCLOpen(true);
  };
  const changeLeverage = async () => {
    if (age == "") {
      toast.error("Please select leverage");
    } else {
      setChangeleverageLoader(true);
      const param = new FormData();
      param.append("action", "change_mt5_leverage");
      param.append("mt5_id", mt5Account);
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
            toast.error(res.data.message);
          } else {
            setAge("");
            setDrefresh(false);
            toast.success(res.data.message);
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
          // toast.error(res.data.message);
        } else {
          setPrefrence(res.data);

          // prefrence.manager_email=res.data.manager_details.manager_email
          // prefrence.manager_name=res.data.manager_details.manager_name
          // setPrefrence({...prefrence})
          liveMT5AccountList.data = res.data.mt5_live_accounts;
          setLiveMT5AccountList({ ...liveMT5AccountList });
          demoMT5AccountList.data = res.data.mt5_demo_accounts;
          setDemoMT5AccountList({ ...demoMT5AccountList });
          // console.log('mt5Account', liveMT5AccountList.data[0].mt_code);
          if (liveMT5AccountList.data.length > 0) {
            setLiveMT5AccountIndex(0);
            setLiveMT5Account(liveMT5AccountList.data[0].mt_code);
            fetchMT5AccountDetaiils(liveMT5AccountList.data[0].mt_code, "live");
          }

          if (demoMT5AccountList.data.length > 0) {
            setDemoMT5AccountIndex(0);
            setDemoMT5Account(demoMT5AccountList.data[0].mt_code);
            fetchMT5AccountDetaiils(demoMT5AccountList.data[0].mt_code, "demo");
          }
          setMainLoader(false);

          // console.log('mt5Account', mt5Account);
        }
      });
  };
  const getMyPortfolio = () => {
    setPortfolioLoader(true);
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("action", "my_portfolios");
    axios
      .post(Url + "/ajaxfiles/pamm/portfolio_manage.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        setPortfolioLoader(false);
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          myPortfolio = res.data.data;
          setMyPortfolio([...myPortfolio]);
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
    setAccountSelect(event.target.value);
    if (event.target.value == "change_max_leverage") {
      getLeverage();
    }
    setValue(newValue);
    if (newValue == 1) {
      getMyPortfolio();
    }
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  console.log("accont", accountSelect);
  const selsectImage = (e) => {
    console.log(e.target.currentSrc);
    const res = bonusImage.filter(
      (x) => x.bonus_offer_image == e.target.currentSrc
    );
    setDialogData(res[0]);
    bonusOpen();
  };
  const submitBonus = async () => {
    if (bonusMt5.mt5 == "") {
      toast.error("Live Account is requied");
    } else {
      const param = new FormData();
      param.append("action", "claim_mt5_bonus_request");
      param.append("mt5_acc_no", bonusMt5.mt5);
      param.append("bonus_offer_id", dialogData.bonus_offer_id);

      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      bonusMt5.isLoder = true;
      setBonusMt5({ ...bonusMt5 });
      await axios
        .post(`${Url}/ajaxfiles/mt5_bonus_manage.php`, param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            localStorage.setItem("login", true);
            prop.setLogin("true");
            navigate("/");
          }
          if (res.data.status == "error") {
            toast.error(res.data.message);
            bonusMt5.isLoder = false;
            setBonusMt5({ ...bonusMt5 });
          } else {
            toast.success(res.data.message);
            bonusMt5.isLoder = false;
            setBonusMt5({ ...bonusMt5 });
            setOpenModel(false);
          }
        });
    }
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
          bonusData.mt5Account = res.data.mt5_accounts;
          setBonusData({ ...bonusData });
          setOpenModel(true);
        }
      });
  };
  const fetchMT5AccountList = async () => {
    const param = new FormData();
    param.append("action", "get_mt5_ac_list");
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    await axios.post(`${Url}/ajaxfiles/account_list.php`, param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        prop.setLogin("true");
        navigate("/");
      }
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        liveMT5AccountList.data = res.data.mt5_accounts;
        setLiveMT5AccountList({ ...liveMT5AccountList });
        console.log("mt5Account", liveMT5AccountList.data[0].mt5_acc_no);
        setLiveMT5Account(liveMT5AccountList.data[0].mt5_acc_no);
        // console.log('mt5Account', mt5Account);
        fetchMT5AccountDetaiils(liveMT5AccountList.data[0].mt5_acc_no);
      }
    });
  };
  console.log("liveMT5AccountList.data", liveMT5AccountList);
  const fetchMT5AccountDetaiils = async (mt5_acc_no = "", type = "") => {
    // console.log('mt5Account', mt5Account);
    if (type == "live") {
      setLiveMT5AccountLoader(true);
      setLiveMT5AccountIndex(
        liveMT5AccountList.data.findIndex((x) => x.mt_code == mt5_acc_no)
      );
    }

    if (type == "demo") {
      setDemoMT5AccountLoader(true);
      setDemoMT5AccountIndex(
        demoMT5AccountList.data.findIndex((x) => x.mt_code == mt5_acc_no)
      );
    }
    const param = new FormData();
    param.append("action", "get_mt5_ac_details");
    param.append("mt5_acc_no", mt5_acc_no);
    /* if (mt5_acc_no != "") {
    } else {
      param.append("mt5_acc_no", liveMT5Account);
    } */
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    await axios.post(`${Url}/ajaxfiles/account_list.php`, param).then((res) => {
      if (res.data.message == "Session has been expired") {
        navigate("/");
        localStorage.setItem("login", true);
        prop.setLogin("true");
      }
      if (type == "live") {
        setLiveMT5AccountLoader(false);
      }

      if (type == "demo") {
        setDemoMT5AccountLoader(false);
      }
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        if (type == "live") {
          setLiveAccountDetails({ ...res.data.data });
        }

        if (type == "demo") {
          setDemoAccountDetails({ ...res.data.data });
        }
      }
    });
  };

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
                <Grid item sm={11}></Grid>
                <Grid item xl={1}></Grid>
                <Grid item xl={10} md={12} lg={12}>
                  {/* <TopButton />
                  <ProgresBar step={prefrence.step_number} /> */}
                  {/* <div
                    className={`w-100 mb-4 display-4 font-weight-bold margin-bottom-zero main-heading ${
                      prefrence.is_ib_account == 0 ? "marginBottom10px" : ""
                    }`}
                  >
                    {t("Dashboard")}
                  </div> */}
                  <div>
                    {/* <Grid container sx={{ justifyContent: "center" }}>
                      <Grid item md={12}>
                        <div className="row1 boxSection">
                          {prefrence.is_ib_account == "1" ? (
                            <>
                              <div className="card padding-9 animate fadeLeft boxsize">
                                <div className="row">
                                  <div className="col s12 m12 text-align-center">
                                    <h5 className="mb-0">
                                      ${prefrence.balance}
                                    </h5>
                                    <p className="no-margin font-weight-700 text-uppercase">
                                      Total balance
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="card padding-9 animate fadeLeft boxsize">
                                <div className="row">
                                  <div className="col s12 m12 text-align-center">
                                    <h5 className="mb-0">
                                      ${prefrence.earning}
                                    </h5>
                                    <p className="no-margin font-weight-700 text-uppercase">
                                      Total Earnings
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="card padding-9 animate fadeLeft boxsize">
                                <div className="row">
                                  <div className="col s12 m12 text-align-center">
                                    <h5 className="mb-0">
                                      {prefrence.user_target}
                                    </h5>
                                    <p className="no-margin font-weight-700 text-uppercase">
                                      User Target
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </Grid>
                    </Grid> */}
                  </div>
                  <Grid container spacing={6}>
                    <Grid item md={12} sx={{ paddingTop: "15px !important" }}>
                      <Paper
                        elevation={2}
                        sx={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "10px",
                          // backgroundImage:"url(/image/screenImage.jpg)"
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
                            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                            index={activeStep}
                            onChangeIndex={handleStepChange}
                            onClick={selsectImage}
                            enableMouseEvents
                          >
                            {bonusImage.map((step, index) => (
                              <div key={step.bonus_title}>
                                {Math.abs(activeStep - index) <= 2 ? (
                                  <Box
                                    component="img"
                                    sx={{
                                      height: 141,
                                      display: "flex",
                                      borderRadius: "10px",
                                      // maxWidth: 2200,
                                      overflow: "hidden",
                                      width: "100%",
                                    }}
                                    src={step.bonus_offer_image}
                                    alt={step.bonus_title}
                                  />
                                ) : null}
                              </div>
                            ))}
                          </AutoPlaySwipeableViews>
                          <MobileStepper
                            steps={maxSteps}
                            sx={{ height: "39px", borderRadius: "10px" }}
                            position="static"
                            activeStep={activeStep}
                            nextButton={
                              <Button
                                size="small"
                                onClick={handleNext}
                                sx={{ color: "#1e64b4" }}
                                disabled={activeStep === maxSteps - 1}
                              >
                                Next
                                {theme.direction === "rtl" ? (
                                  <KeyboardArrowLeft />
                                ) : (
                                  <KeyboardArrowRight />
                                )}
                              </Button>
                            }
                            backButton={
                              <Button
                                size="small"
                                onClick={handleBack}
                                disabled={activeStep === 0}
                                sx={{ color: "#1e64b4" }}
                              >
                                {theme.direction === "rtl" ? (
                                  <KeyboardArrowRight />
                                ) : (
                                  <KeyboardArrowLeft />
                                )}
                                Back
                              </Button>
                            }
                          />
                        </Box>
                      </Paper>
                    </Grid>
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
                                setDOpen(true);
                                setAccountType(1);
                                setDrefresh(true);
                              }}
                            >
                              {/* {t("Open Additional Demo Account")} */}
                              Open Real Account
                            </ColorButton>
                          </div>
                        </div>
                        <div className="px-3">
                          <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                            className="tabsBar"
                          >
                            <Tab label="real" />
                            <Tab label="demo" />
                          </Tabs>
                          {/* <Button
                            onClick={() => {
                              checkAccount("real");
                            }}
                          >
                            Real
                          </Button>
                          <Button
                            onClick={() => {
                              checkAccount("demo");
                            }}
                          >
                            Demo
                          </Button> */}
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
                                {checkAccountType.real ? (
                                  <>
                                    {liveMT5AccountList.data.map((val, ind) => {
                                      if (val.account_type == "Live")
                                        return (
                                          <>
                                            <div className="account-data-main w-100">
                                              <div className="accunt-data1 mb-3">
                                                <div
                                                  style={{
                                                    backgroundColor: "#5D2067",
                                                    borderRadius: "2px",
                                                    fontWeight: "500",
                                                    color: "white",
                                                  }}
                                                  className="px-2"
                                                >
                                                  {val.account_type}
                                                </div>
                                                <div
                                                  style={{
                                                    backgroundColor:
                                                      "rgb(84 82 82)",
                                                    borderRadius: "2px",
                                                    fontWeight: "500",
                                                    color: "white",
                                                  }}
                                                  className="px-2"
                                                >
                                                  {val.platform}
                                                </div>
                                                <div className="mx-3">
                                                  <span
                                                    style={{
                                                      fontWeight: "700",
                                                    }}
                                                  >
                                                    Standard
                                                  </span>

                                                  <span> : {val.mt_code}</span>
                                                </div>
                                                <div className="mx-3">
                                                  <span
                                                    style={{
                                                      fontWeight: "700",
                                                    }}
                                                  >
                                                    Leverage
                                                  </span>{" "}
                                                  <span> : (1:500)</span>
                                                </div>
                                                <div className="mx-3">
                                                  <span
                                                    style={{
                                                      fontWeight: "700",
                                                    }}
                                                  >
                                                    Credit
                                                  </span>
                                                  <span> : 0.00 USD</span>
                                                </div>
                                                <div className="mx-3">
                                                  <span
                                                    style={{
                                                      fontWeight: "700",
                                                    }}
                                                  >
                                                    Free Margin
                                                  </span>
                                                  <span> : 0.00 USD</span>
                                                </div>
                                              </div>
                                              <div className="accunt-data2 d-flex w-100">
                                                <div className="item1">
                                                  0.00 USD
                                                </div>
                                                <div className="item2 d-flex">
                                                  <button className="item2-item1 d-flex mx-1 btn-costom">
                                                    <div>
                                                      <DownloadIcon />
                                                    </div>
                                                    <div className="mx-2">
                                                      <NavLink
                                                        to="/internal_transfer"
                                                        className="wiblack"
                                                        style={{
                                                          fontWeight: "500",
                                                        }}
                                                      >
                                                        Deposit
                                                      </NavLink>
                                                    </div>
                                                  </button>
                                                  {/* <button className="item2-item2 mx-1 btn-costom">
                                                    Trade
                                                  </button> */}
                                                  <ColorButton className="item2-item2 mx-1 btn-costom">
                                                    Trade
                                                  </ColorButton>
                                                  <div className="item2-item3 mx-2">
                                                    <FormControl
                                                      variant="standard"
                                                      sx={{
                                                        m: 1,
                                                        minWidth: 120,
                                                      }}
                                                      className="d-flex"
                                                    >
                                                      {/* <InputLabel id="demo-customized-select-label">
                                          <SettingsIcon />
                                          </InputLabel> */}
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
                                                          <BootstrapInputs />
                                                        }
                                                      >
                                                        <MenuItem
                                                          value={"withdraw"}
                                                        >
                                                          <NavLink
                                                            to="/withdrawal"
                                                            style={{
                                                              color: "black",
                                                              fontWeight: "500",
                                                            }}
                                                          >
                                                            Withdraw
                                                          </NavLink>
                                                        </MenuItem>
                                                        <MenuItem
                                                          value={
                                                            "transfer_funds"
                                                          }
                                                        >
                                                          <NavLink
                                                            to="/internal_transfer"
                                                            style={{
                                                              color: "black",
                                                              fontWeight: "500",
                                                            }}
                                                          >
                                                            Transfer funds
                                                          </NavLink>
                                                        </MenuItem>
                                                        <MenuItem
                                                          value={
                                                            "change_max_leverage"
                                                          }
                                                          onClick={getLeverage}
                                                          style={{
                                                            color: "black",
                                                            fontWeight: "500",
                                                          }}
                                                        >
                                                          Change max leverage
                                                        </MenuItem>
                                                        <MenuItem
                                                          value={
                                                            "account_information"
                                                          }
                                                          style={{
                                                            color: "black",
                                                            fontWeight: "500",
                                                          }}
                                                        >
                                                          Account information
                                                        </MenuItem>
                                                        <MenuItem
                                                          value={
                                                            "change_trading_password"
                                                          }
                                                        >
                                                          <NavLink
                                                            to="/change_password"
                                                            style={{
                                                              color: "black",
                                                              fontWeight: "500",
                                                            }}
                                                          >
                                                            Change trading
                                                            password
                                                          </NavLink>
                                                        </MenuItem>
                                                      </Select>
                                                    </FormControl>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        );
                                    })}
                                  </>
                                ) : (
                                  <>
                                    {liveMT5AccountList.data.map((val, ind) => {
                                      if (val.account_type == "Demo")
                                        return (
                                          <>
                                            <div className="account-data-main w-100">
                                              <div className="accunt-data1 mb-3">
                                                <div
                                                  style={{
                                                    backgroundColor: "#5D2067",
                                                    borderRadius: "2px",
                                                    fontWeight: "500",
                                                    color: "white",
                                                  }}
                                                  className="px-2"
                                                >
                                                  {val.account_type}
                                                </div>
                                                <div
                                                  style={{
                                                    backgroundColor: "#b1b1b1",
                                                    borderRadius: "2px",
                                                    fontWeight: "500",
                                                    color: "white",
                                                  }}
                                                  className="px-2"
                                                >
                                                  {val.platform}
                                                </div>
                                                <div className="mx-3">
                                                  <span>Standard</span>/
                                                  <span>{val.mt_code}</span>
                                                </div>
                                                <div className="mx-3">
                                                  <span>Leverage</span>/
                                                  <span>0.00$</span>
                                                </div>
                                                <div className="mx-3">
                                                  <span>Credit</span>/
                                                  <span>0.00$</span>
                                                </div>
                                                <div className="mx-3">
                                                  <span>MARGIN FREE</span>/
                                                  <span>0.00$</span>
                                                </div>
                                              </div>
                                              <div className="accunt-data2 d-flex w-100">
                                                <div className="item1">
                                                  0.00 USD
                                                </div>
                                                <div className="item2 d-flex">
                                                  <button className="item2-item1 d-flex mx-1 btn-costom">
                                                    <div>
                                                      <DownloadIcon />
                                                    </div>
                                                    <div className="mx-2">
                                                      <NavLink
                                                        to="/internal_transfer"
                                                        className="wiblack"
                                                        style={{
                                                          fontWeight: "500",
                                                        }}
                                                      >
                                                        Deposit
                                                      </NavLink>
                                                    </div>
                                                  </button>
                                                  <button className="item2-item2 mx-1 btn-costom">
                                                    Trade
                                                  </button>
                                                  <div className="item2-item3 mx-2">
                                                    <FormControl
                                                      variant="standard"
                                                      sx={{
                                                        m: 1,
                                                        minWidth: 120,
                                                      }}
                                                      className="d-flex"
                                                    >
                                                      {/* <InputLabel id="demo-customized-select-label">
                                        <SettingsIcon />
                                      </InputLabel> */}
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
                                                          <BootstrapInputs />
                                                        }
                                                      >
                                                        <MenuItem value="">
                                                          <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem
                                                          value={"withdraw"}
                                                        >
                                                          <NavLink
                                                            to="/withdrawal"
                                                            style={{
                                                              color: "black",
                                                              fontWeight: "500",
                                                            }}
                                                          >
                                                            Withdraw
                                                          </NavLink>
                                                        </MenuItem>
                                                        <MenuItem
                                                          value={
                                                            "transfer_funds"
                                                          }
                                                        >
                                                          <NavLink
                                                            to="/internal_transfer"
                                                            style={{
                                                              color: "black",
                                                              fontWeight: "500",
                                                            }}
                                                          >
                                                            Transfer funds
                                                          </NavLink>
                                                        </MenuItem>
                                                        <MenuItem
                                                          value={
                                                            "change_max_leverage"
                                                          }
                                                          onClick={getLeverage}
                                                          style={{
                                                            color: "black",
                                                            fontWeight: "500",
                                                          }}
                                                        >
                                                          Change max leverage
                                                        </MenuItem>
                                                        <MenuItem
                                                          value={
                                                            "account_information"
                                                          }
                                                          style={{
                                                            color: "black",
                                                            fontWeight: "500",
                                                          }}
                                                        >
                                                          Account information
                                                        </MenuItem>
                                                        <MenuItem
                                                          value={
                                                            "change_trading_password"
                                                          }
                                                        >
                                                          <NavLink
                                                            to="/change_password"
                                                            style={{
                                                              color: "black",
                                                              fontWeight: "500",
                                                            }}
                                                          >
                                                            Change trading
                                                            password
                                                          </NavLink>
                                                        </MenuItem>
                                                      </Select>
                                                    </FormControl>
                                                  </div>
                                                </div>
                                              </div>
                                              <Dialog
                                                open={clOpen}
                                                onClose={() => {
                                                  console.log(
                                                    "dssfasdd",
                                                    clOpen
                                                  );

                                                  setCLOpen(false);
                                                }}
                                                scroll="paper"
                                                maxWidth="xs"
                                                fullWidth={true}
                                                // aria-labelledby="scroll-dialog-title"
                                                // aria-describedby="scroll-dialog-description"
                                              >
                                                <div
                                                  id="form-dialog-title"
                                                  className="d-flex align-items-center p-3"
                                                >
                                                  <h5 className="w-100 text-center custom-text-color m-0 font-weight-bold">
                                                    Change Leverage
                                                  </h5>
                                                  <Button
                                                    onClick={() =>
                                                      setCLOpen(false)
                                                    }
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
                                                        <Grid
                                                          container
                                                          spacing={3}
                                                        >
                                                          <Grid item md={12}>
                                                            <FormControl className="w-100">
                                                              {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
                                                              <label
                                                                htmlFor="accountNo"
                                                                className="text-info font-weight-bold form-label-head w-100 required"
                                                              >
                                                                Leverage
                                                              </label>
                                                              <Select
                                                                value={age}
                                                                onChange={
                                                                  handleChange
                                                                }
                                                                displayEmpty
                                                                inputProps={{
                                                                  "aria-label":
                                                                    "Without label",
                                                                }}
                                                                input={
                                                                  <BootstrapInput />
                                                                }
                                                              >
                                                                <MenuItem value="">
                                                                  Select Option
                                                                </MenuItem>
                                                                {leveragesList.data.map(
                                                                  (item) => {
                                                                    return (
                                                                      <MenuItem
                                                                        value={
                                                                          item.leverage_value
                                                                        }
                                                                      >
                                                                        {
                                                                          item.leverage_data
                                                                        }
                                                                      </MenuItem>
                                                                    );
                                                                  }
                                                                )}
                                                              </Select>
                                                            </FormControl>
                                                          </Grid>
                                                        </Grid>
                                                        <Grid
                                                          container
                                                          spacing={3}
                                                        >
                                                          <Grid
                                                            item
                                                            md={12}
                                                            className="text-center my-3"
                                                          >
                                                            {changeleverageLoader ? (
                                                              <ColorButton
                                                                variant="contained"
                                                                className="m-auto p-3 text-center text-capitalize disabled-transfar-button"
                                                                sx={{
                                                                  padding:
                                                                    "23px 91px !important",
                                                                }}
                                                                disabled
                                                              >
                                                                <svg
                                                                  class="spinner"
                                                                  viewBox="0 0 50 50"
                                                                >
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
                                                              <ColorButton
                                                                onClick={
                                                                  changeLeverage
                                                                }
                                                              >
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
                                            </div>
                                          </>
                                        );
                                    })}
                                  </>
                                )}
                              </TabPanel>
                            </SwipeableViews>
                            <Dialog
                              open={clOpen}
                              onClose={() => {
                                console.log("dssfasdd", clOpen);

                                setCLOpen(false);
                              }}
                              scroll="paper"
                              maxWidth="xs"
                              fullWidth={true}
                              // aria-labelledby="scroll-dialog-title"
                              // aria-describedby="scroll-dialog-description"
                            >
                              <div
                                id="form-dialog-title"
                                className="d-flex align-items-center p-3"
                              >
                                <h5 className="w-100 text-center custom-text-color m-0 font-weight-bold">
                                  Change Leverage
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
                                            {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
                                            <label
                                              htmlFor="accountNo"
                                              className="text-info font-weight-bold form-label-head w-100 required"
                                            >
                                              Leverage
                                            </label>
                                            <Select
                                              value={age}
                                              onChange={handleChange}
                                              displayEmpty
                                              inputProps={{
                                                "aria-label": "Without label",
                                              }}
                                              input={<BootstrapInput />}
                                            >
                                              <MenuItem value="">
                                                Select Option
                                              </MenuItem>
                                              {leveragesList.data.map(
                                                (item) => {
                                                  return (
                                                    <MenuItem
                                                      value={
                                                        item.leverage_value
                                                      }
                                                    >
                                                      {item.leverage_data}
                                                    </MenuItem>
                                                  );
                                                }
                                              )}
                                            </Select>
                                          </FormControl>
                                        </Grid>
                                      </Grid>
                                      <Grid container spacing={3}>
                                        <Grid
                                          item
                                          md={12}
                                          className="text-center my-3"
                                        >
                                          {changeleverageLoader ? (
                                            <ColorButton
                                              variant="contained"
                                              className="m-auto p-3 text-center text-capitalize disabled-transfar-button"
                                              sx={{
                                                padding: "23px 91px !important",
                                              }}
                                              disabled
                                            >
                                              <svg
                                                class="spinner"
                                                viewBox="0 0 50 50"
                                              >
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
                                            <ColorButton
                                              onClick={changeLeverage}
                                            >
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
                          </div>
                        )}
                      </Paper>
                    </Grid>
                    {/* <Grid item md={6} className="trading-accounts-wrapper ">
                      <Paper
                        elevation={2}
                        style={{ borderRadius: "10px" }}
                        className="trading-accounts-container"
                      >
                        <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                          <div>
                            <h5 className="font-weight-bold mb-0 text-dark">
                              {t("Demo Account")}
                            </h5>
                          </div>
                        </div>
                        <div className="divider"></div>
                        {demoMT5AccountLoader ? (
                          <div className="card-body position-relative pt-0 get-mt5-account-details">
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
                          <div className="card-body position-relative pt-0">
                            {demoMT5AccountList.data.length == 0 ? (
                              <div className="loader">
                                <ColorButton
                                  variant="contained"
                                  size="large"
                                  className="centerLoader"
                                  onClick={() => {
                                    setDOpen(true);
                                    setAccountType(0);
                                    setDrefresh(true);
                                  }}
                                >
                                  Open Demo Account
                                </ColorButton>
                              </div>
                            ) : (
                              ""
                            )}

                            <Grid
                              container
                              spacing={3}
                              sx={{ marginTop: "12px" }}
                            >
                              <Grid
                                item
                                md={3}
                                className="remove-pending-top-0"
                              >
                                <FormControl className="form-control py-3 cust-select remove-pending-0">
                                  <label
                                    htmlFor="accountNo"
                                    className="text-info font-weight-bold form-label-head w-100"
                                  >
                                    {t("ACCOUNT NO")}
                                  </label>
                                  <Select
                                    value={demoMT5Account}
                                    className="account_dropdown_list"
                                    onChange={(e) => {
                                      setDemoMT5Account(e.target.value);
                                      fetchMT5AccountDetaiils(
                                        e.target.value,
                                        "demo"
                                      );
                                    }}
                                    displayEmpty
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                    input={<BootstrapInput1 />}
                                  >
                                    {demoMT5AccountList.data.map((item) => {
                                      return (
                                        <MenuItem value={item.mt_code}>
                                          {item.mt_code}
                                        </MenuItem>
                                      );
                                    })}

                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid
                                item
                                md={3}
                                className="remove-pending-top-0"
                              >
                                <FormControl className="form-control py-3 remove-pending-0">
                                  <label
                                    htmlFor="accountNo"
                                    className="text-info font-weight-bold form-label-head w-100"
                                  >
                                    {t("ACCOUNT TYPE")}
                                  </label>
                                  <label
                                    htmlFor=""
                                    className="text-dark font-weight-bold w-100 text-uppercase"
                                  >
                                    {demoMT5AccountList.data[
                                      demoMT5AccountIndex
                                    ]
                                      ? demoMT5AccountList.data[
                                          demoMT5AccountIndex
                                        ].account_type
                                      : ""}
                                  </label>
                                </FormControl>
                              </Grid>
                              <Grid
                                item
                                md={3}
                                className="remove-pending-top-0"
                              >
                                <FormControl className="form-control py-3 remove-pending-0">
                                  <label
                                    htmlFor="accountNo"
                                    className="text-info font-weight-bold form-label-head w-100"
                                  >
                                    {t("LEVERAGE")}
                                  </label>
                                  <label
                                    htmlFor=""
                                    className="text-dark font-weight-bold w-100 text-uppercase"
                                  >
                                    {demoAccountDetails.leverage}
                                  </label>
                                </FormControl>
                              </Grid>
                              <Grid
                                item
                                md={3}
                                className="remove-pending-top-0"
                              >
                                <FormControl className="form-control py-3 remove-pending-0">
                                  <label
                                    htmlFor="accountNo"
                                    className="text-info font-weight-bold form-label-head w-100"
                                  >
                                    {t("PLATFORM")}
                                  </label>
                                  <label
                                    htmlFor=""
                                    className="text-dark font-weight-bold w-100 text-uppercase"
                                  >
                                    {demoMT5AccountList.data[
                                      demoMT5AccountIndex
                                    ]
                                      ? demoMT5AccountList.data[
                                          demoMT5AccountIndex
                                        ].platform
                                      : ""}
                                  </label>
                                </FormControl>
                              </Grid>
                              <hr style={{ marginLeft: "21px" }} />
                              <Grid
                                item
                                md={3}
                                className="remove-pending-top-0"
                              >
                                <FormControl className="form-control">
                                  <label
                                    htmlFor="accountNo"
                                    className="text-info font-weight-bold form-label-head w-100"
                                  >
                                    {t("BALANCE")}
                                  </label>
                                  <label
                                    htmlFor=""
                                    className="text-dark font-weight-bold w-100 text-uppercase"
                                  >
                                    {demoAccountDetails.mt_balance}
                                  </label>
                                </FormControl>
                              </Grid>
                              <Grid
                                item
                                md={3}
                                className="remove-pending-top-0"
                              >
                                <FormControl className="form-control">
                                  <label
                                    htmlFor="accountNo"
                                    className="text-info font-weight-bold form-label-head w-100"
                                  >
                                    {t("EQUITY")}
                                  </label>
                                  <label
                                    htmlFor=""
                                    className="text-dark font-weight-bold w-100 text-uppercase"
                                  >
                                    {demoAccountDetails.mt_equity}
                                  </label>
                                </FormControl>
                              </Grid>
                              <Grid
                                item
                                md={3}
                                className="remove-pending-top-0"
                              >
                                <FormControl className="form-control">
                                  <label
                                    htmlFor="accountNo"
                                    className="text-info font-weight-bold form-label-head w-100"
                                  >
                                    {t("CREDIT")}
                                  </label>
                                  <label
                                    htmlFor=""
                                    className="text-dark font-weight-bold w-100 text-uppercase"
                                  >
                                    {demoAccountDetails.mt_credit}
                                  </label>
                                </FormControl>
                              </Grid>
                              <Grid
                                item
                                md={3}
                                className="remove-pending-top-0"
                              >
                                <FormControl className="form-control">
                                  <label
                                    htmlFor="accountNo"
                                    className="text-info font-weight-bold form-label-head w-100"
                                  >
                                    {t("MARGIN FREE")}
                                  </label>
                                  <label
                                    htmlFor=""
                                    className="text-dark font-weight-bold w-100 text-uppercase"
                                  >
                                    {demoAccountDetails.mt_free_margin}
                                  </label>
                                </FormControl>
                              </Grid>
                              <hr style={{ marginLeft: "21px" }} />
                              <Grid
                                item
                                md={12}
                                className="textCenter remove-pending-top-0"
                              >
                                <ColorButton
                                  size="large"
                                  onClick={() => {
                                    setDOpen(true);
                                    setAccountType(0);
                                    setDrefresh(true);
                                  }}
                                >
                                  {t("Open Additional Demo Account")}
                                </ColorButton>
                                {Dopen ? (
                                  <OpenDemoModel
                                    setDOpen={setDOpen}
                                    Dopen={Dopen}
                                    type={accountType}
                                    refresh={setDrefresh}
                                  />
                                ) : (
                                  ""
                                )}
                              </Grid>
                            </Grid>
                          </div>
                        )}
                      </Paper>
                    </Grid> */}
                  </Grid>
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
                            <Grid item md={12} className="d-flex">
                              <Grid item md={3}>
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
                              <Grid
                                className="d-flex justify-content-center align-items-center"
                                item
                                md={9}
                                sx={{ width: "100%" }}
                              >
                                <FormControl>
                                  <a
                                    className="text-center text-dark"
                                    href={`mailto:${prefrence.manager_details.manager_email}}`}
                                  >
                                    <MailOutlineIcon />
                                    {prefrence.manager_details.manager_email}
                                  </a>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>
                        </div>
                      </Paper>
                    </Grid>
                    {/* <Grid item md={8}>
                      <Paper
                        elevation={2}
                        sx={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "10px",
                          // backgroundImage:"url(/image/screenImage.jpg)"
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
                            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                            index={activeStep}
                            onChangeIndex={handleStepChange}
                            onClick={selsectImage}
                            enableMouseEvents
                          >
                            {bonusImage.map((step, index) => (
                              <div key={step.bonus_title}>
                                {Math.abs(activeStep - index) <= 2 ? (
                                  <Box
                                    component="img"
                                    sx={{
                                      height: 228,
                                      display: "flex",
                                      borderRadius: "10px",
                                      // maxWidth: 2200,
                                      overflow: "hidden",
                                      width: "100%",
                                    }}
                                    src={step.bonus_offer_image}
                                    alt={step.bonus_title}
                                  />
                                ) : null}
                              </div>
                            ))}
                          </AutoPlaySwipeableViews>
                          <MobileStepper
                            steps={maxSteps}
                            sx={{ height: "39px", borderRadius: "10px" }}
                            position="static"
                            activeStep={activeStep}
                            nextButton={
                              <Button
                                size="small"
                                onClick={handleNext}
                                sx={{ color: "#1e64b4" }}
                                disabled={activeStep === maxSteps - 1}
                              >
                                Next
                                {theme.direction === "rtl" ? (
                                  <KeyboardArrowLeft />
                                ) : (
                                  <KeyboardArrowRight />
                                )}
                              </Button>
                            }
                            backButton={
                              <Button
                                size="small"
                                onClick={handleBack}
                                disabled={activeStep === 0}
                                sx={{ color: "#1e64b4" }}
                              >
                                {theme.direction === "rtl" ? (
                                  <KeyboardArrowRight />
                                ) : (
                                  <KeyboardArrowLeft />
                                )}
                                Back
                              </Button>
                            }
                          />
                        </Box>
                      </Paper>
                    </Grid> */}
                  </Grid>
                  <Grid container spacing={6} className="paddind-43">
                    <Grid item md={12}>
                      <div className="w-100 mb-5">
                        <div className="text-center">
                          <h5 className="font-weight-bold mb-0 text-dark mb-2">
                            {t("Add Funds")}
                          </h5>
                          <h6 className="font-weight-bold mb-0 text-dark mb-3">
                            {
                              "Choose a payment method to add funds into your account"
                            }
                          </h6>
                        </div>
                        <div className="payment-options pt-3 justify-content-center">
                          <a>
                            <img
                              src="./paymetImage/mastercardsecurecode.png"
                              alt=""
                              className="imgdes"
                            />
                          </a>
                          <a>
                            <img
                              src="./paymetImage/WireTransfer.png"
                              alt=""
                              className="imgdes"
                            />
                          </a>
                          <a>
                            <img
                              src="./paymetImage/visa.png"
                              alt=""
                              className="imgdes"
                            />
                          </a>
                          <a>
                            <img
                              src="./paymetImage/neteller.png"
                              alt=""
                              className="imgdes"
                            />
                          </a>
                          <a>
                            <img
                              src="./paymetImage/mastercard.png"
                              alt=""
                              className="imgdes"
                            />
                          </a>

                          <a>
                            <img
                              src="./paymetImage/skrill.png"
                              alt=""
                              className="imgdes"
                            />
                          </a>
                          <a>
                            <img
                              src="./paymetImage/cashu.png"
                              alt=""
                              className="imgdes"
                            />
                          </a>
                          <a>
                            <img
                              src="./paymetImage/visasecure.png"
                              alt=""
                              className="imgdes"
                            />
                          </a>
                          {/* import {mastercards,wiret,visa,neteller,mastercard,visas,skrill,cashu} from "./paymetImage" */}
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          )}
          <Dialog
            open={openModel}
            onClose={handleClose}
            // aria-labelledby="alert-dialog-title"
            // aria-describedby="alert-dialog-description"
            style={{
              opacity: "1",
              transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            }}
            PaperProps={{
              sx: {
                width: "25%",
                maxWidth: "768px",
                borderRadius: "10px",
                elevation: "24",
                className: "border border-bottom-0",
              },
            }}
          >
            <DialogTitle
              id="alert-dialog-title"
              className="d-flex align-items-center p-3"
              style={{ borderBottom: "none" }}
            >
              <ConfirmationNumberOutlinedIcon className="text-primary" />
              <h5 className="ml-3 w-100 text-start mt-2 mb-2 font-weight-bold">
                {dialogData.bonus_title}
              </h5>
              <CloseIcon
                onClick={() => {
                  setOpenModel(false);
                }}
              />
            </DialogTitle>
            <DialogContent className="create-account-content ml-4">
              <Grid
                container
                spacing={2}
                className="MuiGrid-justify-xs-space-between mt-2"
              >
                <FormControl className="w-100">
                  <label
                    htmlFor="upitype"
                    className="text-info font-weight-bold form-label-head w-100  required"
                  >
                    Live Account
                  </label>
                  <Select
                    value={bonusMt5.mt5}
                    name="upi_name"
                    onChange={(e) => {
                      bonusMt5.mt5 = e.target.value;
                      setBonusMt5({ ...bonusMt5 });
                    }}
                    // disabled={!sendOtp}
                    displayEmpty
                    inputProps={{
                      "aria-label": "Without label",
                    }}
                    input={<BootstrapInput />}
                    className="mt-0 ml-0"
                    style={{ width: "100%" }}
                  >
                    {bonusData.mt5Account.map((item, index) => {
                      return (
                        <MenuItem value={item.mt5_acc_no}>
                          {item.mt5_acc_no}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                container
                spacing={2}
                sx={{ justifyContent: "end" }}
                className="MuiGrid-justify-xs-space-between mt-4"
              >
                {bonusMt5.isLoder == true ? (
                  <Button
                    className="ml-4 text-capitalize"
                    sx={{ padding: "7px 50px" }}
                    disabled
                  >
                    <svg
                      className="spinner"
                      style={{ position: "unset" }}
                      viewBox="0 0 50 50"
                    >
                      <circle
                        className="path"
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        strokeWidth="5"
                      ></circle>
                    </svg>
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    size="medium"
                    className="ml-4 text-capitalize p-3 pl-4 pr-4"
                    onClick={submitBonus}
                  >
                    Activate
                  </Button>
                )}
              </Grid>
            </DialogContent>
          </Dialog>
          <OpenDemoModel
            setDOpen={setVerifyModal}
            // Dopen={prefrence.step_number == "2" ? true : false}
            Dopen={localStorage.getItem("step") == 1 ? verifyModal : false}
            type={prefrence.step_number == "1" ? 1 : 0}
            refresh={setDrefresh}
          />

          <Dialog
            open={
              prefrence.step_number == "1" || localStorage.getItem("step") == 1
                ? false
                : verifyModal
            }
            onClose={() => {
              setVerifyModal(false);
              localStorage.setItem("setModel", false);
            }}
          >
            <Button
              sx={{ position: "absolute", right: "0px", color: "#e0e0e0" }}
              onClick={() => {
                setVerifyModal(false);
                localStorage.setItem("setModel", false);
              }}
            >
              <CloseIcon />
            </Button>
            <div className="p-4 text-center">
              <h4 className="font-size-lg font-weight-bold my-2">
                {prefrence.step_number == 0
                  ? "Complete Profile"
                  : prefrence.step_number == 1
                  ? "Open Account"
                  : prefrence.step_number == 2
                  ? " Upload KYC"
                  : prefrence.step_number == 3
                  ? "Deposit Funds"
                  : "Start Trading"}
              </h4>
              <div className="text-center my-4">
                {prefrence.step_number == 0
                  ? "Complete your Profile"
                  : prefrence.step_number == 1
                  ? "Open Your Live Account"
                  : prefrence.step_number == 2
                  ? " Upload Your KYC Document"
                  : prefrence.step_number == 3
                  ? "Deposit Your Funds In Wallet Or Mt5"
                  : "Start Trading with RightFx"}
              </div>
            </div>
            <div>
              <ColorButton
                variant="contained"
                className="skipButton"
                onClick={() => {
                  setVerifyModal(false);
                  localStorage.setItem("setModel", false);
                }}
              >
                Skip
              </ColorButton>
              <ColorButton
                variant="contained"
                className="continueButton"
                onClick={continueButton}
              >
                Continue
              </ColorButton>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
