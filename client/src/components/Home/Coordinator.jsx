import React from "react";

const Coordinator = () => {
  return (
    <div className="flex items-center gap-5 mt-[200px] mb-[250px]">
      <div className="w-1/2">
        <img src="/images/about.jpg" alt="Sahayata" className="w-full" />
      </div>
      <div className="w-1/2 flex flex-col gap-11">
        <h1 className="text-heading font-montserrat text-5xl leading-[55px] tracking-wide">
          "Together, we can create a ripple of hope and change."
        </h1>
        <p className="text-body text-base">
          Our coordinators are the heart of Sahayata, leading every initiative
          with passion and dedication. From organizing food drives to empowering
          children through education and ensuring access to healthcare, our team
          works tirelessly to uplift communities. We believe in the power of
          collective action and invite you to join us in making a meaningful
          impact.
        </p>
        <div className="flex gap-4">
          <button className="btn-primary">About Us</button>
          <button className="btn-border">Meet Our Team</button>
        </div>
      </div>
    </div>
  );
};

export default Coordinator;
