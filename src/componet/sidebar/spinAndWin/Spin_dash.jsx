import React, { useEffect } from "react";
import { DialogContent, Grid, Paper, styled } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./Spin_dash.css";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { ColorButton } from "../../customComponet/CustomElement";
import { useState } from "react";
import { IsApprove, Url } from "../../../global";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";
import Timer from "../../commonComponet/Timer";
import Wheel from "../../Wheel/Wheel";
import Toast from "../../commonComponet/Toast";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 0 }} {...other}>
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
const Spin_dash = (prop) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);
  const [link, setLink] = useState("");
  const [selectedItem, setSelectedItem] = useState({
    freeSpin: null,
    freeSpintrue: false,
    refSpin: null,
    refSpintrue: false,
    depo50Spin: null,
    depo50Spintrue: false,
    depo500Spin: null,
    depo500Spintrue: false,
  });

  const [popData, setPopData] = useState({
    isLoder: true,
    data: "",
    error: "",
    data1: "",
  });
  const [spinData, setSpinData] = useState({
    data: "",
    isLoder: true,
  });
  // React.useEffect(() => {
  //   if (seconds > 0) {
  //     setTimeout(() => setSeconds(seconds - 1), 1000);
  //   } else {
  //     setSeconds("BOOOOM!");
  //   }
  // });

  const secondsToHms = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? (h > 9 ? h : `0${h}`) : "00";
    var mDisplay = m > 0 ? (m > 9 ? m : `0${m}`) : "00";
    var sDisplay = s > 0 ? (s > 9 ? s : `0${s}`) : "00";
    return `${hDisplay} : ${mDisplay} : ${sDisplay}`;
  };

  useEffect(() => {
    getSpin();
  }, []);
  const claimCredit = (prop) => {
    console.log(prop);
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("action", "spin_claim");
    param.append("spin_id", popData.data?.spin_id);

    axios.post(Url + "/ajaxfiles/spin_wheel_claim.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        navigate("/");
      }
      if (res.data.status == "error") {
        popData.isLoder = false;
        popData.error = res.data.message;
        setPopData({ ...popData });
        Toast("error", res.data.message);
      } else {
        popData.error = "";
        popData.data1 = res.data.message;
        popData.isLoder = false;
        setPopData({ ...popData });
      }
    });
  };
  const getSpin = () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("action", "spin_list");
    spinData.isLoder = true;
    // spinData.data = res.data;

    setSpinData({ ...spinData });
    axios.post(Url + "/ajaxfiles/spin_wheel_claim.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        navigate("/");
      }
      if (res.data.status == "error") {
      } else {
        setSeconds(Math.abs(res.data.free_spin_data.next_spin_time));

        spinData.isLoder = false;
        spinData.data = res.data;

        setSpinData({ ...spinData });
      }
    });
  };
  console.log("second", seconds);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedItem({
      freeSpin: null,
      freeSpintrue: false,
      refSpin: null,
      refSpintrue: false,
      depo50Spin: null,
      depo50Spintrue: false,
      depo500Spin: null,
      depo500Spintrue: false,
    });
    getSpin();
  };

  const manageContent = () => {
    return (
      <>
        <div style={{ marginBottom: "6px" }}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 0,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            {" "}
            <CloseIcon />
          </IconButton>
        </div>
        <div className="po">
          {/* <img className="img_celebration" src="./image/Rectangle 2.png" /> */}
          {popData.isLoder == true ? (
            <div className="muiSpinLoder">
              {" "}
              <div>
                <svg className="spinner" viewBox="0 0 50 50">
                  <circle
                    style={{ stroke: "white" }}
                    className="path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    stroke-width="5"
                  ></circle>
                </svg>
              </div>
            </div>
          ) : (
            <div className="text_position text-center">
              {popData.error == "" ? (
                <>
                  {popData.error == "" ? (
                    <div style={{ fontSize: "23px " }}>
                      <span>Congratulation</span>
                    </div>
                  ) : (
                    ""
                  )}

                  <div>
                    <h1 className="text_position2">
                      {popData.data.spin_amount}
                    </h1>
                    <span
                      className="text_position2"
                      style={{
                        margin: "0",
                        fontSize: "26px",
                      }}
                    >
                      Point
                    </span>
                  </div>
                  <ColorButton id="btn_10" onClick={handleClose}>
                    Got It
                  </ColorButton>
                </>
              ) : (
                <div>
                  <ColorButton id="btn_10" onClick={handleClose}>
                    Try Again
                  </ColorButton>
                </div>
              )}
              <div>
                <span style={{ fontSize: "22px" }}>
                  {popData.error !== "" ? popData.error : popData.data1}
                </span>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <div>
        <div className="app-content--inner">
          <div className="app-content--inner__wrapper mh-100-vh">
            {spinData.isLoder == true ? (
              <div className="loader1">
                <span className="loader2"></span>
              </div>
            ) : (
              <div style={{ opacity: 1 }}>
                <Grid container>
                  <Grid item sm={11}></Grid>
                  <Grid item xl={1}></Grid>
                  <Grid item xl={10} md={12} lg={12}>
                    <Paper
                      elevation={1}
                      style={{ borderRadius: "10px", padding: "20px" }}
                      className="w-100 mb-5 internal-transfer-form"
                    >
                      <div>
                        <div className="head_prpl">
                          {/* <div className="d-flex">
                            <div className="reward reward_min w-100 flex_item_center"> Spin and Win</div>
                            <div className="reward reward_min ">
                              <div>
                                Your Credit : ${spinData.data?.spin_win_credit}
                              </div>
                              {spinData.data?.mt5_acc_no == "" ||
                              spinData.data?.mt5_acc_no == null ? (
                                ""
                              ) : (
                                <div
                                  className="mt5_val"
                                >
                                  MT5 Account : {spinData.data?.mt5_acc_no}
                                </div>
                              )}
                            </div>
                          </div> */}
                          {/* <div className="link margin_lnk">
                            {" "}
                            <span
                              onClick={() => {
                                navigate("/spinTermsConditions");
                              }}
                            >
                              HOW TO GET SPIN?
                            </span>{" "}
                          </div>
                          <div className="link margin_lnk-2">
                            {" "}
                            <span
                              onClick={() => {
                                navigate("/spinAndWin/report");
                              }}
                            >
                              Spin Report
                            </span>{" "}
                          </div> */}
                          <div className="flex_box12">
                            <div>
                              <div className="reward reward_min w-100 mb-2 ">
                                {" "}
                                Spin and Win
                              </div>
                              <div className="link margin_lnk">
                                {" "}
                                <span
                                  onClick={() => {
                                    navigate("/spinTermsConditions");
                                  }}
                                >
                                  HOW TO GET SPIN?
                                </span>{" "}
                              </div>
                              <div className="link margin_lnk-2">
                                {" "}
                                <span
                                  onClick={() => {
                                    navigate("/spinAndWin/report");
                                  }}
                                >
                                  Spin Report
                                </span>{" "}
                              </div>
                            </div>
                            <div>
                              <div className="reward reward_min ">
                                <div>
                                  Your Credit : $
                                  {spinData.data?.spin_win_credit}
                                </div>
                                {spinData.data?.mt5_acc_no == "" ||
                                spinData.data?.mt5_acc_no == null ? (
                                  ""
                                ) : (
                                  <div className="mt5_val">
                                    MT5 Account : {spinData.data?.mt5_acc_no}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="head_flex ">
                          <div className="text-center mt-5">
                            <span className="btn_type "> Free Spin</span>
                            <div className="boxi1">
                              <h1 className="text_left">
                                <ErrorOutlineIcon />
                              </h1>
                              <div>
                                <Wheel
                                  items={
                                    spinData.data?.free_spin_data
                                      .spin_amount_list
                                  }
                                  selectedItem={selectedItem.freeSpin}
                                  spinning1={selectedItem.freeSpintrue}
                                  isLocked={
                                    spinData.data?.free_spin_data.spin_status ==
                                    0
                                      ? true
                                      : false
                                  }
                                />
                              </div>
                              {spinData.data?.free_spin_data.next_spin_time ==
                              0 ? (
                                ""
                              ) : (
                                <div>
                                  <span className="time_t">
                                    <Timer seconds={seconds} />
                                  </span>
                                  <p className="time_text">hour left to spin</p>
                                </div>
                              )}
                              {/* <div>
                                <span className="time_t">
                                  <Timer seconds={seconds} />
                                </span>
                                <p className="time_text">hour left to spin</p>
                              </div> */}
                              <div className="flex_btn">
                                <ColorButton
                                  id="btn_5"
                                  disabled={
                                    spinData.data?.free_spin_data.spin_status ==
                                      0 || selectedItem.freeSpintrue == true
                                      ? true
                                      : false
                                  }
                                  onClick={() => {
                                    selectedItem.freeSpintrue = true;
                                    selectedItem.freeSpin =
                                      spinData.data?.free_spin_data.spin_amount_list.indexOf(
                                        spinData.data?.free_spin_data
                                          .spin_amount
                                      );
                                    setSelectedItem({ ...selectedItem });
                                    popData.isLoder = true;
                                    popData.data =
                                      spinData.data?.free_spin_data;
                                    setPopData({ ...popData });

                                    setTimeout(() => {
                                      handleClickOpen();
                                      claimCredit();
                                    }, [5000]);
                                  }}
                                >
                                  Spin & Win
                                </ColorButton>
                              </div>
                            </div>
                          </div>
                          <div className="text-center mt-5">
                            <span className="btn_type "> Invite Spin</span>
                            <div className="boxi1">
                              <h1 className="text_left">
                                <ErrorOutlineIcon />
                              </h1>
                              <div>
                                <Wheel
                                  items={
                                    spinData.data?.referral_spin_data
                                      .spin_amount_list
                                  }
                                  selectedItem={selectedItem.refSpin}
                                  spinning1={selectedItem.refSpintrue}
                                  isLocked={
                                    spinData.data?.referral_spin_data
                                      .spin_status == 0
                                      ? true
                                      : false
                                  }
                                />
                              </div>
                              <div>
                                <div className="flex_cntt">
                                  <span className="spin_line">
                                    Refer & get Spin
                                  </span>
                                  <span
                                    style={{
                                      color: "#5d2067",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <ContentCopyIcon
                                      style={{ marginRight: "5px" }}
                                      onClick={(e) => {
                                        navigator.clipboard
                                          .writeText(
                                            Url +
                                              "/register" +
                                              spinData.data.referral_spin_link
                                          )
                                          .then(
                                            function () {
                                              Toast(
                                                "success",
                                                "The link has been successfully copying"
                                              );
                                            },
                                            function (err) {
                                              console.error(
                                                "Async: Could not copy text: ",
                                                err
                                              );
                                              Toast(
                                                "error",

                                                "The link Could not copy, Please try again"
                                              );
                                            }
                                          );
                                      }}
                                    />
                                    {/* <ShareOutlinedIcon /> */}
                                  </span>
                                </div>
                                <div className="middle_flex">
                                  <div className="size_md">
                                    <span>
                                      Available Spin
                                      <br />
                                      <span className="val_5">
                                        {
                                          spinData.data?.referral_spin_data
                                            .available_spins
                                        }
                                      </span>
                                    </span>
                                  </div>
                                  <div className="row_line"></div>
                                  <div className="size_md">
                                    <span>
                                      Pending Spin
                                      <br />
                                      <span className="color_5">
                                        {" "}
                                        {
                                          spinData.data?.referral_spin_data
                                            .pending_spins
                                        }
                                      </span>
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <ColorButton
                                    id="btn_5"
                                    disabled={
                                      spinData.data?.referral_spin_data
                                        .spin_status == 0 ||
                                      selectedItem.refSpintrue == true
                                        ? true
                                        : false
                                    }
                                    onClick={() => {
                                      selectedItem.refSpintrue = true;
                                      selectedItem.refSpin =
                                        spinData.data?.referral_spin_data.spin_amount_list.indexOf(
                                          spinData.data?.referral_spin_data
                                            .spin_amount
                                        );
                                      setSelectedItem({ ...selectedItem });
                                      popData.isLoder = true;
                                      popData.data =
                                        spinData.data?.referral_spin_data;
                                      setPopData({ ...popData });
                                      setTimeout(() => {
                                        claimCredit();
                                        handleClickOpen();
                                      }, [5000]);
                                    }}
                                  >
                                    Spin & Win
                                  </ColorButton>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr
                          style={{ border: "1px solid #DFDFDF", width: "55%" }}
                        />
                        <div className="head_flex">
                          {spinData.data?.deposit_50_spin_data == null ||
                          spinData.data?.deposit_50_spin_data == "" ? (
                            ""
                          ) : (
                            <div className="text-center  mt-5 ">
                              <span className="btn_type ">
                                $50 Deposit & Win
                              </span>
                              <div className="boxi2">
                                <h1 className="text_left">
                                  <ErrorOutlineIcon />
                                </h1>
                                <div>
                                  <Wheel
                                    items={
                                      spinData.data?.deposit_50_spin_data
                                        .spin_amount_list
                                    }
                                    selectedItem={selectedItem.depo50Spin}
                                    spinning1={selectedItem.depo50Spintrue}
                                    isLocked={
                                      spinData.data?.deposit_50_spin_data
                                        .spin_status == 0
                                        ? true
                                        : false
                                    }
                                  />
                                </div>
                                <div>
                                  {spinData.data?.deposit_50_spin_data
                                    .redeem_spins == 0 &&
                                  spinData.data?.deposit_50_spin_data
                                    .available_spins == 0 ? (
                                    <ColorButton
                                      id="btn_5"
                                      onClick={() => navigate("/deposit")}
                                    >
                                      Deposit Now
                                    </ColorButton>
                                  ) : (
                                    <ColorButton
                                      id="btn_5"
                                      disabled={
                                        spinData.data?.deposit_50_spin_data
                                          .spin_status == 0 ||
                                        selectedItem.depo50Spintrue == true
                                          ? true
                                          : false
                                      }
                                      onClick={() => {
                                        selectedItem.depo50Spintrue = true;
                                        selectedItem.depo50Spin =
                                          spinData.data?.deposit_50_spin_data.spin_amount_list.indexOf(
                                            spinData.data?.deposit_50_spin_data
                                              .spin_amount
                                          );
                                        setSelectedItem({ ...selectedItem });
                                        popData.isLoder = true;
                                        popData.data =
                                          spinData.data?.deposit_50_spin_data;
                                        setPopData({ ...popData });
                                        setTimeout(() => {
                                          claimCredit();
                                          handleClickOpen();
                                        }, [5000]);
                                      }}
                                    >
                                      {spinData.data?.deposit_50_spin_data
                                        .redeem_spins == 1
                                        ? "Redeemed"
                                        : "Spin & Win"}
                                    </ColorButton>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                          {spinData.data?.deposit_500_spin_data == null ||
                          spinData.data?.deposit_500_spin_data == "" ? (
                            ""
                          ) : (
                            <div className="text-center mt-5">
                              <span className="btn_type ">
                                $500 Deposit & Win
                              </span>
                              <div className="boxi2">
                                <h1 className="text_left">
                                  <ErrorOutlineIcon />
                                </h1>
                                <div>
                                  <Wheel
                                    items={
                                      spinData.data?.deposit_500_spin_data
                                        .spin_amount_list
                                    }
                                    selectedItem={selectedItem.depo500Spin}
                                    spinning1={selectedItem.depo500Spintrue}
                                    isLocked={
                                      spinData.data?.deposit_500_spin_data
                                        .spin_status == 0
                                        ? true
                                        : false
                                    }
                                  />
                                </div>
                                <div>
                                  {spinData.data?.deposit_500_spin_data
                                    .redeem_spins == 0 &&
                                  spinData.data?.deposit_500_spin_data
                                    .available_spins == 0 ? (
                                    <ColorButton
                                      id="btn_5"
                                      onClick={() => navigate("/deposit")}
                                    >
                                      Deposit Now
                                    </ColorButton>
                                  ) : (
                                    <ColorButton
                                      id="btn_5"
                                      disabled={
                                        spinData.data?.deposit_500_spin_data
                                          .spin_status == 0 ||
                                        selectedItem.depo500Spintrue == true
                                          ? true
                                          : false
                                      }
                                      onClick={() => {
                                        selectedItem.depo500Spintrue = true;
                                        selectedItem.depo500Spin =
                                          spinData.data?.deposit_500_spin_data.spin_amount_list.indexOf(
                                            spinData.data?.deposit_500_spin_data
                                              .spin_amount
                                          );
                                        setSelectedItem({ ...selectedItem });
                                        popData.isLoder = true;
                                        popData.data =
                                          spinData.data?.deposit_500_spin_data;
                                        setPopData({ ...popData });
                                        setTimeout(() => {
                                          claimCredit();
                                          handleClickOpen();
                                        }, [5000]);
                                      }}
                                    >
                                      {spinData.data?.deposit_500_spin_data
                                        .redeem_spins == 1
                                        ? "Redeemed"
                                        : "Spin & Win"}
                                    </ColorButton>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Paper>
                  </Grid>
                </Grid>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <BootstrapDialog
          onClose={handleClose}
          // aria-labelledby="customized-dialog-title"
          open={open}
          fullWidth={true}
          maxWidth={"sm"}
          className="d-box-border "
        >
          {/* <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >

           
          </BootstrapDialogTitle> */}
          <DialogContent
            dividers
            // className="spinandwinpopImage"
          >
            {" "}
            {manageContent()}
          </DialogContent>
        </BootstrapDialog>
      </div>
    </>
  );
};

export default Spin_dash;
