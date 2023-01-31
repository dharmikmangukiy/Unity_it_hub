import React, { useState } from "react";
import { Grid, Input } from "@mui/material";
import TopButton from "../../customComponet/TopButton";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import { ColorButton } from "../../customComponet/CustomElement";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "./openchampiondemo.css";
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(0),
  },
  "& .MuiInputBase-input": {
    borderRadius: 9,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "8px 12px 8px 12px",
    marginTop: 0,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      borderColor: "#1e64b4;",
    },
    "&:focus": {
      borderRadius: 9,
      borderColor: "#1e64b4;",
      border: "2px solid #1e64b4;",
    },
  },
}));
<Box
  component="span"
  sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
>
  •
</Box>;

const OpenChampionDemo = () => {
  const [doc, setDoc] = useState({
    nickname: "",
    proof: "",
    id: "",
    fontimg: "",
    backimg: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDoc((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
    console.log(event.target.value);
  };
  return (
    <>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item sm={11}></Grid>
              <Grid item xl={1}></Grid>
              <Grid item xl={10} md={12} lg={12}>
                {/* <TopButton /> */}
                <Grid container spacing={6}>
                  <Grid item md={12} className="d-flex">
                    <Paper
                      elevation={1}
                      style={{ borderRadius: "10px" }}
                      className="w-100 mb-5"
                    >
                      <div className="card-header font-weight-bold mb-0 text-dark h5 ml-2 pt-5">
                        New RightFX Champion Demo Contest Account
                      </div>
                      <div className="text-dark pl-4 ml-2">
                        <p>
                          Please open a new account for RightFx Champion Demo
                          Contest account
                        </p>
                      </div>
                      <Box sx={{ minWidth: 275, margin: 4 }}>
                        <Card variant="outlined">
                          <CardContent>
                            <Grid container spacing={3}>
                              <Grid item md={2} sm={8} className="mb-1 d-flex">
                                <div className="mb-2 text-dark">Nickname</div>
                                <div className="mb-2 ml-3 text-dark">
                                  <HelpOutlineIcon />
                                </div>
                              </Grid>
                              <Grid item md={6} sm={4}>
                                <FormControl className="w-100">
                                  <BootstrapInput
                                    value={doc.nickname}
                                    name="nickname"
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{
                                      "aria-label": "Without label",
                                      className: "ml-3",
                                    }}
                                  />
                                </FormControl>
                              </Grid>
                            </Grid>

                            <Grid
                              item
                              md={7}
                              sm={8}
                              className="mb-1 d-flex mt-3"
                            >
                              <div className="card-header mb-5 text-dark ml-0 pl-0 mt-2">
                                Contest provide avatar
                              </div>
                              <div className="uploaderDropZone mt-2">
                                <Input
                                  accept="image/*"
                                  id="FILE_FRONT_SIDE"
                                  type="file"
                                  name="fontimg"
                                  // value={doc.fontimg}
                                  onChange={(e) =>
                                    setDoc((prevalue) => {
                                      return {
                                        ...prevalue,
                                        fontimg: e.target.files[0],
                                      };
                                    })
                                  }
                                  style={{ display: "none" }}
                                />{" "}
                                {!doc.fontimg ? (
                                  <label
                                    htmlFor="FILE_FRONT_SIDE"
                                    className="text-dark font-weight-bold font-size-xs"
                                  >
                                    Choose file
                                  </label>
                                ) : (
                                  <div className="received-file">
                                    <div className="w-100 h-100">
                                      {doc.fontimg.name}
                                    </div>
                                    <button
                                      className="bg-transparent p-0 border-0"
                                      onClick={() =>
                                        setDoc((prevalue) => {
                                          return {
                                            ...prevalue,
                                            fontimg: "",
                                          };
                                        })
                                      }
                                    >
                                      <CloseOutlinedIcon className="fontimgclose" />
                                    </button>
                                  </div>
                                )}
                              </div>

                              <div className="card-header font-weight-bold mb-0 text-dark ml-1 pl-0 mt-2">
                                <p>No file chosen</p>
                              </div>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Box>
                      <Grid item md={12}>
                        <div className="mb-4 text-center">
                          <ColorButton>Open account</ColorButton>
                        </div>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpenChampionDemo;
