import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Home from "./componets/Pages/Home";
import Contact from "./componets/Pages/Contact";
import NotFound404 from "./componets/Pages/NotFound404";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import About from "./componets/Pages/About";
import Blogs from "./componets/Pages/Blogs";
import ReadBlog from "./componets/Pages/ReadBlog";
import Project from "./componets/Pages/Project";
import Resume from "./componets/Pages/Resume";

const root = ReactDOM.createRoot(document.getElementById("root"));

export const ApiBaseURL = "https://sudharshankakde.pythonanywhere.com/";
export const MediaUrl = "https://sudharshankakde.pythonanywhere.com/DataBase/";
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       { path: "", element: <Home /> },
//       { path: "contact", element: <Contact /> },
//     ],
//   },
// ]);



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path="" element={<Home />} ></Route>
      <Route path="blog" element={<Blogs />}></Route>
      <Route path="blog/:slug" element={<ReadBlog />}></Route>
      <Route path="about" element={<About />}></Route>
      <Route path="contact" element={<Contact />}></Route>
      <Route path="project" element={<Project />}></Route> 
      <Route path="resume" element={<Resume />}></Route> 
      <Route path="*" element={<NotFound404 />}></Route> 
    </Route>
  )
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
