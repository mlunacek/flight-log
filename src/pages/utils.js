
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

    // const totalFlightsFormatted = totals.totalFlights.toLocaleString();
    // const totalHoursFormatted = Math.round(totals.totalHours).toLocaleString();

    // return {
    //     flights: totalFlightsFormatted,
    //     hours: totalHoursFormatted
    // }

    return {
        flights: totals.totalFlights,
        hours: totals.totalHours
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
    const currentYear = new Date().getFullYear();

    const acc = summary.reduce((acc, row) => {
        if (!acc[row.year]) {
            acc[row.year] = {
                year: row.year,
                label: row.year,
                chartLabel: row.year,
                count: 0,
                minutes: 0,
            };
        }

        acc[row.year].count += row.count;
        acc[row.year].minutes += row.minutes;

        return acc;
    }, {});

    // Ensure current year exists even if there is no data
    if (!acc[currentYear]) {
        acc[currentYear] = {
            year: currentYear,
            label: currentYear,
            chartLabel: String(currentYear).slice(-2),
            count: 0,
            minutes: 0,
        };
    }

    return Object.values(acc).sort((a, b) => b.year - a.year);
}


export function getRollingRows(summary, n = 12, asOf = new Date()) {

    const summaryMap = new Map(
        (summary ?? []).map((r) => [
            `${r.year}-${String(r.month).padStart(2, "0")}`,
            { count: r.count, minutes: r.minutes },
        ])
    );

    // Anchor on the calendar (current month), not on the latest data point.
    let y = asOf.getFullYear();
    let m = asOf.getMonth() + 1; // JS Date: 0..11 => 1..12

    const months = [];
    for (let i = 0; i < n; i++) {
        months.push({ year: y, month: m });
        m -= 1;
        if (m === 0) {
            m = 12;
            y -= 1;
        }
    }

    // months currently newest -> oldest, so reverse to oldest -> newest
    // months.reverse();

    const rows = months.map(({ year, month }) => {
        const key = `${year}-${String(month).padStart(2, "0")}`;
        const val = summaryMap.get(key) ?? { count: 0, minutes: 0 };
        const label = yearMonthLabel(year, month);
        const chartLabel = monthLabel(year, month);
        return { year, month, label, chartLabel, ...val };
    });

    return rows; // oldest -> newest
}