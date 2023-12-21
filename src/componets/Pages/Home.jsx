import React, { useEffect, useState, useRef } from "react";
import StackItem from "../StackItem";
import Stack from "../Stack";
import WorkSnippetCard from "../WorkSnippetCard";
import AboutMeCard from "../AboutMeCard";
import Background from "../Background";
import { NavLink } from "react-router-dom";
import { ApiBaseURL } from "../..";
import { gsap, CSSPlugin, Expo } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(CSSPlugin, ScrollTrigger);

export default function Home() {
  const portfolio = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Sudarshan Kakde";

    const t1 = gsap.timeline({
      onComplete: () => {},
    });
    t1.to(".SubHero", {
      opacity: 1,
      stagger: 0.15,
      ease: Expo.easeInOut,
      duration: 0.6,
    });
    const portfolioRef = portfolio.current;
  
    // gsap.fromTo(
    //   ".SubHeadText",
    //   {
    //     x: "-150px",
    //   },
    //   {
    //     x: "0",
    //     scrollTrigger: {
    //       trigger: ".SubHeadText",
    //       star: "top 40%",
    //       scrub: 2,
    //     },
    //   }
    // );
  }, []);

  // projects load
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch(`${ApiBaseURL}api/projects?size=4`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProjects(data.data);
      });
  }, []);

  // stack Load
  const [stack, setStack] = useState([]);
  useEffect(() => {
    fetch(`${ApiBaseURL}api/stack`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setStack(data.data);
      });
  }, []);
  return (
    <>
      {/* hero */}
      <div className="flex flex-col h-[80vh]  md:h-screen items-center justify-center w-full  ">
        <Background />
        <div
          className="flex flex-col items-center justify-center w-full "
          id="hero"
        >
          <div className="flex flex-row p-3 gap-2 justify-center items-center md:cursor-pointer z-10 SubHero">
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
            className="text-4xl md:text-7xl md:w-[60%] text-center z-10 font-semibold mb-5 SubHero"
            id="heroText"
          >
            <span className="Hero2-1">
              Making <span id="CodeHeroText">code</span> and{" "}
              <span id="PixelHeroText">pixel</span>
            </span>
            <span className="Hero2-2">dance in harmony.</span>
          </div>
          <div className="flex flex-row justify-center gap-10 capitalize z-10 Hero3 SubHero">
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
          <div className="SubHero">
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
          ref={portfolio}
        >
          {Array.isArray(projects)
            ? projects.map((project, index) => {
                return (
                  <WorkSnippetCard
                    key={index}
                    Thumbnail={project.Thumbnail}
                    title={project.name}
                    link={project.link}
                    skills={project.skills}
                    projectType={project.projectType}
                  />
                );
              })
            : console.log("projects is not an array", projects)}
        </div>
        <NavLink
          to="project"
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
        </NavLink>
      </div>
      {/* stack */}
      <div className="flex flex-col items-center justify-start w-full z-10   min-h-auto my-24">
        <Stack stack={stack} />
      </div>

      {/* About Me */}
      <div className="flex flex-col items-center justify-center w-full z-10 py-10 min-h-[80vh]">
        <h2 className="text-5xl md:text-6xl  font-semibold w-full md:text-center md:px-0 text-start px-10 SubHeadText">
          About Me.
        </h2>
        <div className="w-full">
          <AboutMeCard fromRef="home" />
        </div>
        <NavLink
          to="about"
          className="bg-purple-600  border px-3 py-2 rounded  font-bold hover:bg-purple-950"
        >
          More about me
        </NavLink>
      </div>
    </>
  );
}
