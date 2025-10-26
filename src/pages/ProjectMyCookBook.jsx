// src/components/pages/ProjectMyCookBook.jsx
import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  ArrowLeft,
  Target,
  CheckCircle,
  X,
  ZoomIn,
  Search,
  Share2,
  Folder,
  Camera,
  Video,
  FileText,
  Lightbulb,
  Users,
  BookOpen,
} from "lucide-react";

/* -------------------- Animation Variants (stable) -------------------- */
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/* -------------------- Reusable Image Modal -------------------- */
const ImageModal = React.memo(function ImageModal({ src, alt, isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-brown-900/80 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
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
            >
              <X className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

/* -------------------- Clickable Image -------------------- */
const ClickableImage = React.memo(function ClickableImage({
  src,
  alt,
  onImageClick,
  className = "",
}) {
  const handleClick = useCallback(() => onImageClick(src, alt), [onImageClick, src, alt]);

  return (
    <motion.div
      className={`relative group cursor-pointer ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <img
        src={src}
        alt={alt}
        className="rounded-lg shadow-brown-xl object-contain w-full h-auto bg-white p-2"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-brown-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center will-change-transform">
        <ZoomIn className="w-10 h-10 text-white" />
      </div>
    </motion.div>
  );
});

/* -------------------- Page -------------------- */
export default function ProjectMyCookBook() {
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

  const insightsCards = useMemo(
    () => [
      {
        icon: Camera,
        title: "Visual Content Preference",
        desc:
          "Users are more likely to follow recipes with step-by-step photos or videos rather than just text.",
      },
      {
        icon: Search,
        title: "Quick Recipe Access",
        desc: "Users expressed frustration when trying to locate previously saved recipes easily.",
      },
      {
        icon: Share2,
        title: "Seamless Sharing",
        desc: "Some users found it cumbersome to share their saved recipes with friends or family.",
      },
      {
        icon: FileText,
        title: "Personalization",
        desc:
          "Users noted that there aren't enough apps that let them easily adjust and save recipes to fit their personal needs.",
      },
    ],
    []
  );

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
          <motion.header variants={fadeIn} className="text-center mb-16">
            <h1 className="text-2xl md:text-4xl font-bold gradient-text mb-6 leading-tight pb-4">
              MyCookBook: Your Personal Recipe Collection
            </h1>
            <p className="text-sm md:text-lg text-brown-700 max-w-4xl mx-auto leading-relaxed">
              MyCookBook was born from my love for food and the need to organize all the successful
              recipes I've created over the years. As a foodie who loves experimenting with new
              dishes, I often struggle to find my favorite recipes across various websites. I wanted
              a single platform to store, access, and easily share my recipes.
            </p>
            <div className="mt-8 flex justify-center items-center gap-4 text-xs md:text-base">
              <Button
                onClick={scrollToSolutions}
                className="bg-brown-600 hover:bg-brown-700 text-white text-sm md:text-base"
              >
                Jump to Solution
              </Button>
              <span className="text-brown-600">or scroll for the story</span>
            </div>
          </motion.header>

          {/* Main Project Image */}
          <div className="max-w-3xl mx-auto mb-20">
            <ClickableImage
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b69f4784813da7e3830160/b9fa248da_5f4ebf8b732-1-1-11.png"
              alt="My CookBook App"
              onImageClick={openImageModal}
            />
          </div>

          <div className="space-y-20">
            <motion.section variants={fadeIn} className="bg-brown-100 p-6 md:p-12 rounded-2xl">
              <h2 className="text-xl md:text-2xl font-bold text-brown-800 mb-8 text-center leading-tight">
                TL;DR
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-brown-800 mb-4 flex items-center gap-2 leading-tight">
                    <Target className="w-5 h-5 md:w-6 md:h-6 text-brown-600" />
                    Problem
                  </h3>
                  <ul className="text-sm md:text-base text-brown-700 list-disc list-inside space-y-2">
                    <li>Love cooking and trying new recipes</li>
                    <li>Struggled to find past successful recipes scattered across various websites</li>
                    <li>Needed a single place to organize, access, and easily share recipes</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-brown-800 mb-4 flex items-center gap-2 leading-tight">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-brown-600" />
                    Solution
                  </h3>
                  <ul className="text-sm md:text-base text-brown-700 list-disc list-inside space-y-2">
                    <li>MyCookBook centralizes all recipes in one app</li>
                    <li>Organizes recipes by category</li>
                    <li>Allows uploading videos, photos, and detailed instructions</li>
                    <li>Easy sharing with friends and family</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            <motion.section
              variants={slideInLeft}
              className="bg-white p-6 md:p-12 rounded-2xl shadow-brown-lg"
            >
              <h2 className="text-xl md:text-2xl font-bold text-brown-800 mb-6 leading-tight">
                My Role
              </h2>
              <ul className="space-y-3 text-sm md:text-base text-brown-700">
                <li className="flex gap-3">
                  <Search className="w-4 h-4 md:w-5 md:h-5 text-brown-600 mt-1 shrink-0" />
                  <span>Led user research to identify needs and challenges</span>
                </li>
                <li className="flex gap-3">
                  <Lightbulb className="w-4 h-4 md:w-5 md:h-5 text-brown-600 mt-1 shrink-0" />
                  <span>Designed and prototyped a user-friendly interface</span>
                </li>
                <li className="flex gap-3">
                  <Users className="w-4 h-4 md:w-5 md:h-5 text-brown-600 mt-1 shrink-0" />
                  <span>Conducted usability testing to ensure accessibility</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-brown-600 mt-1 shrink-0" />
                  <span>Collaborated with development to align with the vision</span>
                </li>
              </ul>
            </motion.section>

            <motion.section
              variants={fadeIn}
              className="bg-white p-6 md:p-12 rounded-2xl shadow-brown-lg"
            >
              <h2 className="text-xl md:text-2xl font-bold text-brown-800 mb-6 text-center leading-tight">
                Problem Space
              </h2>
              <p className="text-sm md:text-lg text-brown-700 leading-relaxed max-w-4xl mx-auto text-center mb-8">
                How can home cooks efficiently manage and share their favorite recipes?
              </p>
              <p className="text-sm md:text-base text-brown-700 leading-relaxed max-w-4xl mx-auto mb-8">
                The challenge for many home cooks and food enthusiasts lies in managing a growing
                collection of recipes spread across various platforms and sources. This
                disorganization leads to frustration, time wasted searching for recipes, and
                difficulty in sharing favorite dishes with others.
              </p>
              <div>
                <h4 className="text-base md:text-lg font-bold text-brown-800 mb-4 leading-tight">
                  Our approach to solving these issues:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ul className="space-y-2 text-sm md:text-base text-brown-700 list-disc list-inside">
                    <li>Centralized Recipe Management</li>
                    <li>Easy Access and Organization</li>
                  </ul>
                  <ul className="space-y-2 text-sm md:text-base text-brown-700 list-disc list-inside">
                    <li>Multimedia Integration</li>
                    <li>Simplified Sharing</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            <motion.section variants={staggerContainer}>
              <motion.h2
                variants={fadeIn}
                className="text-2xl md:text-4xl font-bold text-center gradient-text mb-12 leading-tight pb-4"
              >
                Key Insights
              </motion.h2>
              <motion.div variants={fadeIn} className="text-center max-w-3xl mx-auto mb-16">
                <p className="text-base md:text-lg text-brown-800 leading-relaxed">
                  Here's what I discovered:
                </p>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
              >
                {insightsCards.map((insight, index) => (
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
                    <p className="text-brown-800 text-xs sm:text-sm leading-relaxed">
                      {insight.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            <motion.section
              variants={slideInLeft}
              className="bg-white p-6 md:p-12 rounded-2xl shadow-brown-lg"
            >
              <h2 className="text-xl md:text-2xl font-bold text-brown-900 mb-6 leading-tight">
                UX Phase: Making Recipe Management More Intuitive
              </h2>
              <p className="text-sm md:text-base text-brown-800 leading-relaxed mb-6">
                Here are some of the questions I asked myself during this stage:
              </p>

              <div className="space-y-4 text-sm md:text-base text-brown-800">
                <p className="flex gap-2">
                  <span className="font-bold text-brown-600">a.</span> How can we simplify the
                  process of saving and organizing recipes to ensure users can quickly find what
                  they're looking for?
                </p>
                <p className="flex gap-2">
                  <span className="font-bold text-brown-600">b.</span> What additional customization
                  options can we offer to allow users to personalize and adapt recipes to their
                  individual tastes and dietary needs?
                </p>
                <p className="flex gap-2">
                  <span className="font-bold text-brown-600">c.</span> How can we make sharing
                  recipes with friends and family more intuitive and seamless, reducing any friction
                  in the process?
                </p>
              </div>
            </motion.section>

            <motion.section id="solutions" variants={staggerContainer} className="space-y-12">
              <h2 className="text-2xl md:text-4xl font-bold gradient-text text-center leading-tight pb-4">
                The Solutions
              </h2>
              <p className="text-center text-brown-700 text-sm md:text-base">
                Here's how I ended up solving core issues:
              </p>

              {/* Wireframes Image - Smaller */}
              <div className="max-w-2xl mx-auto mb-12">
                <ClickableImage
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b69f4784813da7e3830160/8600c53e2_Frame-427319076-1-scaled.png"
                  alt="MyCookBook Wireframes"
                  onImageClick={openImageModal}
                />
              </div>

              <div className="space-y-16">
                {/* Challenge 1 */}
                <motion.div
                  variants={fadeIn}
                  className="bg-white p-6 md:p-8 rounded-2xl shadow-brown-lg"
                >
                  <h3 className="text-xl md:text-2xl font-bold gradient-text mb-4 leading-normal">
                    Challenge No. 1
                  </h3>
                  <p className="text-lg font-semibold text-brown-800 mb-4 leading-normal">
                    How can users efficiently organize recipes?
                  </p>
                  <p className="text-sm md:text-base text-brown-600 leading-relaxed mb-4">
                    The interface allows users to add photos, videos, and text into a single recipe
                    card. Users can upload videos, multiple recipes, and images, and arrange the
                    recipe according to their personal preferences. If they wish to modify an
                    existing recipe, they can edit it and save it under a relevant folder.
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    <span className="bg-brown-100 text-brown-700 px-3 py-1 rounded-full text-xs md:text-sm font-medium flex items-center gap-2">
                      <Camera className="w-3 h-3" />
                      Photos
                    </span>
                    <span className="bg-brown-100 text-brown-700 px-3 py-1 rounded-full text-xs md:text-sm font-medium flex items-center gap-2">
                      <Video className="w-3 h-3" />
                      Videos
                    </span>
                    <span className="bg-brown-100 text-brown-700 px-3 py-1 rounded-full text-xs md:text-sm font-medium flex items-center gap-2">
                      <FileText className="w-3 h-3" />
                      Rich Text
                    </span>
                  </div>
                </motion.div>

                {/* Challenge 2 */}
                <motion.div
                  variants={fadeIn}
                  className="bg-white p-6 md:p-8 rounded-2xl shadow-brown-lg"
                >
                  <h3 className="text-xl md:text-2xl font-bold gradient-text mb-4 leading-normal">
                    Challenge No. 2
                  </h3>
                  <p className="text-lg font-semibold text-brown-800 mb-4 leading-normal">
                    How can users easily save and retrieve recipes?
                  </p>
                  <p className="text-sm md:text-base text-brown-600 leading-relaxed mb-4">
                    The final design displays a clear folder structure where users can categorize
                    their recipes (e.g., "Family Recipes," "Desserts," "Favorites"). Alongside this,
                    the search feature offers filtering by ingredient or recipe type, which
                    minimizes the time spent locating a saved recipe.
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    <span className="bg-brown-100 text-brown-700 px-3 py-1 rounded-full text-xs md:text-sm font-medium flex items-center gap-2">
                      <Folder className="w-3 h-3" />
                      Folder Structure
                    </span>
                    <span className="bg-brown-100 text-brown-700 px-3 py-1 rounded-full text-xs md:text-sm font-medium flex items-center gap-2">
                      <Search className="w-3 h-3" />
                      Smart Search
                    </span>
                  </div>
                </motion.div>

                {/* Challenge 3 */}
                <motion.div
                  variants={fadeIn}
                  className="bg-white p-6 md:p-8 rounded-2xl shadow-brown-lg"
                >
                  <h3 className="text-xl md:text-2xl font-bold gradient-text mb-4 leading-normal">
                    Challenge No. 3
                  </h3>
                  <p className="text-lg font-semibold text-brown-800 mb-4 leading-normal">
                    How can users easily share recipes?
                  </p>
                  <p className="text-sm md:text-base text-brown-600 leading-relaxed mb-4">
                    The interface includes a simple share button, visible on every recipe card. By
                    tapping the share icon, users can instantly send recipes to friends or post them
                    on social media without leaving the app.
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    <span className="bg-brown-100 text-brown-700 px-3 py-1 rounded-full text-xs md:text-sm font-medium flex items-center gap-2">
                      <Share2 className="w-3 h-3" />
                      One-Tap Sharing
                    </span>
                    <span className="bg-brown-100 text-brown-700 px-3 py-1 rounded-full text-xs md:text-sm font-medium flex items-center gap-2">
                      <Users className="w-3 h-3" />
                      Social Integration
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* Final Design Image - Smaller */}
            <div className="max-w-2xl mx-auto mt-20">
              <ClickableImage
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b69f4784813da7e3830160/8f9efda77_Frame-427319075-1-scaled2.png"
                alt="MyCookBook Final Design"
                onImageClick={openImageModal}
              />
            </div>

            <motion.div
              variants={fadeIn}
              className="bg-brown-100/50 p-6 md:p-12 rounded-2xl mt-20"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <motion.div
                  className="text-center md:text-left"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <BookOpen className="w-10 h-10 md:w-16 md:h-16 text-brown-600 mx-auto md:mx-0 mb-4" />
                </motion.div>
                <div>
                  <h2 className="text-xl md:text-3xl font-bold text-brown-900 mb-4 leading-tight">
                    Lessons Learned / Next Steps
                  </h2>
                  <h3 className="text-lg md:text-xl font-semibold text-brown-800 mb-3">
                    Simplifying User Processes and Setting Clear Boundaries
                  </h3>
                  <p className="text-sm md:text-base text-brown-700 leading-relaxed mb-4">
                    During the development of MyCookBook, I realized the importance of setting clear
                    boundaries in the development process while simplifying the user interface.
                    Early in the project, I encountered challenges such as efficiently managing
                    recipes, organizing multimedia content like videos and photos, and ensuring a
                    seamless user experience for sharing recipes.
                  </p>
                  <p className="text-sm md:text-base text-brown-700 leading-relaxed">
                    A key takeaway was understanding the critical need for detailed and early
                    documentation of the project's scope to prevent scope creep and ensure the
                    project stays on budget and on time. By leveraging user research and usability
                    testing, I was able to balance flexibility with practical solutions that aligned
                    smoothly with the app's original vision.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="text-center mt-20">
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
