import React, { useContext, useState } from "react";
import { CurriculumContext } from "../context/CurriculumContext";
import { Link } from "react-router-dom";

export default function CohortDashboard() {
  const { cohorts, addCohort } = useContext(CurriculumContext);
  const [name, setName] = useState("");

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Cohort Dashboard</h1>

      <input
        placeholder="Enter cohort name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => { addCohort(name); setName(""); }}>Add Cohort</button>

      <ul>
        {cohorts.map((c) => (
          <li key={c.id}>
            <strong>{c.name}</strong> - {c.curriculum.title}
            <Link to={`/planner/${c.id}`} style={{ marginLeft: "10px" }}>
              Open Planner
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
