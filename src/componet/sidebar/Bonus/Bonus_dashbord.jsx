import {
  FormControl,
  Paper,
  Grid,
  Menu,
  MenuItem,
  Select,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import "./Bonus_dashbord.css";
import { ColorButton } from "../../customComponet/CustomElement";
import StarIcon from "@mui/icons-material/Star";
import PropTypes from "prop-types";
import Radio from "@mui/material/Radio";
import { styled } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { IsApprove, Url } from "../../../global";
import axios from "axios";

import NewDate from "../../commonComponet/NewDate";
import Toast from "../../commonComponet/Toast";
function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
const Bonus_dashbord = (props) => {
  const navigate = useNavigate();
  const [checkpop, setCheckPop] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();
  const [data, setData] = useState({
    popData: "",
    isLoder: true,
    arrayData: [],
    popLoder: false,
    radioButton: 10,
  });

  const [mainLoader, setMainLoader] = useState(true);
  const [popData, setPopData] = useState({
    pop1: false,
    pop2: false,
  });
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 1000px)").matches
  );

  const getBonusList = () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("claim_status", 0);

    param.append("draw ", 0);

    param.append("start", 0);

    // param.append("length", -1);
    data.isLoder = true;
    setData({ ...data });
    axios
      .post(Url + "/datatable/deposit_mt5_bonus_list.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          // data.isLoder=false
          // setData({...data})
          // toast.error(res.data.message);
        } else {
          data.isLoder = false;
          data.arrayData = res.data?.aaData;
          setData({ ...data });
          setMainLoader(false);
        }
      });
  };

  const onBonusSubmit = () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("deposit_id", data.popData.deposit_id);
    param.append("bonus_percentage", data.radioButton);

    // param.append("length", -1);
    data.popLoder = true;
    setData({ ...data });
    axios
      .post(Url + "/ajaxfiles/deposit_bonus_claim.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          // data.isLoder=false
          // setData({...data})
          Toast("error", res.data.message);
          data.popLoder = false;
          setData({ ...data });
        } else {
          data.popLoder = false;
          setData({ ...data });
          Toast("success", res.data.message);
          setOpen(false);
          getBonusList();
          // setMainLoader(false);
        }
      });
  };
  useEffect(() => {
    window
      .matchMedia("(min-width: 1000px)")
      .addEventListener("change", (e) => setMatches(e.matches));
    getBonusList();
  }, []);

  const handelCheck = () => {
    if (checkpop == true) {
      setCheckPop(false);
    } else {
      setCheckPop(true);
    }
  };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });
  const popchange = (e) => {
    console.log("okkkkkkkk");
    if (e == "pop1" && popData.pop1 == false) {
      popData.pop1 = true;
      setCheckPop({ ...popData });
    } else {
      popData.pop1 = false;
      setCheckPop({ ...popData });
    }
  };
  const popchange2 = (e) => {
    if (e == "pop2" && popData.pop2 == false) {
      popData.pop2 = true;
      setCheckPop({ ...popData });
    } else {
      popData.pop2 = false;
      setCheckPop({ ...popData });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const manageContent = () => {
    if (open == true) {
      return (
        <>
          <div className="px-5">
            <div className="text-center">
              <span className="head_txt_main">
                ACTIVE A BONUS FOR DEPOSIT{" "}
                <span className="bld_clr">{data.popData.amount}</span>
              </span>
            </div>
            <FormControl className="w-100">
              <RadioGroup
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={data.radioButton}
                className="w-100"
                onChange={(e) => {
                  data.radioButton = e.target.value;
                  setData({ ...data });
                  console.log("radio", e.target.value);
                }}
              >
                <div className="">
                  <FormControlLabel
                    value={10}
                    control={<Radio color="secondary" />}
                  />

                  <span className="bld_clr2">
                    $
                    {((data.popData.deposit_amount * 10) / 100).toFixed(2) >
                    5000
                      ? 5000.0
                      : ((data.popData.deposit_amount * 10) / 100).toFixed(2)}
                  </span>
                  <span className="money_cell">
                    (Trade{" "}
                    {(
                      (((data.popData.deposit_amount * 10) / 100) * 40) /
                      100
                    ).toFixed() > 2000
                      ? 2000.0
                      : (
                          (((data.popData.deposit_amount * 10) / 100) * 40) /
                          100
                        ).toFixed()}{" "}
                    lots to complete)
                  </span>
                  <span className="bld_clr3">10%</span>
                </div>
                <div className="">
                  <FormControlLabel
                    value={20}
                    control={<Radio color="secondary" />}
                  />
                  {/* <Radio value={20} color="secondary" /> */}
                  <span className="bld_clr2">
                    $
                    {((data.popData.deposit_amount * 20) / 100).toFixed(2) >
                    5000
                      ? 5000.0
                      : ((data.popData.deposit_amount * 20) / 100).toFixed(2)}
                  </span>
                  <span className="money_cell">
                    (Trade{" "}
                    {(
                      (((data.popData.deposit_amount * 20) / 100) * 40) /
                      100
                    ).toFixed() > 2000
                      ? 2000.0
                      : (
                          (((data.popData.deposit_amount * 20) / 100) * 40) /
                          100
                        ).toFixed()}{" "}
                    lots to complete)
                  </span>
                  <span className="bld_clr3">20%</span>
                </div>
                <div className="">
                  <FormControlLabel
                    value={30}
                    control={<Radio color="secondary" />}
                  />{" "}
                  <span className="bld_clr2">
                    ${" "}
                    {((data.popData.deposit_amount * 30) / 100).toFixed(2) >
                    5000
                      ? 5000.0
                      : ((data.popData.deposit_amount * 30) / 100).toFixed(2)}
                  </span>
                  <span className="money_cell">
                    (Trade{" "}
                    {(
                      (((data.popData.deposit_amount * 30) / 100) * 40) /
                      100
                    ).toFixed() > 2000
                      ? 2000.0
                      : (
                          (((data.popData.deposit_amount * 30) / 100) * 40) /
                          100
                        ).toFixed()}{" "}
                    lots to complete)
                  </span>
                  <span className="bld_clr3">30%</span>
                </div>
                <div className="">
                  <FormControlLabel
                    value={40}
                    control={<Radio color="secondary" />}
                  />{" "}
                  <span className="bld_clr2">
                    $
                    {((data.popData.deposit_amount * 40) / 100).toFixed(2) >
                    5000
                      ? 5000.0
                      : ((data.popData.deposit_amount * 40) / 100).toFixed(2)}
                  </span>
                  <span className="money_cell">
                    (Trade{" "}
                    {(
                      (((data.popData.deposit_amount * 40) / 100) * 40) /
                      100
                    ).toFixed() > 2000
                      ? 2000.0
                      : (
                          (((data.popData.deposit_amount * 40) / 100) * 40) /
                          100
                        ).toFixed()}{" "}
                    lots to complete)
                  </span>
                  <span className="bld_clr3">40%</span>
                </div>
                <div className="">
                  <FormControlLabel
                    value={50}
                    control={<Radio color="secondary" />}
                  />{" "}
                  <span className="bld_clr2">
                    $
                    {((data.popData.deposit_amount * 50) / 100).toFixed(2) >
                    5000
                      ? 5000.0
                      : ((data.popData.deposit_amount * 50) / 100).toFixed(2)}
                  </span>
                  <span className="money_cell">
                    (Trade{" "}
                    {(
                      (((data.popData.deposit_amount * 50) / 100) * 40) /
                      100
                    ).toFixed() > 2000
                      ? 2000.0
                      : (
                          (((data.popData.deposit_amount * 50) / 100) * 40) /
                          100
                        ).toFixed()}{" "}
                    lots to complete)
                  </span>
                  <span className="bld_clr3">50%</span>
                </div>
              </RadioGroup>
            </FormControl>
            <hr className="line_rw" />
            <div>
              <div>
                <span className="cndton_head">Terms and Condition</span>
              </div>
              <div>
                <span className="blur_row">
                  The bonus amount is 10%, 30%, or 50% of each deposit amount.
                </span>
              </div>
              <div>
                <span>
                  Limited time events may suggest higher bonus amounts up to
                  100% deposit bonus.
                  <span
                    className="cndton_head2"
                    onClick={() => {
                      popchange("pop1");
                    }}
                  >
                    Read More..
                  </span>
                  .
                </span>
              </div>
              {popData.pop1 == true ? (
                <div>
                  <span className="blur_row">
                    The bonus cannot be added to internal transfer deposits and
                    to deposits from contests/ promotions, etc. unless stated
                    otherwise.
                    <br />
                    The Client can only claim a new bonus if the sum of this
                    bonus and the amount of all other bonus funds in the
                    relevant trading account is less than the amount of the
                    Client's funds (excluding bonuses) in this account's free
                    margin.
                  </span>
                </div>
              ) : (
                ""
              )}

              <div>
                <span>
                  It is advised to claim a bonus right after your deposit is
                  credited to your trading account.
                  <span
                    className="cndton_head2"
                    onClick={() => {
                      popchange2("pop2");
                    }}
                  >
                    {" "}
                    Read More..
                  </span>
                </span>
              </div>
              {popData.pop2 == true ? (
                <div>
                  <span className="blur_row">
                    The bonus shall be credited to your account and locked until
                    the volume requirements are met. After the required volume
                    is completed, the bonus will be deducted from your MT4, MT5,
                    or RightTrader credit and simultaneously deposited into your
                    balance.
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              <Checkbox onClick={handelCheck} checked={checkpop} />
              <span className="cndton_head2 ">
                I hereby confirm that I agree terms and conditions
              </span>
            </div>
            <div className="text-center">
              {data.popLoder == true ? (
                <ColorButton className="makeapaymentbutoon" disabled>
                  <svg className="spinner" viewBox="0 0 50 50">
                    <circle
                      className="path"
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      stroke-width="5"
                    ></circle>
                  </svg>
                </ColorButton>
              ) : (
                <ColorButton disabled={!checkpop} onClick={onBonusSubmit}>
                  Redeem Now
                </ColorButton>
              )}
            </div>
          </div>
        </>
      );
    }
  };
  return (
    <>
      {mainLoader == true ? (
        <div className="bonusLoder">
          <svg className="spinner" viewBox="0 0 50 50">
            <circle
              className="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke-width="5"
            ></circle>
          </svg>
        </div>
      ) : (
        <div>
          {data.arrayData.length == 0 ? (
            <div className="text-center">There are no records to display</div>
          ) : (
            <>
              {" "}
              {matches && (
                <>
                  <Grid container>
                    <Grid item md={12}>
                      {/* <div className="head_up">
                <span></span>
                  <span className="Deposit_Amount">Deposit Amount</span>
                  <span className="d_block">MT5</span>
                  <span className="d_block">Deposit Date</span>
                </div> */}
                      <div className="hederbordeer3">
                        {/* <div style={{ width: "7%" }}></div> */}
                        <div
                          className="flex_items"
                          style={{ marginLeft: "7%" }}
                        >
                          <span className="Deposit_Amount w-18"> Amount</span>
                          <span className="d_block w-17">
                            MT5 Account Number
                          </span>
                          <span className="d_block w-24"> Deposit Date</span>
                          <span className="d_block w-27">Action</span>
                        </div>
                      </div>
                      {data.arrayData.map((item, index) => {
                        return (
                          <div className="bordeer3">
                            <div style={{ width: "7%" }}>
                              <h1 className="text_left1">
                                <StarIcon
                                  style={{
                                    color: "#FFC121",
                                    margin: "0 8px",
                                  }}
                                />
                              </h1>
                            </div>
                            <div className="flex_items ">
                              <div className="w-18">
                                <span className="money_doll">
                                  {item.amount}
                                </span>
                              </div>

                              <div className="w-17">
                                <span className="margin_lft">
                                  {item.mt5_acc_no}
                                </span>
                              </div>
                              <div className="w-24">
                                <span className="margin_lft">
                                  <NewDate newDate={item.date} />
                                </span>
                              </div>
                              <div className="w-27">
                                {" "}
                                <ColorButton
                                  id="btn_11"
                                  onClick={() => {
                                    data.popData = item;
                                    handleClickOpen();
                                  }}
                                >
                                  CHOOSE BONUS AMOUNT
                                </ColorButton>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </Grid>
                  </Grid>
                </>
              )}
              {!matches && (
                <>
                  <Grid container>
                    {data.arrayData.map((item, index) => {
                      return (
                        <Grid item md={12}>
                          <div className="bordeer3">
                            <div>
                              <h1 className="text_left1">
                                <StarIcon
                                  style={{
                                    color: "#FFC121",
                                    margin: "0 8px",
                                  }}
                                />
                              </h1>
                            </div>
                            <div className="flex_items">
                              <div>
                                <span className="money_doll">
                                  {item.amount}
                                </span>
                              </div>

                              <div className="d-flex justify-content-between">
                                <span className="d_block">MT5</span>
                                <span className="margin_lft">
                                  {item.mt5_acc_no}
                                </span>
                              </div>
                              <div className="d-flex justify-content-between">
                                <span className="d_block">Deposit Date</span>
                                <span className="margin_lft2">
                                  <NewDate newDate={item.date} />
                                </span>
                              </div>
                              <div>
                                {" "}
                                <ColorButton
                                  id="btn_11"
                                  onClick={() => {
                                    data.popData = item;
                                    handleClickOpen();
                                  }}
                                >
                                  CHOOSE BONUS AMOUNT
                                </ColorButton>
                              </div>
                            </div>
                          </div>
                        </Grid>
                      );
                    })}
                  </Grid>
                </>
              )}
            </>
          )}

          <BootstrapDialog
            onClose={handleClose}
            // aria-labelledby="customized-dialog-title"
            fullWidth={true}
            maxWidth="sm"
            open={open}
          >
            <BootstrapDialogTitle
              // id="customized-dialog-title"
              onClose={handleClose}
            >
              {manageContent()}
            </BootstrapDialogTitle>
          </BootstrapDialog>
        </div>
      )}
    </>
  );
};

export default Bonus_dashbord;
