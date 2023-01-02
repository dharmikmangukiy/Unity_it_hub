import React from "react";
import { ColorButton } from "../../customComponet/CustomElement";
import { useNavigate } from "react-router-dom";
const MasterArea = () => {
  const navigate=useNavigate();
  return (
    <div>
      <div className="content-container__inner-bg">
        <div className="pg-wrap">
          <div className="ct-verify-account">
            <div className="ct-verify-account__header">Before we start</div>
            <div className="ct-verify-account__sections">
              <div className="ct-verify-account__section">
                <div className="ct-verify-account__section-name">
                  Get verified
                </div>
                <div className="ct-verify-account__section-text">
                  We need to check a photo of your ID to let you become a Master
                  Trader. If everything is all right, you'll be all set in one
                  business day.
                </div>
                <ColorButton onClick={()=>navigate("/myDocuments")}>Verify</ColorButton>
              </div>
              <div className="ct-verify-account__section">
                <div className="ct-verify-account__section-name">
                Prepare an MT5 account
                </div>
                <div className="ct-verify-account__section-text">
                You can only set an MT5 trading account as your Master Account. We provide it instantly for free..
                </div>
                <ColorButton onClick={()=>navigate("/open_real_account")}>Open MT5 account</ColorButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterArea;
