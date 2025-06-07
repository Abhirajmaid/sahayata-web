"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-8 py-[70px] ">
        <div>
          <div className="p-2 px-5 font-semibold text-sm bg-secondary text-white rounded-full font-montserrat">
            Join us in our mission to nourish lives, empower communities, and
            spread kindness across Pune.
          </div>
        </div>
        <div>
          <h1 className="text-hero text-8xl text-center leading-[1.1]">
            Feeding Mankind,
            <br /> with Love.
          </h1>
        </div>
        <div>
          <p className="!text-black text-lg font-medium w-[60%] mx-auto text-center ">
            “The smallest act of kindness is worth more than the grandest
            intention.” <br />
            <span className="text-brand-primary font-semibold">
              Be the reason someone smiles today.
            </span>
          </p>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <Link href="/volunteer">
            <button className="btn-border uppercase">
              Join as Volunteer
              <Icon icon="tabler:arrow-right" width="24" height="24" />
            </button>
          </Link>
          <Link href="/donate">
            <button className="btn-primary uppercase">
              Donate for a Cause
              <Icon icon="tabler:arrow-right" width="24" height="24" />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Hero;
