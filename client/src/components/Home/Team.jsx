"use client";
import React, { useRef, useEffect } from "react";

// Instagram post embed URLs from https://www.instagram.com/_sahayata_/
// Use only /embed at the end of the URL for iframe embedding
const instagramPosts = [
  "https://www.instagram.com/p/DJ4dPZIh4pr/embed",
  "https://www.instagram.com/p/DJuXMmAhHMF/embed",
  "https://www.instagram.com/reel/DIRpjjxIG00/embed",
  "https://www.instagram.com/reel/DIx7L7zI0rc/embed",
  "https://www.instagram.com/reel/DIjqxCxoz5R/embed",
  "https://www.instagram.com/reel/DIbqDHpIx4Y/embed",
  "https://www.instagram.com/reel/DHdZ1NcoQjj/embed",
];

const Team = () => {
  const sliderRef = useRef(null);

  // Duplicate posts for seamless infinite scroll
  const posts = [...instagramPosts, ...instagramPosts];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    let animationFrame;
    let scrollStep = 1;

    const animate = () => {
      if (!slider) return;
      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0;
      } else {
        slider.scrollLeft += scrollStep;
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    // Pause on hover
    const pause = () => cancelAnimationFrame(animationFrame);
    const resume = () => (animationFrame = requestAnimationFrame(animate));
    slider.addEventListener("mouseenter", pause);
    slider.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animationFrame);
      slider.removeEventListener("mouseenter", pause);
      slider.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center py-6 sm:py-8">
      <div
        className="w-full overflow-x-auto scrollbar-hide"
        ref={sliderRef}
        tabIndex={-1}
        aria-label="Instagram posts slider"
        style={{ whiteSpace: "nowrap" }}
      >
        <div className="flex gap-4 sm:gap-6 min-w-max px-1 sm:px-2">
          {posts.map((src, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow border border-brand-gray-light overflow-hidden max-w-[90vw] sm:max-w-xs w-[80vw] sm:w-[320px] min-w-[220px] sm:min-w-[260px] flex-shrink-0"
            >
              <iframe
                src={src}
                title={`Instagram post ${idx + 1}`}
                className="w-full aspect-[4/5] min-h-[350px] sm:min-h-[600px] border-0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                loading="lazy"
                // Instagram embeds require sandbox for reels
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 sm:mt-8">
        <a
          href="https://www.instagram.com/_sahayata_/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-border"
        >
          Follow us on Instagram
        </a>
      </div>
    </div>
  );
};

export default Team;
