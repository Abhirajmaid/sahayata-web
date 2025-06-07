import React from "react";

const Card = ({ data }) => {
  const { name, image, position } = data;
  return (
    <>
      <div className="group/card cursor-pointer min-w-[350px] w-[350px] items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 relative my-7 rounded-xl">
        <div className="h-[350px] w-full">
          <img
            className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-125"
            src={image}
            alt="Sahayata Pune"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"></div>
        <div className="absolute inset-0 flex translate-y-[35%] flex-col items-center justify-center px-9 text-center transition-all duration-500">
          <h1 className="font-sourceserif text-lg font-bold text-white">
            {name}
          </h1>
          <h1 className="font-montserrat text-base text-white">{position}</h1>
        </div>
      </div>
    </>
  );
};

export default Card;
