import React, { useEffect, useState } from "react";
import { ApiBaseURL } from "../..";
import Background from "../Background";
import WorkSnippetCard from "../WorkSnippetCard";
import { TailSpin } from "react-loader-spinner";
import TallyForm from "../TallyForm";

function Project() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Projects";
    fetch(`${ApiBaseURL}api/projects?size=4`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProjects(data.data);
      });
  }, []);

  
  
  return (
    <>
      <div
        className="flex flex-col  items-center justify-center w-full  mb-36"
        data-scroll
      >
        <Background />
        <div className=" flex flex-col justify-center items-center gap-y-10 z-10">
          <div className="my-2 flex flex-col justify-center items-center  gap-y-3">
            <h2 className="md:text-6xl text-5xl font-Kalnia">Projects</h2>
            <p className="md:text-lg tracking-widest font-semibold opacity-75">
              Crafted With Love ❤️
            </p>
          </div>
          <div className="flex flex-row flex-wrap justify-center items-center gap-x-10 gap-y-10 ">
            {projects.length !== 0 ? (
              projects.map((project, index) => {
                return (
                  <>
                    <WorkSnippetCard
                      key={index}
                      Thumbnail={project.Thumbnail}
                      title={project.name}
                      link={project.link}
                      skills={project.skills}
                      projectType={project.projectType}
                    />
                  </>
                );
              })
            ) : (
              <div className="h-[65vh]  flex justify-center items-center">
                <TailSpin
                  height="36"
                  width="36"
                  color="#aed2ff"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            )}
          </div>
        </div>
        <div className="md:py-40 py-20"></div>
        <TallyForm/>
      </div>
      <div></div>
    </>
  );
}

export default Project;
