import React, { useEffect } from "react";
import AboutMeCard from "../AboutMeCard";
import Background from "../Background";
import TallyForm from "../TallyForm";
import { PageSeo } from "../Seo";
import CircularGallery from "../CircularGallery";
import CardSwap, { Card } from "../CardSwap";
import { useQuery } from "@tanstack/react-query";
import { ApiBaseURL } from "../..";

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sudarshan Kakde",
  url: "https://sudarshankakde.tech/",
  sameAs: [
    "https://github.com/sudarshankakde",
    "https://www.linkedin.com/in/sudarshan-kakde"
  ],
  jobTitle: "AI/LLM Developer | Python Backend Engineer",
};

const defaultServices = [
  {
    title: "AI & LLM Integration",
    description: "Specialized in OpenAI LLM integration, prompt engineering, LangChain agentic workflows, and RAG systems to build intelligent AI-powered features and mock JSON generator APIs.",
    icon: "🤖"
  },
  {
    title: "Python Backend Architecture",
    description: "Designing scalable, high-performance backends with Django & FastAPI, managing complex async operations, PostgreSQL schema design, Redis caching, and RESTful API endpoints.",
    icon: "⚙️"
  },
  {
    title: "Full Stack & Frontend Development",
    description: "Building responsive, highly accessible web portals and interactive web applications using React, TypeScript, Tailwind CSS, GSAP micro-animations, and dynamic deep-linking.",
    icon: "💻"
  },
  {
    title: "System Reliability & Performance Tuning",
    description: "Optimizing database query execution, lazy loading, and Socket.io real-time events to improve system performance by 20-35% and maintain 99.9% application uptime.",
    icon: "⚡"
  },
  {
    title: "Cloud & DevOps Infrastructure",
    description: "Configuring Linux VPS environments with Nginx, Gunicorn, Docker containers, AWS (EC2, S3), and SSL security for reliable, high-availability deployments.",
    icon: "☁️"
  }
];

