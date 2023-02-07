import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Chip,
  FormHelperText,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { Paper, DialogContent, DialogTitle } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import { styled, useTheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import InfoIcon from "@mui/icons-material/Info";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import "./ibcss.css";
import {
  BootstrapInput,
  ColorButton,
} from "../../../customComponet/CustomElement";

import TopButton from "../../../customComponet/TopButton";
import { IsApprove, Url } from "../../../../global";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../customComponet/CommonTable";
import { ViewAgendaSharp } from "@mui/icons-material";
import NewDate from "../../../commonComponet/NewDate";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Verification from "../../../customComponet/Verification";
import Toast from "../../../commonComponet/Toast";

const BootstrapInput1 = styled(TextField)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(0),
  },
  "& .MuiInputBase-input": {
    borderRadius: 9,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "8px 26px 8px 10px",
    marginTop: 0,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Cairo, sans-serif"].join(","),
    "&:hover": {
      borderColor: "#2A3F73;",
    },
    "&:focus": {
      borderRadius: 9,
      borderColor: "#2A3F73;",
      border: "2px solid #2A3F73;",
    },
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const Affiliate = () => {
  const theme = useTheme();
  const [ibstatus, setIbStatus] = useState("");
  const [field, setfield] = useState({
    Platform: "",
    numberField: "",
    other: "",
    contry: [],
    loader: false,
  });
  const [mainLoader, setMainLoader] = useState(true);
  const [countryData, setCountryData] = useState({
    data: [],
  });
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [infoTrue, setinfoTrue] = useState({
    Platform: false,
    numberField: false,
    contry: false,
    other: false,
  });
  const submit = () => {
    setinfoTrue({
      Platform: true,
      numberField: true,
      contry: true,
      other: true,
    });
    const param = new FormData();
    if (field.Platform == "") {
      Toast("error", "Please select Your Platform");
    } else if (field.numberField == "") {
      Toast("error", "Enter Audiance Number");
    } else if (field.Platform == "Yes" && field.other == "") {
      Toast("error", "Please type Add Your PlatForm");
    } else if (
      field.contry == "" ||
      field.contry == null ||
      field.contry?.length == 0
    ) {
      Toast("error", "Please select Contry");
    } else {
      const note = () => {
        var notedata = [];

        field.contry.map((item, index) => {
          notedata.push(item.nicename);
        });
        return notedata;
      };
      console.log("note()", note());
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }

      param.append("audiance", field.numberField);
      param.append(
        "platform",
        field.Platform == "yes" ? field.other : field.Platform
      );
      param.append("audience_geography", note());
      field.loader = true;
      setfield({ ...field });
      axios
        .post(Url + "/ajaxfiles/apply_for_affiliate.php", param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            navigate("/");
          }
          if (res.data.status == "error") {
            field.loader = false;
            setfield({ ...field });
            Toast("error", res.data.message);
          } else {
            Toast("success", res.data.message);
            ibstatusdata();
            field.loader = false;
            setfield({ ...field });
            setOpen(false);
            // setData(res.data.ib_data)
          }
        });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [ibData, setIBData] = useState({});
  //   const[data,setData]=useEffect()
  // const fatchKycStatus = async () => {
  //   const param = new FormData();
  //   if (IsApprove !== "") {
  //     param.append("is_app", IsApprove.is_app);
  //     param.append("user_id", IsApprove.user_id);
  //     param.append("auth_key", IsApprove.auth);
  //   }
  //   await axios
  //     .post(Url + "/ajaxfiles/get_kyc_status.php", param)
  //     .then((res) => {
  //       if (res.data.message == "Session has been expired") {
  //         navigate("/");
  //       }
  //       if (res.data.status == "error") {
  //         setStatus(res.data.kyc_data.master_status);
  //       } else {
  //         setStatus(res.data.kyc_data.master_status);
  //       }
  //     });
  // };
  const trueFalse = (event) => {
    var { name, value } = event.target;
    setinfoTrue((prevalue) => {
      return {
        ...prevalue,
        [name]: true,
      };
    });
  };
  const verifySubmit = () => {
    if (ibstatus.email_status == 0 || ibstatus.mobile_status == 0) {
      navigate("/userProfile");
      console.log("1111");
    } else if (ibstatus.kyc_status == 0 || ibstatus.kyc_status == 2) {
      navigate("/myDocuments");
      console.log("2222");
    } else {
      handleClickOpen("paper");
      console.log("333");
    }
  };

  const ibstatusdata = () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    axios
      .post(Url + "/ajaxfiles/affiliate_requests_status.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          Toast("error", res.data.message);
        } else {
          setIbStatus(res.data);

          setMainLoader(false);
        }
      });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setfield((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
    console.log(event.target.value);
  };
  useEffect(() => {
    ibstatusdata();
    const param = new FormData();
    axios.post(Url + "/datatable/get_countries.php", param).then((res) => {
      if (res.data.status == "error") {
        Toast("error", res.data.message);
      } else {
        countryData.data = res.data.aaData;
        setCountryData({ ...countryData });
        console.log("countryData", countryData);
      }
    });
  }, []);
  // const handleClickOpen = (scrollType) => () => {
  //   console.log("SAdaSDFDf");
  //   setOpen(true);
  //   setScroll(scrollType);
  // };
  const handleClickOpen = (prop) => {
    console.log("444");
    setOpen(true);
    setScroll(prop);
  };

  const partner = () => {
    if (ibstatus.ib_applied_status == "0") {
      return (
        <div className="text-dark w-100 h-100">
          <h5 className="text-center font-weight-bold text-dark py-5">
            You have not applied for Affiliate User, Please click below to apply
            for Affiliate User
          </h5>
          <div className="verification-main">
            <div>
              <div className="verication-icon-Section">
                <div
                  className="vericatiaron-icon-sub"
                  style={
                    ibstatus.email_status == 1
                      ? { backgroundColor: "#5d2027" }
                      : {}
                  }
                >
                  {ibstatus.email_status == 1 ? (
                    <CheckIcon sx={{ color: "white" }} />
                  ) : (
                    ""
                  )}
                </div>
                <RocketLaunchIcon
                  className="verificationBarIcon"
                  style={ibstatus.email_status == 0 ? { color: "#cfcfcf" } : {}}
                />
              </div>
              <div className="verify-textCenter">Email Verification</div>
            </div>
            <div>
              <div className="verication-icon-Section">
                <div
                  className="vericatiaron-icon-sub"
                  style={
                    ibstatus.mobile_status == 1
                      ? { backgroundColor: "#5d2027" }
                      : {}
                  }
                >
                  {ibstatus.mobile_status == 1 ? (
                    <CheckIcon sx={{ color: "white" }} />
                  ) : (
                    ""
                  )}
                </div>

                <MobileFriendlyIcon
                  className="verificationBarIcon"
                  style={
                    ibstatus.mobile_status == 0 ? { color: "#cfcfcf" } : {}
                  }
                />
              </div>
              <div className="verify-textCenter">Phone Verification</div>
            </div>
            <div>
              <div className="verication-icon-Section">
                <div
                  className="vericatiaron-icon-sub"
                  style={
                    ibstatus.kyc_status == 1
                      ? { backgroundColor: "#5d2027" }
                      : {}
                  }
                >
                  {ibstatus.kyc_status == 1 ? (
                    <CheckIcon sx={{ color: "white" }} />
                  ) : (
                    ""
                  )}
                </div>

                <DocumentScannerIcon
                  className="verificationBarIcon"
                  style={
                    ibstatus.kyc_status == 0 || ibstatus.kyc_status == 2
                      ? { color: "#cfcfcf" }
                      : {}
                  }
                />
              </div>
              <div className="verify-textCenter">Document Verification</div>
            </div>
            <div>
              <div className="verication-icon-Section">
                <div className="vericatiaron-icon-sub"></div>

                <HelpOutlineIcon
                  className="verificationBarIcon"
                  style={
                    ibstatus.ib_applied_status == 0 ||
                    ibstatus.ib_applied_status == 2
                      ? { color: "#cfcfcf" }
                      : {}
                  }
                />
              </div>
              <div className="verify-textCenter">affiliate Request</div>
            </div>
          </div>
          <div className="verification-button">
            <div>
              <ColorButton onClick={verifySubmit}>
                {ibstatus.email_status == "0"
                  ? "Verify Email"
                  : ibstatus.mobile_status == 0
                  ? "Verify Phone"
                  : ibstatus.kyc_status == 0
                  ? "Verify Document"
                  : ibstatus.kyc_status == 2
                  ? "Rejected Document"
                  : ibstatus.ib_applied_status == 0
                  ? "Affiliate Request"
                  : ""}
              </ColorButton>
            </div>
          </div>
          {/* <Verification ibstatus={ibstatus} /> */}

          {/* <div className="text-center pb-5">
            {status == "1" ? (
              <Button
                type="submit"
                variant="contained"
                size="small"
                sx={{ padding: "10px" }}
                className="text-center text-capitalize rounded-pill"
                onClick={handleClickOpen("paper")}
              >
                Request For IB User
              </Button>
            ) : (
              <div>
                <ColorButton
                  variant="contained"
                  size="large"
                  sx={{ textTransform: "uppercase" }}
                  onClick={() => {
                    navigate("/myDocuments");
                  }}
                >
                  first complete your kyc process
                </ColorButton>
              </div>
            )}
          </div> */}
        </div>
      );
    } else {
      if (ibstatus.ib_applied_status == 1) {
        return (
          <div className="card-body position-relative">
            <Grid container spacing={3}>
              <Grid item md={12} className="d-flex position-relative mh-150">
                <div className="text-dark w-100 h-100">
                  <h5 className="text-center font-weight-bold text-dark py-5">
                    <div>
                      <CheckIcon
                        style={{
                          fontSize: "5rem",
                          color: "#3D9730",
                          paddingBottom: "1rem",
                        }}
                      />
                    </div>
                    We have received your request for Affiliate . Our executive
                    will get you in touch soon.
                  </h5>
                </div>
              </Grid>
            </Grid>
          </div>
        );
      } else if (ibstatus.ib_applied_status == 2) {
        return (
          <div className="card-body position-relative">
            <Grid container spacing={3}>
              <Grid item md={12} className="d-flex position-relative mh-150">
                <div className="text-dark w-100 h-100">
                  <h5 className="text-center font-weight-bold text-dark py-5">
                    <div>
                      <ThumbDownIcon
                        style={{
                          fontSize: "5rem",
                          color: "rgb(207 23 23)",
                          paddingBottom: "1rem",
                        }}
                      />
                    </div>
                    Your request has been rejected.
                    <br />
                    {/* {ibstatus.ib_data.remarks} */}
                  </h5>
                  <div className="text-center pb-5">
                    <ColorButton
                      type="submit"
                      variant="contained"
                      size="small"
                      sx={{ padding: "10px" }}
                      className="text-center text-capitalize rounded-pill"
                      onClick={() => handleClickOpen("paper")}
                    >
                      Request For Affiliate User
                    </ColorButton>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        );
      } else if (ibData.ib_applied_status == "3") {
        return (
          <div className="card-body position-relative">
            <Grid container spacing={3}>
              <Grid item md={12} className="d-flex position-relative mh-150">
                <div className="text-dark w-100 h-100">
                  <div className="center-text">
                    <h5 className="text-center font-weight-bold text-dark py-5">
                      <div>
                        <CancelIcon
                          style={{
                            fontSize: "5rem",
                            color: "rgb(255 3 3)",
                            paddingBottom: "1rem",
                          }}
                        />
                      </div>
                      We have rejected your Affiliate Request.
                    </h5>
                    <ColorButton
                      type="submit"
                      variant="contained"
                      sx={{ padding: "10px" }}
                      size="small"
                      className="text-center text-capitalize rounded-pill"
                      onClick={handleClickOpen("paper")}
                    >
                      Request For affiliate User
                    </ColorButton>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        );
      }
    }
  };
  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          {mainLoader == true ? (
            <div className="loader1">
              <span className="loader2"></span>
            </div>
          ) : (
            <div style={{ opacity: 1 }}>
              <Grid container>
                <Grid item sm={11}></Grid>
                <Grid item xl={1}></Grid>
                <Grid item xl={10} md={12} lg={12}>
                  <Grid container>
                    <Grid item md={12} className="d-flex"></Grid>
                    <Grid item md={12}>
                      {ibstatus.ib_applied_status == 1 &&
                      ibstatus.ib_status == 1 ? (
                        ""
                      ) : (
                        <Paper
                          elevation={1}
                          style={{ borderRadius: "10px" }}
                          className="w-100 mb-5"
                        >
                          <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                            <h5 className="font-weight-bold mb-0 text-dark">
                              Affiliate Program
                            </h5>
                          </div>
                          <div className="divider"></div>
                          <div className="card-body position-relative">
                            <Grid container spacing={3}>
                              <Grid
                                item
                                md={12}
                                className="d-flex position-relative mh-150"
                              >
                                {partner()}
                              </Grid>
                            </Grid>
                          </div>
                        </Paper>
                      )}
                    </Grid>
                  </Grid>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    fullWidth={true}
                    maxWidth={"sm"}
                  >
                    <div
                      id="form-dialog-title"
                      className="d-flex align-items-center p-3 ib-application-header justify-content-center"
                    >
                      <div className="w-100">
                        <h5 className="w-100 text-center text-info mb-2 font-weight-bold">
                          Affiliate Application
                        </h5>
                      </div>
                      <CloseIcon
                        onClick={() => {
                          setOpen(false);
                        }}
                      />
                    </div>
                    <DialogContent dividers={scroll === "paper"}>
                      <div className="m-2">
                        <div>
                          <div>
                            <div>
                              <span className="col_black">Platform</span>
                            </div>

                            <FormControl className="w-100">
                              <Select
                                label=""
                                name="Platform"
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{
                                  "aria-label": "Without label",
                                }}
                                onBlur={trueFalse}
                                input={<BootstrapInput />}
                              >
                                <MenuItem value={1}>Whatsapp</MenuItem>
                                <MenuItem value={2}>Instagram</MenuItem>
                                <MenuItem value={3}>Facebook</MenuItem>
                                <MenuItem value={4}>Twitter</MenuItem>
                                <MenuItem value={5}>Skype</MenuItem>
                                <MenuItem value={6}>Telegram</MenuItem>
                                <MenuItem
                                  value="Yes"
                                  style={{ fontWeight: "700", color: "black" }}
                                >
                                  Other...
                                </MenuItem>
                              </Select>
                              {field.Platform == "" &&
                              infoTrue.Platform == true ? (
                                <FormHelperText>
                                  Please select your Platform
                                </FormHelperText>
                              ) : (
                                ""
                              )}
                            </FormControl>

                            {field.Platform == "Yes" ? (
                              <>
                                {" "}
                                <div className="divider my-1"></div>
                                <Grid
                                  item
                                  md={12}
                                  sm={12}
                                  className="d-flex align-items-center w-100"
                                >
                                  <span className="col_black">
                                    Add Your PlatForm
                                  </span>
                                </Grid>{" "}
                                <Grid item md={12} sm={12}>
                                  <FormControl className="w-100">
                                    <BootstrapInput
                                      displayEmpty
                                      name="other"
                                      value={field.other}
                                      onChange={handleChange}
                                      onBlur={trueFalse}
                                      inputProps={{
                                        "aria-label": "Without label",
                                      }}
                                    />
                                    {field.other == "" &&
                                    infoTrue.other == true ? (
                                      <FormHelperText>
                                        Please Type Add Your PlatForm
                                      </FormHelperText>
                                    ) : (
                                      ""
                                    )}
                                  </FormControl>
                                </Grid>
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="divider my-1"></div>
                          <div>
                            <div>
                              <span className="col_black">Audiance</span>
                            </div>

                            <FormControl className="w-100">
                              <BootstrapInput
                                type="number"
                                name="numberField"
                                value={field.numberField}
                                onChange={(e) => {
                                  if (!isNaN(Number(e.target.value))) {
                                    handleChange(e);
                                  } else if (e.target.value == "") {
                                    handleChange(e);
                                  }
                                }}
                                // onChange={handleChange}
                                onBlur={trueFalse}
                              />
                              {field.numberField == "" &&
                              infoTrue.numberField == true ? (
                                <FormHelperText>
                                  Please Enter Audiance Number
                                </FormHelperText>
                              ) : (
                                ""
                              )}
                            </FormControl>
                          </div>
                        </div>
                        <div className="divider my-1"></div>
                        <div className="">
                          <div>
                            <span className="col_black">Country</span>
                          </div>
                          <Stack spacing={3} sx={{ width: "100%" }}>
                            <Autocomplete
                              multiple
                              id="tags-standard"
                              value={field.contry}
                              options={countryData.data}
                              getOptionLabel={(option) => option.name}
                              onChange={(event, newValue) => {
                                field.contry = newValue;
                                setfield({ ...field });
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  name="contry"
                                  onBlur={trueFalse}
                                  className="autoComplte-textfild mobileCode"
                                  placeholder="   Add"
                                  helperText={
                                    (field.contry == "" ||
                                      field.contry == null ||
                                      field.contry?.length == 0) &&
                                    infoTrue.contry == true
                                      ? "Please select Country"
                                      : ""
                                  }
                                />
                              )}
                            />
                          </Stack>
                        </div>
                        <div className="mt-3 text-center">
                          {field.loader == true ? (
                            <ColorButton
                              tabindex="0"
                              size="large"
                              className="spinerforpat "
                              sx={{ padding: "10px" }}
                              disabled
                            >
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
                            </ColorButton>
                          ) : (
                            <ColorButton onClick={submit}>Submit</ColorButton>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
