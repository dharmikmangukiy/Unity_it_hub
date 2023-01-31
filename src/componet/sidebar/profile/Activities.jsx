import React from "react";
import { Grid } from "@mui/material";
import TopButton from "../../customComponet/TopButton";
import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import CommonTable from "../../customComponet/CommonTable";
import { Url } from "../../../global";

const Activities = () => {
  function createData(activity: string, date: date & time) {
    return { activity, date };
  }
  const activityColumn = [
    {
      name: "SR NO",
      selector: (row) => row.sr_no,
      sortable: true,
      reorder: true,
      grow: 0.4,
    },
    {
      name: "IP ADDRESS",
      selector: (row) => row.ip_address,
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "DATETIME",
      selector: (row) => row.added_datetime,
      sortable: true,
      reorder: true,
      grow: 1,
    },
  ];
  const rows = [
    createData(
      "Logged in from ip 150.107.232.227 at 103 Apr 13 2022 10:01:07 GMT+0300",
      "Wed, Apr 13, 2022 12:31 PM"
    ),
    createData(
      "Logged in from ip 182.77.118.211 at 103 Apr 13 2022 12:33:41 GMT+0300",
      "Wed, Apr 13, 2022 2:33 PM"
    ),
    createData(
      "Logged in from ip 182.77.118.211 at 103 Apr 13 2022 12:03:39 GMT+0300",
      "Wed, Apr 13, 2022 2:33 PM"
    ),
    createData(
      "Logged in from ip 150.107.232.227 at 103 Apr 13 2022 10:01:07 GMT+0300",
      "Wed, Apr 13, 2022 2:25 PM"
    ),
    createData(
      "Logged in from ip 182.77.118.211 at 103 Apr 13 2022 11:42:23 GMT+0300",
      "Wed, Apr 13, 2022 2:12 PM"
    ),
    createData(
      "Logged in from ip 182.77.118.211 at 103 Apr 13 2022 11:32:20 GMT+0300",
      "Wed, Apr 13, 2022 2:02 PM"
    ),
    createData(
      "Logged in from ip 150.107.232.227 at 103 Apr 13 2022 10:36:33 GMT+0300",
      "Wed, Apr 13, 2022 1:06 PM"
    ),
    createData(
      "Logged in from ip 182.77.118.211 at 103 Apr 13 2022 10:35:50 GMT+0300",
      "Wed, Apr 13, 2022 1:05 PM"
    ),
    createData(
      "Logged in from ip 182.77.118.211 at 103 Apr 13 2022 10:16:16 GMT+0300",
      "Wed, Apr 13, 2022 12:46 PM"
    ),
    createData(
      "Logged in from ip 182.77.118.211 at 103 Apr 13 2022 10:01:54 GMT+0300",
      "Wed, Apr 13, 2022 12:31 PM"
    ),
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
                <Grid container>
                  <Grid item md={12}>
                    <Paper
                      elevation={1}
                      style={{ borderRadius: "10px" }}
                      className="w-100 mb-5"
                    >
                      <div className="card-header">
                        <h5 className="font-weight-bold mb-0 text-dark">
                          Activities
                        </h5>
                      </div>
                      <div className="divider"></div>
                      <div className="card-body position-relative pt-0">
                        <Grid container spacing={3}>
                          <Grid
                            item
                            md={12}
                            className="d-flex position-relative mh-150 w-100"
                          >
                            <Paper
                              elevation={0}
                              style={{ borderRadius: "10px" }}
                              className="w-100"
                            >
                              {/* <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table"
                              >
                                <TableHead>
                                  <TableRow>
                                    <TableCell className="text-info">
                                      Activity
                                    </TableCell>
                                    <TableCell
                                      align="right"
                                      className="text-info"
                                    >
                                      Date
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {rows.map((row) => (
                                    <TableRow
                                      key={row.activity}
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell component="th" scope="row">
                                        {row.activity}
                                      </TableCell>
                                      <TableCell align="right">
                                        {row.date}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                              <Pagination
                                count={53}
                                color="error"
                                shape="rounded"
                                className="my-3 justify-content-center d-flex "
                                size="small"
                              /> */}
                              <CommonTable
                                url={`${Url}/datatable/login_activities.php`}
                                column={activityColumn}
                                sort="2"
                              />
                            </Paper>
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

export default Activities;
