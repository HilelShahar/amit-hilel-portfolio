import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  ArrowLeft,
  Target,
  CheckCircle,
  Eye,
  Users,
  MessageSquare,
  X,
  ZoomIn,
  Star,
  BarChart,
} from "lucide-react";

/* -------------------- Animation Variants -------------------- */
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

/*
 * Routy app screens in logical flow order:
 * 1. Sign in (entry)  ->  2. Day Map dashboard  ->  3. Library
 * 4-8. Create a routine: New routine -> Name it -> Pick a picture -> AI suggestions -> Photo gallery
 * 9-11. Other dashboard views: Day Map (path), Day Map (list), Timeline
 */
const ROUTY_SCREENS = [
  "/projects/device.png",
  "/projects/device%20(3).png",
  "/projects/device%20(4).png",
  "/projects/device%20(5).png",
  "/projects/device%20(6).png",
  "/projects/device%20(8).png",
  "/projects/device%20(10).png",
  "/projects/device%20(9).png",
  "/projects/device%20(2).png",
  "/projects/device%20(7).png",
  "/projects/device%20(11).png",
];

/* -------------------- Image Modal -------------------- */
const ImageModal = React.memo(function ImageModal({ src, alt, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
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
            className="relative max-w-md max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[85vh] object-contain"
              loading="lazy"
              decoding="async"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 bg-white/90 hover:bg-white"
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

/* -------------------- Hero flow (single phone, auto-cycles in flow order) -------------------- */
const RoutyFlow = React.memo(function RoutyFlow({ onImageClick }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ROUTY_SCREENS.length);
    }, 2200);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const src = ROUTY_SCREENS[index];

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => onImageClick(src, "Routy app screen")}
        className="relative w-[240px] sm:w-[280px] aspect-[522/994] cursor-pointer"
        aria-label="Routy app flow. Click to enlarge."
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={src}
            src={src}
            alt="Routy app screen"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
            loading="eager"
            decoding="async"
          />
        </AnimatePresence>
      </button>

      <div className="mt-5 flex justify-center gap-1.5">
        {ROUTY_SCREENS.map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show screen ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-5 bg-brown-600" : "w-1.5 bg-brown-300 hover:bg-brown-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
});

/* -------------------- Screens Gallery (flow order, no labels) -------------------- */
const RoutyGallery = React.memo(function RoutyGallery({ onImageClick }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {ROUTY_SCREENS.map((src, index) => (
        <motion.button
          type="button"
          key={src}
          onClick={() => onImageClick(src, "Routy app screen")}
          className="group relative rounded-xl overflow-hidden bg-cream-100 border border-brown-200 shadow-brown-lg cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
          whileHover={{ y: -4 }}
          aria-label="Open Routy app screen"
        >
          <img
            src={src}
            alt="Routy app screen"
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-contain"
          />
          <div className="absolute inset-0 bg-brown-800/0 group-hover:bg-brown-800/15 transition-colors duration-300 flex items-center justify-center">
            <ZoomIn className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </motion.button>
      ))}
    </div>
  );
});

