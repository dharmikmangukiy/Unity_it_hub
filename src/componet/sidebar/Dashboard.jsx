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
  const [clOpenAccount, setClOpenAccount] = React.useState(false);
  const [metaTrader, setMetaTrader] = useState(false);
  const [clOpenTrade, setClOpenTrade] = React.useState(false);
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
  console.log("mt5AndDemoList", mt5AndDemoList);
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
          // toast.error(res.data.message);
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
  const getTrade = async () => {
    setClOpenTrade(true);
  };
  const DropWindow = () => {
    console.log("okk");
    if (metaTrader == true) {
      setMetaTrader(false);
    } else {
      setMetaTrader(true);
    }
  };
  const getAccount = async () => {
    // const param = new FormData();
    // param.append("action", "get_leverages");
    // if (IsApprove !== "") {
    //   param.append("is_app", IsApprove.is_app);
    //   param.append("user_id", IsApprove.user_id);
    //   param.append("auth_key", IsApprove.auth);
    // }
    // await axios.post(`${Url}/ajaxfiles/account_list.php`, param).then((res) => {
    //   if (res.data.message == "Session has been expired") {
    //     navigate("/");
    //   }
    //   if (res.data.status == "error") {
    //     toast.error(res.data.message);
    //   } else {
    //     leveragesList.data = res.data.leverages;
    //     setLeveragesList({ ...leveragesList });
    //   }
    // });
    setClOpenAccount(true);
  };
  const changeLeverage = async () => {
    if (age == "") {
      toast.error("Please select leverage");
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
          console.log("Prefrence", prefrence);
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
      // getLeverage();
    }
    if (event.target.value == "account_information") {
      getAccount();
    }
  };
  const handleChanges = (e, newValue) => {
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
            <span className="loader2"></span>
          ) : (
            // <div className="loader1">
            //   <div className="clock">
            //     <div className="pointers"></div>
            //   </div>
            // </div>
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
                          {/* <MobileStepper
                            steps={maxSteps}
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
                          /> */}
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
                                  setAccountType(1);
                                  setDrefresh(true);
                                } else {
                                  setDOpen(true);
                                  setAccountType(1);
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
                                                  {/* {val.platform} */}
                                                  MT5
                                                </div>
                                              </div>
                                              <div className="d-flex align-items-center">
                                                <div className="mx-3 s_mx">
                                                  <span className="fw-700">
                                                    Standard :{" "}
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
                                                <button className="b-hover item2-item2 d-flex mr btn-costom btn-36">
                                                  <div>
                                                    <DownloadIcon />
                                                  </div>
                                                  <div className="mx-2">
                                                    <NavLink
                                                      to={`/deposit/${val.mt5_acc_no}`}
                                                      className="wiblack "
                                                      style={{
                                                        fontWeight: "500",
                                                      }}
                                                    >
                                                      Deposit
                                                    </NavLink>
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
                                                      >
                                                        <NavLink
                                                          to={`/withdrawal/${val.mt5_acc_no}`}
                                                          style={{
                                                            color: "black",
                                                            fontWeight: "500",
                                                          }}
                                                        >
                                                          Withdraw
                                                        </NavLink>
                                                      </MenuItem>
                                                      <MenuItem
                                                        value={"transfer_funds"}
                                                      >
                                                        <NavLink
                                                          to={`/internal_transfer/${val.mt5_acc_no}`}
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
                                                        onClick={() => {
                                                          mt5AndDemoList.value =
                                                            val;
                                                          setMt5AndDemoList({
                                                            ...mt5AndDemoList,
                                                          });
                                                          setAge(val.leverage);
                                                          getLeverage();
                                                        }}
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
                                                        onClick={(e) => {
                                                          mt5AndDemoList.value =
                                                            val;
                                                          setMt5AndDemoList({
                                                            ...mt5AndDemoList,
                                                          });
                                                          // getAccount();
                                                        }}
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
                                                          to={`/change_password/${val.mt5_acc_no}`}
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
                                                  <span>
                                                    {val.mt5_group_name}
                                                  </span>
                                                  /<span>{val.mt5_acc_no}</span>
                                                </div>
                                                <div className="mx-3 s_mx">
                                                  <span>Leverage : </span>
                                                  <span>{val.leverage}</span>
                                                </div>
                                                <div className="mx-3 s_mx">
                                                  <span>Credit : </span>
                                                  <span>{val.mt_credit}</span>
                                                </div>
                                                <div className="mx-3 s_mx">
                                                  <span>Margin Free : </span>
                                                  <span>
                                                    {val.mt_free_margin}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="accunt-data2 d-flex w-100">
                                              <div className="item1">
                                                {val.mt_balance}
                                              </div>
                                              <div className="item2 d-flex">
                                                {/* <button className="b-hover item2-item2 d-flex mr btn-costom btn-36">
                                                <div>
                                                  <DownloadIcon />
                                                </div>
                                                <div className="mx-2">
                                                  <NavLink
                                                    to="/internal_transfer"
                                                    className="wiblack "
                                                    style={{
                                                      fontWeight: "500",
                                                    }}
                                                  >
                                                    Deposit
                                                  </NavLink>
                                                </div>
                                              </button> */}
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
                                                {/* <div className="item2-item3 mx-2 d-flex justify-content-center align-items-center">
                                                <FormControl
                                                  variant="standard"
                                                  sx={{
                                                    m: 1,
                                                    minWidth: 120,
                                                  }}
                                                  className="d-flex"
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
                                                    input={<BootstrapInputs />}
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
                                                      value={"transfer_funds"}
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
                                                      onClick={getAccount}
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
                                                        Change trading password
                                                      </NavLink>
                                                    </MenuItem>
                                                  </Select>
                                                </FormControl>
                                              </div> */}
                                              </div>
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
                                    {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
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
                        console.log("dssfasdd", clOpenAccount);
                        setClOpenAccount(false);
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
                                <Grid item md={12} className="d-flex">
                                  <Grid item md={5}>
                                    Server
                                  </Grid>
                                  <Grid
                                    item
                                    md={6}
                                    className="d-flex flex-column"
                                  >
                                    <Grid item md={12}>
                                      Rightfx-Live
                                    </Grid>
                                    <Grid
                                      item
                                      md={12}
                                      style={{
                                        fontSize: ".8rem",
                                      }}
                                    >
                                      Right Group Financial Limited
                                    </Grid>
                                  </Grid>
                                  <Grid item md={1}>
                                    <i
                                      class="material-icons position-absolute"
                                      style={{ cursor: "pointer" }}
                                      onClick={(e) => {
                                        navigator.clipboard.writeText(
                                          "Right Group Financial Limited"
                                        );
                                        toast.success(
                                          "Copied to clipboard was successful!"
                                        );
                                      }}
                                    >
                                      content_copy{" "}
                                    </i>
                                  </Grid>
                                </Grid>
                                <Grid item md={12} className="d-flex">
                                  <Grid item md={5}>
                                    MT5 login
                                  </Grid>
                                  <Grid item md={6}>
                                    {mt5AndDemoList.value?.mt5_acc_no}
                                  </Grid>
                                  <Grid item md={1}>
                                    <i
                                      class="material-icons position-absolute"
                                      style={{ cursor: "pointer" }}
                                      onClick={(e) => {
                                        navigator.clipboard.writeText(
                                          mt5AndDemoList.value?.mt5_acc_no
                                        );
                                        toast.success(
                                          "Copied to clipboard was successful!"
                                        );
                                      }}
                                    >
                                      content_copy{" "}
                                    </i>
                                  </Grid>
                                </Grid>
                                {/* <Grid item md={12} className="d-flex">
                                  <Grid item md={5}>
                                    Nickname
                                  </Grid>
                                  <Grid item md={7}>
                                    {mt5AndDemoList.value?.mt5_group_name}
                                  </Grid>
                                </Grid> */}
                                <Grid item md={12} className="d-flex">
                                  <Grid item md={5}>
                                    Type
                                  </Grid>
                                  <Grid item md={7}>
                                    {mt5AndDemoList.value?.mt5_group_name}
                                  </Grid>
                                </Grid>
                                <Grid item md={12} className="d-flex">
                                  <Grid item md={5}>
                                    Actual leverage
                                  </Grid>
                                  <Grid item md={7}>
                                    {mt5AndDemoList.value?.leverage}
                                  </Grid>
                                </Grid>
                                <Grid item md={12} className="d-flex">
                                  <Grid item md={5}>
                                    Maximum leverage
                                  </Grid>
                                  <Grid item md={7}>
                                    {mt5AndDemoList.value?.leverage}
                                  </Grid>
                                </Grid>
                                <Grid item md={12} className="d-flex">
                                  <Grid item md={5}>
                                    Real funds
                                  </Grid>
                                  <Grid item md={7}>
                                    {mt5AndDemoList.value?.mt_balance}
                                  </Grid>
                                </Grid>
                                <Grid item md={12} className="d-flex">
                                  <Grid item md={5}>
                                    Unrealized P&L
                                  </Grid>
                                  <Grid item md={7}>
                                    {mt5AndDemoList.value?.mt_current_profit}
                                  </Grid>
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
                        console.log("dssfasdd", clOpenTrade);
                        setClOpenTrade(false);
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
                                <Grid item md={12} className="d-flex">
                                  <Grid item md={5}>
                                    Server
                                  </Grid>
                                  <Grid
                                    item
                                    md={6}
                                    className="d-flex flex-column"
                                  >
                                    <Grid item md={12}>
                                      Rightfx-Live
                                    </Grid>
                                    <Grid
                                      item
                                      md={12}
                                      style={{ fontSize: ".8rem" }}
                                    >
                                      Right Group Financial Limited
                                    </Grid>
                                  </Grid>
                                  <Grid item md={1}>
                                    <i
                                      class="material-icons position-absolute"
                                      style={{ cursor: "pointer" }}
                                      onClick={(e) => {
                                        navigator.clipboard.writeText(
                                          "Right Group Financial Limited"
                                        );
                                        toast.success(
                                          "Copied to clipboard was successful!"
                                        );
                                      }}
                                    >
                                      content_copy{" "}
                                    </i>
                                  </Grid>
                                </Grid>
                                <Grid item md={12} className="d-flex">
                                  <Grid item md={5}>
                                    MT5 login
                                  </Grid>
                                  <Grid item md={6}>
                                    {mt5AndDemoList.value?.mt5_acc_no}
                                  </Grid>
                                  <Grid item md={1}>
                                    <i
                                      class="material-icons position-absolute"
                                      style={{ cursor: "pointer" }}
                                      onClick={(e) => {
                                        navigator.clipboard.writeText(
                                          mt5AndDemoList.value?.mt5_acc_no
                                        );
                                        toast.success(
                                          "Copied to clipboard was successful!"
                                        );
                                      }}
                                    >
                                      content_copy{" "}
                                    </i>
                                  </Grid>
                                </Grid>
                                <Grid
                                  item
                                  md={12}
                                  className="d-flex trade-MetaTrader DropWindow"
                                >
                                  <Grid item md={1}>
                                    <svg
                                      class="ApplicationLinkIcon_linkIcon__mXipm IconWindows_icon__8cT6h"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M16 0L8 1.5v6h8V0zM0 2.317V7.5h7v-6l-7 .817zM8 8.5V15l8 1V8.5H8zm-8 0v5.183l7 .817v-6H0z"></path>
                                    </svg>
                                  </Grid>
                                  <Grid item md={11}>
                                    <Grid
                                      item
                                      md={12}
                                      style={{ fontSize: "0.8rem" }}
                                    >
                                      MetaTrader5
                                    </Grid>
                                    <Grid
                                      item
                                      md={12}
                                      style={{ fontSize: "0.8rem" }}
                                    >
                                      Install terminal for Windows
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid
                                  item
                                  md={12}
                                  className="d-flex justify-content-center align-items-center"
                                  onClick={DropWindow}
                                >
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
                                </Grid>
                                {metaTrader ? (
                                  <Grid item md={12}>
                                    <Grid
                                      item
                                      md={12}
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
                                          href="https://www.exness.com/webterminal/?login=61402283&amp;trade_server=Exness-MT5Real7"
                                          className="align-item-center main-color d-flex"
                                        >
                                          <svg
                                            class="ApplicationLinkIcon_linkIcon__mXipm IconBrowser_icon__3j-ql"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            style={{ margin: "5px" }}
                                          >
                                            <path
                                              d="M3.96411 6.01877C6.24501 3.17859 9.1707 1.75145 12.8132 2.03555C16.2501 2.30332 18.8263 4.0368 20.682 6.97489H20.4142C19.6006 6.97489 18.7871 6.97457 17.9736 6.97425C16.0209 6.97348 14.0683 6.97271 12.1157 6.97638C10.6577 6.97934 9.39775 7.47929 8.38716 8.54222C7.68077 9.28546 7.24671 10.1726 7.08347 11.1888C7.07943 11.213 7.07431 11.237 7.06679 11.2721C7.06187 11.2951 7.05593 11.3229 7.04859 11.3587C6.00906 9.55991 4.994 7.80269 3.96411 6.01877Z"
                                              fill="black"
                                            ></path>
                                            <path
                                              d="M10.8788 21.9074C11.9057 20.1309 12.9201 18.3766 13.9425 16.609C13.9268 16.6076 13.9151 16.606 13.9061 16.6048C13.8909 16.6028 13.8833 16.6018 13.8772 16.6046C13.8328 16.6198 13.7886 16.6358 13.7443 16.6518C13.7134 16.6631 13.682 16.6744 13.6509 16.6854C12.8125 16.9858 11.9532 17.0481 11.0829 16.8745C9.53877 16.566 8.3909 15.7041 7.6081 14.3459C6.96886 13.2365 6.32922 12.1275 5.68948 11.0184L4.97549 9.78041C4.43977 8.85173 3.90405 7.92305 3.34681 6.95654C1.70031 10.1046 1.50072 13.28 3.09675 16.4495C4.70021 19.6331 7.36843 21.3896 10.8788 21.9074Z"
                                              fill="black"
                                            ></path>
                                            <path
                                              d="M15.0191 7.97343L15.0375 7.99127C15.0755 8.02821 15.0907 8.04302 15.1082 8.05724L15.1745 8.1143C15.2224 8.15542 15.2705 8.19666 15.3181 8.23823C16.2709 9.07864 16.8148 10.1408 16.9706 11.3907C17.1138 12.5426 16.8415 13.613 16.259 14.6166C15.243 16.3658 14.2334 18.1187 13.2238 19.8716C12.8554 20.5112 12.4866 21.1514 12.1179 21.7908C12.0974 21.8269 12.0781 21.8638 12.0588 21.9007L12.037 21.9422L12.043 21.9548L12.0508 21.9711C12.0554 21.9807 12.06 21.9904 12.0645 22C12.2621 21.9755 12.4605 21.9548 12.6588 21.9341C13.0979 21.8882 13.5369 21.8423 13.9677 21.756C16.1729 21.3124 18.0346 20.2524 19.5208 18.556C20.9826 16.8871 21.7973 14.9385 21.9687 12.7303C22.0911 11.1511 21.8551 9.62235 21.2452 8.15367C21.1829 8.00458 21.1094 7.97046 20.9625 7.97046C19.437 7.97402 17.9111 7.97378 16.3854 7.97354L15.0191 7.97343Z"
                                              fill="black"
                                            ></path>
                                            <path
                                              d="M12.0119 15.9567C14.2743 15.9545 15.9586 14.2121 16.0091 11.9698C15.9564 9.72155 14.2654 7.9851 12.009 7.98584C9.75922 7.98584 8.02147 9.7171 8.02295 11.9728C8.02443 14.2344 9.76887 15.959 12.0119 15.9567Z"
                                              fill="black"
                                            ></path>
                                          </svg>
                                          <div></div>
                                          MT5 WebTerminal
                                        </a>
                                      </Grid>
                                      <Grid item md={6}>
                                        <a
                                          rel="noopener noreferrer"
                                          target="_blank"
                                          href="https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/MetaTrader5.dmg"
                                          className="align-item-center main-color d-flex"
                                        >
                                          <svg
                                            class="ApplicationLinkIcon_linkIcon__mXipm IconApple_icon__xSBpv"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            style={{ margin: "5px" }}
                                          >
                                            <path d="M22 17.607c-.786 2.28-3.139 6.317-5.563 6.361-1.608.031-2.125-.953-3.963-.953-1.837 0-2.412.923-3.932.983-2.572.099-6.542-5.827-6.542-10.995 0-4.747 3.308-7.1 6.198-7.143 1.55-.028 3.014 1.045 3.959 1.045.949 0 2.727-1.29 4.596-1.101.782.033 2.979.315 4.389 2.377-3.741 2.442-3.158 7.549.858 9.426zm-5.222-17.607c-2.826.114-5.132 3.079-4.81 5.531 2.612.203 5.118-2.725 4.81-5.531z"></path>
                                          </svg>
                                          <div>MT5 for Mac</div>
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
                                    >
                                      <Grid item md={6}>
                                        <a
                                          rel="noopener noreferrer"
                                          target="_blank"
                                          href="https://download.mql5.com/cdn/web/exness.ltd/mt5/mt5setup.exe?utm_source=exness_website&amp;utm_medium=downloads&amp;utm_campaign=MT5_for_PC"
                                          className="align-item-center main-color d-flex"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="ApplicationLinkIcon_linkIcon__mXipm IconLinux_icon__nPMzj"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            style={{ margin: "5px" }}
                                          >
                                            <path d="M20.581 19.049c-.55-.446-.336-1.431-.907-1.917.553-3.365-.997-6.331-2.845-8.232-1.551-1.595-1.051-3.147-1.051-4.49 0-2.146-.881-4.41-3.55-4.41-2.853 0-3.635 2.38-3.663 3.738-.068 3.262.659 4.11-1.25 6.484-2.246 2.793-2.577 5.579-2.07 7.057-.237.276-.557.582-1.155.835-1.652.72-.441 1.925-.898 2.78-.13.243-.192.497-.192.74 0 .75.596 1.399 1.679 1.302 1.461-.13 2.809.905 3.681.905.77 0 1.402-.438 1.696-1.041 1.377-.339 3.077-.296 4.453.059.247.691.917 1.141 1.662 1.141 1.631 0 1.945-1.849 3.816-2.475.674-.225 1.013-.879 1.013-1.488 0-.39-.139-.761-.419-.988zm-9.147-10.465c-.319 0-.583-.258-1-.568-.528-.392-1.065-.618-1.059-1.03 0-.283.379-.37.869-.681.526-.333.731-.671 1.249-.671.53 0 .69.268 1.41.579.708.307 1.201.427 1.201.773 0 .355-.741.609-1.158.868-.613.378-.928.73-1.512.73zm1.665-5.215c.882.141.981 1.691.559 2.454l-.355-.145c.184-.543.181-1.437-.435-1.494-.391-.036-.643.48-.697.922-.153-.064-.32-.11-.523-.127.062-.923.658-1.737 1.451-1.61zm-3.403.331c.676-.168 1.075.618 1.078 1.435l-.31.19c-.042-.343-.195-.897-.579-.779-.411.128-.344 1.083-.115 1.279l-.306.17c-.42-.707-.419-2.133.232-2.295zm-2.115 19.243c-1.963-.893-2.63-.69-3.005-.69-.777 0-1.031-.579-.739-1.127.248-.465.171-.952.11-1.343-.094-.599-.111-.794.478-1.052.815-.346 1.177-.791 1.447-1.124.758-.937 1.523.537 2.15 1.85.407.851 1.208 1.282 1.455 2.225.227.871-.71 1.801-1.896 1.261zm6.987-1.874c-1.384.673-3.147.982-4.466.299-.195-.563-.507-.927-.843-1.293.539-.142.939-.814.46-1.489-.511-.721-1.555-1.224-2.61-2.04-.987-.763-1.299-2.644.045-4.746-.655 1.862-.272 3.578.057 4.069.068-.988.146-2.638 1.496-4.615.681-.998.691-2.316.706-3.14l.62.424c.456.337.838.708 1.386.708.81 0 1.258-.466 1.882-.853.244-.15.613-.302.923-.513.52 2.476 2.674 5.454 2.795 7.15.501-1.032-.142-3.514-.142-3.514.842 1.285.909 2.356.946 3.67.589.241 1.221.869 1.279 1.696l-.245-.028c-.126-.919-2.607-2.269-2.83-.539-1.19.181-.757 2.066-.997 3.288-.11.559-.314 1.001-.462 1.466zm4.846-.041c-.985.38-1.65 1.187-2.107 1.688-.88.966-2.044.503-2.168-.401-.131-.966.36-1.493.572-2.574.193-.987-.023-2.506.431-2.668.295 1.753 2.066 1.016 2.47.538.657 0 .712.222.859.837.092.385.219.709.578 1.09.418.447.29 1.133-.635 1.49zm-8-13.006c-.651 0-1.138-.433-1.534-.769-.203-.171.05-.487.253-.315.387.328.777.675 1.281.675.607 0 1.142-.519 1.867-.805.247-.097.388.285.143.382-.704.277-1.269.832-2.01.832z"></path>
                                          </svg>
                                          <div>MT5 for Linux</div>
                                        </a>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                ) : null}
                              </Grid>
                            </form>
                          </Grid>
                        </Grid>
                      </DialogContent>
                    </Dialog>
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
                    {/* <Grid item md={4}>
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
                    </Grid> */}
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
          {/* <Dialog
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
          </Dialog> */}
          {/* <OpenDemoModel
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
          </Dialog> */}
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
