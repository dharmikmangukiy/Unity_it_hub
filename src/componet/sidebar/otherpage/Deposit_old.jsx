import React, { useState, useEffect, useRef } from "react";
import { Grid } from "@mui/material";
import TopButton from "../../customComponet/TopButton";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { ColorButton } from "../../customComponet/CustomElement";
import "./otherpage.css";

import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import Toast from "../../commonComponet/Toast";
export const Deposite = () => {
  const myRef = useRef(null);
  const [aClass, setAclass] = useState({
    Wire_Transfer: "",
    Cash: "",
    Net_Banking: "",
    Skrill: "",
    Nettler: "",
    Bitcoin: "",
    Litecoin: "",
    USDT: "",
    Ethereum: "",
  });
  const [selectBank, setSelectBank] = React.useState("");
  const handleChangeBank = (event) => {
    setSelectBank(event.target.value);
  };
  const [openModal, SetOpenModal] = useState(false);
  const [modalData, setModalData] = useState("Net Banking");
  const [card, setCard] = useState("Credit Card Hosted");
  const [ageErrors, setAgeErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [data, setData] = useState({
    deposit_method: "",
    amount: "",
    // deposit_proof:"",
    // user_location:""
  });

  const notify = (p) => {
    Toast("error", p);
  };

  useEffect(() => {
    if (Object.keys(ageErrors).length === 0 && isSubmit) {
      notify("Fill info successfully");
    }
  }, [ageErrors, isSubmit]);

  const modalopen = (event) => {
    // console.log(modalData);
    // console.log("name",event.target.Name)
    setModalData(event.target.title);
    // SetOpenModal(true);
    // myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  };

  const paymetOption = () => {
    if (
      modalData == "Net Banking" ||
      modalData == "Cash" ||
      modalData == "Skrill" ||
      modalData == "Nettler" ||
      modalData == "Litecoin" ||
      modalData == "Bitcoin" ||
      modalData == "Ethereum" ||
      modalData == "USDT"
    ) {
      console.log(modalData);
      return (
        <div className="card-body position-relative">
          <div style={{ marginBottom: "20px" }}>
            <h5 className="font-weight-bold mb-0 text-dark ">
              Specify the deposit amount
            </h5>
          </div>
          <div className="bordernet">
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                className="radiogroup"
              >
                <FormControlLabel
                  value="80"
                  control={<Radio />}
                  label="$80.00"
                />
                <FormControlLabel
                  value="40"
                  control={<Radio />}
                  label="$40.00"
                />
                <FormControlLabel
                  value="20"
                  control={<Radio />}
                  label="$20.00"
                />
                <FormControlLabel
                  value="a"
                  control={<Radio />}
                  label={<input className="netbakunginputfild" />}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="cyptobutton">
            <ColorButton> Submit</ColorButton>
          </div>
        </div>
      );
    } else {
      var number = [1, 2, 3, 4];
      console.log(modalData);
      return (
        <div className="card-body position-relative p-5">
          <Grid container spacing={5}>
            {number.map(() => {
              return (
                <>
                  <Grid item md={12}>
                    <div>
                      <h5 className="text-dark font-weight-bold text-center mb-3">
                        HDFC BANK
                      </h5>
                      <div className="table-responsive">
                        <table className="table table-one border text-dark mb-5">
                          <tbody>
                            <tr>
                              <th>Bank Name</th>
                              <td>SBM Bank (Mauritius) Limited</td>
                            </tr>
                            <tr>
                              <th>Bank Account Name</th>
                              <td>Right fx</td>
                            </tr>
                            <tr>
                              <th>Bank Address</th>
                              <td>
                                SBM Bank (Mauritius) Limited 6 th Floor SBM
                                Tower Port Louis
                              </td>
                            </tr>
                            <tr>
                              <th>Beneficiary (Company) Address</th>
                              <td>
                                The Cyberati Lounge, Ground Floor, The Catalyst,
                                Silicon Avenue, 40 Cybercity 72201 Ebène,
                                Republic of Mauritius
                              </td>
                            </tr>
                            <tr>
                              <th>IBAN Number</th>
                              <td>MU62STCB1170000000364807000USD</td>
                            </tr>
                            <tr>
                              <th>Bank Account Number</th>
                              <td>50100000364807</td>
                            </tr>
                            <tr>
                              <th>Swift Code</th>
                              <td>STCBMUMU</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </div>
      );
    }
    // else {
    //   return (
    //     <div className="card-body position-relative">
    //       <div style={{ marginBottom: "10px" }}>
    //         <h5 className="font-weight-bold mb-0 text-dark ">
    //           Proceed to depositing via {modalData}?
    //         </h5>
    //       </div>
    //       <div style={{ marginBottom: "10px" }}>
    //         <b>Important to know</b>
    //       </div>
    //       <div className="flex">
    //         <img src="./dimage/waring.png" style={{ height: "fit-content" }} />
    //         <div style={{ marginLeft: "15px" }}>
    //           <b>
    //             The minimum deposit amount is{" "}
    //             {modalData == "Litecoin"
    //               ? "0.3 Ł"
    //               : modalData == "Bitcoin"
    //               ? "0.004 BTC"
    //               : modalData == "Ethereum"
    //               ? "0.02 ETH"
    //               : "50 USDT"}
    //             .
    //           </b>{" "}
    //           All deposits below the limit will be lost.
    //         </div>
    //       </div>
    //       <div className="flex">
    //         <img src="./dimage/waring.png" style={{ height: "fit-content" }} />
    //         <div style={{ marginLeft: "15px" }}>
    //           Carefully check the address.
    //           <b>The transaction will be lost if the address is incorrect</b>
    //         </div>
    //       </div>
    //       <div className="cyptobutton">
    //         <a href="https://www.google.com/">
    //           <ColorButton>Submit</ColorButton>
    //         </a>
    //       </div>
    //     </div>
    //   );
    // }
  };
  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item sm={11}></Grid>
              <Grid item xl={1}></Grid>
              <Grid item xl={10} md={12} lg={12}>
                <TopButton />

                <div className="webView">
                  <Grid container>
                    <Grid item md={12} className="d-flex">
                      <Paper
                        elevation={1}
                        style={{ borderRadius: "10px" }}
                        className="w-100 mb-3"
                      >
                        <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                          <Grid container spacing={3}>
                            <Grid item md={6} xs={6}>
                              <h5 className="font-weight-bold mb-0 text-dark ">
                                Make a Deposit
                              </h5>
                            </Grid>
                            <Grid item md={6} xs={6}>
                              <h5 className="font-weight-bold mb-0 text-dark "></h5>
                            </Grid>
                          </Grid>
                        </div>
                        <div className="divider"></div>
                        <div>
                          <ul className="pd-0 gridDeposit">
                            <li
                              className={`lideposit mar-10 ${
                                modalData == "Net Banking" ? "active" : ""
                              }`}
                            >
                              <Button title="Net Banking" onClick={modalopen}>
                                <img
                                  src="./dimage/Net_Banking.png"
                                  alt="Net Banking"
                                  title="Net Banking"
                                  className="w-100"
                                  style={{ objectFit: "contain" }}
                                ></img>
                              </Button>
                            </li>
                            <li
                              className={`lideposit mar-10 ${
                                modalData == "Wire Transfer" ? "active" : ""
                              }`}
                            >
                              <Button
                                title="Wire Transfer"
                                className="w-100"
                                onClick={modalopen}
                              >
                                <img
                                  src="./dimage/wire_tranfer.png"
                                  alt="Wire Transfer"
                                  title="Wire Transfer"
                                  className="w-100 h-80 m-auto imageDeposite"
                                  style={{ objectFit: "contain" }}
                                ></img>
                              </Button>
                            </li>
                            <li
                              className={`lideposit mar-10 ${
                                modalData == "Cash" ? "active" : ""
                              }`}
                              onClick={modalopen}
                            >
                              <Button
                                className=" w-100 false"
                                title="Cash"
                                onClick={modalopen}
                              >
                                <img
                                  src="./dimage/card.png"
                                  alt="Card"
                                  title="Cash"
                                  className="w-100 h-80 m-auto imageDeposite"
                                  style={{ objectFit: "contain" }}
                                ></img>
                              </Button>
                            </li>
                            <li
                              className={`lideposit mar-10 ${
                                modalData == "Skrill" ? "active" : ""
                              }`}
                            >
                              <Button
                                className="w-100 false"
                                title="Skrill"
                                onClick={modalopen}
                              >
                                <img
                                  src="./dimage/skrill.png"
                                  title="Skrill"
                                  alt="Skrill"
                                  className="w-100 h-80 m-auto imageDeposite"
                                  style={{ objectFit: "contain" }}
                                ></img>
                              </Button>
                            </li>
                            <li
                              className={`lideposit mar-10 ${
                                modalData == "Nettler" ? "active" : ""
                              }`}
                            >
                              <Button
                                className="w-100 false"
                                title="Nettler"
                                onClick={modalopen}
                              >
                                <img
                                  src="./dimage/Neteller.png"
                                  alt="Nettler"
                                  title="Nettler"
                                  className="w-100 h-80 m-auto imageDeposite"
                                  style={{ objectFit: "contain" }}
                                ></img>
                              </Button>
                            </li>
                            <li
                              className={`lideposit mar-10 ${
                                modalData == "Bitcoin" ? "active" : ""
                              }`}
                            >
                              <Button
                                title="Bitcoin"
                                className="w-100"
                                onClick={modalopen}
                              >
                                <img
                                  src="./dimage/bitcoin.png"
                                  alt="Bitcoin"
                                  title="Bitcoin"
                                  className="w-100 h-80 m-auto imageDeposite"
                                  style={{ objectFit: "contain" }}
                                ></img>
                              </Button>
                            </li>
                            <li
                              className={`lideposit mar-10 ${
                                modalData == "Ethereum" ? "active" : ""
                              }`}
                            >
                              <Button
                                className="w-100 false"
                                title="Ethereum"
                                onClick={modalopen}
                              >
                                <img
                                  src="./dimage/ethereum.png"
                                  alt="Ethereum"
                                  title="Ethereum"
                                  className="w-100 h-80 m-auto imageDeposite"
                                  style={{ objectFit: "contain" }}
                                ></img>
                              </Button>
                            </li>
                            <li
                              className={`lideposit mar-10 ${
                                modalData == "USDT" ? "active" : ""
                              }`}
                            >
                              <Button
                                className="w-100 false"
                                title="USDT"
                                onClick={modalopen}
                              >
                                <img
                                  src="./dimage/usdt.png"
                                  alt="USDT"
                                  title="USDT"
                                  className="w-100 h-80 m-auto imageDeposite"
                                  style={{ objectFit: "contain" }}
                                ></img>
                              </Button>
                            </li>
                            <li
                              className={`lideposit mar-10 ${
                                modalData == "Litecoin" ? "active" : ""
                              }`}
                            >
                              <Button
                                className="w-100 false"
                                title="Litecoin"
                                onClick={modalopen}
                              >
                                <img
                                  src="./dimage/litecoin.png"
                                  alt="Litecoin"
                                  title="Litecoin"
                                  className="w-100 h-80 m-auto imageDeposite"
                                  style={{ objectFit: "contain" }}
                                  ref={myRef}
                                ></img>
                              </Button>
                            </li>
                          </ul>
                        </div>
                      </Paper>
                    </Grid>
                  </Grid>
                </div>
                <Paper
                  elevation={1}
                  style={{ borderRadius: "10px" }}
                  className="w-100 mb-5"
                >
                  <div className="card-header d-flex align-items-center abcde justify-content-between card-header-alt p-3">
                    <h5 className="font-weight-bold mb-0 text-dark ">
                      {modalData}
                    </h5>
                  </div>
                  <div className="divider"></div>

                  {paymetOption()}
                </Paper>
                {/* <Dialog
              open={openModal}
              onClose={() => SetOpenModal(false)}
              className="passwordmodel"
            >
              {openModal ? makeModal() : ""}
            </Dialog> */}
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

// net Banking
{
  /* <Paper
elevation={1}
style={{ borderRadius: "10px" }}
className="w-100 mb-5"
>
<div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
  <h5 className="font-weight-bold mb-0 text-dark ">Payment</h5>
</div>
<div className="divider"></div>
<div className="card-body position-relative">
  <div style={{ marginBottom: "20px" }}>
    <h5 className="font-weight-bold mb-0 text-dark ">
      Specify the deposit amount
    </h5>
  </div>
  <div className="bordernet">
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        className="radiogroup"
      >
        <FormControlLabel
          value="80"
          control={<Radio />}
          label="$80.00"
        />
        <FormControlLabel
          value="40"
          control={<Radio />}
          label="$40.00"
        />
        <FormControlLabel
          value="20"
          control={<Radio />}
          label="$20.00"
        />
        <FormControlLabel
          value="a"
          control={<Radio />}
          label={<input className="netbakunginputfild" />}
        />
      </RadioGroup>
    </FormControl>
  </div>
  <div className="cyptobutton">
  <ColorButton > Submit</ColorButton>
  </div>
</div>
</Paper>  */
}

// BatchPredictionTwoTone,eth
{
  /* <Paper
elevation={1}
style={{ borderRadius: "10px" }}
className="w-100 mb-5"
>
<div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
  <h5 className="font-weight-bold mb-0 text-dark ">Payment</h5>
</div>
<div className="divider"></div>
<div className="card-body position-relative">
  <div style={{ marginBottom: "10px" }}>
    <h5 className="font-weight-bold mb-0 text-dark ">
      Proceed to depositing via Litecoin (LTC)?
    </h5>
  </div>
  <div style={{ marginBottom: "10px" }}>
    <b>Important to know</b>
  </div>
  <div className="flex">
    <img src="./deposit/waring.png" />
    <div style={{ marginLeft: "15px" }}>
      <b>The minimum deposit amount is 0.3 Ł.</b> All deposits
      below the limit will be lost.
    </div>
  </div>
  <div className="flex">
    <img src="./deposit/waring.png" />
    <div style={{ marginLeft: "15px" }}>
      Carefully check the address.
      <b>
        The transaction will be lost if the address is incorrect
      </b>
    </div>
  </div>
  <div className="cyptobutton">
    <ColorButton> Submit</ColorButton>
  </div>
</div>
</Paper> */
}

// modelopen and makemodeakl function

// const modalopen = (event) => {
//   console.log(modalData);
//   setModalData(event.target.title);
//   SetOpenModal(true);
// };
// const makeModal = () => {
//   if (modalData == "Wire Transfer") {
//     return (
//       <>
//         <Button
//           sx={{ position: "absolute", right: "0px", color: "#ff0000" }}
//           onClick={() => SetOpenModal(false)}
//         >
//           <CloseIcon />
//         </Button>
//         <div className="p-4 text-center">
//           <h4 className="font-size-lg font-weight-bold my-2">Wire Tranfer</h4>
//         </div>
//         <div className="create-account-content padding15">
//           <form className="wiretranferform">
//             <FormControl className="pt-3 " variant="outlined">
//               {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
//               {/* <label
//                                       htmlFor="accountNo"
//                                       className="text-info font-weight-bold form-label-head w-100  mt-4 required"
//                                     >
//                                       ACCOUNT NO
//                                     </label> */}
//               <Select
//                 name="account"
//                 value={selectBank}
//                 onChange={handleChangeBank}
//                 displayEmpty={{
//                   "aria-label": "Without label",
//                 }}
//                 input={<BootstrapInput />}
//               >
//                 <MenuItem value="">Select Bank Name</MenuItem>
//                 <MenuItem value="HDFC">HDFC BANK</MenuItem>
//                 <MenuItem value="ICIC">ICIC BANK</MenuItem>
//                 <MenuItem value="UNION">UNION BANK</MenuItem>
//                 <MenuItem value="310043-DEMO(MT5)-Executive">
//                   AXIS BANK
//                 </MenuItem>
//               </Select>
//             </FormControl>
//             <CssTextField
//               id="standard-search"
//               label="IFSC Code"
//               sx={{ width: "100%" }}
//               variant="standard"
//               name="Ifsc_Code"
//             />
//             <CssTextField
//               id="standard-search"
//               label="Name"
//               sx={{ width: "100%" }}
//               variant="standard"
//               name="Name"
//             />
//             <CssTextField
//               id="standard-search"
//               label="Account  Number"
//               sx={{ width: "100%" }}
//               variant="standard"
//               name="Account_Number"
//             />
//             <div className="wirebutton">
//               <ColorButton type="submit">Submit</ColorButton>
//             </div>
//           </form>
//         </div>
//       </>
//     );
//   } else if (
//     modalData == "Card" ||
//     modalData == "Net Banking" ||
//     modalData == "Skrill" ||
//     modalData == "Nettler"
//   ) {
//     return (
//       <>
//         <Button
//           sx={{ position: "absolute", right: "0px", color: "#ff0000" }}
//           onClick={() => SetOpenModal(false)}
//         >
//           <CloseIcon />
//         </Button>
//         <div className="p-4 text-center">
//           <h4 className="font-size-lg font-weight-bold my-2">{modalData}</h4>
//         </div>
//         <div className="create-account-content padding15">
//           <CssTextField
//             id="standard-search"
//             label="Amount"
//             sx={{ width: "100%" }}
//             variant="standard"
//             name="Amount"
//           />
//           <div className="cyptobutton">
//             <ColorButton type="submit">Submit</ColorButton>
//           </div>
//         </div>
//         <div></div>
//       </>
//     );
//   } else {
//     return (
//       <>
//         <Button
//           sx={{ position: "absolute", right: "0px", color: "#ff0000" }}
//           onClick={() => SetOpenModal(false)}
//         >
//           <CloseIcon />
//         </Button>
//         <div className="p-4 text-center">
//           <h4 className="font-size-lg font-weight-bold my-2">{modalData}</h4>
//         </div>
//         <div className="create-account-content padding15">
//           <div className="jcenter">
//             <img src="./deposit/qrCode.png" style={{ width: "60%" }} alt="" />
//           </div>
//           <div>
//             <CssTextField
//               id="standard-search"
//               label="Amount"
//               sx={{ width: "100%" }}
//               variant="standard"
//               name="Amount"
//             />
//             <div className="cyptobutton">
//               <ColorButton type="submit">Submit</ColorButton>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// };
