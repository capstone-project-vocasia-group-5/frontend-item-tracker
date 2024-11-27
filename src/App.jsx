import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// CLIENT Pages
import HomePageDefault from "./pages/HomePageDefault";
import LostPage from "./pages/LostPage";
import FoundPage from "./pages/FoundPage";
import UpdateProfileUser from "./pages/UpdateProfileUser";
import ReportPage from "./pages/ReportPage";
// ADMIN Pages

function App() {
  return (
    <Router>
      <Routes>
        {/* CLIENT Routes */}
        <Route path="/" element={<HomePageDefault />} />
        <Route path="/found" element={<FoundPage />} />
        <Route path="/lost" element={<LostPage />} />
        <Route path="/updateprofile" element={<UpdateProfileUser />} />
        <Route path="/report" element={<ReportPage />} />

        {/* ADMIN Routes */}
      </Routes>
    </Router>
  );
}

export default App;
