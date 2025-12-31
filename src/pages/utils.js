
export function yearMonthLabel(year, month) {
    // month is 1-12 in your data
    return new Date(year, month - 1, 1).toLocaleString(undefined, {
        month: "short",
        year: "2-digit",
    });
}

export function monthLabel(year, month) {
    // month is 1-12 in your data
    return new Date(year, month - 1, 1).toLocaleString(undefined, {
        month: "short",
    });
}

export function computeTotals(summary) {

    const totals = summary.reduce(
        (acc, item) => {
            acc.totalFlights += item.count;
            acc.totalHours += item.minutes / 60.;
            return acc;
        },
        { totalFlights: 0, totalHours: 0 }
    );

    const totalFlightsFormatted = totals.totalFlights.toLocaleString();
    const totalHoursFormatted = Math.round(totals.totalHours).toLocaleString();

    return {
        flights: totalFlightsFormatted,
        hours: totalHoursFormatted
    }
}


export function getYTDRows(summary) {

    const currentYear = parseInt(String(new Date().getFullYear()));
    const filtered = summary.filter((item) => parseInt(item.year) === currentYear)

    return filtered.map((d) => ({
        year: d.year,
        month: d.month,
        count: d.count,
        minutes: d.minutes,
    }));
}

export function summarizeByYear(summary) {
    return Object.values(
        summary.reduce((acc, row) => {
            if (!acc[row.year]) {
                acc[row.year] = {
                    year: row.year,
                    count: 0,
                    minutes: 0,
                };
            }

            acc[row.year].label = row.year;
            acc[row.year].chartLabel = row.year
            acc[row.year].count += row.count;
            acc[row.year].minutes += row.minutes;

            return acc;
        }, {})
    ).sort((a, b) => b.year - a.year); // newest first
}



export function getRollingRows(summary, n = 12) {

    const summaryMap = new Map(
        summary.map((r) => [`${r.year}-${r.month}`, { count: r.count, minutes: r.minutes }])
    );


    const data = summary?.reduce(
        (max, r) => {
            if (r.year > max.year || (r.year === max.year && r.month > max.month)) {
                return { year: r.year, month: r.month };
            }
            return max;
        },
        { year: 0, month: 0 }
    );

    let y = data.year;
    let m = data.month; // 1..12
    const months = [];

    for (let i = 0; i < n; i++) {
        months.push({ year: y, month: m });
        m -= 1;
        if (m === 0) {
            m = 12;
            y -= 1;
        }
    }

    const rows = months.map(({ year, month }) => {
        const key = `${year}-${month}`;
        const val = summaryMap.get(key) ?? { count: 0, minutes: 0 };
        const label = yearMonthLabel(year, month)
        const chartLabel = monthLabel(year, month)
        return { year, month, label, chartLabel, ...val };
    });

    return rows; // oldest -> newest
}