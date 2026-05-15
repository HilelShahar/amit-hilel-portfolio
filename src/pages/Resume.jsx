import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Download,
  Award,
  Briefcase,
  GraduationCap,
  Languages,
  Wrench,
  BrainCircuit,
  Star,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const resumeData = {
  experience: [
    {
      title: "UX Researcher",
      company: "Freelance",
      period: "2023 - Present",
      tasks: [
        "Conducted user research for product development using interviews, surveys, and usability testing.",
        "Collaborated with development and design teams to integrate research insights into product enhancements.",
        "Developed and managed WordPress websites, optimizing for user experience and SEO.",
        "Engaged with marketing and content teams to align website optimization with company goals, enhancing team collaboration.",
      ],
    },
    {
      title: "Senior Market Research Manager",
      company: "Marketest",
      period: "2016 - 2023",
      tasks: [
        "Led comprehensive market research across various industries, using qualitative and quantitative methods.",
        "Developed, managed surveys, and oversaw data analysis, applying advanced statistical analyses (e.g., Factor Analysis, Multiple Regression, ANOVA).",
        "Collaborated with clients and product teams to align research with strategic goals, enhancing teamwork.",
        "Consulted for top Israeli companies, focusing on customer satisfaction and market potential.",
        "Utilized search engines, business tools, and analytics for deep market insights.",
        "Presented findings to CEOs and teams, influencing strategic decisions.",
        "Customized research methods for client-specific needs, managing large-scale projects.",
      ],
    },
    {
      title: "Advisory Consultant",
      company: "Work it",
      period: "2020 - 2021",
      tasks: [
        "Provided tools and insight throughout decision making processes in the organization.",
        "Formulated organizational diagnoses for improvement of the organizational.",
        "Conducted interviews for relevant individuals.",
      ],
    },
  ],
  education: [
    { degree: "M.A Social Psychology", institution: "IDC" },
    { degree: "B.A Psychology", institution: "Max Stern Yezreel Valley College" },
    { degree: "User Experience Design", institution: "Technion" },
  ],
  skills: {
    industryKnowledge: [
      "Market Research",
      "Data Analysis",
      "Customer Experience",
      "Product Design",
      "User Interface",
      "User Experience",
      "Design Research",
      "Web Development",
    ],
    toolsAndTechnologies: [
      "Figma",
      "Axure",
      "Spss",
      "Excel",
      "SQL",
      "Wordpress",
      "Zapier",
      "Google Analytics",
      "SurveyMonkey",
    ],
  },
  languages: [
    { lang: "Hebrew", level: "Native" },
    { lang: "English", level: "Professional" },
  ],
};

