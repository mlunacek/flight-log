import {
    useEffect,
    useState
} from 'react';

import {
    TableContainer,
    TableHead,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Typography,
    Box,
} from "@mui/material";

import { getRollingRows, getYTDRows, computeTotals } from './utils'

export function SummaryTable({ summary, title = "Summary", }) {

    const [total, setTotal] = useState()
    const [ytd, setYtd] = useState()
    const [rolling, setRolling] = useState()

    useEffect(() => {
        if (!summary) return;

        setTotal(computeTotals(summary))
        setYtd(computeTotals(getYTDRows(summary)))
        setRolling(computeTotals(getRollingRows(summary)))

    }, [summary])

    return (
        <Paper
            elevation={2}
            sx={{
                mx: 1,
                mt: 1,
                mb: 2,
                borderRadius: 3,
                overflow: "hidden",
            }}
        >
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                    {title}
                </Typography>
            </Box>

            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Period</TableCell>
                            <TableCell align="right">Flights</TableCell>
                            <TableCell align="right">Hours</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {rolling &&
                            <TableRow>
                                <TableCell>Last 12 Months</TableCell>
                                <TableCell align="right">
                                    {rolling.flights}
                                </TableCell>
                                <TableCell align="right">
                                    {rolling.hours}
                                </TableCell>
                            </TableRow>
                        }

                        {ytd &&
                            <TableRow>
                                <TableCell>YTD</TableCell>
                                <TableCell align="right">
                                    {ytd.flights}
                                </TableCell>
                                <TableCell align="right">
                                    {ytd.hours}
                                </TableCell>
                            </TableRow>
                        }

                        {total &&
                            <TableRow>
                                <TableCell>All years</TableCell>
                                <TableCell align="right">
                                    {total.flights}
                                </TableCell>
                                <TableCell align="right">
                                    {total.hours}
                                </TableCell>
                            </TableRow>
                        }


                    </TableBody>
                </Table>
            </TableContainer>


        </Paper>
    );
}

export function YTDSummaryTable({ summary, year = new Date().getFullYear() }) {
    const ytd = summary.filter((row) => row.year === year);

    return <SummaryTable title={`${year} YTD`} summary={ytd} />;
}
