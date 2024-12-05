import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ui/scroll-top";
import React from "react";
import HomePageDefault from "./pages/home-page-default";
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

import { AuthProvider } from "./context/auth-context";
import ProtectedRoute from "./config/protected-route";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePageDefault />} />
          <Route
            path="/after"
            element={
              <ProtectedRoute>
                <HomepageAfterLogin />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<TentangKami />} />
          <Route path="/contact" element={<KontakKami />} />
          {/* CLIENT Routes */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/found"
            element={
              <ProtectedRoute>
                <FoundPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lost"
            element={
              <ProtectedRoute>
                <LostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-profile"
            element={
              <ProtectedRoute>
                <UpdateProfileUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <ReportPage />
              </ProtectedRoute>
            }
          />
          <Route path="/donation" element={<DonationForm />} />
          <Route path="/sidebar" element={<ProfileBase />} />
          <Route path="/terms" element={<SyaratKetentuan />} />
          <Route path="/privacy" element={<KebijakanPrivasi />} />
          <Route
            path="/notification"
            element={
              <ProtectedRoute>
                <Notifikasi />
              </ProtectedRoute>
            }
          />
          <Route
            path="/detail-item"
            element={
              <ProtectedRoute>
                <DetailItem />
              </ProtectedRoute>
            }
          />
          <Route path="/send-otp" element={<SendOTP />} />
          <Route path="/verifikasi-otp" element={<VerifikasiOTP />} />
          <Route
            path="/proof-of-submission"
            element={
              <ProtectedRoute>
                <BuktiPengajuan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/management-report"
            element={
              <ProtectedRoute>
                <ManageLaporanUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/management-submission"
            element={
              <ProtectedRoute>
                <ManagePengajuan />
              </ProtectedRoute>
            }
          />
          <Route path="/donatur" element={<Donatur />} />
          <Route path="/thanks" element={<ThankYou />} />
          {/* ADMIN Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <HomePageAdmin />
              </ProtectedRoute>
            }
          />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route
            path="/admin/management-account"
            element={
              <ProtectedRoute>
                <ManageAkunList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/management-category"
            element={
              <ProtectedRoute>
                <ManageCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/management-verification"
            element={
              <ProtectedRoute>
                <VerifikasiLaporan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/management-report"
            element={<ManageLaporanAdmin />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
