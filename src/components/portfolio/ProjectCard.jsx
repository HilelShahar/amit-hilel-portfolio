// src/components/portfolio/ProjectCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

/** Keep this outside the component so it isn't recreated on each render */
const projectPageMap = {
  1: "ProjectRevolutionizingCX",
  2: "ProjectMunicipalServices",
  3: "ProjectRoutineBuilder",
  4: "ProjectMyCookBook",
};

/** Variants (no React state for hover) */
const cardLiftVariants = {
  rest: { y: 0, rotateX: 0, rotateY: 0 },
  hover: {
    y: -8,
    rotateX: 2,
    rotateY: 2,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const sparkleVariants = {
  rest: { rotate: 0, scale: 1 },
  hover: {
    rotate: [0, 180, 360],
    scale: [1, 1.2, 1],
    transition: { duration: 1 },
  },
};

const gradientVariants = {
  rest: { opacity: 0.3 },
  hover: { opacity: 0.8, transition: { duration: 0.3 } },
};

const centerFabWrapVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.3 } },
};

const centerFabVariants = {
  rest: { scale: 0.8, rotate: -10 },
  hover: {
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const cornerDotVariants = {
  rest: { scale: 1, opacity: 0.6 },
  hover: {
    scale: [1, 1.5, 1],
    opacity: [0.6, 1, 0.6],
    transition: { duration: 1.5, repeat: Infinity },
  },
};

const descVariants = {
  rest: { x: 0 },
  hover: { x: 5, transition: { duration: 0.3 } },
};

const learnMoreRowVariants = {
  rest: { x: 0 },
  hover: { x: 10, transition: { type: "spring", stiffness: 300 } },
};

const learnMoreTextVariants = {
  rest: { letterSpacing: "0em" },
  hover: { letterSpacing: "0.05em", transition: { duration: 0.2 } },
};

const arrowVariants = {
  rest: { x: 0, rotate: 0 },
  hover: { x: 8, rotate: 45, transition: { type: "spring", stiffness: 300 } },
};

const borderPulseVariants = {
  rest: { opacity: 0, scale: 1 },
  hover: {
    opacity: [0, 1, 0],
    scale: [1, 1.05, 1],
    transition: { duration: 1.5, repeat: Infinity },
  },
};

function ProjectCardBase({ project, index }) {
  const isPhoneMockup = project.imagePresentation === "phone";
  const projectUrl =
    Object.prototype.hasOwnProperty.call(projectPageMap, project?.id)
      ? createPageUrl(projectPageMap[project.id])
      : createPageUrl("Home");

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link to={projectUrl}>
        <motion.div
          className="bg-white rounded-2xl overflow-hidden shadow-brown-lg hover:shadow-brown-2xl transition-all duration-500 transform border border-brown-100 relative h-full flex flex-col will-change-transform"
          variants={cardLiftVariants}
          initial="rest"
          animate="rest"
          whileHover="hover"
        >
          {/* Sparkle */}
          <motion.div className="absolute top-2 right-2 z-10" variants={sparkleVariants}>
            <Sparkles className="w-4 h-4 text-brown-400 opacity-60" />
          </motion.div>

          {/* Image Container */}
          <div
            className={`relative overflow-hidden bg-cream-100 flex items-center justify-center ${
              isPhoneMockup ? "h-[min(72vw,320px)] sm:h-64 md:h-72 lg:h-80" : "h-56 md:h-64 lg:h-72"
            }`}
          >
            <motion.img
              src={project.image}
              alt={project.title}
              className={
                isPhoneMockup
                  ? "h-[92%] w-auto max-w-[min(72%,220px)] sm:max-w-[min(58%,240px)] object-contain object-center drop-shadow-lg will-change-transform"
                  : "w-full h-full object-contain p-4 will-change-transform"
              }
              loading="lazy"
              decoding="async"
              whileHover={{ scale: isPhoneMockup ? 1.03 : 1.05 }}
              transition={{ duration: 0.6 }}
            />

            {/* Gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-brown-800/40 to-transparent"
              variants={gradientVariants}
            />

            {/* Floating action button */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              variants={centerFabWrapVariants}
            >
              <motion.div variants={centerFabVariants}>
                <Button
                  size="icon"
                  className="h-16 w-16 rounded-full bg-white/90 backdrop-blur-sm text-brown-700 shadow-xl hover:bg-white border-2 border-brown-200"
                >
                  <ExternalLink className="w-6 h-6" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Corner dot */}
            <motion.div
              className="absolute top-4 left-4 w-3 h-3 bg-brown-400 rounded-full"
              variants={cornerDotVariants}
            />
          </div>

          {/* Content */}
          <motion.div className="p-6 md:p-8 flex-grow flex flex-col transition-colors duration-300 bg-white group-hover:bg-[#fefcf7]">
            <h3 className="text-xl md:text-2xl font-bold mb-3 transition-colors duration-200 text-[#5c391d] group-hover:text-[#6f4423]">
              {project.title}
            </h3>

            <motion.p
              className="text-brown-600 text-base md:text-lg leading-relaxed mb-6"
              variants={descVariants}
            >
              {project.description}
            </motion.p>

            {/* Learn More */}
            <motion.div className="mt-auto" variants={learnMoreRowVariants}>
              <Button className="bg-brown-600 hover:bg-brown-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-200 group/btn">
                <motion.span variants={learnMoreTextVariants}>Learn More</motion.span>
                <motion.span className="inline-block ml-2" variants={arrowVariants}>
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Border pulse */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-brown-300 pointer-events-none"
            variants={borderPulseVariants}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}

const ProjectCard = React.memo(ProjectCardBase);
export default ProjectCard;
