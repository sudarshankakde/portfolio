import React from "react";
import { NavLink } from "react-router-dom";
import projectSvg from "../../src/assets/Images/svg/project.svg";
import socialsSvg from "../../src/assets/Images/svg/socials.svg";
import contactSvg from "../../src/assets/Images/svg/contact.svg";
import menuSvg from "../../src/assets/Images/svg/menu.svg";

export const NavListItems = [
  {
    title: "project",
    link: "project",
    svg: projectSvg,
  },
  {
    title: "socials",
    link: "https://bento.me/sudarshankakde",
    target: "_blank",
    svg: socialsSvg,
  },
  {
    title: "contact",
    link: "contact",
    svg: contactSvg,
  },
];
export default function Navbar() {
  function showNavbar() {
    var navbarState = document.getElementById("togglebtn");
    var navbarSmall = document.getElementById("navbarSmall").classList;
    if (
      navbarState.attributes.getNamedItem("data-navbarState").value === "hidden"
    ) {
      navbarSmall.replace("invisible", "visible");
      navbarState.setAttribute("data-navbarState", "block");
    } else {
      navbarSmall.replace("visible", "invisible");
      navbarState.setAttribute("data-navbarState", "hidden");
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center navbar md:mx-0 mx-3">
        <div className="  w-full lg:w-[60%] black-gradient border border-[#303034] z-[999] rounded-full mt-4 px-4 shadow-sm shadow-gray-500/50">
          <div className="flex flex-row items-center justify-between mx-auto p-2">
            <NavLink to="" id="logoText" className="text-white">
              S
            </NavLink>

            <button
              data-collapse-toggle="navbar-default"
              data-navbarState="hidden"
              id="togglebtn"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden"
              onClick={showNavbar}
            >
              <img src={menuSvg} alt="Menu" />
            </button>
            <div className="hidden w-full md:block md:w-auto">
              <div className="uppercase flex flex-col p-4 md:p-0 mt-4  md:flex-row md:space-x-8 md:mt-0 ">
                {NavListItems.map((element, index) => {
                  return (
                    <>
                      <NavLink
                        to={element.link}
                        key={index}
                        target={element.target}
                        className={() =>
                          `z-[999] md:flex items-center justify-center hidden mr-2 font-[500] text-xs hover:text-white transition-all ease-in-out duration-300 tracking-wide  gap-1`
                        }
                      >
                        <img src={element.svg} alt="Icon" />
                        {element.title}
                      </NavLink>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full invisible" id="navbarSmall">
        <div className="uppercase flex flex-row p-4 md:p-0   md:flex-row md:space-x-8 md:mt-0 justify-center gap-5 bg-purple flex-wrap">
          {NavListItems.map((element, index) => {
            return (
              <NavLink
                to={element.link}
                key={index}
                target={element.target}
                className={() =>
                  `z-[999] flex items-center justify-center mr-2 font-[500] text-xs hover:text-white transition-all ease-in-out duration-300 tracking-wide  gap-2`
                }
              >
                <img src={element.svg} alt="Icon" />
                {element.title}
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
}
