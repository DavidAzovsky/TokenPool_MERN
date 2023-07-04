import { Box, Card, CardContent, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from 'axios';

function LatestWithdrawalsCard(props) {
    const [empty, setEmpty] = useState(false);
    const [fetch, setFetch] = useState({
        sender: "0x5e8f3820a99550f5cc93eee7621231656fb34d12",
        traded: 30,
        date: new Date().toDateString()
    });

    useEffect(() => {
        const fetchData = async () => {
            await axios.post('http://localhost:3000/latestWithdrawal')
                .then(response => {
                    if (response.data.success == true) {
                        setEmpty(false);
                        setFetch({
                            sender: response.data.doc.from,
                            traded: response.data.doc.amount,
                            date: response.data.doc.withdrawTime
                        });
                    } else {
                        setEmpty(true);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        };
        fetchData();
    }, []);

    return empty? <></> : (
    <Card {...props}> 
        <CardContent>
            <Typography variant="cardTitle">Latest Withdrawal</Typography>
                <Typography variant="h8" sx={styles.latestTransactionTimeLabel}>{fetch.sender}</Typography>
            <Box sx={styles.latestTransactionStatsRow}>
                <Typography variant="h7">Traded</Typography>
                    <Typography variant="h7">{fetch.traded}</Typography>
            </Box>
            <Box sx={styles.latestTransactionStatsRow}>
                <Typography variant="h7">Date</Typography>
                    <Typography variant="h7">{fetch.date.substring(0, 10) + ' ' + fetch.date.substring(11, 19)}</Typography>
            </Box>
        </CardContent>
    </Card>);
}

export default LatestWithdrawalsCard;


/**
 * @type {import("@mui/material").SxProps}
 */

const styles = {
    latestTransactionContainer: {
        width: '100%',
        position: 'relative'
    },
    latestTransactionThumbnail: {
        width: '100%',
        mt: 1,
        filter: "brightness(20%)",
        display: 'block'
    },
    latestTransactionTitle: {
        position: 'absolute',
        bottom: 0,
        color: 'neutral.light',
        left: 0,
        right: 0,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '1rem',
        mb: 2
    },
    latestTransactionTimeLabel: {
        color: 'neutral.normal',
        mt: 2
    },
    latestTransactionStatsRow: {
        display: 'flex',
        justifyContent: 'space-between',
        mt: 2,
    },
    cardAction: {
        mt: 2
    }
}

