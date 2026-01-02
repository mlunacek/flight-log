// BottomMenu.js
import React from "react";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";

function normalizePath(p) {
    if (!p) return "/";
    if (p.length > 1 && p.endsWith("/")) return p.slice(0, -1);
    return p;
}

function getActiveValue(currentPath, items) {
    const cur = normalizePath(currentPath);

    for (const item of items) {
        if (normalizePath(item.path) === cur) return item.path;
    }
    for (const item of items) {
        const p = normalizePath(item.path);
        if (p !== "/" && (cur === p || cur.startsWith(p + "/"))) return item.path;
    }
    return items[0]?.path || "/";
}

export default function BottomMenu({ items, currentPath, onNavigate, height = 56 }) {
    const value = getActiveValue(currentPath, items);

    // iOS Safari safe-area inset (0 on non-notch devices/browsers)
    const safeAreaBottom = "env(safe-area-inset-bottom, 0px)";

    return (
        <Box
            sx={{
                position: "fixed",
                left: 0,
                right: 0,
                bottom: 0,
                // total visible container includes the safe area
                height: `calc(${height}px + ${safeAreaBottom})`,
                pb: safeAreaBottom, // push the nav up out of the curve/home indicator
                borderTop: 1,
                borderColor: "divider",
                bgcolor: "background.paper",
                zIndex: (t) => t.zIndex.appBar,
            }}
        >
            <BottomNavigation
                value={value}
                onChange={(_, newValue) => onNavigate(newValue)}
                showLabels
                sx={{ height }}
            >
                {items.map((item) => (
                    <BottomNavigationAction
                        key={item.path}
                        value={item.path}
                        label={item.label}
                        icon={item.icon}
                    />
                ))}
            </BottomNavigation>
        </Box>
    );
}
