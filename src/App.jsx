import "./App.css";
import { React } from "react";
import Navbar from "./componets/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./componets/Footer";
import Loader from ".././src/componets/Loader";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SpeedInsights } from "@vercel/speed-insights/react"
const queryClient = new QueryClient();
function App() {
  return (
    <div className="">
      
      <QueryClientProvider client={queryClient}>
        <Loader />
        <Navbar />

        <Outlet />
        <Footer />
        <SpeedInsights />
      </QueryClientProvider>
    </div>
  );
}

export default App;
