import {
    Box,
    Button,
    Typography,
    Alert,
    Paper,
} from "@mui/material";

import GoogleIcon from '@mui/icons-material/Google';

import { useGoogleAuth } from "./use-google-auth";

export default function LoginScreen() {

    const { login } = useGoogleAuth();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.default",
                px: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    p: 3,
                    textAlign: "center",
                    borderRadius: 3,
                }}
            >
                <Typography variant="h5" fontWeight={600} gutterBottom>
                    Welcome
                </Typography>

                {/* <Typography variant="body2" color="text.secondary" mb={3}>
                    Sign in to continue
                </Typography> */}

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<GoogleIcon />}
                    onClick={login}
                    sx={{ textTransform: "none", py: 1.2 }}
                >
                    Sign in with Google
                </Button>

                {/* {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )} */}
            </Paper>
        </Box>
    );

}
