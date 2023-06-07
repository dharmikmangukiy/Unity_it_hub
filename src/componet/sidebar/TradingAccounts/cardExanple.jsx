import React, { useState } from "react";
import "./Card.css";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { ColorButton } from "../../customComponet/CustomElement";

const Card1 = () => {
  const [active, setActive] = useState(false);
  const [num, setNum] = useState({
    vip: false,
    pro: true,
    Executive: false,
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
  return (
    <div style={{ width: "100%" }}>
      <div
        className="swiper-container swiper swiper-container-horizontal"
        style={{ display: "contents" }}
      >
        <div
          className="swiper-wrapper"
          // style={{transitionDuration: "0ms transform": translate3d(52px, 0px, 0px)}}
          style={{ display: "grid", gridTemplateColumns: "auto auto auto" }}
        >
          <div
            className={`acc-type-slide swiper-slide swiper-slide-${
              num.vip ? "active" : "prev"
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
                className={`acc-type__btn styled-btn-v2  ${
                  num.vip ? "_primary _normal" : "_primary-fill _normal"
                }`}
                type="button"
              >
                Select
              </a>
            </div>
          </div>

          <div
            className={`acc-type-slide swiper-slide swiper-slide-${
              num.pro ? (num.vip ? "next" : "prev") : "active prev"
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
                className={`acc-type__btn styled-btn-v2  ${
                  num.pro ? "_primary _normal" : "_primary-fill _normal"
                }`}
                type="button"
              >
                Selected
              </a>
            </div>
          </div>
          <div
            className={`acc-type-slide swiper-slide swiper-slide-${
              num.Executive ? "active" : "prev"
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
                className={`acc-type__btn styled-btn-v2  ${
                  num.Executive ? "_primary _normal" : "_primary-fill _normal"
                }`}
                type="button"
              >
                Select
              </a>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="cardsubmit">
        <div>
          <div className="cardCenter">
            <CssTextField
              id="standard-password-input"
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              variant="standard"
              sx={{ width: "40%", marginRight: "50px", marginTop: "30px" }}
            />
            <ColorButton sx={{ marginTop: "30px", height: "50%" }}>
              Submit
            </ColorButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card1;

<Dialog
  open={Dopen}
  onClose={() => setDOpen(false)}
  maxWidth="lg"
  fullWidth={true}
  scroll="paper"
  aria-labelledby="scroll-dialog-title"
  aria-describedby="scroll-dialog-description"
>
  <div
    id="form-dialog-title"
    className="d-flex align-items-center p-3 create-account-header"
  >
    <h5 className="w-100 text-center text-primary m-0 font-weight-bold">
      CREATE A TRADING ACCOUNT
    </h5>
    <Button>
      <CloseIcon />
    </Button>
  </div>
  <DialogContent className="create-account-content">
    <Grid container spacing={2} className="MuiGrid-justify-xs-space-between">
      <Card1 />
    </Grid>
  </DialogContent>
</Dialog>;
