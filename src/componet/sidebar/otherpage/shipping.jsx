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
import Info from "@mui/icons-material/Info";

const Shipping = (prop) => {
  const navigate = useNavigate();
  const [mainLoader, setMainLoader] = useState(true);
  const [data, setData] = useState({
    fullName: prop.permission?.user_name,
    email: prop.permission?.user_email,
    addOne: "",
    addTwo: "",
    country: "",
    city: "",
    pin: "",
    note: "",
    city1: "",
    isLoder: false,
  });

  const [error, setError] = useState({
    fullName: false,
    email: false,
    addOne: false,
    addTwo: false,
    country: false,
    city: false,
    pin: false,
    city1: false,
  });
  const trueFalse = (event) => {
    var { name, value } = event.target;
    setError((prevalue) => {
      return {
        ...prevalue,
        [name]: true,
      };
    });
  };
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
  }, [prop]);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // setError((prevState) => ({
    //   ...prevState,
    //   [e.target.name]: "",
    // }));
  };
  const getCityData = (prop) => {
    if (prop == null) {
      countryData.city = [];
      setCountryData({ ...countryData });
      data.city = "";
      data.city1 = "";
      setData({ ...data });
    } else {
      const param = new FormData();
      param.append("action", "get_cities");
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      param.append("state", prop);
      axios.post(Url + "/ajaxfiles/common_api.php", param).then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/login");
        }
        if (res.data.status == "error") {
          // Toast("error",res.data.message);
        } else {
          // if (id == undefined || id == null || id == "") {
          //   info.onEdit = "";
          //   setOnEdit({ ...onEdit });
          // }

          countryData.city = res.data.data;
          setCountryData({ ...countryData });
        }
      });
    }
  };
  useEffect(() => {
    // fetchCountry();
    // getShipping();
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
        getShipping();
      }
    });
  };

  const getShipping = () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("action", "get_shipping_address");
    axios.post(Url + "/ajaxfiles/trade_and_win.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/login");
      }
      if (res.data.status == "error") {
        Toast("error", res.data.message);
      } else {
        let test = countryData.country.filter(
          (x) => x.nicename == res.data.user_country
        )[0];
        data.country = test;
        getStateData(test);
        if (res.data.user_state == "" || res.data.user_state == null) {
        } else {
          getCityData(res.data.user_state);
        }

        data.addOne = res.data.user_address_1;
        data.addTwo = res.data.user_address_2;
        data.city = res.data.user_state;
        data.city1 = res.data.user_city;
        data.pin = res.data.user_postcode;
        setData({ ...data });
        setMainLoader(false);
      }
    });
  };
  const getStateData = (prop) => {
    if (prop == null) {
      countryData.state = [];
      countryData.city = [];
      setCountryData({ ...countryData });
      data.city = "";
      data.city1 = "";

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
    } catch (err) {}
  };

  const handleValidation = () => {
    let flag = true;
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const pinReg = /^(?=[0-9]*$)(?:.{6})$/;

    if (data.fullName === "") {
      flag = false;
      Toast("error", "Fullname is required!");

      // setError((prevState) => ({
      //   ...prevState,
      //   fullName: "Fullname is required!",
      // }));
    } else if (data.email === "") {
      flag = false;
      Toast("error", "Email is required!");
      // setError((prevState) => ({
      //   ...prevState,
      //   email: "Email is required!",
      // }));
    } else if (!emailReg.test(data.email)) {
      flag = false;
      Toast("error", "Email is invalid!");

      // setError((prevState) => ({
      //   ...prevState,
      //   email: "Email is invalid!",
      // }));
    } else if (data.addOne === "") {
      flag = false;
      Toast("error", "Address1 is required!");

      // setError((prevState) => ({
      //   ...prevState,
      //   addOne: "Address1 is required!",
      // }));
    } else if (data.addTwo === "") {
      flag = false;
      Toast("error", "Address2 is required!");

      // setError((prevState) => ({
      //   ...prevState,
      //   addTwo: "Address2 is required!",
      // }));
    } else if (data.country === "" || data.country === null) {
      flag = false;
      Toast("error", "Country is required!");

      // setError((prevState) => ({
      //   ...prevState,
      //   country: "Country is required!",
      // }));
    } else if (data.city === "" || data.city === null) {
      flag = false;
      Toast("error", "State is required!");

      // setError((prevState) => ({
      //   ...prevState,
      //   city: "State is required!",
      // }));
    } else if (data.city1 === "" || data.city1 === null) {
      flag = false;
      Toast("error", "City is required!");

      // setError((prevState) => ({
      //   ...prevState,
      //   city: "State is required!",
      // }));
    } else if (data.pin === "") {
      flag = false;
      Toast("error", "Pincode is required!");

      // setError((prevState) => ({
      //   ...prevState,
      //   pin: "Pincode is required!",
      // }));
    } else if (!pinReg.test(data?.pin)) {
      flag = false;
      Toast("error", "Pin code should be 6 digit number");

      // setError((prevState) => ({
      //   ...prevState,
      //   pin: "Pin code should be 6 digit number",
      // }));
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
        // param.append("order_notes", data?.addOne);
        // param.append("order_notes", data?.addTwo);
        // param.append("order_notes", data?.city);
        // param.append("order_notes", data?.country.nicename);
        // param.append("order_notes", data?.note);
        // param.append("order_notes", data?.note);
        // param.append("order_notes", data?.note);
        // param.append(
        //   "shipping_address",
        //   `${data?.addOne}, ${data?.addTwo}, ${data?.city}, ${data?.country.nicename}-${data?.pin}`
        // );
        var arrayAddress = {
          address_1: data?.addOne,
          address_2: data?.addTwo,
          city: data?.city1,
          state: data?.city,
          country: data?.country.nicename,
          pincode: data?.pin,
        };
        param.append("shipping_address", JSON.stringify(arrayAddress));
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
      } catch (err) {}
    }
  };

  return (
    <div className="app-content--inner">
      <div className="app-content--inner__wrapper mh-100-vh">
        {mainLoader == true ? (
          <div className="loader1">
            <span className="loader2"></span>
          </div>
        ) : (
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item sm={11}></Grid>
              <Grid item xl={1}></Grid>
              <Grid item xl={10} md={12} lg={12}>
                <div className="trade-main-body">
                  <div className="cart-warn" style={{ minHeight: "60px" }}>
                    <Warn />
                    <p>
                      If something is inaccurate, the delivery service will
                      return your gift back to us—we will have to start from the
                      beginning. Please double check that you filled in all
                      fields correctly and without typos.
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
                        onBlur={trueFalse}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={data?.fullName}
                        onChange={(e) => handleChange(e)}
                      />
                      {error?.fullName == true && data?.fullName == "" ? (
                        <span className="error">Fullname is required!</span>
                      ) : (
                        ""
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email"
                        variant="standard"
                        sx={{ width: "100%" }}
                        name="email"
                        onBlur={trueFalse}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={data?.email}
                        onChange={(e) => handleChange(e)}
                      />
                      {error?.email == true && data?.email == "" ? (
                        <span className="error">Email is required!</span>
                      ) : !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                          data?.email
                        ) && error?.email == true ? (
                        <span className="error">Enter a valid email</span>
                      ) : (
                        ""
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Address line 1"
                        variant="standard"
                        sx={{ width: "100%" }}
                        name="addOne"
                        value={data?.addOne}
                        onBlur={trueFalse}
                        onChange={(e) => handleChange(e)}
                      />
                      {error?.addOne == true && data?.addOne == "" ? (
                        <span className="error">Address1 is required!!</span>
                      ) : (
                        ""
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Address line 2"
                        variant="standard"
                        sx={{ width: "100%" }}
                        name="addTwo"
                        value={data?.addTwo}
                        onBlur={trueFalse}
                        onChange={(e) => handleChange(e)}
                      />
                      {error?.addTwo == true && data?.addTwo == "" ? (
                        <span className="error">Address2 is required!</span>
                      ) : (
                        ""
                      )}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Autocomplete
                        disablePortal
                        options={countryData.country}
                        value={data.country}
                        getOptionLabel={(option) =>
                          option ? option.nicename : ""
                        }
                        onChange={(event, newValue) => {
                          getStateData(newValue);

                          if (newValue == null) {
                            data.country = newValue;
                            data.city = "";
                            data.city1 = "";

                            setData({ ...data });
                          } else {
                            data.country = newValue;
                            data.city = "";
                            data.city1 = "";

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
                            onBlur={trueFalse}
                            variant="standard"
                            sx={{ padding: "0px" }}
                          />
                        )}
                      />
                      {error?.country == true &&
                      (data?.country == "" || data?.country == null) ? (
                        <span className="error">Country is required!</span>
                      ) : (
                        ""
                      )}
                    </Grid>
                    {countryData.state.length == 0 ? (
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="State"
                          variant="standard"
                          sx={{ width: "100%" }}
                          name="city"
                          value={data?.city}
                          onBlur={trueFalse}
                          onChange={(e) => handleChange(e)}
                        />
                        {error?.city == true && data?.city == "" ? (
                          <span className="error">State is required!</span>
                        ) : (
                          ""
                        )}
                      </Grid>
                    ) : (
                      <Grid item xs={12} sm={4}>
                        <Autocomplete
                          disablePortal
                          options={countryData.state}
                          value={data.city}
                          getOptionLabel={(option) => (option ? option : "")}
                          onChange={(event, newValue) => {
                            getCityData(newValue);

                            if (newValue == null) {
                              data.city = newValue;
                              data.city1 = "";

                              setData({ ...data });
                            } else {
                              data.city = newValue;
                              data.city1 = "";

                              setData({ ...data });
                            }
                          }}
                          sx={{ padding: "0px" }}
                          className="w-100"
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="State"
                              // variant="standard"
                              onBlur={trueFalse}
                              size="small"
                              name="city"
                              variant="standard"
                              sx={{ padding: "0px" }}
                            />
                          )}
                        />
                        {error?.city == true &&
                        (data?.city == "" || data?.city == null) ? (
                          <span className="error">State is required!</span>
                        ) : (
                          ""
                        )}
                      </Grid>
                    )}
                    {countryData.state.length == 0 ||
                    countryData.city.length == 0 ? (
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="City"
                          variant="standard"
                          sx={{ width: "100%" }}
                          name="city1"
                          value={data?.city1}
                          onBlur={trueFalse}
                          onChange={(e) => handleChange(e)}
                        />
                        {error?.city1 == true && data?.city1 == "" ? (
                          <span className="error">City is required!</span>
                        ) : (
                          ""
                        )}
                      </Grid>
                    ) : (
                      <Grid item xs={12} sm={4}>
                        <Autocomplete
                          disablePortal
                          options={countryData.city}
                          value={data.city1}
                          getOptionLabel={(option) => (option ? option : "")}
                          onChange={(event, newValue) => {
                            if (newValue == null) {
                              data.city1 = newValue;
                              setData({ ...data });
                            } else {
                              data.city1 = newValue;
                              setData({ ...data });
                            }
                          }}
                          sx={{ padding: "0px" }}
                          className="w-100"
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="City"
                              size="small"
                              // className="autoComplte-textfild"
                              onBlur={trueFalse}
                              // helperText={
                              //   (data.city1 == null || data.city1 == "") && error.city1
                              //     ? "City is required"
                              //     : ""
                              // }
                              // error={
                              //   (data.city1 == null || data.city1 == "") && error.city1
                              //     ? true
                              //     : false
                              // }
                              name="city1"
                              sx={{ padding: "0px" }}
                              variant="standard"
                            />
                          )}
                        />
                        {error?.city1 == true &&
                        (data?.city1 == "" || data?.city1 == null) ? (
                          <span className="error">State is required!</span>
                        ) : (
                          ""
                        )}
                      </Grid>
                    )}

                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Pincode"
                        variant="standard"
                        sx={{ width: "100%" }}
                        name="pin"
                        value={data?.pin}
                        onBlur={trueFalse}
                        onChange={(e) => {
                          if (!isNaN(Number(e.target.value))) {
                            handleChange(e);
                          } else if (e.target.value == "") {
                            handleChange(e);
                          }
                        }}
                      />
                      {error?.pin == true && data?.pin == "" ? (
                        <span className="error">Pincode is required!</span>
                      ) : error?.pin == true &&
                        data?.pin.toString().length !== 6 ? (
                        <span className="error">
                          Pin code should be 6 digit number
                        </span>
                      ) : (
                        ""
                      )}
                    </Grid>
                    <Grid item xs={12} sm={8}>
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
                  <div className="cart-btn" style={{ gap: "20px" }}>
                    <button onClick={() => navigate("/cart")}>Back</button>
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
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
};
export default Shipping;
