import React, { useEffect } from "react";
import { ApiBaseURL } from "../..";
import Background from "../Background";
import WorkSnippetCard from "../WorkSnippetCard";
import { TailSpin } from "react-loader-spinner";
import TallyForm from "../TallyForm";
import { useQuery } from "@tanstack/react-query";
import { PageSeo } from "../Seo";

function Project() {
  const { isLoading, isError, data } = useQuery({
    queryKey: "Projects",
    queryFn: () => {
      return fetch(`${ApiBaseURL}api/projects`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return data;
        });
    },
  });
  useEffect(() => {
    document.title = "Projects";
  }, []);

  return (
    <div   >
      <PageSeo title="Projects" description="A showcase of projects crafted by Sudarshan — web, apps and experiments." />
      <div
        className="flex flex-col  items-center justify-center w-full  mb-36"
        
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
            {!isLoading ? (
              data?.data.map((project, index) => {
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
            {isError ? (
              <p className="font-[400] tracking-tight text-center mb-5 mt-3  opacity-90 px-2   text-lg">
                Some Thing Interrupt While Loading My Crafted
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="md:py-40 py-20"></div>
        <TallyForm />
      </div>
      <div></div>
    </div>
  );
}

export default Project;