export default function Resume() {
  const [hoveredSection, setHoveredSection] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  // Memoize background particles so their positions/types stay stable.
  const backgroundParticles = useMemo(() => {
    return Array.from({ length: 8 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      kind: Math.floor(Math.random() * 4), // 0..3
      duration: 6 + Math.random() * 4,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      {backgroundParticles.map((el, i) => (
        <motion.div
          key={i}
          className="absolute opacity-10"
          style={{ left: el.left, top: el.top }}
          animate={
            prefersReducedMotion
              ? {}
              : {
                y: [0, -40, 0],
                rotate: [0, 180, 360],
                scale: [0.8, 1.2, 0.8],
              }
          }
          transition={
            prefersReducedMotion
              ? {}
              : { duration: el.duration, repeat: Infinity, delay: el.delay }
          }
          aria-hidden="true"
        >
          {el.kind === 0 ? (
            <Star className="w-4 h-4 text-brown-400" />
          ) : el.kind === 1 ? (
            <Zap className="w-3 h-3 text-amber-400" />
          ) : el.kind === 2 ? (
            <Award className="w-4 h-4 text-brown-500" />
          ) : (
            <div className="w-3 h-3 bg-brown-400 rotate-45" />
          )}
        </motion.div>
      ))}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <header className="text-center mb-16" aria-labelledby="resume-title">
          <motion.h1
            id="resume-title"
            className="text-4xl md:text-5xl font-bold gradient-text mb-6 pb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
          >
            Resume
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-brown-600 max-w-2xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            A comprehensive overview of my experience, education, and skills.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
          >
            <Button
              size="lg"
              className="bg-brown-600 hover:bg-brown-700 text-white group relative overflow-hidden"
              asChild
            >
              <a
                href="/Amit_Hilel_CV_2026.pdf"
                download="Amit_Hilel_CV_2026.pdf"
                aria-label="Download resume as PDF"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brown-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Download className="w-5 h-5 mr-2 relative z-10" />
                <span className="relative z-10">Download PDF</span>
              </a>
            </Button>

          </motion.div>
        </header>

        <div className="space-y-12">
          {/* Experience */}
          <motion.section
            aria-labelledby="resume-experience"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-brown-lg border border-brown-100 relative overflow-hidden group"
            onMouseEnter={() => setHoveredSection("experience")}
            onMouseLeave={() => setHoveredSection(null)}
            whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-brown-50 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500"
              aria-hidden="true"
            />
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <Briefcase className="w-6 h-6 text-brown-600" aria-hidden="true" />
              <h2 id="resume-experience" className="text-2xl font-bold text-brown-800">
                Experience
              </h2>
              {hoveredSection === "experience" && (
                <motion.div
                  className="ml-auto"
                  animate={prefersReducedMotion ? {} : { rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Star className="w-5 h-5 text-amber-500" aria-hidden="true" />
                </motion.div>
              )}
            </div>

            <div className="space-y-8 relative z-10">
              {resumeData.experience.map((job, index) => (
                <motion.article
                  key={`${job.title}-${job.company}-${index}`}
                  className="border-l-2 border-brown-200 pl-6 relative"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="absolute -left-2 top-0 w-4 h-4 bg-brown-600 rounded-full border-2 border-white shadow-brown-lg"
                    animate={
                      hoveredSection === "experience" && !prefersReducedMotion
                        ? {
                          scale: [1, 1.2, 1],
                          backgroundColor: ["#8b5a2b", "#d4a574", "#8b5a2b"],
                        }
                        : {}
                    }
                    transition={{ duration: 2, repeat: Infinity }}
                    aria-hidden="true"
                  />
                  <h3 className="text-xl font-bold text-brown-700">{job.title}</h3>
                  <p className="text-brown-500 font-medium">
                    {job.company} • {job.period}
                  </p>
                  <ul className="list-disc list-inside text-brown-600 mt-2 space-y-1">
                    {job.tasks.map((task, i) => (
                      <li key={i}>{task}</li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </motion.section>

          {/* Education */}
          <motion.section
            aria-labelledby="resume-education"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-brown-lg border border-brown-100 relative overflow-hidden group"
            onMouseEnter={() => setHoveredSection("education")}
            onMouseLeave={() => setHoveredSection(null)}
            whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500"
              aria-hidden="true"
            />
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <GraduationCap className="w-6 h-6 text-brown-600" aria-hidden="true" />
              <h2 id="resume-education" className="text-2xl font-bold text-brown-800">
                Education
              </h2>
            </div>
            <div className="space-y-4 relative z-10">
              {resumeData.education.map((edu, index) => (
                <motion.div
                  key={`${edu.degree}-${edu.institution}-${index}`}
                  className="border-l-2 border-brown-200 pl-6 relative"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="absolute -left-2 top-0 w-4 h-4 bg-purple-600 rounded-full border-2 border-white shadow-brown-lg"
                    aria-hidden="true"
                  />
                  <h3 className="text-xl font-bold text-brown-700">{edu.degree}</h3>
                  <p className="text-brown-500 font-medium">{edu.institution}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Skills & Expertise */}
          <motion.section
            aria-labelledby="resume-skills"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-brown-lg border border-brown-100 relative overflow-hidden"
            whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-brown-600" aria-hidden="true" />
              <h2 id="resume-skills" className="text-2xl font-bold text-brown-800">
                Skills & Expertise
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BrainCircuit className="w-5 h-5 text-brown-500" aria-hidden="true" />
                  <h3 className="font-bold text-brown-700">Industry Knowledge</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.industryKnowledge.map((skill) => (
                    <motion.span
                      key={skill}
                      className="bg-brown-100 text-brown-700 text-sm font-medium px-3 py-1 rounded-full hover:bg-brown-600 hover:text-white transition-colors duration-300"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Wrench className="w-5 h-5 text-brown-500" aria-hidden="true" />
                  <h3 className="font-bold text-brown-700">Tools & Technologies</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.toolsAndTechnologies.map((tool) => (
                    <motion.span
                      key={tool}
                      className="bg-brown-100 text-brown-700 text-sm font-medium px-3 py-1 rounded-full hover:bg-brown-600 hover:text-white transition-colors duration-300"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-3">
                  <Languages className="w-5 h-5 text-brown-500" aria-hidden="true" />
                  <h3 className="font-bold text-brown-700">Languages</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resumeData.languages.map((lang) => (
                    <motion.span
                      key={lang.lang}
                      className="bg-brown-100 text-brown-700 text-sm font-medium px-3 py-1 rounded-full hover:bg-brown-600 hover:text-white transition-colors duration-300"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                    >
                      {lang.lang} ({lang.level})
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
