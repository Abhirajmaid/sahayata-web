import React from "react";
import { Icon } from "@iconify/react";

const EventList = ({ events, onBookSlot }) => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="space-y-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="card hover:scale-105 transition-all duration-300"
            >
              <div className="grid md:grid-cols-4 gap-6 items-center">
                <div className="md:col-span-1">
                  <div className="aspect-video bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-xl"></div>
                </div>

                <div className="md:col-span-2">
                  <div className="flex flex-wrap gap-2 text-sm text-brand-primary mb-2">
                    <span>{event.date}</span>
                    <span>•</span>
                    <span>{event.time}</span>
                  </div>
                  <h3 className="text-sub mb-3">{event.title}</h3>
                  <div className="flex items-center text-body">
                    <Icon
                      icon="mdi:map-marker"
                      className="w-4 h-4 mr-2 text-brand-primary"
                    />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>

                <div className="md:col-span-1 flex flex-col items-end space-y-4">
                  <button
                    className="btn-primary"
                    onClick={() => onBookSlot(event)}
                  >
                    Book Your Slot
                  </button>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventList;
