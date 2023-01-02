import { Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ColorButton } from "../../customComponet/CustomElement";
import TopButton from "../../customComponet/TopButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Url } from "../../../global";
import CommonTable from "../../customComponet/CommonTable";
import NewDate from "../../commonComponet/NewDate";

const MoneyManager = () => {
  const navigate = useNavigate();
  var [data, setData] = useState({});
  var [filterData, setFilterData] = useState({});
  var [refresh, setRefresh] = useState(false);

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
      name: "ACCOUNT NAME",
      selector: (row) => {
        return <span title={row.account_name}>{row.account_name}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "EMAIL",
      selector: (row) => {
        return <span title={row.user_email}>{row.user_email}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "MOBILE",
      selector: (row) => {
        return <span title={row.user_phone}>{row.user_phone}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "TOTAL DEPOSIT",
      selector: (row) => {
        return (
          <span title={`$${row.total_deposit}`}>${row.total_deposit}</span>
        );
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
          <span title={row.added_datetime}>
            <NewDate newDate={row.added_datetime} />
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 1,
    },
  ];

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item sm={12}></Grid>
              <Grid item xl={1}></Grid>
              <Grid item xl={10} md={12} lg={12}>
                <TopButton />

                <Grid container spacing={6}>
                  <Grid item md={12}>
                    <h4 className="font-weight-bold mb-3">
                      My Pamm Manager List
                    </h4>
                    <Paper
                      elevation={2}
                      style={{ borderRadius: "10px" }}
                      className="pending-all-15px"
                    >
                      <CommonTable
                        url={`${Url}/datatable/pamm/my_money_managers.php`}
                        column={column}
                        sort="2"
                        param={filterData}
                        refresh={refresh}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyManager;
