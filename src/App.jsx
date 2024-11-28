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

export default App;