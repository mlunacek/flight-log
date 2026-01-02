import { useState, useEffect } from 'react'

import {
    Box,
    Typography,
    Card,
    CardContent,
    Stack,
    Button,
    Divider,
    Chip,
} from "@mui/material";


import { useAtomValue } from "jotai";

import { useLogout } from "../auth/use-logout";
import { flightLogSummaryAtom, useFlightLogSummaryManual, userEmailAtom, isLoggedInAtom } from '../auth/atoms';

export function SettingsPage() {

    const email = useAtomValue(userEmailAtom);
    const logout = useLogout();
    const isLoggedIn = useAtomValue(isLoggedInAtom);

    const { refetch, isFetching, error } = useFlightLogSummaryManual();
    const { refetch: refetchMerge, isFetching: isFetchingMerge, error: errorMerge } = useFlightLogSummaryManual({ merge: true });
    const stored = useAtomValue(flightLogSummaryAtom);

    const isBusy = isFetching || isFetchingMerge
    const [lastUpdated, setLastUpdated] = useState()

    useEffect(() => {
        if (!stored?.updateTime) return;
        const localString = new Date(stored?.updateTime).toLocaleString();
        setLastUpdated(localString)

    }, [stored?.updateTime])


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
                    Settings
                </Typography>

                {/* Account / status */}
                <Card variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
                    <CardContent sx={{ p: 2 }}>
                        <Stack spacing={1}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Account
                            </Typography>

                            {email ? (
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                    {email}
                                </Typography>
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    Not signed in
                                </Typography>
                            )}

                            {isLoggedIn && lastUpdated && (
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                                    <Typography variant="caption" color="text.secondary">
                                        Updated: {lastUpdated}
                                    </Typography>
                                </Stack>
                            )}
                        </Stack>
                    </CardContent>
                </Card>

                {isLoggedIn && (
                    <Card variant="outlined" sx={{ marginTop: 2, borderRadius: 3, overflow: "hidden" }}>
                        <CardContent sx={{ p: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                                Actions
                            </Typography>

                            <Stack spacing={1.25}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={refetchMerge}
                                    disabled={isBusy}
                                    sx={{ borderRadius: 2, py: 1.2, textTransform: "none", fontWeight: 700 }}
                                >
                                    Sync
                                </Button>

                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={refetch}
                                    disabled={isBusy}
                                    sx={{ borderRadius: 2, py: 1.2, textTransform: "none", fontWeight: 700 }}
                                >
                                    Refresh
                                </Button>

                                <Button
                                    variant="text"
                                    fullWidth
                                    color="error"
                                    onClick={() => logout()}
                                    sx={{ borderRadius: 2, py: 1.1, textTransform: "none", fontWeight: 700 }}
                                >
                                    Logout
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                )}


                {/* Optional footer spacing for phone safe areas */}
                <Box sx={{ height: 12 }} />
            </Box>
        </Box>
    );
}


export default SettingsPage;