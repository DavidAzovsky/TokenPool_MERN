import { Box, Card, CardContent, Typography, Divider } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import { Bar } from "react-chartjs-2";
import { realtimeChartData, realtimeChartOptions } from "./ChartConfigs";
import ColorText from "../../components/ColorText";

function RealTimeCard() {
    return (<Card sx={styles.realtimeStatsCard}>
        <CardContent>
            <Box>
                <Typography variant="cardTitle">Transactions</Typography>
                <Box sx={styles.updateLiveRow}>
                    <CircleIcon sx={styles.dotIcon} />
                    <ColorText color="neutral.normal"><Typography variant="h7">2.4K per hour</Typography></ColorText>
                </Box>
                <Divider sx={styles.divider} />
                <Typography sx={styles.valueText}>1,786</Typography>
                <ColorText color="neutral.normal"><Typography variant="h7">Transactions Last 48 hours</Typography></ColorText>
                <Box sx={styles.realtimeChart}>
                <Bar options={realtimeChartOptions} data={realtimeChartData} />
                </Box>
            </Box>
        </CardContent>


    </Card>);
}

export default RealTimeCard;


/**
 * @type {import("@mui/material").SxProps}
 */

 const styles = {
    realtimeStatsCard: {
        mb: 2
    },
    updateLiveRow: {
        display: 'flex',
        alignItems: 'center'
    },
    dotIcon: {
        width: 10,
        color: 'primary.normal',
        mr: 1
    },
    divider: {
        my: 2
    },
    valueText: {
        fontSize: '1.3rem',
        fontWeight: '400'
    }, 
    realtimeChart: {
        height: 70,
        mt: 4
    }
}