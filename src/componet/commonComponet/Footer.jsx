import React from "react";
import PinterestIcon from "@mui/icons-material/Pinterest";
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
    <div className="app-content--inner" style={{ paddingTop: "0" }}>
      <div className="app-content--inner__wrapper">
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
                  <div className=" pt-4 pb-4 d-md-flex  copy-right text-blue-dark justify-content-center">
                    <div></div>
                    <div className="footer-social-icon">
                      <div className="d-flex">
                        <a
                          href="https://www.facebook.com/OfficialRightFX/"
                          target="_blank"
                          className="text-blue-dark"
                        >
                          <FacebookIcon className="main-color  footer-social-icon-size" />
                        </a>
                        <a
                          href="https://www.youtube.com/@RightFXbroker"
                          target="_blank"
                          className="ml-4 text-blue-dark"
                        >
                          <YouTubeIcon className="main-color footer-social-icon-size" />
                        </a>
                        <a
                          href="https://www.linkedin.com/company/official-rightfx/"
                          target="_blank"
                          className="ml-4 text-blue-dark"
                        >
                          <LinkedInIcon className="main-color footer-social-icon-size" />
                        </a>
                        <a
                          href="https://twitter.com/FxRight"
                          target="_blank"
                          className="ml-4 text-blue-dark"
                        >
                          <TwitterIcon className="main-color footer-social-icon-size" />
                        </a>
                      </div>
                      <div className="d-flex">
                        <a
                          href="https://www.instagram.com/rightfxbroker/"
                          target="_blank"
                          className="text-blue-dark"
                        >
                          <InstagramIcon className="main-color footer-social-icon-size" />
                        </a>
                        <a
                          href="https://in.pinterest.com/RightFX/"
                          target="_blank"
                          className="ml-4 text-blue-dark"
                        >
                          <PinterestIcon className="main-color footer-social-icon-size" />
                        </a>
                        <a
                          href="https://www.snapchat.com/add/officialrightfx"
                          target="_blank"
                          className="ml-4 text-blue-dark"
                        >
                          <span
                            class="fa fa-snapchat main-color footer-social-icon-size font_size"
                            aria-hidden="true"
                          ></span>
                        </a>

                        <a
                          href="https://telegram.me/rightfx"
                          target="_blank"
                          className="ml-4 text-blue-dark"
                        >
                          <TelegramIcon className="main-color footer-social-icon-size" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="divider"></div>
                  <div className="pt-4 px-3 py-2 border-top text-align-justify">
                    <b>Right Group Financial Limited</b> is registered by the
                    United Kingdom with registration number <b>13210109</b>. The
                    registered office of the Right Group Financial Limited is at
                    27, Old Gloucester Street, London, WC1N 3AX United Kingdom.
                  </div>
                  <div className=" px-3 py-2 text-align-justify">
                    <b className="text-danger">Risk Warning :</b> Read RGFL risk
                    disclosure before trading Forex, CFD’s, Spread-betting or FX
                    Options. Our services relate to complex derivative products
                    (CFDs) which are traded outside an exchange. These products
                    come with a high risk of losing money rapidly due to
                    leverage and thus are not appropriate for all investors. 76%
                    of all retail investors’ accounts lose money while trading
                    these instruments. Under no circumstances shall RightFX have
                    any liability to any person or entity for any loss or damage
                    in whole or part caused by, resulting from, or relating to
                    any investing activity.
                  </div>
                  <div className=" px-3 py-2 text-align-justify">
                    The material and information on this site is not meant for
                    residents of Israel, Iran and North Korea, officially the
                    Democratic People's Republic of Korea or use by any person
                    in any country or jurisdiction where such distribution or
                    use would be contrary to local law. The information on this
                    website does not constitute investment advice or a
                    recommendation or a solicitation to engage in any investment
                    activity. The entities above are duly authorised to operate
                    under the Right Group brand and trademarks.{" "}
                  </div>
                  <div className=" px-3 py-2 pb-4 text-align-justify">
                    The information on this website may only be copied with the
                    express written permission of RGFL.
                  </div>
                </div>
                <div className="divider"></div>
                <div className="border-top pt-4 d-flex justify-content-around">
                  <a
                    target="_blank"
                    href="https://rightfx.com/legal-documents/AML%20Policy"
                    className="only_color"
                  >
                    AML Policy{" "}
                  </a>
                  <a
                    target="_blank"
                    href="https://rightfx.com/legal-documents"
                    className="border_left"
                  >
                    IMP Policy
                  </a>
                  <a
                    target="_blank"
                    href="https://rightfx.com/legal-documents/IB%20terms%20&%20Condition"
                    className="border_left"
                  >
                    IB terms & Condition
                  </a>
                  <a
                    target="_blank"
                    href="https://rightfx.com/legal-documents/Promotion%20Terms"
                    className="border_left"
                  >
                    Promotion Terms
                  </a>
                  <a
                    target="_blank"
                    href="https://rightfx.com/legal-documents/Customer%20Agreement"
                    className="border_left"
                  >
                    Customer Agreement
                  </a>
                  <a
                    target="_blank"
                    href="https://rightfx.com/legal-documents/Risk%20Disclosure"
                    className="border_left"
                  >
                    Risk Disclosure
                  </a>
                  <a
                    target="_blank"
                    href="https://rightfx.com/legal-documents/Return%20Policy"
                    className="border_left"
                  >
                    Refund Policy
                  </a>
                </div>
                <div className=" px-3 py-2 pt-3 text-center">
                  <b>
                    © 2023 RightFX, registration number: 13210109. E-mail:
                    support@rightfx.com.
                  </b>
                </div>
                <div className="border-top pt-4 "></div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Footer;
