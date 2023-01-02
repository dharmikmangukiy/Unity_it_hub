import React, { useEffect, useState } from "react";
import "./profile.css";
import {
  FormHelperText,
  Grid,
  InputAdornment,
  InputBase,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import TopButton from "../../customComponet/TopButton";
import { Paper } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CreateIcon from "@mui/icons-material/Create";
// import { ColorButton } from "../customComponet/CustomElement";
import { styled } from "@mui/material/styles";
import { ColorButton } from "../../customComponet/CustomElement";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import { Button, DialogContent } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { BootstrapInput } from "../../customComponet/CustomElement";
// import { Url } from "../../../../global";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IsApprove, Url } from "../../../global";
import { useNavigate } from "react-router-dom";
import "./user_profile.css";
import Counter from "../../customComponet/Counter";

const UserProfile = () => {
  const navigate = useNavigate();
  const [countryData, setCountryData] = useState({
    data: [],
  });
  const [mainLoader, setMainLoader] = useState(true);
  const [onEdit1, setOnEdit1] = useState(false);
  const [timer, setTimer] = useState(true);
  const [changePassword, setChangePassword] = useState(false);
  const [changeNumber, setChangeNumber] = useState(false);
  const [changeMobileNumber, setChangeMobileNumber] = useState({
    mobile: "",
    code: "",
    ismobile: false,
    isVerifyCode: true,
    isMobileLoader: false,
    isVerifucationLoader: false,
  });
  const [prefrence, setPrefrence] = useState({});
  const [data, setData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
    isLoder: false,
  });
  const [viewPassword, setViewPassword] = useState({
    old: false,
    new: false,
  });
  const [onEdit, setOnEdit] = useState({
    user_title: "",
    user_first_name: "",
    user_last_name: "",
    isLoder: false,
  });
  const inputedit = (event) => {
    const { name, value } = event.target;
    setOnEdit((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };
  const [infoTrue, setinfoTrue] = useState({
    user_title: "",
    user_first_name: "",
    user_last_name: "",
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const trueFalse = (event) => {
    var { name, value } = event.target;
    setinfoTrue((prevalue) => {
      return {
        ...prevalue,
        [name]: true,
      };
    });
  };
  const onEditsubmit = () => {
    if (onEdit.user_title == "" || onEdit.user_title == null) {
      toast.error("User Title is required");
    } else if (onEdit.user_first_name == "") {
      toast.error("First Name is required");
    } else if (onEdit.user_last_name == "") {
      toast.error("Last Name is required");
    } else {
      const param = new FormData();
      param.append("user_title", onEdit.user_title);
      param.append("user_first_name", onEdit.user_first_name);
      param.append("user_last_name", onEdit.user_last_name);
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      onEdit.isLoder = true;
      setOnEdit({ ...onEdit });
      axios.post(Url + "/ajaxfiles/profile_update.php", param).then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
          onEdit.isLoder = false;
          setOnEdit({ ...onEdit });
        } else {
          toast.success(res.data.message);
          fetchUserPref();
          onEdit.isLoder = false;
          setOnEdit({ ...onEdit });
          setOnEdit1(false);
          setinfoTrue({
            user_title: "",
            user_first_name: "",
            user_last_name: "",
            old_password: "",
            new_password: "",
            confirm_password: "",
          });
        }
      });
    }
  };
  const chpassword = (event) => {
    const { name, value } = event.target;
    setData((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
    console.log(data);
  };
  const onSubmit = () => {
    if (!data.old_password) {
      toast.error("Old Password is is required");
    } else if (!data.new_password) {
      toast.error("New Password is required");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
        data.new_password
      )
    ) {
      toast.error(
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    } else if (!data.confirm_password) {
      toast.error("Confirm Password is required");
    } else if (data.new_password !== data.confirm_password) {
      toast.error("Confirm password must be same as new password");
    } else {
      const param = new FormData();
      param.append("old_password", data.old_password);
      param.append("new_password", data.new_password);
      param.append("confirm_password", data.confirm_password);
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      data.isLoder = true;
      setData({ ...data });

      axios.post(Url + "/ajaxfiles/change_password.php", param).then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
          data.isLoder = false;
          setData({ ...data });
        } else {
          data.isLoder = false;
          setData({ ...data });
          toast.success(res.data.message);
          setChangePassword(false);
          setinfoTrue({
            user_title: "",
            user_first_name: "",
            user_last_name: "",
            old_password: "",
            new_password: "",
            confirm_password: "",
          });
        }
      });
    }
  };

  const fetchUserPref = async () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    setMainLoader(true);
    await axios
      .post(`${Url}/ajaxfiles/get_user_prefrence.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }

        setPrefrence(res.data);
        setMainLoader(false);
        setOnEdit({
          user_title: res.data.user_title,
          user_first_name: res.data.user_first_name,
          user_last_name: res.data.user_last_name,
          isLoder: false,
        });
      });
  };
  useEffect(() => {
    fetchUserPref();
  }, []);
  toast.configure();

  const submitMobileMail = async () => {
    console.log(
      "changeMobileNumber.ismobile.toString().length",
      changeMobileNumber.ismobile.toString().length
    );
    if (changeMobileNumber.mobile == "") {
      toast.error("Please Enter Mobile Number");
    } else if (
      changeMobileNumber.mobile.length <= 3 ||
      changeMobileNumber.mobile.length > 12
    ) {
      toast.error("Mobile number is not valid");
    } else {
      changeMobileNumber.isMobileLoader = true;
      setChangeMobileNumber({ ...changeMobileNumber });
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      param.append("action", "request_otp");
      param.append("mobile_number", changeMobileNumber.mobile);
      await axios
        .post(`${Url}/ajaxfiles/change_mobile.php`, param)
        .then((res) => {
          changeMobileNumber.isMobileLoader = false;
          changeMobileNumber.isVerifucationLoader = false;
          setChangeMobileNumber({ ...changeMobileNumber });
          if (res.data.message == "Session has been expired") {
            navigate("/");
          }

          if (res.data.status == "error") {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            changeMobileNumber.ismobile = true;
            changeMobileNumber.isVerifyCode = false;
            setChangeMobileNumber({ ...changeMobileNumber });
            setTimer({ ...timer });
          }
        });
    }
  };

  const submitMobileVerification = async () => {
    changeMobileNumber.isMobileLoader = true;
    setChangeMobileNumber({ ...changeMobileNumber });
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("action", "change_mobile_number");
    param.append("mobile_number", changeMobileNumber.mobile);
    param.append("verify_otp", changeMobileNumber.code);
    await axios
      .post(`${Url}/ajaxfiles/change_mobile.php`, param)
      .then((res) => {
        changeMobileNumber.isVerifucationLoader = false;
        setChangeMobileNumber({ ...changeMobileNumber });
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }

        if (res.data.status == "error") {
          toast.error(res.data.message);
          changeMobileNumber.isMobileLoader = false;
          setChangeMobileNumber({ ...changeMobileNumber });
        } else {
          toast.success(res.data.message);
          /* changeMobileNumber.ismobile = true;
        changeMobileNumber.isVerifyCode = false;
        setChangeMobileNumber({...changeMobileNumber}); */
          setChangeNumber(false);
          fetchUserPref();
          setinfoTrue({
            user_title: "",
            user_first_name: "",
            user_last_name: "",
            old_password: "",
            new_password: "",
            confirm_password: "",
          });
          setChangeMobileNumber({
            mobile: "",
            code: "",
            ismobile: false,
            isVerifyCode: true,
            isMobileLoader: false,
            isVerifucationLoader: false,
          });
        }
      });
  };
  const getCountries = () => {
    const param = new FormData();

    axios.post(Url + "/datatable/get_countries.php", param).then((res) => {
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        countryData.data = res.data.aaData;
        setCountryData({ ...countryData });
        console.log("countryData", countryData);
      }
    });
  };

  const checkValidation = (value) => {
    if (value == "") {
      return true;
    } else if (
      !value.match(/[A-Z]/g) ||
      !value.match(/[a-z]/g) ||
      !value.match(/[0-9]/g) ||
      !value.match(/[!@#$%^&*()_+=]/g)
    ) {
      return true;
    } else if (value.length <= 8) {
      return true;
    }
    return false;
  };

  const getErrorMessage = (value, message = "") => {
    if (value == "") {
      return message;
    } else if (
      !value.match(/[A-Z]/g) ||
      !value.match(/[a-z]/g) ||
      !value.match(/[0-9]/g) ||
      !value.match(/[!@#$%^&*()_+=]/g)
    ) {
      return "Atleast one lower case, upper case and number and special characters required";
    } else if (value.length <= 8) {
      return "Password must contain atleast 8 characters";
    }
  };

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          {mainLoader == true ? (
            <div className="loader1">
              <div className="clock">
                <div className="pointers"></div>
              </div>
            </div>
          ) : (
            <div style={{ opacity: 1 }}>
              <Grid container>
                <Grid item sm={12}></Grid>
                <Grid item xl={1}></Grid>
                <Grid item xl={10} md={12} lg={12}>
                  <TopButton />
                  <Grid container spacing={6}>
                    <Grid item md={12}>
                      {localStorage.getItem("is_ib_account") == "1" ? (
                        <Paper
                          elevation={1}
                          style={{ borderRadius: "10px" }}
                          className="w-100 mb-5"
                        >
                          <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                            <h5 className="font-weight-bold mb-0 text-dark">
                              My Reference Links
                            </h5>
                          </div>
                          <div className="divider"></div>
                          <div className="card-body position-relative">
                            <Grid
                              container
                              spacing={3}
                              style={{
                                marginLeft: "-12px",
                                marginRight: "-12px",
                              }}
                            >
                              <Grid item md={12}>
                                <FormControl>
                                  <label className="text-dark font-weight-bold form-label-head w-100">
                                    Sponsor Link
                                  </label>
                                  <div className="sponsorlink-content-section">
                                    <label className="text-info font-weight-bold w-100">
                                      <a>
                                        {Url +
                                          `/register/sponsor/${prefrence.wallet_code}`}
                                      </a>
                                    </label>
                                    <button
                                      className="copy_link"
                                      onClick={(e) => {
                                        navigator.clipboard
                                          .writeText(
                                            Url +
                                              `/register/sponsor/${prefrence.wallet_code}`
                                          )
                                          .then(
                                            function () {
                                              console.log(
                                                "Async: Copying to clipboard was successful!"
                                              );
                                              toast.success(
                                                "The sponsor link has been successfully copying"
                                              );
                                            },
                                            function (err) {
                                              console.error(
                                                "Async: Could not copy text: ",
                                                err
                                              );
                                              toast.error(
                                                "The sponsor link Could not copy, Please try again"
                                              );
                                            }
                                          );
                                      }}
                                    >
                                      <span className="blinking">
                                        <i className="material-icons">
                                          content_copy
                                        </i>
                                      </span>
                                    </button>
                                  </div>
                                </FormControl>
                              </Grid>
                              {/* <hr className="mt-2.5 mb-1"></hr>
                          <Grid item md={12}>
                            <FormControl>
                              <label className="text-dark font-weight-bold form-label-head w-100">
                                Sales Manager Link
                              </label>
                              <label className="text-info font-weight-bold w-100">
                              <a>{Url+'?salesmanagerId=272727'}</a>
                              </label>
                            </FormControl>
                          </Grid> */}
                            </Grid>
                          </div>
                        </Paper>
                      ) : (
                        ""
                      )}

                      <Paper
                        elevation={1}
                        style={{ borderRadius: "10px" }}
                        className="w-100 mb-5"
                      >
                        <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                          <h5 className="font-weight-bold mb-0 text-dark">
                            My Profile
                          </h5>
                          <ColorButton
                            onClick={() => {
                              setOnEdit1(true);
                            }}
                          >
                            Edit
                          </ColorButton>
                        </div>
                        <div className="divider"></div>
                        <div className="card-body position-relative">
                          <Grid
                            container
                            spacing={3}
                            style={{
                              marginLeft: "-12px",
                              marginRight: "-12px",
                            }}
                          >
                            <Grid item md={4}>
                              <FormControl>
                                <label className="text-dark font-weight-bold form-label-head w-100">
                                  TITLE
                                </label>
                                <label className="text-info font-weight-bold w-100">
                                  {prefrence.user_title}
                                </label>
                              </FormControl>
                            </Grid>
                            <Grid item md={4}>
                              <FormControl>
                                <label className="text-dark font-weight-bold form-label-head w-100">
                                  FIRST NAME
                                </label>
                                <label className="text-info font-weight-bold w-100">
                                  {prefrence.user_first_name}
                                </label>
                              </FormControl>
                            </Grid>
                            <Grid item md={4}>
                              <FormControl>
                                <label className="text-dark font-weight-bold form-label-head w-100">
                                  LAST NAME
                                </label>
                                <label className="text-info font-weight-bold w-100">
                                  {prefrence.user_last_name}
                                </label>
                              </FormControl>
                            </Grid>
                            <hr className="mt-2.5 mb-1"></hr>
                            <Grid item md={4}>
                              <FormControl>
                                <label className="text-dark font-weight-bold form-label-head w-100">
                                  EMAIL ADDRESS
                                </label>
                                <label className="text-info font-weight-bold w-100">
                                  {prefrence.user_email}
                                </label>
                              </FormControl>
                            </Grid>
                            <Grid item md={4}>
                              <FormControl>
                                <label className="text-dark font-weight-bold form-label-head w-100">
                                  MOBILE PHONE
                                </label>
                                <label className="text-info font-weight-bold w-100">
                                  {prefrence.user_phone}
                                  {/* <span
                                  title="Verified"
                                  style={{ color: "rgb(24, 225, 165)" }}
                                >
                                  <CheckCircleIcon />
                                </span> */}
                                </label>
                              </FormControl>
                            </Grid>
                            <Grid item md={4}>
                              <FormControl>
                                <label className="text-dark font-weight-bold form-label-head w-100">
                                  <a
                                    className="text-primary cursor-pointer"
                                    onClick={() => setChangeNumber(true)}
                                  >
                                    <CreateIcon />
                                    Change Mobile Number
                                  </a>
                                </label>
                              </FormControl>
                            </Grid>
                            <hr className="mt-2 mb-1"></hr>
                            {/* <Grid item md={4}>
                            <FormControl>
                              <label className="text-dark font-weight-bold form-label-head w-100">
                                NATIONALITY
                              </label>
                              <label className="text-info font-weight-bold w-100"></label>
                            </FormControl>
                          </Grid> */}
                            <Grid item md={8}>
                              <FormControl>
                                <label className="text-dark font-weight-bold form-label-head w-100">
                                  COUNTRY OF RESIDENCE
                                </label>
                                <label className="text-info font-weight-bold w-100">
                                  {prefrence.user_country}
                                </label>
                              </FormControl>
                            </Grid>
                            <hr className="mt-2 mb-1"></hr>
                            {/* <Grid item md={12}>
                            <FormControl>
                              <label className="text-dark font-weight-bold form-label-head w-100">
                                ADDRESS
                              </label>
                              <label className="text-info font-weight-bold w-100"></label>
                            </FormControl>
                          </Grid>
                          <hr className="mt-2 mb-1"></hr> */}
                            <Grid item md={6}>
                              <FormControl>
                                <label className="text-dark font-weight-bold form-label-head w-100">
                                  PASSWORD
                                </label>
                                <label className="text-info font-weight-bold w-100">
                                  * * * * * * * * * *
                                </label>
                              </FormControl>
                            </Grid>
                            <Grid
                              item
                              md={6}
                              className="d-flex align-items-center"
                            >
                              <FormControl>
                                <label className="text-dark font-weight-bold form-label-head w-100">
                                  <a
                                    className="text-primary cursor-pointer"
                                    onClick={() => setChangePassword(true)}
                                  >
                                    <CreateIcon />
                                    Change Client Portal Password
                                  </a>
                                </label>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </div>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
                <Dialog
                  open={onEdit1}
                  onClose={() => {
                    setOnEdit1(false);
                  }}
                >
                  <div className="d-flex align-items-center p-3">
                    <h5 className="w-100 text-center text-primary m-0 font-weight-bold">
                      Update Profile
                    </h5>
                    <Button
                      sx={{
                        position: "absolute",
                        right: "0px",
                        color: "#2A3F73",
                      }}
                      onClick={() => {
                        setOnEdit1(false);
                      }}
                    >
                      <CloseIcon />
                    </Button>
                  </div>
                  <DialogContent
                    className="customscroll"
                    sx={{ width: "400px" }}
                  >
                    <Grid container spacing={6}>
                      <Grid item md={12}>
                        <form>
                          <div className="mb-4">
                            <div className="font-weight-bold mb-2">Title</div>
                            <FormControl
                              className="w-100"
                              error={onEdit.user_title == "" ? true : false}
                            >
                              <Select
                                name="user_title"
                                value={onEdit.user_title}
                                onChange={inputedit}
                                displayempty
                                inputProps={{
                                  "aria-label": "Without label",
                                }}
                                input={<BootstrapInput />}
                                className="mt-0 ml-0"
                                id="fullWidth"
                                onBlur={trueFalse}
                              >
                                <MenuItem value="">Select Option</MenuItem>
                                <MenuItem value="Mr.">Mr.</MenuItem>
                                <MenuItem value="Mrs">Mrs</MenuItem>
                                <MenuItem value="Miss">Miss</MenuItem>
                                <MenuItem value="Ms">Ms</MenuItem>
                                <MenuItem value="Dr">Dr</MenuItem>
                              </Select>
                              {onEdit.user_title == "" &&
                              infoTrue.user_title == true ? (
                                <FormHelperText>
                                  Please Select Title
                                </FormHelperText>
                              ) : (
                                ""
                              )}
                            </FormControl>
                          </div>
                          <div className="mb-4">
                            <div className="font-weight-bold mb-2">
                              First Name
                            </div>
                            <FormControl
                              className="w-100"
                              error={
                                onEdit.user_first_name == "" ? true : false
                              }
                            >
                              <BootstrapInput
                                value={onEdit.user_first_name}
                                name="user_first_name"
                                onChange={inputedit}
                                onBlur={trueFalse}
                                displayempty
                              />
                              {onEdit.user_first_name == "" &&
                              infoTrue.user_first_name == true ? (
                                <FormHelperText>
                                  Please Enter First Name
                                </FormHelperText>
                              ) : (
                                ""
                              )}
                            </FormControl>
                          </div>
                          <div className="mb-4">
                            <div className="font-weight-bold mb-2">
                              Last Name
                            </div>
                            <FormControl
                              className="w-100"
                              error={onEdit.user_last_name == "" ? true : false}
                            >
                              <BootstrapInput
                                name="user_last_name"
                                value={onEdit.user_last_name}
                                onChange={inputedit}
                                onBlur={trueFalse}
                                displayempty
                              />
                              {onEdit.user_last_name == "" &&
                              infoTrue.user_last_name == true ? (
                                <FormHelperText>
                                  Please Enter Last Name
                                </FormHelperText>
                              ) : (
                                ""
                              )}
                            </FormControl>
                          </div>
                          <div className="mb-4 text-center">
                            {onEdit.isLoder ? (
                              <ColorButton type="submit" disabled>
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
                              <ColorButton onClick={onEditsubmit}>
                                Save
                              </ColorButton>
                            )}
                          </div>
                        </form>
                      </Grid>
                    </Grid>
                  </DialogContent>
                </Dialog>
              </Grid>
            </div>
          )}
        </div>
        <Dialog
          open={changeNumber}
          onClose={() => {
            setChangeNumber(false);
            setChangeMobileNumber({
              mobile: "",
              code: "",
              ismobile: false,
              isVerifyCode: true,
              isMobileLoader: false,
              isVerifucationLoader: false,
            });
          }}
        >
          <div className="d-flex align-items-center p-3">
            <h5 className="w-100 text-center text-primary m-0 font-weight-bold">
              Change Mobile Number
            </h5>
            <Button
              sx={{ position: "absolute", right: "0px", color: "#2A3F73" }}
              onClick={() => {
                setChangeNumber(false);
                setChangeMobileNumber({
                  mobile: "",
                  code: "",
                  ismobile: false,
                  isVerifyCode: true,
                  isMobileLoader: false,
                  isVerifucationLoader: false,
                });
              }}
            >
              <CloseIcon />
            </Button>
          </div>
          <DialogContent className="customscroll">
            <Grid container spacing={6}>
              <Grid item md={12}>
                <form>
                  <div className="mb-4">
                    <div className="font-weight-bold mb-2">
                      Country of Residence
                    </div>
                    <FormControl className="w-100" variant="standard">
                      <InputLabel id="demo-simple-select-standard-label">
                        {prefrence.user_country}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        disabled
                      ></Select>
                    </FormControl>
                  </div>
                  <div className="mb-4">
                    <div className="font-weight-bold mb-2">
                      New Mobile Number
                    </div>
                    <FormControl
                      className="w-100"
                      // error={changeMobileNumber.mobile == "" ? true : false}
                      error={
                        changeMobileNumber.mobile.toString().length <= 3 ||
                        changeMobileNumber.mobile == "" ||
                        changeMobileNumber.mobile.toString().length > 12
                          ? true
                          : false
                      }
                    >
                      <BootstrapInput
                        name="mobile"
                        type="text"
                        onBlur={trueFalse}
                        value={changeMobileNumber.mobile}
                        onChange={(e) => {
                          if (!isNaN(Number(e.target.value))) {
                            if (prefrence.user_country == "India") {
                              if (e.target.value.length <= 20)
                                setChangeMobileNumber({
                                  ...changeMobileNumber,
                                  mobile: e.target.value,
                                });
                            } else {
                              setChangeMobileNumber({
                                ...changeMobileNumber,
                                mobile: e.target.value,
                              });
                            }
                          }
                        }}
                        displayempty
                        startAdornment={
                          <InputAdornment position="start">
                            +{prefrence.mobile_code}
                          </InputAdornment>
                        }
                      />
                      {changeMobileNumber.mobile == "" &&
                      infoTrue.mobile == true ? (
                        <FormHelperText>
                          Please Enter Mobile Number
                        </FormHelperText>
                      ) : (changeMobileNumber.mobile.toString().length <= 3 ||
                          changeMobileNumber.mobile.toString().length > 12) &&
                        infoTrue.mobile == true ? (
                        <FormHelperText>
                          Mobile number is not valid
                        </FormHelperText>
                      ) : (
                        ""
                      )}
                    </FormControl>
                  </div>
                </form>
                <div className="mb-4">
                  <p className="profileText">
                    <strong>
                      <i>
                        *The email code is sent to your verified email. It is
                        required to change your mobile number.
                      </i>
                    </strong>
                  </p>
                </div>
                {/* <div className="mb-4">
                  <div className="font-weight-bold mb-2">Verify SMS Code</div>

                  <FormControl className="w-50">
                    <BootstrapInput name="amount" disabled={true} />
                  </FormControl>
                  <span className="MuiButton-label">
                    <ColorButton
                      type="submit"
                      disabled={true}
                      className="btnModalProfileCN mx-2"
                    >
                      Send SMS Code
                    </ColorButton>
                  </span>
                </div> */}
                <div className="mb-4">
                  <div className="font-weight-bold mb-2">Verify Email Code</div>

                  <FormControl
                    className="w-100"
                    error={changeMobileNumber.code == "" ? true : false}
                  >
                    <BootstrapInput
                      name="code"
                      type="text"
                      value={changeMobileNumber.code}
                      onBlur={trueFalse}
                      onChange={(e) => {
                        if (!isNaN(Number(e.target.value))) {
                          setChangeMobileNumber({
                            ...changeMobileNumber,
                            code: e.target.value,
                          });
                        }
                      }}
                    />
                    {changeMobileNumber.code == "" && infoTrue.code == true ? (
                      <FormHelperText>
                        Please Enter Email Verification Code
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </FormControl>
                  <span className="MuiButton-label"></span>
                </div>
                <div className="mb-4 text-center centerflexjus ">
                  {changeMobileNumber.isMobileLoader ? (
                    <div>
                      <ColorButton className="mobile-disabled-style" disabled>
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
                    </div>
                  ) : (
                    <ColorButton
                      // disabled={changeMobileNumber.ismobile}
                      onClick={
                        changeMobileNumber.ismobile
                          ? submitMobileVerification
                          : submitMobileMail
                      }
                    >
                      {changeMobileNumber.ismobile ? "Verify Otp" : "Send Code"}
                    </ColorButton>
                  )}
                  {changeMobileNumber.ismobile ? (
                    changeMobileNumber.isVerifucationLoader ? (
                      <div>
                        <ColorButton
                          className="mobile-disabled-style"
                          sx={{
                            marginLeft: "10px",
                            padding: "22px 60px !important",
                          }}
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
                      </div>
                    ) : (
                      <div>
                        <ColorButton
                          sx={{ marginLeft: "10px" }}
                          disabled={timer}
                          onClick={submitMobileMail}
                        >
                          {timer ? (
                            <Counter reset={timer} setReset={setTimer} />
                          ) : (
                            "Resend OTP"
                          )}
                        </ColorButton>
                      </div>
                    )
                  ) : (
                    ""
                  )}
                </div>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
      <Dialog
        open={changePassword}
        fullWidth={true}
        maxWidth={"sm"}
        onClose={() => {
          setChangePassword(false);
        }}
      >
        <div className="d-flex align-items-center p-3">
          <h5 className="w-100 text-center text-primary m-0 font-weight-bold">
            Change Client Portal Password
          </h5>
          <Button
            sx={{ position: "absolute", right: "0px", color: "#2A3F73" }}
            onClick={() => {
              setChangePassword(false);
            }}
          >
            <CloseIcon />
          </Button>
        </div>
        <DialogContent className="customscroll">
          <Grid container spacing={6}>
            <Grid item md={12}>
              <form>
                <div className="mb-4">
                  <div className="font-weight-bold mb-2">Old Password</div>
                  <FormControl
                    className="w-100"
                    error={checkValidation(data.old_password)}
                  >
                    <BootstrapInput
                      name="old_password"
                      onChange={chpassword}
                      type={viewPassword.old ? "text" : "password"}
                      displayempty
                      onBlur={trueFalse}
                      endAdornment={
                        <InputAdornment position="end">
                          <Button
                            onClick={() =>
                              setViewPassword({
                                old: !viewPassword.old,
                                new: viewPassword.new,
                              })
                            }
                            sx={{ color: "#2A3F73" }}
                          >
                            {viewPassword.old ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </Button>
                        </InputAdornment>
                      }
                    />
                    {checkValidation(data.old_password) &&
                    infoTrue.old_password == true ? (
                      <FormHelperText>
                        {getErrorMessage(
                          data.old_password,
                          "Enter Old Password"
                        )}
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </FormControl>
                </div>
                <div className="mb-4">
                  <div className="font-weight-bold mb-2">New Password</div>
                  <FormControl
                    className="w-100"
                    error={checkValidation(data.new_password)}
                  >
                    <BootstrapInput
                      name="new_password"
                      onChange={chpassword}
                      type={viewPassword.new ? "text" : "password"}
                      displayempty
                      onBlur={trueFalse}
                      endAdornment={
                        <InputAdornment position="end">
                          <Button
                            onClick={() =>
                              setViewPassword({
                                old: viewPassword.old,
                                new: !viewPassword.new,
                              })
                            }
                          >
                            {viewPassword.new ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </Button>
                        </InputAdornment>
                      }
                    />
                    {checkValidation(data.new_password) &&
                    infoTrue.new_password == true ? (
                      <FormHelperText>
                        {getErrorMessage(
                          data.new_password,
                          "Enter New Password"
                        )}
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </FormControl>
                </div>
                <div className="mb-4">
                  <div className="font-weight-bold mb-2">Confirm Password</div>
                  <FormControl
                    className="w-100"
                    error={
                      (data.new_password !== data.confirm_password ||
                        data.confirm_password == "") &&
                      infoTrue.confirm_password == true
                        ? true
                        : false
                    }
                  >
                    <BootstrapInput
                      name="confirm_password"
                      onChange={chpassword}
                      displayempty
                      onBlur={trueFalse}
                    />
                    {data.confirm_password == "" &&
                    infoTrue.confirm_password == true ? (
                      <FormHelperText>Enter confirm Password</FormHelperText>
                    ) : data.new_password !== data.confirm_password &&
                      infoTrue.confirm_password == true ? (
                      <FormHelperText>Passwords must match</FormHelperText>
                    ) : (
                      ""
                    )}
                  </FormControl>
                </div>

                <div className="mb-4 text-center">
                  {data.isLoder ? (
                    <ColorButton
                      type="submit"
                      sx={{ padding: "20px 55px" }}
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
                    <ColorButton onClick={onSubmit}>Save</ColorButton>
                  )}
                </div>
              </form>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfile;
