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
import TradeAndWin from "./componet/sidebar/otherpage/tradeAndWin";
import PrizeLots from "./componet/sidebar/otherpage/prizeLots";
import DepositeTest from "./componet/sidebar/otherpage/DepositeTest";
import Cart from "./componet/sidebar/otherpage/cart";
import Shipping from "./componet/sidebar/otherpage/shipping";
import IBDashboard from "./ibdashbord/IBDashboard";
import RegisterTest from "./componet/forms/RegisterTest";
import { IsApprove, Url } from "./global";
import axios from "axios";
import EarnReport from "./componet/sidebar/OperationAccount/EarnReport";
import AffiliateDashboard from "./ibdashbord/AffiliateDashboard";
import Order_chart from "./componet/sidebar/fantastic/Order_chart";
import How_to_participate from "./componet/sidebar/fantastic/How_to_participate";
import Fantastic_tour from "./componet/sidebar/fantastic/Fantastic_tour";
import Deposite_in_Progress from "./componet/sidebar/deposit/Deposite_in_Progress";

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
  const [moveToib, SetMoveToib] = useState(false);

  // const[User,setUser]=useState(localStorage.getItem('login'))
  const [firstCall, setFirstCall] = useState(true);

  const currentLanguageCode = cookies.get("i18next") || "en";
  // console.log(currentLanguageCode)
  const ref = useRef();
  const [sidebar, setSidebar] = useState(false);
  const [permission, setPermission] = useState({});

  // console.log("login 123",login)
  const fetchUserPref = async () => {
    if (firstCall) {
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
            setLogin("true");
          }
          setFirstCall(false);

          setPermission(res.data);
        });
    }
  };
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
            <Route exact path="/register" element={<RegisterTest />} />
            <Route exact path="/RegisterTest" element={<RegisterTest />} />

            <Route exact path="/register/:id/:id1" element={<RegisterTest />} />

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
    fetchUserPref();
    return (
      <div className={clang == "rtl" ? "dir-ar-ae" : "dir-en-gb"}>
        <div
          className={
            sidebar
              ? "app-wrapper app-sidebar-mobile-open app-sidebar-fixed app-header-fixed"
              : "app-wrapper app-sidebar-fixed app-header-fixed"
          }
        >
          <Sidebar
            cside={sidebar}
            setSidebar={setSidebar}
            moveToib={moveToib}
            permission={permission}
          />
          <div className="app-main">
            <Header
              setSidebar={setSidebar}
              setClang={setClang}
              setLogin={setLogin}
              setMoveToib={SetMoveToib}
              permission={permission}
              moveToib={moveToib}
            />
            <div className="app-content">
              <Routes>
                {permission.is_affiliate == "1" ? (
                  <>
                    {" "}
                    <Route
                      exact
                      path="/"
                      element={<AffiliateDashboard setLogin={setLogin} />}
                    />
                    <Route
                      path="*"
                      element={<Navigate to="/dashboard" replace />}
                    />
                    <Route
                      exact
                      path="/dashboard"
                      element={<AffiliateDashboard setLogin={setLogin} />}
                    />
                  </>
                ) : (
                  <>
                    {" "}
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
                  </>
                )}

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
                <Route exact path="/deposit/:id" element={<DepositeTest />} />
                {/* <Route exact path="/deposit/" element={<Deposite />} /> */}
                <Route exact path="/trade-and-win" element={<TradeAndWin />} />
                <Route exact path="/prize-lots" element={<PrizeLots />} />
                <Route exact path="/cart" element={<Cart />} />
                <Route exact path="/shipping" element={<Shipping />} />
                {/* <Route exact path="/depositTest/" element={<DepositeTest />} /> */}
                <Route exact path="/deposit" element={<DepositeTest />} />
                <Route path="/partnership" element={<Partnership />} />
                <Route path="/earnReport" element={<EarnReport />} />
                <Route
                  exact
                  path="/Order_chart/:id"
                  element={<Order_chart />}
                />
                <Route
                  exact
                  path="/How_to_participate"
                  element={<How_to_participate />}
                />
                <Route
                  exact
                  path="/Fantastic_tour"
                  element={<Fantastic_tour />}
                />

                <Route
                  exact
                  path="/change_password"
                  element={<ChangePassword />}
                />
                <Route
                  exact
                  path="/change_password/:id"
                  element={<ChangePassword />}
                />
                <Route
                  exact
                  path="/deposit/:id/:id1"
                  element={<Deposite_in_Progress />}
                />
                <Route exact path="/withdrawal" element={<Withdrawal />} />
                <Route exact path="/withdrawal/:id" element={<Withdrawal />} />

                {/* <Route exact path="/BankAccount" element={<BankAccount/>} /> */}
                <Route
                  exact
                  path="/internal_transfer"
                  element={<InternalTransfer />}
                />
                <Route
                  exact
                  path="/internal_transfer/:id"
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

                <Route
                  path="/open_real_account"
                  element={<OpenRealAccount />}
                />
                <Route
                  path="/open_demo_account"
                  element={<OpenDemoaccount />}
                />

                <Route
                  path="/Open_Champion_Demo_Contest_account"
                  element={<OpenChampionDemo />}
                />
                <Route path="/Manage_Bonuses" element={<ManageBonuses />} />

                <Route path="/ticket" element={<Ticket />} />

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

                <Route
                  exact
                  path="/IBdashboard"
                  element={<IBDashboard setLogin={setLogin} />}
                />
                {/* <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                  /> */}
                <Route
                  path="/ib_commission_history"
                  element={<IBCommissionHistory />}
                />
                <Route
                  path="/ib_withdraw_history"
                  element={<IBWithdrawalReport />}
                />
                <Route path="/partnership" element={<Partnership />} />
                <Route
                  path="/ib_commision_group"
                  element={<IBCommisionGroup />}
                />
                <Route path="/my_client" element={<MyClient />} />
                <Route path="/my_structure" element={<MyStructure />} />
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
