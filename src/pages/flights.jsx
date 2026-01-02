import {
    useState,
    useEffect
} from 'react';

import {
    Box,
    Typography
} from '@mui/material';

import { useAtomValue } from 'jotai'

import {
    flightLogSummaryAtom,
    isLoggedInAtom
} from '@/auth/atoms';



const FlightsPage = () => {

    const stored = useAtomValue(flightLogSummaryAtom);
    const isLoggedIn = useAtomValue(isLoggedInAtom);

    return (
        <Box
            sx={{
                minHeight: "100dvh",
                bgcolor: "background.default",
                px: 2,
                py: 2.5,
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Box sx={{ width: "100%", maxWidth: 420 }}>
                {/* Page title */}
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                    Flights
                </Typography>
            </Box>
        </Box>
    );
}

export default FlightsPage