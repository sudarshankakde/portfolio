import "./App.css";
import { React } from "react";
import Navbar from "./componets/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./componets/Footer";
// import Loader from ".././src/componets/Loader";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ScrollToTop from "./componets/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();
function App() {
  return (
    <div className="">
      <QueryClientProvider client={queryClient}>
        <Analytics />
        <ScrollToTop />
        {/* <Loader /> */}
        <Navbar />
        <Outlet />
        <Footer />
      </QueryClientProvider>
    </div>
  );
}

export default App;
