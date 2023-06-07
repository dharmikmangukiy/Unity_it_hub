import React, { useState } from "react";
// import logo from './lang-grey.png';
// import Logo from './logo2.png'
import { NavLink } from "react-router-dom";

export default function RegisterLive() {
  const [setType, setSetType] = useState({
    type1: false,
    type2: false,
  });

  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    countryResidency: "india",
    phone: "",
    email: "",
  });

  const input1 = (event) => {
    const { name, value } = event.target;
    setInfo((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };
  return (
    <>
      <div className="partner-form heigt-frm">
        <div className="position-relative reg-liv container">
          <div className="position-relative reg-liv container">
            <div className="row">
              <div className="tabMobRes col-12">
                <div className="tab-content regLiveContent">
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
                            {/* <img src={logo} alt="Accuindex" /> */}
                            <span>EN</span>
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
                    <div className="raw">
                      <div className="col-lg-12">
                        <form>
                          <div className="accuImg">
                            <a href="/">
                              {/* <img src={Logo} alt="" className='menu-logo ' /> */}
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
                              <div className="invalid-tooltip">
                                First name is required
                              </div>
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
                              <div className="invalid-tooltip">
                                Last name is required
                              </div>
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
                                  autocomplete="off"
                                  value={info.phone}
                                  className="form-control"
                                  onChange={input1}
                                />
                                <div className="invalid-tooltip">
                                  Phone is required
                                </div>
                              </div>
                            </div>
                            <div className="position-relative mb-4 col-md-6 col-12">
                              <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={info.email}
                                className="form-control"
                                onChange={input1}
                              />
                              <div className="invalid-tooltip">
                                Email is required
                              </div>
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
                                    className="material-icons"
                                    style={{ fontSize: "15px" }}
                                  >
                                    {setType.type1
                                      ? "remove_red_eye"
                                      : "visibility_off"}
                                  </span>
                                </button>
                                <div className="invalid-tooltip">
                                  Enter your password
                                </div>
                              </div>
                            </div>
                            <div className="position-relative mb-4 col-md-6 col-12">
                              <div className="input-group has-validation">
                                <input
                                  type={setType.type2 ? "text" : "password"}
                                  name="portalPasswordConfirm"
                                  placeholder="Confirm Password"
                                  value={info.portalPasswordConfirm}
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
                                    className="material-icons"
                                    style={{ fontSize: "15px" }}
                                  >
                                    {setType.type2
                                      ? "remove_red_eye"
                                      : "visibility_off"}
                                  </span>
                                </button>
                                <div className="invalid-tooltip">
                                  Enter confirm password
                                </div>
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
                                    className="material-icons"
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
                                  disabled="" //disabled
                                  name="emailPin"
                                  placeholder="Enter Pin"
                                  value=""
                                  required=""
                                  readonly=""
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
                                    for="gridCheck"
                                    className="form-check-label"
                                  >
                                    <span>By registering you agree to our</span>
                                    <a
                                      href="https://www.accuindex.com/legal-documents"
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
                                required=""
                                onChange={input1}
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
                              <button type="submit" className="btn btn-primary">
                                Login
                              </button>
                            </div>
                          </div>
                          <a href="https://my.accuindex.com/ForgotPassword">
                            Forgot Password?
                          </a>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div></div>
                <div className="row">
                  <div className="col-xl-4 col-md-4"></div>
                  <div className="col-xl-4 col-md-4">
                    <div className="entityAcculogin">
                      <span>Already have an account?</span>
                      {""}

                      <NavLink to="/login">
                        <strong>Log in</strong>
                      </NavLink>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-4">
                    <div className="entityAccu">
                      <span>Entity:</span>
                      <select name="type" type="text">
                        <option value="Accuindex FSCM">Accuindex FSCM </option>
                        <option value="Accuindex JOR">Accuindex JOR</option>
                        <option value="Accuindex EU CySEC">
                          Accuindex EU CySEC
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-2"> </div>
                  <div className="accuContent">
                    <div>
                      <p>
                        Accuindex Limited is an Investment Firm incorporated
                        under number 167867 in the Republic of Mauritius.
                        Authorized and regulated by the Financial Service
                        Commission ( FSC ) in Mauritius (License No GB19024778
                        ). Registered address at The Cyberati Lounge, Ground
                        Floor, The Catalyst, Silicon Avenue, 40 Cybercity, 72201
                        Ebène, Republic of Mauritius.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
