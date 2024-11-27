import "./App.cs";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomepageDefault from "./pages/HomePageDefault"
import ManageCategory from "./pages/ManageCategory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomepageDefault/>} />
        <Route path="/ManageCategory" element={<ManageCategory />} />
      </Routes>
    </Router>
  )
}