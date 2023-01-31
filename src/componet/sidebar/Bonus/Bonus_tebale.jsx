import React, { useEffect, useState } from "react";
import {
  FormControl,
  Paper,
  Grid,
  Menu,
  MenuItem,
  Select,
} from "@mui/material";
import "./Bonus_dashbord.css";
import { ColorButton } from "../../customComponet/CustomElement";
import StarIcon from "@mui/icons-material/Star";
import CommonTable from "../../customComponet/CommonTable";
import { Url } from "../../../global.js";
import NewDate from "../../commonComponet/NewDate";

const Bonus_tebale = () => {
  const [refresh, setRefresh] = React.useState(false);
  const column = [
    {
      name: "MT5 Number",
      selector: (row) => {
        return <span title={row.mt5_acc_no}>{row.mt5_acc_no}</span>;
      },
      wrap: true,
      reorder: true,
      grow: 0.6,
    },
    {
      name: "Deposit Date",
      selector: (row) => {
        return (
          <span title={row.date}>
            {" "}
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
      name: "Deposit",
      selector: (row) => {
        return <span title={row.deposit_amount}>${row.deposit_amount}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.6,
    },
    {
      name: "Bonus Percentage",
      selector: (row) => {
        return (
          <span title={row.bonus_percentage}>{row.bonus_percentage}%</span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.7,
    },
    {
      name: "Bonus Amount",
      selector: (row) => {
        return <span title={row.bonus_amount}>{row.bonus_amount}</span>;
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.7,
    },
    {
      name: "lots to be traded",
      selector: (row) => {
        return (
          <span
            title={(
              (((row.deposit_amount * row.bonus_percentage) / 100) * 40) /
              100
            ).toFixed()}
          >
            {" "}
            {(
              (((row.deposit_amount * row.bonus_percentage) / 100) * 40) /
              100
            ).toFixed()}
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.7,
    },

    // {
    //   name: "Remaining",
    //   selector: (row) => {
    //     return (
    //       <span title={row.upi_crypto_ac_number}>
    //         {row.upi_crypto_ac_number}
    //       </span>
    //     );
    //   },
    //   // wrap: true,
    //   sortable: true,
    //   reorder: true,
    //   grow: 0.6,
    // },

    {
      name: "Bonus Claim Date",
      selector: (row) => {
        return (
          <span title={row.bonus_claim_datetime}>
            <NewDate newDate={row.bonus_claim_datetime} />
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.7,
    },
    {
      name: "Bonus Claim",
      selector: (row) => {
        return (
          <span title={row.status == 1 ? "true" : "false"}>
            {row.status == "1" ? "Yes" : "No"}
          </span>
        );
      },
      // wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.6,
    },
  ];
  const [filterData, setFilterData] = useState({
    claim_status: "1",
  });

  return (
    <>
      <Grid item md={12}>
        <CommonTable
          url={`${Url}/datatable/deposit_mt5_bonus_list.php`}
          column={column}
          sort="0"
          param={filterData}
          refresh={refresh}
        />
      </Grid>
    </>
  );
};

export default Bonus_tebale;
