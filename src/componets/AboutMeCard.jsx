import { React, useRef, useLayoutEffect } from "react";
export default function AboutMeCard(props) {
  const storylyRef = useRef();
  useLayoutEffect(() => {
    storylyRef.current.init({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NfaWQiOjExMzc0LCJhcHBfaWQiOjE3MDQ4LCJpbnNfaWQiOjE4OTA2fQ.-uDKGyJEybdDxIOD104Oi66lvjFRCqWuz82UdhXxrEg",
    });
  }, []);

  
  return (
    <div className="flex md:flex-col flex-col gap-y-7  justify-center  items-center md:w-[80%] w-auto my-5 mx-auto text-center">
      <div className="w-1/3" id="storyly_web">
        <storyly-web
          ref={storylyRef}
          class="w-full"
          // disablecache="true"
          // hidden="true"
          // role="application"
          id="storyly"
        />

        
      </div>
      <h2 className={props.titleClasses}>{props.title}</h2>
      <div className="md:w-[65%] w-[90vw] flex flex-col justify-center items-center  h-full cursor-pointer ">
        <p className="">
          Hello, I am Sudarshan Kakde, a 21-year-old college student,
          programmer, cross-platform application developer, and full-stack web
          developer living in Nagpur, India. I am a social introvert who finds
          happiness in my own company and values close connections. I am
          resilient and derive joy from helping and loving others, pursuing my
          dreams, and inspiring and uplifting those around me.
        </p>
      </div>
    </div>
  );
}
