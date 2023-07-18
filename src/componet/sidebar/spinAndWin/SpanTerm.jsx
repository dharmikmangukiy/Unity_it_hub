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
import { ColorButton } from "../../customComponet/CustomElement";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import "./How_to_participate.css";
const SpanTerm = () => {
  const navigate = useNavigate();
  const dataArray = [
    "The 'SPIN AND WIN' (the offer) is open to all new and existing customers of RightFX.",
    "The Spin is free to run and no purchase is necessary. However, some prizes may require a deposit to be made.",
    "All prizes for all winners are non-exchangeable, non-transferable, non-withdrawable and no cash alternative is offered. Employees of the Company directly associated with administration of the offer shall not be eligible to participate.",
    "All Users 18 years and over, to be eligible to enter the Spin And Win, must ensure their personal details are submitted to the Company are correct.",
    "All Users 18 years and over, to be eligible to enter the Spin And Win, must ensure their personal details are submitted to the Company are correct.",
    "Participants of the Spin And Win, following their spin of the wheel, have a chance to win a prize if the spinner stops spinning and lands on the segment of the wheel indicating they are eligible to win a prize.",
    "Participant will win the prize corresponding to the prize stated on that segment on the wheel.",
    "Prizes vary on a quotas being claimed. Participants are deemed to have accepted and agreed to be bound by these terms and conditions upon entry and the Company reserves the right to amend these terms and conditions at any time.",
    "Any such revised terms and conditions shall have effect immediately and may be found on the Company's website: www.rightfx.com. It is a condition of entry that these terms and conditions are final.",
    "The Company reserves the right to refuse to award any of the prizes to anyone in breach of these terms and conditions. The Company reserves the right to hold void, cancel, suspend, or amend the Spin and Win where it becomes necessary to do so.",
    "The Company accepts no responsibility for entries not successfully completed due to a technical fault, technical malfunction, computer hardware or software failure, satellite, network, or server failure of any kind whatsoever.",
    "Spin will be available for twice in 24 hours & Timing for Spin & Win is 2:30 AM &2:30 PM GMT. 100 Spin Points = 1 USD.",
    "Reward will be added in your MT5 Account as MT5 Credit. Minimum $50 Profit Require in MT5 To Withdraw when participant only trades with credit amount provided by company.",
    "Participant can Withdraw amount after 7 days of review & if found any kind of suspicious activity company reserve rights to remove winning prize at any time without prior notice. Trading Lot Size will be fixed 0.01 & maximum open position at a time will be 5 until participant make deposit of $50.",
    "50 USD to 499 Deposit & Get Chance to Win Extra Spin worth up to 20 USD. 500 USD & Above Deposit and Get Chance to Win Extra Spin worth up to 200 USD.",
    "5 minimum trades require if user deposit amount for paid spin & request for Withdraw deposit Amount. Paid Spins will be only available once per user. Participant can refer and unlock new referral Spin it will remain in pending until the user who joined with referral link complete full KYC after that Spin will Unlock for Participant.",
    "Offer may Change Without prior notice. Free Spin on deposit can be applicable for once in 24 hrs. If there is only spin credit account maximum lots size 0.01 This offer is just for simulation purpose, it does not promote or suggest any kind of gambling or casino practices.",
    "Any situation not described in these rules shall be subject to the Company's decision. Spin & Win offer is created for new traders only for trading purpose. RightFX is Providing them a chance to improve their trading skills. If we found any kind of abusive trading practices than it will be direct affect to your Spin account.",
    "1 Person is eligible to use 1 Spin Account per Email. If any person found using more than 1 Email for Spin Account his account will be terminated without any prior notice.",
  ];
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
                  <p className="main-heading">HOW TO GET SPIN?</p>

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
                        navigate("/spinAndWin");
                      }}
                    >
                      <ArrowBackIcon sx={{ fontSize: "16px" }} />
                    </ColorButton>
                    <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                      <Grid container>
                        <Grid item md={6}>
                          <h5 className="font-weight-bold mb-0 ">
                            Terms & Conditions
                          </h5>
                        </Grid>
                      </Grid>
                    </div>
                    <ul className="dot">
                      {dataArray.map((item) => {
                        return <li>{item}</li>;
                      })}
                      <li>
                        All information submitted in connection with this
                        Contest will be treated in accordance with these T&Cs
                        and the Privacy Notice available at{" "}
                        <a
                          href="https://rightfx.com/legal-documents/Promotion%20Terms"
                          target="_blank"
                        >
                          www.rightfx.com
                        </a>{" "}
                        .
                      </li>
                    </ul>

                    <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                      <Grid container>
                        <Grid item md={6}>
                          <h5 className="font-weight-bold mb-0 ">
                            PRIVACY NOTICE
                          </h5>
                        </Grid>
                      </Grid>
                    </div>
                    <ul className="dot">
                      <li>
                        All information submitted in connection with this
                        Contest will be treated in accordance with these T&Cs
                        and the Privacy Notice available at{" "}
                        <a
                          href="https://rightfx.com/legal-documents/Promotion%20Terms"
                          target="_blank"
                        >
                          www.rightfx.com
                        </a>
                        .
                      </li>
                      <li>
                        For withdrawal profit of Spin Account you need a minimum
                        $250 deposit and traded at least 10 lots.
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

export default SpanTerm;
