// MobileNavRail.js
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

export default function MobileNavRail({
    topOffset = 0,
    items,
    currentPath,
    open, // open == temporary drawer open
    onToggleOpen,
    onClose,
    onNavigate,
    widths = { collapsed: 56, open: 240 },
}) {
    const collapsedWidth = widths.collapsed;
    const expandedWidth = widths.open;

    // iOS safe-area insets (0 on browsers/devices without notches)
    const safeTop = "env(safe-area-inset-top, 0px)";
    const safeLeft = "env(safe-area-inset-left, 0px)";

    return (
        <>
            {/* Peek rail (fixed overlay; no layout shift)
               Background extends into the safe-area, but content is padded out of it. */}
            <Box
                sx={{
                    position: "fixed",
                    left: 0,
                    top: `calc(${topOffset}px + ${safeTop})`,

                    // extend the rail background into the notch gutter
                    width: `calc(${collapsedWidth}px + ${safeLeft})`,
                    height: `calc(100vh - ${topOffset}px - ${safeTop})`,

                    bgcolor: "background.paper",
                    borderRight: 1,
                    borderColor: "divider",
                    zIndex: (t) => t.zIndex.drawer + 1,

                    display: "flex",
                    flexDirection: "column",

                    // push all rail content out of the notch/camera area
                    pl: safeLeft,
                    boxSizing: "border-box",
                }}
            >
                <Box
                    sx={{
                        height: 56,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Tooltip title="Menu" placement="right" arrow>
                        <IconButton onClick={onToggleOpen} size="small">
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>
                </Box>

                <Divider />

                <List sx={{ py: 1 }}>
                    {items.map((item) => {
                        const selected = isSelected(currentPath, item.path);
                        return (
                            <Tooltip key={item.path} title={item.label} placement="right" arrow>
                                <Box border={0}>
                                    <ListItemButton
                                        selected={selected}
                                        onClick={() => onNavigate(item.path)}
                                        sx={{
                                            mx: 1,
                                            my: 0.5,
                                            borderRadius: 2,
                                            justifyContent: "center",
                                            px: 1.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                minHeight: 40,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                    </ListItemButton>
                                </Box>
                            </Tooltip>
                        );
                    })}
                </List>
            </Box>

            {/* Overlay drawer */}
            <Drawer
                variant="temporary"
                open={open}
                onClose={onClose}
                ModalProps={{ keepMounted: true }}
                slotProps={{
                    paper: {
                        sx: {
                            // extend drawer background into safe-left area
                            width: `calc(${expandedWidth}px + ${safeLeft})`,
                            boxSizing: "border-box",

                            // respect top safe-area + any app top offset
                            pt: `calc(${topOffset}px + ${safeTop})`,

                            // keep drawer content out of notch area
                            pl: safeLeft,
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        height: 56,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        px: 1,
                    }}
                >
                    <Tooltip title="Close" placement="right" arrow>
                        <IconButton onClick={onClose} size="small">
                            <ChevronLeftIcon />
                        </IconButton>
                    </Tooltip>
                </Box>

                <Divider />

                <List sx={{ py: 1 }}>
                    {items.map((item) => {
                        const selected = isSelected(currentPath, item.path);
                        return (
                            <Box key={item.path} border={0}>
                                <ListItemButton
                                    selected={selected}
                                    onClick={() => onNavigate(item.path)}
                                    sx={{ mx: 1, my: 0.5, borderRadius: 2 }}
                                >
                                    <ListItemIcon sx={{ minWidth: 40, minHeight: 40 }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </Box>
                        );
                    })}
                </List>
            </Drawer>
        </>
    );
}
