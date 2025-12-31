
import { Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";

import {
  GoogleOAuthProvider
} from "@react-oauth/google";

import MobileLayout from "@/app/mobile-layout";
import HomePage from "./pages/home";
import FlightsPage from "./pages/flights";
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
              <Route element={<MobileLayout />}>
                <Route path={`${import.meta.env.BASE_URL}`} element={<HomePage />} />
                <Route path={`${import.meta.env.BASE_URL}flights`} element={<FlightsPage />} />
                <Route path={`${import.meta.env.BASE_URL}about`} element={<AboutPage />} />
              </Route>
            </Routes>

          </ThemeProvider>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </Box>
  );
}

export default App;
