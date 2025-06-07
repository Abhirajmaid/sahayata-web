"use client";
import React, { useState } from "react";
import HeroSection from "@/src/components/common/HeroSection";
import { galleryData } from "@/src/data/galleryData";

const GallerySection = ({ title, description, images }) => {
  const [showAll, setShowAll] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  const displayedImages = showAll ? images : images.slice(0, 6);

  return (
    <section className="mb-16">
      <h2 className="text-heading text-5xl text-brand-primary mb-2">{title}</h2>
      <p className="text-body text-muted mb-6">{description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayedImages.map((src, idx) => (
          <div
            key={idx}
            className="rounded-xl overflow-hidden shadow-lg bg-white cursor-pointer"
            onClick={() => setModalImg(src)}
          >
            <img
              src={src}
              alt={title + " " + (idx + 1)}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
      {images.length > 6 && (
        <div className="flex justify-center mt-6">
          <button
            className="btn-secondary"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
      {/* Modal */}
      {modalImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setModalImg(null)}
        >
          <div
            className="relative max-w-3xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={modalImg}
              alt="Gallery Large"
              className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl bg-white"
            />
            <button
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
              onClick={() => setModalImg(null)}
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
          </div>
        </div>
      )}
    </section>
  );
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-brand-background">
      <HeroSection
        title="Gallery"
        description="Explore moments from our events and drives. Click any image to view it larger."
        breadcrumb="Gallery"
      />
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        {galleryData.map((section, idx) => (
          <GallerySection
            key={idx}
            title={section.title}
            description={section.description}
            images={section.images}
          />
        ))}
      </div>
    </div>
  );
}
