import React from "react";
import { Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Card1 from "../sidebar/TradingAccounts/Card1";
import Card2 from "../sidebar/TradingAccounts/Card2";

const OpenDemoModel = (prop) => {
  // const [width,setWidth]=useState("lg")
  const descriptionElementRef = React.useRef(null);
  console.log(prop);
  React.useEffect(() => {
    if (prop.Dopen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [prop.Dopen]);
  return (
    <div>
      <Dialog
        open={prop.Dopen}
        onClose={() => prop.setDOpen(false)}
        maxWidth={prop.type == "0" ? "md" : "lg"}
        fullWidth={true}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <div
          id="form-dialog-title"
          className="d-flex align-items-center p-3 create-account-header"
        >
          <h5 className="w-100 text-center custom-text-color m-0 font-weight-bold">
            CREATE A {prop.type == "0" ? "DEMO" : "LIVE"} TRADING ACCOUNT
          </h5>
          <Button
            onClick={() => prop.setDOpen(false)}
            sx={{ color: "#2A3F73" }}
          >
            <CloseIcon />
          </Button>
        </div>
        <DialogContent
          className="create-account-content"
          sx={{ overflowX: "hidden" }}
        >
          <Grid
            container
            spacing={2}
            className="MuiGrid-justify-xs-space-between"
          >
            {prop.type == "1" ? (
              <Card1
                type={prop.type}
                closePopup={prop.setDOpen}
                refresh={prop.refresh}
                nav={prop.nav}
              />
            ) : (
              <Card2
                type={prop.type}
                closePopup={prop.setDOpen}
                refresh={prop.refresh}
                nav={prop.nav}
              />
            )}

            {/* <Grid item md={6} className="pr-3 p-2"></Grid>
                                        <Grid item md={6} className="pr-3 p-2">sd</Grid> */}
          </Grid>

          {/* <DialogContentText
                                    id="scroll-dialog-description"
                                    ref={descriptionElementRef}
                                    tabIndex={-1}
                                  >
                                    {[...new Array(50)]
                                      .map(
                                        () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
                                      )
                                      .join("\n")}
                                  </DialogContentText> */}
        </DialogContent>
        {/* <DialogActions>
                                  <ColorButton onClick={()=>setDOpen(false)}>Cancel</ColorButton>
                                </DialogActions> */}
      </Dialog>
    </div>
  );
};

export default OpenDemoModel;
