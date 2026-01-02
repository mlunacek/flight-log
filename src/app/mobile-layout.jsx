import * as React from "react";

import { Outlet, useLocation } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonIcon from '@mui/icons-material/Person';
import ParaglidingIcon from '@mui/icons-material/Paragliding';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';

import LinearProgress from "@mui/material/LinearProgress";

const drawerWidth = 280;

import { useAtomValue } from 'jotai';

import RefreshIcon from "@mui/icons-material/Refresh";
import MergeIcon from "@mui/icons-material/CallMerge";

import { useLogout } from "../auth/use-logout";
import { useFlightLogSummaryManual, userEmailAtom, isLoggedInAtom } from '../auth/atoms';


export default function MobileLayout() {
    const [open, setOpen] = React.useState(false);
    const { pathname } = useLocation();

    const isAbout = pathname === "/about";
    const isLoggedIn = useAtomValue(isLoggedInAtom);

    const toggleDrawer = (nextOpen) => () => setOpen(nextOpen);

    const email = useAtomValue(userEmailAtom);
    const logout = useLogout();
    const { refetch, isFetching, error } = useFlightLogSummaryManual();
    const { refetch: refetchMerge, isFetching: isFetchingMerge, error: errorMerge } = useFlightLogSummaryManual({ merge: true });

    const handlePostClick = React.useCallback(() => {
        refetch()
    }, [refetch])

    const handleMergeClick = React.useCallback(() => {
        refetchMerge()
    }, [refetchMerge])

    const isBusy = isFetching || isFetchingMerge;


    const drawerContent = (
        <Box
            sx={{ width: drawerWidth }}
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            <Toolbar />

            <Divider />
            <List>

                <ListItem disablePadding>
                    <ListItemButton
                        component="a"
                        href={`${import.meta.env.BASE_URL}`}
                    >
                        <ListItemIcon>
                            <BarChartOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Summary"} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        component="a"
                        href={`${import.meta.env.BASE_URL}flights`}
                    >
                        <ListItemIcon>
                            <ParaglidingIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Flights"} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        component="a"
                        href={`${import.meta.env.BASE_URL}about`}
                    >
                        <ListItemIcon>
                            <InfoOutlinedIcon />
                        </ListItemIcon>

                        <ListItemText primary={"About"} />
                    </ListItemButton>
                </ListItem>

                <Divider />

                <ListItem disablePadding>
                    <ListItemButton
                        disabled={isAbout || !isLoggedIn}
                        onClick={handlePostClick}
                    >
                        <ListItemIcon>
                            <RefreshIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Refresh"} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        disabled={isAbout || !isLoggedIn}
                        onClick={handleMergeClick}
                    >
                        <ListItemIcon>
                            <MergeIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Merge"} />
                    </ListItemButton>
                </ListItem>


                {isLoggedIn &&
                    <>
                        <Divider />

                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={logout}
                            >
                                <ListItemIcon>
                                    <LogoutOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Logout"} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton disabled>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary={email?.slice(0, -10)} />
                            </ListItemButton>
                        </ListItem>
                    </>
                }
            </List>
        </Box >
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            <AppBar
                position="fixed"
                elevation={1}
                sx={{
                    backgroundColor: "#fff",
                    color: "text.primary",
                }}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: {
                            xs: 48,
                            sm: 48,
                        },
                        px: 1,
                    }}
                >
                    <IconButton
                        edge="start"
                        onClick={toggleDrawer(true)}
                        sx={{ mr: 1 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ flexGrow: 1 }} />

                    <Typography variant="caption" noWrap>
                        v{__APP_VERSION__}
                    </Typography>
                </Toolbar>

                {isBusy && <LinearProgress />}
            </AppBar>


            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
                ModalProps={{ keepMounted: true }}
            >
                {drawerContent}
            </Drawer>

            {/* Routed content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 0.5,
                    width: "100%",
                    maxWidth: "100%",
                    overflowX: "hidden",
                    p: 1,
                }}
            >
                {/* Spacer for AppBar */}
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}
