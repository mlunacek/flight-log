// MonthlyHoursLineChartMUI.js
import * as React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { LineChart } from "@mui/x-charts/LineChart";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function MonthlyHoursLineChartMUI({ data }) {
    const theme = useTheme();
    const currentYear = String(new Date().getFullYear()).slice(-2);
    const lastYear = String(Number(currentYear) - 1); // keep as string

    const { years, series, maxY } = React.useMemo(() => {
        // Aggregate minutes by year-month
        const byYM = new Map();
        for (const d of data || []) {
            const key = `${d.year}-${d.month}`;
            byYM.set(key, (byYM.get(key) || 0) + (d.minutes || 0));
        }

        const years = Array.from(
            new Set((data || []).map((d) => String(d.year).slice(-2)))
        ).sort((a, b) => Number(a) - Number(b));

        let maxY = 0;

        const series = years.map((yy) => {
            const monthlyHours = MONTHS.map((_, i) => {
                const month = i + 1;
                const minutes = byYM.get(`20${yy}-${month}`) || 0;
                const h = minutes / 60;
                if (h > maxY) maxY = h;
                return Number(h.toFixed(2));
            });

            const isCurrent = yy === currentYear;

            return {
                id: String(yy),
                label: String(yy),
                data: monthlyHours,
                showMark: isCurrent,
                curve: "linear",
            };
        });

        return { years, series, maxY };
    }, [data, currentYear]);

    if (!data || data.length === 0) return null;

    return (
        <Paper
            elevation={2}
            sx={{
                mx: 0,
                mt: 2,
                mb: 0,
                borderRadius: 3,
                overflow: "hidden",
            }}
        >
            <Box sx={{ p: 2 }}>
                <Box display="flex" alignItems="baseline" justifyContent="space-between" mb={1}>
                    <Typography variant="h6" fontWeight={600}>
                        Monthly Hours
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Max Month: <b>{maxY.toFixed(1)}</b> h
                    </Typography>
                </Box>
            </Box>

            <Box border={0} sx={{ width: "100%", mx: 0, mt: 0, pl: 0, pr: 2 }}>
                <LineChart
                    height={325}
                    series={series.map((s) => ({
                        ...s,
                        lineWidth: s.id === String(currentYear) ? 4 : 1,
                    }))}
                    xAxis={[
                        {
                            id: "months",
                            data: MONTHS,
                            scaleType: "point",
                            valueFormatter: (v) => v,
                        },
                    ]}
                    yAxis={[
                        {
                            width: 30,
                            valueFormatter: (v) => `${v}`,
                        },
                    ]}
                    grid={{ horizontal: true, vertical: false }}
                    tooltip={{
                        trigger: "axis",
                        valueFormatter: (v) => `${Number(v).toFixed(1)} h`,
                    }}
                    margin={{ top: 10, right: 5, bottom: 22, left: 0 }}
                    slotProps={{
                        legend: { hidden: true },
                    }}
                />
            </Box>
        </Paper>
    );
}
