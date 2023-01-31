import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../../css/pages/login.css";
import Toast from "../commonComponet/Toast";

const Register = () => {
  const [setType, setSetType] = useState({
    type1: false,
    type2: false,
  });

  const [isSubmit, setisSubmit] = useState(false);
  const [infoErrors, setInfoErrors] = useState({});
  const [info, setinfo] = useState({
    firstName: "",
    lastName: "",
    countryResidency: "india",
    phone: "",
    email: "",
    portalPassword: "",
    portalPasswordConfirm: "",
  });
  const input1 = (event) => {
    const { name, value } = event.target;
    setinfo((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
    console.log(info);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setInfoErrors(validate(info));
    setisSubmit(true);
  };
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is requied";
      notify("Email is requied");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
    ) {
      console.log(values.email);
      notify("Email format is invaild ");
      errors.email = "Email format is invaild";
    }
    if (!values.firstName) {
      errors.firstName = " firstName is requied";
      notify("First Name to is requied");
    }
    if (!values.lastName) {
      errors.lastName = "lastName is requied";
      notify("Last Name is requied");
    }
    if (!values.countryResidency) {
      errors.countryResidency = "countryResidency is requied";
      notify("Country Residency is requied");
    }
    if (!values.phone) {
      errors.phone = "phone is requied";
      notify("Phone is requied");
    }
    if (!values.portalPassword) {
      errors.portalPassword = "Password is requied";
      notify("Password is requied");
    }
    if (!values.portalPasswordConfirm) {
      errors.portalPasswordConfirm = "Confirm password is requied";
      notify("Confirm password is requied");
    } else if (!values.portalPasswordConfirm == values.portalPassword) {
      errors.portalPasswordConfirm = "password is not match";
      notify("password is not match");
    }
    return errors;
  };
  const notify = (p) => {
    Toast("warning", p);
  };

  useEffect(() => {
    if (Object.keys(infoErrors).length == 0 && isSubmit) {
      alert("your are login"); // onLoginUpdate(true)
    }
  }, [infoErrors]);

  return (
    <div style={{ background: "black", height: "100vh", overflowY: "hidden" }}>
      <div id="__next">
        <div className="">
          <header
            className="sticky-header scroll-on"
            style={{ maxWidth: "100%", display: "none" }}
          >
            <div className="container">
              <nav className="bg-transparent top  navbar navbar-light bg-light">
                <a
                  href="https://loving-shaw-65125c.netlify.app/"
                  className="brand p-0 cursor-pointer navbar-brand"
                >
                  <img
                    src="./rightfx_login_files/top-logo-white.svg"
                    alt="RightFX logo"
                    className="main-logo"
                  />
                  <img
                    src="./rightfx_login_files/top-logo.svg"
                    alt="RightFX logo"
                    className="menu-logo "
                  />
                </a>
              </nav>
            </div>
          </header>
          <div className="partner-form heigt-frm">
            <div className="position-relative reg-liv container">
              <div className="row">
                <div className="tabMobRes col-12">
                  <div className="tab-content regLiveContent" id="myTabContent">
                    <div className="row">
                      <div className="container">
                        <div className="form-lng">
                          <div className="dropdown">
                            <button
                              id="dropdown-basic"
                              aria-expanded="false"
                              type="button"
                              className="btn dropdown-toggle dropdown-toggle btn btn-none"
                            >
                              <img
                                src="./rightfx_login_files/lang-grey.png"
                                alt="RightFX"
                              />
                              <span>en</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade show active"
                      id="register"
                      role="tabpanel"
                      aria-labelledby="register-tab"
                    >
                      <div className="row">
                        <div className="col-lg-12">
                          <form onSubmit={handleSubmit}>
                            <div className="accuImg">
                              <a href="https://loving-shaw-65125c.netlify.app/">
                                <img
                                  src="./rightfx_login_files/top-logo.svg"
                                  alt="RightFX logo"
                                  className="menu-logo "
                                />
                              </a>
                              <h4>Register now, it's easy!</h4>
                            </div>

                            <div className="row">
                              <div className="position-relative mb-4 col-md-6 col-12">
                                <input
                                  type="text"
                                  name="firstName"
                                  placeholder="First name"
                                  value={info.firstName}
                                  className="form-control"
                                  onChange={input1}
                                />
                              </div>
                              <div className="position-relative mb-4 col-md-6 col-12">
                                <input
                                  type="text"
                                  name="lastName"
                                  placeholder="Last name"
                                  value={info.lastName}
                                  className="form-control"
                                  onChange={input1}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="position-relative mb-4 col">
                                <select
                                  name="countryResidency"
                                  value={info.countryResidency}
                                  onChange={input1}
                                  className="form-select form-select-lg"
                                >
                                  <option value="s">Select Country</option>
                                </select>
                                <div className="invalid-tooltip"></div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="position-relative mb-4 col-md-6 col-12">
                                <div className="input-group has-validation">
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                  >
                                    +971
                                  </button>
                                  <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone number"
                                    autoComplete="off"
                                    value={info.phone}
                                    className="form-control"
                                    onChange={input1}
                                  />
                                </div>
                              </div>
                              <div className="position-relative mb-4 col-md-6 col-12">
                                <input
                                  type="email"
                                  name="email"
                                  placeholder="Email"
                                  value={info.email}
                                  onChange={input1}
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="position-relative mb-4 col-md-6 col-12">
                                <div className="input-group has-validation">
                                  <input
                                    type={setType.type1 ? "text" : "password"}
                                    name="portalPassword"
                                    placeholder="Password"
                                    value={info.password}
                                    onChange={input1}
                                    className="form-control"
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
                                      class="material-icons"
                                      style={{ fontSize: "15px" }}
                                    >
                                      {setType.type1
                                        ? "remove_red_eye"
                                        : "visibility_off"}
                                    </span>
                                  </button>
                                </div>
                              </div>
                              <div className="position-relative mb-4 col-md-6 col-12">
                                <div className="input-group has-validation">
                                  <input
                                    type={setType.type2 ? "text" : "password"}
                                    name="portalPasswordConfirm"
                                    placeholder="Confirm Password"
                                    value={info.portalPasswordConfirm}
                                    onChange={input1}
                                    className="form-control"
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
                                      class="material-icons"
                                      style={{ fontSize: "15px" }}
                                    >
                                      {setType.type2
                                        ? "remove_red_eye"
                                        : "visibility_off"}
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="mb-4 row">
                              <div className="mb-2 mt-0 col-12">
                                <div className="badge rounded-pill bg-primary me-1">
                                  8-20 characters
                                </div>
                                <div className="badge rounded-pill bg-primary me-1">
                                  Latin Letters
                                </div>
                                <div className="badge rounded-pill bg-primary me-1">
                                  Numbers
                                </div>
                              </div>
                            </div>
                            <div className="mb-4 row">
                              <div className="col-12">
                                <div className="d-flex align-items-center justify-content-start pin-area">
                                  <button
                                    disabled=""
                                    type="button"
                                    className="btn btn-secondary"
                                  >
                                    Send PIN
                                    <span
                                      class="material-icons"
                                      style={{
                                        fontSize: "16px",
                                        marginLeft: "2px",
                                      }}
                                    >
                                      send
                                    </span>
                                  </button>
                                  <input
                                    type="text"
                                    disabled=""
                                    name="emailPin"
                                    placeholder="Enter Pin"
                                    value=""
                                    required=""
                                    onChange={input1}
                                    className="mx-3 form-control"
                                  />
                                  <div className="invalid-tooltip">
                                    PIN must be entered
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="mb-4 col-12">
                                <div mb="3" className="position-relative col">
                                  <div className="form-check">
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
                                      <span>
                                        By registering you agree to our
                                      </span>
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
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  disabled=""
                                >
                                  Register
                                </button>
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
                                  value=""
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
                                    value=""
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
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
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
              <div className="row">
                <div className="col-xl-4 col-md-4"></div>
                <div className="col-xl-4 col-md-4">
                  <div className="entityAcculogin">
                    <span>Already have an account?</span>{" "}
                    <NavLink to="/login">
                      <strong>Log in</strong>
                    </NavLink>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4">
                  <div className="entityAccu">
                    <span>Entity:</span>
                    <select name="type" type="text">
                      <option value="RightFX FSCM">RightFX FSCM </option>
                      <option value="RightFX JOR">RightFX JOR</option>
                      <option value="RightFX EU CySEC">RightFX EU CySEC</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-2"> </div>
                <div className="accuContent col-xl-8">
                  <div>
                    <p>
                      RightFX Limited is an Investment Firm incorporated under
                      number 167867 in the Republic of Mauritius. Authorized and
                      regulated by the Financial Service Commission ( FSC ) in
                      Mauritius (License No GB19024778 ). Registered address at
                      The Cyberati Lounge, Ground Floor, The Catalyst, Silicon
                      Avenue, 40 Cybercity, 72201 Ebène, Republic of Mauritius.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
