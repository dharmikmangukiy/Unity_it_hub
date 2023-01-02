import React, { useState, useEffect } from "react";
import "../../css/pages/login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
const style = {
  label: { fontSize: "large", float: "left", padding: "2px" },
};
const Login = (setLogin) => {
  const [isSubmit, setisSubmit] = useState(false);
  const [infoErrors, setInfoErrors] = useState({});
  const [info, setinfo] = useState({
    email: "",
    password: "",
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
    if (!values.password) {
      errors.password = " password is requied";
      notify("Password to is requied");
    }
    return errors;
  };
  const notify = (p) => {
    toast.warning(p);
  };
  toast.configure();
  useEffect(() => {
    if (Object.keys(infoErrors).length == 0 && isSubmit) {
      alert("your are login"); // onLoginUpdate(true)
      setLogin(true);
    }
  }, [infoErrors]);
  return (
    <div className="partner-form heigt-frm">
      <div className="position-relative reg-liv container">
        <div className="row">
          <div className="tabMobRes col-12">
            <div
              className="tab-content regLiveContent"
              style={{ minHeight: "auto" }}
            >
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
                        <h4>Login now</h4>
                        <div className="row">
                          <div className="position-relative mb-4  col-12">
                            <label htmlFor="firstName" style={style.label}>
                              First name
                            </label>
                            <input
                              type="text"
                              name="email"
                              placeholder="Email"
                              value={info.email}
                              className="form-control"
                              onChange={input1}
                            />
                          </div>
                          <div className="position-relative mb-4  col-12">
                            <label htmlFor="lastName" style={style.label}>
                              Last name
                            </label>
                            <input
                              type="password"
                              name="password"
                              placeholder="Password"
                              value={info.password}
                              className="form-control"
                              onChange={input1}
                            />
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
                            Login
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
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
            <span>Don't have an account?</span>{" "}
            <NavLink to="/Register">
              <strong>Apply for a live account</strong>
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
    </div>
  );
};

export default Login;
