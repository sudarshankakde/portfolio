import React from "react";

// Reusable base shimmer block with visible pulse animation
const Bone = ({ className = "" }) => (
  <div className={`bg-[#2a2a30] rounded-lg animate-pulse ${className}`} />
);

// Mimics WorkSnippetCard: thumbnail (h-[20rem]) + title row + skills text
export function ProjectCardSkeleton() {
  return (
    <div className="h-auto max-w-[90%] md:max-w-[45%] w-[85vw] md:w-[35rem]">
      <Bone className="rounded-3xl h-[20rem] w-full" />
      <div className="mt-2">
        <div className="flex flex-row justify-between items-start gap-2">
          <Bone className="h-7 flex-1 rounded-md" />
          <Bone className="h-7 w-7 rounded-md flex-shrink-0" />
        </div>
        <div className="flex flex-row gap-1 mt-2">
          <Bone className="h-4 w-24 rounded-md" />
          <Bone className="h-4 w-3 rounded-md" />
          <Bone className="h-4 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
}

// Mimics blog list card: image left + date badge + title + summary right
export function BlogCardSkeleton() {
  return (
    <div className="flex md:flex-row flex-col items-center w-full md:max-w-4xl justify-center border border-[#303034] black-gradient rounded-2xl mb-5">
      <div className="flex flex-col md:flex-row gap-5 p-5 items-center w-full">
        <div className="w-full md:w-[50%]">
          <Bone className="rounded-2xl h-[200px] w-full" />
        </div>
        <div className="flex flex-col w-full md:w-[50%] justify-center gap-3">
          <Bone className="h-6 w-28 rounded-md" />
          <Bone className="h-7 w-4/5 rounded-md" />
          <Bone className="h-4 w-full rounded-md" />
          <Bone className="h-4 w-3/4 rounded-md" />
        </div>
      </div>
    </div>
  );
}

// Mimics experience timeline card: dot + card with role/company/period/responsibilities
export function ExperienceTimelineSkeleton() {
  return (
    <div className="group relative">
      {/* Timeline dot */}
      <div className="absolute top-5 left-1 h-6 w-6 rounded-full bg-[#2a2a30] animate-pulse hidden md:block" />

      <div className="ml-0 md:ml-12 relative overflow-hidden rounded-lg p-6 border border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-6">
          <Bone className="h-8 w-3/5 rounded-md" />
          <Bone className="h-8 w-32 rounded-full" />
        </div>
        <Bone className="h-6 w-2/5 rounded-md mb-6" />
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Bone className="h-1.5 w-1.5 rounded-full flex-shrink-0" />
            <Bone className="h-4 w-full rounded-md" />
          </div>
          <div className="flex items-center gap-3">
            <Bone className="h-1.5 w-1.5 rounded-full flex-shrink-0" />
            <Bone className="h-4 w-4/5 rounded-md" />
          </div>
          <div className="flex items-center gap-3">
            <Bone className="h-1.5 w-1.5 rounded-full flex-shrink-0" />
            <Bone className="h-4 w-3/5 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Full-page blog read skeleton matching the ReadBlog layout
export function BlogArticleSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row w-full max-w-[90%] mx-auto gap-8 justify-center pt-4 pb-20 animate-pulse">
      {/* Left Table of Contents Sidebar Skeleton */}
      <div className="hidden lg:block min-w-[220px] shrink-0 pt-4">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Bone className="h-0.5 w-12 rounded-full" />
              <Bone className="h-4 w-5 rounded-md" />
              <Bone className="h-4 rounded-md" style={{ width: `${70 + (i % 3) * 25}px` }} />
            </div>
          ))}
        </div>
      </div>

      {/* Main Article Skeleton */}
      <div className="flex-1 w-full max-w-auto">
        {/* Breadcrumb */}
        <div className="flex gap-2 items-center mb-6">
          <Bone className="h-4 w-14 rounded-md" />
          <Bone className="h-4 w-3 rounded-md" />
          <Bone className="h-4 w-40 rounded-md" />
        </div>

        {/* Hero image */}
        <Bone className="rounded-2xl w-full mb-8" style={{ aspectRatio: '16/9' }} />

        {/* Title */}
        <Bone className="h-9 w-5/6 rounded-md mb-4" />

        {/* Meta: author · date · reading time · views */}
        <div className="flex gap-3 mb-5">
          <Bone className="h-4 w-28 rounded-full" />
          <Bone className="h-4 w-24 rounded-full" />
          <Bone className="h-4 w-20 rounded-full" />
          <Bone className="h-4 w-16 rounded-full" />
        </div>

        {/* Tags */}
        <div className="flex gap-2 mb-8">
          <Bone className="h-6 w-16 rounded-full" />
          <Bone className="h-6 w-20 rounded-full" />
          <Bone className="h-6 w-14 rounded-full" />
        </div>

        {/* Article Body */}
        <div className="space-y-3 mb-10">
          {[1, 0.95, 1, 0.85, 1, 0.9, 1, 0.75, 1, 0.88, 1, 0.6].map((w, i) => (
            <Bone key={i} className="h-4 rounded-md" style={{ width: `${w * 100}%` }} />
          ))}
        </div>

        {/* Related articles skeleton */}
        <Bone className="h-8 w-40 rounded-md mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {[0, 1].map((i) => (
            <div key={i} className="flex flex-col gap-3 border border-[#303034] black-gradient rounded-2xl p-4">
              <Bone className="rounded-xl w-full" style={{ aspectRatio: '16/9' }} />
              <Bone className="h-5 w-3/4 rounded-md" />
              <Bone className="h-4 w-1/2 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// Full-page project case study read skeleton matching the ReadProject layout
