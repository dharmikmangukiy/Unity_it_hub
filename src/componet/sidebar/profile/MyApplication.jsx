import React from "react";
import { Grid } from "@mui/material";
import TopButton from "../../customComponet/TopButton";
import { Paper } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";

export const MyApplication = () => {
  const [over, setOver] = React.useState(false);
  const buttonstyle = {
    backgroundColor: "",
    border: "2px solid #1e64b4",
    textTransform: "capitalize",
    padding: "10px",
    width: "13%",
    color: "",
  };
  if (over) {
    buttonstyle.backgroundColor = "#1e64b4";
    buttonstyle.color = "#fff";
  } else {
    buttonstyle.backgroundColor = "";
    buttonstyle.color = "";
  }

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item sm={12}></Grid>
              <Grid item xl={1}></Grid>
              <Grid item xl={10} md={12} lg={12}>
                {/* <TopButton /> */}
                <Grid container spacing={3}>
                  <Grid item md={12}>
                    <Paper
                      elevation={1}
                      style={{ borderRadius: "10px" }}
                      className="w-100 mb-5"
                    >
                      <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-3">
                        <h5 className="font-weight-bold mb-0 text-dark">
                          My Applications
                        </h5>
                      </div>
                      <div className="divider"></div>
                      <div className="card-body position-relative bg-transparent p-0">
                        <Grid container spacing={3}>
                          <Grid
                            item
                            md={12}
                            className="d-flex flex-column position-relative mh-150 rounded"
                          >
                            <List>
                              <ListItem>
                                <ListItemText primary="Individual Application - (English)" />
                                <ListItemText secondery />
                                <Button
                                  variant="outlined"
                                  style={buttonstyle}
                                  onMouseOver={() => setOver(true)}
                                  onMouseOut={() => setOver(false)}
                                >
                                  <DownloadIcon
                                    className="mr-2"
                                    style={{ fontSize: "18px" }}
                                  />
                                  Download
                                </Button>
                              </ListItem>
                            </List>
                          </Grid>
                        </Grid>
                      </div>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApplication;
