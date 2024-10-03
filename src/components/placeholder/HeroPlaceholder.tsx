import React from "react";

const HeroPlaceholder = () => {
  return (
    <>
      <div className="h-[85vh] w-full animate-pulse bg-slate-500"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
    </>
  );
};

export default HeroPlaceholder;
