

import {
    Paper,
    Box,
    Typography,
    Alert
} from '@mui/material';


export default function ShowCurrencyWarning({ }) {



    return (
        <Paper
            elevation={2}
            sx={{
                mt: 2,
                mb: 2,
                borderRadius: 3,
                overflow: "hidden",
            }}
        >
            <Box sx={{ p: 2 }}>
                <Alert severity="warning" sx={{ maxWidth: "100%" }}>
                    <Typography variant="subtitle2">
                        <strong>Warning:</strong> Your currency is very low.
                    </Typography>
                </Alert>
            </Box>

        </Paper>
    )
}