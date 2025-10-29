import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CurriculumPlanner from "./components/CurriculumPlanner";
import LandingPage from "./components/LandingPage";
import { CurriculumProvider } from './context/CurriculumContext'

import "./components/LandingPage.css"

function App() {
  return (
      <CurriculumProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cohort/:cohortId" element={<CurriculumPlanner />} />
        </Routes>
      </Router>
    </CurriculumProvider>
  );
}

export default App;
