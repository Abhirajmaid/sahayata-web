"use client";
import { Icon } from "@iconify/react";
import React from "react";

const CTA = () => {
  return (
    <div className="w-full py-[120px] flex flex-col gap-9 items-center bg-brand-secondary px-8">
      <h2 className="text-heading text-7xl text-white">
        Join Us in Making a Difference
      </h2>
      <p className="w-[40%] text-center text-body text-2xl text-white !opacity-100">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
        cum?
      </p>
      <div className="flex items-center gap-4">
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
