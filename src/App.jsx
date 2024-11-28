import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePageDefault from "./pages/HomePageDefault";
import React from "react";
import DonationForm from "./pages/DonatePage";
// CLIENT Pages
import LostPage from "./pages/LostPage";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import FoundPage from "./pages/FoundPage";
import UpdateProfileUser from "./pages/UpdateProfileUser";
import ReportPage from "./pages/ReportPage";
import ProfileBase from "./pages/ProfileBase";
import SyaratKetentuan from "./pages/SyaratKetentuan";
import KebijakanPrivasi from "./pages/KebijakanPrivasi";
// ADMIN Pages
import ManageAkunList from "./pages/ManageAkunList";
import Notifikasi from "./pages/Notifikasi";
import ManageCategory from "./pages/ManageCategory";
import VerifikasiLaporan from "./pages/VerifikasiLaporan";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePageDefault />} />
        {/* CLIENT Routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/found" element={<FoundPage />} />
        <Route path="/lost" element={<LostPage />} />
        <Route path="/update-profile" element={<UpdateProfileUser />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/donasi" element={<DonationForm />} />
        <Route path="/sidebar" element={<ProfileBase />} />
        <Route path="/syarat-ketentuan" element={<SyaratKetentuan />} />
        <Route path="/kebijakan-privasi" element={<KebijakanPrivasi />} />
        <Route path="/notifikasi" element={<Notifikasi />} />

        {/* ADMIN Routes */}
        <Route path="/manage-akun-list" element={<ManageAkunList />} />
        <Route path="/manage-category" element={<ManageCategory />} />
        <Route path="/verif-laporan" element={<VerifikasiLaporan />} />
      </Routes>
    </Router>
  );
}

export default App;