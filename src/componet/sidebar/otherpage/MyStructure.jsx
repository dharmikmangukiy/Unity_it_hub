import React, { useEffect, useState } from "react";
import TopButton from "../../customComponet/TopButton";
import { Grid, Paper } from "@mui/material";
import { IsApprove, Url } from "../../../global.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './otherpage.css';

const MyStructure = () => {
  const navigate = useNavigate();
  const [mainLoader, setMainLoader] = useState(true);

  const [updateDate, setUpdateDate] = useState({
    structure_id: "",
    sponsor_approve: "",
    remarks: "",
    structure_name: "",
    structure_data: [],
    isLoader: false,
    refresh: false,
    admin_approve: "",
  });

  useEffect(() => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("action", "get_my_assigned_structure");
    axios
      .post(Url + "/ajaxfiles/partnership_request_manage.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        // setLeverageForm(res.data.data);
        updateDate.structure_data = res.data.data;
        setMainLoader(false)
        setUpdateDate({ ...updateDate });
      });
  }, []);
  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          {mainLoader == true ? (
            // <div className="loader1">
            //   <div className="clock">
            //     <div className="pointers"></div>
            //   </div>
            // </div>
            <span className="loader2"></span>
          ) : (
            <div style={{ opacity: 1 }}>
              <Grid container>
                <Grid item sm={12}></Grid>
                <Grid item xl={1}></Grid>
                <Grid item xl={10} md={12} lg={12}>
                  <Grid container>
                    <Grid item md={12}>
                      <p className="main-heading">My Structure</p>
                      <Paper
                        elevation={1}
                        style={{ borderRadius: "10px" }}
                        className="w-100 mb-5"
                      >
                        <div className="main-content-input .partnership-main-section">
                          <div className="ib-structure view-commission-content-section">
                            {updateDate.structure_data.map((item, index) => {
                              return (
                                <div className="group-structure-section">
                                  <div className="main-section">
                                    <div className="main-section-title">
                                      {item.ib_group_name}
                                    </div>
                                    <div className="main-section-input-element">
                                      <div>
                                        {/* <span>Rebate</span> */}
                                        <input
                                          type="number"
                                          className="Rebate_amount"
                                          placeholder="Rebate"
                                          value={item.group_rebate}
                                          disabled
                                          onChange={(e) => {
                                            var floatNumber =
                                              e.target.value.split(".");
                                            if (
                                              !isNaN(Number(e.target.value))
                                            ) {
                                              if (
                                                floatNumber.length == 1 ||
                                                (floatNumber.length == 2 &&
                                                  floatNumber[1].length <= 3)
                                              ) {
                                                updateDate.structure_data[
                                                  index
                                                ]["group_rebate"] =
                                                  e.target.value;
                                                updateDate.structure_data[
                                                  index
                                                ]["pair_data"].forEach(
                                                  (value, valueIndex) => {
                                                    updateDate.structure_data[
                                                      index
                                                    ]["pair_data"][valueIndex][
                                                      "rebate"
                                                    ] = e.target.value;
                                                  }
                                                );
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
                                                updateDate.structure_data[
                                                  index
                                                ]["pair_data"][valueIndex][
                                                  "rebate"
                                                ] = 0;
                                              });
                                              setUpdateDate({
                                                ...updateDate,
                                              });
                                            }
                                          }}
                                        />
                                      </div>
                                      <div>
                                        {/* <span>Commission</span> */}
                                        <input
                                          type="number"
                                          className="commission_amount"
                                          placeholder="Commission"
                                          value={item.group_commission}
                                          disabled
                                          onChange={(e) => {
                                            var floatNumber =
                                              e.target.value.split(".");
                                            if (
                                              !isNaN(Number(e.target.value))
                                            ) {
                                              if (
                                                floatNumber.length == 1 ||
                                                (floatNumber.length == 2 &&
                                                  floatNumber[1].length <= 3)
                                              ) {
                                                updateDate.structure_data[
                                                  index
                                                ]["group_commission"] =
                                                  e.target.value;
                                                updateDate.structure_data[
                                                  index
                                                ]["pair_data"].forEach(
                                                  (value, valueIndex) => {
                                                    updateDate.structure_data[
                                                      index
                                                    ]["pair_data"][valueIndex][
                                                      "commission"
                                                    ] = e.target.value;
                                                  }
                                                );
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
                                                updateDate.structure_data[
                                                  index
                                                ]["pair_data"][valueIndex][
                                                  "commission"
                                                ] = 0;
                                              });
                                              setUpdateDate({
                                                ...updateDate,
                                              });
                                            }
                                          }}
                                        />
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
                                          updateDate.structure_data[index][
                                            "is_visible"
                                          ] = !item.is_visible;
                                          setUpdateDate({ ...updateDate });
                                        }}
                                      >
                                        <i
                                          class={`fa ${
                                            item.is_visible
                                              ? "fa-angle-up"
                                              : "fa-angle-down"
                                          }`}
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                    </div>
                                  </div>
                                  <div
                                    className={`pair-section ${
                                      item.is_visible
                                        ? "child-section-visible"
                                        : ""
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
                                              type="number"
                                              disabled
                                              className="rebert_amount"
                                              placeholder="Rebert"
                                              value={item1.rebate}
                                              onChange={(e) => {
                                                var floatNumber =
                                                  e.target.value.split(".");
                                                if (
                                                  !isNaN(Number(e.target.value))
                                                ) {
                                                  if (
                                                    floatNumber.length == 1 ||
                                                    (floatNumber.length == 2 &&
                                                      floatNumber[1].length <=
                                                        3)
                                                  ) {
                                                    updateDate.structure_data[
                                                      index
                                                    ]["pair_data"][index1][
                                                      "rebate"
                                                    ] = e.target.value;
                                                    setUpdateDate({
                                                      ...updateDate,
                                                    });
                                                  }
                                                } else if (
                                                  e.target.value == "" ||
                                                  e.target.value == 0
                                                ) {
                                                  updateDate.structure_data[
                                                    index
                                                  ]["pair_data"][index1][
                                                    "rebate"
                                                  ] = 0;
                                                  setUpdateDate({
                                                    ...updateDate,
                                                  });
                                                }
                                              }}
                                            />
                                          </div>
                                          <div>
                                            <input
                                              type="number"
                                              className="commission_amount"
                                              placeholder="Commission"
                                              disabled
                                              value={item1.commission}
                                              onChange={(e) => {
                                                var floatNumber =
                                                  e.target.value.split(".");
                                                if (
                                                  !isNaN(Number(e.target.value))
                                                ) {
                                                  if (
                                                    floatNumber.length == 1 ||
                                                    (floatNumber.length == 2 &&
                                                      floatNumber[1].length <=
                                                        3)
                                                  ) {
                                                    updateDate.structure_data[
                                                      index
                                                    ]["pair_data"][index1][
                                                      "commission"
                                                    ] = e.target.value;
                                                    setUpdateDate({
                                                      ...updateDate,
                                                    });
                                                  }
                                                } else if (
                                                  e.target.value == "" ||
                                                  e.target.value == 0
                                                ) {
                                                  updateDate.structure_data[
                                                    index
                                                  ]["pair_data"][index1][
                                                    "commission"
                                                  ] = 0;
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
                          <div></div>
                        </div>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyStructure;
