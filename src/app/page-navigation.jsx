import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const PageNavigation = ({ title }) => (
    <AppBar position="static" color="">
        <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                {title}
            </Typography>

            <Box>
                <Button
                    color="inherit"
                    component={RouterLink}
                    to="/"
                >
                    Home
                </Button>
                <Button
                    color="inherit"
                    component={RouterLink}
                    to="/about"
                >
                    About
                </Button>
            </Box>
        </Toolbar>
    </AppBar>
);

export default PageNavigation;