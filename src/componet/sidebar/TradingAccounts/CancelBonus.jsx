import React from 'react'import

const CancelBonus = () => {
  
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
              {data.length === 0
                ? ""
                : data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name} </TableCell>
                      <TableCell align="right">{item.bankName}</TableCell>
                      <TableCell align="right">{item.currency}</TableCell>
                      <TableCell
                        align="right"
                        className="d-flex MuiTableCell-alignCenter"
                      >
                        <Button
                          className="cursor-pointer p-0 p-md-2 rounded-circle text-muted"
                          onClick={handleClickOpen("paper")}
                        >
                          <DeleteIcon />
                        </Button>
                                                
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </>
  )
}

export default CancelBonus
