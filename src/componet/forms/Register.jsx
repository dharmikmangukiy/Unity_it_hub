import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
// import "../../css/pages/login.css";
// import logo from './lang-grey.png';
import logo1 from "../sidebar/loginLogo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";
import "./Responsive.css";
import { ColorButton } from "../customComponet/CustomElement";
import { Url } from "../../global.js";
import axios from "axios";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { CheckBox } from "@mui/icons-material";

const Register = () => {
  const { id, id1 } = useParams();
  const [setType, setSetType] = useState({
    type1: false,
    type2: false,
  });
  const [compaign, setCompaign] = useState({
    campaign_id: "",
    ref: "",
  });
  const navigate = useNavigate();

  const [isLoader, setIsLoader] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);
  const [infoErrors, setInfoErrors] = useState({});
  const [countryCode, setCountryCode] = useState("");
  const [countryData, setCountryData] = useState({
    data: [],
  });
  const [colorChange, setColorChange] = useState({
    first: false,
    second: false,
    third: false,
    four: false,
  });
  const [msg, setMsg] = useState({
    phone: "",
    email: "",
    portalPassword: "",
    portalPasswordConfirm: "",
  });
  const [info, setinfo] = useState({
    sponsor_id: "",
    manager_code: "",
    firstName: "",
    lastName: "",
    countryResidency: "",
    phone: "",
    email: "",
    portalPassword: "",
    portalPasswordConfirm: "",
    emailPin: "",
    tos: false,
  });
  const [infoTrue, setinfoTrue] = useState({
    firstName: false,
    lastName: false,
    countryResidency: false,
    phone: false,
    email: false,
    portalPassword: false,
    portalPasswordConfirm: false,
  });
  const input1 = (event) => {
    var { name, value } = event.target;
    // console.log(event.target);
    if (event.target.getAttribute) {
      if (event.target.getAttribute("type") == "checkbox") {
        value = event.target.checked;
      }
    }
    setinfo((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
    if (event.target.name == "phone" && value.toString().length > 8) {
      const param = new FormData();
      param.append("action", "validate_phone");
      param.append("user_phone", value);
      axios
        .post(Url + "/ajaxfiles/register_validation.php", param)
        .then((res) => {
          if (res.data.status == "error") {
            msg.phone = res.data.message;
            setMsg({ ...msg });
          } else {
            msg.phone = "";
            setMsg({ ...msg });
          }
        });
    }
    console.log(info);
    if (name == "portalPasswordConfirm") {
      if (value == "") {
        msg.portalPasswordConfirm = "Enter confirm password";
        setMsg({ ...msg });
      } else if (value !== info.portalPassword) {
        msg.portalPasswordConfirm = "Passwords must match";
        setMsg({ ...msg });
      } else {
        msg.portalPasswordConfirm = "";
        setMsg({ ...msg });
      }
    }
    if (event.target.name == "portalPassword") {
      if (
        event.target.value.match(/[A-Z]/g) &&
        event.target.value.match(/[a-z]/g)
      ) {
        colorChange.second = true;
        setColorChange({ ...colorChange });
      } else {
        colorChange.second = false;
        setColorChange({ ...colorChange });
      }
      if (event.target.value.match(/[0-9]/g)) {
        colorChange.third = true;
        setColorChange({ ...colorChange });
        // console.log("colorChange.third", colorChange.third);
      } else {
        colorChange.third = false;
        setColorChange({ ...colorChange });
        // console.log("colorChange.third", colorChange.third);
      }
      if (event.target.value.length >= 8 && event.target.value.length <= 20) {
        colorChange.first = true;
        setColorChange({ ...colorChange });
      } else {
        colorChange.first = false;
        setColorChange({ ...colorChange });
      }
      if (event.target.value.match(/[!@#$%^&*()_+=]/g)) {
        colorChange.four = true;
        setColorChange({ ...colorChange });
      } else {
        colorChange.four = false;
        setColorChange({ ...colorChange });
      }
      if (value == "") {
        msg.portalPassword = "Enter your password";
        setMsg({ ...msg });
      } else if (value.length < 8 || event.target.value.length >= 20) {
        console.log("check it");
        msg.portalPassword = "Password must contain atleast 8-20 characters";
        setMsg({ ...msg });
      } else if (
        !event.target.value.match(/[A-Z]/g) ||
        !event.target.value.match(/[a-z]/g) ||
        !event.target.value.match(/[0-9]/g)
      ) {
        msg.portalPassword =
          "Atleast one lower case, upper case and number required";
        setMsg({ ...msg });
      } else if (!event.target.value.match(/[!@#$%^&*()_+=]/g)) {
        msg.portalPassword = "Special Characters is requied";
        setMsg({ ...msg });
      } else {
        msg.portalPassword = "";
        setMsg({ ...msg });
      }
    }
    if (event.target.name == "email") {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        console.log("ds");
        msg.email = "Enter a valid email";
        setMsg({ ...msg });
      } else {
        const param = new FormData();
        param.append("action", "validate_email");
        param.append("user_email_address", value);
        axios
          .post(Url + "/ajaxfiles/register_validation.php", param)
          .then((res) => {
            if (res.data.status == "error") {
              msg.email = res.data.message;
              setMsg({ ...msg });
            } else {
              msg.email = "";
              setMsg({ ...msg });
            }
          });
      }
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setInfoErrors(validate(info));
    setisSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = " firstName is requied";
      notify("First Name is requied");
    } else if (!values.lastName) {
      errors.lastName = "lastName is requied";
      notify("Last Name is requied");
    } else if (!values.countryResidency) {
      errors.countryResidency = "countryResidency is requied";
      notify("Country Residency is requied");
    } else if (!values.phone) {
      errors.phone = "phone is not valid";
      notify("Phone is requied");
    } else if (
      values.phone.toString().length <= 3 ||
      values.phone.toString().length > 12
    ) {
      errors.phone = "phone is not valid";
      notify("Phone number is not valid");
    } else if (!values.email) {
      errors.email = "Email is requied";
      notify("Email is requied");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
    ) {
      errors.email = "Enter a valid email";
    } else if (!values.portalPassword) {
      errors.portalPassword = "Password is requied";
      notify("Password is requied");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
        values.portalPassword
      )
    ) {
      errors.portalPassword = "Password is requied";
      notify(
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    }
    //  if (!values.portalPassword({
    //     minLength: 8,
    //     minLowercase: 1,
    //     minUppercase: 1,
    //     minNumbers: 1,})
    // ) {
    //   errors.portalPassword =
    //     "Atleast one lower case, upper case and number required";
    // }else
    else if (!values.portalPasswordConfirm) {
      errors.portalPasswordConfirm = "Confirm password is requied";
      notify("Confirm password is requied");
    } else if (!values.portalPasswordConfirm == values.portalPassword) {
      errors.portalPasswordConfirm = "password must match";
      notify("Confirm password did not matched.");
    }

    return errors;
  };
  const notify = (p) => {
    toast.error(p);
  };
  toast.configure();
  useEffect(() => {
    if (Object.keys(infoErrors).length === 0 && isSubmit) {
      setIsLoader(true);
      const param = new FormData();
      if (id == "sponsor") {
        param.append("sponsor_id", id1);
      }

      if (id == "manager") {
        param.append("managercode", id1);
      }

      if (id == "campaign") {
        param.append("campaign_id", compaign.ref);
      }
      // param.append("manager_code", info.manager_code);
      param.append("user_first_name", info.firstName);
      param.append("user_last_name", info.lastName);
      param.append("user_email_address", info.email);
      param.append("user_country", info.countryResidency);
      param.append("user_phone", info.phone);
      param.append("user_password", info.portalPassword);
      param.append("user_conf_password", info.portalPasswordConfirm);
      axios.post(Url + "/ajaxfiles/registration.php", param).then((res) => {
        if (res.data.status == "error") {
          toast.error(res.data.message);
          if (res.data.message == "Email address already used") {
            navigate("/login");
          }
          setIsLoader(false);
        } else {
          setIsLoader(false);
          setinfo({
            sponsor_id: "",
            manager_code: "",
            firstName: "",
            lastName: "",
            countryResidency: "",
            phone: "",
            email: "",
            portalPassword: "",
            portalPasswordConfirm: "",
          });
          navigate("/login");
          toast.success(res.data.message);
        }
      });
    }
  }, [infoErrors]);
  console.log("info.phone.toString().length", info.phone.toString().length);
  useEffect(() => {
    const param = new FormData();

    axios.post(Url + "/datatable/get_countries.php", param).then((res) => {
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        countryData.data = res.data.aaData;
        setCountryData({ ...countryData });
        info.countryResidency = res.data.user_country;
        setinfo({ ...info });
        setCountryCode(
          countryData.data.filter((x) => x.nicename == res.data.user_country)[0]
            .phonecode
        );
      }
    });
    if (id == "campaign") {
      var compaignData = id1.split("&");
      var compaignId = compaignData[0].split("=");
      var refId = compaignData[1].split("=");
      compaign.campaign_id = compaignId[1];
      compaign.ref = refId[1];
      setCompaign({ ...compaign });
    }
  }, []);
  // console.log("id", id, id1);
  return (
    <div>
      <div className="partner-form heigt-frm scrollr">
        <div className="position-relative reg-liv container">
          <div className="row">
            <div className="tabMobRes col-12">
              <div className="tab-content regLiveContent" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="register"
                  role="tabpanel"
                  aria-labelledby="register-tab"
                >
                  <div className="textCenter">
                    <img
                      src="./image/logo1.png"
                      style={{ width: "248px", marginBottom: "21px" }}
                    />
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <form onSubmit={handleSubmit}>
                        <div className="accuImg">
                          <h4>Register now, it's easy!</h4>
                        </div>

                        <div className="row"></div>

                        <div className="row">
                          <div style={{ paddingRight: 0, paddingLeft: 0 }}>
                            <div className="position-relative mbr-4 col-md-6 col-12">
                              <input
                                type="text"
                                name="firstName"
                                placeholder="First name"
                                value={info.firstName}
                                // className="form-control"
                                className={`form-control  ${
                                  info.firstName == "" &&
                                  infoTrue.firstName == true
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onBlur={trueFalse}
                                onChange={input1}
                              />

                              <div className="invalid-tooltip">
                                First name is required
                              </div>
                            </div>{" "}
                          </div>

                          <div className="position-relative mbr-4 col-md-6 col-12">
                            <input
                              type="text"
                              name="lastName"
                              placeholder="Last name"
                              value={info.lastName}
                              className={`form-control  ${
                                info.lastName == "" && infoTrue.lastName == true
                                  ? "is-invalid"
                                  : ""
                              }`}
                              onChange={input1}
                              onBlur={trueFalse}
                            />
                            <div className="invalid-tooltip">
                              Last name is required
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="position-relative mbr-4 col">
                            <select
                              name="countryResidency"
                              value={info.countryResidency}
                              onChange={(e) => {
                                input1(e);
                                setCountryCode(
                                  countryData.data.filter(
                                    (x) => x.nicename == e.target.value
                                  )[0].phonecode
                                );
                              }}
                              className={`form-select form-select-lg  ${
                                info.countryResidency == "" &&
                                infoTrue.countryResidency == true
                                  ? "is-invalid"
                                  : ""
                              }`}
                              onBlur={trueFalse}
                            >
                              <option value="">Select Country</option>
                              {countryData.data.map((item, index) => {
                                return (
                                  <option key={index} value={item.nicename}>
                                    {item.nicename}
                                  </option>
                                );
                              })}
                            </select>
                            <div className="invalid-tooltip">
                              Country of residence is required
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div style={{ paddingRight: 0, paddingLeft: 0 }}>
                            <div className="position-relative mbr-4 col-md-6 col-12">
                              <div className="input-group has-validation padzero">
                                <span
                                  type="button"
                                  className="btn btn-outline-secondary"
                                >
                                  +{countryCode}
                                </span>
                                <input
                                  type="text"
                                  name="phone"
                                  placeholder="Phone number"
                                  autoComplete="off"
                                  value={info.phone}
                                  className={`absol form-control  ${
                                    (info.phone == "" ||
                                      info.phone.toString().length <= 3 ||
                                      info.phone.toString().length > 12 ||
                                      msg.phone !== "") &&
                                    infoTrue.phone == true
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  // onChange={input1}
                                  onBlur={trueFalse}
                                  onChange={(e) => {
                                    if (!isNaN(Number(e.target.value))) {
                                      input1(e);
                                    }
                                  }}
                                />
                                <div className="invalid-tooltip ">
                                  {info.phone == ""
                                    ? "Phone is required"
                                    : info.phone.toString().length <= 3 ||
                                      info.phone.toString().length > 12
                                    ? "Phone number is not valid"
                                    : msg.phone != ""
                                    ? msg.phone
                                    : ""}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="position-relative mbr-4 col-md-6 col-12">
                            <input
                              type="email"
                              name="email"
                              placeholder="Email"
                              value={info.email}
                              className={`form-control  ${
                                (info.email == "" || msg.email != "") &&
                                infoTrue.email == true
                                  ? "is-invalid"
                                  : ""
                              }`}
                              onChange={input1}
                              onBlur={trueFalse}
                              // className="form-control"
                            />
                            <div className="invalid-tooltip">
                              {info.email == ""
                                ? "Email is required"
                                : msg.email != ""
                                ? msg.email
                                : ""}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="position-relative mbr-4 col-md-6 col-12 ">
                            <div style={{ paddingRight: 0, paddingLeft: 0 }}>
                              <div className="input-group has-validation padzero">
                                <input
                                  type={setType.type1 ? "text" : "password"}
                                  name="portalPassword"
                                  maxLength="20"
                                  placeholder="Password"
                                  value={info.portalPassword}
                                  onChange={input1}
                                  onBlur={trueFalse}
                                  className={` absol form-control ${
                                    (info.portalPassword == "" ||
                                      msg.portalPassword != "") &&
                                    infoTrue.portalPassword == true
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />

                                <button
                                  type="button"
                                  className="btn btn-outline-secondary"
                                  onClick={() => {
                                    setSetType({
                                      type1: !setType.type1,
                                      type2: setType.type2,
                                    });
                                  }}
                                >
                                  <span
                                    className="material-icons"
                                    style={{ fontSize: "15px" }}
                                  >
                                    {setType.type1
                                      ? "remove_red_eye"
                                      : "visibility_off"}
                                  </span>
                                </button>
                                {/* <div className="invalid-tooltip"></div> */}
                                <div className="invalid-tooltip ">
                                  {/* {msg.portalPassword} */}
                                  {info.portalPassword == ""
                                    ? "Enter confirm password"
                                    : msg.portalPassword}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="position-relative mbr-4 col-md-6 col-12 ">
                            <div className="input-group has-validation padzero">
                              <input
                                type={setType.type2 ? "text" : "password"}
                                name="portalPasswordConfirm"
                                maxLength="20"
                                placeholder="Confirm Password"
                                value={info.portalPasswordConfirm}
                                onChange={input1}
                                onBlur={trueFalse}
                                className={`absol form-control ${
                                  (info.portalPasswordConfirm == "" ||
                                    msg.portalPasswordConfirm != "") &&
                                  infoTrue.portalPasswordConfirm == true
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => {
                                  setSetType({
                                    type1: setType.type1,
                                    type2: !setType.type2,
                                  });
                                }}
                              >
                                <span
                                  className="material-icons"
                                  style={{ fontSize: "15px" }}
                                >
                                  {setType.type2
                                    ? "remove_red_eye"
                                    : "visibility_off"}
                                </span>
                              </button>
                              <div className="invalid-tooltip ">
                                {info.portalPasswordConfirm == ""
                                  ? "Enter confirm password"
                                  : msg.portalPasswordConfirm}
                              </div>
                            </div>
                          </div>
                          <div className="invalid-tooltip"></div>
                        </div>
                        <div className="mbr-4 row">
                          <div className="mb-2 mt-0 col-12">
                            <div
                              className={`badge rounded-pill me-1 centerRegister ${
                                colorChange.first
                                  ? "passcolortrue"
                                  : "passcolorfalse"
                              }`}
                              style={{
                                backgroundColor: "black !important",
                                fontSize: "11px",
                                alignItems: "baseline",
                              }}
                            >
                              8-20 characters {colorChange.first}
                            </div>
                            <div
                              className={`badge rounded-pill me-1 centerRegister ${
                                colorChange.second
                                  ? "passcolortrue"
                                  : "passcolorfalse"
                              }`}
                              style={{
                                textTransform: "none",
                                fontSize: "11px",
                                alignItems: "baseline",
                              }}
                            >
                              LATIN LETTERS EX.A-Z,a-z {colorChange.second}
                            </div>
                            <div
                              className={`badge rounded-pill me-1 centerRegister ${
                                colorChange.third
                                  ? "passcolortrue"
                                  : "passcolorfalse"
                              }`}
                              style={{
                                fontSize: "11px",
                                alignItems: "baseline",
                              }}
                            >
                              Numbers EX.0-9{colorChange.third}
                            </div>
                            <div
                              className={`badge rounded-pill me-1 centerRegister ${
                                colorChange.four
                                  ? "passcolortrue"
                                  : "passcolorfalse"
                              }`}
                              style={{
                                fontSize: "11px",
                                alignItems: "baseline",
                              }}
                            >
                              Special Characters Ex.@#$%^&* {colorChange.four}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="mbr-4 col-12">
                            <div mb="3" className="position-relative col">
                              <div className="form-check">
                                {/* <FormGroup>
                                  <FormControlLabel control={<CheckBox name="tos" checked={info.tos} onChange={input1} />} label="tos" />
                                </FormGroup> */}
                                <input
                                  type="checkbox"
                                  name="tos"
                                  value={info.tos}
                                  onChange={input1}
                                  id="gridCheck"
                                  className="form-check-input"
                                />
                                <label
                                  htmlFor="gridCheck"
                                  className="form-check-label"
                                >
                                  <span>By registering you agree to our</span>
                                  <a
                                    href="https://loving-shaw-65125c.netlify.app/legal-documents"
                                    target="_blank"
                                  >
                                    privacy policy
                                  </a>
                                </label>
                                <div className="invalid-tooltip">
                                  Accept Terms &amp; Conditions is required
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3 subMobRes col-12">
                            {isLoader == true ? (
                              <button
                                type="submit"
                                className="btn btn-primary"
                                disabled
                                style={{ padding: "8px 82px !important" }}
                              >
                                <svg
                                  class="spinner"
                                  style={{ position: "unset" }}
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
                              </button>
                            ) : (
                              <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={
                                  info.tos &&
                                  info.firstName != "" &&
                                  info.lastName != "" &&
                                  info.countryResidency != "" &&
                                  info.phone != "" &&
                                  info.phone.toString().length > 3 &&
                                  info.phone.toString().length <= 12 &&
                                  info.email != "" &&
                                  msg.email == "" &&
                                  info.portalPassword != "" &&
                                  msg.portalPassword == "" &&
                                  info.portalPasswordConfirm != "" &&
                                  msg.portalPasswordConfirm == ""
                                    ? false
                                    : true
                                }
                              >
                                Register
                              </button>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="col-xl-4 col-md-4">
                            <div className="entityAcculogin">
                              <span>Already have an account?</span>{" "}
                              <NavLink to="/login">
                                <strong>Log in</strong>
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade "
                  id="login"
                  role="tabpanel"
                  aria-labelledby="login-tab"
                >
                  <div className="row">
                    <div className="col-lg-12">
                      <h6 className="text-muted mb-3">
                        Fill in the fields below to login to your account
                      </h6>
                      <form className="">
                        <div className="mb-3 row">
                          <div className="position-relative col">
                            <label className="form-label">
                              Email<sup>*</sup>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={info.email}
                              onChange={input1}
                              required=""
                              className="form-control form-control-lg"
                            />
                            <div className="invalid-tooltip"></div>
                          </div>
                        </div>
                        <div className="mb-3 row">
                          <div className="position-relative mb-3 col">
                            <label className="form-label">
                              Password<sup>*</sup>
                            </label>
                            <div className="input-group has-validation">
                              <input
                                type="password"
                                name="password"
                                value={info.password}
                                onChange={input1}
                                required=""
                                className="form-control form-control-lg"
                              />
                              <button
                                type="button"
                                className="btn btn-outline-secondary"
                              >
                                <i className="bi bi-eye-fill"></i>
                              </button>
                              <div className="invalid-tooltip"></div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3 row">
                          <div className="mb-2 col-12">
                            <button type="submit" className="btn btn-primary">
                              Login
                            </button>
                          </div>
                        </div>
                        <a href="https://my.rightfx.com/ForgotPassword">
                          Forgot Password?
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="accuContent col-xl-8">
            <div>
              <p>
                RightFX Limited is an Investment Firm incorporated under number
                167867 in the Republic of Mauritius. Authorized and regulated by
                the Financial Service Commission ( FSC ) in Mauritius (License
                No GB19024778 ). Registered address at The Cyberati Lounge,
                Ground Floor, The Catalyst, Silicon Avenue, 40 Cybercity, 72201
                Ebène, Republic of Mauritius.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
