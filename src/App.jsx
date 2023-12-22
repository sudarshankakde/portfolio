import "./App.css";
import { React, useEffect, useRef } from "react";
import Navbar from "./componets/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./componets/Footer";
import Loader from ".././src/componets/Loader";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
function App() {
  const containerRef = useRef(null);
  const location  = useLocation().pathname;
  
  return (
    <div className="">
      <QueryClientProvider client={queryClient}>
        <Loader />
        <Navbar />
        <LocomotiveScrollProvider
          options={{
            smooth: true,

            // ... all available Locomotive Scroll instance options
          }}
          location={location}
          containerRef={containerRef}
          onLocationChange={(scroll) =>
            scroll.scrollTo(0, { duration: 0, disableLerp: true })
          } // If you want to reset the scroll position to 0 for example
        >
          <main data-scroll-container ref={containerRef}>
            <Outlet />
            <Footer />
          </main>
        </LocomotiveScrollProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
