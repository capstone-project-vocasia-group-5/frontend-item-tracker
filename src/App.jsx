<<<<<<< Updated upstream
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
import ProfileBase from "./pages/ProfileBase";
import SyaratKetentuan from "./pages/SyaratKetentuan";
import KebijakanPrivasi from "./pages/KebijakanPrivasi";
// ADMIN Pages
import ManageAkunList from "./pages/ManageAkunList";
import ManageCategory from "./pages/ManageCategory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePageDefault />} />
        {/* CLIENT Routes */}
        <Route path="/found" element={<FoundPage />} />
        <Route path="/lost" element={<LostPage />} />
        <Route path="/update-profile" element={<UpdateProfileUser />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/donasi" element={<DonationForm />} />
        <Route path="/sidebar" element={<ProfileBase />} />
        <Route path="/syarat-ketentuan" element={<SyaratKetentuan />} />
        <Route path="/kebijakan-privasi" element={<KebijakanPrivasi />} />

        {/* ADMIN Routes */}
        <Route path="/manage-akun-list" element={<ManageAkunList />} />
      </Routes>
    </Router>
=======
import React from "react";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-200">
      <LoginForm />
    </div>
>>>>>>> Stashed changes
  );
}

export default App;
