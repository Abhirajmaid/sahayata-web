"use client";
import { HeroSection } from "@/src/components";
import {
  ImpactSection,
  DonationOptions,
  FaqSection,
} from "@/src/components/Donation";

const DonationPage = () => {
  return (
    <div className="min-h-screen bg-brand-background">
      <HeroSection title="Make a Donation" breadcrumb="Donate" />
      <ImpactSection />
      <DonationOptions />
      <FaqSection />
    </div>
  );
};

export default DonationPage;
