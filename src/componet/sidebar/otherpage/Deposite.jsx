import React, { useState, useEffect, useRef } from "react";
import { FormLabel, Grid, Input, MenuItem, Select } from "@mui/material";
import TopButton from "../../customComponet/TopButton";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { NavLink, useParams } from "react-router-dom";

import useCountdown from "../../customComponet/useCountdown";
import {
  BootstrapInput,
  ColorButton,
} from "../../customComponet/CustomElement";
import "./otherpage.css";
import "./deposit.css";

import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import axios from "axios";
import { IsApprove, Url } from "../../../global";
import { useNavigate, useLocation } from "react-router-dom";
import Toast from "../../commonComponet/Toast";

export const Deposite = () => {
  const navigate = useNavigate();
  const myRef = useRef(null);
  const { id } = useParams();

  const [openModal, SetOpenModal] = useState(false);
  const [modalData, setModalData] = useState("Net Banking");
  const [card, setCard] = useState("Credit Card Hosted");
  const [ageErrors, setAgeErrors] = useState({});
  const [timer, setTimer] = useState("00:00:00");
  const [isLoader, setIsLoader] = useState(false);
  const [showData, setShowData] = useState("");
  const [preview, setPreview] = useState();
  const [lastRadio, setLastRadio] = useState("");

  // const [isSubmit, setIsSubmit] = useState(false);
  const [amount, setAmount] = useState("");
  const [dMethod, setDMethod] = useState("netbanking");
  const [data, setData] = useState();
  const [city, setCity] = useState();
  const [selectR, SetSelectR] = useState(false);
  const [cryptoData, setCryptoData] = useState({});
  const [seconds, setSeconds] = React.useState(0);
  const [depositType, setDepositType] = useState("");
  const [mt5AccountList, setMT5AccountList] = useState([]);
  const [selectedMT5AccountList, setSelectedMT5AccountList] = useState("");
  const [bankList, setBankList] = useState([]);
  var [otherAmount, setOtherAmount] = useState("");
  console.log(dMethod);
  const notify = (p) => {
    Toast("error", p);
  };
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setData(undefined);
      return;
    }
    setData(e.target.files[0]);
  };
  function handleScroll() {
    window.scroll({
      top: "-100px",
      left: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    if (!data) {
      setData(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(data);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [data]);

  React.useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds("BOOOOM!");
    }
  });

  const secondsToHms = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
  };
  console.log("amount", data);

  const showCrypto = () => {
    return (
      <>
        <div>
          <div className="res-section">
            <Grid container>
              <Grid item md={6}>
                <div className="res-qrcode">
                  <img
                    src={cryptoData.qrcode_url}
                    alt=""
                    style={{
                      boxShadow: " 0px 0px 8px 0px black",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              </Grid>
              <Grid item md={6} className="cryptoaddresscss">
                <div className="res-details w-100">
                  <label
                    className="crypto-address"
                    htmlFor=""
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${cryptoData.crypto_address}`
                      );
                      Toast(
                        "success",
                        "Crypto Address has been successfully copy"
                      );
                    }}
                  >
                    <span className="text-info font-weight-bold form-label-head">
                      {cryptoData.deposit_method} Address :{" "}
                    </span>
                    <b>
                      {cryptoData.crypto_address}{" "}
                      <i class="fa fa-clone" aria-hidden="true"></i>
                    </b>
                  </label>
                  <label htmlFor="">
                    <span className="text-info font-weight-bold form-label-head">
                      {cryptoData.deposit_method} AMOUNT :{" "}
                    </span>
                    <b>
                      {cryptoData.total_crypto_amount}{" "}
                      {cryptoData.deposit_method}
                    </b>{" "}
                  </label>
                  <label htmlFor="">
                    <span className="text-info font-weight-bold form-label-head">
                      {cryptoData.deposit_currency} AMOUNT:{" "}
                    </span>
                    <b>
                      {cryptoData.deposit_amount} {cryptoData.deposit_currency}
                    </b>
                  </label>
                  <br />
                  <b className="crypto-timer">
                    {seconds == 0
                      ? "Payment address has been expired, Please try again"
                      : secondsToHms(seconds)}
                  </b>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </>
    );
  };
  const onsubmit = async () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    if (depositType == "") {
      Toast("error", "Please select deposit type");
    } else if (depositType == "MT5" && selectedMT5AccountList == "") {
      Toast("error", "Please select mt5 account");
    } else if (!dMethod) {
      Toast("error", "Make a Deposit is required");
    } else if (!amount) {
      Toast("error", "amount required");
    } else if (
      (modalData == "Skrill" ||
        modalData == "Nettler" ||
        modalData == "Wire Transfer") &&
      !data
    ) {
      Toast("error", "image is required");
    } else if (modalData == "Cash" && !city) {
      Toast("error", " City Name is required");
    } else {
      param.append("deposit_method", dMethod);
      param.append("amount", amount);
      param.append("deposit_to", depositType);
      if (depositType == "MT5") {
        param.append("mt5_acc_no", selectedMT5AccountList);
      }
      if (dMethod == "cash") {
        param.append("user_location", data);
      } else if (
        modalData == "Skrill" ||
        modalData == "Nettler" ||
        modalData == "Wire Transfer"
      ) {
        param.append("deposit_proof", data);
      }
      setIsLoader(true);
      await axios
        .post(Url + "/ajaxfiles/add_deposit.php", param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            navigate("/");
          }
          if (res.data.status == "error") {
            Toast("error", res.data.message);
            setIsLoader(false);
          } else {
            setIsLoader(false);
            if (res.data.data) {
              setSeconds(res.data.data.timeout);
              setCryptoData(res.data.data);
              setShowData("none");
            }

            console.log(cryptoData);
            Toast("success", res.data.message);

            setData("");
            if (
              dMethod == "BTC" ||
              dMethod == "LTC" ||
              dMethod == "ETH" ||
              dMethod == "USDT"
            ) {
            } else {
              navigate("/deposit_history");
            }
          }
        });
    }
  };
  const adminBankAccounts = async () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("action", "get_admin_banks");
    await axios.post(Url + "/ajaxfiles/common_api.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        navigate("/");
      }
      if (res.data.status == "error") {
        Toast("error", res.data.message);
      } else {
        // setDepositType(type);
        console.log(res.data);
        setBankList(res.data.bank_list);
      }
    });
  };
  useEffect(() => {
    getMt5AccountList();
    adminBankAccounts();
    if (id) {
      console.group(id, "asdASSSSSSSS");
      setSelectedMT5AccountList(id);
      setDepositType("MT5");
    }
  }, []);

  const modalopen = (event) => {
    setModalData(event.target.title);
    SetOpenModal(true);
    setData("");
    // setDepositType("");
    // setSelectedMT5AccountList("");
    if (event.target.title == "Net Banking") {
      setDMethod("netbanking");
    } else if (event.target.title == "Wire Transfer") {
      setDMethod("wire_transfer");
    } else if (event.target.title == "Cash") {
      setDMethod("cash");
    } else if (event.target.title == "Skrill") {
      setDMethod("skrill");
    } else if (event.target.title == "Nettler") {
      setDMethod("netller");
    } else if (event.target.title == "Litecoin") {
      setDMethod("LTC");
    } else if (event.target.title == "Bitcoin") {
      setDMethod("BTC");
    } else if (event.target.title == "Ethereum") {
      setDMethod("ETH");
    } else if (event.target.title == "USDT") {
      setDMethod("USDT");
    }
  };

  const getMt5AccountList = async (type) => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("action", "get_mt5_ac_list");
    await axios.post(Url + "/ajaxfiles/account_list.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        navigate("/");
      }
      if (res.data.status == "error") {
        Toast("error", res.data.message);
      } else {
        // setDepositType(type);
        console.log(res.data);
        setMT5AccountList(res.data.mt5_accounts);
        if (res.data.mt5_accounts.length != 0) {
          setSelectedMT5AccountList(res.data.mt5_accounts[0].mt5_acc_no);
        }
      }
    });
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
      modalData == "USDT" ||
      modalData == "Wire Transfer"
    ) {
      // console.log(modalData);
      return (
        <div
          className="card-body position-relative scrolldown"
          style={{ display: showData }}
        >
          {/* <div style={{ marginBottom: "20px" }}>
            <h5 className="font-weight-bold mb-0 text-dark ">
              Specify the deposit amount
            </h5>
          </div> */}
          <div>
            <div className="deposit-section">
              <Grid container spacing={3}>
                <Grid item md={4}>
                  <label className="text-info font-weight-bold form-label-head w-100 required">
                    Amount in USD
                  </label>
                  <BootstrapInput
                    value={amount}
                    name="otp"
                    type="text"
                    className="w-100"
                    onChange={(e) => {
                      if (!isNaN(Number(e.target.value))) {
                        setAmount(e.target.value);
                      }
                    }}
                    displayEmpty
                    inputProps={{
                      "aria-label": "Without label",
                    }}
                  />
                </Grid>
              </Grid>
            </div>
            <FormControl>
              {/* <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                className="radiogroup"
                value={otherAmount}
                onChange={(event) => {
                  if (event.target.value == "select") {
                    setAmount(lastRadio);
                    setOtherAmount(event.target.value);
                    // SetSelectR(true);
                  } else {
                    setOtherAmount(event.target.value);
                    setAmount(event.target.value);
                    // SetSelectR(false);
                  }
                }}
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
                  value="select"
                  control={<Radio />}
                  label={
                    <input
                      type="text"
                      className="netbakunginputfild"
                      placeholder="Amount"
                      value={lastRadio}
                      onClick={(e) => {
                        setOtherAmount("select");
                        console.log("otherAmount", otherAmount);
                      }}
                      onChange={(e) => {
                        // if (selectR) {

                        if (!isNaN(Number(e.target.value))) {
                          setAmount(e.target.value);
                          setLastRadio(e.target.value);
                        }

                        setOtherAmount("select");
                        // } else {
                        // setLastRadio(event.target.value);
                        // setOtherAmount('select');
                        // }
                      }}
                    />
                  }
                />
              </RadioGroup> */}
              {modalData == "Cash" ? (
                <>
                  <div className="font-weight-bold mb-2">CITY</div>
                  <BootstrapInput
                    value={data}
                    name="name"
                    onChange={(event) => {
                      setCity(event.target.value);
                    }}
                    displayempty
                    inputProps={{
                      "aria-label": "Without label",
                    }}
                  />
                </>
              ) : modalData == "Skrill" ||
                modalData == "Nettler" ||
                modalData == "Wire Transfer" ? (
                <div className="margeField">
                  <div className="font-weight-bold mb-2">Upload Proof</div>
                  <label
                    htmlFor="contained-button-file"
                    className="fileuploadButton"
                  >
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={onSelectFile}
                    />
                    {data ? (
                      <img
                        src={preview}
                        className="deposit-upload-image-preview"
                      />
                    ) : (
                      <Button variant="contained" component="span">
                        <i className="material-icons">backup</i>&nbsp;Upload
                      </Button>
                    )}
                  </label>
                </div>
              ) : (
                ""
              )}
            </FormControl>
          </div>
          <div className="cyptobutton">
            {isLoader == true ? (
              <ColorButton className="makeapaymentbutoon" disabled>
                <svg class="spinner" viewBox="0 0 50 50">
                  <circle
                    class="path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    stroke-width="5"
                  ></circle>
                </svg>
              </ColorButton>
            ) : (
              <ColorButton onClick={onsubmit}>Make Payment</ColorButton>
            )}
          </div>
        </div>
      );
    } else {
      var number = [1, 2, 3, 4];
      // console.log(modalData);
      return (
        <div className="card-body position-relative p-5">
          <Grid container spacing={5}>
            <div className="card-body position-relative">
              <div style={{ marginBottom: "20px" }}>
                <h5 className="font-weight-bold mb-0 text-dark ">
                  Specify the deposit amount1
                </h5>
              </div>

              <div className="bordernet">
                <div className="deposit-section">
                  <Grid container spacing={3}>
                    <Grid item md={4}>
                      <FormControl
                        className="w-100"
                        error={depositType == "" ? true : false}
                      >
                        <label className="text-info font-weight-bold form-label-head w-100 required">
                          Deposit
                        </label>
                        <Select
                          onChange={(e) => {
                            setDepositType(e.target.value);
                            // getMt5AccountList(e.target.value);
                          }}
                          displayEmpty
                          value={depositType}
                          inputProps={{ "aria-label": "Without label" }}
                          input={<BootstrapInput />}
                        >
                          <MenuItem value="wallet">Wallet</MenuItem>
                          <MenuItem value="MT5">MT5</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    {depositType == "MT5" ? (
                      <Grid item md={4}>
                        <FormControl
                          className="w-100"
                          error={selectedMT5AccountList == "" ? true : false}
                        >
                          <label className="text-info font-weight-bold form-label-head w-100 required">
                            MT5 Account
                          </label>
                          <Select
                            onChange={(e) => {
                              setSelectedMT5AccountList(e.target.value);
                            }}
                            displayEmpty
                            value={selectedMT5AccountList}
                            inputProps={{ "aria-label": "Without label" }}
                            input={<BootstrapInput />}
                          >
                            {mt5AccountList.map((item) => {
                              return (
                                <MenuItem value={item.mt5_acc_no}>
                                  {item.mt5_name} ({item.mt5_acc_no})
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                    ) : (
                      ""
                    )}

                    <Grid item md={4}>
                      <label className="text-info font-weight-bold form-label-head w-100 required">
                        Amount in USD
                      </label>
                      <BootstrapInput
                        value={amount}
                        error={amount == "" ? true : false}
                        name="otp"
                        className="w-100"
                        type="text"
                        onChange={(e) => {
                          if (!isNaN(Number(e.target.value))) {
                            setAmount(e.target.value);
                          }
                        }}
                        displayEmpty
                        inputProps={{
                          "aria-label": "Without label",
                        }}
                        helperText={amount == "" ? "Please Enter Amount" : ""}
                      />
                    </Grid>
                  </Grid>
                </div>
                {/* <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    className="radiogroup"
                    value={otherAmount}
                    onChange={(event) => {
                      if (event.target.value == "select") {
                        setAmount(lastRadio);
                        setOtherAmount(event.target.value);
                        // SetSelectR(true);
                      } else {
                        setOtherAmount(event.target.value);
                        setAmount(event.target.value);
                        // SetSelectR(false);
                      }
                    }}
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
                      value="select"
                      control={<Radio />}
                      label={
                        <input
                          type="text"
                          className="netbakunginputfild"
                          placeholder="Amount"
                          value={lastRadio}
                          onClick={(e) => {
                            setOtherAmount("select");
                            console.log("otherAmount", otherAmount);
                          }}
                          onChange={(e) => {
                            // if (selectR) {
                            if (!isNaN(Number(e.target.value))) {
                              setAmount(e.target.value);
                              setLastRadio(e.target.value);
                            }

                            setOtherAmount("select");
                            // } else {
                            //   setLastRadio(event.target.value);
                            //   setOtherAmount('select');
                            // }
                          }}
                        />
                      }
                    />
                  </RadioGroup>
                  {modalData == "Cash" ? (
                    <>
                      {" "}
                      <div className="font-weight-bold mb-2">CITY</div>
                      <BootstrapInput
                        value={data}
                        name="name"
                        onChange={(event) => {
                          setCity(event.target.value);
                        }}
                        displayempty
                        inputProps={{
                          "aria-label": "Without label",
                        }}
                      />
                    </>
                  ) : modalData == "Skrill" ||
                    modalData == "Nettler" ||
                    modalData == "Wire Transfer" ? (
                    <div className="margeField">
                      <div className="font-weight-bold mb-2">Upload Proof</div>
                      <label
                        htmlFor="contained-button-file"
                        className="fileuploadButton"
                      >
                        <Input
                          accept="image/*"
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={onSelectFile}
                        />
                        {data ? (
                          <img
                            src={preview}
                            className="deposit-upload-image-preview"
                          />
                        ) : (
                          <Button variant="contained" component="span">
                            <i className="material-icons">backup</i>&nbsp;Upload
                          </Button>
                        )}
                      </label>
                    </div>
                  ) : (
                    ""
                  )}
                </FormControl> */}
              </div>

              <div className="cyptobutton">
                {/* <ColorButton onClick={onsubmit}> Submit</ColorButton> */}
                {isLoader == true ? (
                  <ColorButton className="makeapaymentbutoon" disabled>
                    <svg class="spinner" viewBox="0 0 50 50">
                      <circle
                        class="path"
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        stroke-width="5"
                      ></circle>
                    </svg>
                  </ColorButton>
                ) : (
                  <ColorButton onClick={onsubmit}>Make Payment</ColorButton>
                )}
              </div>
            </div>
            {bankList.map((bank) => {
              return (
                <>
                  <Grid item md={12}>
                    <div>
                      <h5 className="text-dark font-weight-bold text-center mb-3">
                        {bank.bank_name}
                      </h5>
                      <div className="table-responsive">
                        <table className="table table-one border text-dark mb-5">
                          <tbody>
                            <tr>
                              <th>Bank Name</th>
                              <td>{bank.bank_name}</td>
                            </tr>
                            <tr>
                              <th>Bank Account Name</th>
                              <td>{bank.bank_ac_name}</td>
                            </tr>
                            {/* <tr>
                              <th>Bank Address</th>
                              <td>
                                SBM Bank (Mauritius) Limited 6 th Floor SBM
                                Tower Port Louis
                              </td>
                            </tr> */}
                            {/* <tr>
                              <th>Beneficiary (Company) Address</th>
                              <td>
                                The Cyberati Lounge, Ground Floor, The Catalyst,
                                Silicon Avenue, 40 Cybercity 72201 Ebène,
                                Republic of Mauritius
                              </td>
                            </tr> */}
                            <tr>
                              <th>IFSC/IBAN Number</th>
                              <td>{bank.bank_ifsc_code}</td>
                            </tr>
                            <tr>
                              <th>Bank Account Number</th>
                              <td>{bank.bank_ac_number}</td>
                            </tr>
                            {/* <tr>
                              <th>Swift Code</th>
                              <td>STCBMUMU</td>
                            </tr> */}
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
                {/* <TopButton /> */}
                <div className="webView">
                  <Grid container spacing={3}>
                    <Grid item md={12} className="d-flex">
                      <Paper
                        elevation={1}
                        style={{ borderRadius: "10px", display: showData }}
                        className="w-100 mb-3"
                      >
                        <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                          <Grid container spacing={3}>
                            <Grid item md={12} xs={12} sm={12}>
                              <div className="make-deposit-header-title">
                                <h5 className="font-weight-bold mb-0 text-dark ">
                                  Make a Deposit
                                  {/* {useCountdown()} */}
                                </h5>
                              </div>
                            </Grid>
                            {/* <Grid item md={6} xs={6}>
                              <h5 className="font-weight-bold mb-0 text-dark "></h5>
                            </Grid> */}
                          </Grid>
                        </div>
                        <div className="divider"></div>
                        <Grid
                          item
                          md={4}
                          style={{ margin: "9px 0px 0px 16px" }}
                        >
                          <FormControl className="w-100">
                            <label className="text-info font-weight-bold form-label-head w-100 required">
                              Deposit To
                            </label>
                            <Select
                              onChange={(e) => {
                                setSelectedMT5AccountList(e.target.value);
                              }}
                              displayEmpty
                              value={selectedMT5AccountList}
                              inputProps={{ "aria-label": "Without label" }}
                              input={<BootstrapInput />}
                            >
                              {mt5AccountList.map((item) => {
                                return (
                                  <MenuItem value={item.mt5_acc_no}>
                                    {item.mt5_name} ({item.mt5_acc_no})
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </Grid>

                        <div>
                          <ul className="pd-0 gridDeposit">
                            <li
                              className={`lideposit mar-10 ${
                                modalData == "Net Banking" ? "active" : ""
                              }`}
                            >
                              <a href="/deposit#depositDetails">
                                <div
                                  title="Net Banking"
                                  onClick={modalopen}
                                  className=""
                                >
                                  <img
                                    src="./rightfx_login_files/Credit&DebitCard.png"
                                    alt="Net Banking"
                                    title="Net Banking"
                                    className="w-100 h-80 m-auto netimage"
                                    style={{
                                      objectFit: "contain",
                                    }}
                                  ></img>
                                </div>
                              </a>
                            </li>
                            <li
                              className={`lideposit mar-10 ${
                                modalData == "Wire Transfer" ? "active" : ""
                              }`}
                            >
                              <a href="/deposit#depositDetails">
                                <div
                                  title="Wire Transfer"
                                  className=""
                                  onClick={modalopen}
                                >
                                  <img
                                    src="./rightfx_login_files/5.png"
                                    alt="Wire Transfer"
                                    title="Wire Transfer"
                                    className="w-100 h-80 m-auto imageDeposite"
                                    style={{ objectFit: "contain" }}
                                  ></img>
                                </div>
                              </a>
                            </li>
                            <li
                              className={`lideposit mar-10 ${
                                modalData == "Cash" ? "active" : ""
                              }`}
                              onClick={modalopen}
                            >
                              <a href="/deposit#depositDetails">
                                <div
                                  className=" w-100 false"
                                  title="Cash"
                                  onClick={modalopen}
                                >
                                  <img
                                    src="./rightfx_login_files/8.png"
                                    alt="Card"
                                    title="Cash"
                                    className="w-100 h-80 m-auto imageDeposite"
                                    style={{ objectFit: "contain" }}
                                  ></img>
                                </div>
                              </a>
                            </li>
                            <li
                              className={`lideposit mar-10 ${
                                modalData == "Skrill" ? "active" : ""
                              }`}
                            >
                              <a href="/deposit#depositDetails">
                                <Button
                                  className="w-100 false"
                                  title="Skrill"
                                  onClick={modalopen}
                                >
                                  <img
                                    src="./dimage/skrill.jpg"
                                    title="Skrill"
                                    alt="Skrill"
                                    style={{
                                      objectFit: "contain",
                                      width: " ",
                                    }}
                                    className=" h-80 m-auto imageDeposite"
                                  ></img>
                                </Button>
                              </a>
                            </li>
                            <li
                              className={`lideposit mar-10 ${
                                modalData == "Nettler" ? "active" : ""
                              }`}
                            >
                              <a href="/deposit#depositDetails">
                                <Button
                                  className="w-100 false"
                                  title="Nettler"
                                  onClick={modalopen}
                                >
                                  <img
                                    src="./dimage/Neteller.png"
                                    alt="Nettler"
                                    title="Nettler"
                                    className="gpayimage h-80 m-auto "
                                    style={{ objectFit: "contain" }}
                                  ></img>
                                </Button>
                              </a>
                            </li>
                            {/* </ul> */}
                            {/* <ul className="pd-0 gridDeposit"> */}
                            <li
                              className={`lideposit mar-10 ${
                                modalData == "Bitcoin" ? "active" : ""
                              }`}
                            >
                              <a href="/deposit#depositDetails">
                                <div
                                  title="Bitcoin"
                                  className=""
                                  onClick={modalopen}
                                >
                                  <img
                                    src="./dimage/bitcoin.png"
                                    alt="Bitcoin"
                                    title="Bitcoin"
                                    className="w-100 h-80 m-auto imageDeposite"
                                    style={{ objectFit: "contain" }}
                                  ></img>
                                </div>
                              </a>
                            </li>
                            <li
                              className={`lideposit mar-10 ${
                                modalData == "Ethereum" ? "active" : ""
                              }`}
                            >
                              <a href="/deposit#depositDetails">
                                <div
                                  className="false"
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
                                </div>
                              </a>
                            </li>
                            <li
                              className={`lideposit mar-10 ${
                                modalData == "USDT" ? "active" : ""
                              }`}
                            >
                              <a href="/deposit#depositDetails">
                                <div
                                  className="false"
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
                                </div>
                              </a>
                            </li>
                            <li
                              className={`lideposit mar-10 ${
                                modalData == "Litecoin" ? "active" : ""
                              }`}
                            >
                              <a href="/deposit#depositDetails">
                                <div
                                  className="false"
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
                                  />
                                </div>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div id="depositDetails"></div>
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
                      {/* {modalData} */}
                      Specify the deposit amount
                    </h5>
                  </div>
                  <div className="divider"></div>

                  {}
                  {showData == "none" ? showCrypto() : paymetOption()}
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};
