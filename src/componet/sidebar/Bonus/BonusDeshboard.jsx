import React, { useState } from "react";
import "./BonusDeshboard.css";
import StarIcon from "@mui/icons-material/Star";
import { Link, useNavigate } from "react-router-dom";

import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Box,
  Radio,
  RadioGroup,
  InputBase,
  styled,
  MenuItem,
  Select,
  TextField,
  FormHelperText,
} from "@mui/material";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
// import { styled } from '@mui/material/styles';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ColorButton } from "../../customComponet/CustomElement";
import { useEffect } from "react";
import { IsApprove, Url } from "../../../global";
import axios from "axios";

import { Info } from "@mui/icons-material";
import { Tab, Tabs, Typography } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import Bonus_dashbord from "./Bonus_dashbord";
import Bonus_tebale from "./Bonus_tebale";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      className="panding-left-right-0 tabpanel"
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const BonusDeshboard = () => {
  const navigate = useNavigate();
  const [mainLoader, setMainLoader] = useState(false);
  const [value, setValue] = useState(0);

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleChanges = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          {mainLoader == true ? (
            <div className="loader1">
              <span className="loader2"></span>
            </div>
          ) : (
            <div style={{ opacity: 1 }}>
              <Grid container>
                <Grid item sm={11}></Grid>
                <Grid item xl={1}></Grid>
                <Grid item xl={10} md={12} lg={12}>
                  <Paper
                    elevation={1}
                    style={{ borderRadius: "10px", padding: "20px" }}
                    className="w-100  internal-transfer-form"
                  >
                    <div>
                      <div className="head_prpl ">
                        <div className="reward">Bonuses</div>
                        <div
                          className="link link-100 mt-3"
                          onClick={() => {
                            navigate("/HOW_TO_ACTIVE_BONUS");
                          }}
                        >
                          HOW TO ACTIVE BONUS?
                        </div>
                      </div>
                      <div>
                        <Grid container spacing={3}>
                          <Grid item md={12}>
                            <div className="px-3 d-flex justify-content-center ">
                              <Tabs
                                value={value}
                                onChange={handleChanges}
                                variant="scrollable"
                                scrollButtons="auto"
                                aria-label="scrollable auto tabs example"
                                className="Deshs-bones"
                              >
                                <Tab
                                  className={
                                    value === 0
                                      ? "db-btn-1 mx-2"
                                      : "db-btn-2 db-btn-1 mx-2"
                                  }
                                  label="Available Bonus"
                                ></Tab>
                                <Tab
                                  className={
                                    value === 1
                                      ? "db-btn-1 mx-2"
                                      : "db-btn-2 db-btn-1 mx-2"
                                  }
                                  label="Activated Bonus"
                                ></Tab>
                              </Tabs>
                            </div>
                          </Grid>

                          <Grid item md={12}>
                            <div className="">
                              <SwipeableViews
                                index={value}
                                onChangeIndex={handleChangeIndex}
                              >
                                <TabPanel value={value} index={0}>
                                  <Bonus_dashbord />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                  <Bonus_tebale />
                                </TabPanel>
                              </SwipeableViews>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </div>
      <div></div>
    </>
  );
};

export default BonusDeshboard;
