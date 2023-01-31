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
import { Grid, Paper } from "@mui/material";
import TopButton from "../../customComponet/TopButton";
import Card2 from "../TradingAccounts/Card2";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OpenDemoaccount = () => {
  const navigate = useNavigate();
  const [Dopen, setDOpen] = React.useState(false);
  const descriptionElementRef = React.useRef(null);
  const [Drefresh, setDrefresh] = React.useState(true);

  const openModelPassword = () => {
    setDOpen(true);
  };
  React.useEffect(() => {
    if (Dopen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [Dopen]);
  useEffect(() => {
    if (!Drefresh) {
      navigate("/");
    }
  }, []);
  const [active, setActive] = useState(false);
  const [num, setNum] = useState({
    vip: false,
    pro: true,
    Executive: false,
  });
  console.log(active);
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
  return (
    <div className="app-content--inner">
      <div className="app-content--inner__wrapper mh-100-vh">
        <div style={{ opacity: 1 }}>
          <Grid container>
            <Grid item sm={11}></Grid>
            <Grid item xl={1}></Grid>
            <Grid item xl={10} md={12} lg={12}>
              {/* <TopButton /> */}
              <div className="mb-4 align-items-center">
                <div className="w-100 mb-4 display-4 font-weight-bold">
                  Open Demo Account
                </div>
              </div>
              <Paper elevation={2} style={{ borderRadius: "10px" }}>
                <div
                  style={{
                    width: "100%",
                    overflowX: "hidden",
                    paddingTop: "25px",
                  }}
                >
                  <Card2 type={0} closePopup={setDOpen} refresh={setDrefresh} />
                  {/* <div
                    className="swiper-container swiper swiper-container-horizontal"
                    style={{ display: "contents" }}
                  >
                    <div
                      className="swiper-wrapper"
                      // style={{transitionDuration: "0ms transform": translate3d(52px, 0px, 0px)}}
                      style={
                        !num.pro
                          ? num.vip
                            ? {
                              transitionDuration: "0ms",
                              transform: "translate3d(242px, 0px, 0px)",
                            }
                            : {
                              transitionDuration: "0ms",
                              transform: "translate3d(-242px, 0px, 0px)",
                            }
                          : {
                            transitionDuration: "0ms",
                            transform: "translate3d(0px, 0px, 0px)",
                          }
                      }
                    >
                      <div
                        className={`acc-type-slide swiper-slide swiper-slide-${num.vip ? "active" : "prev"
                          }`}
                        onClick={() =>
                          setNum({
                            vip: true,
                            pro: false,
                            Executive: false,
                          })
                        }
                      // style={{ marginRight: "16px" }}
                      >
                        <div
                          data-bdd-id="selector account type 4"
                          className={`acc-type__item ${num.vip ? "_selected" : ""}`}
                        >
                          <div className="acc-type__heading">
                            <div className="acc-type__title">
                              <h3 className="acc-type__name">VIP</h3>
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
                            <li className="advantages__item">
                              <div className="advantages__text-wrap">
                                <div className="advantages__text">Min deposit</div>
                                <span className="advantages__value">$25</span>
                              </div>
                              <p className="advantages__descr">Favourable: $100</p>
                            </li>
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
                                <div className="advantages__text">No swaps</div>
                              </div>
                              <p className="advantages__descr">No commissions</p>
                            </li>
                            <li className="advantages__item">
                              <div className="advantages__text-wrap">
                                <div className="advantages__text">Instruments</div>
                              </div>
                              <p className="advantages__descr">55 instruments</p>
                            </li>
                          </ul>
                          <a
                            className={`acc-type__btn styled-btn-v2  ${num.vip ? "_primary _normal" : "_primary-fill _normal"
                              }`}
                            onClick={openModelPassword}
                            type="button"
                          >
                            Select
                          </a>
                        </div>
                      </div>

                      <div
                        className={`acc-type-slide swiper-slide swiper-slide-${num.pro ? (num.vip ? "next" : "prev") : "active"
                          }`}
                        onClick={() =>
                          setNum({
                            vip: false,
                            pro: true,
                            Executive: false,
                          })
                        }

                      // style={{ marginRight: "16px" }}
                      >
                        <div
                          data-bdd-id="selector account type 1"
                          className={`acc-type__item ${num.pro ? "_selected" : ""}`}
                        >
                          <div className="acc-type__heading">
                            <div className="acc-type__title">
                              <h3 className="acc-type__name">PRO</h3>
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
                            <li className="advantages__item">
                              <div className="advantages__text-wrap">
                                <div className="advantages__text">Min deposit</div>
                                <span className="advantages__value">$25</span>
                              </div>
                              <p className="advantages__descr">Favourable: $100</p>
                            </li>
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
                            className={`acc-type__btn styled-btn-v2  ${num.pro ? "_primary _normal" : "_primary-fill _normal"
                              }`}
                            type="button"
                            onClick={openModelPassword}
                          >
                            Selected
                          </a>
                        </div>
                      </div>
                      <div
                        className={`acc-type-slide swiper-slide swiper-slide-${num.Executive ? "active" : "next"
                          }`}
                        onClick={() =>
                          setNum({
                            vip: false,
                            pro: false,
                            Executive: true,
                          })
                        }
                      // style={{ marginRight: "16px" }}
                      >
                        <div
                          data-bdd-id="selector account type 4"
                          className={`acc-type__item ${num.Executive ? "_selected" : ""}`}
                        >
                          <div className="acc-type__heading">
                            <div className="acc-type__title">
                              <h3 className="acc-type__name">Executive</h3>
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
                            <li className="advantages__item">
                              <div className="advantages__text-wrap">
                                <div className="advantages__text">Min deposit</div>
                                <span className="advantages__value">$25</span>
                              </div>
                              <p className="advantages__descr">Favourable: $100</p>
                            </li>
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
                                <div className="advantages__text">No swaps</div>
                              </div>
                              <p className="advantages__descr">No commissions</p>
                            </li>
                            <li className="advantages__item">
                              <div className="advantages__text-wrap">
                                <div className="advantages__text">Instruments</div>
                              </div>
                              <p className="advantages__descr">55 instruments</p>
                            </li>
                          </ul>
                          <a
                            className={`acc-type__btn styled-btn-v2  ${num.Executive ? "_primary _normal" : "_primary-fill _normal"
                              }`}
                            type="button"
                            onClick={openModelPassword}
                          >
                            Select
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
                            Pro Package
                          </h4>
                        </div>

                        <div
                          className="create-account-content"
                          style={{ margin: "0 17px", textAlign: "center" }}
                        >
                          <div>
                            <div>
                              <CssTextField
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                name="password"
                                autoComplete="current-password"
                                variant="standard"
                                sx={{ margin: "auto" }}
                              />
                            </div>
                            <div>
                              <CssTextField
                                id="standard-password-input"
                                label="Confirm Password"
                                type="password"
                                name="password"
                                autoComplete="current-password"
                                variant="standard"
                                sx={{ margin: "auto" }}
                              />
                            </div>
                          </div>
                          <div style={{ textAlign: "center", marginTop: "14px", marginBottom: "14px" }}>
                            <ColorButton>Submit</ColorButton>
                          </div>
                        </div>
                      </Dialog>
                    </div>



                  </div> */}
                  <div className="cardsubmit">
                    <div></div>
                  </div>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};
export default OpenDemoaccount;
