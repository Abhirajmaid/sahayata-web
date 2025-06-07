"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import HeroSection from "@/src/components/common/HeroSection";
import RegistrationModal from "@/src/components/events/RegistrationModal";
import { events, eventRegistrationFields } from "@/src/data/eventsData";
import { Icon } from "@iconify/react";
import { db } from "@/src/utils/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const EventPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const event = events.find((e) => e.id.toString() === id);

  // Add registration handler to store data in Firestore
  const handleRegistration = async (formData) => {
    try {
      // Store registration under a collection for this event
      await addDoc(
        collection(
          db,
          `event_registrations/event_${event.title}/registrations`
        ),
        {
          ...formData,
          eventId: event.id,
          eventTitle: event.title,
          registeredAt: serverTimestamp(),
        }
      );
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  if (!event) {
    return <div>Event not found</div>;
  }

  const handleRegister = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-background">
      <HeroSection title={event.title} breadcrumb="Events" />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="card">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Event Image */}
              <div className="aspect-video bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-xl"></div>

              {/* Event Details */}
              <div className="space-y-6">
                <div>
                  <div className="flex flex-wrap gap-2 text-sm text-brand-primary mb-2">
                    <span>{event.date}</span>
                    <span>•</span>
                    <span>{event.time}</span>
                  </div>
                  <h1 className="text-heading mb-4">{event.title}</h1>
                  <div className="flex items-center text-body mb-4">
                    <Icon
                      icon="mdi:map-marker"
                      className="w-5 h-5 mr-2 text-brand-primary"
                    />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <p>{event.description}</p>
                </div>

                <div className="flex flex-col space-y-4">
                  <h3 className="text-sub">Available Slots</h3>
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                      >
                        <div className="w-full h-full bg-gradient-to-br from-brand-primary/80 to-brand-secondary/80" />
                      </div>
                    ))}
                    <div className="w-8 h-8 bg-brand-dark rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-white text-xs">+</span>
                    </div>
                  </div>
                </div>

                <button
                  className="btn-primary w-full md:w-auto"
                  onClick={handleRegister}
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={event}
        fields={eventRegistrationFields[event.registrationType]}
        onRegister={handleRegistration}
      />
    </div>
  );
};

export default EventPage;
