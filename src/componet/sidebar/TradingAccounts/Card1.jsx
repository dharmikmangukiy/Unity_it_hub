import React, { useEffect, useState } from "react";
import "./Card.css";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import {
  BootstrapInput,
  ColorButton,
} from "../../customComponet/CustomElement";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Toast from "../../commonComponet/Toast";

import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import axios from "axios";
import { IsApprove, Url } from "../../../global.js";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

const Card1 = (prop) => {
  const navigate = useNavigate();
  const [Dopen, setDOpen] = React.useState(false);
  const descriptionElementRef = React.useRef(null);
  const [planList, setPlanList] = React.useState({
    data: [],
  });
  const [item, setItem] = React.useState({});

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  const openModelPassword = () => {
    setDOpen(true);
  };
  React.useEffect(() => {
    /* if (Dopen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    } */
    fetchPlantDetaiils();
  }, []);
  const [active, setActive] = useState(false);
  const [viewPassword, setViewPassword] = useState({
    trad: false,
    main: false,
  });
  const [mainLoader, setMainLoader] = useState(true);
  const [formLoader, setFormLoader] = useState(false);
  const [activeIndex, setactiveIndex] = useState(0);
  const [formTrue, setFormTrue] = useState({
    password: false,
    confirm_password: false,
    balance: false,
  });
  const [activePlanName, setActivePlanName] = useState("");
  var [activeData, setActiveData] = useState({});
  const [form, setForm] = useState({
    password: "",
    confirm_password: "",
    balance: "",
  });
  const [num, setNum] = useState({
    Executive: false,
    vip: true,
    pro: false,
  });

  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#666666",
    },
    "& .MuiInputBase-root": {
      color: "#666666",
      fontSize: "20px",
      fontWeight: "500",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#666666",
    },
  });
  const trueFalse = (event) => {
    var { name, value } = event.target;
    setFormTrue((prevalue) => {
      return {
        ...prevalue,
        [name]: true,
      };
    });
  };
  const fetchPlantDetaiils = async () => {
    // setMT5AccountLoader(true);
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    setMainLoader(true);

    await axios
      .post(`${Url}/ajaxfiles/get_mt5_live_packages.php`, param)
      .then((res) => {
        // setMT5AccountLoader(false);
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          Toast("error", res.data.message);
          setMainLoader(false);
        } else {
          setMainLoader(false);

          planList.data = res.data.data;
          planList.data.forEach((element) => {
            element.isActive = false;
          });

          // planList.data[1].isActive = true;
          // activeIndex = planList.data[0]['plan_title'];
          setactiveIndex(0);
          setActivePlanName(planList.data[0]["plan_title"]);
          activeData = planList.data[0];
          setActiveData({ ...activeData });
          setPlanList({ ...planList });
        }
      });
  };

  const activePlan = (index) => {
    planList.data.forEach((element, key) => {
      if (index == key) {
        element.isActive = true;
      } else {
        element.isActive = false;
      }
    });
    setPlanList({ ...planList });
    setNum({
      Executive: index == 0 ? true : false,
      vip: index == 1 ? true : false,
      pro: index == 2 ? true : false,
    });
    setactiveIndex(index);
  };

  const submitActivePlan = async () => {
    if (prop.type == "0" && form.balance == "") {
      Toast("error", "Please enter MT5 Balance");
    } else if (form.password == "") {
      Toast("error", "Create Your MT5 Password is Required");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
        form.password
      )
    ) {
      Toast(
        "error",
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    } else if (form.confirm_password == "") {
      Toast("error", "Please enter Confirm Password");
    } else if (form.password !== form.confirm_password) {
      Toast(
        "error",
        "Create Your MT5 Password and confirm password did not match"
      );
    } else {
      setFormLoader(true);
      const param = new FormData();
      param.append("action", "create_mt5_account");
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      if (prop.type == "0") {
        param.append("mt5_balance", form.balance);
      }
      param.append("main_password", form.password);
      param.append("confirm_password", form.confirm_password);
      param.append("ib_group_id", planList.data[activeIndex].ib_group_level_id);
      param.append("account_type", prop.type);
      await axios
        .post(`${Url}/ajaxfiles/account_list.php`, param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            navigate("/");
          }
          setFormLoader(false);
          if (res.data.status == "error") {
            Toast("error", res.data.message);
          } else {
            setFormTrue({
              password: false,
              confirm_password: false,
              balance: false,
            });
            Toast("success", res.data.message);
            setDOpen(false);
            prop.closePopup(false);
            prop.refresh(false);
            navigate(`/deposit/${res.data.data.mt5_login_id}`);
          }
        });
    }
  };

  const getErrorMessage = (string) => {
    if (string.length <= 8) {
      return "Password must contain atleast 8 characters";
    }
  };

  useEffect(() => {
    if (planList.data.length > 0) {
      setActivePlanName(planList.data[activeIndex]["plan_title"]);
      activeData = planList.data[activeIndex];
      setActiveData({ ...activeData });
    }
  }, [activeIndex]);
  return (
    <>
      {mainLoader == true ? (
        <div className="card-body position-relative pt-0 get-mt5-account-details">
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
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          <div style={{ display: "contents" }}>
            <div className="main-plan-section">
              <div className="form-section">
                <div className="element">
                  <FormControl>
                    <FormLabel className="plan-form-input-label">
                      Platform
                    </FormLabel>
                    <RadioGroup
                      row
                      name="row-radio-buttons-group"
                      defaultValue="mt5"
                    >
                      <FormControlLabel
                        value="mt5"
                        control={<Radio />}
                        label="MT5"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="element">
                  <FormControl sx={{ width: "100%" }}>
                    <FormLabel className="plan-form-input-label">
                      Account Type
                    </FormLabel>
                    <Select
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      input={<BootstrapInput />}
                      value={activePlanName}
                      onChange={(e) => {
                        var index = planList.data.findIndex(
                          (x) => x.plan_title == e.target.value
                        );
                        setactiveIndex(index);
                      }}
                    >
                      {planList.data.map((item) => {
                        return (
                          <MenuItem value={item.plan_title}>
                            {item.plan_title}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
                <div className="element">
                  <FormControl>
                    <FormLabel className="plan-form-input-label">
                      Account Currency
                    </FormLabel>
                    <RadioGroup
                      row
                      name="row-radio-buttons-group"
                      defaultValue="usd"
                    >
                      <FormControlLabel
                        value="usd"
                        control={<Radio />}
                        label="USD"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="element">
                  <label className="plan-form-input-label">
                    Create Your MT5 Password
                  </label>
                  <input
                    type={viewPassword.trad ? "text" : "password"}
                    // className="trading-account-password form-control1 is-invalid"

                    className={`trading-account-password form-control1 ${
                      formTrue.password == true &&
                      (form.password == "" ||
                        form.password.length < 8 ||
                        form.password.length > 20 ||
                        !form.password.match(/[A-Z]/g) ||
                        !form.password.match(/[a-z]/g) ||
                        !form.password.match(/[0-9]/g) ||
                        !form.password.match(/[!@#$%^&*()_+=]/g))
                        ? "is-invalid"
                        : ""
                    }`}
                    name="password"
                    onBlur={trueFalse}
                    onChange={(e) => {
                      setForm((prevalue) => {
                        return {
                          ...prevalue,
                          ["password"]: e.target.value,
                        };
                      });
                      // formTrue.password = true;
                      // setFormTrue({ ...formTrue });
                    }}
                  />
                  {viewPassword.trad ? (
                    <span
                      className="material-icons eye"
                      onClick={(e) => {
                        viewPassword.trad = !viewPassword.trad;
                        setViewPassword({ ...viewPassword });
                      }}
                    >
                      visibility_off
                    </span>
                  ) : (
                    <span
                      className="material-icons eye"
                      onClick={(e) => {
                        viewPassword.trad = !viewPassword.trad;
                        setViewPassword({ ...viewPassword });
                      }}
                    >
                      visibility
                    </span>
                  )}
                  <div className="invalid-tooltip">
                    {/* {form.password == ""
                  ? "Enter your MT5 trading password"
                  : " MT5 trading password must contain atleast 8 to 20 characters"} */}
                    {form.password == ""
                      ? "Create Your MT5 Password is Required"
                      : form.password.length < 8 || form.password.length > 20
                      ? "Create Your MT5 Password  must contain atleast 8 to 20 characters"
                      : !form.password.match(/[A-Z]/g) ||
                        !form.password.match(/[a-z]/g) ||
                        !form.password.match(/[0-9]/g) ||
                        !form.password.match(/[!@#$%^&*()_+=]/g)
                      ? "Atleast one lower case, upper case,special character and number required"
                      : ""}
                    {/* getErrorMessage(form.password) */}
                  </div>
                </div>
                <div className="element">
                  <label className="plan-form-input-label">
                    Confirm Password
                  </label>
                  <input
                    type={viewPassword.main ? "text" : "password"}
                    // className="trading-account-password"
                    // className={`trading-account-password form-control1 ${
                    //   formTrue.confirm_password == true &&
                    //   (form.confirm_password == "" ||
                    //     form.confirm_password.length < 8)
                    //     ? "is-invalid"
                    //     : ""
                    // }`}
                    className={`trading-account-password form-control1 ${
                      formTrue.confirm_password == true &&
                      (form.confirm_password == "" ||
                        form.confirm_password !== form.password)
                        ? "is-invalid"
                        : ""
                    }`}
                    name="confirm_password"
                    onBlur={trueFalse}
                    onChange={(e) => {
                      setForm((prevalue) => {
                        return {
                          ...prevalue,
                          ["confirm_password"]: e.target.value,
                        };
                      });
                      // formTrue.confirm_password = true;
                      // setFormTrue({ ...formTrue });
                    }}
                  />
                  {viewPassword.main ? (
                    <span
                      className="material-icons eye"
                      onClick={(e) => {
                        viewPassword.main = !viewPassword.main;
                        setViewPassword({ ...viewPassword });
                      }}
                    >
                      visibility_off
                    </span>
                  ) : (
                    <span
                      className="material-icons eye"
                      onClick={(e) => {
                        viewPassword.main = !viewPassword.main;
                        setViewPassword({ ...viewPassword });
                      }}
                    >
                      visibility
                    </span>
                  )}
                  <div className="invalid-tooltip">
                    {form.confirm_password == ""
                      ? "Please enter confirm password"
                      : form.confirm_password !== form.password
                      ? "Create Your MT5 Password and confirm password did not match"
                      : ""}
                    {/* //getErrorMessage(form.confirm_password) */}
                  </div>
                </div>
                <div className="element">
                  <div className="form-btn-action">
                    {formLoader ? (
                      <ColorButton
                        className="plan-active-submit-disabled-btn"
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
                      <ColorButton onClick={submitActivePlan}>
                        Submit
                      </ColorButton>
                    )}

                    {/* <span
                  className="skip-span"
                  onClick={(e) => {
                    setDOpen(false);
                    prop.closePopup(false);
                    prop.refresh(false);
                  }}
                >
                  Skip
                </span> */}
                  </div>
                </div>
              </div>
              <div className="plan-section">
                <div className="plan-content">
                  <div className="plan-header">
                    <Button
                      className="plan-prev-btn plan-btn"
                      disabled={0 >= activeIndex ? true : false}
                      onClick={(e) => {
                        setactiveIndex(activeIndex - 1);
                      }}
                    >
                      <span className="material-icons">arrow_back</span>
                    </Button>
                    <label className="plan-title">{activePlanName}</label>
                    <Button
                      className="plan-next-btn plan-btn"
                      disabled={
                        planList.data.length <= activeIndex + 1 ? true : false
                      }
                      onClick={(e) => {
                        setactiveIndex(activeIndex + 1);
                      }}
                    >
                      <span className="material-icons">arrow_forward</span>
                    </Button>
                  </div>
                  <div className="plan-body-section">
                    <div className="element">
                      <label className="plan-form-input-label">
                        Minimum Deposit
                      </label>
                      <span className="plan-form-input-value">
                        {activeData.minimum_deposit}
                      </span>
                    </div>
                    <div className="element">
                      <label className="plan-form-input-label">Spread</label>
                      <span className="plan-form-input-value">
                        {activeData.spread}
                      </span>
                    </div>
                    <div className="element">
                      <label className="plan-form-input-label">
                        Commission
                      </label>
                      <span className="plan-form-input-value">
                        {activeData.commission}
                      </span>
                    </div>
                    <div className="element">
                      <label className="plan-form-input-label">Leverage</label>
                      <span className="plan-form-input-value">
                        {activeData.leverage}
                      </span>
                    </div>
                    <div className="element">
                      <label className="plan-form-input-label">Swap Free</label>
                      <span className="plan-form-input-value">
                        {activeData.swap_free}
                      </span>
                    </div>
                    <div className="element">
                      <label className="plan-form-input-label">
                        Trading Platform
                      </label>
                      <span className="plan-form-input-value">
                        {activeData.trading_plaform}
                      </span>
                    </div>
                    <div className="element">
                      <label className="plan-form-input-label">Execution</label>
                      <span className="plan-form-input-value">
                        {activeData.execution}
                      </span>
                    </div>
                    <div className="element">
                      <label className="plan-form-input-label">
                        Trading Instrument
                      </label>
                      <span className="plan-form-input-value">
                        {activeData.trading_instrument}
                      </span>
                    </div>
                    <div className="element">
                      <label className="plan-form-input-label">
                        Account Currency
                      </label>
                      <span className="plan-form-input-value">
                        {activeData.account_currency}
                      </span>
                    </div>
                    <div className="element">
                      <label className="plan-form-input-label">
                        Minimum Trade Size
                      </label>
                      <span className="plan-form-input-value">
                        {activeData.minimum_trade_size}
                      </span>
                    </div>
                    <div className="element">
                      <label className="plan-form-input-label">
                        Stop Out Level
                      </label>
                      <span className="plan-form-input-value">
                        {activeData.stop_out_level}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Dialog
                open={Dopen}
                onClose={() => setDOpen(false)}
                className="passwordmodel"
              >
                <Button
                  sx={{ position: "absolute", right: "0px", color: "#ff0000" }}
                  onClick={() => setDOpen(false)}
                >
                  <CloseIcon />
                </Button>
                <div className="p-2 text-center">
                  <h4 className="font-size-lg font-weight-bold my-2">
                    {planList.data[activeIndex]
                      ? planList.data[activeIndex].plan_title
                      : ""}
                  </h4>
                </div>

                <div
                  className="create-account-content"
                  style={{ margin: "0 17px", textAlign: "center" }}
                >
                  <div>
                    {prop.type == "0" ? (
                      <>
                        <div>
                          <TextField
                            type="text"
                            label="MT5 Balance"
                            variant="standard"
                            sx={{ width: "100%" }}
                            name="balance"
                            onChange={(e) => {
                              if (!isNaN(Number(e.target.value))) {
                                setForm((prevalue) => {
                                  return {
                                    ...prevalue,
                                    ["balance"]: e.target.value,
                                  };
                                });
                              }
                            }}
                          />
                        </div>
                        <br />
                      </>
                    ) : (
                      ""
                    )}

                    <div>
                      <TextField
                        type="password"
                        label="Password"
                        variant="standard"
                        sx={{ width: "100%" }}
                        name="password"
                        onChange={(e) =>
                          setForm((prevalue) => {
                            return {
                              ...prevalue,
                              ["password"]: e.target.value,
                            };
                          })
                        }
                      />
                    </div>
                    <div>
                      {/* <CssTextField
                    label="Confirm Password"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    variant="standard"
                    value={form.confirm_password}
                    sx={{ margin: "auto" }}
                    onChange={(e) => setForm((prevalue) => {
                      return {
                        ...prevalue,
                        ['confirm_password']: e.target.value,
                      };
                    })}
                  /> */}
                      <br />
                      <TextField
                        type="password"
                        label="Confirm Password"
                        variant="standard"
                        sx={{ width: "100%" }}
                        name="confirm_password"
                        onChange={(e) =>
                          setForm((prevalue) => {
                            return {
                              ...prevalue,
                              ["confirm_password"]: e.target.value,
                            };
                          })
                        }
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "14px",
                      marginBottom: "14px",
                    }}
                  >
                    {formLoader ? (
                      <ColorButton
                        className="plan-active-submit-disabled-btn"
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
                      <ColorButton onClick={submitActivePlan}>
                        Submit
                      </ColorButton>
                    )}
                  </div>
                </div>
              </Dialog>
            </div>
          </div>
          <div className="cardsubmit">
            <div></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card1;
