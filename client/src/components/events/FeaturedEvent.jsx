import React from "react";
import { Icon } from "@iconify/react";

const FeaturedEvent = ({ event }) => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative card bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10">
          <div className="absolute top-4 left-4">
            <span className="badge badge-primary">Upcoming Event</span>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-brand-primary mb-2">{event.date}</p>
                <h2 className="text-heading mb-4">{event.title}</h2>
                <div className="flex items-center text-body">
                  <Icon
                    icon="mdi:map-marker"
                    className="w-5 h-5 mr-2 text-brand-primary"
                  />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-xl flex items-center justify-center">
                  <button className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:scale-110 transition-transform">
                    <Icon icon="mdi:play" className="w-8 h-8 text-white ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvent;
