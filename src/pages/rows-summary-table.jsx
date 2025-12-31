import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
} from "@mui/material";

import { FlightsBarChart } from './bar-chart';

export function RowsSummaryTable({ rows, title }) {



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

            <FlightsBarChart rows={rows} />

            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Year</TableCell>
                            <TableCell align="right">Flights</TableCell>
                            <TableCell align="right">Hours</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.label}>
                                <TableCell>{row.label}</TableCell>
                                <TableCell align="right">
                                    {row.count.toLocaleString()}
                                </TableCell>
                                <TableCell align="right">
                                    {(row.minutes / 60).toLocaleString(undefined, {
                                        maximumFractionDigits: 1,
                                    })}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
