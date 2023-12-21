import "./App.css";
import { React } from "react";
import Navbar from "./componets/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./componets/Footer";
import gsap from "gsap";
import Loader from ".././src/componets/Loader";

function App() {
  return (
    <>
      <Loader />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
