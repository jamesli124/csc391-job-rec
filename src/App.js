import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Checkbox } from "./components/ui/checkbox";


const jobs = [
  {
    title: "Entry-Level Python Engineer",
    required: { degrees: ["Bachelor in CS"], skills: ["Python course work", "Software Engineering course work"] },
    desired: { skills: ["Agile course"] },
  },
  {
    title: "Python Engineer",
    required: {
      degrees: ["Bachelor in CS"],
      experience: { Python: 3, "Data Development": 1},
      skills: ["Git", "Agile project experience"],
    },
    desired: {},
  },
  {
    title: "Project Manager",
    required: {
      experience: { "Managing Software Projects": 3, "Agile projects": 2 },
      certifications: ["PMI Lean Project Management Certification"],
      skills: ["Agile project experience"],
    },
    desired: {},
  },
  {
    title: "Senior Knowledge Engineer",
    required: {
      degrees: ["Masters in CS"],
      experience: { "Python Expert Systems": 3, "Data Architecture": 2 },
    },
    desired: {},
  },
];

export default function JobRecommendation() {
  const [formData, setFormData] = useState({
    degrees: [],
    certifications: [],
    skills: [],
    experience: {},
  });
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [skillFeedback, setSkillFeedback] = useState([]);

  const handleCheckboxChange = (category, value) => {
    setFormData((prev) => {
      const newArray = prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value];
      return { ...prev, [category]: newArray };
    });
  };

  const handleExperienceChange = (skill, years) => {
    setFormData((prev) => ({
      ...prev,
      experience: { ...prev.experience, [skill]: parseInt(years) || 0 },
    }));
  };

  const recommendJobs = () => {
    const matches = jobs.filter((job) => {
      const { required } = job;
      return (
        (!required.degrees ||
          required.degrees.every((deg) => formData.degrees.includes(deg))) &&
        (!required.experience ||
          Object.entries(required.experience).every(
            ([skill, years]) => formData.experience[skill] >= years
          )) &&
        (!required.skills ||
          required.skills.every((skill) => formData.skills.includes(skill)))
      );
    });
    setRecommendedJobs(matches);

    const feedback = matches.flatMap((job) =>
      job.desired.skills?.map((skill) =>
        formData.skills.includes(skill)
          ? `${skill} is valued for the ${job.title} position.`
          : `${skill} might be useful for the ${job.title} position in the future.`
      ) || []
    );
    setSkillFeedback(feedback);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <header className="w-full bg-blue-600 text-white py-4 text-center text-2xl font-bold">
        Job Recommendation System
      </header>
      <main className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Job Recommendation Form</h1>
        <div>
          <h2 className="font-semibold">Degrees</h2>
          {['Bachelor in CS', 'Masters in CS'].map((deg) => (
            <div key={deg}>
              <Checkbox
                checked={formData.degrees.includes(deg)}
                onCheckedChange={() => handleCheckboxChange("degrees", deg)}
              /> {deg}
            </div>
          ))}
        </div>
        <div>
          <h2 className="font-semibold">Certifications</h2>
          {['PMI Lean Project Management Certification'].map((cert) => (
            <div key={cert}>
              <Checkbox
                checked={formData.certifications.includes(cert)}
                onCheckedChange={() => handleCheckboxChange("certifications", cert)}
              /> {cert}
            </div>
          ))}
        </div>
        <div>
          <h2 className="font-semibold">Skills</h2>
          {['Agile course', 'Git', 'Agile project experience',
          'Python course work',
          'Software Engineering course work'].map((skill) => (
            <div key={skill}>
              <Checkbox
                checked={formData.skills.includes(skill)}
                onCheckedChange={() => handleCheckboxChange("skills", skill)}
              /> {skill}
            </div>
          ))}
        </div>
        <div>
          <h2 className="font-semibold">Experience (Years)</h2>
          {['Python', 'Data Development', 'Managing Software Projects', 'Agile projects', 'Python Expert Systems', 'Data Architecture'].map((exp) => (
            <div key={exp}>
              <label>{exp}: </label>
              <Input
                type="number"
                value={formData.experience[exp] || ""}
                onChange={(e) => handleExperienceChange(exp, e.target.value)}
                className="w-16 ml-2"
              />
            </div>
          ))}
        </div>
        <Button className="mt-4" onClick={recommendJobs}>Get Job Recommendations</Button>
        {recommendedJobs.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Recommended Jobs:</h2>
            {recommendedJobs.map((job) => (
              <Card key={job.title} className="mt-2 p-2">
                <CardContent>{job.title}</CardContent>
              </Card>
            ))}
          </div>
        )}
        {skillFeedback.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Skill Feedback:</h2>
            {skillFeedback.map((feedback, index) => (
              <p key={index}>{feedback}</p>
            ))}
          </div>
        )}
      </main>
      <footer className="w-full bg-gray-800 text-white py-4 text-center mt-6">
        &copy; 2025 Job Matcher Inc.
      </footer>
    </div>

  );
}

