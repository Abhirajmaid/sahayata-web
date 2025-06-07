"use client";
import React, { useState } from "react";
import { Shield, Users, Calendar, Medal } from "lucide-react";
import { useRouter } from "next/navigation";
import HeroSection from "@/src/components/common/HeroSection";

const membershipPerks = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Priority Access",
    description: "Get first choice on volunteer slots and locations",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Events",
    description: "Exclusive access to member-only events and meetups",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Flexible Scheduling",
    description: "Book multiple slots in advance",
  },
  {
    icon: <Medal className="w-6 h-6" />,
    title: "Recognition",
    description: "Special mention in our annual report and website",
  },
];

const VolunteerPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-brand-background">
      <HeroSection
        title="Become a Force for Good"
        description="Join our community of dedicated volunteers who are making a real difference in people's lives through regular service and commitment."
        breadcrumb="Volunteer"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Full width Membership Card */}
        <div className="mb-8">
          <div className="card p-8 bg-white/90 shadow-lg">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h2 className="text-heading text-5xl mb-4">Annual Membership</h2>
              <div className="mb-6 font-montserrat">
                <span className="text-5xl font-medium text-brand-primary">
                  ₹20,000
                </span>
                <span className="text-muted text-3xl">/year</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
              {membershipPerks.map((perk, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="text-brand-primary shrink-0">{perk.icon}</div>
                  <div>
                    <h3 className="text-sub font-medium">{perk.title}</h3>
                    <p className="text-body text-muted">{perk.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => router.push("/volunteer/become-member")}
                className="btn-primary px-12"
              >
                Become a Member
              </button>
            </div>
          </div>
        </div>

        {/* Free Trial Card with reduced width */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="card p-8 bg-white/90 shadow-lg">
            <h2 className="text-heading text-2xl mb-4 text-center">
              Free Trial
            </h2>
            <p className="text-body text-muted mb-6 text-center">
              Experience volunteering with us! Get 2 free Thursday drive passes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerPage;
