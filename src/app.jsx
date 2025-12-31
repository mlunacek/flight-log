
import { Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";

import {
  GoogleOAuthProvider
} from "@react-oauth/google";

import HomePage from "./pages/home";
import AboutPage from "./pages/about";

import {
  QueryClientProvider,
  QueryClient
} from "@tanstack/react-query";

import { createTheme, ThemeProvider } from "@mui/material/styles";


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});


const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#90caf9",
    },
  },
});

function App() {
  return (
    <Box>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId="81756018318-c57ta8slrcfd4tiq21362fajfv6rvag8.apps.googleusercontent.com">
          <CssBaseline />
          <ThemeProvider theme={theme}>

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>

          </ThemeProvider>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </Box>
  );
}

export default App;
