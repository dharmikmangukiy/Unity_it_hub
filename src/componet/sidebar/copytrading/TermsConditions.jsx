import React from "react";

const TermsConditions = () => {
  return (
    <div className="tc-container_innertext">
      <article className="tc_page-block">
        <div className="tc_article_block">
          <h2 className="tc_terms_h2">
            <strong> RightFX  Copytrading Terms and Conditions </strong>
          </h2>
          <p>
            <span>
              RightFX  Copytrading (hereinafter—‘Service’) is a service that
              allows traders (hereinafter—‘Copiers’) to copy trades from other
              traders (hereinafter—‘Masters’), and can be activated by selecting
              ‘Start Copying’.
            </span>
          </p>
          <p>
            <strong>
              1. The Copier undertakes to do the following to apply for the
              Service:
            </strong>
            <br />
            <br />
            1.1. be registered and logged in as a client on the RightFX  website
            <br />
            <br />
            1.2. add money to the Wallet
            <br />
            <br />
            1.3. initiate copying.
            <br />
            <br />
            <strong>2. The Copier is entitled to do the following:</strong>
          </p>
          <p>
            <span>2.1</span>
            <span>copy any number of Masters </span>
            <span>(the Copier Area lists all current subscriptions)</span>
            <span>
              <br />
            </span>
            <span>
              2.2. close any copied trade manually at any time in the Copier
              Area
            </span>
            <br />
            <span>
              2.3. unsubscribe from the Master and stop copying the Master’s
              trades by clicking ‘Stop Copying’. To unsubscribe, the Copier
              needs to have all the trades closed. Upon unsubscription, all
              funds invested with the Master and the profit return to the
              Copier’s Wallet
            </span>
            <span>
              <br />
            </span>
            <span>
              2.4. set the size of copy proportion for every particular Master.
              This option is explained in detail in sub-clause 4.4. of these
              Terms and Conditions
            </span>
          </p>
          <p>
            <span>
              2.5. add support funds to protect the investment from unexpected
              market movements. These funds are used to support Copier's trading
              strategy when the market fluctuates and do not influence the
              profit directly.
            </span>
          </p>
          <div>
            <p>
              <strong>
                3. The Service is available on the Metatrader 4 platform.
              </strong>
            </p>
            <p>
              <strong>4. Opening copied trades routine:</strong>
            </p>
            <br />
            <p>
              4.1. The Copier only copies the trades that were opened by the
              Master after the subscription for the Master within the Service.
              <br />
              <br />
              4.2. Stop loss/take profit orders will not be visible in the
              Copier Area, but if these orders are triggered on the Master’s
              account, the copied trades are also closed.
              <br />
            </p>
            <p>
              <span>4.3. </span>
              <span>
                Upon the subscription to a Master, the Copier specifies the
                amount of funds to be deducted from the Wallet and invested with
                the selected Master. These funds and your profit will return to
                your Wallet when you stop copying the Master.
              </span>
            </p>
            <br />
            <p>
              <span>
                4.4. The Copier can choose to copy the Master's orders in an
                equal (×1), double (×2), triple (×3), or any other proportion.
                Copying mode, as well as the investment required for start, is
                selected at the time of subscription to the Master.
              </span>
              <br />
              <span>
                4.4.1. The RightFX  Copytrading App mobile application of the
                older version (installed before 29 December 2021 and not
                updated) allows users to choose a proportional type of copying.
              </span>
              <span>
                <br />
              </span>
              <span>
                4.4.2. In the proportional type, the volume is calculated based
                on the ratio of leverage and equity of both the Master and the
                Copier. The following formula is used:
              </span>
              <span>
                <br />
              </span>
              <span>
                Volume (copied trade) = Equity (Copier) / Equity (Master) ×
                Leverage (Copier) / Leverage (Master) × Volume (Master).
              </span>

              <span>
                <br />
              </span>
              <span>
                4.4.3. Example: The Master account equity is 2000 USD and
                leverage is 1:200. The Copier account equity is 200 USD and
                leverage is 1:500. 1 lot trade is opened on the Master account.
                The volume of the copied trade, therefore, is 200 / 2000 × 500 /
                200 × 1 = 0.25 lots.
              </span>
            </p>
            <p>
              <span>4.5</span>
              <span>
                The Copiers’ leverage ratio is set at 1:500. The Copiers willing
                to adjust it need to contact the OctaFX’s Customer Support.
              </span>
            </p>
            <p>
              <span>4.6</span>
              <span>
                Once the service is activated, the trades will be copied to the
                Copier’s account regardless of whether the owner of the account
                is signed in or not.
              </span>
            </p>
            <p>
              <span>
                The Copier's order is executed following the order (Buy or Sell)
                made in the Master's account. When the Master places an order,
                the signal for opening an order triggers in the Copier's
                account. The Copier's order is executed at the market's price.
              </span>
              <span>
                The same mechanism triggers the order closing. Therefore, the
                execution prices of these orders may differ. Additionally, the
                number of the Copiers following this Master can affect the
                execution time.
              </span>
            </p>
            <p>
              <strong>5. Limits applied:</strong>
            </p>
            <p>
              <span>
                5.1. The minimum volume of the copied trade is 0.01 lot, the
                maximum volume of a copied trade is 100 lots.
              </span>
            </p>
            <p>
              <span>
                5.2. The minimum copied order volume is 0.01 lots. However,
                copied orders with a volume below 0.005 lots will be refused,
                while copied trades from 0.005 lots and above will be rounded to
                0.01 lots.
              </span>
            </p>
            <p>
              <span>
                5.3 The volume of any order is rounded to the nearest hundredth
                decimal point (the second digit after the decimal). For
                instance, if the Copier copies an order for 0.324 lots, the
                order will be rounded down to 0.32 lots. Vice versa, if the
                Copier copies an order for 0.325 lots, the order will be rounded
                up to 0.33 lots.
              </span>
            </p>
            <p>
              <span>
                5.4. If the copied trade volume is bigger than 100 lots after
                the calculation is made, then the trade will not be opened on
                the Copier account.
              </span>
            </p>
            <p>
              <strong>
                6. If the Master changes equity (by making a deposit or
                withdrawal) or leverage, all the copied trades maintain their
                initial volume on the Copier’s account.
                <br />
                <br />
              </strong>
              <strong>
                7. All trading conditions (leverage, swaps, spreads) of the
                Copiers’ are similar to the ones for the RightFX  MT4 accounts.
                <br />
                <br />
              </strong>
              <strong>
                8. The Master Account should be of RightFX  MT4 type.
              </strong>
              <strong>
                9. The Service is entitled to do the following:
                <br />
                <br />
              </strong>
              9.1. restrict the number of Master Accounts the Masters may create
              at any time without prior notification at its sole discretion
            </p>
            <p>
              <span>
                9.2. unsubscribe the Copier from the Master without prior
                notification.
              </span>
            </p>
            <p>
              <span>
                9.3
                <span>
                  <span>
                    reduce the commission set by the Master Trader and limit its
                    maximum value for all her or his Master Accounts without
                    prior notification or providing any explanation.
                    <br />
                    <br />
                    9.4. amend these Terms and Conditions at any time without
                    prior notice to the Copier or Master Trader. Such amendments
                    take effect the moment they are published on the Service
                    site in these Terms and Conditions.
                  </span>
                </span>
              </span>
              9.5. monitor the Master Trader's activity on the platform, mark
              the Master Trader's account with the ‘Suspicious activity’ warning
              if the Master Trader manipulates their statistics, and exclude
              such account from the Master Rating filtered by default (will keep
              it available for the Copiers who change their filter settings
              accordingly).
            </p>
            <p>
              <span>
                9.6 amend or delete the Master's nickname and (or) user picture
                without prior notice if the Service reasonably suspects that
                such Master deliberately copies or imitates others Master’s
                nickname and (or) picture which may lead to dishonest
                representation of the Master.
              </span>
            </p>
            <p>
              <strong>
                10. The Master determines the commission amount for copying
                orders. The commission can range from 0% to 50% of the Copier’s
                gain. Commission charges accumulated within one week are paid
                out to the Master’s Wallet on Sundays.
              </strong>
            </p>
            <p>
              <strong>
                11. The commission amount that the Copier pays to the Master is
                set at the moment when the Copier presses ‘Start Copying’. If
                the Master changes the commission amount, it does not affect the
                amount due under this subscription to the Master.
              </strong>
            </p>
            <p>
              <strong>
                12. Commission amounts for the IB. The Master can also be an IB
                for the Copier. In this case, they will receive both the IB
                commission and the commission for copying.
              </strong>
            </p>
            <p>
              <strong>13. The copy trading Bonus</strong>
            </p>
            <p>
              <span>13.1</span>
              <span>
                . The Bonus amounts 50% of the funds invested at the beginning
                of copying the Master.
              </span>
            </p>
            <p>
              <span>13.2.</span>
              <span>
                The Bonus can only be applied once for a particular Master
                within the dates of the promotion.
              </span>
            </p>
            <p>
              <span>13.3.</span>
              <span>
                The Bonus cannot be applied to the ongoing investments.
              </span>
            </p>
            <p>
              <span>13.4.</span>
              <span>
                The Bonus cannot be withdrawn or considered as an integral part
                of the Copier’s investment.
              </span>
            </p>
            <p>
              <span>13.5.</span>
              <span>
                If the equity of the Copier’s account becomes less than the
                bonus size, the Bonus is cancelled.
              </span>
            </p>
            <p>
              <span>13.6.</span>
              <span>
                The Copier can cancel the Bonus manually in the Copier Area.
              </span>
            </p>
            <p>
              <span>13.7.</span>
              <span>
                The Bonus is cancelled when the Copier stops copying the Master.
              </span>
            </p>
            <p>
              <span>13.8.</span>
              <span>
                After cancellation, the Bonus cannot be applied again or
                reactivated.
              </span>
            </p>
            <p>
              <span>13.9.</span>
              <span>
                The Service may reject the Copier's bonus application(s) at any
                time without prior notification or providing reasons for such
                decision.
              </span>
            </p>
            <p>
              <span>13.10.</span>
              <span>
                The Service may cancel the Copier's bonus at any time without
                prior notification.
              </span>
            </p>
            <p>
              <span>13.11.</span>
              <span>
                If the amount of the Copier's personal funds invested with the
                Master Trader upon withdrawal/internal transfer becomes less
                than or equal to the Bonus amount, the Bonus will be cancelled.
              </span>
            </p>
            <p>
              <span>13.12.</span>
              <span>
                Any situation not described in these rules shall be subject to
                the Service's decision.
              </span>
            </p>
            <p>
              <span>13.13.</span>
              <span>
                The Service reserves the right to change, update, or cancel this
                promotion with notification in the Service news.
              </span>
            </p>
            <p>
              <strong>14. Free Trial</strong>
            </p>
            <p>
              <span>14.1.</span>
              <span>
                The Master Trader can activate and disable the Free Trial at any
                moment.
              </span>
            </p>
            <p>
              <span>14.2.</span>
              <span>
                The Free Trial automatically activates when the Copier initiates
                copying the Master Account if:
                <br />
              </span>
              <span>
                <br />
              </span>
              <span>14.2.1.</span>
              <span>
                the Master Trader has the Free Trial available for this Master
                Account
                <br />
              </span>
              <span>
                <br />
              </span>
              <span>14.2.2</span>
              <span>
                the Copier has not previously activated the Free Trial for this
                Master Account.
                <br />
              </span>
            </p>
            <p>
              <span>14.3.</span>
              <span>
                If the Master Trader voids the Free Trial, it continues to work
                for the Copiers who have already activated it.
              </span>
            </p>
            <p>
              <span>14.4.</span>
              <span>
                If the Copier stops copying the Master Account while the Free
                Trial is active, the Copier cannot reactivate the Free Trial for
                this Master Account.
              </span>
            </p>
            <p>
              <span>14.5.</span>
              <span>
                After the Free Trial expires, the Copier's subscription becomes
                subject to the prior conditions, including the commission
                amount.
              </span>
            </p>
            <p>
              <strong>
                15. The Copier’s trading statistics can only be viewed by the
                Copier.
              </strong>
            </p>
            <p>
              <strong>
                16. The Master’s trading statistics are available for the
                public.
              </strong>
            </p>
            <p>
              <strong>
                17. The Copiers do not have access to the trading terminal. All
                actions with their subscriptions and trades are made under the
                Copier Area.
              </strong>
            </p>
            <p>
              <strong>
                18. If the Service reasonably suspects that the Copier violated
                the Deposit and Withdrawal rules set out under the Customer
                Agreement or the legislation of the country of the Copier's
                residence, the Service is entitled to suspend providing the
                services to such Copier.
              </strong>
            </p>
            <p>
              <strong>
                19. Please mind that the Master can make both profitable and
                losing trades.
              </strong>
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default TermsConditions;
