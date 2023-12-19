import React, { useEffect, useState } from "react";
import Background from "../Background";
import axios from "axios";
import { ApiBaseURL } from "../..";
import qs from "qs";
import { TailSpin } from "react-loader-spinner";
function Contact() {
  let [responseData, setresponse] = useState("");
  const [spinner, setSpinner] = useState(false);
  const handleSubmit = (e) => {
    setSpinner(true);
    e.preventDefault();

    const inputs = e.target.elements;
    const data = {};

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].name) {
        data[inputs[i].name] = inputs[i].value;
      }
    }
    axios({
      method: "post",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url: `${ApiBaseURL}contact`,
      data: qs.stringify(data),
    })
      .then((response) => {
        setSpinner(false);
        if (response.status === 200) {
          setresponse((responseData = response.data));
        } else if (response.status !== 200) {
          setresponse((responseData = "Form response was not ok"));
        }
      })
      .catch((err) => {
        setSpinner(false);
        // console.log(err);
        e.target.submit();
      });
  };

  return (
    <>
      <div className="flex flex-col h-[80vh]  md:h-screen items-center justify-center w-full  ">
        <Background />
        <div className=" flex flex-col justify-center items-center gap-y-3 z-10">
          <h2 className="md:text-6xl text-5xl font-Kalnia">Contact Me</h2>
          <p className="md:text-lg">Love to hear from you, Get in touch!</p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 py-5 md:w-auto w-full "
          >
            <div class="flex flex-col">
              <label
                className="text-white text-xs tracking-widest font-medium uppercase"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="w-full mt-2 pl-5 w-[300px] md:w-[500px] py-2 text-white bg-purple rounded-md focus:outline-none focus:ring-1 focus:ring-[#816bac] focus:border-transparent transition-all   ease-in-out duration-300 rounded-full shadow-inner shadow-[var(--bg-purple-50)] border border-[#816bac] z-20"
                id="username"
                name="name"
                type="text"
                placeholder=""
                required
              />
            </div>
            <div class="flex flex-col">
              <label
                className="text-white text-xs tracking-widest font-medium uppercase"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full mt-2 pl-5 w-[300px] md:w-[500px] py-2 text-white bg-purple rounded-md focus:outline-none focus:ring-1 focus:ring-[#816bac] focus:border-transparent transition-all   ease-in-out duration-300 rounded-full shadow-inner shadow-[var(--bg-purple-50)] border border-[#816bac] z-20"
                id="email"
                name="email"
                type="email"
                placeholder=""
                required
              />
            </div>
            <div class="flex flex-col">
              <label
                className="text-white text-xs tracking-widest font-medium uppercase"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="w-full mt-2 pl-5 w-[300px] md:w-[500px] py-2 text-white bg-purple rounded-md focus:outline-none focus:ring-1 focus:ring-[#816bac] focus:border-transparent transition-all   ease-in-out duration-300 rounded-full shadow-inner shadow-[var(--bg-purple-50)] border border-[#816bac] z-20"
                name="message"
                id="message"
                about="Message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className=" w-full mt-2 pl-5 w-[300px] md:w-[500px] py-3 text-white text-start bg-purple rounded-md focus:outline-none focus:ring-1 focus:ring-[#816bac] focus:border-transparent transition-all   ease-in-out duration-300 rounded-full shadow-inner shadow-[var(--bg-purple-50)] border border-[#816bac] z-20 flex flex-row  items-center gap-x-2 group"
            >
              {spinner ? (
                <TailSpin
                  height="30"
                  width="30"
                  color="#aed2ff"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              ) : (
                <>
                  Submit
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-300 ease-in-out group-hover:-rotate-12 "
                  >
                    <line
                      x1="22"
                      x2="11"
                      y1="2"
                      y2="13"
                      stroke="#9B96B0"
                      fill="none"
                      strokeWidth="2px"
                    ></line>
                    <polygon
                      points="22 2 15 22 11 13 2 9 22 2"
                      stroke="#9B96B0"
                      fill="none"
                      strokeWidth="2px"
                    ></polygon>
                  </svg>
                </>
              )}
            </button>

            <div className="flex flex-row justify-center items-center">
              {responseData}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
