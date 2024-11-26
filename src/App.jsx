import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< Updated upstream
import UpdateProfileUser from "./pages/UpdateProfileUser";
=======
import ReportPage from "./pages/ReportPage";
>>>>>>> Stashed changes

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< Updated upstream
        <Route path="/" element={<UpdateProfileUser />} />
=======
        <Route path="/" element={<ReportPage />} />
>>>>>>> Stashed changes
      </Routes>
    </Router>
  );
}

export default App;
