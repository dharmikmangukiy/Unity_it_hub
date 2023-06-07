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
import { useNavigate } from "react-router-dom";
import { BootstrapInput } from "../../customComponet/CustomElement";
import { Url } from "../../../global";

import TopButton from "../../customComponet/TopButton";
import NewDate from "../../commonComponet/NewDate";

const TransferHistory = () => {
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
      grow: 0.1,
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
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "FROM ACCOUNT",
      selector: (row) => {
        return <span title={row.from_account}>{row.from_account}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "TRANSFER TO NAME",
      selector: (row) => {
        return <span title={row.transfer_to_name}>{row.transfer_to_name}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.6,
    },
    {
      name: "TO ACCOUNT",
      selector: (row) => {
        return <span title={row.to_account}>{row.to_account}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.6,
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
      name: "TYPE",
      selector: (row) => {
        return <span title={row.transaction_type}>{row.transaction_type}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.1,
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
                <p className="main-heading">Transfer History</p>

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
                            filterData.transfer_status
                              ? filterData.transfer_status
                              : ""
                          }
                          onChange={(e) => {
                            filterData.transfer_status = e.target.value;
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
                    url={`${Url}/datatable/internal_transfer_list.php`}
                    column={column}
                    sort="0"
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

export default TransferHistory;
