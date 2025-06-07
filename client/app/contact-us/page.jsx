"use client";
import React from "react";
import { HeroSection } from "@/src/components";
import { ContactForm, ContactInfo } from "@/src/components/contact";
import { MapPin } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-brand-background">
      <HeroSection title="Contact" breadcrumb="Contact" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="card h-96 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center transform rotate-45">
                <MapPin className="w-6 h-6 text-white transform -rotate-45" />
              </div>
              <p className="text-gray-600 text-lg">Interactive Map Location</p>
              <p className="text-gray-500 text-sm mt-2">
                Embed your Google Maps here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
