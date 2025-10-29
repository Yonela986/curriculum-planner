// src/components/LandingPage.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurriculumContext } from "../context/CurriculumContext";
import capacitiLogo from "../assets/CapacitiLogo.png";
import capaciticontact from "../assets/capaciticontact.png";
import uvuAfrica from "../assets/uvuAfrica.png";
import "./LandingPage.css";

export default function LandingPage() {
    const { cohorts, addCohort } = useContext(CurriculumContext);
    const navigate = useNavigate();

    const handleAddCurriculum = () => {
        let cohortId;

        if (cohorts.length === 0) {
            //create a new default cohort
            const name = "Default Cohort";
            const newCohort = addCohort(name);
            cohortId = newCohort.id;//get the new cohort id
        }else {
            //use first existing cohort
            cohortId = cohorts[0].id;
        }

        //navigate to the planner page for this cohort
        navigate(`/cohort/${cohortId}`)
    }

  return (
    <div className="landing-container">
      <header>
        <img src={capacitiLogo} alt="Capaciti Logo" />
      </header>

      <main>
        <h1>Welcome to Capaciti Curriculum Planner</h1>
        <p>
          Create and manage curricula for multiple cohorts. Add topics, presentations,
          scrum sessions, and assessments—all linked to your calendar.
        </p>
        <p>
          Use the button below to start planning your curriculum.
        </p>

        <button className="add-curriculum-button" onClick={handleAddCurriculum}>
          Add Curriculum
        </button>
      </main>
  <footer>
 {/* Footer Logos */}
      <img src={uvuAfrica} alt="UVU Africa" className="footer-left" />
      <img src={capaciticontact} alt="Capaciti Contact" className="footer-right" />
  </footer>
     
    </div>
  );
}


