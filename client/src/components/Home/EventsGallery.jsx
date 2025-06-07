"use client";
import React from "react";
import EventCard from "../common/EventCard";
import { galleryData } from "@/src/data/galleryData";
import Link from "next/link";

const EventsGallery = () => {
  // Use galleryData for images, but keep EventCard layout
  return (
    <div className="flex flex-col gap-12 mt-12 sm:mt-16 md:mt-[100px] px-2 sm:px-0">
      <div>
        <h1 className="text-heading font-normal font-montserrat w-full md:w-2/5">
          Events Gallery
        </h1>
        <p className="text-body text-lg w-full md:w-2/5">
          Explore highlights from our major events and activities.
        </p>
      </div>
      <div className="flex flex-wrap justify-center md:justify-between w-full mt-2 gap-8">
        {galleryData.map((event, idx) => (
          <EventCard
            key={idx}
            data={{
              id: idx,
              title: event.title,
              description: event.description,
              image: event.images[0],
              images: event.images, // Pass all images
            }}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link href="/gallery">
          <button className="btn-border px-8 py-3 text-lg">See More</button>
        </Link>
      </div>
    </div>
  );
};

export default EventsGallery;
