import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { ApiBaseURL, MediaUrl } from "../..";
import { NavLink } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

function Blogs() {
  const [Blogs, setBlogs] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Blogs";
    fetch(`${ApiBaseURL}api/blogs`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBlogs(data.data);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col  w-[90%] mx-auto">
        <div className="flex flex-col justify-center items-center text-purewhite  md:pt-10 pt-0 relative">
          <h2 className="md:text-6xl  text-5xl capitalize font-semibold text-center from-[#9676ce] to-[#7d57c1] bg-gradient-to-r px-5 py-3 rounded-2xl p-2 rounded-lg w-fit tracking-tight">
            intricate
          </h2>
          <p className="font-[500] tracking-tight text-center mb-5 mt-3  opacity-80 px-2 rounded-lg uppercase text-sm">
            by sudarshan
          </p>
        </div>
        <div className="flex flex-col items-center justify-center md:my-5">
          {Blogs.length !== 0 ? (
            Blogs.map((blog, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="flex md:flex-row flex-col items-center w-full md:max-w-4xl justify-center border border-[#303034] black-gradient rounded-2xl mb-5 "
                  >
                    <NavLink
                      to={blog.slug}
                      className="flex flex-col md:flex-row gap-5 p-5 items-center"
                    >
                      <div className=" w-full md:w-[50%]">
                        <img
                          src={MediaUrl + blog.image}
                          alt={blog.title}
                          className="rounded-2xl"
                          loading="lazy"
                          width="1600"
                          height="1600"
                        />
                      </div>
                      <div className="flex flex-col w-full md:w-[50%] justify-center">
                        <div className="text-[#ffffff] px-2 py-1 text-xs capitalize font-semibold  rounded-md bg-gradient-to-r from-[#9676ce] to-[#7d57c1] w-fit">
                          <span>
                            {new Date(blog.publish_date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <h2 className="text-2xl font-medium mt-4 mb-2">
                          {blog.title}
                        </h2>
                        <div className="text-sm opacity-80">{parse(blog.summary.toString())}</div>
                      </div>
                    </NavLink>
                  </div>
                </>
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
        </div>
      </div>
    </>
  );
}

export default Blogs;
