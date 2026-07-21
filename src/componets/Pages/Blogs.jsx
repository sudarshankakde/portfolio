import React, { useEffect, useState, useRef, useMemo } from "react";
import parse from "html-react-parser";
import { ApiBaseURL, MediaUrl } from "../..";
import { NavLink } from "react-router-dom";
import { BlogCardSkeleton } from "../SkeletonLoaders";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PageSeo } from "../Seo";

const DEBOUNCE_MS = 450;

const siteOrgJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sudarshan Kakde - Intricate",
  url: "https://sudarshankakde.tech/blog",
};

function Blogs() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const sentinelRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Blogs";
  }, []);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(inputValue.trim());
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [inputValue]);

  // Infinite query for paginated fetching from the Django server
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["blogs", debouncedSearch],
    queryFn: ({ pageParam = 1 }) => {
      const params = new URLSearchParams();
      if (debouncedSearch) params.set("search", debouncedSearch);
      params.set("page", pageParam);
      return fetch(`${ApiBaseURL}api/blogs?${params.toString()}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch");
          return res.json();
        });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.has_next ? allPages.length + 1 : undefined;
    },
  });

  // Flat list of all loaded blogs across pages
  const allBlogs = useMemo(() => {
    return data ? data.pages.flatMap((page) => page.data || []) : [];
  }, [data]);

  // IntersectionObserver to load the next page
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px", threshold: 0 }
    );

    observerRef.current.observe(sentinel);
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const isSearching = inputValue !== debouncedSearch || isFetching;

  return (
    <>
      <PageSeo
        title="Blog"
        description="Intricate — Articles and thoughts by Sudarshan on development, design and more."
      >
        <script type="application/ld+json">{JSON.stringify(siteOrgJsonLd)}</script>
      </PageSeo>

      <div className="flex flex-col w-[90%] mx-auto pb-16">
        {/* Header */}
        <div className="flex flex-col justify-center items-center text-purewhite md:pt-10 pt-0 relative">
          <h2 className="md:text-6xl text-5xl capitalize font-semibold text-center from-[#9676ce] to-[#7d57c1] bg-gradient-to-r px-5 py-3 p-2 rounded-lg w-fit tracking-tight">
            intricate
          </h2>
          <p className="font-[500] tracking-tight text-center mb-5 mt-3 opacity-80 px-2 uppercase text-sm">
            by sudarshan
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-xl group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9676ce] pointer-events-none transition-colors duration-300 group-focus-within:text-[#aed2ff]">
              {isSearching && inputValue ? (
                <svg
                  className="animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              )}
            </span>

            <input
              id="blog-search"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search articles..."
              className="w-full border border-[#303034] focus:border-[#9676ce] outline-none rounded-full pl-10 pr-10 py-2.5 text-sm text-white placeholder-white/30 transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.04)" }}
            />

            {inputValue && (
              <button
                onClick={() => setInputValue("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors duration-200"
                aria-label="Clear search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Result count */}
        {!isLoading && !isSearching && debouncedSearch && (
          <p className="text-center text-xs text-white/40 font-mono mb-6 -mt-4">
            {allBlogs.length === 0
              ? `No articles found for "${debouncedSearch}"`
              : `${allBlogs.length} article${allBlogs.length !== 1 ? "s" : ""} found`}
          </p>
        )}

        {/* Blog Cards */}
        <div className="flex flex-col items-center justify-center md:my-5">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center w-full">
              {Array.from({ length: 3 }).map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <p className="font-[400] tracking-tight text-center mb-5 mt-3 opacity-90 px-2 text-lg">
              Something interrupted while loading Intricate
            </p>
          ) : allBlogs.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p className="text-sm font-mono">No articles match your search</p>
            </div>
          ) : (
            allBlogs.map((blog, index) => (
              <div
                key={index}
                className="flex md:flex-row flex-col items-center w-full md:max-w-4xl justify-center border border-[#303034] black-gradient rounded-2xl mb-5 hover:border-[#9676ce]/40 transition-colors duration-300"
              >
                <NavLink
                  to={blog.slug}
                  className="flex flex-col md:flex-row gap-5 p-5 items-start justify-start w-full"
                >
                  <div className="w-full md:w-[50%]">
                    <img
                      src={
                        blog.image &&
                        (blog.image.startsWith("http://") || blog.image.startsWith("https://"))
                          ? blog.image
                          : MediaUrl + blog.image
                      }
                      alt={blog.title}
                      className="rounded-2xl w-full object-cover"
                      loading="lazy"
                      width="1600"
                      height="1600"
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-[50%] justify-center my-2">
                    <div className="text-[#ffffff] px-2 py-1 text-xs capitalize font-semibold rounded-md bg-gradient-to-r from-[#9676ce] to-[#7d57c1] w-fit">
                      <span>
                        {new Date(blog.publish_date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="text-2xl font-medium mt-4 mb-2">{blog.title}</h2>
                    <div className="text-sm opacity-80">{parse(blog.summary.toString())}</div>
                  </div>
                </NavLink>
              </div>
            ))
          )}
        </div>

        {/* Persistent IntersectionObserver sentinel */}
        {!isLoading && !isError && hasNextPage && (
          <div ref={sentinelRef} aria-hidden="true" style={{ height: 1 }} />
        )}

        {/* Bouncing dots — shown while loading more */}
        {isFetchingNextPage && (
          <div className="flex justify-center py-8">
            <div className="flex gap-1.5 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9676ce]/60 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#9676ce]/60 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#9676ce]/60 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        {/* End of list indicator */}
        {!isLoading && !isError && !hasNextPage && allBlogs.length > 0 && (
          <div className="flex items-center gap-3 justify-center mt-4 mb-2 opacity-30">
            <div className="h-px flex-1 max-w-[80px] bg-white/20" />
            <span className="text-[15px] font-mono tracking-widest uppercase">end</span>
            <div className="h-px flex-1 max-w-[80px] bg-white/20" />
          </div>
        )}
      </div>
    </>
  );
}

export default Blogs;
