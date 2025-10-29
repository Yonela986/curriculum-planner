import React, { createContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export const CurriculumContext = createContext();


export const CurriculumProvider = ({ children }) => {
  const [cohorts, setCohorts] = useState([]); //get cohort ID from URL
 

  useEffect(() => {
    const saved = localStorage.getItem("cohorts");
    if (saved) setCohorts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('cohorts', JSON.stringify(cohorts));
  }, [cohorts]);

  const addCohort = (name) => {
    const newCohort = {
      id: uuid(),
      name,
      curriculum: { id: uuid(), title: `${name} Curriculum`, activities: [] },
    };
    setCohorts([...cohorts, newCohort]);
    return newCohort;
  };

  const addActivity = (cohortId, activity) => {
    setCohorts((prev) =>
      prev.map((cohort) =>
        cohort.id === cohortId
          ? {
              ...cohort,
              curriculum: {
                ...cohort.curriculum,
                activities: [...cohort.curriculum.activities, { ...activity, id: uuid() }],
              },
            }
          : cohort
      )
    );
  };

  return (
    <CurriculumContext.Provider value={{ cohorts, addCohort, addActivity }}>
      {children}
    </CurriculumContext.Provider>
  );
};
/* ✅ This manages:

Multiple cohorts

Each cohort’s activities (topics, scrums, etc.)*/