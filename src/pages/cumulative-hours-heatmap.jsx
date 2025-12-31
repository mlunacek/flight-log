import * as React from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const LEFT_LABEL_WIDTH = 56;
const GAP = 2;

export default function CumulativeHoursHeatmapMUI({ data }) {
  const theme = useTheme();
  const containerRef = React.useRef(null);
  const [containerWidth, setContainerWidth] = React.useState(0);

  // Observe container width for full-width sizing
  React.useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const { years, grid, maxCumHours } = React.useMemo(() => {
    const years = Array.from(new Set(data.map((d) => d.year))).sort((a, b) => a - b);

    // Aggregate duplicates by year-month (sum minutes + count)
    const byYM = new Map();
    for (const d of data) {
      const key = `${d.year}-${d.month}`;
      const prev = byYM.get(key) || { minutes: 0, count: 0 };
      byYM.set(key, { minutes: prev.minutes + d.minutes, count: prev.count + d.count });
    }

    let maxCum = 0;

    const grid = years.map((year) => {
      let runningMinutes = 0;
      let runningCount = 0;

      const months = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        const agg = byYM.get(`${year}-${month}`) || { minutes: 0, count: 0 };

        // running totals (YTD)
        runningMinutes += agg.minutes;
        runningCount += agg.count;

        const cumHours = runningMinutes / 60;

        if (cumHours > maxCum) maxCum = cumHours;

        return {
          year,
          month,
          // monthly (for tooltip context)
          minutes: agg.minutes,
          count: agg.count,
          hours: agg.minutes / 60,
          // cumulative (what we plot)
          cumMinutes: runningMinutes,
          cumCount: runningCount,
          cumHours,
        };
      });

      return { year, months };
    });

    return { years, grid, maxCumHours: maxCum };
  }, [data]);

  const cellSize = React.useMemo(() => {
    if (!containerWidth) return 24;
    const usable = containerWidth - LEFT_LABEL_WIDTH - GAP * 11;
    return Math.max(16, Math.floor(usable / 12));
  }, [containerWidth]);

  const cellBg = (cumHours) => {
    if (cumHours <= 0) return alpha(theme.palette.primary.main, 0.06);
    const t = maxCumHours > 0 ? Math.min(1, cumHours / maxCumHours) : 0;
    return alpha(theme.palette.primary.main, 0.12 + 0.78 * t);
  };

  const fmt = (n, digits = 1) =>
    Number.isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: digits }) : "0";

  return (
    <Box ref={containerRef} width="100%">
      {/* Header */}
      <Box display="flex" alignItems="baseline" justifyContent="space-between" mb={1}>
        <Typography variant="subtitle2" fontWeight={700}>
          Cumulative Hours (YTD) by Month
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Max YTD: <b>{fmt(maxCumHours, 1)}</b> h
        </Typography>
      </Box>

      {/* Month labels */}
      <Box display="flex" sx={{ pl: `${LEFT_LABEL_WIDTH}px`, mb: 0.5 }}>
        {MONTHS.map((m, i) => (
          <Box
            key={m}
            sx={{
              width: cellSize,
              mr: i < 11 ? `${GAP}px` : 0,
              textAlign: "center",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              {m}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Grid */}
      {grid.map((row) => (
        <Box key={row.year} display="flex" alignItems="center" mb={`${GAP}px`}>
          {/* Year label */}
          <Box sx={{ width: LEFT_LABEL_WIDTH, pr: 1, textAlign: "right" }}>
            <Typography variant="caption" color="text.secondary">
              {row.year}
            </Typography>
          </Box>

          {/* Cells */}
          <Box display="flex">
            {row.months.map((cell, i) => (
              <Tooltip
                key={`${cell.year}-${cell.month}`}
                arrow
                placement="top"
                title={
                  <Box>
                    <Typography variant="subtitle2" fontWeight={700}>
                      {MONTHS[cell.month - 1]} {cell.year}
                    </Typography>

                    <Typography variant="body2">
                      <span>Monthly hours: </span>
                      <b>{fmt(cell.hours, 2)}</b>
                    </Typography>
                    <Typography variant="body2">
                      <span>Monthly count: </span>
                      <b>{cell.count}</b>
                    </Typography>

                    <Box mt={0.75} />

                    <Typography variant="body2">
                      <span>YTD hours: </span>
                      <b>{fmt(cell.cumHours, 2)}</b>
                    </Typography>
                    <Typography variant="body2">
                      <span>YTD count: </span>
                      <b>{cell.cumCount}</b>
                    </Typography>
                  </Box>
                }
              >
                <Box
                  sx={{
                    width: cellSize,
                    height: cellSize,
                    mr: i < 11 ? `${GAP}px` : 0,
                    borderRadius: 1.5,
                    bgcolor: cellBg(cell.cumHours),
                    border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
                    cursor: "default",
                  }}
                />
              </Tooltip>
            ))}
          </Box>
        </Box>
      ))}

      {/* Legend */}
      {/* <Box display="flex" alignItems="center" gap={1} mt={1}>
        <Typography variant="caption" color="text.secondary">
          Less
        </Typography>
        <Box display="flex" gap={0.75}>
          {Array.from({ length: 6 }, (_, i) => (
            <Box
              key={i}
              sx={{
                width: 18,
                height: 18,
                borderRadius: 1,
                bgcolor: cellBg((i / 5) * maxCumHours),
                border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
              }}
            />
          ))}
        </Box>
        <Typography variant="caption" color="text.secondary">
          More
        </Typography>
      </Box>*/}
    </Box>
  );
}
