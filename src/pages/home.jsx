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


    useEffect(() => {
        if (!stored?.summary) return

        setLas12Months(getRollingRows(stored.summary))
        setYearTotals(summarizeByYear(stored.summary))



        console.log("stored?.summary", computeTotals(stored?.summary))
        console.log("getRollingRows", computeTotals(getRollingRows(stored.summary)))
        console.log("getYTDRows", computeTotals(getYTDRows(stored.summary)))

    }, [stored?.summary])



    if (!isLoggedIn) {
        return (
            <LoginScreen />
        )
    }


    return (
        <Box border={0}>
            <TopBar />

            <SummaryTable summary={stored.summary} />
            <RowsSummaryTable rows={last12Months} title="Last 12 Months" />
            <RowsSummaryTable rows={yearTotals} title="Year Totals" />


            {/* <YearlySummaryTable summary={stored.summary} />
            <LastYearTable summary={stored.summary} />
            <YearHoursBarChart summary={stored.summary} /> */}

            <Box>
                <pre>{stored ? JSON.stringify(stored, null, 2) : "No data yet. Click Refresh."}</pre>

            </Box>

        </Box>
    )
};

export default HomePage;