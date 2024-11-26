import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePageDefault from "./pages/HomePageDefault";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePageDefault />} />
      </Routes>
    </Router>
  );
}

export default App;
