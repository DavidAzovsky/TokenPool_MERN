import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import LatestDepositCard from "../../components/LatestDepositCard";
import LatestWithdrawalCard from "../../components/LatestWithdrawalsCard";
import TabPanel from "../../components/TabPanel";
import OverviewCharts from "./OverviewCharts";
import RealTimeCard from "./RealtimeCard";
import TopDepositList from "./TopDepositList";
import TopWithdrawalList from "./TopWithdrawalList";

function Analytics() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    return <Box>
        <Typography sx={styles.pageTitle} variant="h5">Analytics</Typography>
        <Box sx={styles.tabHeader}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Overview" id='tab-0' />
                <Tab label="Deposits" id='tab-1' />
                <Tab label="Withdrawals" id='tab-2' />
            </Tabs>
        </Box>
        <TabPanel value={value} index={0} sx={{}}>
            <Box sx={styles.overviewContainer}>
                {/* <Box sx={styles.statsContainer}>
                    <Typography variant="h5">
                        200K Transaction Made Today
                    </Typography>
                    <OverviewCharts />
                    <Divider sx={styles.divider}/>
                </Box> */}
                <Box>
                    {/* <RealTimeCard /> */}
                    <LatestDepositCard sx={{ marginBottom: 2 }} />
                    <LatestWithdrawalCard/>
                </Box>
            </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <TopDepositList/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <TopWithdrawalList/>
        </TabPanel>
    </Box>;
}

export default Analytics;

/**
 * @type {import("@mui/material").SxProps}
 */

const styles = {
    pageTitle: {
        mb: 2
    },
    tabHeader: {
        borderBottom: 1,
        borderColor: 'divider'
    },
    overviewContainer: {
        display: 'grid',
        gridTemplateColumns: { 'md': '1fr', 'lg': '1fr 300px' },
        gap: 2,
        justifyContent: 'center',
    },
    statsContainer: {
        bgcolor: 'neutral.light',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    divider: {
        my:4
    }

}

