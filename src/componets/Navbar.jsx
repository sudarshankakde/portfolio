import React from "react";
import StaggeredMenu from "./StaggeredMenu";

export const NavListItems = [
  {
    label: "Home",
    link: "/"
  },
  {
    label: "About",
    link: "/about"
  },
  {
    label: "Projects",
    link: "/project"
  },
  {
    label: "Experience",
    link: "/experience"
  },
  {
    label: "Resume",
    link: "/resume"
  },
  {
    label: "Blog",
    link: "/blog"
  },
  {
    label: "Socials",
    link: "/socials"
  },
  {
    label: "Contact",
    link: "/contact"
  }
];

const socialItems = [
  { label: "GitHub", link: "https://github.com/sudarshankakde" },
  { label: "LinkedIn", link: "https://linkedin.com/in/sudarshan-kakde-510b15194" },
  { label: "Instagram", link: "https://instagram.com/sudarshan_kakde_" }
];

export default function Navbar() {
  return (
    <StaggeredMenu
      items={NavListItems}
      socialItems={socialItems}
      isFixed={true}
      position="right"
      menuButtonColor="#fff"
      openMenuButtonColor="#fff"
      accentColor="#9676ce"
      zIndex={100}
      openZIndex={99999}
    />
  );
}

