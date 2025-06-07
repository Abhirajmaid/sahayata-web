"use client";
import React from "react";

import HeroSection from "@/src/components/common/HeroSection";
import {
  MissionSection,
  VideoSection,
  TestimonialSection,
  ImpactSection,
} from "@/src/components/about";
import { CTA } from "@/src/components";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection title="About us" breadcrumb="About" />
      <MissionSection />
      <VideoSection />
      <TestimonialSection bg_color="bg-white" />
      <ImpactSection />
      <CTA />
    </div>
  );
};

export default AboutPage;
