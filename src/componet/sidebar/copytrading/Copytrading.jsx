import React from "react";
import Grid from "@mui/material/Grid";
import TopButton from "../../customComponet/TopButton";
import { Box, Tab, Typography, Tabs, Paper } from "@mui/material";
import { tabsClasses } from "@mui/material/Tabs";
import { styled } from "@mui/material/styles";
import "./copytrading.css";
import Rating from "./Rating";
import TermsConditions from "./TermsConditions";
import CopierArea from "./CopierArea";
import MasterArea from "./MasterArea";
import Example from "./MasterCopy";
import {useParams,useNavigate} from 'react-router-dom';
import MasterCopy from "./MasterCopy";

const AntTabs = styled(Tabs)({
  borderBottom: "0px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#2A3F73",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.85)",
    fontWeight: "700",
    fontFamily: ["Cairo, sans-serif"].join(","),
    "&:hover": {
      color: "#3D9730",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#2A3F73",
      fontWeight: "700",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#2A3F73",
    },
  })
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Copytrading = () => {
  const navigate=useNavigate();
  const [value, setValue] = React.useState(0);
  let { id } = useParams();
  console.log(id)
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log("DFSDFa",newValue)
    if(newValue==0){
      navigate('/copytrading')
    }
    
  };
  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item sm={12}></Grid>
              <Grid item xl={1}></Grid>
              <Grid item xl={10} md={12} lg={12}>
                <TopButton />
                <Grid container>
                  <Grid item md={12}>
                    <Paper
                      elevation={1}
                      style={{ borderRadius: "10px" }}
                      className="w-100 mb-3"
                    >
                      <Box sx={{ width: "100%" }}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <AntTabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons
                            allowScrollButtonsMobile
                            aria-label="scrollable force tabs example"
                          >
                            <AntTab label="RATING" {...a11yProps(0)}  onClick={()=>navigate('/copytrading')}/>
                            <AntTab label="COPIER AREA" {...a11yProps(1)} />
                            <AntTab label="MASTER AREA" {...a11yProps(2)} />
                            <AntTab
                              label="TERMS & CONDITIONS"
                              {...a11yProps(3)}
                            />
                          </AntTabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                          {id ? <MasterCopy id={id}/>:<Rating />}
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                          <CopierArea setValue={setValue}/>
                        </TabPanel>
                        <TabPanel value={value} index={2} >
                          <MasterArea  />
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                          {/* <TermsConditions /> */}
                      <TermsConditions/>  
                        </TabPanel>
                      </Box>
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

export default Copytrading;
