import React, { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Select,
  Tooltip,
} from "@mui/material";

import CommonTable from "../../customComponet/CommonTable";

import { useNavigate } from "react-router-dom";
import { Url } from "../../../global.js";
import NewDate from "../../commonComponet/NewDate";

const SpinReport = () => {
  const [open, setOpen] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const navigate = useNavigate();
  const [openTableMenus, setOpenTableMenus] = useState([]);
  const [filterData, setFilterData] = useState({
    withdraw_from: "",
    withdraw_to: "",
  });

  const depositFilter = () => {
    console.log("dsa");
  };

  /* const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }; */

  const handleContextClick = (event, index) => {
    console.log(event.currentTarget.getAttribute("id"), index);
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
    console.log("goto profile page", e);
    navigate("/master/" + e.user_id);
  };

  const column = [
    {
      name: "SR.NO",
      selector: (row) => {
        return <span title={row.sr_no}>{row.sr_no}</span>;
      },
      wrap: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "DATE",
      selector: (row) => {
        return (
          <span title={row.spin_claim_date_time}>
            <NewDate newDate={row.spin_claim_date_time} />
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.6,
    },
    {
      name: "from user name",
      selector: (row) => {
        return <span title={row.from_user_name}>{row.from_user_name}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.9,
    },
    {
      name: "from user email",
      selector: (row) => {
        return <span title={row.from_user_email}>{row.from_user_email}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },

    {
      name: "spin type",
      selector: (row) => {
        return (
          <span title={row.spin_type}>
            {row.method == "crypto" ? row.spin_type : row.spin_type}
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "amount",
      selector: (row) => {
        return (
          <span title={row.spin_claim_amount}>{row.spin_claim_amount}</span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },

    {
      name: "STATUS",
      selector: (row) => {
        return (
          <span
            title={row.status}
            className={`text-color-${
              row.redeem_status == "1"
                ? "green"
                : row.redeem_status == "2"
                ? "red"
                : "yellow"
            }`}
          >
            {row.redeem_status == "1"
              ? "Redeem Spin"
              : row.redeem_status == "2"
              ? "Missed Spin"
              : "Pending Spin"}
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
                <p className="main-heading">Spin Report</p>
                <Paper
                  elevation={2}
                  style={{ borderRadius: "10px" }}
                  className="pending-all-15px"
                >
                  <CommonTable
                    url={`${Url}/datatable/spin_and_win_list.php`}
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

export default SpinReport;
