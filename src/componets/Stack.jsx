import React from "react";
import { MediaUrl } from "..";

function Stack(props) {
  const stack = props.stack;

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5 min-h-[75vh] relative">
        <h2 className="text-5xl md:text-6xl  font-semibold md:text-center md:px-0 text-start px-10 SubHeadText relative w-full">
          <span>My Stack.</span>
        </h2>
        <div className="">
          <div
            className="scroller md:max-w-[70vw] max-w-[85vw]"
            data-speed="mediam"
            data-animated
          >
            <ul className="tag-list scroller__inner">
              {stack.map((tool, index) => {
                return (
                  <>
                    <li key={index}>
                      <img
                        src={MediaUrl + tool.logo}
                        alt={tool.toolName}
                        className="w-10 h-10"
                      />
                    </li>
                  </>
                );
              })}
              {stack.map((tool, index) => {
                return (
                  <>
                    <li key={index} aria-hidden>
                      <img
                        src={MediaUrl + tool.logo}
                        alt={tool.toolName}
                        className="w-10 h-10"
                      />
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 my-2">
          <div className="md:text-lg font-semibold  tracking-tight  gap-1 md:opacity-80  opacity-90 md:w-[70%] w-[85%] mx-auto text-justify relative text-base">
            I bring together a potent tech stack to ensure your solutions are
            seamless and robust. The backend is fortified with{" "}
            <div className="bg-[#4abeece6] px-1.5 mx-1 inline-block text-[black] rounded-md relative">
              Django
            </div>
            and the
            <span className="bg-[#add8e6e6] px-1.5 mx-1  text-[black] rounded-md">
              Django&nbsp;Rest&nbsp;Framework
            </span>{" "}
            for optimal efficiency and scalability. On the front end, I
            incorporate cutting-edge libraries such as{" "}
            <span className="bg-[#ceade6] px-1.5 text-[black] rounded-md">
              React
            </span>
            &nbsp;,{" "}
            <span className="bg-[#c2d378] px-1.5 text-[black] rounded-md">
              HTMX
            </span>
            &nbsp;, and others to craft an engaging user experience. When it
            comes to creating visually appealing and user-friendly interfaces,
            my go-to tools are{" "}
            <span className="bg-[#e6b2ad] px-1.5 text-[black] rounded-md">
              Figma
            </span>{" "}
            and{" "}
            <span className="bg-[#78ecb0e6] px-1.5 text-[black] rounded-md">
              Canvas
            </span>{" "}
            for UI/UX design, ensuring seamless alignment with your project
            goals. This all-encompassing development stack lays the foundation
            for an effective digital experience.
          </div>
        </div>
      </div>
    </>
  );
}

export default Stack;
