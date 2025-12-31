import {
    useCallback
} from 'react'

import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    Box,
    LinearProgress
} from "@mui/material";
import { useAtomValue } from 'jotai';

import RefreshIcon from "@mui/icons-material/Refresh";
import MergeIcon from "@mui/icons-material/CallMerge";

import { useLogout } from "../auth/use-logout";
import { useFlightLogSummaryManual, userEmailAtom } from '../auth/atoms';




export default function TopBar({ }) {

    const email = useAtomValue(userEmailAtom);
    const logout = useLogout();
    const { refetch, isFetching, error } = useFlightLogSummaryManual();
    const { refetch: refetchMerge, isFetching: isFetchingMerge, error: errorMerge } = useFlightLogSummaryManual({ merge: true });

    const handlePostClick = useCallback(() => {
        refetch()
    }, [refetch])

    const handleMergeClick = useCallback(() => {
        refetchMerge()
    }, [refetchMerge])

    const isBusy = isFetching || isFetchingMerge;

    return (
        <AppBar position="sticky">
            <Toolbar sx={{ gap: 1 }}>
                {/* Left actions */}
                <Button
                    startIcon={<RefreshIcon />}
                    color="inherit"
                    disabled={isBusy}
                    onClick={handlePostClick}
                >
                    Refresh
                </Button>

                <Button
                    startIcon={<MergeIcon />}
                    color="inherit"
                    disabled={isBusy}
                    onClick={handleMergeClick}
                >
                    Merge
                </Button>

                {/* Spacer */}
                <Box sx={{ flexGrow: 1 }} />

                {/* User info */}
                <Typography
                    variant="body2"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        mr: 2,
                        opacity: 0.8,
                    }}
                >
                    {email}
                </Typography>

                <Button color="inherit" onClick={logout}>
                    Logout
                </Button>
            </Toolbar>
            {isBusy && <LinearProgress />}
        </AppBar>
    );
}