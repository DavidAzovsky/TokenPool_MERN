import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

function getDateRangeForWeek(year, weekIndex) {
    const startDate = new Date(year, 0, 1);
    const dayOfWeek = startDate.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    startDate.setDate(startDate.getDate() - daysToSubtract - 1);
    startDate.setDate(startDate.getDate() + (weekIndex * 7));
    const endDate = new Date(startDate.getTime() + (6 * 86400000));
    return startDate.toLocaleDateString() + ' - ' + endDate.toLocaleDateString();
}

function TopDepositList(...props) {
    const [empty, setEmpty] = useState(false);
    const [fetch, setFetch] = useState([
    ]);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('http://localhost:3000/deposit')
                .then(response => {
                    if (response.data.success == true) {
                        console.log(response.data);
                        setEmpty(false);
                        setFetch(response.data.result);
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

    return fetch.map((item, i) => (
        <>
            <Typography variant="h5">{getDateRangeForWeek(item._id.year, item._id.week)}</Typography>
            <Box sx={styles.container} key={i}>
                <TableContainer sx={styles.tableContainer} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Sender:</TableCell>
                        <TableCell align="left">Traded:</TableCell>
                        <TableCell align="left">Date:</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {item.data.map((row, i) => (
                        <TableRow key={i}>
                        <TableCell component="th" sx={styles.contentCell}>
                            {row.from}
                        </TableCell>
                        <TableCell align="left">{row.amount}</TableCell>
                        <TableCell align="left">
                            {row.depositTime.substring(0, 10) + ' ' + row.depositTime.substring(11, 19)}
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Box>
        </>
    ));
}

export default TopDepositList;


/**
 * @type {import("@mui/material").SxProps}
 */

const styles = {
    container: {
        mt: 2,
        mb: 7,
        width: '100%',
        textAlign: 'center'
    },
    tableContainer: {
        mt: 1
    },
    contentCell: {
        display: 'flex',
        alignItems: 'center'
    },
    TransactionThumbnail: {
        width: '100%',
        maxWidth: 100,
        marginRight: 1,
    },
}

