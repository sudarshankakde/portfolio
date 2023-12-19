import React from "react";
import AboutMeCard from "../AboutMeCard";
import Background from "../Background";

function About() {
  return (
    <div className="mb-24 text-center">
      <Background />
      <AboutMeCard
        title="Aboute Me"
        titleClasses="md:text-6xl text-5xl font-Kalnia"
      />
    </div>
  );
}

export default About;
