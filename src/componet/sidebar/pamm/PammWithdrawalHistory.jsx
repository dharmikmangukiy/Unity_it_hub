import React, { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Select,
  KeyboardDatePicker,
  CardContent,
} from "@mui/material";

import CommonTable from "../../customComponet/CommonTable";
import { useNavigate } from "react-router-dom";
import { BootstrapInput } from "../../customComponet/CustomElement";
import { Url } from "../../../global.js";

// import "./history.css";
import TopButton from "../../customComponet/TopButton";
import NewDate from "../../commonComponet/NewDate";

const PammWithdrawalHistory = () => {
  const [open, setOpen] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const navigate = useNavigate();
  const [openTableMenus, setOpenTableMenus] = useState([]);
  const [filterData, setFilterData] = useState({});

  const depositFilter = () => {};

  const handleContextClick = (event, index) => {
    let tableMenus = [...openTableMenus];
    tableMenus[index] = event.currentTarget;
    setOpenTableMenus(tableMenus);
  };

  const handleContextClose = (index) => {
    let tableMenus = [...openTableMenus];
    tableMenus[index] = null;
    setOpenTableMenus(tableMenus);
  };

  const gotoProfile = (e) => {
    navigate("/master/" + e.user_id);
  };

  const columns = [
    {
      name: "SR.NO",
      selector: (row) => {
        return <span>{row.sr_no}</span>;
      },
      sortable: true,
      reorder: true,
      // wrap: true,
      grow: 0.1,
    },
    {
      name: "DATE",
      selector: (row) => {
        return (
          <span title={row.added_datetime}>
            <NewDate newDate={row.added_datetime} />
          </span>
        );
      },
      sortable: true,
      reorder: true,
      // wrap: true,
      grow: 1,
    },
    {
      name: "Investor NAME",
      selector: (row) => {
        return <span title={row.investor_name}>{row.investor_name}</span>;
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 1,
    },
    {
      name: "Portfolio Name",
      selector: (row) => {
        return <span title={row.portfolio_name}>{row.portfolio_name}</span>;
      },
      sortable: true,
      reorder: true,
      // wrap: true,
      grow: 1,
    },
    {
      name: "Account NAME",
      selector: (row) => {
        return <span title={row.mt5_name}>{row.mt5_name}</span>;
      },
      sortable: true,
      reorder: true,
      // wrap: true,
      grow: 1,
    },
    {
      name: "Portfolio Id",
      selector: (row) => {
        return <span title={row.portfolio_id}>{row.portfolio_id}</span>;
      },
      sortable: true,
      reorder: true,
      // wrap: true,
      grow: 1,
    },
    {
      name: "Amount",
      selector: (row) => {
        return <span title={row.amount}>${row.amount}</span>;
      },
      sortable: true,
      reorder: true,
      // wrap: true,
      grow: 0.5,
    },
    {
      name: "Approved Date",
      selector: (row) => {
        return (
          <span title={row.approved_datetime}>
            {row.approved_datetime == "" ? (
              ""
            ) : (
              <NewDate newDate={row.approved_datetime} />
            )}
          </span>
        );
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 1,
    },
    {
      name: "STATUS",
      selector: (row) => {
        return (
          <span
            title={row.withdrawal_status}
            className={`text-color-${
              row.withdrawal_status == "1"
                ? "green"
                : row.withdrawal_status == "2"
                ? "red"
                : "yellow"
            }`}
          >
            {row.withdrawal_status == "1"
              ? "APPROVED"
              : row.withdrawal_status == "2"
              ? "REJECTED"
              : "PENDING"}
          </span>
        );
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 0.1,
    },
  ];

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
                <p className="main-heading">Pamm Withdrawal History</p>
                <Paper
                  elevation={2}
                  style={{ borderRadius: "10px" }}
                  // className="pending-all-15px"
                >
                  <div className="card-header font-weight-bold text-dark border-bottom py-2">
                    Filter Criteria
                  </div>
                  <CardContent className="py-3">
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
                      <Grid item sm={6} md={3}>
                        <FormControl fullWidth={true}>
                          <label className="small font-weight-bold text-dark">
                            Status
                          </label>
                          <Select
                            value={filterData.withdrawal_status}
                            onChange={(e) => {
                              filterData.status = e.target.value;
                              setFilterData({ ...filterData });
                            }}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                            input={<BootstrapInput />}
                          >
                            <MenuItem value="0">Pending</MenuItem>
                            <MenuItem value="1">Approved</MenuItem>
                            <MenuItem value="2">Rejected</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Paper>
                <br />
                <Paper
                  elevation={2}
                  style={{ borderRadius: "10px" }}
                  className="pending-all-15px"
                >
                  <CommonTable
                    url={`${Url}/datatable/pamm/pamm_withdraw_request.php`}
                    column={columns}
                    sort="2"
                    param={filterData}
                    refresh={refresh}
                  />
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PammWithdrawalHistory;
