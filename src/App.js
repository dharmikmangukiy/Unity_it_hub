import React, { useState, useRef, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from "./componet/forms/Login";
import ComingSoon from "./componet/sidebar/ComingSoon";
import Dashboard from "./componet/sidebar/Dashboard";
import Sidebar from "./componet/commonComponet/Sidebar";
import Header from "./componet/commonComponet/Header";
import "./App.css";
import Footer from "./componet/commonComponet/Footer";
import ForgotPassword from "./componet/forms/ForgotPassword";
import cookies from "js-cookie";
import Report from "./componet/sidebar/Report.jsx";
import { AccountList } from "./componet/sidebar/TradingAccounts/AccountList";
import { Deposite } from "./componet/sidebar/otherpage/Deposite";
import { ChangePassword } from "./componet/sidebar/otherpage/ChangePassword";
import { Withdrawal } from "./componet/sidebar/otherpage/Withdraw/Withdrawal";
// import { BankAccount } from "./componet/sidebar/otherpage/Withdraw/BankAccount";
import InternalTransfer from "./componet/sidebar/otherpage/InternalTransfer";
import DepositHistory from "./componet/sidebar/OperationAccount/DepositHistory";
import WithdrawHistory from "./componet/sidebar/OperationAccount/WithdrawHistory";
import TransferHistory from "./componet/sidebar/OperationAccount/TransferHistory";
import WebTrader from "./componet/sidebar/WebTrader";
import Desktop from "./componet/sidebar/Platforms/Desktop";
import Android from "./componet/sidebar/Platforms/Android.jsx";
import Register from "./componet/forms/Register";
import UserProfile from "./componet/sidebar/profile/UserProfile";
import MyDocuments from "./componet/sidebar/profile/MyDocuments";
import MyApplication from "./componet/sidebar/profile/MyApplication";
import BankAccountp from "./componet/sidebar/profile/BankAccountp";
import Activities from "./componet/sidebar/profile/Activities";
import Copytrading from "./componet/sidebar/copytrading/Copytrading";
import MasterCopy from "./componet/sidebar/copytrading/MasterCopy";
import OpenRealAccount from "./componet/sidebar/TradingAccounts/OpenRealAccount";
import OpenDemoaccount from "./componet/sidebar/TradingAccounts/OpenDemoaccount";
import ScrollIntoView from "./ScrollIntoView";
import { Partnership } from "./componet/sidebar/otherpage/Withdraw/Partnership";
import OpenChampionDemo from "./componet/sidebar/contests/OpenChampionDemo";
import ManageBonuses from "./componet/sidebar/TradingAccounts/ManageBonuses";
import Ticket from "./componet/sidebar/ticket/Ticket";
import ViewTicket from "./componet/sidebar/ticket/ViewTicket";
import IBCommisionGroup from "./componet/sidebar/otherpage/IBCommisionGroup";
import IBCommissionHistory from "./componet/sidebar/ibReport/IBCommissionHistory";
import IBWithdrawalReport from "./componet/sidebar/ibReport/IBWithdrawalReport";
import MyStructure from "./componet/sidebar/otherpage/MyStructure";
import MyClient from "./componet/sidebar/otherpage/MyClient";
import ResetPassword from "./componet/forms/ResetPassword";
import PammDashboard from "./componet/sidebar/pamm/PammDashboard";
import MoneyManager from "./componet/sidebar/pamm/MoneyManager";
import PammPortfolio from "./componet/sidebar/pamm/PammPortfolio";
import TradeHistory from "./componet/sidebar/pamm/TradeHistory";
import LoginAs from "./componet/sidebar/LoginAs";
import PammWithdrawalHistory from "./componet/sidebar/pamm/PammWithdrawalHistory";
import MoneyManagerProfile from "./componet/sidebar/pamm/MoneyManagerProfile";
import PammPortfolioProfile from "./componet/sidebar/pamm/PammPortfolioProfile";
import Iphone from "./componet/sidebar/Platforms/Iphone";
import { DemoAccounts } from "./componet/sidebar/TradingAccounts/DemoAccounts";
import Notification from "./componet/sidebar/otherpage/Notification";
import { ThemeProvider, createTheme } from "@mui/material";

function useScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}
const THEME = createTheme({
  typography: {
    fontFamily: `"Cairo",sans-serif`,
  },
});
const App = () => {
  console.log(localStorage.getItem("login"));
  useScrollToTop();
  const [login, setLogin] = useState(localStorage.getItem("login"));
  const [login1, setLogin1] = useState(false);

  // const[User,setUser]=useState(localStorage.getItem('login'))

  const currentLanguageCode = cookies.get("i18next") || "en";
  // console.log(currentLanguageCode)
  const ref = useRef();
  const [sidebar, setSidebar] = useState(false);
  // console.log("login 123",login)

  const [clang, setClang] = useState();
  if (login == "true" || localStorage.getItem("login") == null) {
    return (
      <ThemeProvider theme={THEME}>
        <div className="loginbg">
          <Routes>
            {/* <Route exact path="/Register" element={<Register />} /> */}
            <Route exact path="/ForgotPassword" element={<ForgotPassword />} />
            <Route
              exact
              path="/login/:id"
              element={<Login setLogin={setLogin} />}
            />
            <Route
              exact
              path="/login"
              element={<Login setLogin={setLogin} />}
            />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/register/:id/:id1" element={<Register />} />
            <Route
              exact
              path="/login_as/:id"
              element={<LoginAs setLogin={setLogin} />}
            />
            <Route
              exact
              path="/reset_password/:id/:id1"
              element={<ResetPassword />}
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </ThemeProvider>
    );
  } else {
    return (
      <div className={clang == "rtl" ? "dir-ar-ae" : "dir-en-gb"}>
        <div
          className={
            sidebar
              ? "app-wrapper app-sidebar-mobile-open app-sidebar-fixed app-header-fixed"
              : "app-wrapper app-sidebar-fixed app-header-fixed"
          }
        >
          <Sidebar cside={sidebar} setSidebar={setSidebar} />
          <div className="app-main">
            <Header
              setSidebar={setSidebar}
              setClang={setClang}
              setLogin={setLogin}
            />
            <div className="app-content">
              <Routes>
                <Route
                  exact
                  path="/"
                  element={<Dashboard setLogin={setLogin} />}
                />
                <Route
                  path="*"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route
                  exact
                  path="/dashboard"
                  element={<Dashboard setLogin={setLogin} />}
                />
                <Route
                  exact
                  path="/login_as/:id"
                  element={<LoginAs setLogin={setLogin} />}
                />
                <Route exact path="/account_list" element={<AccountList />} />
                <Route exact path="/demo_account" element={<DemoAccounts />} />
                <Route exact path="/notification" element={<Notification />} />
                <Route exact path="/Comingsoon" element={<ComingSoon />} />
                <Route exact path="/reports" element={<Report />} />
                <Route exact path="/deposit/:id" element={<Deposite />} />
                <Route exact path="/deposit/" element={<Deposite />} />

                <Route
                  exact
                  path="/change_password"
                  element={<ChangePassword />}
                />
                <Route exact path="/withdrawal" element={<Withdrawal />} />
                {/* <Route exact path="/BankAccount" element={<BankAccount/>} /> */}
                <Route
                  exact
                  path="/internal_transfer"
                  element={<InternalTransfer />}
                />
                <Route
                  exact
                  path="/deposit_history"
                  element={<DepositHistory />}
                />
                <Route
                  exact
                  path="/withdraw_history"
                  element={<WithdrawHistory />}
                />
                <Route
                  exact
                  path="/transfer_history"
                  element={<TransferHistory />}
                />
                <Route exact path="/Web_Trader" element={<WebTrader />} />
                <Route exact path="/Platforms/desktop" element={<Desktop />} />
                <Route exact path="/Platforms/android" element={<Android />} />
                <Route exact path="/Platforms/iphone" element={<Iphone />} />

                <Route exact path="/userProfile" element={<UserProfile />} />
                <Route exact path="/myDocuments" element={<MyDocuments />} />
                <Route
                  exact
                  path="/myApplications"
                  element={<MyApplication />}
                />
                <Route exact path="/bankAccounts" element={<BankAccountp />} />
                <Route exact path="/activities" element={<Activities />} />
                <Route exact path="/copytrading" element={<Copytrading />} />
                <Route path="/copytrading/:id" element={<Copytrading />} />
                <Route path="/copytrading/:id" element={<Copytrading />} />
                <Route path="/my_client" element={<MyClient />} />

                <Route
                  path="/open_real_account"
                  element={<OpenRealAccount />}
                />
                <Route
                  path="/open_demo_account"
                  element={<OpenDemoaccount />}
                />
                <Route path="/partnership" element={<Partnership />} />
                <Route
                  path="/ib_commision_group"
                  element={<IBCommisionGroup />}
                />

                <Route
                  path="/Open_Champion_Demo_Contest_account"
                  element={<OpenChampionDemo />}
                />
                <Route path="/Manage_Bonuses" element={<ManageBonuses />} />
                <Route
                  path="/ib_commission_history"
                  element={<IBCommissionHistory />}
                />
                <Route
                  path="/ib_withdraw_history"
                  element={<IBWithdrawalReport />}
                />
                <Route path="/ticket" element={<Ticket />} />
                <Route path="/my_structure" element={<MyStructure />} />

                <Route path="/view_ticket/:id" element={<ViewTicket />} />
                <Route path="/pamm_dashboard" element={<PammDashboard />} />
                <Route path="/pamm_manager_list" element={<MoneyManager />} />
                <Route path="/pamm_trade_history" element={<TradeHistory />} />
                <Route
                  path="/pamm_trade_history/:id"
                  element={<TradeHistory />}
                />

                <Route
                  path="/pamm_withdrawal_history"
                  element={<PammWithdrawalHistory />}
                />

                <Route path="/pamm_portfolio" element={<PammPortfolio />} />
                <Route
                  path="/money_manager_profile/:id"
                  element={<MoneyManagerProfile />}
                />
                <Route
                  path="/portfolio_profile/:id"
                  element={<PammPortfolioProfile />}
                />
              </Routes>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
