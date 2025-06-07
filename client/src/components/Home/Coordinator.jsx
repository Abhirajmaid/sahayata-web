import React from "react";

const Coordinator = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-5 mt-16 md:mt-[120px] mb-20 md:mb-[150px] px-2 sm:px-0">
      <div className="w-full md:w-1/2 mb-8 md:mb-0">
        <img
          src="/images/about.jpg"
          alt="Sahayata"
          className="w-full rounded-xl shadow"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col gap-8 md:gap-11">
        <h1 className="text-heading font-montserrat text-3xl sm:text-4xl md:text-5xl leading-tight md:leading-[55px] tracking-wide text-center md:text-left">
          "Together, we can create a ripple of hope and change."
        </h1>
        <p className="text-body text-base sm:text-lg text-center md:text-left">
          Our coordinators are the heart of Sahayata, leading every initiative
          with passion and dedication. From organizing food drives to empowering
          children through education and ensuring access to healthcare, our team
          works tirelessly to uplift communities. We believe in the power of
          collective action and invite you to join us in making a meaningful
          impact.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button className="btn-primary">About Us</button>
          <button className="btn-border">Meet Our Team</button>
        </div>
      </div>
    </div>
  );
};

export default Coordinator;
