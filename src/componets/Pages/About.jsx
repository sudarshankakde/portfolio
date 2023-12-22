import React, { useEffect} from "react";
import AboutMeCard from "../AboutMeCard";
import Background from "../Background";
import TallyForm from "../TallyForm";

function About() {
  useEffect(() => {
    window.scrollTo(0,0);

    document.title = "About Me";
  }, []);

  let p = `md:text-lg  font-semibold  tracking-tight md:opacity-80  opacity-90 text-base flex flex-col justify-center items-center   text-justify  h-full md:cursor-auto`;
  let h3 = `md:text-5xl text-4xl font-bold md:opacity-80  opacity-90 text-start my-2`;
  return (
    <div className="mb-24  text-center min-h-[100vh]"   >
      <Background />
      <div className="md:min-h-[65vh] min-h-[75vh]">
        <AboutMeCard
          title="Aboute Me"
          titleClasses="md:text-6xl text-5xl font-Kalnia z-50 select-none"
        />
      </div>
      <div className="">
        <h2 className="md:text-6xl text-5xl my-8 font-Kalnia z-50 select-none">
          Services
        </h2>
        <div className="flex flex-col justify-center items-center md:w-[70%] w-[85%]  mx-auto gap-8">
          <div className="my-5 relative">
            <h3 className={h3}>🕸️ Full Stack Development </h3>
            <p className={p}>
              As a full-stack developer, I breathe life into designs using
              versatile front-end tools, with a preference for modern JavaScript
              libraries like React.js. My toolkit extends to Django on the back
              end, enabling me to seamlessly integrate robust server-side logic
              and databases. I'm committed to choosing the best tools for each
              project's unique needs, ensuring a harmonious balance between user
              interface and backend functionality for dynamic and responsive web
              applications.
            </p>
          </div>
          <div className="my-5 relative">
            <h3 className={h3}>💻 Front-end Development </h3>
            <p className={p}>
              I excel in breathing life into designs through animated frontend
              development. My forte lies in leveraging modern JavaScript
              libraries like React.js for dynamic web interfaces. Additionally,
              I'm adept at crafting animated experiences using Flutter, ensuring
              seamless integration with HTML and CSS. My commitment is to tailor
              the toolkit to the unique needs of each project, delivering
              visually stunning and engaging user interfaces.
            </p>
          </div>
          <div className="my-5 relative">
            <div className="flex flex-row gap-3 items-center">
              <svg
                width="52"
                height="52"
                viewBox="-22.5 0 301 301"
                version="1.1"
              >
                <g>
                  <path
                    d="M78.3890161,0.858476242 C76.9846593,0.871877584 75.5269206,1.21067383 74.1988355,1.94683705 C69.9813154,4.28464966 68.4344792,9.70448752 70.7705059,13.9187887 L80.2936432,31.1148585 C57.3501835,45.3109605 42.146676,69.5583356 42.146676,97.23264 C42.146676,97.3488107 42.1463538,97.5233203 42.146676,97.6951925 C42.1467894,97.7558421 42.1461099,97.7904107 42.146676,97.8584397 C42.1467112,97.9488816 42.146676,98.0809536 42.146676,98.1033235 L42.146676,102.37513 C37.7401995,97.3051619 31.2627337,94.103607 24.0255064,94.103607 C10.766574,94.103607 0,104.870185 0,118.129121 L0,192.137501 C0,205.396437 10.766574,216.163015 24.0255064,216.163015 C31.2627337,216.163015 37.7401995,212.96146 42.146676,207.891492 L42.146676,218.258109 C42.146676,232.234601 53.5833566,243.671281 67.5598484,243.671281 L74.0083724,243.671281 L74.0083724,276.594135 C74.0083724,289.853131 84.774955,300.619649 98.0338856,300.619649 C111.292821,300.619649 122.0594,289.853131 122.0594,276.594135 L122.0594,243.671281 L133.215081,243.671281 L133.215081,276.594135 C133.215081,289.853131 143.981659,300.619649 157.240595,300.619649 C170.499522,300.619649 181.266118,289.853131 181.266118,276.594135 L181.266118,243.671281 L187.714637,243.671281 C201.691129,243.671281 213.127809,232.234601 213.127809,218.258109 L213.127809,207.891492 C217.534299,212.96146 224.011752,216.163015 231.248984,216.163015 C244.507919,216.163015 255.274498,205.396437 255.274498,192.137501 L255.274498,118.129121 C255.274498,104.870185 244.507919,94.103607 231.248984,94.103607 C224.011752,94.103607 217.534299,97.3051619 213.127809,102.37513 L213.127809,98.1849514 L213.127809,98.1033407 C213.128367,97.9723769 213.127955,97.8421262 213.127809,97.8584655 C213.129527,97.5976548 213.127809,97.3898395 213.127809,97.2326572 C213.127809,69.5631979 197.890397,45.339215 174.95363,31.1420821 L184.503985,13.918763 C186.840011,9.70446174 185.293178,4.28462389 181.075655,1.94681128 C179.747565,1.21064805 178.289834,0.871868993 176.885477,0.85845047 C173.770979,0.828641074 170.714038,2.4700306 169.103704,5.37514094 L159.118011,23.4146964 C149.353914,19.811505 138.730068,17.8368515 127.637245,17.8368515 C116.555726,17.8368515 105.912363,19.7912913 96.1564693,23.3874813 L86.1707769,5.37514094 C84.5604527,2.47002201 81.503506,0.828709799 78.3890161,0.85845047 L78.3890161,0.858476242 Z"
                    fill="#FFFFFF"
                  ></path>
                  <path
                    d="M24.0260725,100.361664 C14.1317,100.361664 6.25861893,108.234747 6.25861893,118.129121 L6.25861893,192.137501 C6.25861893,202.031875 14.1317,209.904958 24.0260725,209.904958 C33.9204441,209.904958 41.7935257,202.031875 41.7935257,192.137501 L41.7935257,118.129121 C41.7935257,108.234747 33.9204441,100.361664 24.0260725,100.361664 L24.0260725,100.361664 Z M231.249551,100.361664 C221.355176,100.361664 213.482094,108.234747 213.482094,118.129121 L213.482094,192.137501 C213.482094,202.031875 221.355176,209.904958 231.249551,209.904958 C241.143925,209.904958 249.016999,202.031875 249.016999,192.137501 L249.016999,118.129121 C249.016999,108.234747 241.143925,100.361664 231.249551,100.361664 L231.249551,100.361664 Z"
                    fill="#A4C639"
                  ></path>
                  <path
                    d="M98.0338856,184.818075 C88.1395114,184.818075 80.2664341,192.691157 80.2664341,202.585531 L80.2664341,276.593963 C80.2664341,286.488363 88.1395114,294.361308 98.0338856,294.361308 C107.92826,294.361308 115.801342,286.488363 115.801342,276.593963 L115.801342,202.585531 C115.801342,192.691157 107.92826,184.818075 98.0338856,184.818075 L98.0338856,184.818075 Z M157.240595,184.818075 C147.346221,184.818075 139.473138,192.691157 139.473138,202.585531 L139.473138,276.593963 C139.473138,286.488363 147.346221,294.361308 157.240595,294.361308 C167.134969,294.361308 175.008043,286.488363 175.008043,276.593963 L175.008043,202.585531 C175.008043,192.691157 167.134969,184.818075 157.240595,184.818075 L157.240595,184.818075 Z"
                    fill="#A4C639"
                  ></path>
                  <path
                    d="M78.4434341,7.11654228 C78.0234231,7.12083758 77.6320498,7.22919946 77.2462398,7.44304537 C75.9792855,8.14533584 75.5626532,9.60121987 76.2667168,10.8713836 L88.782836,33.4820338 C64.7023936,46.0117562 48.4373365,69.8232526 48.4047377,97.1510121 L206.869751,97.1510121 C206.837193,69.8232526 190.572096,46.0117562 166.491645,33.4820338 L179.007777,10.8713836 C179.711837,9.60121987 179.295201,8.14533584 178.02825,7.44304537 C177.642438,7.22919946 177.251067,7.1205455 176.831055,7.11654228 C175.931919,7.10786577 175.079646,7.55712 174.599912,8.42257181 L161.920533,31.2781058 C151.548297,26.6773219 139.914231,24.0949434 127.637245,24.0949434 C115.360249,24.0949434 103.726174,26.6773219 93.3539479,31.2781058 L80.6745686,8.42257181 C80.1948375,7.55712 79.3425576,7.10791732 78.4434341,7.11654228 L78.4434341,7.11654228 Z M48.4047377,103.40907 L48.4047377,218.258109 C48.4047377,228.870039 56.9479173,237.413214 67.5598484,237.413214 L187.714637,237.413214 C198.326576,237.413214 206.869751,228.870039 206.869751,218.258109 L206.869751,103.40907 L48.4047377,103.40907 L48.4047377,103.40907 Z"
                    fill="#A4C639"
                  ></path>
                  <path
                    d="M91.0681772,54.9226953 C87.4507168,54.9226953 84.4563973,57.9170105 84.4563973,61.5344795 C84.4563973,65.1519399 87.4507168,68.146255 91.0681772,68.146255 C94.6856376,68.146255 97.6799528,65.1519399 97.6799528,61.5344795 C97.6799528,57.9170105 94.6856376,54.9226953 91.0681772,54.9226953 L91.0681772,54.9226953 Z M164.205874,54.9226953 C160.588413,54.9226953 157.59409,57.9170105 157.59409,61.5344795 C157.59409,65.1519399 160.588413,68.146255 164.205874,68.146255 C167.823326,68.146255 170.817649,65.1519399 170.817649,61.5344795 C170.817649,57.9170105 167.823326,54.9226953 164.205874,54.9226953 L164.205874,54.9226953 Z"
                    fill="#FFFFFF"
                  ></path>
                </g>
              </svg>
              <h3 className={h3}>Cross Platform / App Development</h3>
            </div>
            <p className={p}>
              Passionate about translating designs into dynamic applications, I
              specialize in basic app development using Flutter. While I favor
              modern JavaScript libraries like React.js, my commitment is to
              choose the best tools for the app's requirements. Flutter's
              versatility allows me to create seamless, cross-platform
              experiences, ensuring the optimal blend of aesthetics and
              functionality for every project.
            </p>
          </div>
          <div className="my-5 relative">
            <h3 className={h3}>🎨 UI/UX , Web Designing</h3>
            <p className={p}>
              Crafting digital experiences is my forte as a UI/UX and web
              designer. I breathe life into designs, utilizing the most fitting
              front-end tools. While I favor modern JavaScript libraries like
              React.js, I always prioritize the website's unique needs. My goal
              is to blend aesthetic appeal with optimal functionality, creating
              web designs that not only look great but also offer an intuitive
              and engaging user experience.
            </p>
          </div>
          <div className="my-5  relative">
            <div className="flex flex-row gap-3 items-center">
              <svg
                width="56"
                height="56"
                viewBox="0 0 24 24"
                fill="none"
                className="opacity-80"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.17157 19.8284C4.34315 21 6.22876 21 10 21H13.9292C13.6543 20.5272 13.5 19.9792 13.5 19.4118C13.5 18.5958 13.8191 17.8199 14.3571 17.25H13.5C13.0858 17.25 12.75 16.9142 12.75 16.5C12.75 16.0858 13.0858 15.75 13.5 15.75H15.4282C15.9395 14.4601 17.1549 13.5 18.6667 13.5C20.2273 13.5 21.4762 14.5283 21.955 15.8805L21.9694 15.8905C22 15.0727 22 14.1194 22 13V12.75H2V13C2 16.7712 2 18.6569 3.17157 19.8284ZM6 18.25C5.58579 18.25 5.25 17.9142 5.25 17.5L5.25 15.5C5.25 15.0858 5.58579 14.75 6 14.75C6.41421 14.75 6.75 15.0858 6.75 15.5V17.5C6.75 17.9142 6.41421 18.25 6 18.25ZM9 18.25C8.58579 18.25 8.25 17.9142 8.25 17.5V15.5C8.25 15.0858 8.58579 14.75 9 14.75C9.41421 14.75 9.75 15.0858 9.75 15.5V17.5C9.75 17.9142 9.41421 18.25 9 18.25Z"
                  fill="#add8e6e6"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.17157 4.17157C2 5.34315 2 7.22876 2 11V11.25H22V11C22 7.22876 22 5.34315 20.8284 4.17157C19.6569 3 17.7712 3 14 3H10C6.22876 3 4.34315 3 3.17157 4.17157ZM9 9.25C8.58579 9.25 8.25 8.91421 8.25 8.5V6.5C8.25 6.08579 8.58579 5.75 9 5.75C9.41421 5.75 9.75 6.08579 9.75 6.5V8.5C9.75 8.91421 9.41421 9.25 9 9.25ZM5.25 8.5C5.25 8.91421 5.58579 9.25 6 9.25C6.41421 9.25 6.75 8.91421 6.75 8.5V6.5C6.75 6.08579 6.41421 5.75 6 5.75C5.58579 5.75 5.25 6.08579 5.25 6.5L5.25 8.5ZM12.75 7.5C12.75 7.08579 13.0858 6.75 13.5 6.75H18C18.4142 6.75 18.75 7.08579 18.75 7.5C18.75 7.91421 18.4142 8.25 18 8.25H13.5C13.0858 8.25 12.75 7.91421 12.75 7.5Z"
                  fill="#add8e6e6"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20.6543 16.8806C20.543 15.8226 19.6956 15 18.6667 15C17.8216 15 17.0989 15.555 16.806 16.3395C16.7161 16.5804 16.6667 16.8429 16.6667 17.1176C16.6667 17.3763 16.7105 17.6242 16.7907 17.8533C16.6966 17.8338 16.5994 17.8235 16.5 17.8235C16.0601 17.8235 15.6644 18.024 15.3901 18.3434C15.1477 18.6255 15 19.0004 15 19.4118C15 20.2889 15.6716 21 16.5 21H20C21.1046 21 22 20.0519 22 18.8824C22 17.9554 21.4375 17.1676 20.6543 16.8806Z"
                  fill="#add8e6e6"
                ></path>
                <path
                  d="M20.6543 16.8806C20.543 15.8226 19.6956 15 18.6667 15C17.8216 15 17.0989 15.555 16.806 16.3395C16.7161 16.5804 16.6667 16.8429 16.6667 17.1176C16.6667 17.3763 16.7105 17.6242 16.7907 17.8533C16.6966 17.8338 16.5994 17.8235 16.5 17.8235C16.0601 17.8235 15.6644 18.024 15.3901 18.3434C15.1477 18.6255 15 19.0004 15 19.4118C15 20.2889 15.6716 21 16.5 21H20C21.1046 21 22 20.0519 22 18.8824C22 17.9554 21.4375 17.1676 20.6543 16.8806Z"
                  fill="#add8e6e6"
                ></path>
              </svg>
              <h3 className={h3}>Server Hosting </h3>
            </div>
            <p className={p}>
              For hosting Django applications on a VPS, I prioritize flexibility
              and optimal performance. While my preferred choice is a VPS setup,
              I adapt to the project's requirements, ensuring seamless
              deployment. Whether it's Nginx, Gunicorn, or other tools, I tailor
              the hosting environment to maximize the Django application's
              efficiency and scalability.
            </p>
          </div>
        </div>
      </div>
      <div className=" md:py-20 py-10"></div>
      <TallyForm />
    </div>
  );
}

export default About;
