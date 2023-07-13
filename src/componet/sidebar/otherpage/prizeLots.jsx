import React from "react";
import "./tradeAndWin.css";

const PrizeLots = () => {
  return (
    <div className="app-content--inner">
      <div className="app-content--inner__wrapper mh-100-vh">
        <div className="trade-main-body">
          <h1 className="prize-heading">WHAT ARE PRIZE LOTS?</h1>
          <div className="prize-cards-block">
            <div className="prize-card">
              <div className="prize-icon">
                <img src="./image/tw1.png" alt="" />
              </div>
              <p className="prize-description">
                Prize lots are bonus points that you get after trading on your
                real accounts.
              </p>
            </div>
            <div className="prize-card">
              <div className="prize-icon">
                <img src="./image/tw2.png" alt="" />
              </div>
              <p className="prize-description">
                Prizes won using lots are non-transferable and will not be
                monetized under no circumstances
              </p>
            </div>
            <div className="prize-card">
              <div className="prize-icon">
                <img src="./image/tw3.png" alt="" />
              </div>
              <p className="prize-description">
                Only Standard account types are eligible to win prizes using
                lots.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PrizeLots;
