import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  ArrowLeft,
  Target,
  Lightbulb,
  Users,
  CheckCircle,
  BrainCircuit,
  Search,
  Activity,
  UserCheck,
  BarChart2,
  Zap,
  MessageSquare,
  BookOpen,
  Eye,
  TrendingUp,
  Settings,
  X,
  ZoomIn,
} from "lucide-react";

/* -------------------- Animation Variants -------------------- */
const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/* -------------------- Image Modal (memo) -------------------- */
const ImageModal = React.memo(function ImageModal({ src, alt, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    // lock background scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={alt || "Image preview"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-brown-900/80 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-7xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-full object-contain rounded-lg"
              loading="lazy"
              decoding="async"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 bg-white/90 hover:bg-white"
              onClick={onClose}
              aria-label="Close preview"
            >
              <X className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

/* -------------------- Challenge + Solution (memo) -------------------- */
const ChallengeSolution = React.memo(function ChallengeSolution({
  number,
  title,
  description,
  image,
  theory,
  theoryIcon: TheoryIcon,
  theoryTitle,
  image2,
  order = "normal",
  onImageClick,
}) {
  const onClick1 = useCallback(() => onImageClick(image, title), [image, title, onImageClick]);
  const onClick2 = useCallback(
    () => image2 && onImageClick(image2, title),
    [image2, title, onImageClick]
  );

  return (
    <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div
        variants={order === "reverse" ? slideInRight : slideInLeft}
        className={`space-y-4 ${order === "reverse" ? "lg:order-last" : ""}`}
      >
        <h3 className="text-2xl font-bold gradient-text leading-normal">Challenge {number}</h3>
        <p className="text-lg md:text-xl font-semibold text-brown-800 leading-normal">{title}</p>
        <p className="text-brown-600 leading-relaxed">{description}</p>
        {theory && (
          <blockquote className="border-l-4 border-brown-300 pl-4 py-2 bg-brown-50 rounded-r-lg">
            <div className="flex items-center gap-2 mb-2">
              {TheoryIcon ? <TheoryIcon className="w-5 h-5 text-brown-600" /> : null}
              <span className="font-semibold text-brown-700">{theoryTitle}</span>
            </div>
            <p className="text-sm text-brown-600 italic">{theory}</p>
          </blockquote>
        )}
      </motion.div>

      <motion.div
        variants={order === "reverse" ? slideInLeft : slideInRight}
        whileHover={{ scale: 1.03 }}
        className="flex flex-col items-center"
      >
        <button
          type="button"
          className="relative group cursor-pointer w-full"
          onClick={onClick1}
          aria-label={`Open image: ${title}`}
        >
          <img
            src={image}
            alt={title}
            className="rounded-lg shadow-brown-xl object-contain max-w-full h-auto"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-brown-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-white" />
          </div>
        </button>

        {image2 && (
          <button
            type="button"
            className="relative group cursor-pointer mt-4 w-full"
            onClick={onClick2}
            aria-label={`Open image: ${title} (2)`}
          >
            <img
              src={image2}
              alt={title}
              className="rounded-lg shadow-brown-xl object-contain max-w-full h-auto"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-brown-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white" />
            </div>
          </button>
        )}
      </motion.div>
    </motion.div>
  );
});

/* -------------------- Compact Carousel (memo) -------------------- */
const CompactCarousel = React.memo(function CompactCarousel({ images, onImageClick, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || paused || images.length <= 1) return;
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, [images.length, paused, prefersReducedMotion]);

  const openCurrent = useCallback(
    () => onImageClick(images[currentIndex], title),
    [images, currentIndex, onImageClick, title]
  );

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <motion.button
        type="button"
        className="relative bg-white rounded-xl p-4 shadow-brown-lg cursor-pointer group overflow-hidden w-full"
        onClick={openCurrent}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        aria-label={`${title} ${currentIndex + 1} of ${images.length}`}
      >
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} ${currentIndex + 1}`}
          className="w-full h-64 md:h-80 object-contain rounded-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          loading="lazy"
          decoding="async"
        />

        <div className="absolute inset-0 bg-brown-800/0 group-hover:bg-brown-800/10 transition-all duration-300 rounded-xl flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            className="bg-white/90 p-3 rounded-full shadow-lg"
          >
            <ZoomIn className="w-6 h-6 text-brown-700" />
          </motion.div>
        </div>

        <div className="absolute top-2 right-2 bg-brown-700/80 text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      </motion.button>

      <div className="flex justify-center gap-2 overflow-x-auto pb-2">
        {images.map((src, index) => {
          const isActive = index === currentIndex;
          return (
            <motion.button
              type="button"
              key={index}
              className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                isActive ? "border-brown-600 shadow-brown-lg" : "border-brown-200 hover:border-brown-400"
              }`}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={
                isActive && !prefersReducedMotion
                  ? {
                      y: [-2, 2, -2],
                      boxShadow: [
                        "0 4px 6px rgba(0,0,0,0.1)",
                        "0 8px 12px rgba(0,0,0,0.15)",
                        "0 4px 6px rgba(0,0,0,0.1)",
                      ],
                    }
                  : {}
              }
              transition={{
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 0.2 },
              }}
              aria-label={`Show slide ${index + 1}`}
              aria-current={isActive ? "true" : "false"}
            >
              <img
                src={src}
                alt={`${title} thumbnail ${index + 1}`}
                className="w-16 h-16 md:w-20 md:h-20 object-contain p-1 bg-white"
                loading="lazy"
                decoding="async"
              />

              {isActive && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-brown-600"
                  layoutId="activeIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-center" aria-hidden="true">
        <motion.div className="flex gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          {images.map((_, index) => (
            <motion.div
              key={index}
              className={`w-8 h-1 rounded-full ${index === currentIndex ? "bg-brown-600" : "bg-brown-300"}`}
              animate={
                index === currentIndex && !prefersReducedMotion
                  ? { scaleX: [0, 1], transition: { duration: 4, ease: "linear" } }
                  : {}
              }
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
});

