import { teamImages } from "@/src/data/aboutData";
import Image from "next/image";
import React from "react";

const HeroSection = () => (
  <section className="bg-gradient-to-t from-brand-secondary to-brand-primary py-20 mt-[50px] relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
      {/* Decorative elements */}
      <div className="absolute top-10 right-20 w-4 h-4 bg-black transform rotate-45"></div>
      <div className="absolute top-20 right-32 w-3 h-3 bg-gray-600 rounded-full"></div>
      <div className="absolute top-16 right-10 w-2 h-2 bg-gray-700 rounded-full"></div>
      <div className="absolute top-32 right-24 w-2 h-2 bg-gray-800 rounded-full"></div>
      <h1 className="text-hero text-7xl text-white mb-6">About us</h1>
      <p className="text-body text-white/90 max-w-2xl mx-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
        luctus nec ullamcorper mattis, pulvinar dapibus leo.
      </p>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamImages.map((src, i) => (
          <div
            key={i}
            className="card p-4 hover:scale-105 transition-all duration-300"
          >
            <Image
              src={src}
              alt={`Team member ${i + 1}`}
              width={280}
              height={200}
              className="w-full h-48 object-cover rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HeroSection;
