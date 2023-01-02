import React from "react";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { styled } from "@mui/material/styles";
import Check from "@mui/icons-material/Check";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
function QontoStepIcon(props) {
  const { active, completed, className } = props;
  console.log(props);
  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <div
          className="QontoStepIcon-completedIcon"
          style={{ textAlign: "center", cursor: "pointer" }}
        >
          <Check sx={{ width: "75%" }} />
        </div>
      ) : (
        <div
          style={{ cursor: "pointer" }}
          className={
            active
              ? "QontoStepIcon-circle borderactive"
              : "QontoStepIcon-circle"
          }
        />
      )}
    </QontoStepIconRoot>
  );
}
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 0px)",
    right: "calc(50% + 0px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#2A3F73",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#2A3F73",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "red",
  }),
  "& .QontoStepIcon-completedIcon": {
    width: 24,
    height: 24,
    borderRadius: "50%",
    background: "#2A3F73",
    color: "white",
    zIndex: 1,
    fontSize: 14,
  },
  "& .QontoStepIcon-circle": {
    width: 14,
    height: 14,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));
const ProgresBar = (prop) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const steps = [
    "Complete Profile",
    "Open Account",
    "Verify Documents",
    "Deposit Funds",
    "Start Trading",
  ];

  return (
    <div>
      {prop.step < 4 ? (
        <>
          <div className="mb-4 align-items-center margin-bottom-10px-important">
            <div className="w-100 mb-4 display-4 font-weight-bold margin-bottom-zero">
              {t("dashbord_start")}
            </div>
          </div>
          <Grid container spacing={6}>
            <Grid
              item
              xl={12}
              className="journey-stepper"
              sx={{ width: "100%" }}
            >
              <Paper
                elevation={1}
                sx={{ borderRadius: "10px" }}
                className="mb-4"
              >
                <Stepper
                  alternativeLabel
                  activeStep={prop.step}
                  connector={<QontoConnector />}
                  sx={{ padding: "24px" }}
                >
                  {steps.map((label, index) => (
                    <Step key={label}>
                      <StepLabel
                        StepIconComponent={QontoStepIcon}
                        onClick={() => {
                          console.log("step", index);
                          if (index == 0) {
                            navigate("/userProfile");
                          } else if (index == 1) {
                            navigate("/account_list");
                          } else if (index == 2) {
                            navigate("/myDocuments");
                          } else if (index == 3) {
                            navigate("/deposit");
                          }
                        }}
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Paper>
            </Grid>
          </Grid>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProgresBar;
