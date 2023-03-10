import { useState } from "react";

import Homepage from "./scences/homePage";
import LoginPage from "./scences/loginPage";
import ProfilePage from "./scences/profilePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<Homepage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
