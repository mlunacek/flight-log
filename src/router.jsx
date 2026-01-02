
import { Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";

import {
  GoogleOAuthProvider
} from "@react-oauth/google";

import ResponsiveLayout from "./app/responsiev-layout";
import AuthGuard from "./app/AuthGuard";

import FlightsPage from "./pages/flights";
import AboutPage from "./pages/about";
import SettingsPage from "./pages/settings";
import SummaryPage from "./pages/summary";

import HomeIcon from "@mui/icons-material/Home";
import FlightIcon from "@mui/icons-material/Flight";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";

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


const navItems = [
  { label: "Summary", path: "/", icon: <HomeIcon /> },
  { label: "Flights", path: "/flights", icon: <FlightIcon /> },
  { label: "About", path: "/about", icon: <InfoIcon /> },
  { label: "Settings", path: "/settings", icon: <SettingsIcon /> },
];


function App() {
  return (
    <Box>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId="81756018318-c57ta8slrcfd4tiq21362fajfv6rvag8.apps.googleusercontent.com">
          <CssBaseline />
          <ThemeProvider theme={theme}>

            <Routes>

              <Route element={<AuthGuard />}>
                <Route element={<ResponsiveLayout navItems={navItems} />}>
                  <Route path="/" element={<SummaryPage />} />
                  <Route path="/flights" element={<FlightsPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/settings" element={<SettingsPage />} />

                </Route>
              </Route>
            </Routes>

          </ThemeProvider>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </Box >
  );
}

export default App;
