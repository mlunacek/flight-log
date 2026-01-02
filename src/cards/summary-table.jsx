// SummaryTable.js
import React, { useEffect, useState } from "react";

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

import CountUp from "react-countup";

import { getRollingRows, getYTDRows, computeTotals } from "../pages/utils";

// Small helper to keep the table tidy
function AnimatedNumber({ value, decimals = 0, suffix = "", duration = 0.9 }) {
    const safe = Number.isFinite(value) ? value : 0;

    // key={safe} ensures it animates when the value changes
    return (
        <CountUp
            key={safe}
            end={safe}
            duration={duration}
            decimals={decimals}
            separator=","
            suffix={suffix}
            preserveValue
        />
    );
}

export function SummaryTable({ summary, title = "Summary" }) {


    const [total, setTotal] = useState();
    const [ytd, setYtd] = useState();
    const [lastQuarter, setLastQuarter] = useState();
    const [rolling, setRolling] = useState();

    useEffect(() => {
        if (!summary) return;

        setTotal(computeTotals(summary));
        setYtd(computeTotals(getYTDRows(summary)));
        setRolling(computeTotals(getRollingRows(summary)));
        setLastQuarter(computeTotals(getRollingRows(summary, 3)));
    }, [summary]);

    const numberSx = { fontWeight: 700 };

    console.log(summary)
    console.log(total)

    return (
        <Paper
            elevation={2}
            sx={{
                mx: 0,
                mt: 0,
                mb: 0,
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
                        {lastQuarter && (
                            <TableRow>
                                <TableCell>Last Quarter</TableCell>
                                <TableCell align="right">
                                    <Typography sx={numberSx}>
                                        <AnimatedNumber value={lastQuarter.flights} />
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={numberSx}>
                                        <AnimatedNumber value={lastQuarter.hours} decimals={1} />
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}

                        {rolling && (
                            <TableRow>
                                <TableCell>Last 12 Months</TableCell>
                                <TableCell align="right">
                                    <Typography sx={numberSx}>
                                        <AnimatedNumber value={rolling.flights} />
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={numberSx}>
                                        <AnimatedNumber value={rolling.hours} decimals={1} />
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}

                        {ytd && (
                            <TableRow>
                                <TableCell>YTD</TableCell>
                                <TableCell align="right">
                                    <Typography sx={numberSx}>
                                        <AnimatedNumber value={ytd.flights} />
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={numberSx}>
                                        <AnimatedNumber value={ytd.hours} decimals={1} />
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}

                        {total && (
                            <TableRow>
                                <TableCell>All years</TableCell>
                                <TableCell align="right">
                                    <Typography sx={numberSx}>
                                        <AnimatedNumber value={total.flights} />
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={numberSx}>
                                        <AnimatedNumber value={total.hours} decimals={1} />
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export function YTDSummaryTable({ summary, year = new Date().getFullYear() }) {
    const ytd = (summary || []).filter((row) => row.year === year);
    return <SummaryTable title={`${year} YTD`} summary={ytd} />;
}
