import React, { useState } from "react";
import "./Card.css";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { ColorButton } from "../../customComponet/CustomElement";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import axios from "axios";
import { IsApprove, Url } from "../../../global.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Card1 = (prop) => {
  const navigate = useNavigate();
  const [Dopen, setDOpen] = React.useState(false);
  const descriptionElementRef = React.useRef(null);
  const [planList, setPlanList] = React.useState({
    data: [],
  });

  toast.configure();
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
  const [formLoader, setFormLoader] = useState(false);
  const [activeIndex, setactiveIndex] = useState(0);
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

  const fetchPlantDetaiils = async () => {
    // setMT5AccountLoader(true);
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    await axios
      .post(`${Url}/ajaxfiles/get_mt5_live_packages.php`, param)
      .then((res) => {
        // setMT5AccountLoader(false);
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          planList.data = res.data.data;
          planList.data.forEach((element) => {
            element.isActive = false;
          });
          planList.data[1].isActive = true;
          setPlanList({ ...planList });
          console.log(planList);
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
      toast.error("Please enter MT5 Balance");
    } else if (form.password == "") {
      toast.error("Please enter password");
    } else if (form.confirm_password == "") {
      toast.error("Please enter confirm password");
    } else if (form.password != form.confirm_password) {
      toast.error("Confirm password must be the same as password");
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
      param.append("password", form.password);
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
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            setDOpen(false);
            prop.closePopup(false);
            prop.refresh(false);
          }
        });
    }
  };
  return (
    <div style={{ width: "100%" }}>
      <div
        className="swiper-container swiper swiper-container-horizontal"
        style={{ display: "contents" }}
      >
        <div
          className="swiper-wrapper"
          // style={{transitionDuration: "0ms transform": translate3d(52px, 0px, 0px)}}
          style={{
            transitionDuration: "0ms",
            transform: "translate3d(0px, 0px, 0px)",
          }}
        >
          <div
            className={`acc-type-slide swiper-slide swiper-slide- active`}

            // style={{ marginRight: "16px" }}
          >
            <div
              data-bdd-id="selector account type 1"
              className={`acc-type__item _selected`}
            >
              <div className="acc-type__heading">
                <div className="acc-type__title">
                  <h3 className="acc-type__name">DEMO</h3>
                </div>
                <div className="acc-type__platforms">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iNDYiIHZpZXdCb3g9IjAgMCA0NCA0NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3LjkzNTUgMS4wMzc0MUMyMC40NTA2IC0wLjM0NTgwMyAyMy41NDk0IC0wLjM0NTgwMyAyNi4wNjQ1IDEuMDM3NDFMMzkuOTM1NSA4LjY2NTc1QzQyLjQ1MDYgMTAuMDQ5IDQ0IDEyLjYwNTIgNDQgMTUuMzcxN1YzMC42MjgzQzQ0IDMzLjM5NDggNDIuNDUwNiAzNS45NTEgMzkuOTM1NSAzNy4zMzQzTDI2LjA2NDUgNDQuOTYyNkMyMy41NDk0IDQ2LjM0NTggMjAuNDUwNiA0Ni4zNDU4IDE3LjkzNTUgNDQuOTYyNkw0LjA2NDU1IDM3LjMzNDNDMS41NDk0IDM1Ljk1MSAwIDMzLjM5NDggMCAzMC42MjgzVjE1LjM3MTdDMCAxMi42MDUyIDEuNTQ5NCAxMC4wNDkgNC4wNjQ1NSA4LjY2NTc1TDE3LjkzNTUgMS4wMzc0MVoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcikiIGZpbGwtb3BhY2l0eT0iMC4xIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzkuNjgxNCA5LjA4NDg3TDI1LjgxMDUgMS40NTY1M0MyMy40NTI2IDAuMTU5NzY4IDIwLjU0NzQgMC4xNTk3NjcgMTguMTg5NSAxLjQ1NjUzTDQuMzE4NTggOS4wODQ4N0MxLjk2MDYzIDEwLjM4MTYgMC41MDgwNjggMTIuNzc4MSAwLjUwODA2OCAxNS4zNzE3VjMwLjYyODNDMC41MDgwNjggMzMuMjIxOSAxLjk2MDYzIDM1LjYxODQgNC4zMTg1OCAzNi45MTUxTDE4LjE4OTUgNDQuNTQzNUMyMC41NDc0IDQ1Ljg0MDIgMjMuNDUyNiA0NS44NDAyIDI1LjgxMDUgNDQuNTQzNUwzOS42ODE0IDM2LjkxNTFDNDIuMDM5NCAzNS42MTg0IDQzLjQ5MTkgMzMuMjIxOSA0My40OTE5IDMwLjYyODNWMTUuMzcxN0M0My40OTE5IDEyLjc3ODEgNDIuMDM5NCAxMC4zODE2IDM5LjY4MTQgOS4wODQ4N1pNMjYuMDY0NSAxLjAzNzQxQzIzLjU0OTQgLTAuMzQ1ODAzIDIwLjQ1MDYgLTAuMzQ1ODAzIDE3LjkzNTUgMS4wMzc0MUw0LjA2NDU1IDguNjY1NzVDMS41NDk0IDEwLjA0OSAwIDEyLjYwNTIgMCAxNS4zNzE3VjMwLjYyODNDMCAzMy4zOTQ4IDEuNTQ5NCAzNS45NTEgNC4wNjQ1NSAzNy4zMzQzTDE3LjkzNTUgNDQuOTYyNkMyMC40NTA2IDQ2LjM0NTggMjMuNTQ5NCA0Ni4zNDU4IDI2LjA2NDUgNDQuOTYyNkwzOS45MzU1IDM3LjMzNDNDNDIuNDUwNiAzNS45NTEgNDQgMzMuMzk0OCA0NCAzMC42MjgzVjE1LjM3MTdDNDQgMTIuNjA1MiA0Mi40NTA2IDEwLjA0OSAzOS45MzU1IDguNjY1NzVMMjYuMDY0NSAxLjAzNzQxWiIgZmlsbD0idXJsKCNwYWludDFfbGluZWFyKSIgZmlsbC1vcGFjaXR5PSIwLjUiLz4KPHBhdGggZD0iTTM4LjQzNzIgMjMuNjgzN0MzOC40MzcyIDI1LjA1ODMgMzcuNzc3NSAyNi4yODgyIDM2LjYzOTIgMjcuMTU2NEMzNS4zNDU3IDI4LjEyMTEgMzMuNjUxMiAyOC41MTkgMzIuMDIxMyAyOC41MTlDMzEuMjMyMyAyOC41MTkgMzAuNDE3NCAyOC4zODY0IDI5LjY4MDEgMjguMDk3TDI5LjgzNTMgMjYuNDY5MUMzMC40NjkxIDI2LjY3NDEgMzEuMTU0NyAyNi43NzA2IDMxLjc4ODUgMjYuNzcwNkMzMy41NzM2IDI2Ljc3MDYgMzUuNDc1MSAyNS44MTggMzUuNDc1MSAyMy45OTcyQzM1LjQ3NTEgMjIuOTI0IDM0Ljc1MDcgMjIuMTUyMyAzMy42MjUzIDIyLjAwNzZDMzIuNTI1OCAyMS44NjI5IDMxLjE5MzUgMjIuMjQ4NyAzMC4yNzUxIDIyLjUxNEwzMC45NDc3IDE1LjMwMzJIMzcuODk0TDM3LjY3NDEgMTcuNDczN0gzMy40ODNMMzMuMTk4NSAyMC4wOTAzQzM1LjgyNDMgMTkuNjMyMSAzOC40MzcyIDIxLjExNTMgMzguNDM3MiAyMy42ODM3WiIgZmlsbD0iI0ZFN0MwMyIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE0Ljc2MTIgMjIuMDkyN0wxNS4xOTQ2IDI3Ljc1MzJIMTcuNDQ1N0wxNi40MjUgMTcuMTU3NUgxMy41MDI4TDExLjk1MDggMjIuNDE2NUMxMS44OTQ5IDIyLjcwNzkgMTEuODIxNSAyMi45OTI5IDExLjc0ODEgMjMuMjc3OUMxMS42NzQ3IDIzLjU2MjkgMTEuNjAxMyAyMy44NDc4IDExLjU0NTQgMjQuMTM5M0MxMS40NzMxIDIzLjg4MzUgMTEuNDE5MyAyMy42MjIgMTEuMzY1MiAyMy4zNTg4QzExLjMwNDIgMjMuMDYyMiAxMS4yNDI4IDIyLjc2MzQgMTEuMTUzOSAyMi40NjgzTDkuNjU3ODQgMTcuMTU3NUg2LjcwNzdMNS42MzExIDI3Ljc0MDNINy45MTAxMkw4LjMwMTYxIDIyLjIwOTJDOC4zNDM1NiAyMS41NzQ1IDguMzcxNTIgMjAuOTM5OCA4LjM4NTUgMjAuMzA1MUM4LjQ5NzM2IDIwLjkzOTggOC42NjUxNCAyMS41NjE2IDguODQ2OSAyMi4xODMzTDEwLjQ4MjggMjcuNzUzMkgxMi40NDAyTDE0LjI0MzggMjEuOTUwMkMxNC40MTE2IDIxLjQwNjEgMTQuNTY1NCAyMC44NzUxIDE0LjY3NzMgMjAuMzE4MUMxNC42OTEzIDIwLjkxMzkgMTQuNzE5MiAyMS40OTY4IDE0Ljc2MTIgMjIuMDkyN1pNMjMuMjU1MiAxOC45MDYySDI1Ljk4MTdMMjYuMzczMiAxNy4xNTc1SDE4LjEyMzlWMTguOTA2MkgyMC45MjAzVjI3Ljc1MzJIMjMuMjU1MlYxOC45MDYyWiIgZmlsbD0iIzMyMzc0QSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyIiB4MT0iMTAuMTY0MSIgeTE9IjIuOTI2NTYiIHgyPSIzMi42OTA0IiB5Mj0iNDMuNzQ4NSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMzFCMUZEIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzBENkZGQiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MV9saW5lYXIiIHgxPSIxMi4zNDY3IiB5MT0iNy4wMjkzOSIgeDI9IjMzLjQ3OTIiIHkyPSIzOS42ODQyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IndoaXRlIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzM2ODZGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo="
                    className="acc-form-banner__platforms-logo"
                  />
                </div>
              </div>
              <ul className="advantages">
                <li className="advantages__item">
                  <div className="advantages__text-wrap">
                    <div className="advantages__text">Spread from</div>
                    <span className="advantages__value">0.6 pips</span>
                  </div>
                  <p className="advantages__descr">Floating spread, markup</p>
                </li>
                {/* <li className="advantages__item">
                                    <div className="advantages__text-wrap">
                                        <div className="advantages__text">Min deposit</div>
                                        <span className="advantages__value">$25</span>
                                    </div>
                                    <p className="advantages__descr">Favourable: $100</p>
                                </li> */}
                <li className="advantages__item">
                  <div className="advantages__text-wrap">
                    <div className="advantages__text">Maximum leverage</div>
                    <span className="advantages__value">1:500</span>
                  </div>
                </li>
                <li className="advantages__item">
                  <div className="advantages__text-wrap">
                    <div className="advantages__text">Margin call</div>
                    <span className="advantages__value">25%</span>
                  </div>
                </li>
                <li className="advantages__item">
                  <div className="advantages__text-wrap">
                    <div className="advantages__text">Stop out level</div>
                    <span className="advantages__value">15%</span>
                  </div>
                </li>
                <li className="advantages__item">
                  <div className="advantages__text-wrap">
                    <div className="advantages__text">Swap</div>
                  </div>
                  <p className="advantages__descr">or a swap-free commission</p>
                </li>
                <li className="advantages__item">
                  <div className="advantages__text-wrap">
                    <div className="advantages__text">Instruments</div>
                  </div>
                  <p className="advantages__descr">49 instruments</p>
                </li>
              </ul>
              <a
                className={`acc-type__btn styled-btn-v2  ${
                  num.pro ? "_primary _normal" : "_primary-fill _normal"
                }`}
                type="button"
                onClick={openModelPassword}
              >
                Selected
              </a>
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
                Demo
                {/* {(planList.data[activeIndex]) ? planList.data[activeIndex].plan_title : ""} */}
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
                        type="number"
                        label="MT5 Balance"
                        variant="standard"
                        sx={{ width: "100%" }}
                        name="balance"
                        onChange={(e) =>
                          setForm((prevalue) => {
                            return {
                              ...prevalue,
                              ["balance"]: e.target.value,
                            };
                          })
                        }
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
                  <ColorButton onClick={submitActivePlan}>Submit</ColorButton>
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
  );
};

export default Card1;
