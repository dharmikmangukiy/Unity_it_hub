import React, { useState, useEffect } from "react";
import { FormHelperText, Grid } from "@mui/material";
import TopButton from "../../customComponet/TopButton";
import { Paper } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
//import OutlinedInput from '@mui/material/OutlinedInput';
//import InputLabel from '@mui/material/InputLabel';
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { ColorButton } from "../../customComponet/CustomElement";
import axios from "axios";
import { IsApprove, Url } from "../../../global";

import { useNavigate, useParams } from "react-router-dom";
import Toast from "../../commonComponet/Toast";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
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
    transition: theme.transitions.create(["border-color", "box-shadow"]),

    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      borderColor: "#1e64b4;",
    },
    "&:focus": {
      borderRadius: 9,
      borderColor: "#1e64b4;",
      border: "2px solid #1e64b4;",
    },
  },
}));

export const ChangePassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmit, setisSubmit] = useState(false);
  const [mainLoader, setMainLoader] = useState(true);

  const [ageErrors, setAgeErrors] = useState({});
  const [mt5AccountList, setMT5AccountList] = React.useState({
    data: [],
  });
  const [infoTrue, setinfoTrue] = useState({
    account: false,
    type: false,
    password: false,
    confirmPassword: false,
  });
  const [age, setAge] = useState({
    account: "",
    type: "",
    password: "",
    confirmPassword: "",
    isLoader: false,
  });
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
  const trueFalse = (event) => {
    var { name, value } = event.target;
    setinfoTrue((prevalue) => {
      return {
        ...prevalue,
        [name]: true,
      };
    });
  };

  console.log(age);
  const handleClickShowPassword = () => {
    setAge({
      ...age,
      showPassword: !age.showPassword,
    });
  };

  useEffect(() => {
    fetchMT5AccountList();
    if (id) {
      age.account = id;
      age.type = "main";
      setAge({ ...age });
    }
  }, []);

  const fetchMT5AccountList = async () => {
    setMainLoader(true);
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("action", "get_mt5_ac_list");
    await axios.post(`${Url}/ajaxfiles/account_list.php`, param).then((res) => {
      if (res.data.message == "Session has been expired") {
        navigate("/");
      }
      if (res.data.status == "error") {
        Toast("error", res.data.message);
      } else {
        mt5AccountList.data = res.data.mt5_accounts;
        setMT5AccountList({ ...mt5AccountList });
        setMainLoader(false);
      }
    });
  };

  const submit = async () => {
    if (age.account == "") {
      Toast("error", "Please select account");
    } else if (age.type == "") {
      Toast("error", "Please select account type");
    } else if (age.password == "") {
      Toast("error", "Please enter change password");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
        age.password
      )
    ) {
      Toast(
        "error",
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    } else if (age.confirmPassword == "") {
      Toast("error", "Please enter confirm password");
    } else if (age.password != age.confirmPassword) {
      Toast("error", "Confirm password must be the same as password");
    } else {
      age.isLoader = true;
      setAge({ ...age });
      const param = new FormData();
      param.append("action", "change_mt5_password");
      param.append("mt5_id", age.account);
      param.append("password_type", age.type);
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      param.append("new_password", age.password);
      param.append("confirm_password", age.confirmPassword);
      await axios
        .post(`${Url}/ajaxfiles/account_list.php`, param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            navigate("/");
          }
          age.isLoader = false;
          setAge({ ...age });
          if (res.data.status == "error") {
            Toast("error", res.data.message);
          } else {
            setinfoTrue({
              account: false,
              type: false,
              password: false,
              confirmPassword: false,
            });
            Toast("success", res.data.message);
            setAge({
              account: "",
              type: "",
              password: "",
              confirmPassword: "",
              isLoader: false,
            });
          }
        });
    }
  };

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          {mainLoader == true ? (
            // <div className="loader1">
            //   <div className="clock">
            //     <div className="pointers"></div>
            //   </div>
            // </div>
            <div className="loader1">
              <span className="loader2"></span>
            </div>
          ) : (
            <div style={{ opacity: 1 }}>
              <Grid container>
                <Grid item sm={11}></Grid>
                <Grid item xl={1}></Grid>
                <Grid item xl={10} md={12} lg={12}>
                  {/* <TopButton /> */}
                  <Grid container>
                    <Grid item md={12} className="d-flex">
                      <Grid container>
                        <Grid item md={12} lg={12}>
                          <Paper
                            elevation={1}
                            style={{ borderRadius: "10px" }}
                            className="w-100 mb-5"
                          >
                            <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                              <h5 className="font-weight-bold mb-0 text-dark">
                                Account Change Password
                              </h5>
                            </div>
                            <div className="divider"></div>
                            <div className="card-body position-relative">
                              <Grid container spacing={6}>
                                <Grid item md={12} className="pt-1">
                                  {/*<form >  onSubmit={handleSubmit} */}
                                  <Grid container spacing={3}>
                                    <Grid item md={3}>
                                      <FormControl
                                        className="pt-3 w-100"
                                        variant="outlined"
                                        error={age.account == "" ? true : false}
                                      >
                                        {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
                                        <label
                                          htmlFor="accountNo"
                                          className="text-info font-weight-bold form-label-head w-100  mt-4 required"
                                        >
                                          ACCOUNT NO
                                        </label>
                                        <Select
                                          name="account"
                                          value={age.account}
                                          onChange={handleChange}
                                          displayEmpty
                                          inputProps={{
                                            "aria-label": "Without label",
                                          }}
                                          input={<BootstrapInput />}
                                          onBlur={trueFalse}
                                        >
                                          <MenuItem value="">
                                            Select Option
                                          </MenuItem>
                                          {mt5AccountList.data.map((item) => {
                                            return (
                                              <MenuItem value={item.mt5_acc_no}>
                                                {item.mt5_acc_no} (
                                                {item.mt5_name}
                                                )-{item.ib_group_name}
                                              </MenuItem>
                                            );
                                          })}
                                        </Select>
                                        {age.account == "" &&
                                        infoTrue.account == true ? (
                                          <FormHelperText>
                                            Please Select Account No
                                          </FormHelperText>
                                        ) : (
                                          ""
                                        )}
                                      </FormControl>
                                    </Grid>

                                    <Grid
                                      item
                                      md={3}
                                      className="removeTopPadding"
                                    >
                                      <FormControl
                                        className="pt-3 w-100"
                                        variant="outlined"
                                        error={age.type == "" ? true : false}
                                      >
                                        {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
                                        <label
                                          htmlFor="type"
                                          className="text-info font-weight-bold form-label-head w-100  mt-4 required"
                                        >
                                          TYPE
                                        </label>
                                        <Select
                                          name="type"
                                          value={age.type}
                                          onChange={handleChange}
                                          displayEmpty
                                          inputProps={{
                                            "aria-label": "Without label",
                                          }}
                                          onBlur={trueFalse}
                                          input={<BootstrapInput />}
                                        >
                                          <MenuItem value="">
                                            Select Option
                                          </MenuItem>
                                          <MenuItem value="main">
                                            Trading
                                          </MenuItem>
                                          <MenuItem value="investor">
                                            Investor
                                          </MenuItem>
                                        </Select>
                                        {age.type == "" &&
                                        infoTrue.type == true ? (
                                          <FormHelperText>
                                            Please Select Type
                                          </FormHelperText>
                                        ) : (
                                          ""
                                        )}
                                      </FormControl>
                                    </Grid>

                                    <Grid
                                      item
                                      md={3}
                                      className="removeTopPadding"
                                    >
                                      <FormControl
                                        className="pt-3 w-100"
                                        variant="outlined"
                                        error={
                                          (!age.password.match(/[A-Z]/g) ||
                                            !age.password.match(/[a-z]/g) ||
                                            !age.password.match(/[0-9]/g) ||
                                            age.password == "" ||
                                            age.password.length < 8 ||
                                            age.password.length > 20 ||
                                            !age.password.match(
                                              /[!@#$%^&*()_+=]/g
                                            )) &&
                                          infoTrue.password == true
                                            ? true
                                            : false
                                        }
                                        // error={
                                        //   age.password == "" ? true : false
                                        // }
                                      >
                                        {/* <InputLabel htmlFor="outlined-adornment-password"></InputLabel> */}
                                        <label
                                          htmlFor="changePassword"
                                          className="text-info font-weight-bold form-label-head w-100  mt-4 required"
                                        >
                                          CHANGE PASSWORD
                                        </label>
                                        <BootstrapInput
                                          name="password"
                                          id="outlined-adornment-password"
                                          type={
                                            age.showPassword
                                              ? "text"
                                              : "password"
                                          }
                                          value={age.password}
                                          onChange={handleChange}
                                          onBlur={trueFalse}
                                          endAdornment={
                                            <InputAdornment position="end">
                                              <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                  handleClickShowPassword
                                                }
                                                edge="end"
                                                style={{ marginLeft: "-3rem" }}
                                              >
                                                {age.showPassword ? (
                                                  <VisibilityOff />
                                                ) : (
                                                  <Visibility />
                                                )}
                                              </IconButton>
                                            </InputAdornment>
                                          }
                                        />
                                        <FormHelperText>
                                          {age.password == "" &&
                                          infoTrue.password == true
                                            ? "Enter your password"
                                            : infoTrue.password == true &&
                                              (age.password.length < 8 ||
                                                age.password.length > 20)
                                            ? "Password must contain atleast 8-20 characters"
                                            : infoTrue.password == true &&
                                              (!age.password.match(/[A-Z]/g) ||
                                                !age.password.match(/[a-z]/g) ||
                                                !age.password.match(/[0-9]/g) ||
                                                !age.password.match(
                                                  /[!@#$%^&*()_+=]/g
                                                ))
                                            ? "Atleast one lower case, upper case,special character and number required"
                                            : ""}
                                        </FormHelperText>
                                        {/* {(age.password == "" ||
                                          age.password.length <= 7) &&
                                          infoTrue.password == true ? (
                                          <FormHelperText>
                                            {age.password == ""
                                              ? "Please Enter Change Password"
                                              : "Password must contain atleast 8 characters"}
                                          </FormHelperText>
                                        ) : (
                                          ""
                                        )} */}
                                      </FormControl>
                                    </Grid>

                                    <Grid
                                      item
                                      md={3}
                                      className="removeTopPadding"
                                    >
                                      <FormControl
                                        className="pt-3 w-100"
                                        variant="outlined"
                                        error={
                                          age.confirmPassword == ""
                                            ? true
                                            : false
                                        }
                                      >
                                        {/* <InputLabel htmlFor="outlined-adornment-password"></InputLabel> */}
                                        <label
                                          htmlFor="changePassword"
                                          className="text-info font-weight-bold form-label-head w-100  mt-4 required"
                                        >
                                          CONFIRM PASSWORD
                                        </label>
                                        <BootstrapInput
                                          name="confirmPassword"
                                          id="outlined-adornment-password"
                                          type={
                                            age.showPassword
                                              ? "text"
                                              : "password"
                                          }
                                          value={age.confirmPassword}
                                          onChange={handleChange}
                                          onBlur={trueFalse}
                                        />
                                        {(age.confirmPassword == "" ||
                                          age.confirmPassword !=
                                            age.password) &&
                                        infoTrue.confirmPassword == true ? (
                                          <FormHelperText>
                                            {age.confirmPassword == ""
                                              ? "Please Enter Confirm Password"
                                              : "Passwords must match"}
                                          </FormHelperText>
                                        ) : (
                                          ""
                                        )}
                                      </FormControl>
                                    </Grid>
                                  </Grid>
                                  <hr></hr>
                                  <Grid container spacing={3}>
                                    <Grid
                                      item
                                      md={12}
                                      className="d-flex text-center my-4"
                                    >
                                      {age.isLoader ? (
                                        <ColorButton
                                          type="submit"
                                          variant="contained"
                                          size="medium"
                                          className="m-auto p-3 text-center text-capitalize disabled-transfar-button"
                                          disabled
                                        >
                                          <svg
                                            class="spinner"
                                            viewBox="0 0 50 50"
                                          >
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
                                        <ColorButton
                                          type="submit"
                                          variant="contained"
                                          size="medium"
                                          className="m-auto text-center text-capitalize"
                                          onClick={submit}
                                        >
                                          Change Password
                                        </ColorButton>
                                      )}
                                    </Grid>
                                  </Grid>
                                  {/* </form> */}
                                </Grid>
                              </Grid>
                            </div>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
