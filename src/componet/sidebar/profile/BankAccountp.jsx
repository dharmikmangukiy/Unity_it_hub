import React, { useState, useEffect } from "react";
import {
  Grid,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";
import TopButton from "../../customComponet/TopButton";
import { Paper } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import { ColorButton } from "../../customComponet/CustomElement";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { BootstrapInput } from "../../customComponet/CustomElement";
import axios from "axios";
import { IsApprove, Url } from "../../../global";
import { useNavigate } from "react-router-dom";
import Counter from "../../customComponet/Counter";
const BootstrapInput1 = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(0),
  },
  "& .MuiInputBase-input": {
    borderRadius: "10px ",
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    fontSize: 16,
    padding: "3px 26px 3px 10px",
    marginTop: 0,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Cairo, sans-serif"].join(","),
    "&:hover": {
      borderColor: "#1e64b4;",
    },
    "&:focus": {
      borderRadius: 9,
    },
  },
}));

const SelectFieldStyle = {
  height: 80,
};
const re = /^[A-Za-z_ ]*$/;

const BankAccountp = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [userBankId, setUserBankId] = useState("");
  const [scroll, setScroll] = useState("paper");
  const [onEdit, setOnEdit] = useState(false);
  const [option, setOption] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [mainLoader, setMainLoader] = useState(true);
  const [ageErrors, setAgeErrors] = useState({});
  const [timer, setTimer] = useState(true);

  const [ifscData, setIfscData] = useState({
    data: "",
    isLoader: false,
    buttonDisable: true,
  });
  const [sendOtp, setSendOtp] = useState({
    otp: false,
    otpLoder: false,
    showButton: false,
  });
  const [infoTrue, setinfoTrue] = useState({
    name: false,
    bankName: false,
    bankAccountNumber: false,
    confirmbankAccountNumber: false,
    iban: false,
    otp: false,
    ibanselect: false,
  });
  const [age, setAge] = useState({
    name: "",
    bankName: "",
    bankAccountNumber: "",
    confirmbankAccountNumber: "",
    iban: "",
    otp: "",
    ibanselect: "IFSC",
    isLoader: "",
  });
  const trueFalse = (event) => {
    var { name, value } = event.target;
    setinfoTrue((prevalue) => {
      return {
        ...prevalue,
        [name]: true,
      };
    });
  };
  const handleClickOpen = (scrollType, bankId) => () => {
    setOpen(true);
    setUserBankId(bankId);
    setScroll(scrollType);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    age.isLoader = true;
    setAge({ ...age });
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("bank_id", userBankId);
    axios
      .post(`${Url}/ajaxfiles/delete_bank_details.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data == "error") {
          toast.error(res.data.status);
          age.isLoader = false;
          setAge({ ...age });
        } else {
          setOpen(false);
          toast.success(res.data.message);
          age.isLoader = false;
          setAge({ ...age });
          fetchUserPref1();
        }
      });
  };
  const handleEdit = (item) => () => {
    setUserBankId(item.user_bank_id);
    setAge({
      name: item.bank_account_holder_name,
      bankName: item.bank_name,
      bankAccountNumber: item.bank_account_number,
      iban: item.bank_ifsc,
      confirmbankAccountNumber: item.bank_account_number,
      ibanselect: "IFSC",
      otp: "",
      isLoader: false,
    });
    setinfoTrue({
      name: false,
      bankName: false,
      bankAccountNumber: false,
      confirmbankAccountNumber: false,
      iban: false,
      otp: false,
      ibanselect: false,
    });
    setIfscData({
      data: "",
      isLoader: false,
      buttonDisable: true,
    });
    setSendOtp({
      otp: false,
      otpLoder: false,
      showButton: false,
    });
    setOption(true);
    setOnEdit(true);
    // setData(data.map((item) => (item.index === index ? index : item)));
  };
  console.log("age", age);

  const fetchUserPref1 = () => {
    const param = new FormData();
    setMainLoader(true);
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    axios.post(`${Url}/ajaxfiles/view_bank_details.php`, param).then((res) => {
      if (res.data.message == "Session has been expired") {
        navigate("/");
      }
      setData(res.data.data);
      setMainLoader(false);
      console.log("res.data.data", res.data.data);
      console.log("res.data", res.data);
    });
  };
  useEffect(() => {
    fetchUserPref1();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAge((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
    console.log(event.target.value);
  };

  console.log("ifscData", ifscData);
  const currency = [{ label: "Indian rupee (INR)" }];
  const handleSubmit = (e) => {
    e.preventDefault();
    setAgeErrors(validate(age));
    setIsSubmit(true);
  };
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Account holder name required";
      notify("Account holder name required");
    } else if (!values.bankName) {
      errors.bankName = "Benificiary bank name required";
      notify("Benificiary bank name required");
    } else if (!values.bankAccountNumber) {
      errors.bankAccountNumber = "Bank account number required";
      notify("Bank account number required");
    } else if (!values.confirmbankAccountNumber) {
      errors.confirmbankAccountNumber = "Confirm Bank account number required";
      notify("Confirm Bank account number required");
    } else if (!values.iban) {
      notify(`${age.ibanselect} code is required`);
      errors.bankName = "Benificiary bank name required";
    } else if (values.iban !== ifscData.data.IFSC && age.ibanselect == "IFSC") {
      notify("Verify IFSc code");
      errors.bankName = "Benificiary bank name required";
    }
    return errors;
  };
  const notify = (p) => {
    toast.error(p);
  };
  toast.configure();
  const checkIfscCode = () => {
    if (age.iban == "") {
      notify(`${age.ibanselect} code is required`);
    } else {
      const param = new FormData();
      param.append("ifsc_code", age.iban);
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      ifscData.isLoader = true;
      setIfscData({ ...ifscData });
      axios.post(`${Url}/ajaxfiles/check_ifsc_code.php`, param).then((res) => {
        if (res.data.status == "error") {
          // ifscData.isLoader = false;
          // setIfscData({ ...ifscData })
          toast.error(res.data.message);
          ifscData.isLoader = false;
          ifscData.buttonDisable = true;
          ifscData.data = "";
          setIfscData({ ...ifscData });
        } else {
          ifscData.isLoader = false;
          ifscData.buttonDisable = false;
          ifscData.data = res.data.bank_data;
          setIfscData({ ...ifscData });
          toast.success(res.data.message);
        }
      });
    }
  };
  useEffect(() => {
    if (Object.keys(ageErrors).length === 0 && isSubmit) {
      if (onEdit) {
        const param = new FormData();
        param.append("bank_id", userBankId);
        param.append("bank_name", age.bankName);
        param.append("bank_account_name", age.name);
        param.append("bank_account_number", age.bankAccountNumber);
        param.append(
          "confirm_bank_account_number",
          age.confirmbankAccountNumber
        );
        param.append("bank_ifsc", age.iban);
        if (IsApprove !== "") {
          param.append("is_app", IsApprove.is_app);
          param.append("user_id", IsApprove.user_id);
          param.append("auth_key", IsApprove.auth);
        }
        if (sendOtp.otp == true) {
          setAge((prevalue) => {
            return { ...prevalue, isLoader: true };
          });
          param.append("verify_otp", age.otp);
          axios
            .post(`${Url}/ajaxfiles/edit_bank_account_number.php`, param)
            .then((res) => {
              if (res.data.message == "Session has been expired") {
                navigate("/");
              }
              console.log("status", res.data);
              if (res.data.status == "error") {
                toast.error(res.data.message);
                setAge((prevalue) => {
                  return { ...prevalue, isLoader: false };
                });
              } else {
                toast.success(res.data.message);
                fetchUserPref1();
                // setData([...data, age]);
                setSubmitted(true);
                // notify("Bank account created successfully");
                setOption("");
                setSendOtp({
                  otp: false,
                  otpLoder: false,
                  showButton: false,
                });
                setAge((prevalue) => {
                  return { ...prevalue, isLoader: false };
                });
              }
            });
        } else {
          sendOtp.otpLoder = true;
          setSendOtp({ ...sendOtp });
          param.append("action", "bank_edit_otp_request");
          axios
            .post(`${Url}/ajaxfiles/bank_otp_manage.php`, param)
            .then((res) => {
              if (res.data.message == "Session has been expired") {
                navigate("/");
              }
              console.log("status", res.data);
              if (res.data.status == "error") {
                sendOtp.otpLoder = false;
                setSendOtp({ ...sendOtp });
              } else {
                sendOtp.otp = true;
                sendOtp.otpLoder = false;
                sendOtp.showButton = true;
                setSendOtp({ ...sendOtp });
                setTimer({ ...timer });
              }
            });
        }
      } else {
        const param = new FormData();
        param.append("bank_name", age.bankName);
        param.append("bank_account_name", age.name);
        param.append("bank_account_number", age.bankAccountNumber);
        param.append(
          "confirm_bank_account_number",
          age.confirmbankAccountNumber
        );
        param.append("bank_ifsc", age.iban);
        if (IsApprove !== "") {
          param.append("is_app", IsApprove.is_app);
          param.append("user_id", IsApprove.user_id);
          param.append("auth_key", IsApprove.auth);
        }
        if (sendOtp.otp == true) {
          setAge((prevalue) => {
            return { ...prevalue, isLoader: true };
          });
          param.append("verify_otp", age.otp);
          axios
            .post(`${Url}/ajaxfiles/add_bank_account_number.php`, param)
            .then((res) => {
              if (res.data.message == "Session has been expired") {
                navigate("/");
              }
              console.log("status", res.data);
              if (res.data.status == "error") {
                toast.error(res.data.message);
                setAge((prevalue) => {
                  return { ...prevalue, isLoader: "" };
                });
              } else {
                toast.success(res.data.message);
                fetchUserPref1();
                // setData([...data, age]);
                setSubmitted(true);
                // notify("Bank account created successfully");
                setOption("");
                setSendOtp({
                  otp: false,
                  otpLoder: false,
                  showButton: false,
                });
                setAge((prevalue) => {
                  return { ...prevalue, isLoader: false };
                });
              }
            });
        } else {
          sendOtp.otpLoder = true;
          setSendOtp({ ...sendOtp });
          param.append("action", "bank_add_otp_request");
          axios
            .post(`${Url}/ajaxfiles/bank_otp_manage.php`, param)
            .then((res) => {
              if (res.data.message == "Session has been expired") {
                navigate("/");
              }
              console.log("status", res.data);
              if (res.data.status == "error") {
                sendOtp.otpLoder = false;
                toast.error(res.data.message);
                setSendOtp({ ...sendOtp });
              } else {
                sendOtp.otp = true;
                sendOtp.otpLoder = false;
                sendOtp.showButton = true;
                setSendOtp({ ...sendOtp });
                setTimer({ ...timer });
                toast.success(res.data.message);
              }
            });
        }
      }
    }
  }, [ageErrors, isSubmit]);
  console.log("data", data);
  const submit = () => {
    console.log(submitted);
    if (data) {
      return (
        <Grid
          item
          md={12}
          className="d-flex pb-0 position-relative"
          style={{ paddingLeft: "-12px", overflowY: "auto" }}
        >
          <Paper
            elevation={0}
            style={{ borderRadius: "10px" }}
            className="w-100 mb-5"
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Account Holder Name</TableCell>
                  <TableCell align="center">Beneficiary Bank Name</TableCell>
                  <TableCell align="center">Account Number</TableCell>
                  <TableCell align="center">IFSC/IBAN</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      {item.bank_account_holder_name}
                    </TableCell>
                    <TableCell align="center">{item.bank_name}</TableCell>
                    <TableCell align="center">
                      {item.bank_account_number}
                    </TableCell>
                    <TableCell align="center">{item.bank_ifsc}</TableCell>
                    <TableCell align="center">
                      <Button
                        className="cursor-pointer p-0 p-md-2 rounded-circle text-muted"
                        onClick={handleClickOpen("paper", item.user_bank_id)}
                      >
                        <DeleteIcon sx={{ color: "red" }} />
                      </Button>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        // aria-labelledby="alert-dialog-title"
                        // aria-describedby="alert-dialog-description"
                        style={{
                          opacity: "1",
                          transition:
                            "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                        }}
                        PaperProps={{
                          sx: {
                            width: "100%",
                            maxWidth: "768px",
                            borderRadius: "10px",
                            elevation: "24",
                            class: "border border-bottom-0",
                          },
                        }}
                      >
                        <DialogTitle
                          id="alert-dialog-title"
                          className="d-flex align-items-center p-3"
                        >
                          <h5 className="w-100 text-center text-primary mt-2 mb-2 font-weight-bold">
                            Are you sure you want to delete bank account?
                          </h5>
                          <CloseIcon
                            onClick={() => {
                              setOpen(false);
                            }}
                          />
                        </DialogTitle>
                        <div className="divider d-none"></div>
                        <DialogContent className="pb-2 pt-2">
                          <div className="p-3 text-center">
                            <Button
                              onClick={handleClose}
                              size="medium"
                              className="mr-3 bg-white text-dark p-3 pr-4 pl-4 text-center text-capitalize"
                              variant="contained"
                            >
                              Cancel
                            </Button>
                            {age.isLoader ? (
                              <Button
                                tabindex="0"
                                size="large"
                                className="deletebankLoder"
                                disabled
                              >
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
                              </Button>
                            ) : (
                              <Button
                                type="submit"
                                onClick={handleDelete}
                                size="medium"
                                className="m-auto p-3 pr-4 pl-4 text-center text-capitalize"
                                variant="contained"
                                autoFocus
                              >
                                Delete
                              </Button>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      <a href="/bankAccounts#bankDetails">
                        <Button
                          type="submit"
                          className="cursor-pointer mx-3 p-0 p-md-2 rounded-circle text-muted"
                          onClick={handleEdit(item)}
                        >
                          <CreateIcon sx={{ color: "#3D9730" }} />
                        </Button>
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div id="bankDetails"></div>
          </Paper>
        </Grid>
      );
    }
  };

  const checkValidation = (value) => {
    if (value == "") {
      return true;
    }
    return false;
  };

  const getErrorMessage = (value, message = "") => {
    if (value == "") {
      return message;
    } else if (
      !value.match(/[A-Z]/g) ||
      !value.match(/[a-z]/g) ||
      !value.match(/[0-9]/g) ||
      !value.match(/[!@#$%^&*()_+=]/g)
    ) {
      return "Atleast one lower case, upper case and number and special characters required";
    } else if (value.length <= 8) {
      return "Password must contain atleast 8 characters";
    }
  };

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          {mainLoader == true ? (
            <div className="loader1">
              <div className="clock">
                <div className="pointers"></div>
              </div>
            </div>
          ) : (
            <div style={{ opacity: 1 }}>
              <Grid container>
                <Grid item sm={12}></Grid>
                <Grid item xl={1}></Grid>
                <Grid item xl={10} md={12} lg={12}>
                  {/* <TopButton /> */}
                  <Grid container>
                    <Grid item md={12}>
                      <Paper
                        elevation={1}
                        style={{ borderRadius: "10px", alignItems: "center" }}
                        className="w-100 mb-5"
                      >
                        <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                          <h5 className="font-weight-bold mb-0 text-dark">
                            My Bank Accounts
                          </h5>
                        </div>
                        <div className="divider"></div>
                        <div className="card-body position-relative pt-0 pb-5">
                          <Grid container spacing={3}>
                            <Grid
                              item
                              md={12}
                              className="d-flex pb-0 position-relative"
                            >
                              <div className="cust-select py-3 pr-2 w-100">
                                <h5 className="font-weight-bold text-info">
                                  BANK INFORMATION
                                </h5>
                              </div>
                              <a href="/bankAccounts#bankDetails">
                                <div
                                  className="add-bank-button pt-3 text-center"
                                  style={{ width: "150px", cursor: "pointer" }}
                                  onClick={() => {
                                    setOption(true);
                                    setAge({
                                      name: "",
                                      bankName: "",
                                      iban: "",
                                      bankAccountNumber: "",
                                      otp: "",
                                      confirmbankAccountNumber: "",
                                      ibanselect: "IFSC",
                                    });
                                    setinfoTrue({
                                      name: false,
                                      bankName: false,
                                      bankAccountNumber: false,
                                      confirmbankAccountNumber: false,
                                      iban: false,
                                      otp: false,
                                      ibanselect: false,
                                    });
                                    setSendOtp({
                                      otp: false,
                                      otpLoder: false,
                                      showButton: false,
                                    });
                                    setIfscData({
                                      data: "",
                                      isLoader: false,
                                      buttonDisable: true,
                                    });
                                    setOnEdit(false);
                                  }}
                                >
                                  <AccountBalanceIcon
                                    style={{
                                      fontSize: "35px",
                                      color: "#00008b",
                                    }}
                                  />

                                  <p className="d-md-block">Add Bank Info</p>
                                </div>
                              </a>
                            </Grid>
                            <hr className="mt-0 ml-2"></hr>
                            {submit()}
                          </Grid>
                        </div>
                      </Paper>
                    </Grid>
                    {option && (
                      <Grid item md={12} className="d-flex">
                        <Paper
                          elevation={1}
                          style={{ borderRadius: "10px" }}
                          className="w-100"
                        >
                          <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                            <h5 className="font-weight-bold mb-0 text-dark">
                              Add/Edit Bank Account
                            </h5>
                          </div>
                          <div className="divider"></div>
                          <div className="card-body position-relative pt-0">
                            <Grid container spacing={6}>
                              <Grid item md={12}>
                                <form onSubmit={handleSubmit}>
                                  <div className="my-4">
                                    <Grid container spacing={3}>
                                      <Grid item md={6}>
                                        <FormControl
                                          className="w-100"
                                          error={age.name == "" ? true : false}
                                        >
                                          <div className="font-weight-bold mb-2">
                                            Account Holder Name
                                          </div>
                                          <BootstrapInput
                                            value={age.name}
                                            name="name"
                                            // sx={{ border: "2px solid #DF4957" }}
                                            // className="is-invalid"
                                            onChange={(e) => {
                                              if (
                                                e.target.value === "" ||
                                                re.test(e.target.value) ||
                                                e.target.value === " "
                                              ) {
                                                console.log("ok right");
                                                handleChange(e);
                                              }
                                            }}
                                            // onChange={handleChange}
                                            displayempty
                                            inputProps={{
                                              "aria-label": "Without label",
                                            }}
                                            onBlur={trueFalse}
                                          />
                                          {/* <div className="invalid-tooltip">
                                            First name is required
                                          </div> */}
                                          {age.name == "" &&
                                          infoTrue.name == true ? (
                                            <FormHelperText>
                                              Please Enter Account Holder Name
                                            </FormHelperText>
                                          ) : (
                                            ""
                                          )}
                                        </FormControl>
                                      </Grid>
                                      <Grid item md={6}>
                                        <FormControl
                                          className="w-100"
                                          error={
                                            age.bankName == "" ? true : false
                                          }
                                        >
                                          <div className="font-weight-bold mb-2">
                                            Beneficiary Bank Name
                                          </div>
                                          <BootstrapInput
                                            value={age.bankName}
                                            name="bankName"
                                            onChange={(e) => {
                                              if (
                                                e.target.value === "" ||
                                                re.test(e.target.value) ||
                                                e.target.value === " "
                                              ) {
                                                console.log("ok right");
                                                handleChange(e);
                                              }
                                            }}
                                            displayempty
                                            inputProps={{
                                              "aria-label": "Without label",
                                            }}
                                            onBlur={trueFalse}
                                          />
                                          {age.bankName == "" &&
                                          infoTrue.bankName == true ? (
                                            <FormHelperText>
                                              Please Enter Beneficiary Bank Name
                                            </FormHelperText>
                                          ) : (
                                            ""
                                          )}
                                        </FormControl>
                                      </Grid>
                                      <Grid item md={12}></Grid>

                                      <Grid item md={6}>
                                        <FormControl
                                          className="w-100"
                                          error={
                                            age.bankAccountNumber == ""
                                              ? true
                                              : false
                                          }
                                        >
                                          <div className="font-weight-bold mb-2">
                                            Bank Account Number
                                          </div>
                                          <BootstrapInput
                                            type="text"
                                            value={age.bankAccountNumber}
                                            name="bankAccountNumber"
                                            onChange={(e) => {
                                              if (
                                                !isNaN(Number(e.target.value))
                                              ) {
                                                handleChange(e);
                                              }
                                            }}
                                            displayempty
                                            inputProps={{
                                              "aria-label": "Without label",
                                            }}
                                            onBlur={trueFalse}
                                          />
                                          {age.bankAccountNumber == "" &&
                                          infoTrue.bankAccountNumber ? (
                                            <FormHelperText>
                                              Please Enter Bank Account Number
                                            </FormHelperText>
                                          ) : (
                                            ""
                                          )}
                                        </FormControl>
                                      </Grid>
                                      <Grid item md={6}>
                                        <FormControl
                                          className="w-100"
                                          error={
                                            age.confirmbankAccountNumber == ""
                                              ? true
                                              : false
                                          }
                                        >
                                          <div className="font-weight-bold mb-2">
                                            Confirm Bank Account Number
                                          </div>
                                          <BootstrapInput
                                            type="text"
                                            value={age.confirmbankAccountNumber}
                                            name="confirmbankAccountNumber"
                                            onChange={(e) => {
                                              if (
                                                !isNaN(Number(e.target.value))
                                              ) {
                                                handleChange(e);
                                              }
                                            }}
                                            displayempty
                                            inputProps={{
                                              "aria-label": "Without label",
                                            }}
                                            onBlur={trueFalse}
                                          />
                                          {(age.confirmbankAccountNumber ==
                                            "" &&
                                            infoTrue.confirmbankAccountNumber ==
                                              true) ||
                                          age.confirmbankAccountNumber !=
                                            age.bankAccountNumber ? (
                                            <FormHelperText>
                                              {age.confirmbankAccountNumber ==
                                              ""
                                                ? "Please Enter Confirm Bank AccountNumber"
                                                : "Bank Account Number must match"}
                                            </FormHelperText>
                                          ) : (
                                            ""
                                          )}
                                        </FormControl>
                                      </Grid>
                                      <Grid
                                        item
                                        // md={age.ibanselect == "IFSC" ? 4 : 6}
                                        md={6}
                                      >
                                        <FormControl
                                          className="w-100"
                                          error={age.iban == "" ? true : false}
                                        >
                                          <div className="">
                                            <FormControl>
                                              <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue="IFSC"
                                                value={age.ibanselect}
                                                name="ibanselect"
                                                sx={{ display: "block" }}
                                                onChange={handleChange}
                                              >
                                                <FormControlLabel
                                                  value="IFSC"
                                                  control={<Radio />}
                                                  label="IFSC"
                                                />
                                                <FormControlLabel
                                                  value="IBAN"
                                                  control={<Radio />}
                                                  label="IBAN"
                                                />
                                                <FormControlLabel
                                                  value="SWIFT"
                                                  control={<Radio />}
                                                  label="SWIFT"
                                                />
                                              </RadioGroup>
                                            </FormControl>
                                          </div>
                                          <div className="d-flex">
                                            <BootstrapInput
                                              value={age.iban}
                                              name="iban"
                                              onChange={(e) => {
                                                const res =
                                                  e.target.value.replace(
                                                    / /g,
                                                    ""
                                                  );
                                                age.iban = res.toUpperCase();
                                                setAge({ ...age });
                                              }}
                                              displayempty
                                              inputProps={{
                                                "aria-label": "Without label",
                                              }}
                                              onBlur={trueFalse}
                                              sx={
                                                age.ibanselect == "IFSC"
                                                  ? { width: "75%" }
                                                  : { width: "100%" }
                                              }
                                            />

                                            {age.ibanselect == "IFSC" ? (
                                              <>
                                                {ifscData.isLoader == true ? (
                                                  <ColorButton
                                                    // className="mb-2 resveributton"
                                                    disabled
                                                    // style={{
                                                    //   padding: "21px 52px",
                                                    // }}
                                                    sx={{
                                                      padding: 0,
                                                      width: "30%",
                                                      marginLeft: "10px",
                                                    }}
                                                  >
                                                    <svg
                                                      class="spinner"
                                                      viewBox="0 0 50 50"
                                                    >
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
                                                  <ColorButton
                                                    // className="mb-2 resveributton"
                                                    onClick={checkIfscCode}
                                                    sx={{
                                                      padding: 0,
                                                      width: "35%",
                                                      marginLeft: "10px",
                                                    }}
                                                  >
                                                    Verify Code
                                                  </ColorButton>
                                                )}
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                          {age.iban == "" &&
                                          infoTrue.iban == true ? (
                                            <FormHelperText>
                                              Please Enter {age.ibanselect}
                                            </FormHelperText>
                                          ) : (
                                            ""
                                          )}
                                          {ifscData.data == "" ? (
                                            ""
                                          ) : (
                                            <>
                                              <p style={{ margin: "0" }}>
                                                <span className="text-info font-weight-bold ">
                                                  Bank Name :
                                                </span>
                                                {ifscData.data.BANK}
                                              </p>
                                              <p style={{ margin: "0" }}>
                                                <span className="text-info font-weight-bold ">
                                                  Branch Name :
                                                </span>
                                                {ifscData.data.BRANCH}
                                              </p>
                                              <p>
                                                <span className="text-info font-weight-bold ">
                                                  Branch Address :
                                                </span>
                                                {`${ifscData.data.ADDRESS}`}
                                              </p>
                                            </>
                                          )}
                                        </FormControl>
                                      </Grid>
                                      {/* {age.ibanselect == "IFSC" ? (
                                        <Grid
                                          item
                                          md={2}
                                          sx={{ marginTop: "30px" }}
                                          style={{ paddingTop: "0px" }}
                                        >
                                          {ifscData.isLoader == true ? (
                                            <ColorButton
                                              className="mb-2 resveributton"
                                              disabled
                                              style={{ padding: "21px 52px" }}
                                            >
                                              <svg
                                                class="spinner"
                                                viewBox="0 0 50 50"
                                              >
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
                                            <ColorButton
                                              className="mb-2 resveributton"
                                              onClick={checkIfscCode}
                                            >
                                              Verify Code
                                            </ColorButton>
                                          )}
                                        </Grid>
                                      ) : (
                                        ""
                                      )} */}
                                      {sendOtp.showButton ? (
                                        <Grid item md={6}>
                                          <FormControl
                                            className="w-100"
                                            error={age.otp == "" ? true : false}
                                          >
                                            <div
                                              style={{
                                                margin: " 9px !important",
                                              }}
                                              className="font-weight-bold margin-9"
                                            >
                                              OTP
                                            </div>
                                            <BootstrapInput
                                              type="text"
                                              value={age.otp}
                                              onBlur={trueFalse}
                                              name="otp"
                                              onChange={(e) => {
                                                if (
                                                  !isNaN(Number(e.target.value))
                                                ) {
                                                  handleChange(e);
                                                }
                                              }}
                                              displayempty
                                              inputProps={{
                                                "aria-label": "Without label",
                                              }}
                                            />
                                            {age.otp == "" &&
                                            infoTrue.otp == true ? (
                                              <FormHelperText>
                                                Please Enter OTP
                                              </FormHelperText>
                                            ) : (
                                              ""
                                            )}
                                          </FormControl>
                                        </Grid>
                                      ) : (
                                        ""
                                      )}
                                    </Grid>
                                  </div>
                                  <div className="mb-4 pt-2 text-center">
                                    {sendOtp.showButton ? (
                                      age.isLoader == true ? (
                                        <ColorButton
                                          className=""
                                          sx={{ padding: "22px 62px" }}
                                          disabled
                                        >
                                          <svg
                                            class="spinner"
                                            viewBox="0 0 50 50"
                                          >
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
                                        <ColorButton
                                          className=""
                                          disabled={
                                            ifscData.buttonDisable &&
                                            age.ibanselect == "IFSC"
                                          }
                                          onClick={() => {
                                            sendOtp.otp = true;
                                            setSendOtp({ ...sendOtp });
                                          }}
                                          type="submit"
                                        >
                                          Verify OTP
                                        </ColorButton>
                                      )
                                    ) : (
                                      ""
                                    )}
                                    {sendOtp.otpLoder == true ? (
                                      <ColorButton
                                        className=""
                                        sx={{
                                          marginLeft: "10px",
                                          padding: "22px 62px",
                                        }}
                                        disabled
                                      >
                                        <svg
                                          class="spinner"
                                          viewBox="0 0 50 50"
                                        >
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
                                      <ColorButton
                                        className=""
                                        sx={{ marginLeft: "10px" }}
                                        disabled={
                                          (ifscData.buttonDisable &&
                                            age.ibanselect == "IFSC") ||
                                          (timer && sendOtp.showButton)
                                        }
                                        onClick={() => {
                                          sendOtp.otp = false;
                                          setSendOtp({ ...sendOtp });
                                        }}
                                        type="submit"
                                      >
                                        {sendOtp.showButton ? (
                                          timer ? (
                                            <Counter
                                              reset={timer}
                                              setReset={setTimer}
                                            />
                                          ) : (
                                            "Resend OTP"
                                          )
                                        ) : (
                                          "Send OTP"
                                        )}
                                        {}
                                      </ColorButton>
                                    )}
                                  </div>
                                </form>
                              </Grid>
                            </Grid>
                          </div>
                        </Paper>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BankAccountp;
