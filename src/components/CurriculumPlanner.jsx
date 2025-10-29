import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { CurriculumContext } from "../context/CurriculumContext";
import { exportCurriculumPDF } from "../utils/exportPDF";
import { v4 as uuid } from "uuid";

import capacitiLogo from "../assets/CapacitiLogo.png";
import capaciticontact from "../assets/capaciticontact.png";
import uvuAfrica from "../assets/uvuAfrica.png";

import "../components/CurriculumPlanner.css";

export default function CurriculumPlanner() {
  const { cohortId } = useParams();
  const { cohorts, addActivity } = useContext(CurriculumContext);

  const cohort = cohorts.find((c) => c.id === cohortId);

  const [activity, setActivity] = useState({
    title: "",
    type: "Topic",
    startDate: "",
    endDate: "",
    duration: "",
    mode: "Online",
  });

  if (!cohort) return <p>No cohort found</p>;

  const handleAddActivity = () => {
    if (!activity.title || !activity.startDate || !activity.endDate) {
      alert("Please fill in title, start date, and end date");
      return;
    }

    if (new Date(activity.startDate) > new Date(activity.endDate)) {
      alert("End date must be after start date!");
      return;
    }

    addActivity(cohortId, { ...activity, id: uuid() });

    setActivity({
      title: "",
      type: "Topic",
      startDate: "",
      endDate: "",
      duration: "",
      mode: "Online",
    });
  };

  return (
    <div className="curriculum-container">
      <img src={capacitiLogo} alt="Capaciti Logo" className="header-logo" />

      <h2>{cohort.curriculum.title}</h2>

      <input
        placeholder="Activity title"
        value={activity.title}
        onChange={(e) => setActivity({ ...activity, title: e.target.value })}
      />

      <select
        value={activity.type}
        onChange={(e) => setActivity({ ...activity, type: e.target.value })}
      >
        <option>Topic</option>
        <option>Presentation</option>
        <option>Scrum</option>
        <option>Assessment</option>
      </select>

      <label>Start Date:</label>
      <input
        type="date"
        value={activity.startDate}
        onChange={(e) => setActivity({ ...activity, startDate: e.target.value })}
      />

      <label>End Date:</label>
      <input
        type="date"
        value={activity.endDate}
        onChange={(e) => setActivity({ ...activity, endDate: e.target.value })}
      />

      <input
        placeholder="Duration (hrs)"
        value={activity.duration}
        onChange={(e) => setActivity({ ...activity, duration: e.target.value })}
      />

      <select
        value={activity.mode}
        onChange={(e) => setActivity({ ...activity, mode: e.target.value })}
      >
        <option>Online</option>
        <option>Onsite</option>
      </select>

      <button onClick={handleAddActivity}>Add Activity</button>
      <button onClick={() => exportCurriculumPDF(cohort.curriculum)}>Download PDF</button>

      <ul className="activity-list">
        {cohort.curriculum.activities.map((a) => (
          <li key={a.id}>
            [{a.type}] {a.title} - {a.startDate} to {a.endDate} ({a.duration}h, {a.mode})
          </li>
        ))}
      </ul>

      {/* Footer logos */}
      <img src={uvuAfrica} alt="UVU Africa" className="footer-left" />
      <img src={capaciticontact} alt="Capaciti Contact" className="footer-right" />
    </div>
  );
}
