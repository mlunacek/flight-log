// ResponsiveLayout.js
import React from "react";
import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import NavRail from "./NavRail";
import BottomMenu from "./BottomMenu";


const APP_BAR_HEIGHT = 0;
const BOTTOM_MENU_HEIGHT = 56;

// Desktop rail widths
const DESKTOP_RAIL_COLLAPSED = 64;
const DESKTOP_RAIL_OPEN = 240;

// Mobile “peek” width
const MOBILE_RAIL_PEEK = 56;

// Desktop content max width
const DESKTOP_CONTENT_MAX_WIDTH = 1024;

// ---------- helpers ----------
function getBasePath() {
    const baseUrl = (import.meta?.env?.BASE_URL || "/").replace(/\/+$/, "/");
    if (baseUrl === "/") return "";
    return baseUrl.replace(/\/$/, "");
}
function stripBase(pathname, basePath) {
    if (!basePath) return pathname;
    return pathname.startsWith(basePath)
        ? pathname.slice(basePath.length) || "/"
        : pathname;
}
function normalizePath(p) {
    if (!p) return "/";
    if (p.length > 1 && p.endsWith("/")) return p.slice(0, -1);
    return p;
}
// --------------------------------

export default function ResponsiveLayout({ navItems }) {
    const theme = useTheme();

    // Mobile detection
    const isTouch = useMediaQuery("(pointer: coarse)");
    const noHover = useMediaQuery("(hover: none)");
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isMobile = (isTouch && noHover) || isSmallScreen;

    const isLandscape = useMediaQuery("(orientation: landscape)");

    // Layout rules
    const showRail = !isMobile || (isMobile && isLandscape);
    const showBottom = isMobile && !isLandscape;

    const navigate = useNavigate();
    const location = useLocation();

    const basePath = React.useMemo(() => getBasePath(), []);
    const pathnameNoBase = React.useMemo(
        () => stripBase(location.pathname, basePath),
        [location.pathname, basePath]
    );
    const currentPath = normalizePath(pathnameNoBase);

    const [railOpen, setRailOpen] = React.useState(!isMobile);

    React.useEffect(() => {
        setRailOpen(!isMobile);
    }, [isMobile]);

    const handleNavigate = (path) => {
        navigate(path);
        if (isMobile) setRailOpen(false);
    };

    // Safe-area insets (0 on non-iOS)
    const safeTop = "env(safe-area-inset-top, 0px)";
    const safeLeft = "env(safe-area-inset-left, 0px)";
    const safeRight = "env(safe-area-inset-right, 0px)";
    const safeBottom = "env(safe-area-inset-bottom, 0px)";

    // Content offsets
    const leftPadding = showRail
        ? isMobile
            ? `calc(${MOBILE_RAIL_PEEK}px + ${safeLeft})`
            : `${railOpen ? DESKTOP_RAIL_OPEN : DESKTOP_RAIL_COLLAPSED}px`
        : "0px";

    const bottomPadding = showBottom
        ? `calc(${BOTTOM_MENU_HEIGHT}px + ${safeBottom})`
        : safeBottom;

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
            <CssBaseline />

            {showRail && (
                <NavRail
                    mobile={isMobile}
                    topOffset={APP_BAR_HEIGHT}
                    items={navItems}
                    currentPath={currentPath}
                    open={railOpen}
                    onToggleOpen={() => setRailOpen((v) => !v)}
                    onClose={() => setRailOpen(false)}
                    onNavigate={handleNavigate}
                    widths={{
                        collapsed: isMobile ? MOBILE_RAIL_PEEK : DESKTOP_RAIL_COLLAPSED,
                        open: DESKTOP_RAIL_OPEN,
                    }}
                />
            )}

            {/* Main layout shell (handles rail + safe areas) */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    pl: leftPadding,
                    pr: safeRight,
                    pt: `calc(${APP_BAR_HEIGHT}px + ${safeTop})`,
                    pb: bottomPadding,
                    boxSizing: "border-box",
                }}
            >
                {/* Centered content container */}
                <Box
                    sx={{
                        mx: "auto",
                        width: "100%",
                        maxWidth: isMobile ? "100%" : `${DESKTOP_CONTENT_MAX_WIDTH}px`,
                    }}
                >
                    <Outlet />
                </Box>
            </Box>

            {showBottom && (
                <BottomMenu
                    items={navItems}
                    currentPath={currentPath}
                    onNavigate={handleNavigate}
                    height={BOTTOM_MENU_HEIGHT}
                />
            )}
        </Box>
    );
}
