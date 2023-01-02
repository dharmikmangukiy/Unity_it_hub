import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from '@mui/material/Button';
import { Paper } from "@mui/material";
import PaymentIcon from '@mui/icons-material/Payment';
const GetBonus = () => {
  // const [data, setdata] = useState([]);
  var data = [
    {
      action: "",
      amount: "$50",
      deposite_created: "10%",
      deposite: "$500",
      account: 231,
    },
  ];

  return (
    <>
      <Grid
        item
        md={12}
        className="d-flex pb-0 position-relative"
        style={{ paddingLeft: "-12px" }}
      >
        <Paper
          elevation={0}
          style={{ borderRadius: "10px" }}
          className="w-100 mb-5"
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Action</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Deposite created</TableCell>
                <TableCell align="right">Deposite</TableCell>
                <TableCell align="right">Account</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
             var rows= {data.length === 0
                ? ""
                : data.map((row) => (
                    <TableRow>
                      <TableCell>{row.action} </TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                      <TableCell align="right">{row.deposite_created}</TableCell>
                      <TableCell align="right">{row.deposite}</TableCell>
                      <TableCell align="right">{row.account}</TableCell>
                      <TableCell
                        align="right"
                        className="d-flex MuiTableCell-alignCenter"
                      >
                        <Button
                          className="cursor-pointer p-0 p-md-2 rounded-circle text-muted"
                          // onClick={handleClickOpen("paper")}
                        >
                          <PaymentIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </>
  );
};

export default GetBonus;
