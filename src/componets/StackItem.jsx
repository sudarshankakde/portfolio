import React from "react";
import { MediaUrl } from "..";

export default function StackItem(props) {
  return (
    <div>
      <div className="md:cursor-pointer ">
        <div className="flex flex-row justify-start items-center gap-3  overflow-hidden md:w-96 w-[85vw] stackItem   px-5 py-2 rounded-lg  transition-all duration-500 ease-in-out ">
          <span>
            <img
              src={MediaUrl + props.logo}
              alt=""
              className="h-16 w-16 rounded-lg"
            />
          </span>
          <span>
            <h3 className="capitalize tracking-wide capitalize">
              {props.Skill}
            </h3>
            <p className="opacity-75 tracking-wide capitalize">{props.Dec}</p>
          </span>
        </div>
      </div>
    </div>
  );
}
