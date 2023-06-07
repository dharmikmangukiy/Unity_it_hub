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
  Dialog,
  IconButton,
  DialogTitle,
  styled,
  DialogContent,
} from "@mui/material";

import CommonTable from "../../customComponet/CommonTable";
import { ColorButton } from "../../customComponet/CustomElement";
import { useNavigate } from "react-router-dom";
import { BootstrapInput } from "../../customComponet/CustomElement";
import { Url } from "../../../global.js";
import VisibilityIcon from "@mui/icons-material/Visibility";
import NewDate from "../../commonComponet/NewDate";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

function BootstrapDialogTitle(props) {
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
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
const IbUserHistory = () => {
  const [dialogTitle, setDialogTitle] = useState("");
  const [resData, setResData] = useState({});
  const [open, setOpen] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const navigate = useNavigate();
  const [openTableMenus, setOpenTableMenus] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [param, setParam] = useState({
    from_user_id: "",
  });

  const handleClose = () => {
    setOpen(false);
  };
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
      name: "name",
      selector: (row) => {
        return <span title={row.name}>{row.name}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.4,
    },
    {
      name: "email",
      selector: (row) => {
        return <span title={row.user_email}>{row.user_email}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "phone",
      selector: (row) => {
        return <span title={row.user_phone}>{row.user_phone}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.4,
    },
    {
      name: "lot",
      selector: (row) => {
        return <span title={row.trade_volume}>{row.trade_volume}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "Amount",
      selector: (row) => {
        return (
          <span title={row.ib_comission_amount}>
            <span className="text-color-green">${row.ib_comission_amount}</span>
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.4,
    },
    {
      name: "CSV",
      selector: (row) => {
        return (
          <span>
            <a
              href={
                Url +
                "/" +
                "datatable/ib_commission_history_export.php" +
                `?request_id=${row.from_user_id}`
              }
              className="main-color"
              target="_blank"
            >
              <DownloadForOfflineIcon />
            </a>
            {/* <Button
              onClick={() => {
                param.from_user_id = row.from_user_id;
                setParam({ ...param });
                setDialogTitle(row.name);
                setOpen(true);
              }}
            >
              <VisibilityIcon />
            </Button> */}
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.4,
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <span>
            <Button
              onClick={() => {
                param.from_user_id = row.from_user_id;
                setParam({ ...param });
                setDialogTitle(row.name);
                setOpen(true);
              }}
            >
              <VisibilityIcon />
            </Button>
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.4,
    },
  ];
  const column1 = [
    {
      name: "LOGIN NAME",
      selector: (row) => {
        return <span title={row.name}>{row.name}</span>;
      },
      // wrap: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "MT5 ID",
      selector: (row) => {
        return <span title={row.mt5_account_id}>{row.mt5_account_id}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "IB GROUP NAME",
      selector: (row) => {
        return <span title={row.ib_group_id}>{row.ib_group_id}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.6,
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
      grow: 0.4,
    },
    {
      name: "TRADE NO.",
      selector: (row) => {
        return <span title={row.trade_no}>{row.trade_no}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "TYPE",
      selector: (row) => {
        return <span title={row.trade_type}>{row.trade_type}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    /* {
      name: "USER COMMENT",
      selector: (row) => {
        return (
          <span title={row.user_visible_password}>
            {row.user_visible_password}
          </span>
        );
      },
      sortable: true,
      reorder: true,
      grow: 1,
    }, */
    {
      name: "COMMISSION",
      selector: (row) => {
        return (
          <span title={row.ib_comission_amount}>{row.ib_comission_amount}</span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "LOT",
      selector: (row) => {
        return <span title={row.trade_volume}>{row.trade_volume}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "CLOSE COMMISSION",
      selector: (row) => {
        return (
          <span title={row.trade_close_price}>{row.trade_close_price}</span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
  ];
  const manageContent = () => {
    return (
      <>
        <div>
          <a
            href={
              Url +
              "/" +
              "datatable/ib_commission_history_export.php" +
              `?request_id=${param.from_user_id}`
            }
            className=""
            style={{
              padding: "8px 12px",
              background: "#5d2067",
              color: "white",
              borderRadius: "5px",
            }}
            // target="_blank"
          >
            CSV{" "}
          </a>
        </div>
        <CommonTable
          url={`${Url}/datatable/ib_commission_history.php`}
          column={column1}
          sort="2"
          setResData={setResData}
          param={param}
          refresh={refresh}
        />
        {/* <div className="ibcomhistory">
          <div className="row1 boxSection">
            <div className="card padding-9 animate fadeLeft boxsize">
              <div className="row">
                <div className="col s12 m12 text-align-center">
                  <h5 className="mb-0">{resData.total_lots}</h5>
                  <p className="no-margin">Total LOTS</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row1 boxSection">
            <div className="card padding-9 animate fadeLeft boxsize">
              <div className="row">
                <div className="col s12 m12 text-align-center">
                  <h5 className="mb-0">${resData.earning}</h5>
                  <p className="no-margin">Total Earning</p>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="row1 boxSection">
            <div className="card padding-9 animate fadeLeft boxsize">
              <div className="row">
                <div className="col s12 m12 text-align-center">
                  <h5 className="mb-0">${resData.balance}</h5>
                  <p className="no-margin">Available</p>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="row1 boxSection">
            <div className="card padding-9 animate fadeLeft boxsize">
              <div className="row">
                <div className="col s12 m12 text-align-center">
                  <h5 className="mb-0">${resData.pending}</h5>
                  <p className="no-margin">Pending</p>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="row1 boxSection">
            <div className="card padding-9 animate fadeLeft boxsize">
              <div className="row">
                <div className="col s12 m12 text-align-center">
                  <h5 className="mb-0">${resData.withdaw}</h5>
                  <p className="no-margin">Withdrawal</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </>
    );
  };
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
                <p className="main-heading">IB User History</p>

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

                    {/* <Grid item sm={1} md={1}>
                      <ColorButton
                        className="d-block ml-auto mb-3 mr-3 btn-filter depositFilter"
                        onClick={(e) => setRefresh(!refresh)}
                      >
                        Filter
                      </ColorButton>
                    </Grid> */}
                  </Grid>
                </Paper>
                <br />
                <Paper
                  elevation={2}
                  style={{ borderRadius: "10px" }}
                  className="pending-all-15px"
                >
                  <CommonTable
                    url={`${Url}/datatable/ib_commission_user_history.php`}
                    column={column}
                    sort="2"
                    filter={filterData}
                    refresh={refresh}
                  />
                </Paper>
              </Grid>
            </Grid>
          </div>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            fullWidth={true}
            maxWidth="lg  "
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
            >
              {dialogTitle}
            </BootstrapDialogTitle>
            <DialogContent dividers>{manageContent()}</DialogContent>
          </BootstrapDialog>
        </div>
      </div>
    </div>
  );
};

export default IbUserHistory;
