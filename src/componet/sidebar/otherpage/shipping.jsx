import React, { useEffect, useState } from "react";
import "./tradeAndWin.css";
import {
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { Url } from "../../../global";
import { ReactComponent as Warn } from "../../../svg/warn.svg";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullName: "",
    email: "",
    addOne: "",
    addTwo: "",
    country: "",
    city: "",
    pin: "",
    note: "",
  });
  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    fetchCountry();
  }, []);

  useEffect(() => {
    if (data?.country !== "") {
      fetchState(data?.country);
    } else {
      setCityList([]);
      setData({ ...data, city: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.country]);

  const fetchCountry = async () => {
    try {
      let data = await axios.get(
        `https://test.rightqinfotech.com/ajaxfiles/get_countries.php`
      );
      if (data?.data?.status === "ok") {
        setCountryList(data?.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchState = async (country) => {
    try {
      const param = { action: "get_states", country: country };
      let data = await axios.post(
        `https://test.rightqinfotech.com/ajaxfiles/common_api.php`,
        param
      );
      if (data?.data?.status === "ok") {
        setCityList(data?.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const param = new FormData();
      param.append("user_id", 15);
      param.append("auth_key", "dsadsad-asdas-dsad-a");
      param.append("is_app", 1);
      param.append("action", "place_order");
      param.append("order_notes", data?.note);
      param.append(
        "shipping_address",
        `${data?.addOne}, ${data?.addTwo}, ${data?.city}, ${data?.country}-${data?.pin}`
      );

      let adata = await axios.post(`${Url}/ajaxfiles/trade_and_win.php`, param);
      if (adata.status === 200) {
        navigate("/trade-and-win");
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(
    "data",
    data,
    countryList,
    cityList,
    `${data?.addOne}, ${data?.addTwo}, ${data?.city}, ${data?.country}-${data?.pin}`
  );

  return (
    <div className="app-content--inner">
      <div className="app-content--inner__wrapper mh-100-vh">
        <div className="trade-main-body">
          <div className="cart-warn" style={{ height: "60px" }}>
            <Warn />
            <p>
              If something is inaccurate, the delivery service will return your
              gift back to us—we will have to start from the beginning. Please
              double check that you filled in all fields correctly and without
              typos.
            </p>
          </div>
          <h1 className="cart-heading">Shipping address</h1>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Full name"
                variant="standard"
                sx={{ width: "100%" }}
                name="fullName"
                value={data?.fullName}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                variant="standard"
                sx={{ width: "100%" }}
                name="email"
                value={data?.email}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Address line 1"
                variant="standard"
                sx={{ width: "100%" }}
                name="addOne"
                value={data?.addOne}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Address line 2"
                variant="standard"
                sx={{ width: "100%" }}
                name="addTwo"
                value={data?.addTwo}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel id="country">Country</InputLabel>
                <Select
                  labelId="country"
                  id="demo-simple-select-standard"
                  label="Country"
                  name="country"
                  value={data?.country}
                  onChange={(e) => handleChange(e)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {countryList?.map((item) => (
                    <MenuItem value={item?.name}>{item?.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel id="city">City</InputLabel>
                <Select
                  labelId="city"
                  label="City"
                  name="city"
                  value={data?.city}
                  onChange={(e) => handleChange(e)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {cityList?.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Pincode"
                variant="standard"
                sx={{ width: "100%" }}
                name="pin"
                value={data?.pin}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                variant="standard"
                sx={{ width: "100%" }}
                name="note"
                value={data?.note}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
          </Grid>
          <div className="cart-btn">
            <button
              style={{ background: "#5D2067", color: "#fff" }}
              onClick={() => handlePlaceOrder()}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Shipping;
