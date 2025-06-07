"use client";
import React, { useState } from "react";

const EventCard = ({ data }) => {
  // Accepts: { title, description, image, images }
  const { title, description, image, images = [] } = data;
  // Use up to 4 images for stacked effect
  const [img1, img2, img3] = images.slice(1, 4);

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="card event_card p-0 flex flex-col justify-end relative max-w-[400px] h-[320px] z-10 cursor-pointer group"
        onClick={() => setShowModal(true)}
      >
        {/* Background main image */}
        {image && (
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover rounded-xl z-0"
          />
        )}
        {/* Stacked images for hover effect */}
        {img3 && (
          <img
            src={img3}
            alt={title}
            className="rounded-xl absolute w-full h-full transition-all duration-500 imgs3 -z-10 group-hover:translate-x-4 group-hover:-translate-y-4 opacity-80"
          />
        )}
        {img2 && (
          <img
            src={img2}
            alt={title}
            className="rounded-xl absolute w-full h-full transition-all duration-500 imgs2 -z-10 group-hover:translate-x-2 group-hover:-translate-y-2 opacity-90"
          />
        )}
        {img1 && (
          <img
            src={img1}
            alt={title}
            className="rounded-xl absolute w-full h-full transition-all duration-500 imgs -z-10 group-hover:translate-x-1 group-hover:-translate-y-1 opacity-95"
          />
        )}
        {/* Overlay */}
        <div className="w-full h-full absolute inset-0 bg-black/30 rounded-xl z-10" />
        {/* Content */}
        <div className="relative z-20 w-full h-full flex flex-col justify-end p-6">
          <h3 className="card-title text-white drop-shadow">{title}</h3>
          <p className="card-description text-white drop-shadow">
            {description}
          </p>
        </div>
      </div>
      {/* Modal with all images */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative max-w-5xl w-full mx-4 bg-white rounded-xl p-6"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute cursor-pointer top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="#333"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              </svg>
            </button>
            <h3 className="text-heading text-4xl text-brand-dark mb-4">
              {title}
            </h3>
            {/* Gallery grid in modal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {images.map((src, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center bg-black"
                  style={{
                    aspectRatio: "1/1",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img
                    src={src}
                    alt={title + " " + (idx + 1)}
                    className="object-cover w-full h-full"
                    style={{ display: "block" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventCard;
