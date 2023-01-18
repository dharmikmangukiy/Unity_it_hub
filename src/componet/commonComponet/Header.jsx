import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import i18next, { use } from "i18next";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";
import Menu from "@mui/material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { NavLink, useNavigate } from "react-router-dom";
import "./comon.css";
import { IsApprove, Url } from "../../global";
import NotificationsIcon from "@mui/icons-material/Notifications";
import axios from "axios";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Badge, Collapse, IconButton } from "@mui/material";
import { ColorButton } from "../customComponet/CustomElement";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ReactComponent as Deposit } from "../../svg/deposit.svg";
import { ReactComponent as Web_trader } from "../../svg/web_trader.svg";
import { ReactComponent as Bonus } from "../../svg/bonus.svg";
import { ReactComponent as TradeAndWin } from "../../svg/tradeAndWin.svg";
import { ReactComponent as Ib_application } from "../../svg/ib_application.svg";
import { ReactComponent as Activities } from "../../svg/Activities.svg";
import { ReactComponent as Bank_account } from "../../svg/Bank_account.svg";
import { ReactComponent as Copy_trading } from "../../svg/Copy_trading.svg";
import { ReactComponent as My_documents } from "../../svg/My_documents.svg";
import { ReactComponent as Notifications } from "../../svg/notifications.svg";
import { ReactComponent as Tickits } from "../../svg/tickits.svg";
import { ReactComponent as Profile } from "../../svg/profile.svg";
import { ReactComponent as Setting } from "../../svg/setting123.svg";
import { ReactComponent as User } from "../../svg/user.svg";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
const languages = [
  {
    code: "en",
    name: "English",
    country_code: "gb",
    dir: "ltr",
  },
  {
    code: "ar",
    name: "العربية",
    dir: "rtl",
    country_code: "sa",
  },
  {
    code: "jp",
    name: "日本",
    country_code: "sa",
    dir: "ltr",
  },
  {
    code: "ru",
    name: "русский",
    country_code: "gb",
    dir: "ltr",
  },
  {
    code: "es",
    name: "española",
    country_code: "gb",
    dir: "ltr",
  },
  {
    code: "fa",
    name: "English",
    country_code: "gb",
    dir: "rtl",
  },
  {
    code: "cn",
    name: "English",
    country_code: "gb",
    dir: "ltr",
  },
];
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 9,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "8px 26px 8px 10px",
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
      borderRadius: 9,
      borderColor: "#80bdff",
    },
  },
}));
const Header = (prop) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  // const [moveToib, SetMoveToib] = useState(false);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);

  const [notisLoader, setNotIsLoader] = useState(true);
  const open = Boolean(anchorEl);
  const [open11, setOpen11] = React.useState({
    operation: false,
    trading: false,
    platforms: false,
    contests: false,
    partnership: false,
  });
  const [prefrence, setPrefrence] = useState({});
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick4 = (e) => {
    const name = e.target.classList[0];
    // console.log(name);
    setOpen11((preValue) => {
      return {
        ...preValue,
        [name]: !open11[name],
      };
    });
  };
  const [notedata, setNoteData] = useState([]);
  const notificationdata = () => {
    setNotIsLoader(true);
    const param = new FormData();

    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("action", "recent_notifications");

    axios
      .post(`${Url}/ajaxfiles/notifications_manage.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          prop.setLogin("true");
          navigate("/login");
        }
        setNotIsLoader(false);
        setNoteData(res.data.data);
      });
  };
  const onLogout = async () => {
    await axios.post(Url + "/ajaxfiles/logout.php").then((res) => {
      localStorage.setItem("login", true);
      prop.setLogin("true");
      navigate("/");
    });
  };
  const { t } = useTranslation();

  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  useEffect(() => {
    // console.log(currentLanguage.dir);
    document.body.dir = currentLanguage.dir || "ltr";
    // document.title = t('app_title')
    prop.setClang(currentLanguage.dir);
  }, [currentLanguage]);
  useEffect(() => {
    if (open) {
      // fetchUserPref();
    }
  }, [open]);
  // useEffect(() => {
  //   fetchUserPref();
  // }, []);
  const [age, setAge] = React.useState("en");
  const handleChange = (event) => {
    setAge(event.target.value);
    // console.log(event.target.value);
    i18next.changeLanguage(event.target.value);
  };

  // const fetchUserPref = async () => {
  //   const param = new FormData();
  //   if (IsApprove !== "") {
  //     param.append("is_app", IsApprove.is_app);
  //     param.append("user_id", IsApprove.user_id);
  //     param.append("auth_key", IsApprove.auth);
  //   }
  //   await axios
  //     .post(`${Url}/ajaxfiles/get_user_prefrence.php`, param)
  //     .then((res) => {
  //       if (res.data.message == "Session has been expired") {
  //         localStorage.setItem("login", true);
  //         prop.setLogin("true");
  //         navigate("/login");
  //       }
  //       setPrefrence(res.data);
  //       localStorage.setItem("is_ib_account", res.data.is_ib_account);
  //       localStorage.setItem("step", res.data.step_number);
  //       localStorage.setItem("is_pamm", res.data.is_pamm);
  //     });
  // };
  const str = () => {
    if (prop.permission.user_name) {
      const str = prop.permission.user_name.split(" ");
      const firstname = str[0].charAt(0);
      const lastname = str[1].charAt(0);
      console.log("lastname", firstname + lastname);
      return (firstname + lastname).toUpperCase();
    }
  };
  // prefrence.user_name.split(' ')
  // const strUserName=()=>{
  //   if(prefrence.user_name)
  //   {
  //     return prefrence.user_name.toLowerCase()
  //   }else
  //   {
  //     return ""
  //   }
  // }

  // console.log("Prefrence", prefrence);
  return (
    <div className="app-header app-header--shadow app-header--opacity-bg mobileHeader">
      {/* <div className="app-header--pane"> */}

      {/* <FormControl sx={{ m: 1, minWidth: 70 }}>
          <Select
            value={age}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            input={<BootstrapInput />}
          >
            <MenuItem value="en" selected>
              EN
            </MenuItem>
            <MenuItem value="ar">AR</MenuItem>
            <MenuItem value="jp">JP</MenuItem>
            <MenuItem value="ru">RU</MenuItem>
            <MenuItem value="es">ES</MenuItem>
            <MenuItem value="fa">FA</MenuItem>
            <MenuItem value="cn">CN</MenuItem>
          </Select>
        </FormControl> */}
      {/* </div> */}
      <div className="app-header--pane ">
        <button
          className="navbar-toggler hamburger hamburger--elastic toggle-mobile-sidebar-btn"
          onClick={() => prop.setSidebar(true)}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
        {prop.permission.is_affiliate == "1" ? (
          ""
        ) : (
          <ul style={{ marginBottom: "0", gap: "24px" }} className="d-flex ">
            {prop.moveToib == false ? (
              <>
                {" "}
                <li className="headerMenu webViewHeader">
                  <NavLink
                    className="nav-link-simple d-flex "
                    to="/deposit"
                    // onClick={CloseSidebar}
                  >
                    <Deposit className="hoverSidebar" />

                    {/* <span className="material-icons  icon_Mar">add</span> */}

                    <span className="HeaderMenuColor">{t("Deposit")}</span>
                  </NavLink>
                </li>
                <li className="headerMenu webViewHeader">
                  <NavLink
                    className="nav-link-simple d-flex "
                    to="/Web_Trader"
                    // onClick={CloseSidebar}
                  >
                    {/* <span className="material-icons  icon_Mar">
                data_thresholding
              </span> */}
                    <Web_trader
                      className="hoverSidebar"
                      style={{ width: "20px" }}
                    />

                    <span className="HeaderMenuColor">{t("Web_Trader")} </span>
                  </NavLink>
                </li>
                <li className="headerMenu webViewHeader">
                  <NavLink
                    className="nav-link-simple d-flex "
                    to="/"
                    // onClick={CloseSidebar}
                  >
                    <Bonus className="hoverSidebar" />

                    <span className="HeaderMenuColor">Bonus</span>
                  </NavLink>
                </li>
                <li className="headerMenu webViewHeader">
                  <NavLink
                    className="nav-link-simple d-flex "
                    to="/trade-and-win"
                    // onClick={CloseSidebar}
                  >
                    {/* <span className="material-icons  icon_Mar">
                data_thresholding
              </span> */}
                    <TradeAndWin className="hoverSidebar" />

                    <span className="HeaderMenuColor">Trade & Win </span>
                  </NavLink>
                </li>{" "}
                <li className="headerMenu">
                  {prop.permission.is_ib_account == "1" ? (
                    <a
                      className="nav-link-simple d-flex "
                      onClick={() => {
                        prop.setMoveToib(true);
                        navigate("/IBdashboard");
                      }}
                    >
                      <span>
                        <Ib_application
                          className="hoverSidebar"
                          style={{ width: "24px" }}
                        />
                      </span>

                      <span className="HeaderMenuColor">IB Portal</span>
                    </a>
                  ) : (
                    <NavLink
                      className="nav-link-simple d-flex "
                      to="/partnership"
                    >
                      <TradeAndWin className="hoverSidebar" />

                      <span className="HeaderMenuColor">IB Request</span>
                    </NavLink>
                  )}
                </li>
              </>
            ) : (
              <li className="headerMenu">
                <a
                  className="nav-link-simple d-flex "
                  // to="/Web_Trader"
                  // onClick={handleClick2}
                  onClick={() => {
                    prop.setMoveToib(false);
                    navigate("/dashboard");
                  }}
                >
                  {/* <span className="material-icons  icon_Mar">
                data_thresholding
              </span> */}
                  <span>
                    <Ib_application
                      className="hoverSidebar"
                      style={{ width: "24px" }}
                    />
                  </span>

                  <span className="HeaderMenuColor">Cilent Portal</span>
                </a>
              </li>
            )}
          </ul>
        )}
      </div>

      <div className="app-header--pane">
        {/* <IconButton
          aria-label={100}
          sx={{ marginRight: "10px" }}
          onClick={(e) => {
            handleClick1(e);
            notificationdata();
          }}
        >
          <Badge
            badgeContent={prefrence.unread_notifications_count}
            color="info"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton> */}
        <ButtonBase
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          sx={{ padding: "18px" }}
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Setting className="hoverSidebar" style={{ width: "22px" }} />

          {/* <span className="MuiButton-label">
            <Avatar sx={{ bgcolor: "#2a3f73", fontSize: "18px" }}>
              <AccountCircleIcon sx={{ fontSize: "xxx-large" }} />
            </Avatar>{" "}
          </span>
          <span className="d-none d-md-inline-block mx-2 capitalize">
            {prefrence.user_name}
          </span> */}

          {/* <KeyboardArrowDownIcon /> */}
        </ButtonBase>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          className="menuHeder"
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem style={{ width: "199px" }}>
            <div className="avtar-main">
              <div>
                <Avatar
                  alt="Remy Sharp"
                  sx={{ background: "#fdf0ff", width: "50px", height: "50px" }}
                >
                  <User className="useLogoSize" />
                </Avatar>
              </div>
              <div>
                <div className="avatar-logo">{prop.permission?.user_name}</div>
                <div>
                  <span className="verifyText">Verifyed</span>{" "}
                </div>
              </div>
            </div>
          </MenuItem>

          <MenuItem style={{ width: "199px" }}>
            <NavLink to="/userProfile" ariaCurrent onClick={handleClose}>
              {" "}
              <Profile className="hoverSidebar1" />
              {t("User_Profile")}{" "}
            </NavLink>{" "}
          </MenuItem>

          <MenuItem>
            {" "}
            <NavLink to="/myDocuments" onClick={handleClose}>
              {" "}
              <My_documents className="hoverSidebar1" />
              {t("My_Documents")}{" "}
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/bankAccounts" onClick={handleClose}>
              {" "}
              <Bank_account className="hoverSidebar1" /> {t("Bank_Accounts")}{" "}
            </NavLink>
          </MenuItem>

          <MenuItem>
            {" "}
            <NavLink to="/activities" onClick={handleClose}>
              {" "}
              <Activities className="hoverSidebar1" /> {t("Activities")}{" "}
            </NavLink>
          </MenuItem>

          <MenuItem>
            {" "}
            <NavLink
              className="nav-link-simple "
              to="/ticket"
              onClick={handleClose}
            >
              <Tickits className="hoverSidebar1" />
              Ticket
            </NavLink>
          </MenuItem>
          <MenuItem>
            {" "}
            <NavLink
              className="nav-link-simple "
              to="/notification"
              onClick={handleClose}
            >
              <Notifications className="hoverSidebar1" />
              Notification
            </NavLink>
          </MenuItem>
          <MenuItem>
            {" "}
            <a className="nav-link-simple " onClick={() => onLogout()}>
              <ExitToAppIcon className="hoverSidebar1" />
              Log Out
            </a>
          </MenuItem>
        </Menu>

        <Menu
          id="demo- positioned-menu1"
          aria-labelledby="demo-positioned-button1"
          anchorEl={anchorEl1}
          open={open1}
          onClose={handleClose1}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <div className="dropdown-menu-xl overflow-hidden p-0">
            {notisLoader ? (
              <div className="loader">
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
              </div>
            ) : (
              <ol style={{ padding: "0" }}>
                {notedata.map((item, index) => {
                  return (
                    <li className="notification">
                      <div className="d-flex">
                        <div> {index + 1}.</div>
                        <div>{item.description}</div>
                      </div>
                      <div className="divider"></div>
                    </li>
                  );
                })}
              </ol>
            )}
            <div style={{ textAlign: "center" }}>
              <ColorButton
                sx={{ padding: "4px 15px" }}
                onClick={() => {
                  handleClose1();
                  navigate("/notification");
                }}
              >
                View More
              </ColorButton>
            </div>
          </div>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
