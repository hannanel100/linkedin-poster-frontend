//react-routes for the application
// initial route - home
// route for timing post
// route for seeing all posts timed
// route for about page
// react-router-dom for routing
import { Routes, Route } from "react-router-dom";
import { About, Home, NoMatch, Post, Posts } from "../pages";

import Layout from "../components/Layout";
import LinkedinCallbackWrapper from "../components/LinkedinCallbackWrapper";
import ProtectedRoutes from "./ProtectedRoutes";

export const CustomRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="linkedin" element={<LinkedinCallbackWrapper />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="about" element={<About />} />
          <Route path="post" element={<Post />} />
          <Route path="posts" element={<Posts />} />
        </Route>

        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};
