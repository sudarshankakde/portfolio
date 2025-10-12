import "./App.css";
import { React } from "react";
import Navbar from "./componets/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./componets/Footer";
// import Loader from ".././src/componets/Loader";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import DefaultSeo from "./componets/Seo";
import ScrollToTop from "./componets/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();
function App() {
  return (
    <div className="">
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <DefaultSeo />
          <Analytics />
          <ScrollToTop />
          {/* <Loader /> */}
          <Navbar />
          <Outlet />
          <Footer />
        </HelmetProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
