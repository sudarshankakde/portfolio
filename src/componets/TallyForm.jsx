import React, { useEffect, useState } from "react";

function TallyForm() {
  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  return (
    <div className=" md:py-10 flex flex-col justify-center items-center">
      <h3 className="text-lg tracking-normal">Got a project?</h3>
      <button
        className="border w-auto p-6 rounded-2xl h-18 from-[#9676ce] to-[#7d57c1] bg-gradient-to-r md:text-5xl text-3xl my-3 capitalize"
        data-tally-open="wQ7G68"
        data-tally-layout="modal"
        data-tally-width={screenSize.width}
        data-tally-height={screenSize.height}
        data-tally-hide-title="1"
        data-tally-emoji-text="👋"
        data-tally-emoji-animation="wave"
        data-tally-auto-close="5000"
      >
        Let's work together
      </button>
    </div>
  );
}

export default TallyForm;
