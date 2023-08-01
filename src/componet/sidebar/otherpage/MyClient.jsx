import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  styled,
} from "@mui/material";
import "./myclient.css";
import React from "react";
import { useEffect, useState } from "react";
import { IsApprove, Url } from "../../../global";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import CloseIcon from "@mui/icons-material/Close";
import Toast from "../../commonComponet/Toast";
import { ColorButton } from "../../customComponet/CustomElement";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

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

const MyClient = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState("lg");
  const [dialogTitle, setDialogTitle] = useState("");
  const [fullWidth, setFullWidth] = useState(true);
  const [mainLoader, setMainLoader] = useState(true);
  const [popLoader, setPopLoader] = useState({
    data: true,
  });

  const [myTraderData, setMyTraderData] = useState({
    data: {},
    user_name: "",
    user_id: "",
    main_user_name: "",
  });
  const [myChildTraderData, setMyChildTraderData] = useState({
    data: {},
    parent_name: "",
    parent_id: "",
  });
  useEffect(() => {
    getMyTraders();
  }, []);
  const handleClose = () => {
    setOpen(false);
  };

  const manageContent = () => {
    if (
      dialogTitle == myTraderData.user_name ||
      dialogTitle == myTraderData.main_user_name
    ) {
      return (
        <div
          className="bankDetailsTabSection downline-table"
          style={{ padding: "0" }}
        >
          {popLoader.data == true ? (
            <>
              <div className="myCilentPopLoder">
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
              </div>
            </>
          ) : (
            <>
              {myChildTraderData.parent_id != "" ? (
                <div>
                  <ColorButton
                    variant="contained"
                    className="add_note"
                    sx={{
                      padding: "4px 12px !important",
                    }}
                    onClick={(e) => {
                      setOpen(true);

                      popLoader.data = true;
                      setPopLoader({ ...popLoader });
                      getMyChildTrader(myChildTraderData.parent_id);
                    }}
                  >
                    <ArrowBackIcon sx={{ fontSize: "16px" }} />
                  </ColorButton>
                </div>
              ) : (
                ""
              )}
              <div
                className="bankDetailsTabSection downline-table"
                style={{ padding: "0" }}
              >
                <table>
                  <thead>
                    {/* <th colspan="6" scope="colgroup"></th>
                    <th colspan="3" scope="colgroup" className="colcolor"></th>
                    <th colspan="4" scope="colgroup" className="colcolor">
                      Downline
                    </th>
                    <th colspan="1" scope="colgroup"></th> */}

                    <tr>
                      <th>SR.NO</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>MT Code</th>
                      <th className="">IB Account</th>
                      <th>Deposit</th>
                      <th>Withdraw</th>
                      <th className="">Downline Lot</th>
                      <th className="colcolor">Downline Rebate</th>
                      {/* <th>Team Deposit</th>
                      <th>Total Lot </th>
                      <th>IB Commission</th>

                      <th className="colcolor">IB Withdraw</th> */}

                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myChildTraderData.data.data != undefined ? (
                      myChildTraderData.data.data.map((item) => {
                        return (
                          <tr>
                            <td>{item.sr_no}</td>
                            <td>{item.name}</td>
                            <td>{item.user_email}</td>
                            <td>{item.mt5_acc_ids}</td>
                            <td className="">
                              {item.is_ib_account == "1" ? "Yes" : "No"}
                            </td>
                            <td>{item.deposit_amount}</td>
                            <td>{item.withdrawal_amount}</td>
                            <td>{item.own_lot}</td>
                            <td className="colcolor">
                              {item.rebate_generated}
                            </td>
                            {/* <td>{item.total_deposit}</td>{" "}
                            <td>{item.down_line_lot}</td>
                            <td>{item.total_ib_commission}</td>
                            <td className="colcolor">
                              {item.total_ib_withdrawn}
                            </td> */}
                            <td>
                              {item.is_ib_account == "1" &&
                              item.has_downline ? (
                                <ColorButton
                                  variant="contained"
                                  className="add_note"
                                  sx={{ padding: "5px 12px" }}
                                  onClick={(e) => {
                                    popLoader.data = true;
                                    setPopLoader({ ...popLoader });
                                    // myTraderData.user_name = item.name;
                                    // myTraderData.main_user_name = item.name;
                                    myTraderData.user_id = item.client_id;
                                    setMyTraderData({
                                      ...myTraderData,
                                    });
                                    getMyChildTrader(item.client_id);
                                  }}
                                >
                                  View
                                </ColorButton>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td className="text-center" colSpan={10}>
                          Recored not found
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="5" className="border-right-teble">
                        <b>
                          {myChildTraderData.data.footer_count != undefined
                            ? myChildTraderData.data["footer_count"]["total"]
                            : ""}
                        </b>
                      </td>
                      <td className="border-right-teble">
                        <b>
                          {myChildTraderData.data.footer_count != undefined
                            ? myChildTraderData.data["footer_count"][
                                "total_user_deposit"
                              ]
                            : ""}
                        </b>
                      </td>
                      <td className="border-right-teble">
                        <b>
                          {myChildTraderData.data.footer_count != undefined
                            ? myChildTraderData.data["footer_count"][
                                "total_user_withdraw"
                              ]
                            : ""}
                        </b>
                      </td>
                      <td>
                        <b>
                          {myChildTraderData.data.footer_count != undefined
                            ? myChildTraderData.data["footer_count"][
                                "total_own_lot"
                              ]
                            : ""}
                        </b>
                      </td>
                      <td>
                        <b>
                          {myChildTraderData.data.footer_count != undefined
                            ? myChildTraderData.data["footer_count"][
                                "total_rebate_generated"
                              ]
                            : ""}
                        </b>
                      </td>
                      {/* <td>
                        <b>
                          {myChildTraderData.data.footer_count != undefined
                            ? myChildTraderData.data["footer_count"][
                                "total_total_user_deposit"
                              ]
                            : ""}
                        </b>
                      </td>
                      <td>
                        <b>
                          {myChildTraderData.data.footer_count != undefined
                            ? myChildTraderData.data["footer_count"][
                                "total_down_line_lot"
                              ]
                            : ""}
                        </b>
                      </td>
                      <td>
                        <b>
                          {myChildTraderData.data.footer_count != undefined
                            ? myChildTraderData.data["footer_count"][
                                "total_total_ib_commission"
                              ]
                            : ""}
                        </b>
                      </td>{" "}
                      <td>
                        <b>
                          {myChildTraderData.data.footer_count != undefined
                            ? myChildTraderData.data["footer_count"][
                                "total_total_ib_withdrawn"
                              ]
                            : ""}
                        </b>
                      </td> */}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </>
          )}
        </div>
      );
    } else if (popLoader.data == true) {
      return (
        <>
          <div className="myCilentPopLoder">
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
          </div>
        </>
      );
    }
  };
  const manageDialogActionButton = () => {
    if (
      dialogTitle == myTraderData.user_name ||
      dialogTitle == myTraderData.main_user_name
    ) {
    }
  };
  const getMyChildTrader = (childId) => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    param.append("client_id", childId);

    axios
      .post(Url + "/ajaxfiles/sponser_mt_data_ajax.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        if (res.data.status == "error") {
          Toast("error", res.data.message);
        } else {
          myChildTraderData.data = res.data;
          myChildTraderData.parent_id = res.data.back_links;
          setMyChildTraderData({ ...myChildTraderData });
          if (res.data.back_links == "") {
            setDialogTitle(myTraderData.main_user_name);
          } else {
            myTraderData.user_name = res.data.back_link_name;
            setMyTraderData({ ...myTraderData });
            setDialogTitle(myTraderData.user_name);
          }
          popLoader.data = false;
          setPopLoader({ ...popLoader });
        }
      });
  };

  const getMyTraders = () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("user_id", IsApprove.user_id);
      param.append("auth_key", IsApprove.auth);
    }
    setMainLoader(true);

    axios.post(Url + "/ajaxfiles/my_traders.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      if (res.data.status == "error") {
        Toast("error", res.data.message);
      } else {
        myTraderData.data = res.data;
        setMyTraderData({ ...myTraderData });
        setMainLoader(false);
      }
    });
  };

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
            <div className="loader1">
              <span className="loader2"></span>
            </div>
          ) : (
            <div style={{ opacity: 1 }}>
              <Grid container>
                <Grid item sm={11}></Grid>
                <Grid item xl={1}></Grid>
                <Grid item xl={10} md={12} lg={12}>
                  <p className="main-heading">My Client</p>
                  <Grid container>
                    <Grid item md={12}>
                      <Paper
                        elevation={1}
                        style={{ borderRadius: "10px" }}
                        className="w-100 "
                      >
                        <div className="headerSection header-title">
                          {/* <Button
                                variant="contained"
                                className="add_note"
                                onClick={openDialogbox}
                              >
                                Add Note
                              </Button> */}
                        </div>
                        <div className="bankDetailsTabSection downline-table">
                          <table>
                            <thead>
                              {/* <th colspan="6" scope="colgroup"></th>
                              <th
                                colspan="3"
                                scope="colgroup"
                                className="colcolor"
                              ></th>
                              <th
                                colspan="4"
                                scope="colgroup"
                                className="colcolor"
                              >
                                Downline
                              </th>
                              <th colspan="1" scope="colgroup"></th> */}

                              <tr>
                                <th>SR.NO</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>MT Code</th>
                                <th className="">IB Account</th>
                                <th>Deposit</th>
                                <th>Withdraw</th>
                                <th className=""> Downline Lot</th>
                                <th className="colcolor">Downline Rebate</th>

                                {/* <th>Team Deposit</th>
                                <th>Total Lot </th>
                                <th>IB Commission</th>

                                <th className="colcolor">IB Withdraw</th> */}

                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {myTraderData.data.data != undefined ? (
                                myTraderData.data.data.map((item) => {
                                  return (
                                    <tr>
                                      <td>{item.sr_no}</td>
                                      <td>{item.name}</td>
                                      <td>{item.user_email}</td>
                                      <td>{item.mt5_acc_ids}</td>
                                      <td className="">
                                        {item.is_ib_account == "1"
                                          ? "Yes"
                                          : "No"}
                                      </td>
                                      <td>{item.deposit_amount}</td>
                                      <td>{item.withdrawal_amount}</td>
                                      <td className="">{item.own_lot}</td>
                                      <td className="colcolor">
                                        {item.rebate_generated}
                                      </td>
                                      {/* <td>{item.total_deposit}</td>{" "}
                                      <td>{item.down_line_lot}</td>
                                      <td>{item.total_ib_commission}</td>
                                      <td className="colcolor">
                                        {item.total_ib_withdrawn}
                                      </td> */}
                                      <td>
                                        {item.is_ib_account == "1" &&
                                        item.has_downline ? (
                                          <ColorButton
                                            variant="contained"
                                            sx={{ padding: "5px 12px" }}
                                            className="add_note"
                                            onClick={(e) => {
                                              // myTraderData.user_name =
                                              //   item.name;
                                              myTraderData.main_user_name =
                                                item.name;
                                              popLoader.data = true;
                                              setPopLoader({ ...popLoader });
                                              myTraderData.user_id =
                                                item.client_id;
                                              setMyTraderData({
                                                ...myTraderData,
                                              });
                                              setOpen(true);
                                              getMyChildTrader(item.client_id);
                                            }}
                                          >
                                            View
                                          </ColorButton>
                                        ) : (
                                          ""
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <tr>
                                  <td className="text-center" colSpan={10}>
                                    Recored not found
                                  </td>
                                </tr>
                              )}
                            </tbody>
                            <tfoot>
                              <tr>
                                <td colSpan="5">
                                  <b>
                                    {myTraderData.data.footer_count != undefined
                                      ? myTraderData.data["footer_count"][
                                          "total"
                                        ]
                                      : ""}
                                  </b>
                                </td>
                                <td>
                                  <b>
                                    {myTraderData.data.footer_count != undefined
                                      ? myTraderData.data["footer_count"][
                                          "total_user_deposit"
                                        ]
                                      : ""}
                                  </b>
                                </td>
                                <td>
                                  <b>
                                    {myTraderData.data.footer_count != undefined
                                      ? myTraderData.data["footer_count"][
                                          "total_user_withdraw"
                                        ]
                                      : ""}
                                  </b>
                                </td>
                                <td>
                                  <b>
                                    {myTraderData.data.footer_count != undefined
                                      ? myTraderData.data["footer_count"][
                                          "total_own_lot"
                                        ]
                                      : ""}
                                  </b>
                                </td>
                                <td>
                                  <b>
                                    {myTraderData.data.footer_count != undefined
                                      ? myTraderData.data["footer_count"][
                                          "total_rebate_generated"
                                        ]
                                      : ""}
                                  </b>
                                </td>
                                {/* <td>
                                  <b>
                                    {myTraderData.data.footer_count != undefined
                                      ? myTraderData.data["footer_count"][
                                          "total_total_user_deposit"
                                        ]
                                      : ""}
                                  </b>
                                </td>
                                <td>
                                  <b>
                                    {myTraderData.data.footer_count != undefined
                                      ? myTraderData.data["footer_count"][
                                          "total_down_line_lot"
                                        ]
                                      : ""}
                                  </b>
                                </td>
                                <td>
                                  <b>
                                    {myTraderData.data.footer_count != undefined
                                      ? myTraderData.data["footer_count"][
                                          "total_total_ib_commission"
                                        ]
                                      : ""}
                                  </b>
                                </td>{" "}
                                <td>
                                  <b>
                                    {myTraderData.data.footer_count != undefined
                                      ? myTraderData.data["footer_count"][
                                          "total_total_ib_withdrawn"
                                        ]
                                      : ""}
                                  </b>
                                </td> */}
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          )}
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
            {/* <DialogActions>{manageDialogActionButton()}</DialogActions> */}
          </BootstrapDialog>
        </div>
      </div>
    </div>
  );
};

export default MyClient;
