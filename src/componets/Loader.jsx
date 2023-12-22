import React, { useEffect, useState } from "react";
import { gsap, CSSPlugin, Expo } from "gsap";
import styled from "styled-components";
gsap.registerPlugin(CSSPlugin);
function Loader() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";
    document.querySelector(".loaderContainer").style.display = "block";
    const count = setInterval(() => {
      setCounter((counter) =>
        counter < 100
          ? counter + 1
          : (clearInterval(count), setCounter(100), reveal())
      );
    }, 50);
  }, []);
  const reveal = () => {
    const timeline = gsap.timeline({
      onComplete: () => {
        window.scrollTo(0, 0);
      },
    });
    timeline
      .to(".follow", {
        width: "100%",
        ease: Expo.easeInOut,
        duration: 1.3,
        delay: 0.4,
      })
      .to(".hide", {
        opacity: 0,
        duration: 0.2,
      })
      .to(".hide", {
        display: "none",
        duration: 0.2,
      })
      .to(".follow", {
        height: "100%",
        bottom: "0",
        duration: 0.7,
        delay: 0.4,
        ease: Expo.easeInOut,
      })
      .to(".content", { width: "100%", ease: Expo.easeInOut, duration: 0.4 })
      .to(".title-lines", { display: "block", duration: 0.1 })
      .to(".title-lines", {
        opacity: 1,
        stagger: 0.15,
        ease: Expo.easeInOut,
        duration: 0.5,
      })
      .to(".follow,.loaderContainer", {
        top: "0",
        height: "0",
        duration: 0.7,
        delay: 0.5,
        ease: Expo.easeInOut,
      })
      .to(".loaderContainer", {
        display: "none",
        duration: 0,
      })
      .to("body", {
        overflow: "visible",
        height: "auto",
        duration: 0,
        delay: 0.1,
        ease: Expo.easeInOut,
      });
  };
  return (
    <AppContainer className="loaderContainer">
      <Loading>
        <Follow className="follow"></Follow>
        <ProgressBar
          className="hide "
          id="progress-bar"
          style={{ width: counter + "%" }}
        ></ProgressBar>
        <Count
          id="count"
          className="hide md:text-9xl text-7xl   select-none  bottom-[8vh]"
        >
          {counter}%
        </Count>
      </Loading>
      <Content className="content  gap-4">
        <p className="title-lines font-Kalnia md:text-[104px] text-6xl ">Sudarshan</p>
        <p className="title-lines font-Kalnia md:text-[104px] text-6xl ">Kakde</p>
        <p className="title-lines font-Kalnia md:text-[46px]  text-3xl tracking-widest my-10">
          -Freelancer-
        </p>
      </Content>
    </AppContainer>
  );
}

export default Loader;

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  color: #000000;
  position: fixed;
  z-index: 9999;
`;
const Loading = styled.div`
  height: 100%;
  width: 100%;
  background-color: #121212;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  
  top: 0;
`;
const Follow = styled.div`
  position: absolute;
  background-color: #aed2ff;
  height: 4px;
  width: 0;
  left: 0;
  z-index: 2;
  bottom: 10vh;
`;

const ProgressBar = styled.div`
  position: absolute;
  left: 0;
  background-color: #dadada86;
  height: 4px;
  width: 0;
  transition: 0.4s ease-out;
  bottom: 10vh;
`;

const Count = styled.p`
  position: absolute;
  color: #fff;
  transform: translateY(-15px);
  font-weight: 500;
  right: 5vw;
`;

const Content = styled.div`
  height: 100%;
  width: 0;
  position: absolute;
  left: 0;
  top: 0;
  background-color: transparent;
  padding: auto;
  z-index:99;

  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  color: #0b021a;

  p {
    text-align: center;

    opacity: 0;
    display: none;
    font-weight: 500;
    margin: 0;
  }
`;
