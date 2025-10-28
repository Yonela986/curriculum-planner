// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CurriculumProvider } from "./context/CurriculumContext";
import CohortDashboard from "./components/CohortDashboard";
import CurriculumPlanner from "./components/CurriculumPlanner";

function App() {
  return (
    <CurriculumProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CohortDashboard />} />
          <Route path="/planner/:cohortId" element={<CurriculumPlanner />} />
          <Route
            path="*"
            element={
              <div style={{ padding: "2rem" }}>
                <h2>404 - Page Not Found</h2>
              </div>
            }
          />
        </Routes>
      </Router>
    </CurriculumProvider>
  );
}

export default App;
