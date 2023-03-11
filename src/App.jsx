import { useState } from "react";

import Homepage from "./scences/homePage";
import LoginPage from "./scences/loginPage";
import ProfilePage from "./scences/profilePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import { useMemo } from "react";
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = createTheme(themeSettings(mode), [mode]);

  console.log(mode);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/home" element={<Homepage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<ProfilePage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
