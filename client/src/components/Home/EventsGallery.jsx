"use client";
import React from "react";
import EventCard from "../common/EventCard";
import { galleryData } from "@/src/data/galleryData";
import Link from "next/link";

const EventsGallery = () => {
  // Use galleryData for images, but keep EventCard layout
  return (
    <div className="flex flex-col gap-12 mt-[100px]">
      <div>
        <h1 className="text-heading font-normal font-montserrat w-2/5">
          Events Gallery
        </h1>
        <p className="text-body text-lg w-2/5">
          Explore highlights from our major events and activities.
        </p>
      </div>
      <div className="flex justify-between flex-wrap w-full mt-[10px] gap-8">
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
