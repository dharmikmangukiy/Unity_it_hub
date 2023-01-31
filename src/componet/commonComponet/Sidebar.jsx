import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./sidebar1.css";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import { Grid, Input } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import Dashboard from "./Dashboard.svg";
import { BorderBottom } from "@mui/icons-material";
// import { ACCOUNTS } from "../../svg/DASHBORD.svg";
import { ReactComponent as DASHBORD } from "../../svg/dashbord.svg";
import { ReactComponent as Accounts } from "../../svg/accounts.svg";

import { ReactComponent as Pamm } from "../../svg/pamm.svg";
import { ReactComponent as Deposit } from "../../svg/deposit.svg";
import { ReactComponent as Web_trader } from "../../svg/web_trader.svg";
import { ReactComponent as Bonus } from "../../svg/bonus.svg";
import { ReactComponent as TradeAndWin } from "../../svg/tradeAndWin.svg";
import { ReactComponent as Internal_transfer } from "../../svg/internal_transfer.svg";
import { ReactComponent as Plateform } from "../../svg/plateform.svg";
import { ReactComponent as Reports } from "../../svg/reports.svg";
import { ReactComponent as Withdraw } from "../../svg/withdraw.svg";
import { ReactComponent as Your_trnascation } from "../../svg/your_trnascation.svg";
import { ReactComponent as Fantasticfour } from "../../svg/fantasticfour.svg";
import { ReactComponent as Wallet } from "../../svg/wallet.svg";
import Toast from "./Toast";

