import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  InputBase,
  styled,
  MenuItem,
  Select,
  TextField,
  FormHelperText,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./How_to_participate.css";
import { ColorButton } from "../../customComponet/CustomElement";
import { useNavigate } from "react-router-dom";
const How_to_participate = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="app-content--inner">
          <div className="app-content--inner__wrapper mh-100-vh">
            <div style={{ opacity: 1 }}>
              <Grid container>
                <Grid item sm={11}></Grid>
                <Grid item xl={1}></Grid>
                <Grid item xl={10} md={12} lg={12}>
                  <p className="main-heading">What is Fantastic Four?</p>

                  <Paper
                    elevation={1}
                    style={{ borderRadius: "10px", padding: "20px" }}
                    className="w-100 mb-5 internal-transfer-form"
                  >
                    <ColorButton
                      sx={{
                        padding: "4px 12px !important",
                      }}
                      onClick={() => {
                        navigate("/Fantastic_tour");
                      }}
                    >
                      <ArrowBackIcon sx={{ fontSize: "16px" }} />
                    </ColorButton>
                    <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                      <Grid container>
                        <Grid item md={6}>
                          <h5 className="font-weight-bold mb-0 ">OVERVIEW</h5>
                        </Grid>
                      </Grid>
                    </div>
                    <ul className="dot">
                      <li>
                        Right Group Financial Limited (hereinafter— ‘Company’)
                        conducts the Fantastic Four contest (hereinafter—
                        ‘Contest’) for the IBs registered on the RightFX site
                        (hereinafter— ‘Site’) as Introducing Brokers from India
                        (hereinafter— ‘IBs’).
                      </li>
                      <li>
                        The Contest starts on 1MARCH2023 (12:00 am GMT) and ends
                        on 15APRIL 2023 (11:00 pm GMT).
                      </li>
                      <li>
                        The Contest prizes are: Dubai Tour,Thailand Tour,Goa
                        Tour,Kerela Tour.
                      </li>
                      <li>
                        Registration for the Contest ends on 15MARCH 2023 (12:00
                        am GMT).
                      </li>
                      <li>
                        The official page of the Contest (hereinafter— ‘Contest
                        Page’) is posted at <a href="#"> PAGE LINK</a>
                      </li>
                    </ul>

                    <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                      <Grid container>
                        <Grid item md={6}>
                          <h5 className="font-weight-bold mb-0 ">
                            PARTICIPATION
                          </h5>
                        </Grid>
                      </Grid>
                    </div>
                    <ul className="dot">
                      <li>
                        To become eligible for the Contest, the IB undertakes to
                        press the button ‘Take Part’ on the Contest Page
                      </li>
                      <li>
                        The time from the moment the IB pressed the ‘Take Part’
                        button on the Contest Page to the end date of the
                        Contest is called the Participation Time.
                      </li>
                      <li>
                        The employees or individuals receiving salary from the
                        Company are not eligible for the Contest.
                      </li>
                    </ul>

                    <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                      <Grid container>
                        <Grid item md={6}>
                          <h5 className="font-weight-bold mb-0 ">
                            CALCULATING RESULTS
                          </h5>
                        </Grid>
                      </Grid>
                    </div>
                    <ul className="dot">
                      <li>
                        The volumes traded by the IB on his or her trading
                        accounts are not counted for the purposes of the
                        Contest.
                      </li>
                      <li>
                        Only the volumes of the trades both opened after the
                        moment the IB signed up for the contest and closed
                        before the end time of the Contest are counted for the
                        purposes of the Contest.
                      </li>
                      <li>
                        The volumes generated by the IB’s referrals as the
                        Copiers in the RightFXCopytrading service are not
                        counted for the purposes of the Contest.
                      </li>
                      <li>
                        Only the volumes of the Valid Order are counted for the
                        purposes of the Contest.{" "}
                      </li>
                      <li>
                        The order is considered as the Valid Order if it lasts
                        for 120 seconds or more, has at least 30 points (3 pips)
                        difference between open price and close price, and is
                        not closed by the means of Partial close or Multiple
                        close.
                      </li>
                      <li>
                        Those trades will be counted which are traded by his
                        direct subordinate clients only.
                      </li>
                      <li>
                        If there is a Sub IB below a Main IB, then the trades of
                        The Sub IB will not be counted in the trades of the Main
                        IB.
                      </li>
                    </ul>
                    <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                      <Grid container>
                        <Grid item md={6}>
                          <h5 className="font-weight-bold mb-0 ">
                            WINNERS AND PRIZES
                          </h5>
                        </Grid>
                      </Grid>
                    </div>
                    <ul className="dot">
                      <li>
                        The IB becomes eligible for the Dubai Trip only if the
                        IB’s referrals trade a cumulative volume of at least
                        4500 lots within the Participation Time.
                      </li>
                      <li>
                        The IB becomes eligible for the Thailand Trip only if
                        the IB’s referrals trade a cumulative volume of at least
                        3500 lots within the Participation Time.
                      </li>
                      <li>
                        The IB becomes eligible for the Goa Trip only if the
                        IB’s referrals trade a cumulative volume of at least 800
                        lots within the Participation Time.{" "}
                      </li>
                      <li>
                        The IB becomes eligible for the Kerela Trip only if the
                        IB’s referrals trade a cumulative volume of at least
                        1500 lots within the Participation Time.{" "}
                      </li>
                      <li>
                        On the date of completion of offer there will be a draw
                        for each offer and one participant will win the trip.
                      </li>
                      <li>
                        First names or nicknames of the winners are posted on
                        the Site within 15 days after the Contest end date.
                      </li>
                      <li>
                        The winners’ personal managers contact them within 7
                        days after the Contest end date to provide more details.
                      </li>
                      <li>
                        The winner undertakes to provide original documents
                        issued by the Govt. The documents should be valid at the
                        Contest end date and should contain the serial number,
                        the winner’s photo, and the winner’s date of birth.
                      </li>
                    </ul>
                    <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                      <Grid container>
                        <Grid item md={6}>
                          <h5 className="font-weight-bold mb-0 ">
                            MISCELLANEOUS
                          </h5>
                        </Grid>
                      </Grid>
                    </div>
                    <ul className="dot">
                      <li>
                        The Company will run a background check on the winners,
                        their legitimacy, information validity, and possible
                        violations. Should any such issues be found, the Company
                        reserves the right to cancel the Contest results.{" "}
                      </li>
                      <li>
                        The Company reserves the right to change the terms and
                        conditions of the promotion without prior notification.
                      </li>
                      <li>
                        The Company is not liable for technical malfunctions
                        and/or interruptions in the internet connection on the
                        side of the client or third-party services, which could
                        directly or indirectly affect the client’s participation
                        in the Contest.
                      </li>
                      <li>
                        The Company is not liable for any delays or
                        interruptions in service operation or data transmission,
                        or performance failures in the RightFX system,
                        regardless of cause, including, but not limited to,
                        hardware or software malfunction, or interruptions in
                        the operation of the RightFX system.{" "}
                      </li>
                      <li>
                        The English version hereof prevails. Any translations
                        hereof, Contest pages, and statistics are for reference
                        only. In case of any discrepancies between the English
                        and other versions of these materials, the English
                        version shall prevail.
                      </li>
                      <li>
                        Any situation not described in these rules shall be
                        subject to the Company's decision.
                      </li>
                      <li>
                        We Suggest Participants to read all terms & condition
                        carefully before participating which is available on
                        www.rightfx.com.
                      </li>
                    </ul>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default How_to_participate;
