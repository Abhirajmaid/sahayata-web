import React, { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { videoSection } from "@/src/data/aboutData";

const VideoSection = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="py-20  w-[70%] mx-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="card p-0 overflow-hidden">
              <Image
                src={videoSection.image}
                alt="Sahayata Founder"
                width={500}
                height={400}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  onClick={() => setShowModal(true)}
                >
                  <Icon
                    icon="mdi:play"
                    className="w-6 h-6 text-brand-primary ml-1"
                  />
                </button>
              </div>
            </div>
            <div className="card mt-4 text-center">
              <p className="card-title">"{videoSection.founderQuote}"</p>
              <p className="text-body mt-2">{videoSection.founder}</p>
            </div>
          </div>
          <div>
            <h3 className="text-heading mb-6">{videoSection.title}</h3>
            <p className="text-body mb-8">{videoSection.description}</p>
            <div className="card bg-brand-light border-l-4 border-brand-secondary">
              <p className="text-body italic">{videoSection.quote}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Video Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-3xl mx-4 bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-gray-100 z-10"
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
            <video
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              controls
              autoPlay
              className="w-full aspect-video h-[450px] object-cover bg-black"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoSection;
