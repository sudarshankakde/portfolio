import React, { useEffect, useState } from "react";
import Background from "../Background";
import { gsap, CSSPlugin, Expo } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import CertificateModal from "../CertificateModal";
import StatsCounter from "../StatsCounter";
import { TailSpin } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";
import { ApiBaseURL } from "../..";
import { PageSeo } from "../Seo";
import { useMemo } from "react";

gsap.registerPlugin(CSSPlugin, ScrollTrigger);

export default function Experience() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const { isLoading, isError, data } = useQuery({
    queryKey: "Experiences",
    queryFn: () => {
      return fetch(`${ApiBaseURL}api/experience`)
        .then((res) => res.json())
        .then((data) => data);
    },
  });

  const experiences = useMemo(() => data?.data || [], [data]);
  const experienceStats = data?.stats
    ? Object.entries(data.stats).map(([label, value]) => ({ label, value }))
    : [
        { label: "Offer Letters", value: 0 },
        { label: "Internships", value: 0 },
        { label: "Projects", value: 0 },
      ];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Experience - Sudarshan Kakde";
  }, []);

  useEffect(() => {
    if (!isLoading && !isError && experiences.length > 0) {
      const t1 = gsap.timeline();
      t1.to(
        ".ExperienceItem",
        {
          opacity: 1,
          stagger: 0.15,
          ease: Expo.easeInOut,
          duration: 0.6,
        },
        t1.to(".ExperienceSubItem", {
          opacity: 0.75,
          stagger: 0.15,
          ease: Expo.easeInOut,
          duration: 0.6,
        })
      );
    }
  }, [isLoading, isError, experiences]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <PageSeo title="Experience" description="Professional experience, roles and projects by Sudarshan Kakde." />
      <Background />
      <div className="my-10 flex flex-col justify-center items-center gap-y-3">
        <div className="flex flex-col justify-center items-center gap-y-3">
          <h2 className="md:text-6xl text-5xl font-Kalnia ExperienceItem opacity-0">
            Experience
          </h2>
          <p className="md:text-lg tracking-widest font-semibold  ExperienceSubItem text-center opacity-0">
            My professional journey and the experiences that have shaped my
            career.
          </p>
        </div>
      </div>
      <StatsCounter stats={experienceStats} />
      {isLoading ? (
        <div className="h-[65vh] flex justify-center items-center">
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
      ) : isError ? (
        <div className="h-[65vh] flex justify-center items-center">
          <p className="font-[400] tracking-tight text-center opacity-90 px-2 text-lg">
            Something went wrong while loading experience data
          </p>
        </div>
      ) : (
        <>
          <div className="max-w-5xl mx-auto px-4 md:px-8 pt-15 pb-16 relative z-10">
            <div className="space-y-16 relative">
              <div className="absolute left-3 md:left-4 top-8 bottom-0 w-0.5 bg-gradient-to-b from-[#aed2ff] via-[#ceade6] to-[#aed2ff] hidden md:block"></div>

              {experiences.map((experience, index) => (
                <div
                  key={index}
                  className="group relative ExperienceItem opacity-0"
                >
                  <div className="absolute top-5 left-1 h-6 w-6 rounded-full bg-gradient-to-r from-[#aed2ff] to-[#ceade6] z-10 group-hover:scale-125 transition-transform duration-300 hidden md:block">
                    <div className="absolute inset-0 -r rounded-full bg-gradient-to-r from-[#aed2ff] to-[#ceade6] animate-ping opacity-75"></div>
                  </div>

                  <div
                    className={`ml-0 md:ml-12 relative overflow-hidden rounded-lg p-6 border border-gray-800 bg-black/50 backdrop-blur-sm transition-all duration-500 group-hover:border-[#aed2ff] group-hover:shadow-[0_0_25px_rgba(174,210,255,0.25)] ${
                      experience.certificate_url ? "cursor-pointer" : ""
                    }`}
                    onClick={() =>
                      experience.certificate_url &&
                      setSelectedCertificate(experience)
                    }
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-6">
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl md:text-3xl font-bold group-hover:text-[#aed2ff] transition-all duration-300">
                          {experience.role}
                        </h3>
                        {experience.certificate_url && (
                          <div className="relative group/tooltip">
                            <svg
                              className="w-6 h-6 text-[#aed2ff] animate-pulse"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                              />
                            </svg>
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-sm px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                              Click to view certificate
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="text-[#aed2ff] font-medium px-4 py-1.5 rounded-full bg-[#aed2ff]/10 text-sm md:text-base border border-[#aed2ff]/20 group-hover:bg-[#aed2ff]/20 transition-colors duration-300">
                        {experience.period}
                      </span>
                    </div>

                    <div className="text-xl md:text-2xl text-gray-300 mb-6 group-hover:text-white transition-colors duration-300">
                      {experience.company}
                    </div>

                    <ul className="list-none  space-y-3 text-[#9B96B0]">
                      {experience.responsibilities.map(
                        (responsibility, idx) => (
                          <li
                            key={idx}
                            className="flex items-center  group/item"
                          >
                            <div className="mr-3 h-1.5 w-1.5 rounded-full bg-[#aed2ff] flex-shrink-0 group-hover/item:bg-[#ceade6] transition-colors"></div>
                            <span className="group-hover/item:text-gray-300 transition-colors duration-300">
                              {responsibility}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <CertificateModal
            isOpen={!!selectedCertificate}
            onClose={() => setSelectedCertificate(null)}
            certificate_url={selectedCertificate?.certificate_url}
            title={`${selectedCertificate?.role} at ${selectedCertificate?.company}`}
          />
        </>
      )}
    </div>
  );
}
