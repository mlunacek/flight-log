

import {
    Paper,
    Box,
    Alert,
    Typography,
    Stack
} from '@mui/material';


export default function VersionUpdated({ lastUpdated, showLowHoursWarning }) {



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
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={1}
                // sx={{ mb: 1 }}
                >
                    <Typography variant="subtitle2" fontWeight={300}>
                        v{__APP_VERSION__}
                    </Typography>

                    <Typography
                        variant="subtitle2"
                        fontWeight={300}
                        color="text.secondary"
                        sx={{ whiteSpace: "nowrap" }}
                    >
                        {lastUpdated}
                    </Typography>
                </Stack>

                {showLowHoursWarning && (
                    <Box sx={{ p: 2 }}>
                        <Alert severity="warning" sx={{ maxWidth: "100%" }}>
                            <Typography variant="subtitle2">
                                <strong>Warning:</strong> Your currency is very low.
                            </Typography>
                        </Alert>
                    </Box>
                )}


            </Box>

        </Paper>
    )
}