/* -------------------- Page -------------------- */
export default function ProjectRoutineBuilder() {
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

  return (
    <div className="bg-cream-50 min-h-screen">
      <ImageModal {...modalImage} onClose={closeImageModal} />

      <motion.main
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.header variants={fadeIn} className="text-center mb-16">
            <h1 className="text-2xl md:text-4xl font-bold gradient-text mb-6 leading-tight pb-4">
              Routine Builder: Simplifying Daily Routines for Autistic Individuals
            </h1>
            <p className="text-sm md:text-lg text-brown-700 max-w-4xl mx-auto leading-relaxed">
              Our RoutineBuilder app is designed to make daily life easier for autistic individuals by providing a simple and accessible way to create and maintain routines.
            </p>
            <div className="mt-8 flex justify-center items-center gap-4 text-xs md:text-base">
              <Button onClick={scrollToSolutions} className="bg-brown-600 hover:bg-brown-700 text-white text-sm md:text-base">
                Jump to Solution
              </Button>
              <span className="text-brown-600">or scroll for the story</span>
            </div>
          </motion.header>

          {/* App Flow — Hero (auto-cycling phone, flow order) */}
          <div className="max-w-3xl mx-auto mb-24">
            <RoutyFlow onImageClick={openImageModal} />
          </div>

          <div className="space-y-20">
            {/* TL;DR */}
            <motion.section variants={fadeIn} className="bg-brown-100 p-6 md:p-12 rounded-2xl">
              <h2 className="text-xl md:text-2xl font-bold text-brown-800 mb-8 text-center leading-tight">TL;DR</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-brown-800 mb-4 flex items-center gap-2 leading-tight">
                    <Target className="w-5 h-5 md:w-6 md:h-6 text-brown-600" />
                    Problem
                  </h3>
                  <p className="text-sm md:text-base text-brown-700 leading-relaxed">
                    Autistic individuals often face challenges organizing daily routines due to a lack of accessible, user-friendly tools tailored to their unique needs.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-brown-800 mb-4 flex items-center gap-2 leading-tight">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-brown-600" />
                    Solution
                  </h3>
                  <p className="text-sm md:text-base text-brown-700 leading-relaxed">
                    I designed an intuitive app that helps autistic children manage daily routines with customizable visual aids, created by caregivers.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* My Role & Quote */}
            <motion.section variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-xl md:text-2xl font-bold gradient-text leading-tight pb-4">My Role</h2>
                <ul className="text-sm md:text-base text-brown-700 list-disc list-inside space-y-2">
                  <li>Conducting user research with therapists and parents of autistic children.</li>
                  <li>Designing an accessible and engaging user interface.</li>
                  <li>Creating wireframes and high-fidelity prototypes.</li>
                  <li>Performing usability testing and refining the app.</li>
                </ul>
              </div>
              <div className="bg-brown-50 p-6 rounded-2xl border-l-4 border-brown-300">
                <blockquote className="text-brown-700 italic leading-relaxed text-base md:text-lg text-center">
                  <MessageSquare className="inline w-6 h-6 mr-2 opacity-50" />
                  "We need better tools to help autistic children manage their daily routines independently."
                  <p className="text-right text-sm mt-4 not-italic font-semibold">- A Parent of an Autistic Child</p>
                </blockquote>
              </div>
            </motion.section>

            {/* Problem Space */}
            <motion.section variants={fadeIn} className="bg-white p-6 md:p-12 rounded-2xl shadow-brown-lg">
              <h2 className="text-xl md:text-2xl font-bold text-brown-800 mb-2 text-center leading-tight">Problem Space</h2>
              <p className="text-center text-lg text-brown-600 mb-6 italic">But what does "better" even mean?</p>
              <p className="text-sm md:text-base text-brown-700 leading-relaxed mb-6">
                To design an effective app, I needed to understand their unique needs. My game plan included:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-cream-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-brown-800">1. Knowing the User:</h4>
                  <p className="text-sm text-brown-600">Conducted surveys and interviews with parents and therapists.</p>
                </div>
                <div className="bg-cream-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-brown-800">2. Understanding Stakeholders:</h4>
                  <p className="text-sm text-brown-600">Recognized the role of caregivers and educators.</p>
                </div>
                <div className="bg-cream-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-brown-800">3. Understanding Best Practices:</h4>
                  <p className="text-sm text-brown-600">Researched existing tools to find gaps.</p>
                </div>
                <div className="bg-cream-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-brown-800">4. Evaluating the Landscape:</h4>
                  <p className="text-sm text-brown-600">Analyzed limitations of current solutions.</p>
                </div>
              </div>
            </motion.section>

            {/* Key Insights */}
            <motion.section variants={staggerContainer}>
              <h2 className="text-xl md:text-2xl font-bold gradient-text text-center mb-8 leading-tight pb-4">
                Key Insights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Eye,
                    title: "In-app prompts were ignored",
                    desc: "Users, especially parents, often overlooked prompts, preferring their own reminder methods.",
                  },
                  {
                    icon: Users,
                    title: "Setup was too complicated",
                    desc: "Many parents found the setup process time-consuming and confusing, discouraging consistent use.",
                  },
                  {
                    icon: Star,
                    title: "Strengths in Operational Areas",
                    desc: "The interface was praised for convenience and speed in areas like payments.",
                  },
                  {
                    icon: BarChart,
                    title: "Lack of integration",
                    desc: "Parents found it inconvenient that the app didn't integrate with other tools they use.",
                  },
                ].map((insight, index) => (
                  <motion.div key={index} variants={fadeIn} className="bg-white p-6 rounded-lg shadow-brown-lg">
                    <insight.icon className="w-6 h-6 text-brown-600 mb-3" />
                    <h4 className="font-bold text-brown-800 text-base md:text-lg mb-2 leading-tight">
                      {insight.title}
                    </h4>
                    <p className="text-brown-700 leading-relaxed text-sm md:text-base">{insight.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Competitive Analysis */}
            <motion.section variants={fadeIn} className="bg-white p-6 md:p-12 rounded-2xl shadow-brown-lg">
              <h2 className="text-xl md:text-2xl font-bold text-brown-800 mb-4 text-center leading-tight">
                Competitive Analysis
              </h2>
              <p className="text-center text-brown-600 mb-6 text-sm md:text-base">
                I reviewed leading apps like Goally, Proloquo2Go, and Endless Reader. They offer visual aids and schedules but
                lack deep customization or focus on routines. My app combines their best features while offering superior
                customization, integration, and engagement.
              </p>
            </motion.section>

            {/* UX Phase */}
            <motion.section variants={fadeIn}>
              <h2 className="text-xl md:text-2xl font-bold gradient-text text-center mb-6 leading-tight pb-4">
                UX Phase: Putting It All Together
              </h2>
              <p className="text-center text-brown-700 max-w-3xl mx-auto mb-6 leading-relaxed text-sm md:text-base">
                My goal was an intuitive tool for more independence. Here are some key questions I asked myself:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center max-w-4xl mx-auto">
                <p className="bg-brown-50 p-3 rounded-lg text-sm md:text-base text-brown-800">
                  How can I create an easy-to-navigate interface for children?
                </p>
                <p className="bg-brown-50 p-3 rounded-lg text-sm md:text-base text-brown-800">
                  What visual cues can make routines engaging?
                </p>
                <p className="bg-brown-50 p-3 rounded-lg text-sm md:text-base text-brown-800">
                  How can I simplify the setup process for parents?
                </p>
                <p className="bg-brown-50 p-3 rounded-lg text-sm md:text-base text-brown-800">
                  What features are essential for consistency?
                </p>
              </div>
            </motion.section>

            {/* The Solutions */}
            <motion.section id="solutions" variants={staggerContainer} className="space-y-12">
              <h2 className="text-2xl md:text-4xl font-bold gradient-text text-center leading-tight pb-4">
                The Solutions
              </h2>
              <div className="space-y-8">
                {[
                  {
                    title: "Challenge 1: Easy Routine Creation",
                    solution:
                      "Added multiple entry points: a central button and contextual prompts within each time of day (Morning, Noon, etc.) to reduce navigation time.",
                  },
                  {
                    title: "Challenge 2: Customization",
                    solution:
                      "Enabled editable routine cards, custom notifications, and AI/community suggestions for new ideas.",
                  },
                  {
                    title: "Challenge 3: Consistency",
                    solution:
                      "Implemented visual progress trackers, a gamified badge/reward system, and daily summary reports for feedback.",
                  },
                ].map((item, index) => (
                  <motion.div key={index} variants={fadeIn} className="bg-white p-6 rounded-xl shadow-brown-lg">
                    <h3 className="text-lg md:text-xl font-bold text-brown-800 mb-3 leading-tight">{item.title}</h3>
                    <p className="text-sm md:text-base text-brown-700 leading-relaxed">{item.solution}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* App screens — full gallery (flow order, no labels) */}
            <motion.section variants={fadeIn}>
              <h2 className="text-xl md:text-2xl font-bold text-brown-800 mb-8 text-center leading-tight">
                Every Screen
              </h2>
              <RoutyGallery onImageClick={openImageModal} />
            </motion.section>

            {/* Lessons Learned */}
            <motion.section variants={fadeIn} className="bg-brown-100 p-6 md:p-12 rounded-2xl">
              <h2 className="text-xl md:text-2xl font-bold text-brown-800 mb-4 leading-tight">
                Lessons Learned / Next Steps
              </h2>
              <p className="text-sm md:text-base text-brown-700 leading-relaxed">
                A team member suggested adding mood tracking late in development. While a great idea, it highlighted the
                importance of setting and sticking to a clear project scope to avoid "scope creep." The project is still in
                active development, with early testing showing significant positive impact.
              </p>
            </motion.section>

            {/* Back Button */}
            <motion.div variants={fadeIn} className="text-center pt-12">
              <Button
                asChild
                variant="outline"
                className="bg-white border-brown-300 text-brown-800 hover:bg-brown-100 text-sm md:text-base"
              >
                <Link to={createPageUrl("Home")}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to All Projects
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
