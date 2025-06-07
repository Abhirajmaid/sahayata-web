"use client";
import { Icon } from "@iconify/react";
import React from "react";

const CTA = () => {
  return (
    <div className="w-full py-16 sm:py-20 md:py-[120px] flex flex-col gap-9 items-center bg-brand-secondary px-4 sm:px-8">
      <h2 className="text-heading text-3xl sm:text-5xl md:text-7xl text-white text-center">
        Join Us in Making a Difference
      </h2>
      <p className="w-full max-w-xl text-center text-body text-base sm:text-xl md:text-2xl text-white !opacity-100">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
        cum?
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button className="btn-primary">
          Donate Now <Icon icon="tabler:arrow-right" width="24" height="24" />
        </button>
        <button className="btn-border text-white border-white">
          Join as Member{" "}
          <Icon icon="tabler:arrow-right" width="24" height="24" />
        </button>
      </div>
    </div>
  );
};

export default CTA;
