import { useState } from "react";

import Homepage from "./scences/homePage";
import LoginPage from "./scences/loginPage";
import ProfilePage from "./scences/profilePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import DirectToPage from "./scences/DirectToPage";
import { useMemo } from "react";
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = createTheme(themeSettings(mode), [mode]);

  console.log(mode);
  console.log("dotenv", import.meta.env.VITE_API_URL);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<DirectToPage />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<ProfilePage />} />
            <Route path="/user/:id" element={<ProfilePage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
