import { Paper, Typography, Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

function summarizeByYear(summary) {
    return Object.values(
        summary.reduce((acc, row) => {
            if (!acc[row.year]) acc[row.year] = { year: row.year, minutes: 0 };
            acc[row.year].minutes += row.minutes;
            return acc;
        }, {})
    ).sort((a, b) => a.year - b.year);
}

export function FlightsBarChart({ rows }) {

    const reverseRows = [...rows].reverse();

    const years = reverseRows.map((r) => String(r.chartLabel));
    const hours = reverseRows.map((r) => Number((r.minutes / 60).toFixed(1)));

    return (

        <Box border={0} sx={{ width: "100%", mx: 0, mt: 0 }}>
            <BarChart
                height={220}
                colors={["#1976d2", "#90caf9"]}
                xAxis={[
                    {
                        scaleType: "band",
                        data: years,
                        // valueFormatter: (year) => year.slice(-2),
                    },
                ]}
                yAxis={[{
                    width: 30,
                    data: hours,
                }]}
                series={[{ data: hours }]}
                margin={{ top: 10, right: 0, bottom: 22, left: 0 }}
                slotProps={{ legend: { hidden: true } }}
            />
        </Box>
    );
}
