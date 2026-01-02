import { useCallback, useEffect, useState } from 'react';
import { atomWithStorage } from 'jotai/utils';
import { atom, useAtom, useAtomValue } from 'jotai';
import Alert from "@mui/material/Alert";
import { Box, Button, Typography, Link, Divider } from '@mui/material';

import { flightLogSummaryAtom, isLoggedInAtom } from '../auth/atoms';

import {
    SummaryTable,
} from '../cards/summary-table';

import VersionUpdated from '../cards/version-updated'
import ShowCurrencyWarning from '../cards/show-currency-warning';
import { RowsSummaryTable } from '../cards/rows-summary-table';
import { getRollingRows, summarizeByYear } from './utils'
import HoursHeatmapMUI from '../cards/monthly-hours-heatmap';
import CumulativeHoursHeatmapMUI from '../cards/cumulative-hours-heatmap'
import CumulativeHoursLineChartMUI from '../cards/cumulative-hours-linechart-MUI';
import MonthlyHoursLineChartMUI from '../cards/monthly-hours-linechart-MUI';

import PageContainer from '@/app/page-container'


function SummaryPage() {

    const stored = useAtomValue(flightLogSummaryAtom);
    const isLoggedIn = useAtomValue(isLoggedInAtom);

    const [lastUpdated, setLastUpdated] = useState()
    const [lastQuarter, setLastQuarter] = useState([]);
    const [lastYear, setLastYear] = useState([])
    const [yearTotals, setYearTotals] = useState([]);
    const [summary, setSummary] = useState([]);
    const [showLowHoursWarning, setShowLowHoursWarning] = useState(false)

    useEffect(() => {
        if (!stored?.updateTime) return;
        const localString = new Date(stored?.updateTime).toLocaleString();
        setLastUpdated(localString)

    }, [stored?.updateTime])

    useEffect(() => {
        if (!stored?.summary) return
        setLastQuarter(getRollingRows(stored.summary, 3))
        setLastYear(getRollingRows(stored.summary, 12))
        setYearTotals(summarizeByYear(stored.summary))
        setSummary(stored.summary)


    }, [stored?.summary])

    useEffect(() => {
        if (!lastQuarter || lastQuarter.hours < 10) return;
        setShowLowHoursWarning(true)
    }, [lastQuarter?.hours])

    return (
        <Box border={0} pl={1} pr={1}>

            <VersionUpdated lastUpdated={lastUpdated} showLowHoursWarning={showLowHoursWarning} />

            <SummaryTable summary={summary} />

            <RowsSummaryTable rows={lastYear} title="Last 12 Months" />

            <RowsSummaryTable rows={yearTotals} title="Year Totals" />

            <CumulativeHoursLineChartMUI data={summary} />

            <MonthlyHoursLineChartMUI data={summary} />

            <HoursHeatmapMUI data={summary} />

        </Box>
    )
}

export default SummaryPage
