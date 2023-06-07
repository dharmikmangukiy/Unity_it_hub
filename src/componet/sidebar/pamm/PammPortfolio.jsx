import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tab,
  Tabs,
  Typography,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Tooltip,
  Zoom,
  useMediaQuery,
  FormHelperText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  BootstrapInput,
  ColorButton,
} from "../../customComponet/CustomElement";
import TopButton from "../../customComponet/TopButton";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { IsApprove, Url } from "../../../global";
import CommonTable from "../../customComponet/CommonTable";
import "./pamm.css";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";
import { useTheme } from "@emotion/react";
import SwipeableViews from "react-swipeable-views";
import { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Toast from "../../commonComponet/Toast";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
function MyComponent() {
  const matches = useMediaQuery("(min-width:600px)");

  return matches;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 60,
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      className="panding-left-right-0 tabpanel"
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const GreenButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#ff0000"),
  backgroundColor: "#3D9730",
  textTransform: "initial",
  fontSize: "13px",
  padding: "15px 22px",
  "&:hover": {
    backgroundColor: "#068017",
  },
}));

const PammPortfolio = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [invebutton, setinvebutton] = useState({
    button: false,
  });

  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("sm");
  const [value, setValue] = useState(0);
  var [data, setData] = useState({});
  var [param, setParam] = useState({
    action: "my_portfolios",
  });
  const [refreshCreatePortfolio1, SetRefreshCreatePortfolio1] = useState(false);
  const [infoTrue, setinfoTrue] = useState({
    portfolio_name: false,
    mm_mt5_acc_id: false,
    investment_months: false,
  });
  const [pid, setPid] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [createPortfolioForm, setCreatePortfolioForm] = useState({
    isLoader: false,
    portfolio_name: "",
    mm_mt5_acc_id: "",
    investment_months: "",
  });
  const [investmentForm, setInvestmentForm] = useState({
    isLoader: false,
    user_id: "",
    pid: "",
    amount: "",
  });
  var [moneyManagerList, setMoneyManagerList] = useState([]);
  var [moneyManagerListMenu, setMoneyManagerListMenu] = useState([]);

  var [myPortfolio, setMyPortfolio] = useState([]);
  var [portfolioLoader, setPortfolioLoader] = useState(true);
  const [filterData, setFilterData] = useState({});
  const [walletbalance, setwalletbalance] = useState("");
  const [withdrawForm, setWithdrawForm] = useState({
    isLoader: false,
    allWithdraw: true,
    amount: "",
    pid: "",
  });
  const trueFalse1 = (event) => {
    var { name, value } = event.target;
    setinfoTrue((prevalue) => {
      return {
        ...prevalue,
        [name]: true,
      };
    });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue == 1) {
      getMyPortfolio();
    }
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const walletbalancefun = () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("action", "get_wallet_balance");
    axios.post(Url + "/ajaxfiles/common_api.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      setwalletbalance(res.data.wallet_balance);
    });
  };
  const trueFalse = () => {
    if (investmentForm.amount > walletbalance) {
      invebutton.button = true;
      setinvebutton({ ...invebutton });
      Toast(
        "error",
        "Your wallet balance is low, if you want to invest same amount then please make a deposit"
      );
    } else {
      invebutton.button = false;
      setinvebutton({ ...invebutton });
    }
  };
  const manageContent = () => {
    if (dialogTitle == "Create Portfolio") {
      return (
        <div>
          <div>
            <TextField
              error={
                createPortfolioForm.portfolio_name == "" &&
                infoTrue.portfolio_name
                  ? true
                  : false
              }
              className="input-font-small"
              label="Name"
              variant="standard"
              value={createPortfolioForm.portfolio_name}
              onChange={createPortfolioInput}
              sx={{ width: "100%" }}
              name="portfolio_name"
              onBlur={trueFalse1}
              helperText={
                createPortfolioForm.portfolio_name == "" &&
                infoTrue.portfolio_name == true
                  ? "Please Enter Name"
                  : ""
              }
            />
          </div>
          <br />
          <div>
            <FormControl
              variant="standard"
              sx={{ width: "100%" }}
              error={
                createPortfolioForm.mm_mt5_acc_id == "" &&
                infoTrue.mm_mt5_acc_id == true
                  ? true
                  : false
              }
            >
              <InputLabel>Money Manager</InputLabel>
              <Select
                label
                className="select-font-small"
                name="mm_mt5_acc_id"
                value={createPortfolioForm.mm_mt5_acc_id}
                onChange={createPortfolioInput}
                onBlur={trueFalse1}
              >
                {moneyManagerListMenu.map((item) => {
                  return (
                    <MenuItem value={item.mm_mt5_acc_id}>
                      {item.mt5_name}
                    </MenuItem>
                  );
                })}
              </Select>
              {createPortfolioForm.mm_mt5_acc_id == "" &&
              infoTrue.mm_mt5_acc_id == true ? (
                <FormHelperText>Please Select Money Manager</FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
          </div>
          <br />
          <div>
            <TextField
              error={
                createPortfolioForm.investment_months == "" &&
                infoTrue.investment_months
                  ? true
                  : false
              }
              className="input-font-small"
              label="Investment Duration (Months)"
              type="text"
              value={createPortfolioForm.investment_months}
              variant="standard"
              onChange={(e) => {
                if (!isNaN(Number(e.target.value))) {
                  createPortfolioInput(e);
                }
              }}
              sx={{ width: "100%" }}
              name="investment_months"
              onBlur={trueFalse1}
              helperText={
                createPortfolioForm.investment_months == "" &&
                infoTrue.investment_months
                  ? "Please Enter Investment Duration (Months)"
                  : ""
              }
            />
          </div>
        </div>
      );
    } else if (dialogTitle == "Investment") {
      return (
        <div>
          <div>
            <Grid container spacing={3}>
              <Grid item md={7.5}>
                <TextField
                  className="input-font-small"
                  label="Wallet Balance"
                  variant="standard"
                  value={`$${walletbalance}`}
                  sx={{ width: "100%" }}
                  name="amount"
                  disabled
                />
              </Grid>
              <Grid item md={4.5}>
                {/* <ColorButton>Add Deposit</ColorButton> */}
                <Button
                  variant="contained"
                  disabled={!invebutton.button}
                  className="btn-gradient btn-success"
                  onClick={() => {
                    navigate("/deposit");
                  }}
                >
                  Add Deposit To Wallet
                </Button>
              </Grid>
            </Grid>
          </div>
          <br />
          <div>
            <TextField
              className="input-font-small"
              label="Amount"
              type="text"
              name="amount"
              onBlur={trueFalse}
              value={investmentForm.amount}
              variant="standard"
              onChange={(e) => {
                if (!isNaN(Number(e.target.value))) {
                  investmentInput(e);
                }
              }}
              sx={{ width: "100%" }}
            />
          </div>
        </div>
      );
    } else if (dialogTitle == "Withdraw") {
      return (
        <div>
          <div>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name="allWithdraw"
                    checked={withdrawForm.allWithdraw}
                    onChange={withdrawInput}
                  />
                }
                label="All Withdraw"
              />
            </FormGroup>
          </div>
          <div>
            <TextField
              className="input-font-small"
              label="Amount"
              type="text"
              onChange={(e) => {
                if (!isNaN(Number(e.target.value))) {
                  withdrawInput(e);
                }
              }}
              variant="standard"
              sx={{ width: "100%" }}
              name="amount"
              disabled={withdrawForm.allWithdraw}
              value={withdrawForm.allWithdraw ? 0 : withdrawForm.amount}
            />
          </div>
        </div>
      );
    } else if (dialogTitle == "Trade History") {
      return (
        <div>
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item sm={12}></Grid>
              <Grid item xl={1}></Grid>
              <Grid item md={12} lg={12} xl={10}>
                <Paper
                  elevation={2}
                  style={{ borderRadius: "10px" }}
                  className="pending-all-15px"
                >
                  <Grid container spacing={2}>
                    <Grid item sm={6} md={3}>
                      <FormControl fullWidth={true}>
                        <label className="small font-weight-bold text-dark">
                          From
                        </label>
                        <BootstrapInput
                          type="date"
                          onChange={(e) => {
                            filterData.start_date = e.target.value;
                            setFilterData({ ...filterData });
                          }}
                        ></BootstrapInput>
                      </FormControl>
                    </Grid>
                    <Grid item sm={6} md={3}>
                      <FormControl fullWidth={true}>
                        <label className="small font-weight-bold text-dark">
                          To
                        </label>
                        <BootstrapInput
                          type="date"
                          onChange={(e) => {
                            filterData.end_date = e.target.value;
                            setFilterData({ ...filterData });
                          }}
                        ></BootstrapInput>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Paper>
                <br />
                <Paper
                  elevation={2}
                  style={{ borderRadius: "10px" }}
                  className="pending-all-15px"
                >
                  <CommonTable
                    url={`${Url}/datatable/pamm/pamm_trade_history.php`}
                    column={column}
                    sort="2"
                    param={filterData}
                  />
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      );
    } else if (dialogTitle == "Risk Score") {
      return (
        <div>
          <table className="tableforriskscroe w-100">
            <thead>
              <tr>
                <th>Risk</th>
                <th>Risk Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>10%</td>
              </tr>
              <tr>
                <td>2</td>
                <td>20%</td>
              </tr>{" "}
              <tr>
                <td>3</td>
                <td>30%</td>
              </tr>{" "}
              <tr>
                <td>4</td>
                <td>40%</td>
              </tr>{" "}
              <tr>
                <td>5</td>
                <td>50%</td>
              </tr>{" "}
              <tr>
                <td>6</td>
                <td>60%</td>
              </tr>{" "}
              <tr>
                <td>7</td>
                <td>70%</td>
              </tr>
              <tr>
                <td>8</td>
                <td>80%</td>
              </tr>{" "}
              <tr>
                <td>9</td>
                <td>90%</td>
              </tr>{" "}
              <tr>
                <td>10</td>
                <td>100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  };

  const manageDialogActionButton = () => {
    if (dialogTitle == "Create Portfolio") {
      return (
        <div className="dialogMultipleActionButton">
          <Button
            variant="contained"
            className="cancelButton"
            onClick={handleClose}
          >
            Cancel
          </Button>

          {createPortfolioForm.isLoader ? (
            <Button
              tabindex="0"
              size="large"
              className=" btn-gradient  btn-success createMt5Formloder"
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
              variant="contained"
              className="btn-gradient btn-success"
              onClick={createPortfolioFormSubmit}
            >
              Create
            </Button>
          )}
        </div>
      );
    } else if (dialogTitle == "Investment") {
      return (
        <div className="dialogMultipleActionButton">
          <Button
            variant="contained"
            className="cancelButton"
            onClick={handleClose}
          >
            Cancel
          </Button>

          {investmentForm.isLoader ? (
            <Button
              tabindex="0"
              size="large"
              className=" btn-gradient  btn-success createMt5Formloder"
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
              variant="contained"
              disabled={invebutton.button}
              className="btn-gradient btn-success"
              onClick={investmentFormSubmit}
            >
              Invest
            </Button>
          )}
        </div>
      );
    } else if (dialogTitle == "Withdraw") {
      return (
        <div className="dialogMultipleActionButton">
          <Button
            variant="contained"
            className="cancelButton"
            onClick={handleClose}
          >
            Cancel
          </Button>

          {withdrawForm.isLoader ? (
            <Button
              tabindex="0"
              size="large"
              className=" btn-gradient  btn-success createMt5Formloder"
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
              variant="contained"
              className="btn-gradient btn-success"
              onClick={withdrawFormSubmit}
            >
              Submit
            </Button>
          )}
        </div>
      );
    } else if (dialogTitle == "Risk Score") {
      return (
        <div className="dialogMultipleActionButton">
          <Button
            variant="contained"
            className="cancelButton"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      );
    }
  };

  const createPortfolioInput = (e) => {
    const { name, value } = e.target;

    setCreatePortfolioForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const investmentInput = (e) => {
    const { name, value } = e.target;

    setInvestmentForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const withdrawInput = (e) => {
    var { name, value } = e.target;

    if (e.target.getAttribute) {
      if (e.target.getAttribute("type") == "checkbox") {
        value = e.target.checked;
      }
    }

    setWithdrawForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const createPortfolioFormSubmit = () => {
    if (createPortfolioForm.portfolio_name == "") {
      Toast("error", "Please enter portfolio name");
    } else if (createPortfolioForm.mm_mt5_acc_id == "") {
      Toast("error", "Please select money manager");
    } else if (createPortfolioForm.investment_months == "") {
      Toast("error", "Please enter investment month");
    } else {
      createPortfolioForm.isLoader = true;
      setCreatePortfolioForm({ ...createPortfolioForm });
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      param.append("portfolio_name", createPortfolioForm.portfolio_name);
      param.append("mm_mt5_acc_id", createPortfolioForm.mm_mt5_acc_id);
      param.append("investment_months", createPortfolioForm.investment_months);
      param.append("action", "create_portfolio");
      axios
        .post(Url + "/ajaxfiles/pamm/portfolio_manage.php", param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            localStorage.setItem("login", true);
            navigate("/");
          }
          createPortfolioForm.isLoader = false;
          setCreatePortfolioForm({ ...createPortfolioForm });
          if (res.data.status == "error") {
            Toast("error", res.data.message);
          } else {
            getMyPortfolio();
            Toast("success", res.data.message);
            setRefresh(!refresh);
            setOpen(false);
          }
        });
    }
  };

  const investmentFormSubmit = () => {
    if (investmentForm.pid == "") {
      Toast("error", "Please enter pid");
    } else if (investmentForm.amount == "") {
      Toast("error", "Please enter amount");
    } else {
      investmentForm.isLoader = true;
      setInvestmentForm({ ...investmentForm });
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      param.append("pid", investmentForm.pid);
      param.append("amount", investmentForm.amount);
      param.append("action", "add_investment");
      axios
        .post(Url + "/ajaxfiles/pamm/portfolio_manage.php", param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            localStorage.setItem("login", true);
            navigate("/");
          }
          investmentForm.isLoader = false;
          setInvestmentForm({ ...investmentForm });
          if (res.data.status == "error") {
            Toast("error", res.data.message);
          } else {
            Toast("success", res.data.message);
            setOpen(false);
            setInvestmentForm({
              user_id: "",
              isLoader: false,
              pid: "",
              amount: "",
            });
            getMyPortfolio();
          }
        });
    }
  };

  const withdrawFormSubmit = () => {
    if (withdrawForm.amount == "" && !withdrawForm.allWithdraw) {
      Toast("error", "Please enter amount");
    } else {
      withdrawForm.isLoader = true;
      setWithdrawForm({ ...withdrawForm });
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      param.append("pid", withdrawForm.pid);
      param.append(
        "amount",
        withdrawForm.allWithdraw ? 0 : withdrawForm.amount
      );
      param.append("withdraw_all", withdrawForm.allWithdraw ? 1 : 0);
      param.append("action", "withdraw_request");
      axios
        .post(Url + "/ajaxfiles/pamm/portfolio_manage.php", param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            localStorage.setItem("login", true);
            navigate("/");
          }
          withdrawForm.isLoader = false;
          setWithdrawForm({ ...withdrawForm });
          if (res.data.status == "error") {
            Toast("error", res.data.message);
          } else {
            if (refreshCreatePortfolio1) {
              getMoneyManager();
            } else {
              getMyPortfolio();
            }
            Toast("success", res.data.message);
            setOpen(false);

            setWithdrawForm({
              user_id: "",
              isLoader: false,
              pid: "",
              amount: "",
            });
          }
        });
    }
  };

  const column = [
    {
      name: "PORTFOLIO ID",
      selector: (row) => {
        return <span title={row.portfolio_id}>{row.portfolio_id}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "PORTFOLIO NAME",
      selector: (row) => {
        return <span title={row.portfolio_name}>{row.portfolio_name}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "ACCOUNT NAME",
      selector: (row) => {
        return <span title={row.account_name}>{row.account_name}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "DATETIME",
      selector: (row) => {
        return <span title={row.added_datetime}>{row.added_datetime}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => {
        return (
          <div>
            <Button
              onClick={(e) => {
                investmentForm.user_id = row.mm_user_id;
                investmentForm.pid = row.pid;
                investmentForm.amount = "";
                setInvestmentForm({
                  ...investmentForm,
                });
                setDialogTitle("Investment");
                setOpen(true);
              }}
            >
              <i className="material-icons">currency_exchange</i>
            </Button>
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  const getMoneyManager = () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("action", "money_manager_accounts");
    axios
      .post(Url + "/ajaxfiles/pamm/portfolio_manage.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        if (res.data.status == "error") {
          Toast("error", res.data.message);
        } else {
          moneyManagerList = res.data.data;
          setMoneyManagerList([...moneyManagerList]);
        }
      });
  };
  const getMoneyManagerList = () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("action", "available_money_manager");

    axios
      .post(Url + "/ajaxfiles/pamm/portfolio_manage.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        if (res.data.status == "error") {
          Toast("error", res.data.message);
        } else {
          moneyManagerListMenu = res.data.data;
          setMoneyManagerListMenu([...moneyManagerListMenu]);
        }
      });
  };

  const getMyPortfolio = () => {
    setPortfolioLoader(true);
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("action", "my_portfolios");
    axios
      .post(Url + "/ajaxfiles/pamm/portfolio_manage.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        setPortfolioLoader(false);
        if (res.data.status == "error") {
          Toast("error", res.data.message);
        } else {
          myPortfolio = res.data.data;
          setMyPortfolio([...myPortfolio]);
        }
      });
  };

  useEffect(() => {
    getMoneyManager();
  }, [refresh]);

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

                <Grid container spacing={6}>
                  <Grid item md={12}>
                    <h4 className="font-weight-bold mb-3">Pamm Portfolio</h4>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      variant="scrollable"
                      scrollButtons="auto"
                      aria-label="scrollable auto tabs example"
                      className="tabsBar"
                    >
                      <Tab label="MONEY MANAGER" />
                      <Tab label="MY PORTFOLIO" />
                    </Tabs>
                    <SwipeableViews
                      axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                      index={value}
                      onChangeIndex={handleChangeIndex}
                    >
                      <TabPanel value={value} index={0} dir={theme.direction}>
                        <div className="money-manager-card-list-section">
                          {moneyManagerList.map((item, index) => {
                            return (
                              <div className="money-manager-content">
                                <div className="money-manager-header-section">
                                  <NavLink
                                    className="navlink-color-white"
                                    to={`/money_manager_profile/${item.mm_mt5_acc_id}`}
                                  >
                                    <label>{item.mt5_name}</label>
                                  </NavLink>
                                  {/* <p>Our most popular account.</p> */}
                                </div>
                                <div className="money-manager-body-section">
                                  {/* <div className="money-manager-body-content-element">
                                      <label>Minimum deposit</label>
                                      <p>${item.minimum_deposit_amount}</p>
                                    </div>
                                    <div className="money-manager-body-content-element">
                                      <label>Fees Percentage</label>
                                      <p>${item.fees_percentage}</p>
                                    </div> */}
                                  <div className="money-manager-body-content-element marge-element">
                                    <div className="right-side-border">
                                      <label>Minimum deposit</label>
                                      <p>${item.minimum_deposit_amount}</p>
                                    </div>
                                    <div>
                                      <label>Fees Percentage</label>
                                      <p>{item.fees_percentage}%</p>
                                    </div>
                                  </div>
                                  <div className="money-manager-body-content-element marge-element">
                                    <div className="right-side-border">
                                      <label>Approx Return</label>
                                      <p className="text-color-green">
                                        {item.fees_percentage}%
                                      </p>
                                    </div>
                                    <div>
                                      <label>
                                        Risk Score
                                        {/* <CustomWidthTooltip TransitionComponent={Zoom} title={`1 : 10% 2 : 20%  3 : 30%   4 : 40%  5 : 50%  6 : 60%  7 : 70%  8 : 80%  9 : 90%  10:100%`}> */}
                                        <span
                                          className="material-icons icon_pammportfolio"
                                          style={{ color: "#c1c1c1" }}
                                          onClick={() => {
                                            setMaxWidth("xs");
                                            setDialogTitle("Risk Score");
                                            setOpen(true);
                                          }}
                                        >
                                          info
                                        </span>
                                        {/* </CustomWidthTooltip> */}
                                      </label>
                                      <img src="./image/rishScoreLow.jpg" />
                                    </div>
                                  </div>
                                </div>

                                {item.is_closed == "0" ? (
                                  <div className="money-manager-footer-action-section">
                                    <button
                                      className="danger"
                                      onClick={(e) => {
                                        setWithdrawForm({
                                          isLoader: false,
                                          allWithdraw: true,
                                          amount: "",
                                          pid: item.pid,
                                        });
                                        setDialogTitle("Withdraw");
                                        SetRefreshCreatePortfolio1(true);
                                        setOpen(true);
                                      }}
                                    >
                                      Withdraw
                                    </button>
                                    <button
                                      className="success"
                                      onClick={(e) => {
                                        walletbalancefun();
                                        investmentForm.user_id =
                                          item.mm_user_id;
                                        investmentForm.pid = item.pid;
                                        investmentForm.amount = "";
                                        setInvestmentForm({
                                          ...investmentForm,
                                        });
                                        setDialogTitle("Investment");
                                        setOpen(true);
                                      }}
                                    >
                                      Invest
                                    </button>
                                    <NavLink
                                      className="third-view-button"
                                      to={`/money_manager_profile/${item.mm_mt5_acc_id}`}
                                    >
                                      View
                                    </NavLink>
                                  </div>
                                ) : item.is_closed == "2" ? (
                                  <div className="money-manager-footer-action-section">
                                    <button className="skyblue1">
                                      Pending
                                    </button>
                                    <NavLink
                                      className="third-view-button"
                                      to={`/money_manager_profile/${item.mm_mt5_acc_id}`}
                                    >
                                      View
                                    </NavLink>
                                  </div>
                                ) : (
                                  <div className="money-manager-footer-action-section">
                                    <button
                                      className="skyblue"
                                      onClick={(e) => {
                                        setMaxWidth("sm");
                                        createPortfolioForm.mm_mt5_acc_id =
                                          item.mm_mt5_acc_id;
                                        setCreatePortfolioForm({
                                          ...createPortfolioForm,
                                        });
                                        setinfoTrue({
                                          portfolio_name: false,
                                          mm_mt5_acc_id: false,
                                          investment_months: false,
                                        });
                                        setDialogTitle("Create Portfolio");
                                        getMoneyManagerList();
                                        setOpen(true);
                                      }}
                                    >
                                      Create Portfolio
                                    </button>
                                    <NavLink
                                      className="third-view-button"
                                      to={`/money_manager_profile/${item.mm_mt5_acc_id}`}
                                    >
                                      View
                                    </NavLink>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                          {/* <div className="money-manager-content">
                            <div className="money-manager-header-section">
                              <label>Standard</label>
                              <p>Our most popular account.</p>
                            </div>
                            <div className="money-manager-body-section">
                              <div className="money-manager-body-content-element">
                                <label>Minimum deposit</label>
                                <p>Depends on payment system</p>
                              </div>
                              <div className="money-manager-body-content-element">
                                <label>Spread</label>
                                <p>From 0.3</p>
                              </div>
                              <div className="money-manager-body-content-element">
                                <label>Commission</label>
                                <p>No commission</p>
                              </div>
                              <div className="money-manager-body-content-element">
                                <label>Maximum leverage</label>
                                <p>1:Unlimited</p>
                              </div>
                            </div>
                            <div className="money-manager-footer-action-section">
                              <ColorButton>Investment</ColorButton>
                            </div>
                          </div>
                          <div className="money-manager-content">
                            <div className="money-manager-header-section">
                              <label>Standard</label>
                              <p>Our most popular account.</p>
                            </div>
                            <div className="money-manager-body-section">
                              <div className="money-manager-body-content-element">
                                <label>Minimum deposit</label>
                                <p>Depends on payment system</p>
                              </div>
                              <div className="money-manager-body-content-element">
                                <label>Spread</label>
                                <p>From 0.3</p>
                              </div>
                              <div className="money-manager-body-content-element">
                                <label>Commission</label>
                                <p>No commission</p>
                              </div>
                              <div className="money-manager-body-content-element">
                                <label>Maximum leverage</label>
                                <p>1:Unlimited</p>
                              </div>
                            </div>
                            <div className="money-manager-footer-action-section">
                              <ColorButton>Investment</ColorButton>
                            </div>
                          </div>
                          <div className="money-manager-content">
                            <div className="money-manager-header-section">
                              <label>Standard</label>
                              <p>Our most popular account.</p>
                            </div>
                            <div className="money-manager-body-section">
                              <div className="money-manager-body-content-element">
                                <label>Minimum deposit</label>
                                <p>Depends on payment system</p>
                              </div>
                              <div className="money-manager-body-content-element">
                                <label>Spread</label>
                                <p>From 0.3</p>
                              </div>
                              <div className="money-manager-body-content-element">
                                <label>Commission</label>
                                <p>No commission</p>
                              </div>
                              <div className="money-manager-body-content-element">
                                <label>Maximum leverage</label>
                                <p>1:Unlimited</p>
                              </div>
                            </div>
                            <div className="money-manager-footer-action-section">
                              <ColorButton>Investment</ColorButton>
                            </div>
                          </div>
                          <div className="money-manager-content">
                            <div className="money-manager-header-section">
                              <label>Standard</label>
                              <p>Our most popular account.</p>
                            </div>
                            <div className="money-manager-body-section">
                              <div className="money-manager-body-content-element">
                                <label>Minimum deposit</label>
                                <p>Depends on payment system</p>
                              </div>
                              <div className="money-manager-body-content-element">
                                <label>Spread</label>
                                <p>From 0.3</p>
                              </div>
                              <div className="money-manager-body-content-element">
                                <label>Commission</label>
                                <p>No commission</p>
                              </div>
                              <div className="money-manager-body-content-element">
                                <label>Maximum leverage</label>
                                <p>1:Unlimited</p>
                              </div>
                            </div>
                            <div className="money-manager-footer-action-section">
                              <ColorButton>Investment</ColorButton>
                            </div>
                          </div> */}
                        </div>
                        {/* <div className="row1 boxSection pamm-portfolio">
                          {moneyManagerList.map((item) => {
                            return (
                              <div className="card padding-9 animate fadeLeft boxsize">
                                <div className="row">
                                  <div className="col s12 m12 text-align-center">
                                    <h5 className="mb-0">{item.mt5_name}</h5>
                                    <div>
                                      <p className="no-margin">
                                        <span>Minimum Deposit:</span>
                                        <strong>
                                          ${item.minimum_deposit_amount}
                                        </strong>
                                      </p>
                                      <p className="no-margin">
                                        <span>Fees Percentage:</span>
                                        <strong>{item.fees_percentage}</strong>
                                      </p>
                                    </div>
                                    {item.existing_manager ? (
                                      <ColorButton
                                        onClick={(e) => {
                                          investmentForm.user_id =
                                            item.mm_user_id;
                                          investmentForm.pid = item.pid;
                                          investmentForm.amount = "";
                                          setInvestmentForm({
                                            ...investmentForm,
                                          });
                                          setPid(item.pid);
                                          setDialogTitle("Investment");
                                          setOpen(true);
                                        }}
                                      >
                                        Invest
                                      </ColorButton>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div> */}
                      </TabPanel>
                      <TabPanel value={value} index={1} dir={theme.direction}>
                        <div className="btn-create-portfolio-right">
                          <ColorButton
                            size="small"
                            variant="contained"
                            onClick={(e) => {
                              setMaxWidth("sm");
                              setDialogTitle("Create Portfolio");
                              getMoneyManagerList();
                              setinfoTrue({
                                portfolio_name: false,
                                mm_mt5_acc_id: false,
                                investment_months: false,
                              });
                              setCreatePortfolioForm({
                                isLoader: false,
                                portfolio_name: "",
                                mm_mt5_acc_id: "",
                                investment_months: "",
                              });
                              setOpen(true);
                            }}
                          >
                            Create Portfolio
                          </ColorButton>
                        </div>
                        <div className="myportfolio-card-section">
                          {portfolioLoader ? (
                            <div className="loader-section">
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
                            </div>
                          ) : (
                            myPortfolio.map((item) => {
                              return (
                                <div className="myportfolio-card-content">
                                  <div className="width-100-with-border header-sction">
                                    <div>
                                      <NavLink
                                        to={`/portfolio_profile/${item.pid}`}
                                        className="portfolio-link-color"
                                      >
                                        {item.portfolio_name}
                                      </NavLink>
                                      {/* <span className="portfolio-link-color">
                                        {item.portfolio_name}
                                      </span> */}
                                      <span className="text-bold-700">
                                        {item.portfolio_id}
                                      </span>
                                    </div>
                                    <div>
                                      <span>Money Manager</span>
                                      <NavLink
                                        className="navlink-color-white"
                                        to={`/money_manager_profile/${item.mm_mt5_acc_id}`}
                                      >
                                        <span className="text-bold-700">
                                          {item.account_name}
                                        </span>
                                      </NavLink>
                                    </div>
                                  </div>
                                  <div
                                    className="width-100-with-border"
                                    style={{
                                      backgroundColor:
                                        item.is_closed == "0"
                                          ? "white"
                                          : "#ebd7d7",
                                    }}
                                  >
                                    <div>
                                      <span>Investment</span>
                                      <span className="text-bold-700">
                                        ${item.my_investment}
                                      </span>
                                    </div>
                                    <div>
                                      <span>Current Value</span>
                                      <span
                                        className="text-bold-700"
                                        style={{
                                          color:
                                            item.my_investment <=
                                            item.current_value
                                              ? "green"
                                              : "red",
                                        }}
                                      >
                                        ${item.current_value}
                                      </span>
                                    </div>

                                    <div>
                                      <span>PNL</span>
                                      <span
                                        className="text-bold-700"
                                        style={{
                                          color:
                                            item.pnl >= 0 ? "green" : "red",
                                        }}
                                      >
                                        ${item.pnl}
                                      </span>
                                    </div>
                                  </div>
                                  <div
                                    className="width-100-with-border"
                                    style={{
                                      backgroundColor:
                                        item.is_closed == "0"
                                          ? "white"
                                          : "#ebd7d7",
                                    }}
                                  >
                                    <div>
                                      <span>Return %</span>
                                      <span
                                        className="text-bold-700"
                                        style={{
                                          color:
                                            item.return_percentage >= 0
                                              ? "green"
                                              : "red",
                                        }}
                                      >
                                        {item.return_percentage}%
                                      </span>
                                    </div>

                                    <div>
                                      <span>Invested Days</span>
                                      <span className="text-bold-700">
                                        {item.added_datetime}
                                      </span>
                                    </div>
                                  </div>
                                  <div
                                    className="width-100-with-border"
                                    style={{
                                      backgroundColor:
                                        item.is_closed == "0"
                                          ? "white"
                                          : "#ebd7d7",
                                    }}
                                  >
                                    <div>
                                      <span>Floating</span>
                                      <span
                                        className="text-bold-700"
                                        style={{
                                          color:
                                            item.current_floating >= 0
                                              ? "green"
                                              : "red",
                                        }}
                                      >
                                        {item.current_floating}
                                      </span>
                                    </div>
                                    {/* 
                                    <div>
                                      <span>Value</span>
                                      <span className="text-bold-700">
                                        ${item.current_value}
                                      </span>
                                    </div> */}

                                    <div>
                                      <span>Trade</span>
                                      <span className="cursor">
                                        <span
                                          class="material-icons"
                                          onClick={() => {
                                            //   filterData.pid = item.pid;
                                            //   setFilterData({ ...filterData });
                                            //   setDialogTitle("Trade History");
                                            //   setMaxWidth("xl");
                                            //   setOpen(true);

                                            navigate(
                                              `/pamm_trade_history/${item.pid}`
                                            );
                                          }}
                                        >
                                          insert_chart
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                  {item.is_closed == "0" ? (
                                    <div className="footer-action-button">
                                      <button
                                        onClick={(e) => {
                                          setMaxWidth("sm");
                                          setWithdrawForm({
                                            isLoader: false,
                                            allWithdraw: true,
                                            amount: "",
                                            pid: item.pid,
                                          });
                                          SetRefreshCreatePortfolio1(false);
                                          setDialogTitle("Withdraw");
                                          setOpen(true);
                                        }}
                                      >
                                        Withdraw
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          walletbalancefun();
                                          investmentForm.user_id = "";
                                          investmentForm.pid = item.pid;
                                          investmentForm.amount = "";
                                          setMaxWidth("sm");
                                          setInvestmentForm({
                                            ...investmentForm,
                                          });
                                          setDialogTitle("Investment");
                                          setOpen(true);
                                        }}
                                      >
                                        Invest
                                      </button>
                                      <NavLink
                                        className="third-view-button"
                                        to={`/portfolio_profile/${item.pid}`}
                                      >
                                        View
                                      </NavLink>
                                    </div>
                                  ) : item.is_closed == "1" ? (
                                    <div className="footer-action-button">
                                      <div
                                        className="footer-action-button spanportFolio1"
                                        style={{
                                          backgroundColor:
                                            item.is_closed == "0"
                                              ? "white"
                                              : "#ebd7d7",
                                        }}
                                      >
                                        <span className="spanportFolio">
                                          Closed
                                        </span>
                                      </div>
                                      <NavLink
                                        className="third-view-button"
                                        to={`/portfolio_profile/${item.pid}`}
                                      >
                                        View
                                      </NavLink>
                                    </div>
                                  ) : (
                                    <div className="footer-action-button">
                                      <div
                                        className="footer-action-button spanportFolio1"
                                        style={{
                                          backgroundColor:
                                            item.is_closed == "0"
                                              ? "white"
                                              : "#ebe5c1",
                                        }}
                                      >
                                        <span className="spanportFoliopading">
                                          Pending
                                        </span>
                                      </div>
                                      <NavLink
                                        className="third-view-button"
                                        to={`/portfolio_profile/${item.pid}`}
                                      >
                                        View
                                      </NavLink>
                                    </div>
                                  )}
                                </div>
                              );
                            })
                          )}
                        </div>
                        {/* <Paper
                          elevation={2}
                          style={{ borderRadius: "10px" }}
                          className="pending-all-15px"
                        >
                          <div className="btn-create-portfolio-right">
                            <ColorButton
                              size="small"
                              variant="contained"
                              onClick={(e) => {
                                setDialogTitle("Create Portfolio");
                                setOpen(true);
                              }}
                            >
                              Create Portfolio
                            </ColorButton>
                          </div>
                          <CommonTable
                            url={`${Url}/ajaxfiles/pamm/portfolio_manage.php`}
                            column={column}
                            sort="2"
                            param={param}
                            refresh={refresh}
                            fetchData="data"
                          />
                        </Paper> */}
                      </TabPanel>
                    </SwipeableViews>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
              className="modalWidth100"
              fullWidth={fullWidth}
              maxWidth={maxWidth}
            >
              <BootstrapDialogTitle
                id="customized-dialog-title"
                className="dialogTitle"
                onClose={handleClose}
              >
                {dialogTitle}
              </BootstrapDialogTitle>
              <DialogContent dividers>{manageContent()}</DialogContent>
              <DialogActions>{manageDialogActionButton()}</DialogActions>
            </BootstrapDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PammPortfolio;
