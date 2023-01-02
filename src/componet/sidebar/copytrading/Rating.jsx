import {
  Avatar,
  FormControl,
  InputAdornment,
  InputBase,
  MenuItem,
  OutlinedInput,
  Select,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import MenuIcon from "@mui/icons-material/Menu";
import GridViewIcon from "@mui/icons-material/GridView";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import StarIcon from "@mui/icons-material/Star";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { NavLink, useNavigate } from "react-router-dom";
import "./rating.css";
import { BootstrapInput } from "../../customComponet/CustomElement";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { IsApprove, Url } from "../../../global";

const Rating = () => {
  const navigate = useNavigate();
  const cardNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const [showFilter, setShowFilter] = useState(false);
  const [isGrid, setIsGrid] = useState(true);
  const [age, setAge] = useState();
  const [search, setSearch] = useState("");
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const [tableData, setTableData] = useState({
    draw: "",
    start: "",
    length: "",
  });
  const [copyTrading, setCopyTrading] = useState({
    data: {},
  });
  const [copyTradingLoader, setCopyTradingLoader] = useState(true);
  toast.configure();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAge((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
    console.log(event.target.value);
  };

  const getCopyTradingAccount = async () => {
    setCopyTradingLoader(true);
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("draw", 0);
    param.append("start", 0);
    param.append("length", 10);

    await axios
      .post(`${Url}/datatable/view_copy_trading_account.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          console.log(res.data);
          copyTrading.data = res.data;
          setCopyTrading({ ...copyTrading });
          setTotalPage(Math.ceil(res.data.iTotalRecords / 10));
          console.log(copyTrading);
        }
        setCopyTradingLoader(false);
      });
  };

  const pageChange = async (e, value) => {
    console.log(e, value);
    setPage(value);
    setCopyTradingLoader(true);
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("draw", 0);
    param.append("start", value * 10 - 10);
    param.append("length", 10);

    await axios
      .post(`${Url}/datatable/view_copy_trading_account.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          console.log(res.data);
          copyTrading.data = res.data;
          setCopyTrading({ ...copyTrading });
          console.log(copyTrading);
        }
        setCopyTradingLoader(false);
      });
  };

  const searchCopyTrader = async (e) => {
    setSearch(e.target.value);
    console.log("search", e.target.value);
    setCopyTradingLoader(true);
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("draw", 0);
    param.append("start", page * 10 - 10);
    param.append("length", 10);
    param.append("search", e.target.value);

    await axios
      .post(`${Url}/datatable/view_copy_trading_account.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          console.log(res.data);
          copyTrading.data = res.data;
          setCopyTrading({ ...copyTrading });
          setTotalPage(Math.ceil(res.data.iTotalRecords / 10));
          console.log(copyTrading);
        }
        setCopyTradingLoader(false);
      });
  };

  useEffect(() => {
    getCopyTradingAccount();
  }, []);
  return (
    <div>
      <div className="rating__header">
        <h2 className="rating__head"> Master rating</h2>
        <div className="rating__search">
          {/* <div className="rating__search-button">
            <SearchIcon />
          </div> */}
        </div>
      </div>
      <div className="rating__filter-d">
        <div className="filter-d">
          <div className="filter-d__top">
            {/* <div className="filter-d__filter-area">
              <FormControl className=" w-100">
                <label
                  htmlFor="transactionGateway"
                  className="text-info font-weight-bold form-label-head w-100 mt-4"
                >
                  Whom to show first
                </label>
                <Select
                  value={age}
                  name="transaction"
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{
                    "aria-label": "Without label",
                  }}
                  input={<BootstrapInput />}
                  className="mt-0 ml-0"
                  id="fullWidth"
                >
                  <MenuItem value="Risk score">Risk score</MenuItem>
                  <MenuItem value="Top gainers">Top gainers</MenuItem>
                  <MenuItem value="Most popular">Most popular</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="filter-d__filter-area">
              <FormControl className=" w-100">
                <label
                  htmlFor="transactionGateway"
                  className="text-info font-weight-bold form-label-head w-100 mt-4"
                >
                  For what time{" "}
                </label>
                <Select
                  value={age}
                  name="transaction"
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{
                    "aria-label": "Without label",
                  }}
                  input={<BootstrapInput />}
                  className="mt-0 ml-0"
                  id="fullWidth"
                >
                  <MenuItem value="All time">All time</MenuItem>
                  <MenuItem value="6 months">6 months</MenuItem>
                  <MenuItem value="3 months">3 months</MenuItem>
                  <MenuItem value="1 months">1 months</MenuItem>
                  <MenuItem value="2 Weeks">2 Weeks</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div
              className={
                showFilter ? "filter-d__more _is-active" : "filter-d__more "
              }
              onClick={() => setShowFilter(!showFilter)}
            >
              <div className="filter-d__more-icon">
                <FilterListIcon />
              </div>
              <div className="filter-d__more-text">Filters</div>
            </div> */}
            <div className="filter-d__change-view">
              <div className="">
                <FormControl
                  sx={{ m: 1, width: "25ch" }}
                  variant="standard"
                  className="border-zero"
                >
                  <OutlinedInput
                    placeholder="Search"
                    value={search}
                    onChange={searchCopyTrader}
                    endAdornment={
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <div
                className={`filter-d__view-button _table ${
                  isGrid == false ? "_is-active" : ""
                }`}
                onClick={() => setIsGrid(false)}
              >
                <MenuIcon />
              </div>
              <div
                className={`filter-d__view-button _cards ${
                  isGrid == true ? "_is-active" : ""
                }`}
                onClick={() => setIsGrid(true)}
              >
                <GridViewIcon />
              </div>
            </div>
          </div>
          {/* <div
            className="filter-d__slide-up-down"
            style={showFilter ? {} : { height: "0px", overflow: "hidden" }}
          >
            <div className="filter-d__bottom">
              <div className="filter-d__row">
                <div className="filter-d__filter-area">
                  <div className="filter-d__filter-name">
                    <div className="_black _small text-info font-weight-bold form-label-head w-100">
                      Minimum investment
                    </div>
                  </div>
                  <div className="filter-d__filter-input">
                    <BootstrapInput
                      name="note"
                      displayEmpty
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                    />
                  </div>
                </div>
                <div className="filter-d__filter-area">
                  <FormControl className=" w-100">
                    <label
                      htmlFor="transactionGateway"
                      className="text-info font-weight-bold form-label-head w-100 "
                    >
                      Minimum expertise
                    </label>
                    <Select
                      value={age}
                      name="transaction"
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{
                        "aria-label": "Without label",
                      }}
                      input={<BootstrapInput />}
                      className="mt-0 ml-0"
                      id="fullWidth"
                    >
                      <MenuItem value="Risk score">
                        {" "}
                        <StarIcon fontSize="20px" />
                        Risk score
                      </MenuItem>
                      <MenuItem value="Top gainers">
                        {" "}
                        <StarIcon fontSize="20px" /> Top gainers
                      </MenuItem>
                      <MenuItem value="Most popular">
                        <StarIcon fontSize="20px" /> Most popular
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="filter-d__checkboxes">
                  <div className="filter-d__checkbox">
                    <div className="checkbox">
                      <input
                        id="free-trial"
                        type="checkbox"
                        className="checkbox__input"
                      />
                      <label className="checkbox__label" htmlFor="free-trial">
                        <div className="checkbox__text text-info font-weight-bold form-label-head w-100">
                          Free 7-day trial
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-d__nav">
                <div className="filter-d__row _end _center">
                  <div className="_black _bold _smallest _upper text-info font-weight-bold">
                    4544 Master Traders shown
                  </div>
                  <div className="filter-d__reset text-info font-weight-bold ">
                    Reset all
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {copyTradingLoader ? (
        <div className="card-section-loader">
          <div className="card-loader"></div>
          <div className="card-loader"></div>
          <div className="card-loader"></div>
        </div>
      ) : isGrid ? (
        <div className="rating__list _cards">
          <div className="r-cards gridDeposit">
            {copyTrading.data.aaData.map((item, index) => {
              return (
                <>
                  <NavLink
                    className="r-cards__card"
                    to={`/copytrading/${item.copy_master_id}`}
                  >
                    <div className="r-card">
                      <div className="r-card__head">
                        <div className="r-card__view">
                          <Avatar
                            alt="Remy Sharp"
                            src={item.copy_master_profile_pic}
                          />
                          <div className="r-card__country">
                            <img
                              src="https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg"
                              alt=""
                              className="r-card__country-flag"
                            />
                          </div>
                        </div>
                        <div className="r-card__about">
                          <div className="r-card__name">
                            {item.copy_master_name}
                          </div>
                          <div className="r-card__master-exp">
                            <div className="master-exp master-exp _r-cards ">
                              <div className="master-exp__nav">
                                <div className="master-exp__image">
                                  <StarIcon fontSize="small" />
                                </div>
                                <div className="master-exp__text">
                                  {item.copy_position}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="r-card__inner">
                        <div className="r-card__header">
                          <div className="r-card__param _no-margin">
                            RISK SCORE
                          </div>
                          <div className="risk-score risk-score--size-lg risk-score--value-1">
                            <div className="risk-score__value">
                              {item.copy_risk_score}
                            </div>
                          </div>
                        </div>
                        <div className="r-card__body">
                          <div className="r-card__info">
                            <div className="r-card__gain">
                              <div className="r-card__param">Gain</div>
                              <div className="r-card__gain-value _positive">
                                +{item.copy_gain}%
                              </div>
                            </div>
                            <div className="r-card__copiers">
                              <div className="r-card__param">copiers</div>
                              <div className="r-card__copiers-wrap">
                                <div className="r-card__copiers-count">
                                  5872
                                </div>
                                <div className="r-card__copiers-delta-image _positive">
                                  <ArrowUpwardIcon />
                                </div>
                                <div className="r-card__copiers-delta _positive">
                                  {item.current_copier}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="r-card__profit-wrapper">
                            <div className="r-card__param">PROFIT AND LOSS</div>
                            <div className="r-card__profit">
                              <div className="r-card__profit-head">
                                <div className="r-card__profit-title">
                                  ${item.copy_profit}
                                </div>
                                <div className="r-card__profit-title">
                                  {" "}
                                  ${item.copy_loss}
                                </div>
                              </div>
                              <div className="r-card__profit-body"></div>
                            </div>
                          </div>
                        </div>
                        <div className="r-card__footer">
                          <div className="r-card__param _no-margin">
                            Commission
                          </div>
                          <div className="r-card__footer-value">
                            {item.commission_percentage}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                </>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="rating__list _table">
          <div className="r-table">
            <div className="r-table__head">
              <div className="r-table__section _about">
                <div className=" r-table__section _status"></div>
                <div className="r-table__section _risk">
                  <div className="r-table__section-name">RISK SCORE</div>
                  <div className="r-table__section-desc">All time</div>
                </div>
                <div className="r-table__section _gain">
                  <div className="r-table__section-name">GAIN</div>
                  <div className="r-table__section-desc">All time</div>
                </div>
                <div className="r-table__section _profit">
                  <div className="r-table__section-name">PROFIT AND LOSS</div>
                  <div className="r-table__section-desc">All time</div>
                </div>
                <div className="r-table__section _copiers">
                  <div className="r-table__section-name">COPIERS</div>
                  <div className="r-table__section-desc">All time</div>
                </div>
                <div className="r-table__section _commission">
                  <div className="r-table__section-name">COMMISSION</div>
                </div>
              </div>
            </div>
            <div className="r-table__body">
              {copyTrading.data.aaData.map((item, index) => {
                return (
                  <a className="r-table__row">
                    <div className="r-table__section _about">
                      <div className="r-table__row-about">
                        <div className="img-content">
                          <Avatar
                            alt="Remy Sharp"
                            src={item.copy_master_profile_pic}
                          />
                          <div className="r-card__country">
                            <img
                              src="https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg"
                              alt=""
                              className="r-card__country-flag"
                            />
                          </div>
                        </div>
                        <div className="text-content">
                          <label>{item.copy_master_name}</label>
                          <p> {item.copy_position}</p>
                        </div>
                      </div>
                      <div className="r-table__section _risk">
                        <div className="risk-box red">
                          <label>{item.copy_risk_score}</label>
                          <p>RISK</p>
                        </div>
                      </div>
                      <div className="r-table__section _gain">
                        <label>+{item.copy_gain}%</label>
                      </div>
                      <div className="r-table__section _profit">
                        <div className="text-section">
                          <label>${item.copy_profit}</label>
                          <label>${item.copy_loss}</label>
                        </div>
                        <div className="line-section"></div>
                      </div>
                      <div className="r-table__section _copiers">
                        <div className="text-content">
                          <label>5054</label>
                          <div>
                            <span className="material-icons">north</span>
                            <label>{item.current_copier}</label>
                          </div>
                        </div>
                      </div>
                      <div className="r-table__section _commission">
                        <label>{item.commission_percentage}%</label>
                      </div>
                    </div>
                  </a>
                );
              })}
              {/* <a className="r-table__row">
              <div className="r-table__section _about">
                <div className="r-table__row-about">
                  <div className="img-content">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://static.jobscan.co/blog/uploads/jeanette-b-testimonial-1.png"
                    />
                    <div className="r-card__country">
                      <img
                        src="https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg"
                        alt=""
                        className="r-card__country-flag"
                      />
                    </div>
                  </div>
                  <div className="text-content">
                    <label>Dolbit</label>
                    <p> Expert</p>
                  </div>
                </div>
                <div className="r-table__section _risk">
                  <div className="risk-box green">
                    <label>6</label>
                    <p>RISK</p>
                  </div>
                </div>
                <div className="r-table__section _gain">
                  <label>+52%</label>
                </div>
                <div className="r-table__section _profit">
                  <div className="text-section">
                    <label>$2186</label>
                    <label>$254.2</label>
                  </div>
                  <div className="marge-line">
                    <div className="line-section-green" style={{width: '80%'}}></div>
                    <div className="line-section-red" style={{width: '20%'}}></div>
                  </div>
                </div>
                <div className="r-table__section _copiers">
                  <div className="text-content">
                    <label>5054</label>
                    <div><span className="material-icons">north</span><label>5054</label></div>
                  </div>
                </div>
                <div className="r-table__section _commission">
                  <label>28%</label>
                </div>
              </div>
            </a>
            <a className="r-table__row">
              <div className="r-table__section _about">
                <div className="r-table__row-about">
                  <div className="img-content">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://static.jobscan.co/blog/uploads/jeanette-b-testimonial-1.png"
                    />
                    <div className="r-card__country">
                      <img
                        src="https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg"
                        alt=""
                        className="r-card__country-flag"
                      />
                    </div>
                  </div>
                  <div className="text-content">
                    <label>Dolbit</label>
                    <p> Expert</p>
                  </div>
                </div>
                <div className="r-table__section _risk">
                  <div className="risk-box green">
                    <label>6</label>
                    <p>RISK</p>
                  </div>
                </div>
                <div className="r-table__section _gain">
                  <label>+52%</label>
                </div>
                <div className="r-table__section _profit">
                  <div className="text-section">
                    <label>$2186</label>
                    <label>$254.2</label>
                  </div>
                  <div className="line-section"></div>
                </div>
                <div className="r-table__section _copiers">
                  <div className="text-content">
                    <label>5054</label>
                    <div><span className="material-icons">north</span><label>5054</label></div>
                  </div>
                </div>
                <div className="r-table__section _commission">
                  <label>28%</label>
                </div>
              </div>
            </a>
            <a className="r-table__row">
              <div className="r-table__section _about">
                <div className="r-table__row-about">
                  <div className="img-content">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://static.jobscan.co/blog/uploads/jeanette-b-testimonial-1.png"
                    />
                    <div className="r-card__country">
                      <img
                        src="https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg"
                        alt=""
                        className="r-card__country-flag"
                      />
                    </div>
                  </div>
                  <div className="text-content">
                    <label>Dolbit</label>
                    <p> Expert</p>
                  </div>
                </div>
                <div className="r-table__section _risk">
                  <div className="risk-box green">
                    <label>6</label>
                    <p>RISK</p>
                  </div>
                </div>
                <div className="r-table__section _gain">
                  <label>+52%</label>
                </div>
                <div className="r-table__section _profit">
                  <div className="text-section">
                    <label>$2186</label>
                    <label>$254.2</label>
                  </div>
                  <div className="line-section"></div>
                </div>
                <div className="r-table__section _copiers">
                  <div className="text-content">
                    <label>5054</label>
                    <div><span className="material-icons">north</span><label>5054</label></div>
                  </div>
                </div>
                <div className="r-table__section _commission">
                  <label>28%</label>
                </div>
              </div>
            </a>
            <a className="r-table__row">
              <div className="r-table__section _about">
                <div className="r-table__row-about">
                  <div className="img-content">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://static.jobscan.co/blog/uploads/jeanette-b-testimonial-1.png"
                    />
                    <div className="r-card__country">
                      <img
                        src="https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg"
                        alt=""
                        className="r-card__country-flag"
                      />
                    </div>
                  </div>
                  <div className="text-content">
                    <label>Dolbit</label>
                    <p> Expert</p>
                  </div>
                </div>
                <div className="r-table__section _risk">
                  <div className="risk-box red">
                    <label>6</label>
                    <p>RISK</p>
                  </div>
                </div>
                <div className="r-table__section _gain">
                  <label>+52%</label>
                </div>
                <div className="r-table__section _profit">
                  <div className="text-section">
                    <label>$2186</label>
                    <label>$254.2</label>
                  </div>
                  <div className="line-section"></div>
                </div>
                <div className="r-table__section _copiers">
                  <div className="text-content">
                    <label>5054</label>
                    <div><span className="material-icons">north</span><label>5054</label></div>
                  </div>
                </div>
                <div className="r-table__section _commission">
                  <label>28%</label>
                </div>
              </div>
            </a>
            <a className="r-table__row">
              <div className="r-table__section _about">
                <div className="r-table__row-about">
                  <div className="img-content">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://static.jobscan.co/blog/uploads/jeanette-b-testimonial-1.png"
                    />
                    <div className="r-card__country">
                      <img
                        src="https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg"
                        alt=""
                        className="r-card__country-flag"
                      />
                    </div>
                  </div>
                  <div className="text-content">
                    <label>Dolbit</label>
                    <p> Expert</p>
                  </div>
                </div>
                <div className="r-table__section _risk">
                  <div className="risk-box red">
                    <label>6</label>
                    <p>RISK</p>
                  </div>
                </div>
                <div className="r-table__section _gain">
                  <label>+52%</label>
                </div>
                <div className="r-table__section _profit">
                  <div className="text-section">
                    <label>$2186</label>
                    <label>$254.2</label>
                  </div>
                  <div className="line-section"></div>
                </div>
                <div className="r-table__section _copiers">
                  <div className="text-content">
                    <label>5054</label>
                    <div><span className="material-icons">north</span><label>5054</label></div>
                  </div>
                </div>
                <div className="r-table__section _commission">
                  <label>28%</label>
                </div>
              </div>
            </a>
            <a className="r-table__row">
              <div className="r-table__section _about">
                <div className="r-table__row-about">
                  <div className="img-content">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://static.jobscan.co/blog/uploads/jeanette-b-testimonial-1.png"
                    />
                    <div className="r-card__country">
                      <img
                        src="https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg"
                        alt=""
                        className="r-card__country-flag"
                      />
                    </div>
                  </div>
                  <div className="text-content">
                    <label>Dolbit</label>
                    <p> Expert</p>
                  </div>
                </div>
                <div className="r-table__section _risk">
                  <div className="risk-box green">
                    <label>6</label>
                    <p>RISK</p>
                  </div>
                </div>
                <div className="r-table__section _gain">
                  <label>+52%</label>
                </div>
                <div className="r-table__section _profit">
                  <div className="text-section">
                    <label>$2186</label>
                    <label>$254.2</label>
                  </div>
                  <div className="line-section"></div>
                </div>
                <div className="r-table__section _copiers">
                  <div className="text-content">
                    <label>5054</label>
                    <div><span className="material-icons">north</span><label>5054</label></div>
                  </div>
                </div>
                <div className="r-table__section _commission">
                  <label>28%</label>
                </div>
              </div>
            </a>
            <a className="r-table__row">
              <div className="r-table__section _about">
                <div className="r-table__row-about">
                  <div className="img-content">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://static.jobscan.co/blog/uploads/jeanette-b-testimonial-1.png"
                    />
                    <div className="r-card__country">
                      <img
                        src="https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg"
                        alt=""
                        className="r-card__country-flag"
                      />
                    </div>
                  </div>
                  <div className="text-content">
                    <label>Dolbit</label>
                    <p> Expert</p>
                  </div>
                </div>
                <div className="r-table__section _risk">
                  <div className="risk-box red">
                    <label>6</label>
                    <p>RISK</p>
                  </div>
                </div>
                <div className="r-table__section _gain">
                  <label>+52%</label>
                </div>
                <div className="r-table__section _profit">
                  <div className="text-section">
                    <label>$2186</label>
                    <label>$254.2</label>
                  </div>
                  <div className="line-section"></div>
                </div>
                <div className="r-table__section _copiers">
                  <div className="text-content">
                    <label>5054</label>
                    <div><span className="material-icons">north</span><label>5054</label></div>
                  </div>
                </div>
                <div className="r-table__section _commission">
                  <label>28%</label>
                </div>
              </div>
            </a>
            <a className="r-table__row">
              <div className="r-table__section _about">
                <div className="r-table__row-about">
                  <div className="img-content">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://static.jobscan.co/blog/uploads/jeanette-b-testimonial-1.png"
                    />
                    <div className="r-card__country">
                      <img
                        src="https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg"
                        alt=""
                        className="r-card__country-flag"
                      />
                    </div>
                  </div>
                  <div className="text-content">
                    <label>Dolbit</label>
                    <p> Expert</p>
                  </div>
                </div>
                <div className="r-table__section _risk">
                  <div className="risk-box green">
                    <label>6</label>
                    <p>RISK</p>
                  </div>
                </div>
                <div className="r-table__section _gain">
                  <label>+52%</label>
                </div>
                <div className="r-table__section _profit">
                  <div className="text-section">
                    <label>$2186</label>
                    <label>$254.2</label>
                  </div>
                  <div className="line-section"></div>
                </div>
                <div className="r-table__section _copiers">
                  <div className="text-content">
                    <label>5054</label>
                    <div><span className="material-icons">north</span><label>5054</label></div>
                  </div>
                </div>
                <div className="r-table__section _commission">
                  <label>28%</label>
                </div>
              </div>
            </a>
            <a className="r-table__row">
              <div className="r-table__section _about">
                <div className="r-table__row-about">
                  <div className="img-content">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://static.jobscan.co/blog/uploads/jeanette-b-testimonial-1.png"
                    />
                    <div className="r-card__country">
                      <img
                        src="https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg"
                        alt=""
                        className="r-card__country-flag"
                      />
                    </div>
                  </div>
                  <div className="text-content">
                    <label>Dolbit</label>
                    <p> Expert</p>
                  </div>
                </div>
                <div className="r-table__section _risk">
                  <div className="risk-box red">
                    <label>6</label>
                    <p>RISK</p>
                  </div>
                </div>
                <div className="r-table__section _gain">
                  <label>+52%</label>
                </div>
                <div className="r-table__section _profit">
                  <div className="text-section">
                    <label>$2186</label>
                    <label>$254.2</label>
                  </div>
                  <div className="marge-line">
                    <div className="line-section-green" style={{width: '50%'}}></div>
                    <div className="line-section-red" style={{width: '50%'}}></div>
                  </div>
                </div>
                <div className="r-table__section _copiers">
                  <div className="text-content">
                    <label>5054</label>
                    <div><span className="material-icons">north</span><label>5054</label></div>
                  </div>
                </div>
                <div className="r-table__section _commission">
                  <label>28%</label>
                </div>
              </div>
            </a> */}
            </div>
          </div>
        </div>
      )}

      <div className="pagination">
        <Stack spacing={2}>
          <Pagination
            count={totalPage}
            page={page}
            showFirstButton
            showLastButton
            onChange={pageChange}
          />{" "}
        </Stack>
      </div>
    </div>
  );
};

export default Rating;
