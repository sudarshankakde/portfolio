import React from "react";
import { NavLink } from "react-router-dom";
import { NavListItems } from "./Navbar";
const footerLinks = [
  ...NavListItems,
  { title: "Blog", link: "blog" },
  { title: "about", link: "about" },
];

function Footer() {
  return (
    <>
      <div className="footer-gradient h-64 flex flex-col justify-center items-center gap-10">
        <h2 className="md:text-9xl text-5xl font-Kalnia select-none">
          Sudarshan.
        </h2>
        <div className="md:flex-row flex-col flex w-[75vw] justify-between  md:items-start items-center mx-auto md:gap-0 gap-2">
          <div className="">© {new Date().getFullYear()} Sudarshan Kakde</div>
          <div className="">
            <div className="flex flex-row flex-wrap justify-center gap-6">
              {footerLinks.map((element, index) => {
                return (
                  <NavLink
                    to={element.link}
                    className="text-center uppercase opacity-90 hover:opacity-100 font-mono "
                    key={index}
                    target={element.target}
                  >
                    {element.title}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
