import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ui/scroll-top";
import React from "react";
import DonationForm from "./pages/donate-page";
import SendOTP from "./pages/send-otp";
import Donatur from "./pages/list-donatur";
// CLIENT Pages
import HomePage from "./pages/homepage-user";
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
import TentangKami from "./pages/tentang-kami";
import KontakKami from "./pages/kontak-kami";
import HomePageAdmin from "./pages/homepage-admin";
import { AuthProvider } from "./context/auth-context";
import ProtectedRoute from "./config/protected-route";
import NotFound from "./pages/not-found";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<TentangKami />} />
          <Route path="/contact" element={<KontakKami />} />
          {/* CLIENT Routes */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/found"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <FoundPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lost"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <LostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-profile"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UpdateProfileUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <ReportPage />
              </ProtectedRoute>
            }
          />
          <Route path="/donation" element={<DonationForm />} />
          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <ProfileBase />
              </ProtectedRoute>
            }
          />
          <Route path="/terms" element={<SyaratKetentuan />} />
          <Route path="/privacy" element={<KebijakanPrivasi />} />
          <Route
            path="/notification"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Notifikasi />
              </ProtectedRoute>
            }
          />
          <Route
            path="/item/detail/:id"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <DetailItem />
              </ProtectedRoute>
            }
          />
          <Route path="/send-otp" element={<SendOTP />} />
          <Route path="/verifikasi-otp" element={<VerifikasiOTP />} />
          <Route
            path="/proof-of-submission/:id"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <BuktiPengajuan />
              </ProtectedRoute>
            }
          />
          <Route path="/donatur" element={<Donatur />} />
          <Route path="/thanks" element={<ThankYou />} />
          {/* ADMIN Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <HomePageAdmin />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/login" element={<LoginAdmin />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