/* -------------------- Page -------------------- */
export default function ProjectRevolutionizingCX() {
  const [modalImage, setModalImage] = useState({ src: "", alt: "", isOpen: false });

  const openImageModal = useCallback((src, alt) => {
    setModalImage({ src, alt, isOpen: true });
  }, []);

  const closeImageModal = useCallback(() => {
    setModalImage({ src: "", alt: "", isOpen: false });
  }, []);

  const scrollToSolutions = useCallback(() => {
    document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const gogoAIImages = useMemo(
    () => [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b69f4784813da7e3830160/a3d09d4cd_image-23.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b69f4784813da7e3830160/5a68de3a3_image-24.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b69f4784813da7e3830160/24e7d20c0_image-25.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b69f4784813da7e3830160/67ec33b4c_image-26.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b69f4784813da7e3830160/93515f2d9_image-27.png",
    ],
    []
  );

  return (
    <div className="bg-cream-50 min-h-screen relative overflow-hidden">
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      <motion.div className="absolute top-0 -left-1/4 w-96 h-96 bg-brown-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <motion.div className="absolute top-0 -right-1/4 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <motion.div className="absolute -bottom-1/4 left-1/3 w-96 h-96 bg-cream-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <ImageModal {...modalImage} onClose={closeImageModal} />

      <motion.main initial="hidden" animate="visible" variants={staggerContainer} className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h1 className="font-bold gradient-text mb-6 leading-tight pb-4">
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Revolutionizing CX:</span>
              <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl mt-2">Making Customer Experience Management a Breeze</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-brown-700 max-w-4xl mx-auto leading-relaxed px-4">
              Our innovative CX tool is designed to transform how businesses enhance customer experiences, simplifying the creation of personalized surveys and dashboards.
            </p>
            <div className="mt-8 flex justify-center items-center gap-4 text-xs md:text-base">
              <Button onClick={scrollToSolutions} className="bg-brown-600 hover:bg-brown-700 text-white text-sm md:text-base">
                Jump to Solution
              </Button>
              <span className="text-brown-600">or scroll for the story</span>
            </div>
          </motion.div>

          {/* Main Project Image */}
          <motion.div variants={fadeIn} className="mb-16 flex justify-center">
            <div className="max-w-3xl mx-auto">
              <motion.button
                type="button"
                className="relative group cursor-pointer w-full"
                onClick={() =>
                  openImageModal(
                    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b69f4784813da7e3830160/8a7fbe784_PROJECT1.png",
                    "CX Tool Dashboard"
                  )
                }
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                aria-label="Open CX Tool Dashboard image"
              >
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b69f4784813da7e3830160/8a7fbe784_PROJECT1.png"
                  alt="CX Tool Dashboard"
                  className="rounded-2xl shadow-brown-2xl w-full h-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-brown-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                  <ZoomIn className="w-12 h-12 text-white" />
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* TL;DR */}
          <motion.div variants={slideInLeft} className="bg-brown-100 p-6 sm:p-8 md:p-12 rounded-2xl mb-20">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-brown-900 mb-8 text-center leading-tight">TL;DR</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-brown-900 mb-4 flex items-center gap-2 leading-tight">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-brown-700" />
                  Problem
                </h3>
                <p className="text-sm sm:text-base text-brown-800 leading-relaxed">
                  Existing CX management systems are often outdated, with non-intuitive interfaces and difficult maintenance, leading to loss of customer loyalty.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-brown-900 mb-4 flex items-center gap-2 leading-tight">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-brown-700" />
                  Solution
                </h3>
                <ul className="text-sm sm:text-base text-brown-800 space-y-2">
                  <li>• Conducted usability studies and user research</li>
                  <li>• Enhanced digital platform based on findings</li>
                  <li>• Developed intuitive prototypes and interfaces</li>
                  <li>• Integrated advanced AI for better data analysis</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* My Role */}
          <motion.div variants={slideInRight} className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-brown-lg mb-20">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-brown-900 mb-8 leading-tight">My Role</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm sm:text-base text-brown-800 leading-relaxed mb-6">
                  As the sole product designer, I owned ideation, strategy, and design. I presented ideas to and
                  strategized with the small team regularly.
                </p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-brown-900 mb-4 leading-tight">Key Responsibilities:</h3>
                <ul className="space-y-3 text-sm sm:text-base text-brown-800">
                  <li className="flex gap-3">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 text-brown-600 mt-1 shrink-0" />
                    <span>Conducted user research to understand needs and challenges</span>
                  </li>
                  <li className="flex gap-3">
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-brown-600 mt-1 shrink-0" />
                    <span>Led usability testing to ensure intuitive interface</span>
                  </li>
                  <li className="flex gap-3">
                    <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-brown-600 mt-1 shrink-0" />
                    <span>Developed prototypes to visualize design concepts</span>
                  </li>
                  <li className="flex gap-3">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-brown-600 mt-1 shrink-0" />
                    <span>Collaborated with team to refine and implement design</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Problem Space */}
          <motion.div variants={fadeIn} className="mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center gradient-text mb-12 leading-tight pb-4">
              Problem Space
            </h2>
            <div className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-brown-lg">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-brown-900 mb-6 text-center leading-tight">
                What makes a CX tool truly innovative?
              </h3>
              <p className="text-base sm:text-lg text-brown-800 leading-relaxed mb-8 text-center max-w-4xl mx-auto">
                The market is saturated with CX tools that fall short due to outdated design and functionality.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-brown-50 rounded-xl">
                  <Settings className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-brown-600 mx-auto mb-4" />
                  <h4 className="font-bold text-brown-900 mb-2 leading-tight text-sm sm:text-base">Non-intuitive interfaces</h4>
                  <p className="text-brown-700 text-xs sm:text-sm">Complex interfaces that confuse users</p>
                </div>
                <div className="text-center p-6 bg-brown-50 rounded-xl">
                  <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-brown-600 mx-auto mb-4" />
                  <h4 className="font-bold text-brown-900 mb-2 leading-tight text-sm sm:text-base">Lack of ease of use</h4>
                  <p className="text-brown-700 text-xs sm:text-sm">Difficulty performing essential tasks</p>
                </div>
                <div className="text-center p-6 bg-brown-50 rounded-xl">
                  <Target className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-brown-600 mx-auto mb-4" />
                  <h4 className="font-bold text-brown-900 mb-2 leading-tight text-sm sm:text-base">Difficult maintenance</h4>
                  <p className="text-brown-700 text-xs sm:text-sm">Requires extensive resources and time</p>
                </div>
              </div>

              <div>
                <h4 className="text-lg sm:text-xl font-bold text-brown-900 mb-4 leading-tight">Our research approach:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ul className="space-y-2 text-sm sm:text-base text-brown-800">
                    <li>• Understood users' needs and pain points</li>
                    <li>• Engaged with stakeholders across teams</li>
                  </ul>
                  <ul className="space-y-2 text-sm sm:text-base text-brown-800">
                    <li>• Adopted industry best practices</li>
                    <li>• Evaluated current systems and performance</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Key Insights */}
          <motion.div variants={staggerContainer} className="mb-20">
            <motion.h2 variants={fadeIn} className="text-2xl sm:text-3xl md:text-4xl font-bold text-center gradient-text mb-12 leading-tight pb-4">
              Key Insights
            </motion.h2>
            <motion.div variants={fadeIn} className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-base sm:text-lg text-brown-800 leading-relaxed">
                Here's what I discovered through user interviews, surveys, and competitive analysis:
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                { icon: Search, title: "Inefficient Search", desc: "Complex interfaces with no smart search or auto-complete features result in slower access to data." },
                { icon: Activity, title: "No Activity Tracking", desc: "Lack of centralized dashboard for recent activities reduces workflow efficiency and increases cognitive load." },
                { icon: UserCheck, title: "Poor Client Management", desc: "Challenges in managing client profiles, users, and projects centrally with customizable alerts." },
                { icon: BarChart2, title: "Rigid Survey Creation", desc: "Overly complex survey tools lacking intuitive features like drag-and-drop functionality." },
                { icon: Zap, title: "Limited AI Integration", desc: "Absence of AI-powered features for data analysis and research summarization." },
              ].map((insight, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="bg-white p-4 sm:p-6 rounded-2xl shadow-brown-lg border-t-4 border-brown-300 group"
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                    boxShadow:
                      "0 20px 25px -5px rgba(74, 47, 23, 0.1), 0 10px 10px -5px rgba(74, 47, 23, 0.04)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div whileHover={{ rotate: 15, scale: 1.1 }}>
                    <insight.icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-brown-600 mb-4" />
                  </motion.div>
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-brown-900 mb-3 leading-tight">
                    {insight.title}
                  </h4>
                  <p className="text-brown-800 text-xs sm:text-sm leading-relaxed">{insight.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* UX Phase */}
          <motion.div variants={slideInLeft} className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-brown-lg mb-20">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-brown-900 mb-6 leading-tight">UX Phase: Putting it all together</h2>
            <p className="text-sm sm:text-base text-brown-800 leading-relaxed mb-6">
              In designing our CX tool, we based every decision on research and best practices, iterating through multiple
              refinements. User research and competitor analysis were key to understanding the market and user needs.
            </p>

            <h4 className="text-base sm:text-lg font-bold text-brown-900 mb-4 leading-tight">Key questions we asked during this phase:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm sm:text-base text-brown-800">
                <li>• How can I simplify the user interface?</li>
                <li>• What information is most critical for users?</li>
                <li>• How can I streamline survey creation?</li>
              </ul>
              <ul className="space-y-2 text-sm sm:text-base text-brown-800">
                <li>• How to integrate AI without complicating UX?</li>
                <li>• How can I improve activity tracking?</li>
                <li>• What design patterns work best?</li>
              </ul>
            </div>
          </motion.div>

          {/* Solutions */}
          <motion.div id="solutions" variants={staggerContainer} className="space-y-24">
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-center gradient-text leading-normal pb-4">
              The Solutions
            </motion.h2>

            <ChallengeSolution
              number="01"
              title="Smart Search with Auto-Complete"
              description="An intuitive and powerful search box that facilitates precise, efficient, and effortless searches, providing users with faster access to specific information."
              image="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b69f4784813da7e3830160/650b5d38e_Group-23.png"
              onImageClick={openImageModal}
            />

            <ChallengeSolution
              number="02"
              title="Dashboard – Recent Activity"
              description="The dashboard displays recent user activity, enabling quick access to last performed tasks, improving work efficiency by reducing the need for extended searching."
              image="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b69f4784813da7e3830160/061e6bd7b_Group-24.png"
              theoryTitle="Usability and Accessibility Model"
              theory="Provides immediate and intuitive access to recent activities, thus reducing cognitive effort and increasing user comfort."
              theoryIcon={CheckCircle}
              order="reverse"
              onImageClick={openImageModal}
            />

            <ChallengeSolution
              number="03"
              title="System Control – Client Management"
              description="Allows users to centrally manage client profiles, users, and projects, including customizable alerts and reports, facilitating efficient and focused access to relevant information."
              image="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b69f4784813da7e3830160/78cb6ca7f_Group-211.png"
              theoryTitle="Theory of Self-Control"
              theory="Empowering users to manage and control information, which enhances their sense of control and efficiency."
              theoryIcon={BrainCircuit}
              onImageClick={openImageModal}
            />

            <ChallengeSolution
              number="04"
              title="Polls – Survey Management"
              description="Enables easy and intuitive creation of surveys through a simple drag-and-drop process, enhancing the efficiency of the process and adding flexibility in survey design."
              image="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b69f4784813da7e3830160/dd0ce51a8_Group-25.png"
              theoryTitle="User Experience and Accessibility"
              theory="The system's design promotes accessibility and usability by simplifying complex processes, reducing cognitive difficulties in survey creation."
              theoryIcon={CheckCircle}
              order="reverse"
              onImageClick={openImageModal}
            />

            <motion.div variants={fadeIn} className="text-center space-y-8">
              <h3 className="text-2xl font-bold gradient-text leading-normal pb-4">Challenge 05 & 06</h3>
              <p className="text-xl font-semibold text-brown-800 leading-normal">gogoAI & Affinity Mapping</p>
              <p className="text-brown-600 max-w-3xl mx-auto leading-relaxed">
                Utilizing AI to simplify complex data analysis, summarize research, and understand target audiences through relationship mapping. These interfaces showcase the integration of artificial intelligence into the user experience design process.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
                className="py-8 max-w-4xl mx-auto"
              >
                <CompactCarousel images={gogoAIImages} onImageClick={openImageModal} title="gogoAI Interface" />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 max-w-3xl mx-auto">
                {[
                  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b69f4784813da7e3830160/f0a7ead2a_image-28.png",
                  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b69f4784813da7e3830160/a85f133e6_image-29.png",
                ].map((src, index) => (
                  <motion.button
                    type="button"
                    key={src}
                    className="relative group cursor-pointer"
                    onClick={() => openImageModal(src, "Affinity Mapping")}
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true, amount: 0.2 }}
                    aria-label={`Open Affinity Mapping image ${index + 1}`}
                  >
                    <img
                      src={src}
                      alt="Affinity Mapping"
                      className="rounded-lg shadow-brown-lg bg-white p-4 w-full h-48 object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-brown-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-white" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <ChallengeSolution
              number="07"
              title="Easy Access to Human Support"
              description="The question mark icon provides immediate access to human support, offering a vital way for users who prefer direct human assistance over searching for help articles."
              image="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b69f4784813da7e3830160/169151ac0_Group-22.png"
              theoryTitle="Social Support Theory"
              theory="This feature emphasizes the importance of social connections and support in user experience, giving users a sense of security and trust."
              theoryIcon={MessageSquare}
              onImageClick={openImageModal}
            />
          </motion.div>

          {/* Lessons */}
          <motion.div variants={fadeIn} className="mt-24 bg-brown-100/50 p-6 sm:p-8 md:p-12 rounded-2xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <motion.div
                className="text-center md:text-left"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <BookOpen className="w-10 h-10 sm:w-12 h-12 md:w-16 md:h-16 text-brown-600 mx-auto md:mx-0 mb-4" />
              </motion.div>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-brown-900 mb-4 leading-tight">Lessons Learned</h2>
                <p className="text-sm sm:text-base text-brown-800 leading-relaxed">
                  This project reinforced the importance of a user-centric approach. Working on this CX tool taught me the
                  immense value of user feedback and iterative design. Early assumptions didn't always match user needs,
                  making thorough research and usability testing crucial. Staying adaptable was key, as new insights led to
                  multiple design iterations, each enhancing the user experience.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Back */}
          <motion.div variants={fadeIn} className="text-center mt-16">
            <Button asChild variant="outline" className="bg-white border-brown-300 text-brown-800 hover:bg-brown-100 text-sm sm:text-base">
              <Link to={createPageUrl("Home")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Projects
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
}
