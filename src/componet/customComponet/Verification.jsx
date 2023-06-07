import React from "react";
import { useNavigate } from "react-router-dom";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CheckIcon from "@mui/icons-material/Check";
import { ColorButton } from "./CustomElement";
import { Paper } from "@mui/material";

const Verification = (prop) => {
  const navigate = useNavigate();
  const verifySubmit = () => {
    if (prop.ibstatus.email_status == 0 || prop.ibstatus.mobile_status == 0) {
      navigate("/userProfile");
    } else if (prop.ibstatus.kyc_status == 0 || prop.ibstatus.kyc_status == 2) {
      navigate("/myDocuments");
    } else {
    }
  };
  return (
    <div>
      <Paper
        elevation={1}
        style={{ borderRadius: "10px", padding: "15px", marginBottom: "15px" }}
        className="w-100 h-100"
      >
        <div className="verification-main">
          <div>
            <div className="verication-icon-Section">
              <div
                className="vericatiaron-icon-sub"
                style={
                  prop.ibstatus.email_status == 1
                    ? { backgroundColor: "#5d2027" }
                    : {}
                }
              >
                {prop.ibstatus.email_status == 1 ? (
                  <CheckIcon sx={{ color: "white" }} />
                ) : (
                  ""
                )}
              </div>
              <RocketLaunchIcon
                className="verificationBarIcon"
                style={
                  prop.ibstatus.email_status == 0 ? { color: "#cfcfcf" } : {}
                }
              />
            </div>
            <div className="verify-textCenter">Email Verification</div>
          </div>
          <div>
            <div className="verication-icon-Section">
              <div
                className="vericatiaron-icon-sub"
                style={
                  prop.ibstatus.mobile_status == 1
                    ? { backgroundColor: "#5d2027" }
                    : {}
                }
              >
                {prop.ibstatus.mobile_status == 1 ? (
                  <CheckIcon sx={{ color: "white" }} />
                ) : (
                  ""
                )}
              </div>

              <MobileFriendlyIcon
                className="verificationBarIcon"
                style={
                  prop.ibstatus.mobile_status == 0 ? { color: "#cfcfcf" } : {}
                }
              />
            </div>
            <div className="verify-textCenter">Phone Verification</div>
          </div>
          <div>
            <div className="verication-icon-Section">
              <div
                className="vericatiaron-icon-sub"
                style={
                  prop.ibstatus.kyc_status == 1
                    ? { backgroundColor: "#5d2027" }
                    : {}
                }
              >
                {prop.ibstatus.kyc_status == 1 ? (
                  <CheckIcon sx={{ color: "white" }} />
                ) : (
                  ""
                )}
              </div>

              <DocumentScannerIcon
                className="verificationBarIcon"
                style={
                  prop.ibstatus.kyc_status == 0 || prop.ibstatus.kyc_status == 2
                    ? { color: "#cfcfcf" }
                    : {}
                }
              />
            </div>
            <div className="verify-textCenter">Document Verification</div>
          </div>
          <div>
            <div className="verication-icon-Section">
              <div className="vericatiaron-icon-sub"></div>

              <HelpOutlineIcon
                className="verificationBarIcon"
                style={
                  prop.ibstatus.ib_applied_status == 0 ||
                  prop.ibstatus.ib_applied_status == 2
                    ? { color: "#cfcfcf" }
                    : {}
                }
              />
            </div>
            <div className="verify-textCenter">IB Request</div>
          </div>
        </div>
        <div className="verification-button">
          <div>
            <ColorButton onClick={verifySubmit}>
              {prop.ibstatus.email_status == 0
                ? "Verify Email"
                : prop.ibstatus.mobile_status == 0
                ? "Verify Phone"
                : prop.ibstatus.kyc_status == 0
                ? "Verify Document"
                : prop.ibstatus.kyc_status == 2
                ? "Rejected Document"
                : prop.ibstatus.ib_applied_status == 0
                ? "IB Request"
                : ""}
            </ColorButton>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Verification;
