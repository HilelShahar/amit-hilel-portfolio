
import React from "react";
import Hero from "../components/portfolio/Hero";
import ProjectsGrid from "../components/portfolio/ProjectsGrid";
import Skills from "../components/portfolio/Skills";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProjectsGrid />
      <Skills />
    </div>
  );
}
