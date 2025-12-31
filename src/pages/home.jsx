import { useCallback, useEffect, useState } from 'react';
import { atomWithStorage } from 'jotai/utils';
import { atom, useAtom, useAtomValue } from 'jotai';

import { Box, Button, Typography, Link } from '@mui/material';

import { flightLogSummaryAtom, isLoggedInAtom } from '../auth/atoms';

import LoginScreen from '@/auth/login-screen';
import TopBar from './top-bar';


import {
    SummaryTable,
} from './summary-table';

import { RowsSummaryTable } from './rows-summary-table';
import { getRollingRows, getYTDRows, computeTotals, summarizeByYear } from './utils'

const HomePage = () => {

    const stored = useAtomValue(flightLogSummaryAtom);
    const isLoggedIn = useAtomValue(isLoggedInAtom);

    const [last12Months, setLas12Months] = useState([]);
    const [yearTotals, setYearTotals] = useState([]);
    const [summary, setSummary] = useState([]);

    useEffect(() => {
        if (!stored?.summary) return

        setLas12Months(getRollingRows(stored.summary))
        setYearTotals(summarizeByYear(stored.summary))
        setSummary(stored.summary)


    }, [stored?.summary])

    useEffect(() => {
        if (!stored?.lastFlights) return;
        console.log("stored?.lastFlights", stored?.lastFlights)
    }, [stored?.lastFlights])


    if (!isLoggedIn) {
        return (
            <LoginScreen />
        )
    }


    return (
        <Box>
            {/* <TopBar /> */}

            <SummaryTable summary={summary} />
            <RowsSummaryTable rows={last12Months} title="Last 12 Months" />
            <RowsSummaryTable rows={yearTotals} title="Year Totals" />


            <Box>
                <pre>{stored ? JSON.stringify(stored, null, 2) : "No data yet. Click Refresh."}</pre>
            </Box>

        </Box>
    )
};

export default HomePage;