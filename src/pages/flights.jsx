import {
    useState,
    useEffect
} from 'react';

import {
    Box
} from '@mui/material';

import { useAtomValue } from 'jotai'

import LoginScreen from '@/auth/login-screen';

import {
    flightLogSummaryAtom,
    isLoggedInAtom
} from '@/auth/atoms';



const FlightsPage = () => {

    const stored = useAtomValue(flightLogSummaryAtom);
    const isLoggedIn = useAtomValue(isLoggedInAtom);


    if (!isLoggedIn) {
        return (
            <LoginScreen />
        )
    }

    return (
        <Box>
            <pre>{stored?.lastFlights ? JSON.stringify(stored?.lastFlights, null, 2) : "No data yet. Click Refresh."}</pre>
        </Box>

    )
}

export default FlightsPage