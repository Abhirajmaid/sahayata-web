"use client";
import React from "react";

const companies = [
  "/images/Graphic_(Color).png",
  "/images/Graphic_(Color).png",
  "/images/Graphic_(Color).png",
  "/images/Graphic_(Color).png",
  "/images/Graphic_(Color).png",
  "/images/Graphic_(Color).png",
];

const Companies = () => {
  return (
    <div className="flex flex-col items-center gap-8 mt-[80px]">
      <h2 className="text-heading">Trusted By Many!</h2>
      <div className="relative w-full overflow-hidden">
        {/* Fade effect left */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-brand-background via-brand-background/80 to-transparent" />
        {/* Fade effect right */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-brand-background via-brand-background/80 to-transparent" />
        <div className="flex gap-16 animate-slide">
          {companies.concat(companies).map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt=""
              className="w-[120px] grayscale cursor-pointer transition-all duration-200 hover:grayscale-0 opacity-50 hover:opacity-100"
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .animate-slide {
          animation: slide 20s linear infinite;
        }
        @keyframes slide {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default Companies;
