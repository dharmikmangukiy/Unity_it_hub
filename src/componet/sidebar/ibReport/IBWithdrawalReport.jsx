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
import TopButton from "../../customComponet/TopButton";
import NewDate from "../../commonComponet/NewDate";

const IBWithdrawalReport = () => {
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
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },

    {
      name: "Mt5 account",
      selector: (row) => {
        return <span title={row.mt5_acc_no}>{row.mt5_acc_no}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.2,
    },
    {
      name: "PAYMENT METHOD",
      selector: (row) => {
        return <span title={row.method}>{row.method}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.4,
    },
    {
      name: "ACCOUNT NO",
      selector: (row) => {
        return (
          <span title={row.account_number}>
            {row.method == "Bank" ? (
              <>
                {row.withdrawal_bank_name}
                <br />
                {row.account_number}
              </>
            ) : (
              ""
            )}
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "UPI/Crypto Type",
      selector: (row) => {
        return <span title={row.upi_crypto_name}>{row.upi_crypto_name}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.4,
    },
    {
      name: "UPI/Crypto ID",
      selector: (row) => {
        return (
          <span title={row.upi_crypto_ac_number}>
            {row.upi_crypto_ac_number}
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.4,
    },
    // {
    //   name: "REMARKS",
    //   selector: (row) => {
    //     return <span title={row.remarks}>{row.remarks}</span>;
    //   },
    //   // wrap: true,
    //   sortable: true,
    //   reorder: true,
    //   grow: 0.4,
    // },
    {
      name: "REMARKS",
      selector: (row) => {
        return <span title={row.remarks}>{row.remarks}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.4,
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
                <p className="main-heading">IB Commissions Withdrawal Report</p>

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
                          onChange={(e) =>
                            setFilterData({
                              ...filterData,
                              deposit_from: e.target.value,
                            })
                          }
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
                          onChange={(e) =>
                            setFilterData({
                              ...filterData,
                              deposit_to: e.target.value,
                            })
                          }
                        ></BootstrapInput>
                      </FormControl>
                    </Grid>

                    <Grid item sm={1} md={1}>
                      <ColorButton
                        className="d-block ml-auto mb-3 mr-3 btn-filter depositFilter"
                        onClick={(e) => setRefresh(!refresh)}
                      >
                        Filter
                      </ColorButton>
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
                    url={`${Url}/datatable/ib_withdraw_list.php`}
                    column={column}
                    sort="1"
                    csv="datatable/ib_withdraw_list_export.php"
                    filter={filterData}
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

export default IBWithdrawalReport;
