import React, {  useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { ApiBaseURL, MediaUrl } from "../..";
import { TailSpin } from "react-loader-spinner";
import parse from "html-react-parser";
import axios from "axios";
import ScrollIndicator from "../ScrollIndicator";
import { useQuery } from "@tanstack/react-query";
import { PageSeo } from "../Seo";
function ReadBlog() {
  let { slug } = useParams();
  console.log(slug);
  const { isLoading } = useQuery({
    queryKey: ["Read-Blog", slug],
    queryFn: () => {
      return fetch(`${ApiBaseURL}api/detail/${slug}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          document.title = data.data[0].title;
          setBlogs(data.data[0]);
          setRelated(data.related);
          setBody(data.data[0].body);

          return data;
        });
    },
  });
  useEffect(()=>{
    window.scrollTo(0,0);

  },[])
  const [spinner, setSpinner] = useState(false);
  const [response, setresponse] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    setSpinner(true);
    e.preventDefault();

    axios({
      method: "post",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url: `${ApiBaseURL}api/newsletter`,
      data: {
        email: email.toString(),
      },
    })
      .then((response) => {
        setSpinner(false);
        if (response.status === 200) {
          setresponse(response.data.data);
        } else if (response.status !== 200) {
          setresponse("Form response was not ok");
        }
      })
      .catch((err) => {
        setSpinner(false);
        // console.log(err);
        e.target.submit();
      });
  };
  const [blog, setBlogs] = useState([]);
  const [related, setRelated] = useState([]);
  const [body, setBody] = useState("");

  return (
    <div   >
      {!isLoading && blog && blog.title ? (
        <PageSeo
          title={blog.title}
          description={blog.summary || blog.excerpt || blog.title}
          image={MediaUrl + blog.image}
          url={`https://sudarshankakde.live/blog/${blog.slug}`}
        >
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: blog.title,
              image: [MediaUrl + blog.image],
              author: {
                "@type": "Person",
                name: "Sudarshan Kakde",
              },
              datePublished: blog.publish_date,
              description: blog.summary,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://sudarshankakde.live/blog/${blog.slug}`,
              },
            })}
          </script>
        </PageSeo>
      ) : (
        <></>
      )}
      <ScrollIndicator color="#9676ce" />
      <div className="flex flex-col  md:w-[60%] w-[90%] mx-auto pt-0">
        <div className="flex flex-row flex-wrap gap-2 items-center font-bold md:mt-5">
          <NavLink
            to="/blog"
            className="hover:text-[var(--complementary)] gap-1 flex items-center"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
            </svg>
            <span className="">Blogs</span>
          </NavLink>
          <span>/</span>
          <span>{!isLoading && blog.title}</span>
        </div>
        <>
          {!isLoading ? (
            <></>
          ) : (
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
          )}
        </>
        <div className="flex flex-col justify-center items-center">
          <div className="my-4">
            <img
              src={MediaUrl + blog.image}
              srcSet={MediaUrl + blog.image}
              alt={blog.title}
              height="1000"
              width="1000"
              loading="lazy"
            />
          </div>
          <div>{parse(body.toString())}</div>
        </div>
        <div className="my-16 flex flex-col justify-center mx-auto items-center w-fit">
          <h4 className="text-4xl font-semibold tracking-tight w-[100%] text-start">
            Related Post
          </h4>
          <div className="flex md:flex-row flex-col justify-center items-baseline  gap-5 ">
            {related &&
              related.map((related, index) => {
                return (
                  <Link to={`/blog/${related.slug}`}>
                    <div
                      className="w-fit flex flex-col justify-center items-center my-5"
                      key={index}
                    >
                      <img
                        src={MediaUrl + related.image}
                        srcSet={MediaUrl + related.image}
                        alt={related.title}
                        className="transition-all ease-in-out hover:-translate-y-3 duration-300 h-[225px] w-[400px]"
                        height="400px"
                        width="225px"
                        loading="lazy"
                      />
                      <div className="text-xl w-[75%] mx-auto text-center mt-2 tracking-tight">
                        {related.title}
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center  py-20 mb-10">
          <p className="text-3xl tracking-wide font-bold">
            Subscribe to the Newsletter!
          </p>
          <div className="my-2">
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="search"
                className="mb-2 text-sm font-medium  sr-only "
              >
                Email
              </label>
              <div className="relative md:w-[35vw] w-[85vw] my-3 ">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 16"
                  >
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full p-4 ps-10 text-sm  border border-gray-300 rounded-lg   bg-[var(--bg-purple)]"
                  placeholder="Email"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  className="text-[var(--bg-purple)] absolute end-2.5 bottom-2.5 bg-[var(--text-color)] hover:bg-blue-800  font-medium rounded-lg text-sm px-4 py-2 "
                >
                  {spinner ? (
                    <TailSpin
                      height="24"
                      width="24"
                      color="black"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  ) : (
                    <>Subscribe</>
                  )}
                </button>
              </div>
            </form>
            <div className="text-semibold opacity-100 text-white lowercase">
              {response}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadBlog;
