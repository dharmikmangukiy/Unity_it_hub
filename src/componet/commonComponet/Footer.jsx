import React from "react";

import Grid from "@mui/material/Grid";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useTranslation } from "react-i18next";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="app-content--inner" style={{ paddingTop: "0 !important" }}>
      <div className="app-content--inner__wrapper mh-100-vh">
        <div className="" style={{ opacity: 1 }}>
          <Grid container>
            <Grid item sm={11}></Grid>
            <Grid item xl={1}></Grid>
            <Grid
              item
              xl={10}
              md={12}
              lg={12}
              className="footer-section-control"
            >
              <div className="app-footer text-black-50 p-3 px-md-5 py-md-4 app-footer--opacity-bg">
                <div className="app-footer--first text-dark">
                  <ol className="footerstyle">
                    <li>
                      {/* {t("footerP1")} */}
                      Right Group is a group of companies which is registered
                      under number 26502 BC 2021 in SAINT VINCENT AND THE
                      GRENADINES . Authorised and regulated by the Financial
                      Authorities.
                    </li>
                    <li>
                      Right Group is registered under number 17863/2021 in UAE
                      (United Arab Emirates). Authorised and regulated by the
                      Financial Authorities to provide Financial Advise and
                      Financial Analysis, Marketing and Brokerage Services,
                      Investment Services
                      {/* {t("footerP2")} */}
                      {/* <a
                    href="https://www.fscmauritius.org/en/supervision/register-of-licensees/register-of-licensees-details?licence_no=GB19024778&key=&cat=GB&code="
                    className="text-primary"
                  >
                    GB19024778{" "}
                  </a> */}
                    </li>
                    <li className="font-size-xs">
                      {/* {t("footerp3")} */}
                      RightFX Limited registered address at 27, Old Gloucester
                      Street, LONDON, WC1N 3AX, UNITED KINGDOM.RightFX Limited,
                      authorised and regulated by the England and Wales (license
                      number 13210109).
                    </li>
                    <li className="font-size-xs">
                      <a className="text-primary" href="https://rightfx.com/">
                        {" "}
                        WWW.RIGHTFX.COM
                      </a>{" "}
                      website is operated by RightFX Limited
                    </li>
                  </ol>
                  <p className="text-align-justify">
                    <b className="text-danger"> Risk Warning:</b> Forex and CFD
                    trading involves a significant risk to your invested
                    capital. Please read and ensure you fully understand our
                    Risk Disclosure.
                  </p>
                  <p className="text-align-justify">
                    <b className="text-danger">Restricted Regions:</b> RightFX
                    Limited does not provide services for the residents of
                    certain countries, such as the Israel and the Islamic
                    Republic of Iran.
                  </p>
                </div>
                {/* <div className="d-flex align-items-center justify-content-center icons-sec">
                <a href="https://www.cysec.gov.cy/en-GB/entities/investment-firms/cypriot/45838/">
                  <img src="https://my.accuindex.com/static/media/CYSEC.7f22467d.webp" />
                </a>
                <a href="https://www.cysec.gov.cy/en-GB/entities/investment-firms/cypriot/45838/">
                  <img src="https://my.accuindex.com/static/media/FSC.ad1def3b.webp" />
                </a>
              </div> */}
                <div className="divider"></div>
                <div className="border-top pt-4 pb-4 d-md-flex justify-content-between copy-right text-blue-dark">
                  <div></div>
                  <div style={{ fontSize: "0.9rem" }}>
                    <a
                      href="https://www.facebook.com/OfficialRightFX/"
                      target="_blank"
                      className="ml-4 text-blue-dark"
                    >
                      <FacebookIcon className="main-color" />
                    </a>
                    <a
                      href="https://twitter.com/FxRight"
                      target="_blank"
                      className="ml-4 text-blue-dark"
                    >
                      <TwitterIcon className="main-color" />
                    </a>

                    <a
                      href="https://www.instagram.com/rightfxbroker/"
                      target="_blank"
                      className="ml-4 text-blue-dark"
                    >
                      <InstagramIcon className="main-color" />
                    </a>
                    <a
                      href="https://wa.link/8xc9m7"
                      target="_blank"
                      className="ml-4 text-blue-dark"
                    >
                      <WhatsAppIcon className="main-color" />
                    </a>

                    <a
                      href="https://telegram.me/rightfx"
                      target="_blank"
                      className="ml-4 text-blue-dark"
                    >
                      <TelegramIcon className="main-color" />
                    </a>
                  </div>
                </div>
                <div className="divider"></div>
                <div className="border-top pt-5 text-blue-dark">
                  <p className="text-primary" style={{ fontSize: "0.7rem" }}>
                    <span>© RightFx</span> {t("footerp4")}
                  </p>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Footer;
