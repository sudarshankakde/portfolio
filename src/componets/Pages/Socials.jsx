import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ApiBaseURL } from "../..";
import { PageSeo } from "../Seo";
import Background from "../Background";
import parse from "html-react-parser";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// SpotlightCard integrates with the theme's glassmorphism style, mouse tracking glow, and 3D Perspective Tilt
const SpotlightCard = ({ children, className = "", color = "rgba(150, 118, 206, 0.15)", onClick, ...props }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    // Calculate rotation relative to the center of the card
    const width = rect.width;
    const height = rect.height;
    const centerX = x - width / 2;
    const centerY = y - height / 2;
    
    const rotateX = (centerY / (height / 2)) * 4;
    const rotateY = -(centerX / (width / 2)) * 4;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        scale: isHovered ? 1.012 : 1,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 220px at ${coords.x}px ${coords.y}px, ${color}, transparent)`,
        }}
      />
      <div className="relative z-10 h-full flex flex-col justify-between" style={{ transform: "translateZ(15px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

export default function Socials() {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  
  // Leaflet refs to handle initialization, cleanup, and dynamic panning updates
  const mapContainerRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markerRef = useRef(null);

  // Real-time ticking digital clock for user's timezone
  useEffect(() => {
    const updateClock = () => {
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Date().toLocaleTimeString("en-US", options));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Nagpur, Maharashtra — fixed location
  const lat = 21.1458;
  const lng = 79.0882;
  const locName = "Nagpur, India";

  // Time-based status that switches mood automatically based on IST hour
  const getTimeBasedStatus = () => {
    const now = new Date();
    const istHour = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })).getHours();

    if (istHour >= 0 && istHour < 6) return { emoji: "😴", mood: "Sleeping" };
    if (istHour >= 6 && istHour < 8) return { emoji: "🏃", mood: "Morning Routine" };
    if (istHour >= 8 && istHour < 12) return { emoji: "💻", mood: "Coding" };
    if (istHour >= 12 && istHour < 13) return { emoji: "🍱", mood: "Lunch Break" };
    if (istHour >= 13 && istHour < 17) return { emoji: "⚡", mood: "Building Projects" };
    if (istHour >= 17 && istHour < 19) return { emoji: "📚", mood: "Studying" };
    if (istHour >= 19 && istHour < 21) return { emoji: "🎮", mood: "Chilling" };
    return { emoji: "🌙", mood: "Winding Down" };
  };

  const currentStatus = getTimeBasedStatus();

  // Query free public weather data from Open-Meteo based on mobile device coordinates
  const { data: weatherData } = useQuery({
    queryKey: ["WeatherStatus", lat, lng],
    queryFn: () => {
      return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`)
        .then((res) => res.json())
        .then((data) => data.current_weather);
    },
    enabled: !!lat && !!lng,
  });

  // Re-initialize or update Leaflet map with CartoDB Voyager tiles (Become a Dinosaur style)
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Create Leaflet map container if it doesn't exist
    if (!leafletMapRef.current) {
      leafletMapRef.current = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: 13,
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        touchZoom: false,
      });

      // Add CartoDB Voyager tile layer which matches the warm beige/teal 'Become a Dinosaur' color scheme
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
      }).addTo(leafletMapRef.current);

      // Pulse green marker pin
      const pulseIcon = L.divIcon({
        html: `<div class="relative flex items-center justify-center">
                 <div class="absolute w-6 h-6 bg-[#22c55e] rounded-full opacity-40 animate-ping"></div>
                 <div class="w-3.5 h-3.5 bg-[#22c55e] rounded-full border-2 border-white shadow-md relative z-10"></div>
               </div>`,
        className: "custom-pulsing-marker",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      markerRef.current = L.marker([lat, lng], { icon: pulseIcon }).addTo(leafletMapRef.current);
    } else {
      // Dynamic updates without full map reinitialization
      leafletMapRef.current.setView([lat, lng], 13);
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      }
    }

    // Leaflet map cleanup on unmount
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
        markerRef.current = null;
      }
    };
  }, [lat, lng]);



  // Query overall GitHub Profile Statistics (Stars, Forks, Repos, Followers)
  const { data: githubProfile } = useQuery({
    queryKey: ["GitHubProfileStats"],
    queryFn: async () => {
      try {
        const userRes = await fetch("https://api.github.com/users/sudarshankakde");
        if (!userRes.ok) throw new Error("API Limit or user not found");
        const userData = await userRes.json();
        
        const reposRes = await fetch("https://api.github.com/users/sudarshankakde/repos?per_page=100");
        if (!reposRes.ok) throw new Error("API Limit or repos not found");
        const reposData = await reposRes.json();
        
        let totalStars = 0;
        let totalForks = 0;
        if (Array.isArray(reposData)) {
          reposData.forEach(r => {
            totalStars += r.stargazers_count || 0;
            totalForks += r.forks_count || 0;
          });
        }
        
        return {
          followers: userData.followers || 0,
          publicRepos: userData.public_repos || 0,
          totalStars,
          totalForks,
        };
      } catch (err) {
        return null;
      }
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
  });

  // Query GitHub Commits Participation Stats (Commits counts over 52 weeks)
  const { data: githubCommitStats } = useQuery({
    queryKey: ["GitHubCommitStats"],
    queryFn: () => {
      return fetch("https://api.github.com/repos/sudarshankakde/portfolio/stats/participation")
        .then((res) => {
          if (!res.ok) throw new Error("API limit exceeded");
          return res.json();
        })
        .then((data) => {
          if (data && data.owner) {
            const last10Weeks = data.owner.slice(-10);
            const totalCommits = last10Weeks.reduce((a, b) => a + b, 0);
            return { totalCommits, history: last10Weeks };
          }
          return null;
        })
        .catch(() => null);
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
  });

  // Query GitHub Commit Activity stats to fetch current week count & weekly average commits
  const { data: githubCommitActivity } = useQuery({
    queryKey: ["GitHubCommitActivity"],
    queryFn: () => {
      return fetch("https://api.github.com/repos/sudarshankakde/portfolio/stats/commit_activity")
        .then((res) => {
          if (!res.ok) throw new Error("Stats not ready");
          return res.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            const last10 = data.slice(-10);
            const currentWeekCommits = last10[last10.length - 1]?.total || 0;
            const avgCommits = (last10.reduce((sum, w) => sum + w.total, 0) / 10).toFixed(1);
            return { currentWeekCommits, avgCommits };
          }
          return null;
        })
        .catch(() => null);
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("sudarshankakde1111@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Staggered entry animation variants using Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
      },
    },
  };

  // Fetch blogs list using react-query to populate the "Recent Post" bento card
  const { isLoading: blogsLoading, data: blogsData } = useQuery({
    queryKey: ["Blogs"],
    queryFn: () => {
      return fetch(`${ApiBaseURL}api/blogs`)
        .then((res) => res.json())
        .then((data) => data);
    },
  });

  const recentBlog = blogsData?.data && blogsData.data.length > 0 ? blogsData.data[0] : null;

  // Map Open-Meteo weather codes to descriptive text and emojis
  const getWeatherInfo = (code) => {
    if (code === undefined || code === null) return { emoji: "🌤️", desc: "Sunny" };
    switch (code) {
      case 0: return { emoji: "☀️", desc: "Clear Sky" };
      case 1:
      case 2:
      case 3: return { emoji: "🌤️", desc: "Partly Cloudy" };
      case 45:
      case 48: return { emoji: "🌫️", desc: "Foggy" };
      case 51:
      case 53:
      case 55: return { emoji: "🌧️", desc: "Light Drizzle" };
      case 61:
      case 63:
      case 65: return { emoji: "🌧️", desc: "Rainy" };
      case 71:
      case 73:
      case 75: return { emoji: "❄️", desc: "Snowy" };
      case 80:
      case 81:
      case 82: return { emoji: "🌦️", desc: "Rain Showers" };
      case 95:
      case 96:
      case 99: return { emoji: "⛈️", desc: "Thunderstorm" };
      default: return { emoji: "🌤️", desc: "Partly Cloudy" };
    }
  };

  const weatherInfo = getWeatherInfo(weatherData?.weathercode);

  // Bento layout items matching perfect row packing grid mathematics.
  // Row 1: Location Map (2) + Clock (1) = 3
  // Row 2: GitHub (2) + Email (1) = 3
  // Row 3 & 4 (Left): Recent Post (2 cols, spans 2 rows) = 2
  // Row 3 (Right): Instagram (1 col, spans 1 row) = 1 (fills Row 3)
  // Row 4 (Right): LinkedIn (1 col, spans 1 row) = 1 (fills Row 4, stacking directly below Instagram)
  const socialLinks = [
    {
      id: "location-map",
      name: "Location",
      isMap: true,
      spotlightColor: "rgba(34, 197, 94, 0.12)",
      size: "md:col-span-2 md:row-span-1", // Spans 2 columns, on the very top of the grid
      badge: "BASE",
    },
    {
      id: "local-clock",
      name: "Local Time",
      isClock: true,
      spotlightColor: "rgba(59, 130, 246, 0.12)",
      size: "md:col-span-1 md:row-span-1",
      badge: "LIVE",
    },
    {
      id: "github",
      name: "GitHub",
      url: "https://github.com/sudarshankakde",
      username: "@sudarshankakde",
      desc: "Source code repositories, personal projects, and open-source contributions.",
      spotlightColor: "rgba(255, 255, 255, 0.08)",
      iconClass: "bi bi-github text-[#dadada]",
      size: "md:col-span-2 md:row-span-1", // Wide format in row 2
      badge: "CODE",
    },
    {
      id: "email",
      name: "Email Address",
      isEmail: true,
      username: "sudarshankakde1111@gmail.com",
      desc: "Drop me an email directly for collaboration. Click to copy.",
      spotlightColor: "rgba(150, 118, 206, 0.15)",
      iconClass: "bi bi-envelope-at text-[#aed2ff]",
      size: "md:col-span-1 md:row-span-1", // Compact 1-column layout in row 2
      badge: "DIRECT",
    },
    {
      id: "recent-post",
      name: "Recent Post",
      isRecentPost: true,
      spotlightColor: "rgba(150, 118, 206, 0.15)",
      size: "md:col-span-2 md:row-span-2", // Double row span
      badge: "BLOG",
    },
    {
      id: "instagram",
      name: "Instagram",
      url: "https://instagram.com/sudarshan_kakde_",
      username: "@sudarshan_kakde_",
      desc: "Coding updates and daily life stories.",
      spotlightColor: "rgba(225, 48, 108, 0.12)",
      iconClass: "bi bi-instagram text-[#dadada]",
      size: "md:col-span-1 md:row-span-1", // Spans 1 row
      badge: "LIFE",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      url: "https://linkedin.com/in/sudarshan-kakde-510b15194",
      username: "Sudarshan Kakde",
      desc: "Professional connections.",
      spotlightColor: "rgba(0, 119, 181, 0.12)",
      iconClass: "bi bi-linkedin text-[#dadada]",
      size: "md:col-span-1 md:row-span-1", // Spans 1 row, stacks directly below Instagram!
      badge: "CAREER",
    },
  ];

  return (
    <>
      <PageSeo
        title="Socials"
        description="Connect with Sudarshan Kakde across social media networks, GitHub and email."
      />
      {/* Self-contained CSS stylesheet for Leaflet map custom saturation */}
      <style>{`
        /* Apply slight saturation/brightness filters to make CartoDB Voyager tiles map look exactly like Snazzy Maps Become a Dinosaur */
        .leaflet-container {
          background: #f5f5f2 !important;
        }
        .become-a-dinosaur-map .leaflet-tile-pane {
          filter: brightness(1.02) contrast(1.02) saturate(0.95);
        }
      `}</style>

      <div className="min-h-screen pb-20 relative overflow-hidden text-[#dadada]">
        <Background />

        {/* Unified header layout spacing */}
        <div className="my-10 flex flex-col justify-center items-center gap-y-3 text-center">
          {/* Header styling matching blogs-gradient theme standard */}
          <h2 className="md:text-6xl text-5xl font-Kalnia uppercase tracking-tight text-white from-[#9676ce] to-[#7d57c1] bg-gradient-to-r bg-clip-text text-transparent px-5 py-3">
            Socials
          </h2>
          <p className="md:text-lg tracking-widest font-semibold text-[#aed2ff] uppercase">
            FIND ME ACROSS THE WEB
          </p>
        </div>

        {/* Bento Grid structured in the theme's glassmorphism style */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-[90%] md:w-full px-4 md:px-0"
        >
          <AnimatePresence mode="popLayout">
            {socialLinks.map((social) => {
              
              // Email Card (Compact 1-column layout)
              if (social.isEmail) {
                return (
                  <SpotlightCard
                    key={social.id}
                    layout
                    variants={cardVariants}
                    exit={{ opacity: 0, scale: 0.95 }}
                    color={social.spotlightColor}
                    className={`black-gradient border border-[#303034] rounded-3xl p-6 cursor-pointer flex flex-col justify-between min-h-[220px] ${social.size}`}
                    onClick={handleCopyEmail}
                  >
                    <div className="flex flex-row justify-between items-start w-full">
                      <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5 flex items-center justify-center">
                        <i className={`${social.iconClass} text-3xl`}></i>
                      </div>
                      <motion.button
                        animate={{
                          scale: copied ? [1, 1.1, 1] : 1,
                          backgroundColor: copied ? "rgba(34, 197, 94, 0.2)" : "rgba(255, 255, 255, 0.05)",
                          borderColor: copied ? "rgba(34, 197, 94, 0.5)" : "rgba(255, 255, 255, 0.1)",
                        }}
                        className="px-3 py-1.5 text-[10px] font-semibold rounded-full border border-white/10 text-white flex items-center gap-1 shadow-sm"
                      >
                        {copied ? (
                          <>
                            <i className="bi bi-check-lg text-sm text-green-400"></i>
                            Copied!
                          </>
                        ) : (
                          <>
                            <i className="bi bi-copy text-xs"></i>
                            Copy
                          </>
                        )}
                      </motion.button>
                    </div>
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold text-white uppercase tracking-wide leading-none">
                        {social.name}
                      </h3>
                      <p className="text-[#aed2ff] text-xs font-mono mt-1.5">{social.username}</p>
                      <p className="text-gray-300 mt-2.5 text-xs leading-relaxed">
                        {social.desc}
                      </p>
                    </div>
                  </SpotlightCard>
                );
              }

              // Dynamic Ticking Clock Card with Mood Status
              if (social.isClock) {
                const moodEmoji = currentStatus.emoji;
                const moodText = currentStatus.mood;

                return (
                  <SpotlightCard
                    key={social.id}
                    layout
                    variants={cardVariants}
                    exit={{ opacity: 0, scale: 0.95 }}
                    color={social.spotlightColor}
                    className={`black-gradient border border-[#303034] rounded-3xl p-6 flex flex-col justify-between min-h-[220px] ${social.size}`}
                  >
                    <div className="flex flex-row justify-between items-center w-full">
                      <span className="text-[#3b8ef4] text-[10px] font-semibold font-mono bg-white/5 border border-white/5 px-2.5 py-0.5 uppercase tracking-wider">
                        {social.badge}
                      </span>
                      <span className="text-lg">{moodEmoji}</span>
                    </div>

                    <div className="my-2 text-left">
                      <div className="text-3xl font-mono font-bold text-white tracking-tighter tabular-nums leading-none">
                        {currentTime || "00:00:00 AM"}
                      </div>
                      <p className="text-[#aed2ff] text-[10px] font-semibold tracking-wider uppercase mt-1">
                        Local Time
                      </p>
                    </div>

                    <div className="text-gray-400 text-[11px] leading-tight flex items-center gap-1 mt-1">
                      <span>Status:</span>
                      <span className="text-white font-medium capitalize">{moodText}</span>
                    </div>
                  </SpotlightCard>
                );
              }

              // Dynamic Recent Blog Post Card
              if (social.isRecentPost) {
                return (
                  <SpotlightCard
                    key={social.id}
                    layout
                    variants={cardVariants}
                    exit={{ opacity: 0, scale: 0.95 }}
                    color={social.spotlightColor}
                    className={`black-gradient border border-[#303034] rounded-3xl p-6 flex flex-col justify-between min-h-[220px] ${social.size}`}
                  >
                    {blogsLoading ? (
                      <div className="w-full h-full flex flex-col justify-between animate-pulse">
                        <div className="flex justify-between items-center w-full">
                          <div className="h-6 w-32 bg-white/10 rounded"></div>
                          <div className="h-5 w-16 bg-white/10 rounded-full"></div>
                        </div>
                        <div className="h-4 w-3/4 bg-white/10 rounded mt-4"></div>
                        <div className="h-3 w-5/6 bg-white/10 rounded mt-2"></div>
                      </div>
                    ) : recentBlog ? (
                      <Link to={`/blog/${recentBlog.slug}`} className="flex flex-col justify-between h-full group">
                        <div className="flex flex-row justify-between items-start w-full">
                          <div className="flex flex-row gap-3 items-center">
                            <span className="text-[#9676ce] text-[10px] font-semibold font-mono bg-white/5 border border-white/5 px-2.5 py-0.5 uppercase tracking-wider">
                              {social.badge}
                            </span>
                            <span className="text-gray-400 text-xs font-mono">
                              {new Date(recentBlog.publish_date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="text-gray-400 text-xs font-semibold font-mono bg-white/5 border border-white/5 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 group-hover:text-white transition-colors">
                            Read
                            <i className="bi bi-arrow-up-right text-[10px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"></i>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-col justify-between flex-1">
                          <img src={recentBlog.image} className="w-full h-[20px] md:h-[250px] rounded-2xl mb-3 object-cover" alt={recentBlog.alt_text} />
                          <div>
                            <h3 className="text-xl font-semibold text-white uppercase tracking-wide group-hover:text-[#aed2ff] transition-colors line-clamp-1">
                              {recentBlog.title}
                            </h3>
                            <div className="text-gray-300 mt-2 text-sm leading-relaxed line-clamp-4">
                              {recentBlog.summary ? parse(recentBlog.summary.toString()) : recentBlog.excerpt || "Click to read this article in full."}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      // Fallback when no posts exist
                      <div className="flex flex-col justify-between h-full">
                        <div className="flex flex-row justify-between items-start w-full">
                          <span className="text-gray-400 text-[10px] font-semibold font-mono bg-white/5 border border-white/5 px-2.5 py-0.5 uppercase tracking-wider">
                            {social.badge}
                          </span>
                        </div>
                        <div className="mt-4">
                          <h3 className="text-xl font-semibold text-white uppercase tracking-wide">
                            No articles found
                          </h3>
                          <p className="text-gray-300 mt-2 text-sm leading-relaxed">
                            Stay tuned! I will be writing and sharing tech posts very soon.
                          </p>
                        </div>
                      </div>
                    )}
                  </SpotlightCard>
                );
              }

              // Dynamic Coordinates Map & Weather Card (Wide 2-column format aligned at the top of the grid)
              if (social.isMap) {
                return (
                  <SpotlightCard
                    key={social.id}
                    layout
                    variants={cardVariants}
                    exit={{ opacity: 0, scale: 0.95 }}
                    color={social.spotlightColor}
                    className={`black-gradient border border-[#303034] rounded-3xl p-6 min-h-[220px] flex flex-col justify-between ${social.size}`}
                  >
                    <div className="flex flex-col md:flex-row items-stretch justify-between h-full gap-6 w-full relative">
                      {/* Left: Map Frame */}
                      <div className="flex-[1.8] min-h-[160px] md:min-h-0 rounded-2xl border border-white/10 overflow-hidden relative become-a-dinosaur-map bg-[#f5f5f2]">
                        <div ref={mapContainerRef} className="w-full h-full absolute inset-0" />
                      </div>

                      {/* Right: Info Panel */}
                      <div className="flex-1 flex flex-col justify-between pl-0 md:pl-6 md:border-l border-white/5">
                        <div className="flex justify-between items-center w-full">
                          <span className="text-[#22c55e] text-[10px] font-semibold font-mono bg-[#22c55e]/15 border border-[#22c55e]/30 px-2 py-0.5 uppercase tracking-wider rounded-md">
                            {social.badge}
                          </span>
                          {weatherData && (
                            <span className="text-white text-xs font-semibold font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 select-none">
                              {weatherInfo.emoji} {weatherData.temperature}°C
                            </span>
                          )}
                        </div>

                        <div className="mt-4 md:mt-0 pt-3 md:pt-0">
                          <h4 className="font-semibold text-white tracking-wide text-sm uppercase leading-none line-clamp-1">
                            {locName}
                          </h4>
                          <p className="text-[10px] text-gray-400 mt-1.5 font-mono uppercase">
                            {lat.toFixed(4)}° N, {lng.toFixed(4)}° E
                          </p>

                          {weatherData && (
                            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                              <div>
                                <p className="text-[9px] text-[#aed2ff] uppercase font-mono tracking-wider">Weather</p>
                                <p className="text-white font-medium capitalize mt-0.5">{weatherInfo.desc}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-[9px] text-gray-400 font-mono">Wind Speed</p>
                                <p className="text-white font-medium mt-0.5">{weatherData.windspeed} km/h</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                );
              }

              // Dynamic Live GitHub Stats & Sparkline Card (2-column layout)
              if (social.id === "github") {
                const fallbackHistory = [
                  [0, 1200, -800],
                  [0, 2400, -1200],
                  [0, 1800, -900],
                  [0, 3100, -1500],
                  [0, 2900, -800],
                  [0, 4200, -2200],
                  [0, 3800, -1900],
                  [0, 5100, -2500],
                  [0, 4700, -1800],
                ];
                const totalStars = githubProfile ? githubProfile.totalStars : 35;
                const totalForks = githubProfile ? githubProfile.totalForks : 8;
                const publicRepos = githubProfile ? githubProfile.publicRepos : 15;
                const followers = githubProfile ? githubProfile.followers : 12;
                const currentWeekCommits = githubCommitActivity ? githubCommitActivity.currentWeekCommits : 5;
                const avgCommits = githubCommitActivity ? githubCommitActivity.avgCommits : 4.8;

                const hasStats = githubCommitStats &&
                  githubCommitStats.history &&
                  githubCommitStats.history.length > 0 &&
                  Array.isArray(githubCommitStats.history[0]);
                const additions = hasStats ? githubCommitStats.totalAdditions : 35420;
                const deletions = hasStats ? githubCommitStats.totalDeletions : 18210;

                const historySum = hasStats ? githubCommitStats.history.reduce((sum, [_, a, d]) => sum + a + Math.abs(d), 0) : 0;
                const history = (hasStats && historySum > 0) ? githubCommitStats.history : fallbackHistory;

                return (
                  <SpotlightCard
                    key={social.id}
                    layout
                    variants={cardVariants}
                    exit={{ opacity: 0, scale: 0.95 }}
                    color={social.spotlightColor}
                    className={`black-gradient border border-[#303034] rounded-3xl p-6 min-h-[220px] ${social.size}`}
                  >
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col md:flex-row justify-between h-full group gap-6"
                    >
                      {/* Left side: Repo Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex flex-row justify-between items-start w-full">
                          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5 flex items-center justify-center">
                            <i className={`${social.iconClass} text-3xl`}></i>
                          </div>
                          <div className="md:hidden text-gray-400 text-xs font-semibold font-mono bg-white/5 border border-white/5 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 group-hover:text-white transition-colors">
                            VISIT
                            <i className="bi bi-arrow-up-right text-[10px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"></i>
                          </div>
                        </div>

                        <div className="mt-4 md:mt-0">
                          <h3 className="text-xl font-semibold text-white uppercase tracking-wide group-hover:text-[#aed2ff] transition-colors duration-300">
                            {social.name}
                          </h3>
                          <p className="text-[#aed2ff]/70 text-xs mt-1.5 font-mono">{social.username}</p>
                          
                          {/* Rich GitHub Profile Statistics Badges */}
                          <div className="flex flex-wrap gap-2 mt-4 select-none">
                            <span className="text-[10px] font-semibold font-mono bg-white/5 border border-white/5 px-2.5 py-1 rounded-md text-white">
                              ⭐ {totalStars} Stars
                            </span>
                            <span className="text-[10px] font-semibold font-mono bg-white/5 border border-white/5 px-2.5 py-1 rounded-md text-white">
                              🍴 {totalForks} Forks
                            </span>
                            <span className="text-[10px] font-semibold font-mono bg-white/5 border border-white/5 px-2.5 py-1 rounded-md text-white">
                              📁 {publicRepos} Repos
                            </span>
                            <span className="text-[10px] font-semibold font-mono bg-white/5 border border-white/5 px-2.5 py-1 rounded-md text-white">
                              👥 {followers} Followers
                            </span>
                            <span className="text-[10px] font-semibold font-mono bg-[#9676ce]/20 border border-[#9676ce]/40 px-2.5 py-1 rounded-md text-[#aed2ff]">
                              📈 {avgCommits}/Wk Avg
                            </span>
                            <span className="text-[10px] font-semibold font-mono bg-green-500/10 border border-green-500/30 px-2.5 py-1 rounded-md text-green-400">
                              🔥 {currentWeekCommits} This Wk
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right side: Sparkline graph */}
                      <div className="flex-1 flex flex-col justify-end min-h-[140px] md:min-h-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-white/5 md:pl-6">
                        <div className="flex justify-between items-center text-[10px] font-mono mb-2">
                          <span className="text-[#4ade80]">+{additions.toLocaleString()} lines</span>
                          <span className="text-[#f87171]">-{deletions.toLocaleString()} lines</span>
                        </div>
                        
                        {/* SVG Dual-Directional Sparkline History Chart centered on baseline */}
                        <div className="h-16 w-full flex items-center justify-between gap-1 select-none mb-3">
                          {history.map(([time, add, del], i) => {
                            const maxVal = Math.max(...history.map(([_, a, d]) => a + Math.abs(d))) || 1;
                            const addHeight = ((add / maxVal) * 100).toFixed(0);
                            const delHeight = ((Math.abs(del) / maxVal) * 100).toFixed(0);
                            return (
                              <div key={i} className="flex-1 flex flex-col h-full">
                                {/* Top Half: Additions grow UP */}
                                <div className="h-1/2 flex flex-col justify-end">
                                  <div style={{ height: `${addHeight}%` }} className="bg-[#4ade80]/60 rounded-t-sm w-full" />
                                </div>
                                {/* Baseline Divider */}
                                <div className="h-[1px] bg-white/10 w-full" />
                                {/* Bottom Half: Deletions grow DOWN */}
                                <div className="h-1/2 flex flex-col justify-start">
                                  <div style={{ height: `${delHeight}%` }} className="bg-[#f87171]/60 rounded-b-sm w-full" />
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="flex justify-between items-center text-[9px] font-mono text-gray-400">
                          <span>10 WEEKS AGO</span>
                          <div className="w-16 h-[2px] bg-white/10 rounded-full" />
                          <span>CURRENT WEEK</span>
                        </div>
                      </div>
                    </a>
                  </SpotlightCard>
                );
              }

              // Dynamic LinkedIn Card (1-column format stacking directly below Instagram)
              if (social.id === "linkedin") {
                return (
                  <SpotlightCard
                    key={social.id}
                    layout
                    variants={cardVariants}
                    exit={{ opacity: 0, scale: 0.95 }}
                    color={social.spotlightColor}
                    className={`black-gradient border border-[#303034] rounded-3xl p-6 min-h-[220px] ${social.size}`}
                  >
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col justify-between h-full group"
                    >
                      <div className="flex flex-row justify-between items-start w-full">
                        <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5 flex items-center justify-center">
                          <i className={`${social.iconClass} text-3xl`}></i>
                        </div>
                        <div className="text-gray-400 text-xs font-semibold font-mono bg-white/5 border border-white/5 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 group-hover:text-white transition-colors">
                          CONNECT
                          <i className="bi bi-arrow-up-right text-[10px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"></i>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-xl font-semibold text-white uppercase tracking-wide leading-none group-hover:text-[#aed2ff] transition-colors duration-300">
                          {social.name}
                        </h3>
                        <p className="text-[#aed2ff]/70 text-xs mt-1.5 font-mono">{social.username}</p>
                        
                        <div className="mt-3 pt-3 border-t border-white/5">
                          <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                            <span>1.2k Followers</span>
                            <span>•</span>
                            <span>500+ Connections</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </SpotlightCard>
                );
              }

              // Dynamic Instagram Card with follower counts
              if (social.id === "instagram") {
                return (
                  <SpotlightCard
                    key={social.id}
                    layout
                    variants={cardVariants}
                    exit={{ opacity: 0, scale: 0.95 }}
                    color={social.spotlightColor}
                    className={`black-gradient border border-[#303034] rounded-3xl p-6 min-h-[220px] ${social.size}`}
                  >
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col justify-between h-full group"
                    >
                      <div className="flex flex-row justify-between items-start w-full">
                        <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5 flex items-center justify-center">
                          <i className={`${social.iconClass} text-3xl`}></i>
                        </div>
                        <div className="text-gray-400 text-xs font-semibold font-mono bg-white/5 border border-white/5 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 group-hover:text-white transition-colors">
                          FOLLOW
                          <i className="bi bi-arrow-up-right text-[10px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"></i>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-xl font-semibold text-white uppercase tracking-wide leading-none group-hover:text-[#aed2ff] transition-colors duration-300">
                          {social.name}
                        </h3>
                        <p className="text-[#aed2ff]/70 text-xs mt-1.5 font-mono">{social.username}</p>
                        
                        {/* 3-Column Recent Posts Mock Grid */}
                      

                        <div className="mt-4 pt-3 border-t border-white/5">
                          <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                            <span>3.1k Followers</span>
                            <span>•</span>
                            <span>10 Posts</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </SpotlightCard>
                );
              }

              // Standard Link Card (Theme Glassmorphism Styled with 3D perspective hover)
              return (
                <SpotlightCard
                  key={social.id}
                  layout
                  variants={cardVariants}
                  exit={{ opacity: 0, scale: 0.95 }}
                  color={social.spotlightColor}
                  className={`black-gradient border border-[#303034] rounded-3xl p-6 min-h-[220px] ${social.size || ""}`}
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col justify-between h-full group"
                  >
                    <div className="flex flex-row justify-between items-start w-full">
                      <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5 flex items-center justify-center">
                        <i className={`${social.iconClass} text-3xl`}></i>
                      </div>
                      <div className="text-gray-400 text-xs font-semibold font-mono bg-white/5 border border-white/5 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 group-hover:text-white transition-colors">
                        VISIT
                        <i className="bi bi-arrow-up-right text-[10px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"></i>
                      </div>
                    </div>
                    <div className="mt-8">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold text-white uppercase tracking-wide leading-none group-hover:text-[#aed2ff] transition-colors duration-300">
                          {social.name}
                        </h3>
                      </div>
                      <p className="text-[#aed2ff]/70 text-xs mt-1.5 font-mono">{social.username}</p>
                      <p className="text-gray-300 mt-3 text-sm leading-relaxed">{social.desc}</p>
                    </div>
                  </a>
                </SpotlightCard>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
