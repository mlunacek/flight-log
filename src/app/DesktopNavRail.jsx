// DesktopNavRail.js
import React from "react";
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

function normalizePath(p) {
    if (!p) return "/";
    if (p.length > 1 && p.endsWith("/")) return p.slice(0, -1);
    return p;
}

function isSelected(currentPath, itemPath) {
    const cur = normalizePath(currentPath);
    const p = normalizePath(itemPath);
    if (p === "/") return cur === "/";
    return cur === p || cur.startsWith(p + "/");
}

export default function DesktopNavRail({
    topOffset = 0,
    items,
    currentPath,
    open, // open == expanded/collapsed
    onToggleOpen,
    onNavigate,
    widths = { collapsed: 64, open: 240 },
}) {
    const collapsedWidth = widths.collapsed;
    const expandedWidth = widths.open;
    const drawerWidth = open ? expandedWidth : collapsedWidth;

    function navigateTo(item) {
        onNavigate(item.path)
    }



    return (
        <Drawer
            variant="permanent"
            open
            slotProps={{
                paper: {
                    sx: {
                        width: drawerWidth,
                        overflowX: "hidden",
                        whiteSpace: "nowrap",
                        borderRight: 1,
                        borderColor: "divider",
                        boxSizing: "border-box",
                        transition: (theme) =>
                            theme.transitions.create("width", {
                                duration: theme.transitions.duration.shortest,
                            }),
                        pt: `${topOffset}px`,
                    },
                },
            }}
        >
            <Box
                sx={{
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: open ? "flex-end" : "center",
                    px: open ? 1 : 0,
                }}
            >
                <Tooltip title={open ? "Collapse" : "Expand"} placement="right" arrow>
                    <IconButton onClick={onToggleOpen} size="small">
                        {open ? <ChevronLeftIcon /> : <MenuIcon />}
                    </IconButton>
                </Tooltip>
            </Box>

            <Divider />

            <List sx={{ py: 1 }}>
                {items.map((item) => {
                    const selected = isSelected(currentPath, item.path);

                    const button = (
                        <ListItemButton
                            selected={selected}
                            onClick={() => navigateTo(item)}
                            sx={{
                                mx: 1,
                                my: 0.5,
                                borderRadius: 2,
                                justifyContent: open ? "initial" : "center",
                                px: open ? 2 : 1.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 2 : 0,
                                    justifyContent: "center",
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>

                            <ListItemText
                                primary={item.label}
                                sx={{
                                    opacity: open ? 1 : 0,
                                    transition: (theme) =>
                                        theme.transitions.create("opacity", {
                                            duration: theme.transitions.duration.shortest,
                                        }),
                                }}
                            />
                        </ListItemButton>
                    );

                    return open ? (
                        <Box key={item.path}>{button}</Box>
                    ) : (
                        <Tooltip key={item.path} title={item.label} placement="right" arrow>
                            <Box>{button}</Box>
                        </Tooltip>
                    );
                })}
            </List>
        </Drawer>
    );
}
