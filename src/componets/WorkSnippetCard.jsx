import React from "react";
import { MediaUrl } from "..";
import { NavLink } from "react-router-dom";


export default function WorkSnippetCard(props) {
  const isInternal = props.has_case_study && props.slug;
  const linkPath = isInternal ? `/project/${props.slug}` : props.link;
  const linkProps = isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" };

  return (
    <div className="h-auto max-w-[90%] md:max-w-[45%] workCard" key={props.key}>
      <NavLink to={linkPath} {...linkProps} className="relative rounded-3xl">
        <img
          src={props.Thumbnail && (props.Thumbnail.startsWith("http://") || props.Thumbnail.startsWith("https://")) ? props.Thumbnail : MediaUrl + props.Thumbnail}
          srcSet={props.Thumbnail && (props.Thumbnail.startsWith("http://") || props.Thumbnail.startsWith("https://")) ? props.Thumbnail : MediaUrl + props.Thumbnail}
          alt={props.title}
          loading="lazy"
          className="rounded-3xl transition-transform md:hover:-translate-y-1 h-[20rem] max-h-[20rem] w-[85vw] md:w-[35rem] object-cover"
        />
      </NavLink>
      <div className="mt-2">
        <div className="flex flex-row justify-between items-start">
          <h2 className="text-2xl font-medium">{props.title}</h2>
          {props.link ? (
            <a
              href={props.link}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-75 hover:opacity-100"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="100%"
                width="1.75rem"
              >
                <desc></desc>
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5"></path>
                <line x1="10" y1="14" x2="20" y2="4"></line>
                <polyline points="15 4 20 4 20 9"></polyline>
              </svg>
            </a>
          ) : (
            <NavLink
              to={linkPath}
              {...linkProps}
              className="opacity-75 hover:opacity-100"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="100%"
                width="1.75rem"
              >
                <desc></desc>
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5"></path>
                <line x1="10" y1="14" x2="20" y2="4"></line>
                <polyline points="15 4 20 4 20 9"></polyline>
              </svg>
            </NavLink>
          )}
        </div>
        <p className="flex flex-row justify-start items-center flex-wrap gap-1">
          <span className="capitalize tracking-tight">{props.skills}</span>
          <span className="mx-1">|</span>
          <span className="capitalize tracking-tight">{props.projectType}</span>
          {props.has_case_study && (
            <>
              <span className="mx-1">|</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#9676ce]/20 text-[#aed2ff] border border-[#9676ce]/30">CASE STUDY</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
