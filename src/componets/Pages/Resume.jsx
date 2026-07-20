import React from "react";
import { PageSeo } from "../Seo";
import { useQuery } from "@tanstack/react-query";
import { ApiBaseURL } from "../..";

function Resume() {
  const { data: resumeData, isLoading } = useQuery({
    queryKey: ["resumeUrl"],
    queryFn: () => {
      return fetch(`${ApiBaseURL}api/resume`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch resume");
          return res.json();
        })
        .catch(() => ({ resume_url: "https://drive.google.com/file/d/1C6qN9ymexmav2f-WFrlywPaf6kstnfcR/preview" }));
    },
    staleTime: 1000 * 60 * 60 * 24, // cache for 24h
  });

  const resumeUrl = resumeData?.resume_url || "https://drive.google.com/file/d/1C6qN9ymexmav2f-WFrlywPaf6kstnfcR/preview";

  return (
    <>
      <PageSeo title="Resume" description="Resume of Sudarshan Kakde — Full Stack Developer." />
        <div className="flex flex-col justify-center items-center  gap-y-3 my-7">
          <h2 className="md:text-6xl text-5xl font-Kalnia uppercase">My resume</h2>
          <p className="md:text-lg tracking-widest font-semibold opacity-75 capitalize">
            You Can Hire Me Now!
          </p>
        </div>
      <div className="md:w-[60vw] w-[90vw]  p-2 rounded-lg mx-auto min-h-screen my-10  border border-[#303034] relative bg-black/20">
        {isLoading ? (
          <div className="h-screen w-full bg-[#2a2a30] animate-pulse rounded-lg" />
        ) : (
          <iframe
            title="resume"
            src={resumeUrl}
            className="h-screen w-full rounded-lg"
            allow="autoplay"
          />
        )}
      </div>
    </>
  );
}

export default Resume;
