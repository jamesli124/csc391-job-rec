import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";

const roles = [
  {
    name: "Entry-Level Python Engineer",
    requiredSkills: ["Python course work", "Software Engineering course work"],
    desiredSkills: ["Agile course"],
    qualifications: ["Bachelor in CS"],
  },
  {
    name: "Python Engineer",
    requiredSkills: ["3 years Python development", "1 year data development", "Experience in Agile projects", "Used Git"],
    desiredSkills: [],
    qualifications: ["Bachelor in CS"],
  },
  {
    name: "Project Manager",
    requiredSkills: ["3 years managing software projects", "2 years in Agile projects"],
    desiredSkills: [],
    qualifications: ["PMI Lean Project Management Certification"],
  },
  {
    name: "Senior Knowledge Engineer",
    requiredSkills: ["3 years using Python to develop Expert Systems", "2 years data architecture and development"],
    desiredSkills: [],
    qualifications: ["Masters in CS"],
  },
];

function App() {
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState([]);
  const [result, setResult] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "education") {
      setEducation(value);
    } else if (name === "experience") {
      setExperience(value);
    } else if (name === "skills") {
      setSkills(value.split(","));
    }
  };

  const handleSubmit = () => {
    const matchingRoles = roles.filter((role) => {
      // Check if the user meets the required qualifications and skills
      const hasRequiredSkills = role.requiredSkills.every((skill) =>
        skills.includes(skill)
      );
      const hasExperience = role.requiredSkills.every((exp) =>
        experience.includes(exp)
      );
      const hasEducation = role.qualifications.includes(education);

      return hasRequiredSkills && hasExperience && hasEducation;
    });

    setResult(matchingRoles);
  };
  return (
    <div>
      <h1>Job Recommender</h1>
      <div>
        <label>
          Education and Qualifications
          <input type="checked" name="bscs" onInput={handleChange}>BS in Computer Science</input>
        </label>
      </div>
      
      <button onClick={handleSubmit}>Check Qualifications</button>
      <div>
        <h2>Recommended Roles:</h2>
        <ul>
          {result.length === 0 ? (
            <li>No matching roles found</li>
          ) : (
            result.map((role) => <li key={role.name}>{role.name}</li>)
          )}
        </ul>
      </div>
    </div>
  )

  /* return (
    <div>
      <h1>Role Qualification Checker</h1>

      <div>
        <label>
          Education (e.g., Bachelor in CS):
          <input
            type="text"
            name="education"
            value={education}
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label>
          Experience (comma-separated):
          <input
            type="text"
            name="experience"
            value={experience}
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label>
          Skills (comma-separated):
          <input
            type="text"
            name="skills"
            value={skills}
            onChange={handleChange}
          />
        </label>
      </div>

      <button onClick={handleSubmit}>Check Qualifications</button>

      <div>
        <h2>Recommended Roles:</h2>
        <ul>
          {result.length === 0 ? (
            <li>No matching roles found</li>
          ) : (
            result.map((role) => <li key={role.name}>{role.name}</li>)
          )}
        </ul>
      </div>
    </div>
  ); */
};

export default App;
