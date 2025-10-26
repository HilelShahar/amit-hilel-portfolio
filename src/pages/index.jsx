// src/components/pages/index.jsx
import React, { Suspense, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./Layout.jsx";

// Lazy-load route components for better initial load performance.
const Home = React.lazy(() => import("./Home"));
const About = React.lazy(() => import("./About"));
const Contact = React.lazy(() => import("./Contact"));
const Resume = React.lazy(() => import("./Resume"));
const ProjectRevolutionizingCX = React.lazy(() => import("./ProjectRevolutionizingCX"));
const ProjectMunicipalServices = React.lazy(() => import("./ProjectMunicipalServices"));
const ProjectRoutineBuilder = React.lazy(() => import("./ProjectRoutineBuilder"));
const ProjectMyCookBook = React.lazy(() => import("./ProjectMyCookBook"));

// Only used to derive the current page name from the URL.
// Mapping values aren't used elsewhere, but we keep them for clarity.
const PAGES = {
  Home,
  About,
  Contact,
  Resume,
  ProjectRevolutionizingCX,
  ProjectMunicipalServices,
  ProjectRoutineBuilder,
  ProjectMyCookBook,
};

function _getCurrentPage(url) {
  if (url.endsWith("/")) url = url.slice(0, -1);
  let urlLastPart = url.split("/").pop() || "";
  if (urlLastPart.includes("?")) urlLastPart = urlLastPart.split("?")[0];

  const pageName = Object.keys(PAGES).find(
    (page) => page.toLowerCase() === urlLastPart.toLowerCase()
  );
  return pageName || Object.keys(PAGES)[0];
}

// Wrapper that can access location inside Router.
function PagesContent() {
  const location = useLocation();

  // Avoid recomputing on unrelated renders
  const currentPage = useMemo(
    () => _getCurrentPage(location.pathname),
    [location.pathname]
  );

  return (
    <Layout currentPageName={currentPage}>
      <Suspense
        fallback={
          <div className="p-8 text-center text-brown-600">Loading…</div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Resume" element={<Resume />} />
          <Route path="/ProjectRevolutionizingCX" element={<ProjectRevolutionizingCX />} />
          <Route path="/ProjectMunicipalServices" element={<ProjectMunicipalServices />} />
          <Route path="/ProjectRoutineBuilder" element={<ProjectRoutineBuilder />} />
          <Route path="/ProjectMyCookBook" element={<ProjectMyCookBook />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default function Pages() {
  return (
    <Router>
      <PagesContent />
    </Router>
  );
}
