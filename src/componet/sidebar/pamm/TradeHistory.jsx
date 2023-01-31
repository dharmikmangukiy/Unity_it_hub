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
import { useParams } from "react-router-dom";
import CommonTable from "../../customComponet/CommonTable";
import { useNavigate } from "react-router-dom";
import { BootstrapInput } from "../../customComponet/CustomElement";
import { Url } from "../../../global.js";

// import "./history.css";
import TopButton from "../../customComponet/TopButton";
import { useEffect } from "react";
import NewDate from "../../commonComponet/NewDate";

const TradeHistory = () => {
  const [open, setOpen] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [openTableMenus, setOpenTableMenus] = useState([]);
  const [filterData, setFilterData] = useState({});
  const navigate = useNavigate();

  const { id } = useParams();
  const depositFilter = () => {
    console.log("dsa");
  };
  useEffect(() => {
    if (id !== undefined) {
      filterData.pid = id;
      setFilterData({ ...filterData });
    }
  }, []);

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
      name: "Portfolio Id",
      selector: (row) => {
        return <span title={row.portfolio_id}>{row.portfolio_id}</span>;
      },
      // wrap: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "Portfolio Name",
      selector: (row) => {
        return <span title={row.portfolio_name}>{row.portfolio_name}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.4,
    },
    {
      name: "Date",
      selector: (row) => {
        return (
          <span title={row.trade_datetime}>
            <NewDate newDate={row.trade_datetime} />
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.4,
    },
    {
      name: "Symbol",
      selector: (row) => {
        return <span title={row.symbol}>{row.symbol}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <span
            title={row.action}
            style={{ color: row.action == "Buy" ? "green" : "red" }}
          >
            {row.action}
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "Price",
      selector: (row) => {
        return <span title={row.price}>{row.price}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },

    {
      name: "Profit",
      selector: (row) => {
        return (
          <span
            title={row.profit}
            style={{ color: row.profit >= 0 ? "green" : "red" }}
          >
            {row.profit}
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "Lot",
      selector: (row) => {
        return <span title={row.volume}>{row.volume}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
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
                <p className="main-heading">Trade History</p>

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
                    url={`${Url}/datatable/pamm/pamm_trade_history.php`}
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

export default TradeHistory;
