"use client";
import { Icon } from "@iconify/react";
import React from "react";

const About = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-5 border-b border-brand-gray pb-16 md:pb-[120px] px-2 sm:px-0">
      <div className="w-full md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-heading font-montserrat font-light text-4xl sm:text-5xl md:text-7xl leading-tight md:leading-[85px] tracking-wide text-center md:text-left">
          Empowering Communities, Changing Lives
        </h1>
      </div>
      <div className="w-full md:w-1/2 flex flex-col gap-8 md:gap-11">
        <p className="text-body text-base sm:text-lg text-center md:text-left">
          Sahayata is dedicated to uplifting underprivileged communities through
          food drives, education support, and healthcare initiatives. Our
          mission is to create sustainable impact by fostering compassion,
          collaboration, and service. Join us in making a difference—one meal,
          one child, one life at a time.
        </p>
        <div className="flex justify-center md:justify-start">
          <button className="btn-primary max-w-max hover:scale-110">
            Join As Member{" "}
            <Icon icon="tabler:arrow-right" width="24" height="24" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