function About() {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    window.scrollTo(0,0);
    document.title = "About Me";

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data: galleryData } = useQuery({
    queryKey: ["GalleryImages"],
    queryFn: () =>
      fetch(`${ApiBaseURL}api/gallery`)
        .then((res) => res.json())
        .then((json) => json.data ?? []),
    staleTime: 1000 * 30,
  });

  const { data: aboutData } = useQuery({
    queryKey: ["AboutData"],
    queryFn: () =>
      fetch(`${ApiBaseURL}api/about`)
        .then((res) => res.json())
        .then((json) => json ?? {}),
    staleTime: 1000 * 30,
  });

  const galleryItems = Array.isArray(galleryData) && galleryData.length > 0 ? galleryData : undefined;
  const servicesList = aboutData?.services && aboutData.services.length > 0 ? aboutData.services : defaultServices;

  return (
    <div className="mb-24 text-center min-h-[100vh]">
      <PageSeo title="About" description="About Sudarshan Kakde — AI/LLM Developer, Python Backend Engineer, and Full Stack Developer based in Nagpur, India.">
        <script type="application/ld+json">{JSON.stringify(siteJsonLd)}</script>
      </PageSeo>
      <Background />

      {/* Top Borderless Auto-Rotating Circular Gallery */}
      <div className="w-full h-[480px] md:h-[550px] relative z-10 overflow-hidden pt-2 mb-2">
        <CircularGallery
          items={galleryItems}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.03}
          autoRotate={true}
          autoRotateSpeed={0.05}
        />
      </div>

      <div>
        <AboutMeCard
          title="About Me"
          aboutText={aboutData?.about_me}
          titleClasses="md:text-6xl text-5xl font-Kalnia z-50 select-none"
        />
      </div>

      {/* My Approach to Work on Projects Section */}
      <div className="my-24 w-[90%] max-w-7xl mx-auto z-10 relative">
        <h2 className="md:text-6xl text-5xl mb-4 font-Kalnia z-50 select-none">
          My Approach to Work
        </h2>
        <p className="text-white/60 text-sm md:text-base font-mono mb-16 max-w-2xl mx-auto">
          How I turn complex ideas into scalable, beautiful digital products step-by-step
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px]">
          {/* Left Column: Process Breakdown */}
          <div className=" flex-col gap-6 text-start hidden lg:flex">
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-[#9676ce]/40 transition-all duration-300">
              <span className="text-xs font-mono tracking-widest text-[#9676ce] uppercase font-bold">01. Discovery & Strategy</span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2">Understand the Core Problem</h3>
              <p className="text-sm text-white/70 leading-relaxed font-sans">
                Deep dive into product goals, target audience, technical constraints, and defining MVP requirements.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-[#9676ce]/40 transition-all duration-300">
              <span className="text-xs font-mono tracking-widest text-[#9676ce] uppercase font-bold">02. Architecture & Design</span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2">Component & Database Blueprint</h3>
              <p className="text-sm text-white/70 leading-relaxed font-sans">
                Craft clean React component trees, design systems, RESTful Django backend APIs, and efficient database schemas.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-[#9676ce]/40 transition-all duration-300">
              <span className="text-xs font-mono tracking-widest text-[#9676ce] uppercase font-bold">03. Development & Polish</span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2">Clean Code & Smooth Interactions</h3>
              <p className="text-sm text-white/70 leading-relaxed font-sans">
                Iterative building with modern WebGL/Canvas micro-animations, accessible UI, state management, and strict performance checks.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-[#9676ce]/40 transition-all duration-300">
              <span className="text-xs font-mono tracking-widest text-[#9676ce] uppercase font-bold">04. Deployment & Growth</span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2">Launch, Audit & Scale</h3>
              <p className="text-sm text-white/70 leading-relaxed font-sans">
                Production deployment on VPS with Nginx/Gunicorn, SSL certificates, performance optimization, and continuous updates.
              </p>
            </div>
          </div>

          {/* Right Column: CardSwap Component */}
          <div className="relative w-full h-[450px] flex items-center justify-center overflow-visible">
            <CardSwap
              width={340}
              height={380}
              cardDistance={35}
              verticalDistance={45}
              delay={isMobile ? 3500 : 4500}
              pauseOnHover={true}
              skewAmount={4}
            >
              <Card className="p-6 flex flex-col justify-between border border-[#9676ce]/30 bg-[#12101a] rounded-2xl shadow-2xl">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#9676ce]/20 flex items-center justify-center text-2xl mb-4">
                    💡
                  </div>
                  <span className="text-xs font-mono text-[#9676ce] tracking-widest uppercase font-bold">Step 01</span>
                  <h3 className="text-2xl font-bold text-white mt-1 mb-3">Discovery</h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Analyzing requirements, system constraints, user journeys, and establishing key milestones.
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-4 border-t border-white/10 text-xs font-mono text-white/40">
                  <span>Research</span> &bull; <span>Strategy</span> &bull; <span>Scope</span>
                </div>
              </Card>

              <Card className="p-6 flex flex-col justify-between border border-[#9676ce]/30 bg-[#12101a] rounded-2xl shadow-2xl">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#9676ce]/20 flex items-center justify-center text-2xl mb-4">
                    🎨
                  </div>
                  <span className="text-xs font-mono text-[#9676ce] tracking-widest uppercase font-bold">Step 02</span>
                  <h3 className="text-2xl font-bold text-white mt-1 mb-3">Architecture</h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Structuring API schemas, reusable React components, and responsive design systems.
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-4 border-t border-white/10 text-xs font-mono text-white/40">
                  <span>UI/UX</span> &bull; <span>APIs</span> &bull; <span>DB Schema</span>
                </div>
              </Card>

              <Card className="p-6 flex flex-col justify-between border border-[#9676ce]/30 bg-[#12101a] rounded-2xl shadow-2xl">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#9676ce]/20 flex items-center justify-center text-2xl mb-4">
                    ⚡
                  </div>
                  <span className="text-xs font-mono text-[#9676ce] tracking-widest uppercase font-bold">Step 03</span>
                  <h3 className="text-2xl font-bold text-white mt-1 mb-3">Execution</h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Writing clean modular code, adding micro-interactions, and optimizing bundle performance.
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-4 border-t border-white/10 text-xs font-mono text-white/40">
                  <span>React</span> &bull; <span>Django</span> &bull; <span>WebGL</span>
                </div>
              </Card>

              <Card className="p-6 flex flex-col justify-between border border-[#9676ce]/30 bg-[#12101a] rounded-2xl shadow-2xl">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#9676ce]/20 flex items-center justify-center text-2xl mb-4">
                    🚀
                  </div>
                  <span className="text-xs font-mono text-[#9676ce] tracking-widest uppercase font-bold">Step 04</span>
                  <h3 className="text-2xl font-bold text-white mt-1 mb-3">Deployment</h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Production VPS hosting, SSL security, performance tuning, and analytics integration.
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-4 border-t border-white/10 text-xs font-mono text-white/40">
                  <span>Nginx</span> &bull; <span>VPS</span> &bull; <span>Analytics</span>
                </div>
              </Card>
            </CardSwap>
          </div>
        </div>
      </div>

      {/* Dynamic Services Section */}
      <div className="my-24 w-[90%] max-w-7xl mx-auto z-10 relative">
        <h2 className="md:text-6xl text-5xl mb-4 font-Kalnia z-50 select-none">
          Services & Expertise
        </h2>
        <p className="text-white/60 text-sm md:text-base font-mono mb-16 max-w-2xl mx-auto">
          Tailored technical solutions
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-start">
          {servicesList.map((service, index) => (
            <div
              key={service.id || index}
              className="relative p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl hover:border-[#9676ce]/50 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#9676ce]/25 to-[#7d57c1]/10 border border-[#9676ce]/30 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                    {service.icon || "💻"}
                  </div>
                  <span className="text-2xl font-mono font-bold text-white/20 group-hover:text-[#9676ce]/60 transition-colors duration-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#9676ce] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed font-sans">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="md:py-16 py-8"></div>
      <TallyForm />
    </div>
  );
}

export default About;
