import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ColorButton } from "../../customComponet/CustomElement";
import axios from "axios";
import { IsApprove, Url } from "../../../global";
import Pagination from "@mui/material/Pagination";
import "./rating.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import StarIcon from "@mui/icons-material/Star";
import { NavLink, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Toast from "../../commonComponet/Toast";

const CopierArea = (prop) => {
  const navigate = useNavigate();
  const [copyTradingLoader, setCopyTradingLoader] = useState(true);
  const [openModel, setOpenModel] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = React.useState(1);
  const [copyTradingIndex, setCopyTradingIndex] = React.useState("");
  const [totalPage, setTotalPage] = React.useState(1);
  const [copyTrading, setCopyTrading] = useState({
    data: {},
  });

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
      .post(`${Url}/ajaxfiles/view_my_copy_trading.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          Toast("error", res.data.message);
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
      .post(`${Url}/ajaxfiles/view_my_copy_trading.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          Toast("error", res.data.message);
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
      .post(`${Url}/ajaxfiles/view_my_copy_trading.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          Toast("error", res.data.message);
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

  const deleteConfirm = () => {
    Toast("success", "Copy Trading account successfully deleted");
    setCopyTradingIndex("");
    setOpenModel(false);
  };

  useEffect(() => {
    getCopyTradingAccount();
  }, []);

  console.log(prop);
  return (
    <div>
      <div className="content-container__inner-bg" id="page-copier-area">
        <div className="copy-trade-container _copier">
          <div className="pg-wrap">
            <div className="copy-trade-container__copier-info">
              <div className="copy-trade-container__avatar-inline avatar-container">
                <Avatar
                  alt="Remy Sharp"
                  sx={{ width: "100px", height: "100px" }}
                  src="https://media.istockphoto.com/photos/good-looking-male-business-professional-in-studio-picture-id1201437847?b=1&k=20&m=1201437847&s=170667a&w=0&h=53MwN6gdXfWc74fzM6oU2W7Y9S6RPUFDjOT1EoMaNlI="
                />
                <div className="avatar-container__text-block">
                  <div className="avatar-container__name">DHAVAL BHAYANI</div>
                  <div className="avatar-container__country">
                    <div className="avatar-container__flag">
                      <img
                        src="https://octacdn.com/copy-trade/_img/flags/in.svg?d5912559734617e96e53f58aa123d1a342a5c5db"
                        className="avatar-container__flag-img"
                        alt=""
                      />
                    </div>
                    <div className="avatar-container__country-name">India</div>
                  </div>
                </div>
              </div>
              <div className="copy-trade-container__info copy-trade-user-info">
                <div className="copy-trade-user-info__item">
                  <div className="copy-trade-user-info__title">Profit</div>
                  <div className="copy-trade-user-info__value _plus">$0.00</div>
                </div>
                <div className="copy-trade-user-info__item">
                  <div className="copy-trade-user-info__title">
                    FLOATING PROFIT
                  </div>
                  <div className="copy-trade-user-info__value _plus">$0.00</div>
                </div>
                <div className="copy-trade-user-info__item">
                  <div className="copy-trade-user-info__title">EQUITY</div>
                  <div className="copy-trade-user-info__value _plus">$0.00</div>
                </div>
                <div className="copy-trade-user-info__item">
                  <div className="copy-trade-user-info__title">GAIN</div>
                  <div className="copy-trade-user-info__value _plus">$0.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pg-wrap">
          <div className="contest-content card-pending-bottom-zero">
            {copyTradingLoader ? (
              <div className="card-section-loader">
                <div className="card-loader"></div>
                <div className="card-loader"></div>
                <div className="card-loader"></div>
              </div>
            ) : copyTrading.data.length == 0 ? (
              <div className="contest-content__col">
                <div className="empty-notify">
                  <div className="empty-notify__icon">
                    <img
                      src="https://octacdn.com/copy-trade/_img/icons/icon-guys.svg?767a158c9016d1bb7112f5b3927ff5fabb73b910"
                      className="empty-notify__icon-file"
                    />
                  </div>
                  <div className="empty-notify__text">
                    {" "}
                    Currently, you are not copying any Master Trader.
                  </div>
                  <ColorButton
                    className="empty-notify__button"
                    onClick={() => prop.setValue(0)}
                  >
                    Go to Master Traders' rating
                  </ColorButton>
                </div>
              </div>
            ) : (
              <div className="rating__list _cards">
                <div className="r-cards">
                  {copyTrading.data.aaData.map((item, index) => {
                    return (
                      <>
                        {/* <NavLink
                          className="r-cards__card"
                          to={`/copytrading/${item.copy_master_id}`}
                        > */}
                        <div className="r-card">
                          <div className="r-card__head">
                            <i
                              class="fa fa-trash delete-copy-account"
                              aria-hidden="true"
                              onClick={(e) => {
                                setOpenModel(true);
                                setCopyTradingIndex(index);
                              }}
                            ></i>
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
                                <div className="r-card__param">
                                  PROFIT AND LOSS
                                </div>
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
                        {/* </NavLink> */}
                      </>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          {copyTradingLoader ? (
            ""
          ) : copyTrading.data.length == 0 ? (
            ""
          ) : (
            <div className="pagination">
              <Stack spacing={2}>
                <Pagination
                  count={totalPage}
                  page={page}
                  showFirstButton
                  showLastButton
                  onChange={pageChange}
                />
              </Stack>
            </div>
          )}
          <Dialog
            open={openModel}
            onClose={(e) => setOpenModel(false)}
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
                class: "border border-bottom-0",
              },
            }}
          >
            <DialogContent className="create-account-content ml-4">
              <Grid
                container
                spacing={2}
                className="MuiGrid-justify-xs-space-between mt-2"
              >
                <h3>Are you sure you want to delete it?</h3>
              </Grid>
              <Grid
                container
                spacing={2}
                className="MuiGrid-justify-xs-space-between mt-4"
              >
                <div className="dialog-action-button-end">
                  <ColorButton
                    type="submit"
                    variant="contained"
                    size="medium"
                    className="ml-4 text-capitalize p-3 pl-4 pr-4"
                    onClick={(e) => {
                      setOpenModel(false);
                    }}
                  >
                    Cancel
                  </ColorButton>
                  <ColorButton
                    type="submit"
                    variant="contained"
                    size="medium"
                    className="ml-4 text-capitalize p-3 pl-4 pr-4 btn-danger"
                    onClick={deleteConfirm}
                  >
                    Yes, It is
                  </ColorButton>
                </div>
              </Grid>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CopierArea;
