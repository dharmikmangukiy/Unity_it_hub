import "./custom_component.css";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import TextField from "@mui/material/TextField";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { IsApprove } from "../../global";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import differenceBy from "lodash/differenceBy";
import { Url } from "../../global";
import { ColorButton, ColorButton1, ColorButton2 } from "./CustomElement";
import Toast from "../commonComponet/Toast";

const CssTextField = styled(TextField)({});

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  margin: 16px;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const CommonTable = (prop) => {
  // const [info, setinfo] = useState({});
  const navigate = useNavigate();
  const [clientData, setClientData] = useState([]);
  const [clientLoading, setClientLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [clientTotalRows, setClientTotalRows] = useState(0);
  const [clientPerPage, setClientPerPage] = useState(10);
  const [clientSort, setClientSort] = useState(prop.sort);
  const [clientDir, setClientDir] = useState("desc");
  const [clientSearch, setClientSearch] = useState("");
  const [openTableMenus, setOpenTableMenus] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [data, setData] = React.useState();
  const open = Boolean(anchorEl);
  const user_id = localStorage.getItem(`user_id`);
  const auth_key = localStorage.getItem(`auth_key`);
  const handleClientPageChange = (page) => {
    console.log("page", page);
    fetchClient(page == 1 ? 0 : (page - 1) * clientPerPage);
  };

  const handleClientPerRowsChange = async (newPerPage, page) => {
    console.log(newPerPage, page);
    setClientPerPage(newPerPage);
  };
  const handleClose = () => {
    setOpen1(false);
  };
  const readAll = () => {
    const param = new FormData();
    setIsLoader(true);

    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }

    param.append("action", "mark_as_read_bulk");
    param.append("notification_ids", JSON.stringify(selectedRows));
    axios
      .post(`${Url}/ajaxfiles/notifications_manage.php`, param)
      .then((res) => {
        if (res.data.status == "error") {
          Toast("error", res.data.message);
          setIsLoader(false);
        } else {
          Toast("success", res.data.message);
          setIsLoader(false);
          setRefresh(!refresh);
          setOpen1(false);
        }
      });
  };
  const handleClientSort = async (column, sortDirection) => {
    console.log("cusotm sort", column.id - 1, sortDirection);
    setClientSort(column.id - 1);
    setClientDir(sortDirection);
  };
  const handleRowSelected = React.useCallback((state) => {
    // const note=state.selectedRows.filter(match => match.notification_id.find(selectedRows => selectedRows.notification_id
    //   ===id))
    const note = () => {
      var notedata = [];

      state.selectedRows.map((item, index) => {
        notedata.push(item.notification_id);
      });
      return notedata;
    };
    setSelectedRows(note);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      console.log(selectedRows);
      setOpen1(true);
    };

    return (
      <Button
        key="delete"
        onClick={handleDelete}
        style={{ backgroundColor: "red", color: "white", fontWeight: "700" }}
        icon
      >
        Mark Read Selected
      </Button>
    );
  }, [data, selectedRows, toggleCleared]);
  const input1 = (event) => {
    const { name, value } = event.target;
    setClientSearch(value);
  };

  const CustomLoader = () => (
    <div style={{ padding: "24px" }}>
      <Spinner />
      <div>
        <center>
          <b>Loading...</b>
        </center>
      </div>
    </div>
  );
  const fetchClient = (page) => {
    setClientLoading(true);
    const param = new FormData();
    param.append("draw", 0);
    param.append("start", page);
    param.append("length", clientPerPage);
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    if (prop.level) {
      param.append("level_id", prop.level);
    }
    if (prop.filter) {
      if (prop.filter.deposit_from) {
        param.append("start_date", prop.filter.deposit_from);
      }
      if (prop.filter.deposit_to) {
        param.append("end_date", prop.filter.deposit_to);
      }
      if (prop.filter.sponsor_approve) {
        param.append("sponsor_approve", prop.filter.sponsor_approve);
      }
      if (prop.filter.withdraw_from) {
        param.append("start_date", prop.filter.withdraw_from);
      }
      if (prop.filter.withdraw_to) {
        param.append("end_date", prop.filter.withdraw_to);
      }
      if (prop.filter.withdraw_status) {
        param.append("withdrawal_status", prop.filter.withdraw_status);
      }
    }
    param.append("order[0][column]", clientSort);
    param.append("order[0][dir]", clientDir);
    if (clientSearch.trim() != "") {
      param.append("search[value]", clientSearch.trim());
    }
    if (prop.mt5Account) {
      param.append("mt5_acc_no", prop.mt5Account);
    }
    if (prop.param) {
      for (const key in prop.param) {
        /* if (Object.hasOwnProperty.call(object, key)) {
                    const element = object[key];
                    
                } */
        param.append(key, prop.param[key]);
      }
    }

    axios.post(`${prop.url}`, param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      // if (res.data.status == "error") {
      //   navigate("/");
      // }
      if (prop.fetchData) {
        setClientData(res.data[prop.fetchData]);
      } else {
        setClientData(res.data.aaData);
      }
      setClientTotalRows(res.data.iTotalRecords);
      setClientLoading(false);
      if (prop.setResData) {
        prop.setResData(res.data);
      }
    });
  };

  useEffect(() => {
    fetchClient(0);
    console.log("useEffect", prop);
  }, [
    clientPerPage,
    clientSort,
    clientDir,
    clientSearch,
    prop.level,
    prop.filter,
    prop.refresh,
    refresh,
    prop.param,
    prop.mt5Account,
  ]);
  // console.log(prop);
  return (
    <div className="common-table-with-100">
      <div className="tableSearchField">
        <CssTextField
          id="standard-search"
          label="Search"
          sx={{ width: "200px", marginBottom: "10px" }}
          variant="standard"
          name="myclient_search"
          // value={info.myclient_search}
          onChange={input1}
        />
      </div>
      {prop.notification ? (
        <DataTable
          columns={prop.column}
          data={clientData}
          progressPending={clientLoading}
          onSort={handleClientSort}
          selectableRows
          actions
          contextActions={contextActions}
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
          sortServer
          pagination
          paginationServer
          paginationTotalRows={clientTotalRows}
          onChangeRowsPerPage={handleClientPerRowsChange}
          onChangePage={handleClientPageChange}
          highlightOnHover
          persistTableHead
          pointerOnHover
          progressComponent={<CustomLoader />}
        />
      ) : (
        <DataTable
          columns={prop.column}
          data={clientData}
          progressPending={clientLoading}
          onSort={handleClientSort}
          // selectableRows
          //   actions
          //   contextActions={contextActions}
          // onSelectedRowsChange={handleRowSelected}
          // clearSelectedRows={toggleCleared}
          sortServer
          pagination
          persistTableHead
          paginationServer
          paginationTotalRows={clientTotalRows}
          onChangeRowsPerPage={handleClientPerRowsChange}
          onChangePage={handleClientPageChange}
          highlightOnHover
          pointerOnHover
          progressComponent={<CustomLoader />}
        />
      )}

      <Dialog open={open1} onClose={handleClose}>
        <DialogTitle sx={{ borderBottom: "0px solid #e6e7f1 !important" }}>
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to Read all this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ColorButton1 onClick={handleClose}>No</ColorButton1>
          {isLoader == true ? (
            <ColorButton2 disabled>
              <svg
                class="spinner"
                style={{ position: "unset" }}
                viewBox="0 0 50 50"
              >
                <circle
                  class="path"
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke-width="5"
                ></circle>
              </svg>
            </ColorButton2>
          ) : (
            <ColorButton2 onClick={readAll}>Read all</ColorButton2>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CommonTable;