const style = {
  margin: "0 1.42857rem 0 0",
};
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(0),
  },
  "& .MuiInputBase-input": {
    borderRadius: 9,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "8px 12px 8px 12px",
    marginTop: 0,
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
    "&:hover": {
      borderColor: "#1e64b4;",
    },
    "&:focus": {
      borderRadius: 9,
      borderColor: "#1e64b4;",
      border: "2px solid #1e64b4;",
    },
  },
}));
const Sidebar = (prop) => {
  // const [on, setOn] = useState(false);

  const [scroll, setScroll] = useState("paper");
  const handleClickOpen = (scrollType) => () => {
    setOpenModel(true);
    setScroll(scrollType);
  };
  const handleClose = () => {
    setOpenModel(false);
  };

  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openModel, setOpenModel] = useState(false);
  const [open, setOpen] = React.useState({
    operation: false,
    trading: false,
    platforms: false,
    contests: false,
    partnership: false,
  });

  const CloseSidebar = () => {
    prop.setSidebar(false);
    // console.log(prop);
  };
  const handleClick = (e) => {
    const name = e.target.classList[0];
    // console.log(name);
    setOpen((preValue) => {
      return {
        // ...preValue,
        [name]: !open[name],
      };
    });
  };

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // console.log(prop);

  return (
    <div
      className={`main-sidebar-content  ${
        isSidebarOpen ? "sidebar-with-4rem" : ""
      }`}
    >
      <div className="app-sidebar app-sidebar--light app-sidebar--shadow">
        <div className={`app-sidebar--header `}>
          <div className={`app-sidebar-logo ${prop.cside ? "" : "test"}`}>
            <a className={`app-sidebar-logo`} title="RightFx">
              <div className="py-2">
                <NavLink to={prop.moveToib == true ? "/IBdashboard" : "/"}>
                  <img
                    src="./image/logo1.png"
                    style={{ width: "170px" }}
                    className="open-sidebar-logo-image"
                  />
                  {/* <img
                    src="./image/favicon.png"
                    style={{ width: "170px" }}
                    className="close-sidebar-logo-image"
                  /> */}
                </NavLink>
              </div>
            </a>
          </div>

          <Button
            className="navbar-toggler hamburger hamburger--elastic toggle-mobile-sidebar-btn is-active"
            onClick={CloseSidebar}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </Button>
        </div>
        {isSidebarOpen ? (
          <>
            {/* <Button
            title="Collapse Sidebar"
            className="collapse-sidebar-open-close"
            sx={{ color: "#545454" }}
            onClick={handleSidebar}
          >
            <i className="material-icons">menu_open</i>
          </Button> */}
          </>
        ) : (
          <Button
            title="Expand Sidebar"
            className="sidebar-open-close"
            onClick={handleSidebar}
          >
            <i className="material-icons">sync_alt</i>
          </Button>
        )}
        <div className="sidebar-wallet-balance">
          <div>
            <Wallet
              // onClick={() => Toast("error", "error1")}
              className="hoverSidebar"
              style={{ filter: "none", width: "27px" }}
            />
          </div>
          <div>
            <div>My Balance </div>
            <span> ${prop.permission?.balance}</span>
          </div>
        </div>

        <div className="app-sidebar--content" style={{ marginTop: "0px" }}>
          <div>
            <div className="sidebar-navigation">
              {prop.moveToib == false ? (
                <ul className="pt-2" style={{ paddingTop: "19px !important" }}>
                  <li>
                    <NavLink
                      className="nav-link-simple "
                      to="/dashboard"
                      onClick={CloseSidebar}
                    >
                      {/* <span className="material-icons  icon_Mar">dashboard</span> */}
                      <DASHBORD className="hoverSidebar" />
                      {t("Dashboard")}
                    </NavLink>
                  </li>
                  {/* <li>
                  <a
                    className={`my_profile ${
                      open.my_profile ? "active" : null
                    }`}
                    onClick={handleClick}
                  >
              
                    <DASHBORD
                      stroke="yellow"
                      fill="yellow"
                      className="hoverSidebar"
                    />

                    {t("Profile")}
                    <span className="sidebar-icon-indicator">
                      {open.my_profile ? <ExpandMore /> : <ExpandLess />}
                    </span>
                  </a>
                  <Collapse in={open.my_profile} timeout="auto" unmountOnExit>
                    <ul>
                      <li>
                        <NavLink
                          to="/userProfile"
                          ariaCurrent
                          onClick={CloseSidebar}
                        >
                          {t("User_Profile")}{" "}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/myDocuments" onClick={CloseSidebar}>
                          {t("My_Documents")}{" "}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/bankAccounts" onClick={CloseSidebar}>
                          {t("Bank_Accounts")}{" "}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/myApplications" onClick={CloseSidebar}>
                          {t("My_Applications")}{" "}
                        </NavLink>
                      </li>{" "}
                      {""}
                      <li>
                        <NavLink to="/activities" onClick={CloseSidebar}>
                          {t("Activities")}{" "}
                        </NavLink>
                      </li>
                    </ul>
                  </Collapse>
                </li> */}
                  <li>
                    <a
                      className={`trading ${open.trading ? "active" : ""}`}
                      onClick={handleClick}
                    >
                      <Accounts
                        stroke="yellow"
                        fill="yellow"
                        className="hoverSidebar"
                      />{" "}
                      {t("Accounts")}
                      <span className="sidebar-icon-indicator">
                        {/* {open.platforms ?  <ExpandMore /> : <ExpandLess/>} */}
                        {open.trading ? <ExpandMore /> : <ExpandLess />}{" "}
                      </span>
                    </a>
                    <Collapse in={open.trading} timeout="auto" unmountOnExit>
                      <ul>
                        <li>
                          <NavLink to="/account_list" onClick={CloseSidebar}>
                            {t("Live Accounts")}
                          </NavLink>
                        </li>
                        {/* <li>
                        <NavLink to="/manage_bonuses" onClick={CloseSidebar}>
                          {t("Manage_Bonuses")}{" "}
                        </NavLink>
                      </li> */}
                        <li>
                          <NavLink to="/demo_account">
                            {t("Demo Accounts")}{" "}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/change_password" onClick={CloseSidebar}>
                            Change Password
                          </NavLink>
                        </li>
                      </ul>
                    </Collapse>
                  </li>
                  <li className="webViewSidebar">
                    <NavLink
                      className="nav-link-simple "
                      to="/deposit"
                      onClick={CloseSidebar}
                    >
                      <Deposit className="hoverSidebar" />
                      {t("Deposit")}
                    </NavLink>
                  </li>
                  <li className="webViewSidebar">
                    <NavLink
                      className="nav-link-simple "
                      to="/bonus"
                      onClick={CloseSidebar}
                    >
                      <Bonus className="hoverSidebar" />
                      Bonus
                    </NavLink>
                  </li>
                  <li className="webViewSidebar">
                    <NavLink
                      className="nav-link-simple "
                      to="/trade-and-win"
                      onClick={CloseSidebar}
                    >
                      <TradeAndWin className="hoverSidebar" />
                      Trade & Win
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="nav-link-simple "
                      to="/withdrawal"
                      onClick={CloseSidebar}
                    >
                      {/* <span className="material-icons  icon_Mar">
                      file_upload
                    </span> */}
                      <Withdraw className="hoverSidebar" />

                      {t("Withdrawal")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="nav-link-simple "
                      to="/internal_transfer"
                      onClick={CloseSidebar}
                    >
                      {/* <span className="material-icons  icon_Mar">sync_alt</span> */}
                      <Internal_transfer className="hoverSidebar" />

                      {t("Internal_Transfer")}
                    </NavLink>
                  </li>
                  <li>
                    <a
                      className={`operation ${open.operation ? "active" : ""}`}
                      onClick={handleClick}
                    >
                      {/* <span className="material-icons icon_Mar">people</span> */}
                      <Your_trnascation className="hoverSidebar" />

                      {t("Your Transaction")}
                      {/* {open.operation ? <ExpandMore /> : <ExpandLess />} */}

                      <span className="sidebar-icon-indicator">
                        {open.operation ? <ExpandMore /> : <ExpandLess />}

                        {/* {open.operation ? <ExpandMore /> : <ExpandLess />} */}
                      </span>
                    </a>
                    <Collapse in={open.operation} timeout="auto" unmountOnExit>
                      <ul>
                        {prop.permission.is_affiliate == "1" ? (
                          <li>
                            <NavLink to="/earnReport" onClick={CloseSidebar}>
                              Earn History
                            </NavLink>
                          </li>
                        ) : (
                          <></>
                        )}
                        <li>
                          <NavLink to="/deposit_history" onClick={CloseSidebar}>
                            {t("Deposit_History")}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/transfer_history"
                            onClick={CloseSidebar}
                          >
                            {t("Transfer_History")}{" "}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/withdraw_history"
                            onClick={CloseSidebar}
                          >
                            {t("Withdraw_History")}{" "}
                          </NavLink>
                        </li>
                      </ul>
                    </Collapse>
                  </li>{" "}
                  <li>
                    <NavLink
                      className="nav-link-simple "
                      to="/reports"
                      onClick={CloseSidebar}
                    >
                      {/* <span className="material-icons  icon_Mar">analytics</span> */}
                      <Reports className="hoverSidebar" />
                      {t("Reports")}{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="nav-link-simple "
                      to="/spinAndWin"
                      onClick={CloseSidebar}
                    >
                      {/* <span className="material-icons  icon_Mar">analytics</span> */}
                      <Reports className="hoverSidebar" />
                      Spin & Win
                    </NavLink>
                  </li>
                  <li>
                    <a
                      className={`platforms ${open.platforms ? "active" : ""}`}
                      onClick={handleClick}
                    >
                      {/* <span className="material-icons  icon_Mar">computer</span> */}
                      <Plateform className="hoverSidebar" />

                      {t("Platforms")}

                      <span className="sidebar-icon-indicator">
                        {open.platforms ? <ExpandMore /> : <ExpandLess />}
                      </span>
                    </a>
                    <Collapse in={open.platforms} timeout="auto" unmountOnExit>
                      <ul>
                        <li>
                          <NavLink
                            to="/Platforms/desktop"
                            onClick={CloseSidebar}
                          >
                            {t("Desktop")}{" "}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/Platforms/android"
                            onClick={CloseSidebar}
                          >
                            {t("Android")}{" "}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/Platforms/iphone"
                            onClick={CloseSidebar}
                          >
                            {t("Iphone")}{" "}
                          </NavLink>
                        </li>
                      </ul>
                    </Collapse>
                  </li>
                  <>
                    {" "}
                    {prop.permission.is_pamm == "1" ? (
                      <li>
                        <a
                          className={`pamm ${open.pamm ? "active" : ""}`}
                          onClick={handleClick}
                        >
                          <Pamm className="hoverSidebar" />

                          {/* <span className="material-icons  icon_Mar">soap</span> */}
                          {t("pamm")}

                          <span className="sidebar-icon-indicator">
                            {open.pamm ? <ExpandMore /> : <ExpandLess />}
                          </span>
                        </a>
                        <Collapse in={open.pamm} timeout="auto" unmountOnExit>
                          <ul>
                            <li>
                              <NavLink
                                to="/pamm_dashboard"
                                onClick={CloseSidebar}
                              >
                                {t("Dashboard")}
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/pamm_portfolio"
                                onClick={CloseSidebar}
                              >
                                {t("Portfolio Manage")}
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/pamm_manager_list"
                                onClick={CloseSidebar}
                              >
                                {t("My Managers")}
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/pamm_trade_history"
                                onClick={CloseSidebar}
                              >
                                {t("Trade History")}
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/pamm_withdrawal_history"
                                onClick={CloseSidebar}
                              >
                                {t("Pamm Withdrawal History")}
                              </NavLink>
                            </li>
                          </ul>
                        </Collapse>
                      </li>
                    ) : (
                      ""
                    )}
                  </>
                  <li className="webViewSidebar">
                    <NavLink
                      className="nav-link-simple "
                      to="/Web_Trader"
                      onClick={CloseSidebar}
                    >
                      <Web_trader className="hoverSidebar" />
                      {t("Web_Trader")}{" "}
                    </NavLink>
                  </li>
                  {/* <li>
                  <a
                    className={`contests ${open.contests ? "active" : null}`}
                    onClick={handleClick}
                  >
                    <span className="material-icons  icon_Mar">
                    military_tech
                    </span>
                    {t("Contests")}
                    <span className="sidebar-icon-indicator">
                      {open.contests ? <ExpandMore /> : <ExpandLess />}
                    </span>
                  </a>
                  <Collapse in={open.contests} timeout="auto" unmountOnExit>
                    <ul>
                      <li>
                        <NavLink
                          to="/Comingsoon"
                          onClick={CloseSidebar}
                        >
                          {t("cdc")}{" "}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/Comingsoon"
                          onClick={CloseSidebar}
                        >
                          {t("ocdca")}{" "}
                        </NavLink>
                      </li>
                    </ul>
                  </Collapse>
                </li> */}
                  <li>
                    {/* <NavLink
                    className="nav-link-simple "
                    to="/Comingsoon"
                    onClick={CloseSidebar}
                  >
                  <DASHBORD className="hoverSidebar" />
                    <span className="material-icons  icon_Mar">
                      military_tech
                    </span>
                    Contests
                  </NavLink> */}

                    {/* <NavLink
                    className="nav-link-simple "
                    to="/copytrading"
                    onClick={CloseSidebar}
                  > */}
                    {/* <span className="material-icons  icon_Mar">
                      candlestick_chart
                    </span> */}
                    {/* {t("Copytrading")}{" "}
                  </NavLink> */}
                  </li>
                  {/* <li>
                  <Button
                    className="nav-link-simple text-capitalize justify-content-start"
                    to="/promo_code"
                    onClick={handleClickOpen("paper")}
                    // className={`promo_code ${open.promo_code ? "active" : ""} nav-link-simple text-capitalize justify-content-start` }
                  >
                    <span className="material-icons  icon_Mar">
                      confirmation_number
                    </span>
                    {t("Promo_code")}
                  </Button>
                  <Dialog
                    open={openModel}
                    onClose={handleClose}
                    // aria-labelledby="alert-dialog-title"
                    // aria-describedby="alert-dialog-description"
                    style={{
                      opacity: "1",
                      transition:
                        "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                    }}
                    PaperProps={{
                      sx: {
                        width: "25%",
                        maxWidth: "768px",
                        borderRadius: "10px",
                        elevation: "24",
                        class: "border border-bottom-0",
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
                        Promo code
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
                          <BootstrapInput
                            // value={}
                            name=""
                            // onChange={handleChange}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                            className="ml-4"
                          />
                        </FormControl>
                      </Grid>
                      <Grid
                        container
                        spacing={2}
                        className="MuiGrid-justify-xs-space-between mt-4"
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          size="medium"
                          className="ml-4 text-capitalize p-3 pl-4 pr-4"
                        >
                          Activate
                        </Button>
                      </Grid>
                    </DialogContent>
                  </Dialog>
                </li> */}
                  {/* <li>
                  <NavLink
                    className="nav-link-simple "
                    to="/ticket"
                    onClick={CloseSidebar}
                  >
                    <span className="material-icons  icon_Mar">
                      receipt_long
                    </span>
                    Ticket
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="nav-link-simple "
                    to="/notification"
                    onClick={CloseSidebar}
                  >
                    <span className="material-icons  icon_Mar">
                      receipt_long
                    </span>
                    Notification
                  </NavLink>
                </li> */}
                </ul>
              ) : (
                <ul className="pt-2" style={{ paddingTop: "19px !important" }}>
                  <li>
                    <NavLink
                      className="nav-link-simple "
                      to="/IBdashboard"
                      onClick={CloseSidebar}
                    >
                      {/* <span className="material-icons  icon_Mar">dashboard</span> */}
                      <DASHBORD className="hoverSidebar" />
                      {t("Dashboard")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="nav-link-simple "
                      to="/Fantastic_tour"
                      onClick={CloseSidebar}
                    >
                      {/* <span className="material-icons  icon_Mar">dashboard</span> */}
                      <Fantasticfour className="hoverSidebar" />
                      Fantastic Four
                    </NavLink>
                  </li>
                  <li>
                    <a
                      className={`partnership ${
                        open.partnership ? "active" : ""
                      }`}
                      onClick={handleClick}
                    >
                      <span className="material-icons  icon_Mar">
                        handshake
                      </span>
                      IB Application
                      <span className="sidebar-icon-indicator">
                        {open.partnership ? <ExpandMore /> : <ExpandLess />}
                      </span>
                    </a>
                    <Collapse
                      in={open.partnership}
                      timeout="auto"
                      unmountOnExit
                    >
                      <ul>
                        <li>
                          <NavLink
                            className="nav-link-simple "
                            to="/partnership"
                            onClick={CloseSidebar}
                          >
                            IB Request
                          </NavLink>
                        </li>
                        {prop.permission.is_ib_account ? (
                          <li>
                            <NavLink
                              className="nav-link-simple"
                              to="/my_structure"
                              onClick={CloseSidebar}
                            >
                              My Structure
                            </NavLink>
                          </li>
                        ) : (
                          ""
                        )}
                        {prop.permission.is_ib_account == "1" ? (
                          <li>
                            <NavLink
                              className="nav-link-simple "
                              to="/ib_commision_group"
                              onClick={CloseSidebar}
                            >
                              IB Structure
                            </NavLink>
                          </li>
                        ) : (
                          ""
                        )}
                        {prop.permission.is_ib_account == "1" ? (
                          <li>
                            <NavLink
                              className="nav-link-simple "
                              to="/my_client"
                              onClick={CloseSidebar}
                            >
                              My Client
                            </NavLink>
                          </li>
                        ) : (
                          ""
                        )}
                      </ul>
                    </Collapse>
                  </li>
                  {prop.permission.is_ib_account == "1" ? (
                    <li>
                      <a
                        className={`iBReport ${open.iBReport ? "active" : ""}`}
                        onClick={handleClick}
                      >
                        <span className="material-icons  icon_Mar">
                          handshake
                        </span>
                        IB Report
                        <span className="sidebar-icon-indicator">
                          {open.iBReport ? <ExpandMore /> : <ExpandLess />}
                        </span>
                      </a>
                      <Collapse in={open.iBReport} timeout="auto" unmountOnExit>
                        <ul>
                          <li>
                            <NavLink
                              className="nav-link-simple "
                              to="/ib_commission_history"
                              onClick={CloseSidebar}
                            >
                              IB Commission History
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              className="nav-link-simple "
                              to="/ib_withdraw_history"
                              onClick={CloseSidebar}
                            >
                              IB Commissions Withdrawal Report
                            </NavLink>
                          </li>
                        </ul>
                      </Collapse>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              )}
            </div>
            <div
              className="ps__rail-x"
              style={{ left: "0px", bottom: "-288px" }}
            >
              <div
                className="ps__thumb-x"
                tabIndex="0"
                style={{ left: "0px", width: "0px" }}
              ></div>
            </div>
            <div
              className="ps__rail-y"
              style={{ top: "300px", right: "-288px", height: "64" }}
            >
              <div
                className="ps__thumb-xy"
                tabIndex="0"
                style={{ top: "60px", height: "5px" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {prop.cside ? (
        <div
          className="app-sidebar-overlay is-active"
          onClick={() => prop.setSidebar(false)}
        ></div>
      ) : (
        ""
      )}
      {/* <div className="app-sidebar-overlay is-active" onClick={()=>setSidebar(false)}></div> */}
    </div>
  );
};

export default Sidebar;
