import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  FormControl,
  InputAdornment,
  InputBase,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SouthEastSharpIcon from "@mui/icons-material/SouthEastSharp";
import GetAppSharpIcon from "@mui/icons-material/GetAppSharp";
import NorthEastSharpIcon from "@mui/icons-material/NorthEastSharp";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IsApprove, Url } from "../../../global";
import axios from "axios";
import Toast from "../../commonComponet/Toast";

const GreenButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#ff0000"),
  backgroundColor: "#3D9730",
  textTransform: "initial",
  fontSize: "13px",
  padding: "15px 22px",
  "&:hover": {
    backgroundColor: "#068017",
  },
}));
function MasterCopy(prop) {
  const navigate = useNavigate();
  let { id } = useParams();
  const [info, setInfo] = useState({});
  const [isLoader, setIsLoader] = useState(true);
  const [userId, setUserId] = useState();
  const onsubmit = async () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("copy_user_id", userId);
    await axios
      .post(Url + "/ajaxfiles/apply_copy_trading.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          Toast("error", res.data.message);
        } else {
          Toast("success", res.data.message);
        }
      });
  };
  useEffect(async () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("copy_master_id", id);
    await axios
      .post(Url + "/ajaxfiles/view_copy_trading.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        setInfo(res.data.aaData);
        setUserId(res.data.aaData.user_id);
        console.log(res.data);
        setIsLoader(false);
      });
  }, []);
  console.log(info);

  return (
    <div>
      {isLoader ? (
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
      ) : (
        <div className="master">
          <div className="master__wrapper">
            <div className="master__inner">
              <div className="master__section">
                <div>
                  <div className="m__profile">
                    <div className="m__profile__preview">
                      <div className="m__profile__preview-head">
                        <div className="m__profile__image">
                          <div className="m__profile__image-avatar">
                            <div className="m__profile__country">
                              <img
                                src="https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg"
                                alt=""
                                className="m__country-flag"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="m__profile__about">
                          <div className="m__profile__name">
                            {info.copy_master_name}
                          </div>
                        </div>
                      </div>
                      <div className="profile__preview-nav">
                        <div className="m__profile__ct-start-button">
                          <GreenButton
                            className="m__ct-start-button"
                            onClick={onsubmit}
                          >
                            <div className="m__ct-start-button__main-text">
                              Set up copying
                            </div>
                          </GreenButton>
                        </div>
                        <div className="m__profile__min-invest">
                          Minimum investment
                          <span>$98</span>
                        </div>
                      </div>
                    </div>
                    <div className="m__profile__info profile__info-key--hint">
                      <div className="m__profile__info-head">
                        <div className="m__profile__info-stat">
                          <div className="m__profile__info-key--hint">
                            <div className="right-side-img">
                              <div
                                data-v-2ce223c0=""
                                className="_gray _bold _smallest _upper"
                              >
                                Risk score
                              </div>
                              <div
                                arrow="true"
                                arrowtype="round"
                                animation="fade"
                                maxwidth="328"
                                placement="auto"
                                size="small"
                                hideonclick="true"
                                theme="dark risk-score"
                                a11y="true"
                                appendto="parent"
                                className="m__ct-tooltip__icon"
                              >
                                <div tabindex="0">
                                  <div className="m__ct-tooltip__icon">
                                    <img src="https://friconix.com/png/fi-cnsuxs-question-mark.png" />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="risk-score risk-score--size-lg risk-score--value-1">
                              <div className="risk-score__value">
                                {info.copy_risk_score}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="m__profile__info-stat">
                          <div
                            data-v-2ce223c0=""
                            className="profile__info-key _gray _bold _smallest _upper"
                          >
                            Equity
                          </div>
                          <div
                            data-v-2ce223c0=""
                            className="profile__info-value _bold"
                          >
                            ${info.copy_equity}
                          </div>
                        </div>
                        <div className="m__profile__info-stat">
                          <div
                            data-v-2ce223c0=""
                            className="profile__info-key _gray _bold _smallest _upper"
                          >
                            Commission
                          </div>
                          <div
                            data-v-2ce223c0=""
                            className="profile__info-value _bold"
                          >
                            {info.copy_comission}%
                          </div>
                        </div>
                        <div className="m__profile__info-stat">
                          <div
                            data-v-2ce223c0=""
                            className="profile__info-key _gray _bold _smallest _upper"
                          >
                            with us
                          </div>
                          <div
                            data-v-2ce223c0=""
                            className="profile__info-value _bold"
                          >
                            {info.with_us}d
                          </div>
                        </div>
                      </div>
                      <div className="m__profile__info-description">
                        <div
                          data-v-2ce223c0=""
                          className="profile__info-description-head _gray _bold _smallest _upper"
                        >
                          Strategy description
                        </div>
                        <div
                          data-v-2ce223c0=""
                          className="profile__info-description-text _small"
                        >
                          here ...is your
                          mentor....,.................................
                          ..........................................................................
                          to make your dream alive..............................
                          .....so folow .............and make your invesment
                          safe..................... ..................
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="master__row">
                <div className="master__section._performance">
                  <div className="master__performance">
                    <div className="performance">
                      <div
                        data-v-2ce223c0=""
                        className="performance__head _black _bold _medium"
                      >
                        Performance
                      </div>
                      <div className="performance__periods">
                        <div className="performance__period">
                          <div className="performance__period-info">
                            <div
                              data-v-2ce223c0=""
                              className="performance__period-info-key _gray _bold _smallest _upper"
                            >
                              Gain
                            </div>
                            <div
                              data-v-2ce223c0=""
                              className="performance__period-info-value _bold _upper _positive"
                            >
                              {info.copy_gain}%
                            </div>
                          </div>
                          <div className="performance__period-info">
                            <div
                              data-v-2ce223c0=""
                              className="performance__period-info-key _gray _bold _smallest _upper"
                            >
                              copiers
                            </div>
                            <div className="performance__period-info-row">
                              <div
                                data-v-2ce223c0=""
                                className="performance__period-info-value _bold _upper"
                              >
                                {info.current_copier}
                              </div>
                              <div className="performance__period-copiers-delta">
                                <img src="" />
                                <ArrowUpwardIcon />
                                <div className="performance__period-copiers-delta-count">
                                  {info.all_time_copier}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="performance__period-info">
                            <div
                              data-v-2ce223c0=""
                              className="performance__period-info-key _gray _bold _smallest _upper"
                            >
                              profit and loss
                            </div>
                            <div className="performance__period-pnl">
                              <div className="performance__period-pnl-head">
                                <div
                                  data-v-2ce223c0=""
                                  className="_bold _upper"
                                >
                                  ${info.copy_profit}
                                </div>
                                <div
                                  data-v-2ce223c0=""
                                  className="_bold _upper"
                                >
                                  ${info.copy_loss}
                                </div>
                              </div>
                              <div className="performance__period-pnl-body">
                                <div className="performance__period-pnl-line _positive"></div>
                                <div className="performance__period-pnl-line _negative"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="performance__nav">
                        <div className="ct-radio _small">
                          <label className="ct-radio__label">
                            <input
                              name="ct-radio"
                              type="radio"
                              className="ct-radio__input"
                              value="2W"
                            />
                            <div className="ct-radio__inner">2W</div>
                          </label>
                        </div>
                        <div className="ct-radio _small">
                          <label className="ct-radio__label">
                            <input
                              name="ct-radio"
                              type="radio"
                              className="ct-radio__input"
                              value="1W"
                            />
                            <div className="ct-radio__inner">1W</div>
                          </label>
                        </div>
                        <div className="ct-radio _small">
                          <label className="ct-radio__label">
                            <input
                              name="ct-radio"
                              type="radio"
                              className="ct-radio__input"
                              value="3W"
                            />
                            <div className="ct-radio__inner">3W</div>
                          </label>
                        </div>
                        <div className="ct-radio _small">
                          <label className="ct-radio__label">
                            <input
                              name="ct-radio"
                              type="radio"
                              className="ct-radio__input"
                              value="6W"
                            />
                            <div className="ct-radio__inner">6W</div>
                          </label>
                        </div>
                        <div className="ct-radio _small">
                          <label className="ct-radio__label">
                            <input
                              name="ct-radio"
                              type="radio"
                              className="ct-radio__input"
                              value="ALL"
                            />
                            <div className="ct-radio__inner">ALL</div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="m__section._chart"></div>
                <div className="master__section._account-details">
                  <div className="master__account-details">
                    <div className="account-details">
                      <div
                        data-v-2ce223c0=""
                        className="account-details__head _black _bold _medium"
                      >
                        Account details
                      </div>
                      <div className="account-details__info">
                        <div className="account-details__info-item">
                          <div className="account-details__info-head">
                            <div
                              data-v-2ce223c0=""
                              className="account-details__info-key _gray _bold _smallest _upper"
                            >
                              {info.floating_profit}
                            </div>
                            <div
                              arrow="true"
                              arrowtype="round"
                              animation="fade"
                              maxwidth="300"
                              placement="top-center"
                              size="small"
                              hideonclick="true"
                              className="ct-tooltip account-details__info-tooltip"
                            >
                              <div tabindex="0">
                                <div className="ct-tooltip__icon">
                                  <img src="https://friconix.com/png/fi-cnsuxs-question-mark.png" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="account-details__info-mobile-dots"></div>
                          <div
                            data-v-2ce223c0=""
                            className="account-details__info-value _bold _upper _negative"
                          >
                            -${info.floating_profit}
                          </div>
                        </div>
                        <div className="account-details__info-item">
                          <div className="account-details__info-head">
                            <div
                              data-v-2ce223c0=""
                              className="account-details__info-key _gray _bold _smallest _upper"
                            >
                              Balance
                            </div>
                            <div
                              arrow="true"
                              arrowtype="round"
                              animation="fade"
                              maxwidth="300"
                              placement="top-center"
                              size="small"
                              hideonclick="true"
                              className="ct-tooltip account-details__info-tooltip"
                            >
                              <div tabindex="0">
                                <div className="ct-tooltip__icon">
                                  <img src="https://friconix.com/png/fi-cnsuxs-question-mark.png" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="account-details__info-mobile-dots"></div>
                          <div
                            data-v-2ce223c0=""
                            className="account-details__info-value _bold _upper"
                          >
                            ${info.balance}
                          </div>
                        </div>
                        <div className="account-details__info-item">
                          <div className="account-details__info-head">
                            <div
                              data-v-2ce223c0=""
                              className="account-details__info-key _gray _bold _smallest _upper"
                            >
                              MASTER TRADER'S BONUS
                            </div>
                            <div
                              arrow="true"
                              arrowtype="round"
                              animation="fade"
                              maxwidth="300"
                              placement="top-center"
                              size="small"
                              hideonclick="true"
                              className="ct-tooltip account-details__info-tooltip"
                            >
                              <div tabindex="0">
                                <div className="ct-tooltip__icon">
                                  <img src="https://friconix.com/png/fi-cnsuxs-question-mark.png" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="account-details__info-mobile-dots"></div>
                          <div
                            data-v-2ce223c0=""
                            className="account-details__info-value _bold _upper"
                          >
                            ${info.master_traders_bonus}
                          </div>
                        </div>
                        <div className="account-details__info-item">
                          <div className="account-details__info-head">
                            <div
                              data-v-2ce223c0=""
                              className="account-details__info-key _gray _bold _smallest _upper"
                            >
                              LEVERAGE
                            </div>
                            <div
                              arrow="true"
                              arrowtype="round"
                              animation="fade"
                              maxwidth="300"
                              placement="top-center"
                              size="small"
                              hideonclick="true"
                              className="ct-tooltip account-details__info-tooltip"
                            >
                              <div tabindex="0">
                                <div className="ct-tooltip__icon">
                                  <img src="https://friconix.com/png/fi-cnsuxs-question-mark.png" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="account-details__info-mobile-dots"></div>
                          <div
                            data-v-2ce223c0=""
                            className="account-details__info-value _bold _upper"
                          >
                            {info.leverage}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="master__section_history">
                <div className="master__history">
                  <div className="history">
                    <div className="history__header">
                      <div
                        data-v-2ce223c0=""
                        className="history__head _black _bold _medium"
                      >
                        History
                      </div>
                      <div className="history__nav-wrapper">
                        <div className="history__nav">
                          <button className="history__nav-item _is-active">
                            Closed orders
                          </button>
                          <button className="history__nav-item">
                            Open orders (3)
                          </button>
                          <button className="history__nav-item">
                            Balance operations
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="history__body">
                      <div className="history__tables">
                        <div className="history-table">
                          <div className="history-table__head">
                            <div
                              data-v-2ce223c0=""
                              className="history-table__head-item _gray _bold _smallest _upper"
                            >
                              TRADES
                            </div>
                            <div
                              data-v-2ce223c0=""
                              className="history-table__head-item _gray _bold _smallest _upper"
                            >
                              CLOSE TIME
                            </div>
                            <div
                              data-v-2ce223c0=""
                              className="history-table__head-item _gray _bold _smallest _upper"
                            >
                              DURATION
                            </div>
                            <div
                              data-v-2ce223c0=""
                              className="history-table__head-item _gray _bold _smallest _upper"
                            >
                              PROFIT
                            </div>
                          </div>
                          <div className="history-table__day">Yesterday</div>
                          <div className="history-table__body">
                            <div className="history-table__row">
                              <div className="history-table__row-body">
                                <div className="history-table__row-section _trade">
                                  <div className="history-table__icon">
                                    <NorthEastSharpIcon color="primary" />
                                  </div>
                                  <div className="history-table__volume">
                                    0.01
                                  </div>
                                  <div className="history-table__currency">
                                    EURUSD
                                  </div>
                                </div>
                                <div className="history-table__row-section _time">
                                  10:41
                                </div>
                                <div className="history-table__row-section _duration">
                                  1d 03h 40m 02s
                                </div>
                                <div className="history-table__row-section _profit _positive">
                                  $6.64
                                </div>
                              </div>
                              <div className="history-table__mobile-body">
                                <div className="history-table__mobile-row">
                                  <div className="history-table__mobile-key">
                                    Close time
                                  </div>
                                  <div className="history-table__mobile-dots"></div>
                                  <div className="history-table__mobile-value">
                                    10:41
                                  </div>
                                </div>
                                <div className="history-table__mobile-row">
                                  <div className="history-table__mobile-key">
                                    Duration
                                  </div>
                                  <div className="history-table__mobile-dots"></div>
                                  <div className="history-table__mobile-value">
                                    1d 03h 40m 02s
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="history-table__row">
                              <div className="history-table__row-body">
                                <div className="history-table__row-section _trade">
                                  <div className="history-table__icon">
                                    {/* <img src="https://cdn1.iconfinder.com/data/icons/basic-ui-elements-coloricon/21/33-1024.png" /> */}
                                    <NorthEastSharpIcon color="primary" />
                                  </div>
                                  <div className="history-table__volume">
                                    0.01
                                  </div>
                                  <div className="history-table__currency">
                                    EURUSD
                                  </div>
                                </div>
                                <div className="history-table__row-section _time">
                                  10:40
                                </div>
                                <div className="history-table__row-section _duration">
                                  1d 18h 16m 24s
                                </div>
                                <div className="history-table__row-section _profit _positive">
                                  $3.26
                                </div>
                              </div>
                              <div className="history-table__mobile-body">
                                <div className="history-table__mobile-row">
                                  <div className="history-table__mobile-key">
                                    Close time
                                  </div>
                                  <div className="history-table__mobile-dots"></div>
                                  <div className="history-table__mobile-value">
                                    10:40
                                  </div>
                                </div>
                                <div className="history-table__mobile-row">
                                  <div className="history-table__mobile-key">
                                    Duration
                                  </div>
                                  <div className="history-table__mobile-dots"></div>
                                  <div className="history-table__mobile-value">
                                    1d 03h 40m 02s
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="history-table__row">
                              <div className="history-table__row-body">
                                <div className="history-table__row-section _trade">
                                  <div className="history-table__icon">
                                    {/* <img src="https://cdn1.iconfinder.com/data/icons/basic-ui-elements-coloricon/21/33-1024.png" /> */}
                                    <NorthEastSharpIcon color="primary" />
                                  </div>
                                  <div className="history-table__volume">
                                    0.01
                                  </div>
                                  <div className="history-table__currency">
                                    EURUSD
                                  </div>
                                </div>
                                <div className="history-table__row-section _time">
                                  11:28
                                </div>
                                <div className="history-table__row-section _duration">
                                  04h 27m 29s
                                </div>
                                <div className="history-table__row-section _profit _positive">
                                  $3.05
                                </div>
                              </div>
                              <div className="history-table__mobile-body">
                                <div className="history-table__mobile-row">
                                  <div className="history-table__mobile-key">
                                    Close time
                                  </div>
                                  <div className="history-table__mobile-dots"></div>
                                  <div className="history-table__mobile-value">
                                    11:28
                                  </div>
                                </div>
                                <div className="history-table__mobile-row">
                                  <div className="history-table__mobile-key">
                                    Duration
                                  </div>
                                  <div className="history-table__mobile-dots"></div>
                                  <div className="history-table__mobile-value">
                                    04h 27m 29s
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="history-table__day">2022-04-28</div>
                          <div className="history-table__body">
                            <div className="history-table__row _gray _not-trade">
                              <div className="history-table__row-body">
                                <div className="history-table__row-section _trade">
                                  <div className="history-table__icon">
                                    {/* <img src="" /> */}
                                    <GetAppSharpIcon color="primary" />
                                  </div>
                                  Withdrawal
                                </div>
                                <div className="history-table__row-section _time">
                                  18:38
                                </div>
                                <div className="history-table__row-section _duration"></div>
                                <div className="history-table__row-section _profit">
                                  -$10.00
                                </div>
                              </div>
                              <div className="history-table__mobile-body">
                                <div className="history-table__mobile-row">
                                  <div className="history-table__mobile-key">
                                    Time
                                  </div>
                                  <div className="history-table__mobile-dots"></div>
                                  <div className="history-table__mobile-value">
                                    18:38
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="history-table__row">
                              <div className="history-table__row-body">
                                <div className="history-table__row-section _trade">
                                  <div className="history-table__icon">
                                    {/* <img src="https://cdn1.iconfinder.com/data/icons/basic-ui-elements-coloricon/21/33-1024.png" /> */}
                                    <NorthEastSharpIcon color="primary" />
                                  </div>
                                  <div className="history-table__volume">
                                    0.01
                                  </div>
                                  <div className="history-table__currency">
                                    EURUSD
                                  </div>
                                </div>
                                <div className="history-table__row-section _time">
                                  10:36
                                </div>
                                <div className="history-table__row-section _duration">
                                  1d 18h 12m 34s
                                </div>
                                <div className="history-table__row-section _profit _positive">
                                  $2.02
                                </div>
                              </div>
                              <div className="history-table__mobile-body">
                                <div className="history-table__mobile-row">
                                  <div className="history-table__mobile-key">
                                    Close time
                                  </div>
                                  <div className="history-table__mobile-dots"></div>
                                  <div className="history-table__mobile-value">
                                    10:36
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="history-table__day">2022-04-26</div>
                          <div className="history-table__body">
                            <div className="history-table__row">
                              <div className="history-table__row-body">
                                <div className="history-table__row-section _trade">
                                  <div className="history-table__icon">
                                    {/* <img src="https://cdn1.iconfinder.com/data/icons/basic-ui-elements-coloricon/21/33-1024.png" /> */}
                                    <NorthEastSharpIcon color="primary" />
                                  </div>
                                  <div className="history-table__volume">
                                    0.01
                                  </div>
                                  <div className="history-table__currency">
                                    EURUSD
                                  </div>
                                </div>
                                <div className="history-table__row-section _time">
                                  10:32
                                </div>
                                <div className="history-table__row-section _duration">
                                  05m 52s
                                </div>
                                <div className="history-table__row-section _profit _positive">
                                  $1.15
                                </div>
                              </div>
                              <div className="history-table__mobile-body">
                                <div className="history-table__mobile-row">
                                  <div className="history-table__mobile-key">
                                    Close time
                                  </div>
                                  <div className="history-table__mobile-dots"></div>
                                  <div className="history-table__mobile-value">
                                    10:32
                                  </div>
                                </div>
                                <div className="history-table__mobile-row">
                                  <div className="history-table__mobile-key">
                                    Duration
                                  </div>
                                  <div className="history-table__mobile-dots"></div>
                                  <div className="history-table__mobile-value">
                                    05m 52s
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="history-table__day">2022-04-25</div>
                          <div className="history-table__body">
                            <div className="history-table__row _is-active">
                              <div className="history-table__row-body">
                                <div className="history-table__row-section _trade">
                                  <div className="history-table__icon">
                                    {/* <img src="https://cdn1.iconfinder.com/data/icons/basic-ui-elements-coloricon/21/33-1024.png" /> */}
                                    <NorthEastSharpIcon color="primary" />
                                  </div>
                                  <div className="history-table__volume">
                                    0.01
                                  </div>
                                  <div className="history-table__currency">
                                    EURUSD
                                  </div>
                                </div>
                                <div className="history-table__row-section _time">
                                  14:37
                                </div>
                                <div className="history-table__row-section _duration">
                                  02h 06m 16s
                                </div>
                                <div className="history-table__row-section _profit _positive">
                                  $0.60
                                </div>
                              </div>

                              <div className="history-table__mobile-body">
                                <div className="history-table__mobile-row">
                                  <div className="history-table__mobile-key">
                                    Close time
                                  </div>
                                  <div className="history-table__mobile-dots"></div>
                                  <div className="history-table__mobile-value">
                                    14:37
                                  </div>
                                </div>
                                <div className="history-table__mobile-row">
                                  <div className="history-table__mobile-key">
                                    Duration
                                  </div>
                                  <div className="history-table__mobile-dots"></div>
                                  <div className="history-table__mobile-value">
                                    02h 06m 16s
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="history-table__row">
                              <div className="history-table__row-body">
                                <div className="history-table__row-section _trade">
                                  <div className="history-table__icon">
                                    {/* <img src="https://cdn1.iconfinder.com/data/icons/basic-ui-elements-coloricon/21/33-1024.png" />/ */}
                                    <NorthEastSharpIcon color="primary" />
                                  </div>
                                  <div className="history-table__volume">
                                    0.01
                                  </div>
                                  <div className="history-table__currency">
                                    EURUSD
                                  </div>
                                </div>
                                <div className="history-table__row-section _time">
                                  14:37
                                </div>
                                <div className="history-table__row-section _duration">
                                  01h 14m 21s
                                </div>
                                <div className="history-table__row-section _profit _positive">
                                  $1.50
                                </div>
                              </div>
                              <div className="history-table__mobile-body">
                                <div className="history-table__mobile-row">
                                  <div className="history-table__mobile-key">
                                    Close time
                                  </div>
                                  <div className="history-table__mobile-dots"></div>
                                  <div className="history-table__mobile-value">
                                    14:37
                                  </div>
                                </div>
                                <div className="history-table__mobile-row">
                                  <div className="history-table__mobile-key">
                                    Duration
                                  </div>
                                  <div className="history-table__mobile-dots"></div>
                                  <div className="history-table__mobile-value">
                                    01h 14m 21s
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="history-table__day">2022-04-22</div>
                          <div className="history-table__body">
                            <div className="history-table__row">
                              <div className="history-table__row-body">
                                <div className="history-table__row-section _trade">
                                  <div className="history-table__icon">
                                    {/* <img src="https://www.kindpng.com/imgv/ioTxJTJ_blue-arrow-right-down-svg-clip-arts-clipart/" /> */}
                                    <SouthEastSharpIcon />
                                  </div>
                                  <div className="history-table__volume">
                                    0.01
                                  </div>
                                  <div className="history-table__currency">
                                    EURUSD
                                  </div>
                                </div>
                                <div className="history-table__row-section _time">
                                  10:14
                                </div>
                                <div className="history-table__row-section _duration">
                                  01h 59m 20s
                                </div>
                                <div className="history-table__row-section _profit _positive">
                                  $4.18
                                </div>
                              </div>
                              <div className="history-table__mobile-body">
                                <div className="history-table__mobile-row">
                                  <div className="history-table__mobile-key">
                                    Close time
                                  </div>
                                  <div className="history-table__mobile-dots"></div>
                                  <div className="history-table__mobile-value">
                                    10:14
                                  </div>
                                </div>
                                <div className="history-table__mobile-row">
                                  <div className="history-table__mobile-key">
                                    Duration
                                  </div>
                                  <div className="history-table__mobile-dots"></div>
                                  <div className="history-table__mobile-value">
                                    01h 59m 20s
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="history-table__row">
                              <div className="history-table__row-body">
                                <div className="history-table__row-section _trade">
                                  <div className="history-table__icon">
                                    {/* <img src="https://www.kindpng.com/imgv/ioTxJTJ_blue-arrow-right-down-svg-clip-arts-clipart/" /> */}
                                    <SouthEastSharpIcon />
                                  </div>
                                  <div className="history-table__volume">
                                    0.01
                                  </div>
                                  <div className="history-table__currency">
                                    EURUSD
                                  </div>
                                </div>
                                <div className="history-table__row-section _time">
                                  10:02
                                </div>
                                <div className="history-table__row-section _duration">
                                  01h 50m 55s
                                </div>
                                <div className="history-table__row-section _profit _positive">
                                  $3.12
                                </div>
                              </div>
                              <div className="history-table__mobile-body">
                                <div className="history-table__mobile-row">
                                  <div className="history-table__mobile-key">
                                    Close time
                                  </div>
                                  <div className="history-table__mobile-dots"></div>
                                  <div className="history-table__mobile-value">
                                    10:02
                                  </div>
                                </div>
                                <div className="history-table__mobile-row">
                                  <div className="history-table__mobile-key">
                                    Duration
                                  </div>
                                  <div className="history-table__mobile-dots"></div>
                                  <div className="history-table__mobile-value">
                                    01h 50m 55s
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="history-table__row">
                              <div className="history-table__row-body">
                                <div className="history-table__row-section _trade">
                                  <div className="history-table__icon">
                                    {/* <img src="https://www.kindpng.com/imgv/ioTxJTJ_blue-arrow-right-down-svg-clip-arts-clipart/" /> */}
                                    <SouthEastSharpIcon />
                                  </div>
                                  <div className="history-table__volume">
                                    0.01
                                  </div>
                                  <div className="history-table__currency">
                                    EURUSD
                                  </div>
                                </div>
                                <div className="history-table__row-section _time">
                                  09:54
                                </div>
                                <div className="history-table__row-section _duration">
                                  01h 37m 05s
                                </div>
                                <div className="history-table__row-section _profit _positive">
                                  $2.07
                                </div>
                              </div>
                              <div className="history-table__mobile-body">
                                <div className="history-table__mobile-row">
                                  <div className="history-table__mobile-key">
                                    Close time
                                  </div>
                                  <div className="history-table__mobile-dots"></div>
                                  <div className="history-table__mobile-value">
                                    09:54
                                  </div>
                                </div>
                                <div className="history-table__mobile-row">
                                  <div className="history-table__mobile-key">
                                    Duration
                                  </div>
                                  <div className="history-table__mobile-dots"></div>
                                  <div className="history-table__mobile-value">
                                    01h 37m 05s
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="history-table__show-more">
                            <div className="history-table__show-more-button">
                              show more
                            </div>
                          </div>
                        </div>
                        <div className="history-table"></div>
                        <div className="history-table"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="master__section._bottom-nav"> </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MasterCopy;
