import "./App.css";
import { React, useRef } from "react";
import Navbar from "./componets/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./componets/Footer";
import Loader from ".././src/componets/Loader";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
function App() {
  const { pathname } = useLocation(); // With react-router
  const containerRef = useRef(null);

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
          location={pathname}
          containerRef={containerRef}
          onLocationChange={(scroll) =>
            scroll.scrollTo(0, { duration: 0, disableLerp: true })
          } // If you want to reset the scroll position to 0 for example
          onUpdate={() => console.log("Updated, but not on location change!")} // Will trigger on
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
