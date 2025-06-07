import React from "react";
import { sliderImages } from "@/src/data/sliderImages";

const DURATION = 15000;
const ROWS = 3;
const TAGS_PER_ROW = 5;

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

const ImageCard = ({ img }) => (
  <div className="!w-[400px] !h-[350px] px-1">
    <img
      src={img}
      alt="sahayata"
      className="w-full h-full object-cover rounded-xl"
    />
  </div>
);

const InfiniteImageSlider = ({ children, duration, reverse = false }) => {
  return (
    <div
      className="loop-slider"
      style={{
        "--duration": `${duration}ms`,
        "--direction": reverse ? "reverse" : "normal",
      }}
    >
      <div className="inner">
        {children}
        {children}
        {children}
        {children}
      </div>
    </div>
  );
};

const InfiniteImageLoop = () => (
  <div className="tag-list">
    {[...new Array(ROWS)].map((_, i) => (
      <InfiniteImageSlider
        key={i}
        duration={random(DURATION - 5000, DURATION + 5000)}
        reverse={i % 2}
      >
        {shuffle(sliderImages)
          .slice(0, TAGS_PER_ROW)
          .map((tag) => (
            <ImageCard img={tag} key={tag} />
          ))}
      </InfiniteImageSlider>
    ))}
  </div>
);

export default InfiniteImageLoop;
