import "./App.cs";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomepageDefault from "./pages/HomePageDefault"
import ManageCategory from "./pages/ManageCategory";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePageDefault from './pages/HomePageDefault';
import DonationForm from "./pages/DonatePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomepageDefault/>} />
        <Route path="/ManageCategory" element={<ManageCategory />} />
      </Routes>
      <div>
        <Routes>
          <Route path="/" element={<HomePageDefault />} />
          <Route path="/donasi" element={<DonationForm />} />
        </Routes>
      </div>
    </Router>
  )
}