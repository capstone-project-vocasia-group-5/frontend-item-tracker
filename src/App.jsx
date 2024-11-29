import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePageDefault from "./pages/HomePageDefault";
import React from "react";
import DonationForm from "./pages/DonatePage";
import SendOTP from "./pages/SendOTP";
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
import Notifikasi from "./pages/Notifikasi";
import DetailItem from "./pages/DetailItem";
import VerifikasiOTP from "./pages/VerifikasiOTP";
import BuktiPengajuan from "./pages/BuktiPengajuan";
// ADMIN Pages
import LoginAdmin from "./pages/LoginAdmin";
import ManageAkunList from "./pages/ManageAkunList";
import ManageCategory from "./pages/ManageCategory";
import VerifikasiLaporan from "./pages/VerifikasiLaporan";
import ManageLaporanAdmin from "./pages/ManageLaporanforAdmin";

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
        <Route path="/detail-item" element={<DetailItem />} />
        <Route path="/send-otp" element={<SendOTP />} />
        <Route path="/verifikasi-otp" element={<VerifikasiOTP />} />
        <Route path="/bukti-pengajuan" element={<BuktiPengajuan />} />

        {/* ADMIN Routes */}
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/manage-akun-list" element={<ManageAkunList />} />
        <Route path="/manage-category" element={<ManageCategory />} />
        <Route path="/manage-verif-laporan" element={<VerifikasiLaporan />} />
        <Route path="/manage-laporan-admin" element={<ManageLaporanAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
