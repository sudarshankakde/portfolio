import React from "react";
import parse from "html-react-parser";
import ScrollReveal from "./ScrollReveal";

export default function AboutMeCard(props) {
  const defaultText = `<p>Hello, I am <strong>Sudarshan Kakde</strong> — an <strong>AI/LLM Developer</strong> and <strong>Python Backend Engineer</strong> based in Nagpur, India. With 1.5+ years of hands-on experience in full-stack web applications, system optimization, and API reliability, I specialize in <strong>LLM Integration (OpenAI, LangChain, RAG Systems)</strong>, scalable Django & Python architectures, and modern React interfaces. I hold a B.Tech in Artificial Intelligence (CGPA 8.01) and am passionate about building agentic AI workflows and high-availability backend systems.</p>`;

  const rawContent = props.aboutText || defaultText;
  const parsedNodes = typeof rawContent === "string" ? parse(rawContent) : rawContent;

  return (
    <div className="flex flex-col gap-y-4 justify-center items-center w-full my-8 mx-auto text-center">
      <h2 className={props.titleClasses}>{props.title}</h2>
      <div className="md:w-[88%] w-[95%] max-w-6xl mx-auto flex flex-col justify-center items-center text-center">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={8}
          containerClassName="w-full"
          textClassName="text-white font-sans font-semibold md:font-bold tracking-tight"
        >
          {parsedNodes}
        </ScrollReveal>
      </div>
    </div>
  );
}
