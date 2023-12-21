import React from "react";
import gradient from "../assets/Images/gradient.svg";

function Background() {
  return (
    <>
      <img
        src={gradient}
        alt=""
        className="block md:hidden absolute opacity-60 w-screen rotate-90 -z-10"
      />
      <img
        src={gradient}
        alt=""
        className="hidden md:block absolute opacity-40 -z-10"
      />
    </>
  );
}

export default Background;
