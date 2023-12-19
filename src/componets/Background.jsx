import React from "react";
import gradient from "../assets/Images/gradient.svg";

function Background() {
  return (
    <>
      <img
        src={gradient}
        alt=""
        className="block md:hidden absolute opacity-60 w-screen rotate-90 z-0"
      />
      <img
        src={gradient}
        alt=""
        className="hidden md:block absolute opacity-40 z-0"
      />
    </>
  );
}

export default Background;
