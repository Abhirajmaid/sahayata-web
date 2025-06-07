import React from "react";
import { mission } from "@/src/data/aboutData";

const MissionSection = () => (
  <section className="py-20 border-b border-gray">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-heading mb-16">Our Mission</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {mission.map((text, idx) => (
          <p className="text-body" key={idx}>
            {text}
          </p>
        ))}
      </div>
    </div>
  </section>
);

export default MissionSection;