export function ProjectArticleSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row w-full max-w-[90%] mx-auto gap-6 lg:gap-8 justify-center pt-2 pb-12 animate-pulse">
      {/* Left Table of Contents Sidebar Skeleton */}
      <div className="hidden lg:block min-w-[200px] shrink-0 pt-2">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Bone className="h-0.5 w-12 rounded-full" />
              <Bone className="h-4 w-5 rounded-md" />
              <Bone className="h-4 rounded-md" style={{ width: `${60 + (i % 3) * 20}px` }} />
            </div>
          ))}
        </div>
      </div>

      {/* Main Article Skeleton */}
      <div className="flex-1 min-w-0 w-full">
        {/* Breadcrumb */}
        <div className="flex gap-2 items-center mb-4">
          <Bone className="h-4 w-16 rounded-md" />
          <Bone className="h-4 w-3 rounded-md" />
          <Bone className="h-4 w-40 rounded-md" />
        </div>

        {/* Hero image */}
        <Bone className="rounded-2xl w-full mb-6" style={{ aspectRatio: '16/9' }} />

        {/* Title & Action Buttons Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
          <div className="flex-1 space-y-2">
            <Bone className="h-9 w-3/4 rounded-md" />
            <Bone className="h-4 w-48 rounded-md" />
          </div>
          <div className="flex gap-3">
            <Bone className="h-10 w-28 rounded-xl" />
            <Bone className="h-10 w-28 rounded-xl" />
          </div>
        </div>

        {/* Case Study Content */}
        <div className="space-y-3 mb-8">
          {[1, 0.95, 1, 0.85, 1, 0.9, 1, 0.75, 1, 0.88, 0.6].map((w, i) => (
            <Bone key={i} className="h-4 rounded-md" style={{ width: `${w * 100}%` }} />
          ))}
        </div>

        {/* Technologies marquee bar skeleton */}
        <Bone className="h-16 w-full rounded-2xl mb-8" />

        {/* Other Projects section skeleton */}
        <div className="w-full pt-10 border-t border-white/10">
          <Bone className="h-8 w-44 rounded-md mb-8" />
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch w-full">
            {[0, 1].map((i) => (
              <div key={i} className="flex-1 flex flex-col gap-3">
                <Bone className="rounded-2xl w-full" style={{ aspectRatio: '16/9' }} />
                <div className="space-y-2">
                  <Bone className="h-6 w-3/4 rounded-md" />
                  <Bone className="h-4 w-1/2 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



// Mimics the tech stack grid on the home page
export function StackSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <Bone className="h-10 w-48 rounded-md mx-auto mb-8" />
      <div className="flex flex-row flex-wrap justify-center gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Bone key={i} className="h-16 w-16 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

// Inline pulsing dots for buttons (submit/subscribe)
export function ButtonDotsLoader({ color = "#aed2ff" }) {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full animate-bounce"
          style={{
            backgroundColor: color,
            animationDelay: `${i * 150}ms`,
          }}
        />
      ))}
    </div>
  );
}
