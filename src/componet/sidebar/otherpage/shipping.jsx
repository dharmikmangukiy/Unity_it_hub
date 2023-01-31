import React, { useEffect, useState } from "react";
import "./tradeAndWin.css";
import {
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Autocomplete,
} from "@mui/material";
import axios from "axios";
import { IsApprove, Url } from "../../../global";
import { ReactComponent as Warn } from "../../../svg/warn.svg";
import { useNavigate } from "react-router-dom";
import { ColorButton } from "../../customComponet/CustomElement";
import Toast from "../../commonComponet/Toast";

const Shipping = (prop) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullName: prop.permission?.user_name,
    email: prop.permission?.user_email,
    addOne: "",
    addTwo: "",
    country: "",
    city: "",
    pin: "",
    note: "",
    isLoder: false,
  });
  console.log("s", prop.permission?.user_name, prop, data);

  const [error, setError] = useState({
    fullName: "",
    email: "",
    addOne: "",
    addTwo: "",
    country: "",
    city: "",
    pin: "",
  });
  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [countryData, setCountryData] = useState({
    country: [],
    city: [],
    state: [],
  });
  useEffect(() => {
    data.fullName = prop.permission?.user_name;
    data.email = prop.permission?.user_email;
    setData({ ...data });
    console.log("ss", prop);
  }, [prop]);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError((prevState) => ({
      ...prevState,
      [e.target.name]: "",
    }));
  };
  useEffect(() => {
    // fetchCountry();
    getContry();
  }, []);

  const getContry = () => {
    const param = new FormData();
    axios.post(Url + "/datatable/get_countries.php", param).then((res) => {
      if (res.data.status == "error") {
        Toast("error", res.data.message);
      } else {
        countryData.country = res.data.aaData;
        setCountryData({ ...countryData });
      }
    });
  };
  const getStateData = (prop) => {
    if (prop == null) {
      countryData.state = [];
      setCountryData({ ...countryData });
      data.city = "";
      setData({ ...data });
    } else {
      const param = new FormData();
      param.append("action", "get_states");
      param.append("country", prop.nicename);
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      axios.post(Url + "/ajaxfiles/common_api.php", param).then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/login");
        }
        if (res.data.status == "error") {
          // Toast("error",res.data.message);
        } else {
          // if (id == undefined || id == null || id == "") {

          // }

          countryData.state = res.data.data;
          setCountryData({ ...countryData });
        }
      });
    }
  };
  // useEffect(() => {
  //   if (data?.country !== "") {
  //     fetchState(data?.country);
  //   } else {
  //     setCityList([]);
  //     setData({ ...data, city: "" });
  //   }
  // }, [data?.country]);

  // const fetchCountry = async () => {
  //   try {
  //     let data = await axios.get(
  //       `https://test.rightqinfotech.com/ajaxfiles/get_countries.php`
  //     );
  //     if (data?.data?.status === "ok") {
  //       setCountryList(data?.data?.data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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

  const handleValidation = () => {
    let flag = true;
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const pinReg = /^(?=[0-9]*$)(?:.{6})$/;

    if (data.fullName === "") {
      flag = false;
      setError((prevState) => ({
        ...prevState,
        fullName: "Fullname is required!",
      }));
    }

    if (data.email === "") {
      flag = false;
      setError((prevState) => ({
        ...prevState,
        email: "Email is required!",
      }));
    } else if (!emailReg.test(data.email)) {
      flag = false;
      setError((prevState) => ({
        ...prevState,
        email: "Email is invalid!",
      }));
    }

    if (data.addOne === "") {
      flag = false;
      setError((prevState) => ({
        ...prevState,
        addOne: "Address1 is required!",
      }));
    }

    if (data.addTwo === "") {
      flag = false;
      setError((prevState) => ({
        ...prevState,
        addTwo: "Address2 is required!",
      }));
    }

    if (data.country === "" || data.country === null) {
      flag = false;
      setError((prevState) => ({
        ...prevState,
        country: "Country is required!",
      }));
    }

    if (data.city === "" || data.city === null) {
      flag = false;
      setError((prevState) => ({
        ...prevState,
        city: "State is required!",
      }));
    }

    if (data.pin === "") {
      flag = false;
      setError((prevState) => ({
        ...prevState,
        pin: "Pincode is required!",
      }));
    } else if (!pinReg.test(data?.pin)) {
      flag = false;
      setError((prevState) => ({
        ...prevState,
        pin: "Pin code should be 6 digit number",
      }));
    }

    return flag;
  };

  const handlePlaceOrder = async () => {
    if (handleValidation()) {
      try {
        const param = new FormData();
        if (IsApprove !== "") {
          param.append("is_app", IsApprove.is_app);
          param.append("user_id", IsApprove.user_id);
          param.append("auth_key", IsApprove.auth);
        }
        param.append("action", "place_order");
        param.append("order_notes", data?.note);
        param.append(
          "shipping_address",
          `${data?.addOne}, ${data?.addTwo}, ${data?.city}, ${data?.country.nicename}-${data?.pin}`
        );
        data.isLoder = true;
        setData({ ...data });
        let adata = await axios.post(
          `${Url}/ajaxfiles/trade_and_win.php`,
          param
        );
        if (adata.status === 200) {
          if (adata.data.status === "error") {
            Toast("error", adata.data.message);
            data.isLoder = false;
            setData({ ...data });
          } else {
            navigate("/trade-and-win/2");
            Toast("success", adata.data.message);
            data.isLoder = false;
            setData({ ...data });
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="app-content--inner">
      <div className="app-content--inner__wrapper mh-100-vh">
        <div className="trade-main-body">
          <div className="cart-warn" style={{ minHeight: "60px" }}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                label="Full name"
                variant="standard"
                sx={{ width: "100%" }}
                name="fullName"
                value={data?.fullName}
                onChange={(e) => handleChange(e)}
              />
              {error?.fullName !== "" && (
                <span className="error">{error?.fullName}</span>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                variant="standard"
                sx={{ width: "100%" }}
                name="email"
                value={data?.email}
                onChange={(e) => handleChange(e)}
              />
              {error?.email !== "" && (
                <span className="error">{error?.email}</span>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address line 1"
                variant="standard"
                sx={{ width: "100%" }}
                name="addOne"
                value={data?.addOne}
                onChange={(e) => handleChange(e)}
              />
              {error?.addOne !== "" && (
                <span className="error">{error?.addOne}</span>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address line 2"
                variant="standard"
                sx={{ width: "100%" }}
                name="addTwo"
                value={data?.addTwo}
                onChange={(e) => handleChange(e)}
              />
              {error?.addTwo !== "" && (
                <span className="error">{error?.addTwo}</span>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                disablePortal
                options={countryData.country}
                value={data.country}
                getOptionLabel={(option) => (option ? option.nicename : "")}
                onChange={(event, newValue) => {
                  getStateData(newValue);

                  if (newValue == null) {
                    data.country = newValue;
                    data.city = "";
                    setData({ ...data });
                  } else {
                    data.country = newValue;
                    data.city = "";
                    setData({ ...data });
                  }
                }}
                sx={{ padding: "0px" }}
                className="w-100"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    // variant="standard"
                    size="small"
                    name="country"
                    variant="standard"
                    sx={{ padding: "0px" }}
                  />
                )}
              />
              {error?.country !== "" && (
                <span className="error">{error?.country}</span>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                disablePortal
                options={countryData.state}
                value={data.city}
                getOptionLabel={(option) => (option ? option : "")}
                onChange={(event, newValue) => {
                  if (newValue == null) {
                    data.city = newValue;
                    setData({ ...data });
                  } else {
                    data.city = newValue;
                    setData({ ...data });
                  }
                }}
                sx={{ padding: "0px" }}
                className="w-100"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="States"
                    // variant="standard"
                    size="small"
                    name="city"
                    variant="standard"
                    sx={{ padding: "0px" }}
                  />
                )}
              />
              {error?.city !== "" && (
                <span className="error">{error?.city}</span>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Pincode"
                variant="standard"
                sx={{ width: "100%" }}
                name="pin"
                value={data?.pin}
                onChange={(e) => {
                  if (!isNaN(Number(e.target.value))) {
                    handleChange(e);
                  } else if (e.target.value == "") {
                    handleChange(e);
                  }
                }}
              />
              {error?.pin !== "" && <span className="error">{error?.pin}</span>}
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
            {data.isLoder == true ? (
              <ColorButton disabled>
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
              <button
                style={{ background: "#5D2067", color: "#fff" }}
                onClick={() => handlePlaceOrder()}
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Shipping;
