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
} from "@mui/material";

import CommonTable from "../../customComponet/CommonTable";
import { ColorButton } from "../../customComponet/CustomElement";
import { useNavigate } from "react-router-dom";
import { BootstrapInput } from "../../customComponet/CustomElement";
import { Url } from "../../../global.js";
import axios from "axios";
import CustomImageModal from "../../customComponet/CustomImageModal";
import "./history.css";
import TopButton from "../../customComponet/TopButton";
import NewDate from "../../commonComponet/NewDate";

const DepositHistory = () => {
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

  const column = [
    {
      name: "SR.NO",
      selector: (row) => {
        return <span title={row.sr_no}>{row.sr_no}</span>;
      },
      // wrap: true,
      reorder: true,
      grow: 0.01,
    },
    {
      name: "REFERENCE NO.",
      selector: (row) => {
        return <span title={row.refrence_no}>{row.refrence_no}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "DATE",
      selector: (row) => {
        return (
          <span title={row.date}>
            <NewDate newDate={row.date} />
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "WALLET/ MT5",
      selector: (row) => {
        return <span title={row.wallet_code}>{row.wallet_code}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "PAYMENT METHOD",
      selector: (row) => {
        return <span title={row.method}>{row.method}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "TRANSACTION ID",
      selector: (row) => {
        return <span title={row.transactionid}>{row.transactionid}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "crypto address",
      selector: (row) => {
        return <span title={row.crypto_address}>{row.crypto_address}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 0.7,
    },
    {
      name: "AMOUNT",
      selector: (row) => {
        return <span title={row.amount}>{row.amount}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "PROOF",
      selector: (row) => {
        return row.proof != "" ? (
          <CustomImageModal
            image={row.proof}
            isIcon={true}
            className="tableImg"
          />
        ) : (
          ""
        );
      },
      // wrap: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "updated DATE",
      selector: (row) => {
        return (
          <span title={row.approve_datetime}>
            {row.approve_datetime == "" ? (
              ""
            ) : (
              <NewDate newDate={row.approve_datetime} />
            )}
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.6,
    },
    {
      name: "STATUS",
      selector: (row) => {
        return (
          <span
            title={row.status}
            className={`text-color-${
              row.status == "1" ? "green" : row.status == "2" ? "red" : "yellow"
            }`}
          >
            {row.status == "1"
              ? "APPROVED"
              : row.status == "2"
              ? "REJECTED"
              : "PENDING"}
          </span>
        );
      },
      sortable: true,
      reorder: true,
      // wrap: true,
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
                <p className="main-heading">Deposit History</p>

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
                    <Grid item sm={6} md={3}>
                      <FormControl fullWidth={true}>
                        <label className="small font-weight-bold text-dark">
                          Status
                        </label>
                        <Select
                          value={
                            filterData.deposit_status
                              ? filterData.deposit_status
                              : ""
                          }
                          onChange={(e) => {
                            filterData.deposit_status = e.target.value;
                            setFilterData({ ...filterData });
                          }}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          input={<BootstrapInput />}
                        >
                          <MenuItem value="">All</MenuItem>
                          <MenuItem value="0">Pending</MenuItem>
                          <MenuItem value="1">Approved</MenuItem>
                          <MenuItem value="2">Rejected</MenuItem>
                        </Select>
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
                    url={`${Url}/datatable/deposit_list.php`}
                    column={column}
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

export default DepositHistory;
