// src/components/portfolio/ProjectsGrid.jsx
import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    id: 1,
    title: "Revolutionizing CX",
    description:
      "Explore how we're transforming customer experience with innovative strategies and tools",
    image:
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b69f4784813da7e3830160/8a7fbe784_PROJECT1.png",
    href: "/projects/revolutionizing-cx",
  },
  {
    id: 2,
    title: "Navigating Municipal Services",
    description:
      "Simplifying access to services with a clean and intuitive user experience.",
    image: "/projects/municipal-services-cover.png",
  },
  {
    id: 3,
    title: "Routine Builder",
    description:
      "Helping autistic individuals build and maintain daily routines through thoughtful design.",
    image:
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b69f4784813da7e3830160/268d2cb61_Frame-427319084.png",
  },
  {
    id: 4,
    title: "My CookBook",
    description:
      "Discover new recipes and curate your personalized cookbook experience",
    image:
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b69f4784813da7e3830160/acb7b5db8_5f4ebf8b732-1-1-1.png",
  },
];

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

function ProjectsGridBase() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-cream-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-6 pb-4">
            Featured Work
          </h2>
          <p className="text-lg md:text-xl text-brown-600 max-w-3xl mx-auto leading-relaxed">
            A collection of projects where design meets purpose, creating
            meaningful experiences that solve real problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default React.memo(ProjectsGridBase);
