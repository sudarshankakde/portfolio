import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ApiBaseURL, MediaUrl } from "../..";
import { ProjectArticleSkeleton } from "../SkeletonLoaders";
import parse from "html-react-parser";
import ScrollIndicator from "../ScrollIndicator";
import WorkSnippetCard from "../WorkSnippetCard";
import { useQuery } from "@tanstack/react-query";
import { PageSeo } from "../Seo";
import LineSidebar from "../LineSidebar";

function resolveImg(src) {
  if (!src) return "";
  return src.startsWith("http://") || src.startsWith("https://")
    ? src
    : MediaUrl + src;
}

function decodeEntities(str) {
  if (!str) return "";
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function ReadProject() {
  const { slug } = useParams();

  // Scroll to top on load or slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  // Fetch current project details
  const { isLoading, data, isError } = useQuery({
    queryKey: ["Read-Project", slug],
    queryFn: () =>
      fetch(`${ApiBaseURL}api/projects/detail/${slug}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load project details");
          return res.json();
        })
        .then((json) => json.data ?? null),
    staleTime: 1000 * 60 * 5,
  });

  // Fetch all projects to find "Other Projects" recommendations
  const allProjectsQuery = useQuery({
    queryKey: ["Projects"],
    queryFn: () =>
      fetch(`${ApiBaseURL}api/projects`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load other projects");
          return res.json();
        })
        .then((json) => json.data ?? []),
    staleTime: 1000 * 60 * 5,
  });

  const project = data ?? null;
  const body = project?.case_study ?? "";
  const tools = project?.tools ?? [];

  const projectsList = Array.isArray(allProjectsQuery.data)
    ? allProjectsQuery.data
    : Array.isArray(allProjectsQuery.data?.data)
    ? allProjectsQuery.data.data
    : [];

  const otherProjects = projectsList
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  // Dynamic Table of Contents sidebar items
  const sidebarItems = useMemo(() => {
    if (!project) return ["Overview"];
    const list = ["Overview"];
    const projectBody = project.case_study ?? "";
    if (projectBody) {
      const matches = [...projectBody.matchAll(/<h[23][^>]*>(.*?)<\/h[23]>/gi)];
      const parsedHeadings = matches
        .map((m) => decodeEntities(m[1].replace(/<[^>]+>/g, "").replace(/^\d+[.\s-]*/, "").trim()))
        .filter(Boolean);
      if (parsedHeadings.length > 0) {
        list.push(...parsedHeadings);
      } else {
        list.push("Case Study");
      }
    } else {
      list.push("Summary");
    }
    if (otherProjects.length > 0) list.push("Other Projects");
    return list;
  }, [project, otherProjects.length]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let ticking = false;
    const getElementTop = (el) => (el ? Math.floor(el.getBoundingClientRect().top + window.scrollY) : Infinity);

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY + 180;
          const sections = sidebarItems.map((label) => {
            if (label === "Overview") return { label, top: 0 };
            if (label === "Other Projects") {
              return { label, top: getElementTop(document.getElementById("other-projects-section")) };
            }
            const allHeadings = document.querySelectorAll("article h2, article h3");
            for (const h of allHeadings) {
              const cleanText = h.innerText.replace(/^\d+[.\s-]*/, "").trim().toLowerCase();
              const labelLower = label.toLowerCase();
              if (cleanText.includes(labelLower) || labelLower.includes(cleanText)) {
                return { label, top: getElementTop(h) };
              }
            }
            return { label, top: getElementTop(document.getElementById("case-study-section")) };
          });

          let currentIdx = 0;
          for (let i = 0; i < sections.length; i++) {
            if (scrollPos >= sections[i].top) {
              currentIdx = i;
            }
          }
          setActiveIndex((prev) => (prev !== currentIdx ? currentIdx : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sidebarItems]);

  const handleSectionClick = (index, label) => {
    setActiveIndex(index);
    if (label === "Overview") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (label === "Other Projects") {
      const el = document.getElementById("other-projects-section");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    // Match heading text inside case study article
    const allHeadings = document.querySelectorAll("article h2, article h3");
    for (const h of allHeadings) {
      const cleanText = h.innerText.replace(/^\d+[.\s-]*/, "").trim().toLowerCase();
      const labelLower = label.toLowerCase();
      if (cleanText.includes(labelLower) || labelLower.includes(cleanText)) {
        h.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    const caseStudyEl = document.getElementById("case-study-section");
    if (caseStudyEl) caseStudyEl.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (project?.name) {
      document.title = `${project.name} | Case Study`;
    }
  }, [project?.name]);

  if (isLoading) {
    return (
      <div>
        <ScrollIndicator color="#9676ce" />
        <ProjectArticleSkeleton />
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 opacity-60">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p className="font-mono text-sm">Could not load this case study.</p>
        <NavLink to="/project" className="text-[#9676ce] hover:underline text-sm font-mono">← Back to Projects</NavLink>
      </div>
    );
  }

  return (
    <div>
      <PageSeo
        title={`${project.name} Case Study`}
        description={project.summary || project.name}
        image={resolveImg(project.Thumbnail)}
        url={`https://sudarshankakde.tech/project/${project.slug}`}
      />

      <ScrollIndicator color="#9676ce" />
      {/* Main Layout Container with LineSidebar Table of Contents */}
      <div className="flex flex-col lg:flex-row w-full max-w-[90%] mx-auto gap-6 lg:gap-8 justify-center pt-2 pb-12">
        {/* Sidebar Column (stretches to full article height) */}
        <div className="hidden lg:block min-w-[200px] shrink-0">
          {/* Sticky Desktop LineSidebar ToC */}
          <div className="sticky top-24 z-20 pt-2">
            <LineSidebar
              items={sidebarItems}
              active={activeIndex}
              accentColor="#9676ce"
              textColor="#c4c4c4"
              markerColor="#6c6c6c"
              defaultActive={0}
              proximityRadius={120}
              maxShift={25}
              fontSize={1.0}
              onItemClick={(index, label) => handleSectionClick(index, label)}
            />
          </div>
        </div>

        <article className="flex-1 min-w-0 w-full overflow-hidden">
          {/* Breadcrumb */}
          <nav className="flex flex-row flex-wrap gap-2 items-center font-semibold text-sm md:mt-2 mb-4 text-white/50">
            <NavLink to="/project" className="hover:text-[#aed2ff] gap-1.5 flex items-center transition-colors duration-200">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z" />
              </svg>
              Projects
            </NavLink>
            <span className="opacity-40">/</span>
            <span className="text-white/80 truncate max-w-[200px] md:max-w-none">{project.name}</span>
          </nav>

          {/* Thumbnail Hero */}
          <div className="rounded-2xl overflow-hidden w-full mb-6 border border-white/5">
            <img
              src={resolveImg(project.Thumbnail)}
              alt={project.name}
              className="w-full object-cover"
              style={{ aspectRatio: "16/9" }}
              loading="eager"
              width="1200"
              height="675"
            />
          </div>

          {/* Project Meta Info Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-1.5">
                {project.name}
              </h1>
              <p className="text-sm font-mono text-[#aed2ff]">
                {project.projectType} &middot; {project.doneOn}
              </p>
            </div>

            {/* Direct Action Links */}
            <div className="flex flex-wrap gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#9676ce] to-[#7d57c1] text-white hover:opacity-90 transition-opacity duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Live Demo
                </a>
              )}
              {project.github_link && (
                <a
                  href={project.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                  </svg>
                  Repository
                </a>
              )}
            </div>
          </div>

          {/* Content & Case Study */}
          <div className="w-full mb-8">
            {/* Main Case Study Content */}
            <div id="case-study-section" className="w-full">
              {body ? (
                <div className="prose-blog text-white/85 leading-relaxed text-[15px]">
                  {parse(body)}
                </div>
              ) : (
                <div className="text-white/60 text-[15px] leading-relaxed">
                  <p>{project.summary}</p>
                  <div className="mt-6 border-l-2 border-[#9676ce]/50 pl-4 py-1 text-sm italic text-white/40">
                    Detailed Case Study description is currently being curated. Check out the Live Demo or GitHub repository to see the project in action!
                  </div>
                </div>
              )}
            </div>

            {/* Technologies & Stack Infinite Sliding Marquee Bar */}
            {(tools.length > 0 || project.skills) && (
              <div id="technologies-section" className="w-full mt-8 mb-4 border border-[#303034] black-gradient rounded-2xl p-4 overflow-hidden">
                <div className="flex items-center justify-between mb-3 px-1">
                  <h3 className="text-xs font-bold tracking-widest uppercase text-[#aed2ff] font-mono flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#9676ce] animate-ping"></span>
                    Technologies & Tools Stack
                  </h3>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                    {tools.length > 0 ? `${tools.length} Tools Used` : "Skills"}
                  </span>
                </div>

                <div className="scroller w-full" data-speed="fast" data-animated="true">
                  <ul className="scroller__inner flex items-center gap-3 py-1">
                    {tools.length > 0 ? (
                      tools.concat(tools).concat(tools).map((t, i) => (
                        <li key={i} className="group shrink-0 flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 hover:bg-white/10 hover:border-[#9676ce]/50 transition-all duration-300">
                          {t.logo ? (
                            <img
                              src={resolveImg(t.logo)}
                              alt={t.name}
                              className="w-5 h-5 object-contain brightness-0 invert opacity-75 group-hover:opacity-100 transition-opacity duration-200"
                              loading="lazy"
                            />
                          ) : (
                            <span className="text-xs">🛠</span>
                          )}
                          <div className="flex flex-col text-left">
                            <span className="text-xs font-semibold text-white tracking-tight leading-tight">{t.name}</span>
                            <span className="text-[9px] font-mono text-white/40 uppercase leading-none mt-0.5">{t.type}</span>
                          </div>
                        </li>
                      ))
                    ) : (
                      project.skills?.split(",").concat(project.skills?.split(",")).concat(project.skills?.split(",")).map((s, i) => (
                        <li key={i} className="shrink-0 flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9676ce]"></span>
                          <span className="text-xs font-mono text-white/90 capitalize">{s.trim()}</span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Other Projects Recommendation */}
          {otherProjects.length > 0 && (
            <div id="other-projects-section" className="w-full mt-8 pt-10 border-t border-white/10">
              <h3 className="text-2xl font-bold tracking-tight text-white mb-8 text-center md:text-left">
                Other Projects
              </h3>
              <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch w-full">
                {otherProjects.map((p, index) => (
                  <WorkSnippetCard
                    key={index}
                    slug={p.slug}
                    has_case_study={p.has_case_study}
                    Thumbnail={p.Thumbnail}
                    title={p.name}
                    link={p.link}
                    skills={p.skills}
                    projectType={p.projectType}
                  />
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}

export default ReadProject;
