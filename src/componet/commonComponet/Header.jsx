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
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import "./comon.css";
import { IsApprove, Url } from "../../global";
import NotificationsIcon from "@mui/icons-material/Notifications";
import axios from "axios";
import { Badge, IconButton } from "@mui/material";
import { ColorButton } from "../customComponet/CustomElement";
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
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);
  const [notisLoader, setNotIsLoader] = useState(true);
  const open = Boolean(anchorEl);
  const [prefrence, setPrefrence] = useState({});
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
      fetchUserPref();
    }
  }, [open]);
  useEffect(() => {
    fetchUserPref();
  }, []);
  const [age, setAge] = React.useState("en");
  const handleChange = (event) => {
    setAge(event.target.value);
    // console.log(event.target.value);
    i18next.changeLanguage(event.target.value);
  };

  const fetchUserPref = async () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    await axios
      .post(`${Url}/ajaxfiles/get_user_prefrence.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          prop.setLogin("true");
          navigate("/login");
        }
        setPrefrence(res.data);
        localStorage.setItem("is_ib_account", res.data.is_ib_account);
        localStorage.setItem("step", res.data.step_number);
        localStorage.setItem("is_pamm", res.data.is_pamm);
      });
  };
  const str = () => {
    if (prefrence.user_name) {
      const str = prefrence.user_name.split(" ");
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

  console.log("Prefrence", prefrence);
  return (
    <div className="app-header app-header--shadow app-header--opacity-bg">
      <div className="app-header--pane">
        <button
          className="navbar-toggler hamburger hamburger--elastic toggle-mobile-sidebar-btn"
          onClick={() => prop.setSidebar(true)}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
        <FormControl sx={{ m: 1, minWidth: 70 }}>
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
        </FormControl>
      </div>
      <div className="app-header--pane">
        <IconButton
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
        </IconButton>
        <ButtonBase
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <span className="MuiButton-label">
            <Avatar sx={{ bgcolor: "#2a3f73", fontSize: "18px" }}>
              <span>{str()}</span>{" "}
            </Avatar>{" "}
          </span>
          <span className="d-none d-md-inline-block mx-2 capitalize">
            {prefrence.user_name}
          </span>
          <KeyboardArrowDownIcon />
        </ButtonBase>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
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
            <div className="d-flex p-4">
              <Avatar sx={{ bgcolor: "#3D9730" }}>{str()}</Avatar>
              <div className="mx-3">
                <h6 className="font-weight-bold mb-1 text-black capitalize">
                  {prefrence.user_name}
                </h6>
                <p className="text-black-50 mb-0">{prefrence.user_email}</p>
              </div>
            </div>
            <div className="divider"></div>
            <div className="divider"></div>
            <div className="bg-secondary d-flex align-items-center flex-column py-4">
              <div className="display-3 mb-0 text-center font-weight-bold">
                <small className="opacity-6">$</small>
                <span className="pl-1">
                  <span> {prefrence.balance}</span>
                </span>
              </div>
              <small className="text-center font-weight-bold opacity-6 text-uppercase">
                {" "}
                Total Wallet Balance
              </small>
            </div>
            <div className="divider"></div>
            <List
              className="nav-neutral-first nav-pills-rounded flex-column p-3"
              onClick={() => {
                navigate("/userProfile");
                handleClose();
              }}
            >
              <ListItem button={true}>
                <div className="mr-2 ">
                  <GppGoodIcon />
                </div>
                <span className="font-size-md">Profile</span>
              </ListItem>
            </List>
            <div className="divider"></div>
            <List className="nav-neutral-danger nav-pills-rounded flex-column p-3">
              <ListItem button={true} onClick={onLogout}>
                <div className="mr-2">
                  <ExitToAppIcon />
                </div>
                <span className="font-size-md">Log out</span>
              </ListItem>
            </List>
          </div>
        </Menu>
        <Menu
          id="demo-positioned-menu1"
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
