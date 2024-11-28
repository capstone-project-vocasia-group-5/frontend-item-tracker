import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePageDefault from "./pages/HomePageDefault";
import React from "react";
import DonationForm from "./pages/DonatePage";
// CLIENT Pages
import LostPage from "./pages/LostPage";
import FoundPage from "./pages/FoundPage";
import UpdateProfileUser from "./pages/UpdateProfileUser";
import ReportPage from "./pages/ReportPage";
import ManageCategory from "./pages/ManageCategory";
// ADMIN Pages

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePageDefault />} />
        <Route path="/Manage-category" element={<ManageCategory />} />
        {/* CLIENT Routes */}
        <Route path="/found" element={<FoundPage />} />
        <Route path="/lost" element={<LostPage />} />
        <Route path="/update-profile" element={<UpdateProfileUser />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/donasi" element={<DonationForm />} />

        {/* ADMIN Routes */}
      </Routes>
    </Router>
  );
}

export default App;
