import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { CurriculumContext } from "../context/CurriculumContext";
import { exportCurriculumPDF } from "../utils/exportPDF";

export default function CurriculumPlanner() {
  const { cohortId } = useParams();
  const { cohorts, addActivity } = useContext(CurriculumContext);

  const cohort = cohorts.find((c) => c.id === cohortId);
  const [activity, setActivity] = useState({
    title: "",
    type: "Topic",
    date: "",
    duration: "",
    mode: "Online",
  });

  if (!cohort) return <p>No cohort found</p>;

  return (
    <div style={{ padding: "2rem" }}>
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

      <input
        type="date"
        value={activity.date}
        onChange={(e) => setActivity({ ...activity, date: e.target.value })}
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

      <button onClick={() => addActivity(cohortId, activity)}>Add Activity</button>
      <button onClick={() => exportCurriculumPDF(cohort.curriculum)}>Download PDF</button>

      <ul>
        {cohort.curriculum.activities.map((a) => (
          <li key={a.id}>
            [{a.type}] {a.title} - {a.date} ({a.duration}h, {a.mode})
          </li>
        ))}
      </ul>
    </div>
  );
}
