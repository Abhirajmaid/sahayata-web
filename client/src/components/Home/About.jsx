"use client";
import { Icon } from "@iconify/react";
import React from "react";

const About = () => {
  return (
    <div className="flex items-center gap-5 border-b border-brand-gray pb-[120px]">
      <div className="w-1/2">
        <h1 className="text-heading font-montserrat font-light text-7xl leading-[85px] tracking-wide">
          Empowering Communities, Changing Lives
        </h1>
      </div>
      <div className="w-1/2 flex flex-col gap-11">
        <p className="text-body text-lg">
          Sahayata is dedicated to uplifting underprivileged communities through
          food drives, education support, and healthcare initiatives. Our
          mission is to create sustainable impact by fostering compassion,
          collaboration, and service. Join us in making a difference—one meal,
          one child, one life at a time.
        </p>
        <button className="btn-primary max-w-max hover:scale-110">
          Join As Member{" "}
          <Icon icon="tabler:arrow-right" width="24" height="24" />
        </button>
      </div>
    </div>
  );
};

export default About;
