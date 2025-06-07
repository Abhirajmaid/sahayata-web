import React from "react";
import { Icon } from "@iconify/react";
import { impact } from "@/src/data/aboutData";

const ImpactSection = () => (
  <section className="py-20 bg-brand-secondary/20">
    <div className="max-w-[70%] mx-auto px-6">
      <h2 className="text-heading mb-6">Our Impact</h2>
      <p className="text-body max-w-2xl mb-16">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {impact.map((item) => (
          <div key={item.title} className="card text-center">
            <div className="w-20 h-20 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon icon={item.icon} width={40} className="text-white" />
            </div>
            <h3 className="text-sub mb-4">{item.title}</h3>
            <p className="text-body">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactSection;
