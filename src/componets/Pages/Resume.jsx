import React from "react";


function Resume() {


  return (
    <>
        <div className="flex flex-col justify-center items-center  gap-y-3 my-7">
          <h2 className="md:text-6xl text-5xl font-Kalnia uppercase">My resume</h2>
          <p className="md:text-lg tracking-widest font-semibold opacity-75 capitalize">
            You Can Hire Me Now!
          </p>
        </div>
      <div className="md:w-[60vw] w-[90vw]  p-2 rounded-lg mx-auto min-h-screen my-10  border border-[#303034]">
        <iframe
          title="resume"
          src="https://drive.google.com/file/d/17JH05Z5jXbh-La02dURaapPejdVpN94O/preview"
          className="h-screen w-full"
          allow="autoplay"
        >
          {" "}
        </iframe>
      </div>
    </>
  );
}

export default Resume;
