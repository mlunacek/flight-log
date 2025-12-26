import { Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";

import HomePage from "./pages/home";
import AboutPage from "./pages/about";

function App() {
  return (
    <Box>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Box>
  );
}

export default App;
