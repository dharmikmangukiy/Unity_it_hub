import React, { useState } from "react";
import "./Fantastic_tour.css";
import StarIcon from "@mui/icons-material/Star";
import { Link, useNavigate } from "react-router-dom";

import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  InputBase,
  styled,
  MenuItem,
  Select,
  TextField,
  FormHelperText,
} from "@mui/material";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
// import { styled } from '@mui/material/styles';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { ColorButton } from "../../customComponet/CustomElement";
import { useEffect } from "react";
import { IsApprove, Url } from "../../../global";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Info } from "@mui/icons-material";

const Fantastic_tour = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [mainLoader, setMainLoader] = useState(true);
  const [tour, setTour] = useState([]);
  const [popData, setPopData] = useState({
    data: {},
  });
  const [popLoder, setPopLoder] = useState({
    pop1: false,
  });
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));
  toast.configure();

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

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const manageContent = () => {
    return <></>;
  };
  const manageContent2 = () => {
    if (open == true) {
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
          <div className="d-flex p-3">
            <Grid container spacing={3}>
              <Grid item md={6}>
                <img
                  className="image2 mr-4 w-100"
                  src={popData.data?.offer_image[0]}
                />
              </Grid>
              <Grid item md={6}>
                {" "}
                <div>
                  <span className="pop_head ">Explore Goa with RightFX</span>
                  <br />
                  <br />
                  <span className="pop_text ">
                    <span style={{ color: " #FFB800" }}>Congratulations</span>{" "}
                    you are eligible for participate.
                  </span>
                  <br />
                  <img
                    className="image3 mr-2 mt-2"
                    src={popData.data?.offer_image[0]}
                  />
                  <img
                    className="image3 mr-2  mt-2"
                    src={popData.data?.offer_image[1]}
                  />
                  <img
                    className="image3  mt-2"
                    src={popData.data?.offer_image[2]}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
          <div
            className="divider"
            style={{ border: "0.5px solid #787878" }}
          ></div>
          <div className="p-3">
            <div style={{ marginBottom: "10px" }}>
              <span className="description ">DESCRIPTION</span>
            </div>
            <div>
              <p>
                Wherever you go, let those around you know you're a trader—with
                our stylish baseball cap. Black never goes out of style, right?
                Keep your head cool while making smart trading decisions.
                <br />
                <br />
                Images used in marketing materials are not necessarily
                representative of actual prizes. Actual prizes may vary.
              </p>
            </div>
            <div className="text-center ">
              {popLoder.pop1 == true ? (
                <ColorButton className="makeapaymentbutoon" id="btn_1" disabled>
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
                <ColorButton id="btn_1" onClick={onParticipate}>
                  Participate
                </ColorButton>
              )}
            </div>
          </div>
        </>
      );
    }
  };
  const Tour = [
    {
      image:
        "./image/beautiful-landscape-beach-sea-ocean-with-empty-chair-deck-umbrella-nearly-coconut-palm-tree-with-white-cloud-blue-sky.jpg",
      content1: "Congratulations",
      content_1: " you are eligible for participate.",
      content2: "Total Participants ",
      content3: "157",
      val: "2500",
      text: "Explore Goa With RightFX",
    },
    {
      image: "./image/bali-pagoda-indonesia.jpg",
      content_1: "You are 12000 reward points away to participate.",
      content2: "Total Participants ",
      content3: "81",
      val: "25000",
      text: "Explore Bali With RightFX",
    },
    {
      image: "./image/houseboat-kerala-backwaters-india.jpg",
      content_1: "You are 1200 reward points away to participate.",
      content2: "Total Participants ",
      content3: "250",
      val: "3500",
      text: "Explore Kerala With RightFX",
    },
    {
      image: "./image/summer-is-all-yearround.jpg",
      content_1: "You are 32000 reward points away to participate.",
      content2: "Total Participants ",
      content3: "50",
      val: "35000",
      text: "Explore Dubai With RightFX",
    },
  ];
  useEffect(() => {
    fatchKycStatus();
  }, []);
  const onParticipate = () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("action", "claim_eligible_offers");
    param.append("fantastic_id", popData.data?.fantastic_id);
    popLoder.pop1 = true;
    // setPopLoder({ ...popLoder });
    axios
      .post(Url + "/ajaxfiles/fantastic_four_offer.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
          popLoder.pop1 = false;
          // setPopLoder({ ...popLoder });
        } else {
          toast.success(res.data.message);
          navigate(`/Order_chart/${popData.data?.fantastic_id}`);
          // popLoder.pop1 = false;
          // setPopLoder({ ...popLoder });
        }
      });
  };
  const fatchKycStatus = async () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("action", "get_eligible_offers");

    await axios
      .post(Url + "/ajaxfiles/fantastic_four_offer.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
        } else {
          setMainLoader(false);
          setTour(res.data.data);
        }
      });
  };
  return (
    <>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          {mainLoader == true ? (
            <span className="loader2"></span>
          ) : (
            <div style={{ opacity: 1 }}>
              <Grid container>
                <Grid item sm={12}></Grid>
                <Grid item xl={1}></Grid>
                <Grid item xl={10} md={12} lg={12}>
                  <Paper
                    elevation={1}
                    style={{ borderRadius: "10px", padding: "20px" }}
                    className="w-100 mb-5 internal-transfer-form"
                  >
                    <div>
                      <div className="head_prpl ">
                        <div className="reward">
                          {" "}
                          Total Earned Reward : 2500
                        </div>
                        <div
                          className="link"
                          onClick={() => {
                            navigate("/How_to_participate");
                          }}
                        >
                          HOW TO PARTICIPATE ?
                        </div>
                        <div className="round_2"></div>
                        <div className="round_1"></div>
                      </div>
                      {/* <div className="main_topic">
                       
                      </div> */}

                      <div>
                        <Grid container spacing={3}>
                          <Grid item md={6}>
                            {" "}
                            <div className="domestic">Domestic Tours</div>
                            {tour?.map((item1) => {
                              return (
                                <>
                                  {item1.is_international == 0 ? (
                                    <>
                                      {" "}
                                      <div className="ft_box">
                                        <div style={{ position: "relative" }}>
                                          <img
                                            className="image1"
                                            src={item1.offer_image[0]}
                                          />
                                          <div className="shadwoFanta"></div>
                                          <div className="startposition">
                                            <span className="u_text">
                                              Explore {item1.country_name} With
                                              RightFX
                                            </span>
                                            <span className="u_text1">
                                              <StarIcon />
                                              <span
                                                className="val_text"
                                                style={{ color: "white" }}
                                              >
                                                {item1.lot_size}
                                              </span>
                                            </span>
                                          </div>
                                        </div>

                                        <div className="flex">
                                          <div className="content1">
                                            <span style={{ color: "#FFB800" }}>
                                              {item1.remaining_lots == 0
                                                ? "Congratulations"
                                                : ""}
                                            </span>{" "}
                                            {item1.remaining_lots == 0 ? (
                                              "you are eligible for participate."
                                            ) : (
                                              <>
                                                You are {item1.remaining_lots}{" "}
                                                reward points away to
                                                participate
                                              </>
                                            )}
                                          </div>
                                          <div className="row11"></div>
                                          <div className="content2">
                                            Total Participants <br />{" "}
                                            <span className="content3">
                                              {item1?.participants}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="text-center">
                                          {}

                                          {item1.is_eligible == false &&
                                          item1.is_claimed == false ? (
                                            <ColorButton
                                              id="btn_1"
                                              disabled
                                              onClick={() => {
                                                popData.data = item1;
                                                setPopData({ ...popData });
                                                handleClickOpen();
                                              }}
                                            >
                                              Participate
                                            </ColorButton>
                                          ) : item1.is_eligible == true &&
                                            item1.is_claimed == false ? (
                                            <ColorButton
                                              id="btn_1"
                                              onClick={() => {
                                                popData.data = item1;
                                                setPopData({ ...popData });
                                                handleClickOpen();
                                              }}
                                            >
                                              Participate
                                            </ColorButton>
                                          ) : item1.is_eligible == true &&
                                            item1.is_claimed == true ? (
                                            <ColorButton
                                              id="btn_1"
                                              onClick={() => {
                                                navigate(
                                                  `/Order_chart/${item1.fantastic_id}`
                                                );
                                              }}
                                            >
                                              view
                                            </ColorButton>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    ""
                                  )}{" "}
                                </>
                              );
                            })}
                          </Grid>
                          <Grid item md={6}>
                            {" "}
                            <div className="international">
                              International Tours
                            </div>
                            {tour?.map((item1) => {
                              return (
                                <>
                                  {item1.is_international == 1 ? (
                                    <>
                                      {" "}
                                      <div className="ft_box">
                                        <div style={{ position: "relative" }}>
                                          <img
                                            className="image1"
                                            src={item1.offer_image[0]}
                                          />
                                          <div className="shadwoFanta"></div>
                                          <div className="startposition">
                                            {" "}
                                            <span className="u_text">
                                              Explore {item1.country_name} With
                                              RightFX
                                            </span>
                                            <span className="u_text1">
                                              <StarIcon />
                                              <span
                                                className="val_text"
                                                style={{ color: "white" }}
                                              >
                                                {item1.lot_size}
                                              </span>
                                            </span>
                                          </div>
                                        </div>

                                        <div className="flex">
                                          <div className="content1">
                                            <span style={{ color: "#FFB800" }}>
                                              {item1.remaining_lots == 0
                                                ? "Congratulations"
                                                : ""}
                                            </span>{" "}
                                            {item1.remaining_lots == 0 ? (
                                              "you are eligible for participate."
                                            ) : (
                                              <>
                                                You are {item1.remaining_lots}{" "}
                                                reward points away to
                                                participate
                                              </>
                                            )}
                                          </div>
                                          <div className="row11"></div>
                                          <div className="content2">
                                            Total Participants <br />{" "}
                                            <span className="content3">
                                              {item1?.participants}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="text-center">
                                          {item1.is_eligible == false &&
                                          item1.is_claimed == false ? (
                                            <ColorButton
                                              id="btn_1"
                                              disabled
                                              onClick={() => {
                                                popData.data = item1;
                                                setPopData({ ...popData });
                                                handleClickOpen();
                                              }}
                                            >
                                              Participate
                                            </ColorButton>
                                          ) : item1.is_eligible == true &&
                                            item1.is_claimed == false ? (
                                            <ColorButton
                                              id="btn_1"
                                              onClick={() => {
                                                popData.data = item1;
                                                setPopData({ ...popData });
                                                handleClickOpen();
                                              }}
                                            >
                                              Participate
                                            </ColorButton>
                                          ) : item1.is_eligible == true &&
                                            item1.is_claimed == true ? (
                                            <ColorButton
                                              id="btn_1"
                                              onClick={() => {
                                                navigate(
                                                  `/Order_chart/${item1.fantastic_id}`
                                                );
                                              }}
                                            >
                                              view
                                            </ColorButton>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </>
                              );
                            })}
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </div>
      <div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          {/* <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            {manageContent()}
          </BootstrapDialogTitle> */}
          <DialogContent dividers>{manageContent2()}</DialogContent>
        </BootstrapDialog>
      </div>
    </>
  );
};

export default Fantastic_tour;
