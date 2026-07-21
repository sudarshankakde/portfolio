import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { ApiBaseURL, MediaUrl } from "../..";
import { BlogArticleSkeleton, ButtonDotsLoader } from "../SkeletonLoaders";
import parse from "html-react-parser";
import axios from "axios";
import ScrollIndicator from "../ScrollIndicator";
import { useQuery } from "@tanstack/react-query";
import { PageSeo } from "../Seo";

// Estimate reading time from raw HTML body text
function readingTime(html) {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// Resolve image URL (absolute or relative via MediaUrl)
function resolveImg(src) {
  if (!src) return "";
  return src.startsWith("http://") || src.startsWith("https://")
    ? src
    : MediaUrl + src;
}

function ReadBlog() {
  const { slug } = useParams();
  const [spinner, setSpinner] = useState(false);
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");

  // Scroll to top whenever the slug changes (related post click)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  const { isLoading, data, isError } = useQuery({
    queryKey: ["Read-Blog", slug],
    queryFn: () =>
      fetch(`${ApiBaseURL}api/detail/${slug}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load blog");
          return res.json();
        })
        .then((json) => ({
          blog: json.data?.[0] ?? null,
          related: json.related ?? [],
        })),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const blog = data?.blog ?? null;
  const related = data?.related ?? [];
  const body = blog?.body ?? "";

  useEffect(() => {
    if (blog?.title) document.title = blog.title;
  }, [blog?.title]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSpinner(true);
    axios({
      method: "post",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url: `${ApiBaseURL}api/newsletter`,
      data: { email },
    })
      .then((res) => {
        setSpinner(false);
        setResponse(res.status === 200 ? res.data.data : "Something went wrong.");
      })
      .catch(() => {
        setSpinner(false);
        setResponse("Subscribed! (offline fallback)");
      });
  };

  if (isLoading) {
    return (
      <div>
        <ScrollIndicator color="#9676ce" />
        <BlogArticleSkeleton />
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 opacity-60">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p className="font-mono text-sm">Could not load this article.</p>
        <NavLink to="/blog" className="text-[#9676ce] hover:underline text-sm font-mono">← Back to Blog</NavLink>
      </div>
    );
  }

  const mins = readingTime(body);
  const tags = blog.tags ?? [];
  const publishDate = blog.publish_date
    ? new Date(blog.publish_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "";

  return (
    <div>
      {/* SEO */}
      <PageSeo
        title={blog.title}
        description={blog.summary || blog.title}
        image={resolveImg(blog.image)}
        url={`https://sudarshankakde.tech/blog/${blog.slug}`}
      >
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            image: [resolveImg(blog.image)],
            author: { "@type": "Person", name: blog.author_name || "Sudarshan Kakde" },
            datePublished: blog.publish_date,
            description: blog.summary,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://sudarshankakde.tech/blog/${blog.slug}`,
            },
          })}
        </script>
      </PageSeo>

      <ScrollIndicator color="#9676ce" />

      <article className="flex flex-col md:w-[60%] w-[90%] mx-auto pt-4 pb-20">
        {/* Breadcrumb */}
        <nav className="flex flex-row flex-wrap gap-2 items-center font-semibold text-sm md:mt-5 mb-6 text-white/50">
          <NavLink to="/blog" className="hover:text-[#aed2ff] gap-1.5 flex items-center transition-colors duration-200">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z" />
            </svg>
            Blog
          </NavLink>
          <span className="opacity-40">/</span>
          <span className="text-white/80 truncate max-w-[200px] md:max-w-none">{blog.title}</span>
        </nav>

        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden w-full mb-8 border border-white/5">
          <img
            src={resolveImg(blog.image)}
            alt={blog.title}
            className="w-full object-cover"
            style={{ aspectRatio: "16/9" }}
            loading="eager"
            width="1200"
            height="675"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
          {blog.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-white/40 mb-5">
          <span className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            {blog.author_name || "Sudarshan Kakde"}
          </span>
          <span className="opacity-30">·</span>
          <span className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {publishDate}
          </span>
          <span className="opacity-30">·</span>
          <span className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {mins} min read
          </span>
          <span className="opacity-30">·</span>
          <span className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
            {blog.views?.toLocaleString() ?? 0} views
          </span>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((t, i) => (
              <span
                key={i}
                className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border border-[#9676ce]/30 bg-[#9676ce]/10 text-[#aed2ff] uppercase tracking-wider"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Summary */}
        {blog.summary && (
          <div className="border-l-2 border-[#9676ce]/50 pl-4 mb-8 text-white/60 text-sm italic leading-relaxed">
            {blog.summary.replace(/<[^>]+>/g, "")}
          </div>
        )}

        {/* Article Body */}
        <div className="prose-blog text-white/85 leading-relaxed text-[15px]">
          {parse(body)}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-14 opacity-20">
          <div className="h-px flex-1 bg-white/30" />
          <span className="text-xs font-mono tracking-widest uppercase">end of article</span>
          <div className="h-px flex-1 bg-white/30" />
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold tracking-tight mb-6 text-white">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {related.map((post, i) => (
                <Link
                  key={i}
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col gap-3 border border-[#303034] hover:border-[#9676ce]/40 black-gradient rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="overflow-hidden">
                    <img
                      src={resolveImg(post.image)}
                      alt={post.title}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{ aspectRatio: "16/9" }}
                      loading="lazy"
                      width="600"
                      height="338"
                    />
                  </div>
                  <div className="px-4 pb-4">
                    <p className="text-[10px] font-mono text-white/30 mb-1.5">
                      {post.publish_date
                        ? new Date(post.publish_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                        : ""}
                    </p>
                    <h3 className="text-base font-semibold text-white group-hover:text-[#aed2ff] transition-colors duration-200 leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    {post.summary && (
                      <p className="text-xs text-white/40 mt-1.5 line-clamp-2 leading-relaxed">
                        {post.summary.replace(/<[^>]+>/g, "")}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter */}
        <section className="flex flex-col items-center py-12 px-6 border border-[#303034] rounded-2xl black-gradient">
          <div className="text-3xl mb-3"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#ffffff" class="bi bi-envelope" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
</svg></div>
          <h3 className="text-2xl font-bold tracking-tight text-white mb-1">Subscribe to Intricate</h3>
          <p className="text-sm text-white/40 text-center mb-6 max-w-sm">
            Get new articles delivered straight to your inbox — no spam, unsubscribe anytime.
          </p>
          <form onSubmit={handleSubscribe} className="w-full max-w-md">
            <div className="flex gap-2">
              <input
                type="email"
                id="newsletter-email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="flex-1 bg-white/5 border border-[#303034] focus:border-[#9676ce] outline-none rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 transition-colors duration-200"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#9676ce] to-[#7d57c1] text-white hover:opacity-90 transition-opacity duration-200 min-w-[110px] flex items-center justify-center"
              >
                {spinner ? <ButtonDotsLoader color="white" /> : "Subscribe"}
              </button>
            </div>
            {response && (
              <p className="text-xs text-[#aed2ff] mt-3 text-center">{response}</p>
            )}
          </form>
        </section>
      </article>
    </div>
  );
}

export default ReadBlog;
