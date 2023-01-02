import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Chip,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import { Paper, DialogContent, DialogTitle } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import { styled, useTheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import InfoIcon from "@mui/icons-material/Info";
import CheckIcon from "@mui/icons-material/Check";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  BootstrapInput,
  ColorButton,
} from "../../../customComponet/CustomElement";

import "react-toastify/dist/ReactToastify.css";
import TopButton from "../../../customComponet/TopButton";
import { IsApprove, Url } from "../../../../global";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../customComponet/CommonTable";
import { ViewAgendaSharp } from "@mui/icons-material";
import NewDate from "../../../commonComponet/NewDate";
const BootstrapInput1 = styled(TextField)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(0),
  },
  "& .MuiInputBase-input": {
    borderRadius: 9,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "8px 26px 8px 10px",
    marginTop: 0,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Cairo, sans-serif"].join(","),
    "&:hover": {
      borderColor: "#2A3F73;",
    },
    "&:focus": {
      borderRadius: 9,
      borderColor: "#2A3F73;",
      border: "2px solid #2A3F73;",
    },
  },
}));
const Ibasign = () => {
  const [open, setOpen] = React.useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [ibdata, setIbData] = useState("");
  const [refresh, setRefresh] = React.useState(false);
  const navigate = useNavigate();
  const [mainLoader, setMainLoader] = useState(false);
  const [ibstatus, setIbStatus] = useState("");
  const [openTableMenus, setOpenTableMenus] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [getStructuresList, setGetStructuresList] = useState([]);

  const [updateDate, setUpdateDate] = useState({
    structure_id: "",
    sponsor_approve: "",
    remarks: "",
    structure_name: "",
    structure_data: [],
    isLoader: false,
    refresh: false,
    structure_id: "",
  });
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
      name: "USER NAME",
      selector: (row) => {
        return (
          <span title={row.requested_user_name}>{row.requested_user_name}</span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.7,
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
      grow: 0.4,
    },
    {
      name: "ACQUIRE CLIENT",
      selector: (row) => {
        return <span title={row.acquire_client}>{row.acquire_client}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "COUNTRY",
      selector: (row) => {
        return <span title={row.countries}>{row.countries}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.4,
    },
    {
      name: "EMAIL",
      selector: (row) => {
        return <span title={row.user_email}>{row.user_email}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.7,
    },
    {
      name: "Website Url",
      selector: (row) => {
        return (
          <span title={row.website_url}>
            <a href={row.website_url} target="_blank">
              {row.website_url}
            </a>
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "STRUCTURE NAME",
      selector: (row) => {
        return <span title={row.structure_name}>{row.structure_name}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.4,
    },
    {
      name: "User Target",
      selector: (row) => {
        return <span title={row.month}>{row.month}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "REFFEERED",
      selector: (row) => {
        return (
          <span title={row.structure_name}>
            {row.is_reffered == "0" ? "NO" : "YES"}
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "WEBSITE",
      selector: (row) => {
        return (
          <span title={row.is_website}>
            {row.is_website == "0" ? "NO" : "YES"}
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },

    {
      name: "REMARK",
      selector: (row) => {
        return <span title={row.remarks}>{row.remarks}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "SPONSOR APPROVE",
      selector: (row) => {
        return (
          <span
            title={row.sponsor_approve}
            className={`text-color-${
              row.sponsor_approve == "1"
                ? "green"
                : row.sponsor_approve == "2"
                ? "red"
                : "yellow"
            }`}
          >
            {row.sponsor_approve == "1"
              ? "APPROVED"
              : row.sponsor_approve == "2"
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
    {
      name: "ADMIN APPROVE",
      selector: (row) => {
        return (
          <span
            title={row.admin_approve}
            className={`text-color-${
              row.admin_approve == "1"
                ? "green"
                : row.admin_approve == "2"
                ? "red"
                : "yellow"
            }`}
          >
            {row.admin_approve == "1"
              ? "APPROVED"
              : row.admin_approve == "2"
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
    ,
    {
      name: "ACTION",
      selector: (row) => {
        return (
          <>
            {row.sponsor_approve == "0" ? (
              <span title={row.structure_name}>
                {" "}
                {row.status == "1" ? (
                  ""
                ) : (
                  <Button
                    sx={{ color: "black" }}
                    onClick={() => {
                      viewRequest(row);
                      setUpdateDate((preValue) => {
                        return {
                          ...preValue,
                          remarks: row.remarks,
                          requested_user_id: row.requested_user_id,
                          ib_application_id: row.ib_application_id,
                        };
                      });
                    }}
                  >
                    <i className="material-icons">view_timeline</i>
                  </Button>
                )}
              </span>
            ) : (
              ""
            )}
          </>
        );
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
  ];
  const viewRequest = (prop) => {
    setOpenModel(true);
    setIbData(prop);
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("action", "get_my_structure");
    axios
      .post(Url + "/ajaxfiles/partnership_request_manage.php", param)
      .then((res) => {
        setGetStructuresList(res.data.data);
      });
  };
  const handleClose = () => {
    setOpenModel(false);
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

  const updatePartnership = async () => {
    // var error = false;
    // if (updateDate.structure_name == "") {
    //     toast.error("Please enter structure name");
    //     error = true;
    // } else {
    //   updateDate.structure_data.forEach(element => {
    //         console.log(element.ib_group_name, element.group_rebate);
    //         if (element.group_rebate === "") {
    //             toast.error(`Please enter ${element.ib_group_name} rebate`);
    //             error = true;
    //             return false;
    //         } else if (element.group_commission === "") {
    //             toast.error(`Please enter ${element.ib_group_name} commission`);
    //             error = true;
    //             return false;
    //         } else if (element.ib_group_level_id === 0) {
    //             toast.error(`Please enter ${element.ib_group_name} ib group`);
    //             error = true;
    //             return false;
    //         } else {
    //             element.pair_data.forEach(element1 => {
    //                 if (element1.rebate === "") {
    //                     toast.error(`Please enter ${element.ib_group_name} in ${element1.pair_name} rebate`);
    //                     error = true;
    //                     return false;
    //                 } else if (element1.commission === "") {
    //                     toast.error(`Please enter ${element.ib_group_name} in ${element1.pair_name} commission`);
    //                     error = true;
    //                     return false;
    //                 }
    //             });
    //         }
    //         if (error) {
    //             return false;
    //         }
    //     });
    // }
    // if (error) {
    //     return false;
    // }
    if (updateDate.structure_id == "") {
      toast.error("Please assign structure");
    } else if (updateDate.sponsor_approve == "") {
      toast.error("Sponsor approval status is required");
    } else {
      updateDate.isLoader = true;
      setUpdateDate({ ...updateDate });
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      param.append("requested_user_id", ibdata.requested_user_id);
      param.append("ib_application_id", ibdata.ib_application_id);
      param.append("remarks", updateDate.remarks);
      param.append("sponsor_approve", updateDate.sponsor_approve);
      param.append("structure_id", updateDate.structure_id);

      param.append("action", "update_partnership_request");

      // param.append('pair_data', JSON.stringify(updateDate.structure_data));

      await axios
        .post(`${Url}/ajaxfiles/partnership_request_manage.php`, param)
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
            setOpenModel(false);
            setUpdateDate({
              structure_id: "",
              sponsor_approve: "",
              admin_approve: "",
              remarks: "",
              structure_name: "",
              structure_data: [],
              isLoader: false,
              refresh: !updateDate.refresh,
              structure_id: "",
            });
          }
        });
    }
    // }
  };

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item md={12} lg={12} xl={12}>
                <p className="main-heading">IB Request List</p>

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
                            filterData.sponsor_approve
                              ? filterData.sponsor_approve
                              : ""
                          }
                          onChange={(e) => {
                            filterData.sponsor_approve = e.target.value;
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
                    url={`${Url}/datatable/partnership_requests.php`}
                    column={column}
                    sort="2"
                    param={filterData}
                    refresh={updateDate.refresh}
                  />
                </Paper>
              </Grid>
              <Dialog
                open={openModel}
                onClose={handleClose}
                // aria-labelledby="alert-dialog-title"
                // aria-describedby="alert-dialog-description"
                style={{
                  opacity: "1",
                  transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                }}
                PaperProps={{
                  sx: {
                    width: "100%",
                    maxWidth: "768px",
                    borderRadius: "10px",
                    elevation: "24",
                    class: "border border-bottom-0",
                  },
                }}
              >
                <DialogTitle
                  id="alert-dialog-title"
                  className="d-flex align-items-center p-3"
                  style={{ borderBottom: "none" }}
                >
                  <h5 className="ml-3 w-100 text-start mt-2 mb-2 font-weight-bold">
                    View IB
                  </h5>
                  <CloseIcon
                    onClick={() => {
                      setOpenModel(false);
                    }}
                  />
                </DialogTitle>
                <DialogContent className="create-account-content ml-4">
                  <Grid
                    container
                    spacing={1}
                    // className="MuiGrid-justify-xs-space-between mt-2"
                  >
                    <div>
                      <div className="main-content-display">
                        <div className="display-element">
                          <h6>User Name</h6>
                          <div>{ibdata.requested_user_name}</div>
                        </div>
                        <div className="display-element">
                          <h6>DATE</h6>
                          <div>{ibdata.date}</div>
                        </div>
                        <div className="display-element">
                          <h6>ACQUIRE CLIENT</h6>
                          <div>{ibdata.acquire_client}</div>
                        </div>
                        <div className="display-element">
                          <h6>COUNTRY</h6>
                          <div>{ibdata.countries}</div>
                        </div>
                        <div className="display-element">
                          <h6>EMAIL</h6>
                          <div>{ibdata.user_email}</div>
                        </div>
                        <div className="display-element">
                          <h6>REFFEERED</h6>
                          <div>{ibdata.is_reffered == "0" ? "NO" : "YES"}</div>
                        </div>
                        <div className="display-element">
                          <h6>WEBSITE</h6>
                          <div>{ibdata.is_website == "0" ? "No" : "Yes"}</div>
                        </div>
                        {ibdata.is_website == "1" ? (
                          <div className="display-element">
                            <h6>WEBSITE URL</h6>
                            <div>{ibdata.website_url}</div>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="display-element">
                          <h6>User Target</h6>
                          <div>{ibdata.month}</div>
                        </div>
                        <div className="display-element">
                          <h6>REMARK</h6>
                          <div>{ibdata.remarks}</div>
                        </div>
                        <div className="display-element">
                          <h6>IB APPROVE</h6>
                          <div
                            className={`col s12 text-color-${
                              ibdata.sponsor_approve == "1"
                                ? "green"
                                : ibdata.sponsor_approve == "2"
                                ? "red"
                                : "yellow"
                            }`}
                          >
                            {ibdata.sponsor_approve == "1"
                              ? "APPROVED"
                              : ibdata.sponsor_approve == "2"
                              ? "REJECTED"
                              : "PENDING"}
                          </div>
                        </div>
                        <div className="display-element">
                          <h6>ADMIN APPROVE</h6>
                          <div
                            className={`col s12 text-color-${
                              ibdata.admin_approve == "1"
                                ? "green"
                                : ibdata.admin_approve == "2"
                                ? "red"
                                : "yellow"
                            }`}
                          >
                            {ibdata.admin_approve == "1"
                              ? "APPROVED"
                              : ibdata.admin_approve == "2"
                              ? "REJECTED"
                              : "PENDING"}
                          </div>
                        </div>
                        <div className="display-element">
                          <h6>STATUS</h6>
                          <div
                            className={`col s12 text-color-${
                              ibdata.status == "1"
                                ? "green"
                                : ibdata.status == "2"
                                ? "red"
                                : "yellow"
                            }`}
                          >
                            {ibdata.status == "1"
                              ? "APPROVED"
                              : ibdata.status == "2"
                              ? "REJECTED"
                              : "PENDING"}
                          </div>
                        </div>{" "}
                      </div>
                    </div>
                    <div className="divider"></div>
                    <div className="main-content-input">
                      <div className="ib-structure view-commission-content-section">
                        {/* <div style={{ width: '100%' }}>
                    <TextField label="Structure Name" variant="standard" sx={{ width: '100%' }} name='structure_name' value={updateDate.structure_name} onChange={input1} />
                </div>
                      {
                        updateDate.structure_data.map((item, index) => {
                          return (
                              <div className="group-structure-section">
                                  <div className="main-section">
                                      <div>{item.ib_group_name}</div>
                                      <div>
                                          <input type='number' className="rebert_amount" placeholder="Rebert" value={item.group_rebate}
                                              onChange={(e) => {
                                                updateDate.structure_data[index]['group_rebate'] = e.target.value;
                                                  setUpdateDate({
                                                      ...updateDate
                                                  });
                                              }} />
                                      </div>
                                      <div>
                                          <input type='number' className="commission_amount" placeholder="Commission" value={item.group_commission}
                                              onChange={(e) => {
                                                updateDate.structure_data[index]['group_commission'] = e.target.value;
                                                  setUpdateDate({
                                                      ...updateDate
                                                  });
                                              }}
                                          />
                                      </div>
                                      <div>
                                          {
                                              (item.ibGroup != undefined) ?
                                                  <FormControl variant="standard">
                                                      <Select
                                                          label
                                                          className="select-font-small"
                                                          value={item.ib_group_level_id}
                                                          name="title"
                                                          onChange={(e) => {
                                                            updateDate.structure_data[index]['ib_group_level_id'] = e.target.value;
                                                              setUpdateDate({
                                                                  ...updateDate
                                                              });
                                                          }}
                                                      >
                                                          <MenuItem value={0}>Select IB Group</MenuItem>
                                                          {
                                                              item.ibGroup.map((item1, index1) => {
                                                                  return (
                                                                      <MenuItem value={item1.ib_group_level_id}>{item1.ib_group_name}</MenuItem>
                                                                  );
                                                              })
                                                          }
                                                      </Select>
                                                  </FormControl> : ''
                                          }
                                      </div>
                                  </div>
                                  <div className="pair-section">
                                      {
                                          item.pair_data.map((item1, index1) => {
                                              return (
                                                  <div className="pair-data">
                                                      <div>{item1.pair_name}</div>
                                                      <div>
                                                          <input type='number' className="rebert_amount" placeholder="Rebert" value={item1.rebate}
                                                              onChange={(e) => {
                                                                updateDate.structure_data[index]['pair_data'][index1]['rebate'] = e.target.value;
                                                                  setUpdateDate({
                                                                      ...updateDate
                                                                  });
                                                              }}
                                                          />
                                                      </div>
                                                      <div>
                                                          <input type='number' className="commission_amount" placeholder="Commission" value={item1.commission}
                                                              onChange={(e) => {
                                                                  updateDate.structure_data[index]['pair_data'][index1]['commission'] = e.target.value;
                                                                  setUpdateDate({
                                                                      ...updateDate
                                                                  });
                                                              }}
                                                          />
                                                      </div>
                                                  </div>
                                              );
                                          })
                                      }
                                  </div>
                              </div>
                          );
                      })
                      } */}
                      </div>
                      <div>
                        <label
                          htmlFor="sponsor_approve"
                          className="text-info font-weight-bold form-label-head w-100  required"
                        >
                          Structure Name
                        </label>
                        <Select
                          value={updateDate.structure_id}
                          name="structure_id"
                          onChange={input1}
                          displayEmpty
                          inputProps={{
                            "aria-label": "Without label",
                          }}
                          input={<BootstrapInput />}
                          className="mt-0 ml-0"
                          style={{ width: "100%" }}
                        >
                          <MenuItem value="">Select Option</MenuItem>
                          {getStructuresList.map((item) => {
                            return (
                              <MenuItem value={item.structure_id}>
                                {item.structure_name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </div>
                      <div>
                        <label
                          htmlFor="sponsor_approve"
                          className="text-info font-weight-bold form-label-head w-100  required"
                        >
                          Sponsor Approve
                        </label>
                        <Select
                          value={updateDate.sponsor_approve}
                          name="sponsor_approve"
                          onChange={input1}
                          displayEmpty
                          inputProps={{
                            "aria-label": "Without label",
                          }}
                          input={<BootstrapInput />}
                          className="mt-0 ml-0"
                          style={{ width: "100%" }}
                        >
                          <MenuItem value="">Select Option</MenuItem>
                          <MenuItem value="0">PENDING</MenuItem>
                          <MenuItem value="1">APPROVED</MenuItem>
                          <MenuItem value="2">REJECTED</MenuItem>
                        </Select>
                      </div>
                      <div>
                        <label
                          htmlFor="remarks"
                          className="text-info font-weight-bold form-label-head w-100 mt-4 required"
                        >
                          Remarks
                        </label>
                        <BootstrapInput
                          name="remarks"
                          value={updateDate.remarks}
                          onChange={input1}
                          displayEmpty
                          inputProps={{
                            "aria-label": "Without label",
                          }}
                        />
                      </div>
                      <div>
                        {updateDate.isLoader ? (
                          <ColorButton
                            tabindex="0"
                            size="large"
                            className="spinerforpat "
                            disabled
                          >
                            <svg class="spinner" viewBox="0 0 50 50">
                              <circle
                                class="path"
                                cx="25"
                                cy="25"
                                r="20"
                                fill="none"
                                stroke-width="5"
                              ></circle>
                            </svg>
                          </ColorButton>
                        ) : (
                          <ColorButton onClick={updatePartnership}>
                            {updateDate.structure_id == ""
                              ? "Insert"
                              : "Update"}
                          </ColorButton>
                        )}
                      </div>
                    </div>
                  </Grid>
                </DialogContent>
              </Dialog>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const Partnership = () => {
  const theme = useTheme();
  const [ibstatus, setIbStatus] = useState("");
  const [mainLoader, setMainLoader] = useState(true);
  const [countryData, setCountryData] = useState({
    data: [],
  });
  const navigate = useNavigate();
  const [option, setOption] = useState(false);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [status, setStatus] = useState();

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [isSubmit, setIsSubmit] = useState(false);
  const [partnership, setPartnership] = useState(true);
  const [ageErrors, setAgeErrors] = useState({});
  const [ibData, setIBData] = useState({});
  //   const[data,setData]=useEffect()
  const [infoTrue, setinfoTrue] = useState({
    website_url: false,
    clients: false,
    countries: false,
    numberOfClients: false,
  });
  const [age, setAge] = useState({
    is_website: "No",
    is_reffered: "No",
    website_url: "",
    clients: "",
    countries: [],
    numberOfClients: "",
    isLoader: false,
  });
  console.log(age);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAge((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
    console.log(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setAgeErrors(validate(age));
    setIsSubmit(true);
  };
  const trueFalse = (event) => {
    var { name, value } = event.target;
    setinfoTrue((prevalue) => {
      return {
        ...prevalue,
        [name]: true,
      };
    });
  };
  const validate = (values) => {
    const errors = {};
    if (!values.clients) {
      errors.clients = "Way of acquired clients required";
      notify("Way of acquired clients required");
    } else if (!values.countries) {
      errors.countries = "Please select at least one country";
      notify("Please select at least one country");
    } else if (!values.numberOfClients) {
      errors.numberOfClients = "Expected number of clients required";
      notify("Expected number of clients required");
    } else if (!values.is_website) {
      errors.is_website = "Expected2 number of clients required";
      notify("Expected2 number of clients required");
    } else if (!values.is_reffered) {
      errors.is_reffered = "Expected3 number of clients required";
      notify("Expected3 number of clients required");
    }
    return errors;
  };
  const notify = (p) => {
    toast.error(p);
  };
  console.log("age.countries", age.countries);
  toast.configure();
  useEffect(() => {
    if (Object.keys(ageErrors).length === 0 && isSubmit) {
      setAge((prevalue) => {
        return {
          ...prevalue,
          isLoader: true,
        };
      });
      const param = new FormData();
      param.append("is_website", age.is_website == "Yes" ? 1 : 0);
      param.append("is_reffered", age.is_reffered == "Yes" ? 1 : 0);
      param.append("acquire_client", age.clients);
      param.append("countries", age.countries);
      param.append("month", age.numberOfClients);
      if (age.is_website == "Yes") {
        param.append("website_url", age.website_url);
      }
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("user_id", IsApprove.user_id);
        param.append("auth_key", IsApprove.auth);
      }
      axios
        .post(Url + "/ajaxfiles/add_ibapplication.php", param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            navigate("/");
            setAge((prevalue) => {
              return {
                ...prevalue,
                isLoader: false,
              };
            });
          }
          if (res.data.status == "error") {
            setAge((prevalue) => {
              return {
                ...prevalue,
                isLoader: false,
              };
            });
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            ibstatusdata();
            setAge((prevalue) => {
              return {
                ...prevalue,
                isLoader: false,
              };
            });
            setOpen(false);
            setPartnership(false);
            // setData(res.data.ib_data)
          }
        });
    }
  }, [ageErrors, isSubmit]);
  console.log("ibData", ibData);

  const fatchKycStatus = async () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    await axios
      .post(Url + "/ajaxfiles/get_kyc_status.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          setStatus(res.data.kyc_data.master_status);
        } else {
          setStatus(res.data.kyc_data.master_status);
        }
      });
  };

  useEffect(() => {
    fatchKycStatus();
  }, []);

  const ibstatusdata = () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    axios
      .post(Url + "/ajaxfiles/ib_application_status.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          setIbStatus(res.data);
          if (res.data.ib_data) {
            setPartnership(false);
            setIBData({ ...res.data.ib_data });
          }
          setMainLoader(false);
        }
      });
  };
  useEffect(() => {
    ibstatusdata();
    const param = new FormData();
    axios.post(Url + "/datatable/get_countries.php", param).then((res) => {
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        countryData.data = res.data.aaData;
        setCountryData({ ...countryData });
        console.log("countryData", countryData);
      }
    });
  }, []);
  const partner = () => {
    console.log(
      "ibstatus.ib_applied_status",
      ibstatus.ib_applied_status,
      ibstatus
    );
    if (ibstatus.ib_applied_status == "0" && ibstatus.ib_status == "0") {
      return (
        <div className="text-dark w-100 h-100">
          <h5 className="text-center font-weight-bold text-dark py-5">
            You have not applied for IB User, Please click below to apply for IB
            User
          </h5>
          <div className="text-center pb-5">
            {status == "1" ? (
              <Button
                type="submit"
                variant="contained"
                size="small"
                sx={{ padding: "10px" }}
                className="text-center text-capitalize rounded-pill"
                onClick={handleClickOpen("paper")}
              >
                Request For IB User
              </Button>
            ) : (
              <div>
                <ColorButton
                  variant="contained"
                  size="large"
                  sx={{ textTransform: "uppercase" }}
                  onClick={() => {
                    navigate("/myDocuments");
                  }}
                >
                  first complete your kyc process
                </ColorButton>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      if (ibstatus.ib_applied_status == "1" && ibstatus.ib_status == "0") {
        return (
          <div className="card-body position-relative">
            <Grid container spacing={3}>
              <Grid item md={12} className="d-flex position-relative mh-150">
                <div className="text-dark w-100 h-100">
                  <h5 className="text-center font-weight-bold text-dark py-5">
                    <div>
                      <CheckIcon
                        style={{
                          fontSize: "5rem",
                          color: "#3D9730",
                          paddingBottom: "1rem",
                        }}
                      />
                    </div>
                    We have received your request for participation. Our
                    executive will get you in touch soon.
                  </h5>
                </div>
              </Grid>
            </Grid>
          </div>
        );
      } else if (
        (ibstatus.ib_applied_status == "2" && ibstatus.ib_status == "0") ||
        (ibstatus.ib_applied_status == "1" && ibstatus.ib_status == "2")
      ) {
        return (
          <div className="card-body position-relative">
            <Grid container spacing={3}>
              <Grid item md={12} className="d-flex position-relative mh-150">
                <div className="text-dark w-100 h-100">
                  <h5 className="text-center font-weight-bold text-dark py-5">
                    <div>
                      <ThumbDownIcon
                        style={{
                          fontSize: "5rem",
                          color: "rgb(207 23 23)",
                          paddingBottom: "1rem",
                        }}
                      />
                    </div>
                    Your request has been rejected.
                    <br />
                    {ibstatus.ib_data.remarks}
                  </h5>
                  <div className="text-center pb-5">
                    <Button
                      type="submit"
                      variant="contained"
                      size="small"
                      sx={{ padding: "10px" }}
                      className="text-center text-capitalize rounded-pill"
                      onClick={handleClickOpen("paper")}
                    >
                      Request For IB User
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        );
      } else if (ibData.status == "3") {
        return (
          <div className="card-body position-relative">
            <Grid container spacing={3}>
              <Grid item md={12} className="d-flex position-relative mh-150">
                <div className="text-dark w-100 h-100">
                  <div className="center-text">
                    <h5 className="text-center font-weight-bold text-dark py-5">
                      <div>
                        <CancelIcon
                          style={{
                            fontSize: "5rem",
                            color: "rgb(255 3 3)",
                            paddingBottom: "1rem",
                          }}
                        />
                      </div>
                      We have rejected your IB Request.
                    </h5>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ padding: "10px" }}
                      size="small"
                      className="text-center text-capitalize rounded-pill"
                      onClick={handleClickOpen("paper")}
                    >
                      Request For IB User
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        );
      }
    }
  };
  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          {mainLoader == true ? (
            <div className="loader1">
              <div className="clock">
                <div className="pointers"></div>
              </div>
            </div>
          ) : (
            <div style={{ opacity: 1 }}>
              <Grid container>
                <Grid item sm={12}></Grid>
                <Grid item xl={1}></Grid>
                <Grid item xl={10} md={12} lg={12}>
                  <TopButton />
                  <Grid container>
                    <Grid item md={12} className="d-flex"></Grid>
                    <Grid item md={12}>
                      {ibstatus.ib_applied_status == "1" &&
                      ibstatus.ib_status == "1" ? (
                        <Ibasign />
                      ) : (
                        <Paper
                          elevation={1}
                          style={{ borderRadius: "10px" }}
                          className="w-100 mb-5"
                        >
                          <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                            <h5 className="font-weight-bold mb-0 text-dark">
                              Partnership Program
                            </h5>
                          </div>
                          <div className="divider"></div>
                          <div className="card-body position-relative">
                            <Grid container spacing={3}>
                              <Grid
                                item
                                md={12}
                                className="d-flex position-relative mh-150"
                              >
                                {partner()}
                              </Grid>
                            </Grid>
                          </div>
                        </Paper>
                      )}
                    </Grid>
                  </Grid>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    style={{
                      opacity: "1",
                      transition:
                        "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                    }}
                    PaperProps={{
                      sx: {
                        width: "100%",
                        maxWidth: "768px",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <div
                      id="form-dialog-title"
                      className="d-flex align-items-center p-3 ib-application-header justify-content-center"
                    >
                      <div className="w-100">
                        <h5 className="w-100 text-center text-info mb-2 font-weight-bold">
                          IB Application
                        </h5>
                      </div>
                      <CloseIcon
                        onClick={() => {
                          setOpen(false);
                        }}
                      />
                    </div>
                    <DialogContent dividers={scroll === "paper"}>
                      <Grid container spacing={6} style={{ margin: "-24px" }}>
                        <Grid item md={12} className="pl-4 pr-4">
                          <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                              <Grid
                                item
                                md={10}
                                sm={8}
                                className="mb-1 d-flex align-items-center"
                              >
                                <div className="font-weight-bold mb-2 required">
                                  Do you have any financial market webiste /
                                  blog you intend to user for promotion?
                                </div>
                              </Grid>
                              <Grid item md={2} sm={4}>
                                <FormControl className="w-100">
                                  <Select
                                    label="No"
                                    defaultValue="No"
                                    name="is_website"
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                    input={<BootstrapInput />}
                                  >
                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                              {age.is_website == "Yes" ? (
                                <>
                                  {" "}
                                  <Grid
                                    item
                                    md={5}
                                    sm={12}
                                    className="d-flex align-items-center"
                                  >
                                    <div className="font-weight-bold mb-2">
                                      webiste / blog Name
                                    </div>
                                  </Grid>{" "}
                                  <Grid item md={7} sm={12}>
                                    <FormControl className="w-100">
                                      <BootstrapInput
                                        value={age.website_url}
                                        name="website_url"
                                        onChange={handleChange}
                                        displayEmpty
                                        inputProps={{
                                          "aria-label": "Without label",
                                        }}
                                      />
                                    </FormControl>
                                  </Grid>
                                </>
                              ) : (
                                ""
                              )}
                              <Grid
                                item
                                md={10}
                                sm={8}
                                className="mb-1 d-flex align-items-center"
                              >
                                <div className="font-weight-bold mb-2 required">
                                  Have you reffered clients to other providers?
                                </div>
                              </Grid>
                              <Grid item md={2} sm={4}>
                                <FormControl className="w-100">
                                  <Select
                                    label="No"
                                    defaultValue="No"
                                    name="is_reffered"
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                    input={<BootstrapInput />}
                                  >
                                    <MenuItem
                                      value="Yes"
                                      onClick={() => setOption(true)}
                                    >
                                      Yes
                                    </MenuItem>
                                    <MenuItem
                                      value="No"
                                      onClick={() => setOption(false)}
                                    >
                                      No
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                              {option && (
                                <Grid
                                  item
                                  md={5}
                                  sm={12}
                                  className="d-flex align-items-center"
                                >
                                  <div className="font-weight-bold mb-2">
                                    Please mention the provider
                                  </div>
                                </Grid>
                              )}
                              {option && (
                                <Grid item md={7} sm={12}>
                                  <FormControl className="w-100">
                                    <BootstrapInput
                                      value={age.provider}
                                      name="provider"
                                      onChange={handleChange}
                                      displayEmpty
                                      inputProps={{
                                        "aria-label": "Without label",
                                      }}
                                    />
                                  </FormControl>
                                </Grid>
                              )}
                              <Grid
                                item
                                md={5}
                                sm={12}
                                className="d-flex align-items-center"
                              >
                                <div className="font-weight-bold mb-2 required">
                                  How do you acquire clients?
                                </div>
                              </Grid>
                              <Grid item md={7} sm={12}>
                                <FormControl className="w-100">
                                  <Select
                                    value={age.clients}
                                    name="clients"
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                    input={<BootstrapInput />}
                                    onBlur={trueFalse}
                                  >
                                    <MenuItem value="Wide range of personal network">
                                      Wide range of personal network
                                    </MenuItem>
                                    <MenuItem value="Developing trading strategies and signals">
                                      Developing trading strategies and signals
                                    </MenuItem>
                                    <MenuItem value="Providing Forex education seminars">
                                      Providing Forex education seminars
                                    </MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                  </Select>
                                  {age.clients == "" &&
                                  infoTrue.clients == true ? (
                                    <FormHelperText>
                                      Please select acquire clients
                                    </FormHelperText>
                                  ) : (
                                    ""
                                  )}
                                </FormControl>
                              </Grid>
                              <Grid
                                item
                                sm={12}
                                className="d-flex align-items-center"
                              >
                                <div className="font-weight-bold mb-2 required">
                                  Countries of audience intending to acquire
                                </div>
                              </Grid>
                              <Grid item sm={12} className="mb-1">
                                <FormControl className="w-100">
                                  <Autocomplete
                                    multiple
                                    id="tags-standard"
                                    name="countries"
                                    onChange={(event, value) => {
                                      const note = () => {
                                        var notedata = [];

                                        value.map((item, index) => {
                                          notedata.push(item.nicename);
                                        });
                                        return notedata;
                                      };
                                      age.countries = note();
                                      setAge({ ...age });
                                      console.log("esdfv", value, event);
                                    }}
                                    options={countryData.data}
                                    getOptionLabel={(option) => option.nicename}
                                    // defaultValue={[top100Films[13]]}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        variant="standard"
                                        placeholder="Countries"
                                      />
                                    )}
                                    onBlur={trueFalse}
                                  />
                                  {age.countries.length == 0 &&
                                  infoTrue.countries == true ? (
                                    <FormHelperText>
                                      Please select Countrie
                                    </FormHelperText>
                                  ) : (
                                    ""
                                  )}
                                  {/* <Select
                                    value={age.countries}
                                    name="countries"
                                    onChange={handleChange}
                                    label="Countries"
                                    multiple
                                    MenuProps={MenuProps}
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                    renderValue={(selected) => (
                                      <Box
                                        sx={{
                                          display: "flex",
                                          flexWrap: "wrap",
                                          gap: 0.5,
                                        }}
                                      >
                                        {selected.map((value, index) => (
                                          <>
                                            <Chip
                                              key={value}
                                              label={value}
                                              onDelete={() => {
                                                delete selected[index];
                                              }}
                                            />
                                          </>
                                        ))}
                                      </Box>
                                    )}
                                    input={<BootstrapInput />}
                                  >
                                    <MenuItem value="">
                                      Select Countries
                                    </MenuItem>
                                    {countryData.data.map((item, index) => {
                                      return (
                                        <MenuItem
                                          key={index}
                                          value={item.nicename}
                                        >
                                          {item.nicename}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select> */}
                                </FormControl>
                              </Grid>
                              <Grid
                                item
                                md={8}
                                className="mb-1 d-flex align-items-center"
                              >
                                <div className="font-weight-bold mb-2 required">
                                  How many clients do you expect introducting in
                                  the first 12 months?
                                </div>
                              </Grid>
                              <Grid item md={4}>
                                <FormControl className="w-100">
                                  <BootstrapInput
                                    value={age.numberOfClients}
                                    name="numberOfClients"
                                    className="placeholderClients"
                                    placeholder="Enter expecting clients"
                                    onChange={(e) => {
                                      if (!isNaN(Number(e.target.value))) {
                                        handleChange(e);
                                      }
                                    }}
                                    id="outlined-number"
                                    style={{ width: "80%" }}
                                    type="text"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    onBlur={trueFalse}
                                  />
                                  {/* {age.numberOfClients == "" &&
                                  infoTrue.numberOfClients == true ? (
                                    <FormHelperText>
                                      Please Enter number Of clients
                                    </FormHelperText>
                                  ) : (
                                    ""
                                  )} */}
                                </FormControl>
                              </Grid>
                            </Grid>
                            <div className="my-3 text-center">
                              {age.isLoader ? (
                                <ColorButton
                                  tabindex="0"
                                  size="large"
                                  className="spinerforpat "
                                  sx={{ padding: "10px" }}
                                  disabled
                                >
                                  <svg class="spinner" viewBox="0 0 50 50">
                                    <circle
                                      class="path"
                                      cx="25"
                                      cy="25"
                                      r="20"
                                      fill="none"
                                      stroke-width="5"
                                    ></circle>
                                  </svg>
                                </ColorButton>
                              ) : (
                                <Button
                                  type="submit"
                                  variant="contained"
                                  size="small"
                                  sx={{ padding: "10px" }}
                                  className="text-center text-capitalize rounded-pill"
                                >
                                  Request For IB User
                                </Button>
                              )}
                            </div>
                          </form>
                        </Grid>
                      </Grid>
                    </DialogContent>
                  </Dialog>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
