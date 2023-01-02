import React, { useEffect, useState } from "react";
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
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonTable from "../../customComponet/CommonTable";
import { ColorButton } from "../../customComponet/CustomElement";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { BootstrapInput } from "../../customComponet/CustomElement";
import { IsApprove, Url } from "../../../global.js";
import axios from "axios";
import CustomImageModal from "../../customComponet/CustomImageModal";
import { styled } from "@mui/system";
import TopButton from "../../customComponet/TopButton";
import NewDate from "../../commonComponet/NewDate";
// import "./history.css";
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const BootstrapDialogTitle = (props: DialogTitleProps) => {
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
};

const IBCommisionGroup = () => {
  const [dialogTitle, setDialogTitle] = useState("");
  const [masterStructureData, setMasterStructureData] = useState([]);
  const [isAdd, setIsADD] = useState(false);
  const [addName, setAddName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [maxWidth, setMaxWidth] = useState("md");
  const [fullWidth, setFullWidth] = useState(true);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [openTableMenus, setOpenTableMenus] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [stId, setStId] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [defaultStructure_data, setDefaultStructure_data] = useState({
    data: [],
  });
  const defaultStructure_data1 = React.useRef([]);
  var DbData = [];
  const [updateDate, setUpdateDate] = useState({
    structure_id: "",
    sponsor_approve: "",
    remarks: "",
    structure_name: "",
    structure_data: [],
    db_structure_data: [],
    isLoader: false,
    refresh: false,
  });
  const depositFilter = () => {
    console.log("dsa");
  };
  toast.configure();
  const handleContextClick = (event, index) => {
    console.log(event.currentTarget.getAttribute("id"), index);
    let tableMenus = [...openTableMenus];
    tableMenus[index] = event.currentTarget;
    setOpenTableMenus(tableMenus);
  };
  const input1 = (event) => {
    const { name, value } = event.target;
    setUpdateDate((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
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
      // wrap: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "Structure Name",
      selector: (row) => {
        return <span title={row.structure_name}>{row.structure_name}</span>;
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
      grow: 0.6,
    },
    {
      name: "Status",
      selector: (row) => {
        return (
          <span title={row.status}>
            {row.status == "1" ? "Active" : "Inactive"}
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.6,
    },
    {
      name: "ACTION",
      selector: (row) => {
        return (
          <span title="View">
            <Button
              sx={{ color: "black" }}
              onClick={() => {
                setIsADD(false);
                setDialogTitle("Update Structure");

                // setUpdateDate((preValue) => {
                //   return {
                //     ...preValue,
                //     remarks: row.remarks,
                //     structure_id:row.structure_id,
                //     structure_name:row.structure_name
                //   }
                // })

                updateDate.structure_id = row.structure_id;
                updateDate.structure_name = row.structure_name;
                setUpdateDate({ ...updateDate });

                viewRequest(row);
              }}
            >
              <i className="material-icons">view_timeline</i>
            </Button>
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
  ];
  const viewRequest = (prop) => {
    setOpen(true);
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    if (prop == "add_new_structure_data") {
      param.append("action", "get_default_structure");
    }
    if (prop.structure_id) {
      param.append("action", "get_my_structure");
      param.append("structure_id", prop.structure_id);
    }
    // param.append('requested_user_id', prop.requested_user_id);
    axios.post(`${Url}/ajaxfiles/structures_manage.php`, param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }

      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        defaultStructure_data.data = res.data.data1;
        console.log("res.data", res.data.data);
        // DbData = res.data.data;

        setDefaultStructure_data({ ...defaultStructure_data });
        defaultStructure_data1.current = res.data.data;
        // res.data.data.forEach(element => {
        //   DbData.push(element.group_rebate);
        //   console.log("DbData", DbData);
        // });
        updateDate.structure_data = res.data.data;
        updateDate.db_structure_data = res.data.data;

        if (!isAdd) {
          updateDate.structure_id = res.data.structure_id;
          updateDate.structure_name = res.data.structure_name;
        }

        setUpdateDate({ ...updateDate });

        console.log("form", updateDate);
        // setMaxWidth('md');
        // setDialogTitle('Add');
      }
    });
  };
  const updatePartnership = async () => {
    var error = false;
    if (updateDate.structure_name == "") {
      toast.error("Please enter structure name");
      error = true;
    } else {
      /* updateDate.structure_data.forEach((element) => {
        console.log(element.ib_group_name, element.group_rebate);
        if (element.group_rebate === "") {
          toast.error(`Please enter ${element.ib_group_name} rebate`);
          error = true;
          return false;
        } else if (element.group_commission === "") {
          toast.error(`Please enter ${element.ib_group_name} commission`);
          error = true;
          return false;
        } else if (element.ib_group_level_id === 0) {
          toast.error(`Please enter ${element.ib_group_name} ib group`);
          error = true;
          return false;
        } else {
          element.pair_data.forEach((element1) => {
            if (element1.rebate === "") {
              toast.error(
                `Please enter ${element.ib_group_name} in ${element1.pair_name} rebate`
              );
              error = true;
              return false;
            } else if (element1.commission === "") {
              toast.error(
                `Please enter ${element.ib_group_name} in ${element1.pair_name} commission`
              );
              error = true;
              return false;
            }
          });
        }
        if (error) {
          return false;
        }
      }); */
    }
    if (error) {
      return false;
    }
    updateDate.isLoader = true;
    setUpdateDate({ ...updateDate });
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    // param.append('requested_user_id', ibdata.requested_user_id);
    // param.append('ib_application_id', ibdata.ib_application_id);
    // param.append('remarks', updateDate.remarks);
    // param.append('sponsor_approve', updateDate.sponsor_approve);
    param.append("structure_name", updateDate.structure_name);
    if (!isAdd) {
      param.append("structure_id", updateDate.structure_id);
      param.append("action", "update_master_structure");
    }
    if (isAdd) {
      param.append("action", "insert_master_structure");
    }
    param.append("pair_data", JSON.stringify(updateDate.structure_data));

    await axios
      .post(`${Url}/ajaxfiles/structures_manage.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        updateDate.isLoader = false;
        setUpdateDate({ ...updateDate });
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setOpen(false);
          setUpdateDate({
            structure_id: "",
            sponsor_approve: "",
            admin_approve: "",
            remarks: "",
            structure_name: "",
            structure_data: [],
            isLoader: false,
            refresh: !updateDate.refresh,
          });
        }
      });
    // }
  };
  const manageDialogActionButton = () => {
    return (
      <div className="dialogMultipleActionButton">
        <ColorButton
          variant="contained"
          className="ibcombutton"
          onClick={handleClose}
        >
          Cancel
        </ColorButton>
        {updateDate.isLoader ? (
          <ColorButton
            tabindex="0"
            size="large"
            className="spinerforpat "
            disabled
          >
            <svg className="spinner" viewBox="0 0 50 50">
              <circle
                className="path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="5"
              ></circle>
            </svg>
          </ColorButton>
        ) : (
          <ColorButton onClick={updatePartnership}>
            {isAdd ? "Add Structure" : "Update "}
          </ColorButton>
        )}
      </div>
    );
  };
  console.log(defaultStructure_data1.current);
  const manageContent = () => {
    return (
      <div>
        <div className="structureNameSection">
          <div className="ib-structure view-commission-content-section">
            <div style={{ width: "100%" }}>
              <TextField
                label="Structure Name"
                variant="standard"
                sx={{ width: "100%" }}
                name="structure_name"
                value={updateDate.structure_name}
                onChange={input1}
              />
            </div>

            {updateDate.structure_data.map((item, index) => {
              {
                /* console.log("DefaultStructure_data[index]",item.group_rebate*100/defaultStructure_data1.current[index].group_rebate,defaultStructure_data1.current[index].group_rebate,item.group_rebate) */
              }
              const newst = updateDate.structure_data;
              return (
                <div className="group-structure-section" key={index}>
                  <div className="main-section">
                    <div className="main-section-title">
                      {item.ib_group_name}
                    </div>
                    <div className="main-section-input-element">
                      <div>
                        {/* <span>Rebate</span> */}
                        <input
                          type="text"
                          className="Rebate_amount"
                          placeholder="Rebate"
                          style={
                            (
                              (item.group_rebate * 100) /
                              defaultStructure_data.data[index].group_rebate1
                            ).toFixed(2) > 100
                              ? { border: "2px solid red" }
                              : {}
                          }
                          value={item.group_rebate}
                          disabled={
                            defaultStructure_data.data[index].group_rebate1 == 0
                              ? true
                              : false
                          }
                          onChange={(e) => {
                            var floatNumber = e.target.value.split(".");
                            if (!isNaN(Number(e.target.value))) {
                              if (
                                floatNumber.length == 1 ||
                                (floatNumber.length == 2 &&
                                  floatNumber[1].length <= 3)
                              ) {
                                console.log(
                                  "value",
                                  parseFloat(e.target.value).toFixed(3)
                                );
                                updateDate.structure_data[index][
                                  "group_rebate"
                                ] = e.target.value;
                                updateDate.structure_data[index][
                                  "pair_data"
                                ].forEach((value, valueIndex) => {
                                  if (
                                    defaultStructure_data.data[index][
                                      "pair_data1"
                                    ][valueIndex]["rebate1"] == 0
                                  ) {
                                    updateDate.structure_data[index][
                                      "pair_data"
                                    ][valueIndex]["rebate"] = 0;
                                  } else {
                                    updateDate.structure_data[index][
                                      "pair_data"
                                    ][valueIndex]["rebate"] = e.target.value;
                                  }
                                });
                                setUpdateDate({
                                  ...updateDate,
                                });
                              }
                            } else if (
                              e.target.value == "" ||
                              e.target.value == 0
                            ) {
                              updateDate.structure_data[index][
                                "group_rebate"
                              ] = 0;
                              updateDate.structure_data[index][
                                "pair_data"
                              ].forEach((value, valueIndex) => {
                                updateDate.structure_data[index]["pair_data"][
                                  valueIndex
                                ]["rebate"] = 0;
                              });
                              setUpdateDate({
                                ...updateDate,
                              });
                            }
                          }}
                        />
                        {/* <input value={DbData[index]}/> */}
                        <span style={{ marginLeft: "4px" }}>
                          {item.group_rebate == "0" ? (
                            <span className="fw-700 d-block">0.00%</span>
                          ) : (
                            <span className="fw-700 d-block">
                              {(
                                (item.group_rebate * 100) /
                                defaultStructure_data.data[index].group_rebate1
                              ).toFixed(2) == Infinity
                                ? 0
                                : (
                                    (item.group_rebate * 100) /
                                    defaultStructure_data.data[index]
                                      .group_rebate1
                                  ).toFixed(2)}
                              %
                            </span>
                          )}
                        </span>
                      </div>
                      <div>
                        {/* <span>Commission</span> */}
                        <input
                          type="text"
                          className="commission_amount"
                          placeholder="Commission"
                          value={item.group_commission}
                          onChange={(e) => {
                            var floatNumber = e.target.value.split(".");
                            if (!isNaN(Number(e.target.value))) {
                              if (
                                floatNumber.length == 1 ||
                                (floatNumber.length == 2 &&
                                  floatNumber[1].length <= 3)
                              ) {
                                updateDate.structure_data[index][
                                  "group_commission"
                                ] = e.target.value;
                                updateDate.structure_data[index][
                                  "pair_data"
                                ].forEach((value, valueIndex) => {
                                  updateDate.structure_data[index]["pair_data"][
                                    valueIndex
                                  ]["commission"] = e.target.value;
                                });
                                setUpdateDate({
                                  ...updateDate,
                                });
                              }
                            } else if (
                              e.target.value == "" ||
                              e.target.value == 0
                            ) {
                              updateDate.structure_data[index][
                                "group_commission"
                              ] = 0;
                              updateDate.structure_data[index][
                                "pair_data"
                              ].forEach((value, valueIndex) => {
                                updateDate.structure_data[index]["pair_data"][
                                  valueIndex
                                ]["commission"] = 0;
                              });
                              setUpdateDate({
                                ...updateDate,
                              });
                            }
                          }}
                        />
                        {/* <span>{item.group_commission*100/defaultStructure_data.data[index].group_commission1}%</span> */}
                      </div>
                      {/* <div>
                                    {
                                      (item.ibGroup != undefined) ?
                                        <Autocomplete
                                        className='autoComplete-input-remove-border'
                                          disablePortal
                                          options={item.ibGroup}
                                          getOptionLabel={(option) => (option ? option.ib_group_name : "")}
                                          onInputChange={(event, newInputValue) => {
                                            // fetchAccount(event, newInputValue);
                                          }}
                                          onChange={(event, newValue) => {
                                            updateDate.structure_data[index]['ib_group_level_id'] = newValue.ib_group_level_id;
                                            setUpdateDate({
                                              ...updateDate
                                            });
                                          }}

                                          renderInput={(params) => <TextField {...params} label="IB Group" variant="standard" style={{ width: '100%', border: '0px !important' }} />}
                                        /> : ''
                                    }
                                  </div> */}
                    </div>

                    <div className="action-section">
                      <span
                        onClick={(e) => {
                          updateDate.structure_data[index]["is_visible"] =
                            !item.is_visible;
                          setUpdateDate({ ...updateDate });
                        }}
                      >
                        <i
                          className={`fa ${
                            item.is_visible ? "fa-angle-up" : "fa-angle-down"
                          }`}
                          aria-hidden="true"
                        ></i>
                      </span>
                    </div>
                  </div>
                  <div
                    className={`pair-section ${
                      item.is_visible ? "child-section-visible" : ""
                    }`}
                  >
                    {item.pair_data.map((item1, index1) => {
                      return (
                        <div className="pair-data">
                          <div className="pair-data-title">
                            {item1.pair_name}
                          </div>
                          <div>
                            <input
                              type="text"
                              className="rebert_amount"
                              placeholder="Rebert"
                              // value={item1.rebate}
                              value={
                                defaultStructure_data.data[index]["pair_data1"][
                                  index1
                                ]["rebate1"] == 0
                                  ? 0
                                  : item1.rebate
                              }
                              disabled={
                                defaultStructure_data.data[index]["pair_data1"][
                                  index1
                                ]["rebate1"] == 0
                                  ? true
                                  : false
                              }
                              style={
                                (
                                  (item1.rebate * 100) /
                                  defaultStructure_data.data[index][
                                    "pair_data1"
                                  ][index1]["rebate1"]
                                ).toFixed(2) > 100 &&
                                defaultStructure_data.data[index]["pair_data1"][
                                  index1
                                ]["rebate1"] != 0
                                  ? {
                                      border: "2px solid red",
                                    }
                                  : {}
                              }
                              onChange={(e) => {
                                var floatNumber = e.target.value.split(".");
                                if (!isNaN(Number(e.target.value))) {
                                  if (
                                    floatNumber.length == 1 ||
                                    (floatNumber.length == 2 &&
                                      floatNumber[1].length <= 3)
                                  ) {
                                    updateDate.structure_data[index][
                                      "pair_data"
                                    ][index1]["rebate"] = e.target.value;
                                    setUpdateDate({
                                      ...updateDate,
                                    });
                                  }
                                } else if (
                                  e.target.value == "" ||
                                  e.target.value == 0
                                ) {
                                  updateDate.structure_data[index]["pair_data"][
                                    index1
                                  ]["rebate"] = 0;
                                  setUpdateDate({
                                    ...updateDate,
                                  });
                                }
                              }}
                            />
                            {item1.rebate == "0" ? (
                              <div
                                style={{ marginLeft: "4px" }}
                                className="fw-700"
                              >
                                0%
                              </div>
                            ) : (
                              <div
                                style={{ marginLeft: "4px" }}
                                className="fw-700"
                              >
                                {(
                                  (item1.rebate * 100) /
                                  defaultStructure_data.data[index][
                                    "pair_data1"
                                  ][index1]["rebate1"]
                                ).toFixed(2) == Infinity ||
                                (
                                  (item1.rebate * 100) /
                                  defaultStructure_data.data[index][
                                    "pair_data1"
                                  ][index1]["rebate1"]
                                ).toFixed(2) == "NaN"
                                  ? 0
                                  : (
                                      (item1.rebate * 100) /
                                      defaultStructure_data.data[index][
                                        "pair_data1"
                                      ][index1]["rebate1"]
                                    ).toFixed(2)}
                                %
                              </div>
                            )}
                          </div>
                          <div>
                            <input
                              type="text"
                              className="commission_amount"
                              placeholder="Commission"
                              value={item1.commission}
                              onChange={(e) => {
                                var floatNumber = e.target.value.split(".");
                                if (!isNaN(Number(e.target.value))) {
                                  if (
                                    floatNumber.length == 1 ||
                                    (floatNumber.length == 2 &&
                                      floatNumber[1].length <= 3)
                                  ) {
                                    updateDate.structure_data[index][
                                      "pair_data"
                                    ][index1]["commission"] = e.target.value;
                                    setUpdateDate({
                                      ...updateDate,
                                    });
                                  }
                                } else if (
                                  e.target.value == "" ||
                                  e.target.value == 0
                                ) {
                                  updateDate.structure_data[index]["pair_data"][
                                    index1
                                  ]["commission"] = e.target.value;
                                  setUpdateDate({
                                    ...updateDate,
                                  });
                                }
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const addStructure = () => {
    setUpdateDate({
      structure_id: "",
      sponsor_approve: "",
      admin_approve: "",
      remarks: "",
      structure_name: "",
      structure_data: [],
      isLoader: false,
      refresh: updateDate.refresh,
    });
    viewRequest("add_new_structure_data");
    setDialogTitle("Add Structure");
    // setUpdateDate(pre)
    setIsADD(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getGroupRebate = (index) => {
    console.log("DdData", DbData, DbData[index]);
  };

  useEffect(() => {
    // defaultStructure_data.forEach(element => {
    //   DbData.push(element.group_rebate);
    // });
    console.log("DbData", DbData, updateDate, updateDate.db_structure_data);
  }, [updateDate]);

  return (
    <div className="app-content--inner">
      <div className="app-content--inner__wrapper mh-100-vh">
        <div style={{ opacity: 1 }}>
          <Grid container>
            <Grid item sm={12}></Grid>
            <Grid item xl={1}></Grid>
            <Grid item xl={10} md={12} lg={12}>
              <TopButton />
              <Grid
                container
                spacing={6}
                style={{ marginTop: 0, paddingLeft: "48px" }}
              >
                <p className="main-heading">IB Structure</p>
                <Grid item md={12} style={{ padding: 0 }}>
                  <Paper
                    elevation={2}
                    style={{ borderRadius: "10px" }}
                    className="pending-all-15px"
                  >
                    <ColorButton onClick={addStructure}>
                      Add Structure
                    </ColorButton>
                    <CommonTable
                      url={`${Url}/datatable/my_structures.php`}
                      column={column}
                      sort="2"
                      filter={filterData}
                      refresh={updateDate.refresh}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="modalWidth100"
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          className="dialogTitle"
          onClose={handleClose}
        >
          {dialogTitle}
        </BootstrapDialogTitle>
        <DialogContent dividers>{manageContent()}</DialogContent>
        <DialogActions>{manageDialogActionButton()}</DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default IBCommisionGroup;
