import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ui/scroll-top";
import HomePageDefault from "./pages/home-page-default";
import React from "react";
import DonationForm from "./pages/donate-page";
import SendOTP from "./pages/send-otp";
import Donatur from "./pages/list-donatur";
// CLIENT Pages
import LostPage from "./pages/lost-page";
import LoginForm from "./pages/login-form";
import RegisterForm from "./pages/register-form";
import FoundPage from "./pages/found-page";
import UpdateProfileUser from "./pages/update-profile-user";
import ReportPage from "./pages/report-page";
import ProfileBase from "./pages/profile-base";
import SyaratKetentuan from "./pages/syarat-ketentuan";
import KebijakanPrivasi from "./pages/kebijakan-privasi";
import Notifikasi from "./pages/notifikasi";
import DetailItem from "./pages/detail-item";
import VerifikasiOTP from "./pages/verifikasi-otp";
import BuktiPengajuan from "./pages/bukti-pengajuan";
import ManageLaporanUser from "./pages/manage-laporan";
import ManagePengajuan from "./pages/manage-pengajuan";
import ThankYou from "./pages/ucapan-terimakasih";
// ADMIN Pages
import LoginAdmin from "./pages/login-admin";
import ManageAkunList from "./pages/manage-akun-list";
import ManageCategory from "./pages/manage-category";
import VerifikasiLaporan from "./pages/verifikasi-laporan";
import ManageLaporanAdmin from "./pages/manage-laporan-for-admin";
import HomepageAfterLogin from "./pages/homepage-after-login";
import TentangKami from "./pages/tentang-kami";
import KontakKami from "./pages/kontak-kami";
import HomePageAdmin from "./pages/homepage-admin";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePageDefault />} />
        <Route path="/after" element={<HomepageAfterLogin />} />
        <Route path="/tentang-kami" element={<TentangKami />} />
        <Route path="/kontak-kami" element={<KontakKami />} />
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
        <Route path="/manage-laporan" element={<ManageLaporanUser />} />
        <Route path="/manage-pengajuan" element={<ManagePengajuan />} />
        <Route path="/list-donator" element={<Donatur />} />
        <Route path="/thanks" element={<ThankYou />} />
        {/* ADMIN Routes */}
        <Route path="/admin" element={<HomePageAdmin />} />
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
