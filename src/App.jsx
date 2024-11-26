import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdateProfileUser from "./pages/UpdateProfileUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UpdateProfileUser />} />
      </Routes>
    </Router>
  );
}

export default App;
