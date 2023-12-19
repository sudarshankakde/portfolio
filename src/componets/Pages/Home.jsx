import React from "react";
import StackItem from "../StackItem";
import WorkSnippetCard from "../WorkSnippetCard";
import AboutMeCard from "../AboutMeCard";
import Testimonials from "../Testimonials";
import Background from "../Background";
import { NavLink } from "react-router-dom";
export default function Home() {
  // Shery.textAnimate("#PixelHeroText,#CodeHeroText" /* Element to target.*/, {
  //   //Parameters are optional.
  //   style: 2,
  //   y: 10,
  //   delay: 0.3,
  //   duration: 2,
  //   ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  //   multiplier: 0.1,
  // });
  // gsap.fromTo(
  //   ".animate2",
  //   {
  //     y: 20,
  //     opacity: 0,
  //     delay: 0,
  //     duration: 0.5,
  //   },
  //   { y: 0, opacity: 1, delay: 0, duration: 0.5 }
  // );
  // gsap.from("#work>.SubHeadText>span", {
  //   scrollTrigger: {
  //     trigger:"#work>.SubHeadText>span",
  //     markers: true,
  //     start: "top 10%",
  //     end: "bottom 20%",

  //   },
  //   y:50,
  //   opacity:.5

  // });

  return (
    <>
      <div className="flex flex-col h-[80vh]  md:h-screen items-center justify-center w-full  ">
        <Background />
        <div className="flex flex-row p-3 gap-2 justify-center items-center cursor-pointer z-10 animate2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path
              d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
              stroke="#9B96B0"
              fill="none"
              strokeWidth="2px"
            ></path>
            <path
              d="M5 3v4"
              stroke="#9B96B0"
              fill="none"
              strokeWidth="2px"
            ></path>
            <path
              d="M19 17v4"
              stroke="#9B96B0"
              fill="none"
              strokeWidth="2px"
            ></path>
            <path
              d="M3 5h4"
              stroke="#9B96B0"
              fill="none"
              strokeWidth="2px"
            ></path>
            <path
              d="M17 19h4"
              stroke="#9B96B0"
              fill="none"
              strokeWidth="2px"
            ></path>
          </svg>
          <p className="text-2xl font-semibold text-[#9B96B0]">
            Hello I'm Sudarshan,
          </p>
        </div>
        <div
          className="text-4xl md:text-7xl md:w-[60%] text-center z-10 font-semibold mb-5"
          id="heroText"
        >
          Making <span id="CodeHeroText">code</span> and{" "}
          <span id="PixelHeroText">pixel</span> dance in harmony.
        </div>
        <div className="flex flex-row justify-center gap-10 capitalize z-10 animate2">
          <NavLink to="blog" className="btn">
            <span>blogs</span>
            <svg version="1.1" viewBox="0 0 152.9 43.4">
              <path d="M151.9,13.6c0,0,3.3-9.5-85-8.3c-97,1.3-58.3,29-58.3,29s9.7,8.1,69.7,8.1c68.3,0,69.3-23.1,69.3-23.1 s1.7-10.5-14.7-18.4" />
            </svg>
          </NavLink>
          <NavLink to="about" className="btn">
            about me
          </NavLink>
        </div>
        <div className="">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce mt-10 text-white"
          >
            <line
              x1="12"
              x2="12"
              y1="5"
              y2="19"
              stroke="#9B96B0"
              fill="none"
              strokeWidth="2px"
            ></line>
            <polyline
              points="19 12 12 19 5 12"
              stroke="#9B96B0"
              fill="none"
              strokeWidth="2px"
            ></polyline>
          </svg>
        </div>
      </div>

      {/* work */}
      <div
        className="flex flex-col items-center justify-center gap-7  z-10 my-24"
        id="work"
      >
        <h2 className="text-5xl md:text-6xl relative font-semibold md:text-center md:px-0 text-start px-10 SubHeadText ">
          <span>WORK SNIPPETS.</span>
        </h2>
        <div
          className="flex flex-row flex-wrap justify-center items-center gap-x-7 gap-y-10  "
          id="portfolio"
        >
          <WorkSnippetCard
            Thumbnail="https://source.unsplash.com/random/?travel"
            title="Trek Tales"
            Skill="Full Stack dev"
            ProjectType="travel ticket booking site"
            link="sudarshankakde.site"
          />
          <WorkSnippetCard
            Thumbnail="https://source.unsplash.com/random/?blogs"
            title="Sids Blog"
            Skill="Full Stack dev"
            ProjectType="Personal Bloging Site site"
            link=""
          />
          <WorkSnippetCard
            Thumbnail="https://source.unsplash.com/random/?browser"
            title="Trek Tales"
            Skill="Full Stack dev"
            ProjectType="travel ticket booking site"
            link=""
          />
        </div>
        <a
          href=""
          className="my-10 marker flex flex-row justify-center items-center gap-2 border-2 p-2 bg-transparent  group relative "
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-target transition-all duration-300 ease-in-out group-hover:-rotate-12 fill-[var(--text-color)] group-hover:fill-slate-300  absolute -top-4 -right-4 bg-[var(--bg-purple)]"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#9B96B0"
              fill="none"
              strokeWidth="2px"
            ></circle>
            <circle
              cx="12"
              cy="12"
              r="6"
              stroke="#9B96B0"
              fill="none"
              strokeWidth="2px"
            ></circle>
            <circle
              cx="12"
              cy="12"
              r="2"
              stroke="#9B96B0"
              fill="none"
              strokeWidth="2px"
            ></circle>
          </svg>{" "}
          See Other Projects
        </a>
      </div>
      {/* stack */}
      <div className="flex flex-col items-center justify-start w-full z-10   min-h-auto my-24">
        <h2 className="text-5xl md:text-6xl  font-semibold w-full md:text-center md:px-0 text-start px-10 SubHeadText">
          My Stack.
        </h2>
        <div className="flex flex-row gap-y-7 gap-x-4 justify-center md:justify-evenly items-center md:w-[80%] w-full mt-5 flex-wrap ">
          <StackItem
            Skill="Html"
            Dec="basic knowlage of html"
            logo="https://framerusercontent.com/images/8th70L8hfCMSHH26OxKegwlZzU.jpg"
          />
          <StackItem
            Skill="css"
            Dec="basic knowlage of html"
            logo="https://framerusercontent.com/images/8th70L8hfCMSHH26OxKegwlZzU.jpg"
          />
          <StackItem
            Skill="js"
            Dec="basic knowlage of html"
            logo="https://framerusercontent.com/images/8th70L8hfCMSHH26OxKegwlZzU.jpg"
          />
          <StackItem
            Skill="django"
            Dec="basic knowlage of html"
            logo="https://framerusercontent.com/images/8th70L8hfCMSHH26OxKegwlZzU.jpg"
          />
        </div>
      </div>

      {/* About Me */}
      <div className="flex flex-col items-center justify-center w-full z-10 py-10">
        <h2 className="text-5xl md:text-6xl  font-semibold w-full md:text-center md:px-0 text-start px-10 SubHeadText">
          About.
        </h2>
        <AboutMeCard fromRef="home" />
        <NavLink to="about" className="bg-purple-600  border px-3 py-2 rounded  font-bold hover:bg-purple-950">
          More about me
        </NavLink>
      </div>
      {/* Testimonials */}
      <div className="flex flex-col items-center justify-center w-full z-10 py-10">
        <h2 className="text-5xl md:text-6xl  font-semibold w-full md:text-center md:px-0 text-start px-10 SubHeadText">
          Testimonials.
        </h2>
        <Testimonials />
      </div>
    </>
  );
}
