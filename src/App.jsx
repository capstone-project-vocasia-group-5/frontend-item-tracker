import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdateProfileUser from "./pages/UpdateProfileUser";

import ReportPage from "./pages/ReportPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UpdateProfileUser />} />
        <Route path="/" element={<ReportPage />} />
      </Routes>
    </Router>
  );
}

export default App;
