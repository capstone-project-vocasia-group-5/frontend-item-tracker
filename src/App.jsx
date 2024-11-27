import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< Updated upstream
import UpdateProfileUser from "./pages/UpdateProfileUser";

import ReportPage from "./pages/ReportPage";

=======
import HomePageDefault from "./pages/HomePageDefault";
import LostPage from "./pages/LostPage";
import FoundPage from "./pages/FoundPage";
>>>>>>> Stashed changes

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< Updated upstream
        <Route path="/" element={<UpdateProfileUser />} />
        <Route path="/" element={<ReportPage />} />
=======
        <Route path="/" element={<HomePageDefault />} />
        <Route path="/lost" element={<LostPage />} />
        <Route path="/found" element={<FoundPage />} />
>>>>>>> Stashed changes
      </Routes>
    </Router>
  );
}

export default App;
