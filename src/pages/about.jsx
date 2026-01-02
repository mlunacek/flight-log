
import { Box, Typography } from "@mui/material";

export function AboutPage() {

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
                    About
                </Typography>
            </Box>
        </Box>
    );
}


export default AboutPage;