import React from "react";
import Grid from "@mui/material/Grid";
import TopButton from "../../customComponet/TopButton";
import { Box, Tab, Tabs, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import PaymentIcon from "@mui/icons-material/Payment";
import "./managebonuses.css";
const AntTabs = styled(Tabs)({
  borderBottom: "0px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#2A3F73",
  },
});
const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.85)",
    fontWeight: "500",
    backgroundColor: "#f9f8f3",
    borderBottom: "solid 3px #e3e2dd",
    fontFamily: ["Cairo, sans-serif"].join(","),
    "&:hover": {
      color: "#3D9730",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#2A3F73",
      fontWeight: "700",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#2A3F73",
    },
  })
);
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ManageBonuses = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  var data = [
    {
      amount: "$50",
      deposite_created: "10%",
      deposite: "$500",
      account: 231,
    },
  ];

  return (
    <>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
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
                      style={{ borderRadius: "10px" }}
                      className="w-100 mb-3"
                    >
                      <div className="main-container">
                        <div className="content-wrapper">
                          <div className="content-wrapper__inner _top-indent"></div>
                          <h1 className="heading _h2">My deposit bonuses</h1>
                          <div className="infotext">
                            RightFX is all about making your trading experience
                            convenient and outstanding, driving forex trading to
                            a whole new level. Deposit your account and we will
                            grant you 10% to 50% of your deposit for free! This
                            is a perfect way to increase total amount of funds
                            in your account
                          </div>
                          <Box sx={{ width: "100%" }}>
                            <Box
                              sx={{ borderBottom: 1, borderColor: "divider" }}
                            >
                              <AntTabs
                                value={value}
                                onChange={handleChange}
                                variant="scrollable"
                              >
                                <AntTab
                                  label="Available deposit bonuses"
                                  {...a11yProps(0)}
                                />
                                <AntTab
                                  label="Active and canceled bonuses"
                                  {...a11yProps(1)}
                                />
                              </AntTabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                              <Grid
                                item
                                md={12}
                                className="d-flex pb-0 position-relative"
                                style={{ paddingLeft: "-12px" }}
                              >
                                <Paper
                                  elevation={0}
                                  style={{ borderRadius: "10px" }}
                                  className="w-100 mb-5"
                                >
                                  <div className="infotext infotext_mt10">
                                    This is a list of all your available deposit
                                    bonuses. Click "Get bonus" to receive one
                                  </div>
                                  <Table aria-label="simple table">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Action</TableCell>
                                        <TableCell align="left">
                                          Amount
                                        </TableCell>
                                        <TableCell align="left">
                                          Deposite created
                                        </TableCell>
                                        <TableCell align="letf">
                                          Deposite
                                        </TableCell>
                                        <TableCell align="left">
                                          Account
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {data.length === 0
                                        ? ""
                                        : data.map((row) => (
                                            <TableRow>
                                              <TableCell
                                                align="right"
                                                className="d-flex justify-content-end MuiTableCell-alignCenter"
                                              >
                                                <Button className="cursor-pointer p-0 p-md-2 rounded-circle text-muted">
                                                  <PaymentIcon />
                                                </Button>
                                              </TableCell>
                                              <TableCell align="left">
                                                {row.amount}
                                              </TableCell>
                                              <TableCell align="left">
                                                {row.deposite_created}
                                              </TableCell>
                                              <TableCell align="left">
                                                {row.deposite}
                                              </TableCell>
                                              <TableCell align="left">
                                                {row.account}
                                              </TableCell>
                                            </TableRow>
                                          ))}
                                    </TableBody>
                                  </Table>
                                </Paper>
                              </Grid>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                              <Grid
                                item
                                md={12}
                                className="d-flex pb-0 position-relative"
                                style={{ paddingLeft: "-12px" }}
                              >
                                <Paper
                                  elevation={0}
                                  style={{ borderRadius: "10px" }}
                                  className="w-100 mb-5"
                                >
                                  <div className="infotext infotext_mt10">
                                    This is a list of all your received and
                                    canceled deposit bonuses. You can cancel a
                                    bonus here
                                  </div>
                                  <p style={{ margin: "10px 0 30px" }}>
                                    Please note that bonus statistics is updated
                                    <b> once in an hour</b>. Bonus amount will
                                    be added to your account balance and become
                                    withdrawable automatically within 1-2 hours
                                    after required volume is completed.
                                  </p>
                                  <Table aria-label="simple table">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Action</TableCell>
                                        <TableCell align="left">
                                          Amount
                                        </TableCell>
                                        <TableCell align="left">
                                          Deposite created
                                        </TableCell>
                                        <TableCell align="letf">
                                          Deposite
                                        </TableCell>
                                        <TableCell align="left">
                                          Account
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {data.length === 0
                                        ? ""
                                        : data.map((row) => (
                                            <TableRow>
                                              <TableCell
                                                align="right"
                                                className="d-flex justify-content-end MuiTableCell-alignCenter"
                                              >
                                                <Button className="cursor-pointer p-0 p-md-2 rounded-circle text-muted">
                                                  <PaymentIcon />
                                                </Button>
                                              </TableCell>
                                              <TableCell align="left">
                                                {row.amount}
                                              </TableCell>
                                              <TableCell align="left">
                                                {row.deposite_created}
                                              </TableCell>
                                              <TableCell align="left">
                                                {row.deposite}
                                              </TableCell>
                                              <TableCell align="left">
                                                {row.account}
                                              </TableCell>
                                            </TableRow>
                                          ))}
                                    </TableBody>
                                  </Table>
                                </Paper>
                              </Grid>
                            </TabPanel>
                          </Box>
                        </div>
                      </div>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageBonuses;
