// src/components/pages/ProjectMunicipalServices.jsx
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  ArrowLeft,
  Target,
  CheckCircle,
  MessageSquare,
  X,
  ZoomIn,
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
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

/* -------------------- Static data (stable) -------------------- */
const solutionsData = [
  {
    title: "Challenge 1: Personalization",
    question:
      "What additional personalization options can we introduce to meet users' expectations for a customized experience?",
    points: [
      "Personalized Dashboard: Create a customizable dashboard where users can add, remove, and arrange widgets based on their interests and frequently accessed features.",
      "Custom Notifications: Allow users to set and customize notifications for various updates, choosing how they receive them (e.g., SMS, email, in-app notifications).",
    ],
    images: [
      "/projects/municipal-challenge1-edit-favorites.png",
      "/projects/municipal-challenge1-dashboard.png",
    ],
  },
  {
    title: "Challenge 2: Navigation",
    question:
      "How can we improve navigation and orientation within the interface to reduce user frustration?",
    points: [
      "Simplified and Intuitive Layout: Designed a clean, uncluttered interface with clear labels and intuitive icons, making it easier for users to quickly find and access key features.",
      "Consistent and Internal Navigation: Implemented a consistent navigation bar that remains visible across most pages and included internal navigation links within each section of information.",
    ],
    images: ["/projects/municipal-challenge2-parking-services.png"],
  },
  {
    title: "Challenge 3: Integration",
    question:
      "How can we enhance the transition between external sites and the main platform to maintain continuity and a seamless experience for users?",
    points: [
      "Integration of External Sites within a Pop-Up: Navigating to external sites is done within a pop-up that opens from the main application. This way, users understand that they are still within the same environment.",
      "Consistent Design and No Need to Re-enter Details: I maintained a consistent design between the main application and external sites, ensuring that users feel they are still within the familiar environment.",
    ],
    images: ["/projects/municipal-challenge3-payment.png"],
  },
];

const municipalCustomerJourneyMapsImage = "/projects/municipal-customer-journey-maps.png";

const municipalScreensOverviewImage = "/projects/municipal-visual-screens-overview.png";

/* -------------------- Reusable Image Modal -------------------- */
const ImageModal = React.memo(function ImageModal({ src, alt, isOpen, onClose, grayscale = false }) {
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-auto overscroll-contain bg-brown-900/80"
          onClick={onClose}
          role="presentation"
        >
          <Button
            variant="outline"
            size="icon"
            className="fixed top-4 right-4 z-[60] bg-white/90 hover:bg-white shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <X className="w-4 h-4" />
          </Button>
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative mx-auto flex w-full max-w-[min(96rem,98vw)] justify-center px-4 pb-12 pt-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className={`h-auto max-w-full rounded-lg shadow-lg ${grayscale ? "grayscale" : ""}`}
              loading="lazy"
              decoding="async"
            />
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
  imageClassName = "",
  priority = false,
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
        className={`rounded-lg shadow-brown-xl object-contain w-full bg-white p-1 max-w-full h-auto max-h-full ${imageClassName}`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
      />
      <div className="absolute inset-0 bg-brown-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center will-change-transform">
        <ZoomIn className="w-10 h-10 text-white" />
      </div>
    </motion.div>
  );
});

/* -------------------- Solutions Tabs -------------------- */
const SolutionsTabs = React.memo(function SolutionsTabs({ onImageClick }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleSetTab = useCallback((i) => setActiveTab(i), []);
  const current = solutionsData[activeTab];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
        {solutionsData.map((solution, index) => (
          <motion.button
            key={solution.title}
            onClick={() => handleSetTab(index)}
            className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full relative transition-colors duration-300 ${
              activeTab === index ? "text-white" : "text-brown-700 bg-white hover:bg-brown-100"
            }`}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            {activeTab === index && (
              <motion.div
                layoutId="activeSolutionTab"
                className="absolute inset-0 bg-brown-600 rounded-full will-change-transform"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{`Challenge ${index + 1}`}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="bg-white p-6 md:p-8 rounded-2xl shadow-brown-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-brown-800 leading-snug">
                {current.title}
              </h3>
              <p className="text-base text-brown-700 italic leading-relaxed">{current.question}</p>
              <ul className="list-disc list-inside space-y-2 text-brown-600">
                {current.points.map((point, i) => (
                  <li key={i} className="leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Thumbnails */}
            <div className="flex flex-wrap gap-3 justify-center items-start">
              {current.images.map((src, i) => {
                const altText = `${current.title} image ${i + 1}`;
                return (
                  <motion.div
                    key={`${src}-${i}`}
                    className="relative group cursor-pointer"
                    onClick={() => onImageClick(src, altText)}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    style={{
                      width: current.images.length > 1 ? "calc(50% - 6px)" : "100%",
                      maxWidth: "200px",
                    }}
                  >
                    <img
                      src={src}
                      alt={altText}
                      className="rounded-lg shadow-brown-lg object-contain w-full h-auto bg-white p-2 border border-brown-100"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-brown-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center will-change-transform">
                      <ZoomIn className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

/* -------------------- Page -------------------- */
export default function ProjectMunicipalServices() {
  const [modalImage, setModalImage] = useState({
    src: "",
    alt: "",
    isOpen: false,
    grayscale: false,
  });

  const openImageModal = useCallback((src, alt, opts = {}) => {
    setModalImage({
      src,
      alt,
      isOpen: true,
      grayscale: !!opts.grayscale,
    });
  }, []);

  const closeImageModal = useCallback(() => {
    setModalImage({ src: "", alt: "", isOpen: false, grayscale: false });
  }, []);

  const scrollToSolutions = useCallback(() => {
    document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const insights = useMemo(
    () => [
      { title: "Usability Challenges", desc: "Residents struggled with navigation and orientation, leading to frustration." },
      { title: "Personalization Gap", desc: "The platform lacked the customization and tailored information users expected." },
      { title: "Strengths in Operational Areas", desc: "Payment areas were praised for convenience, simplicity, and speed." },
      { title: "Integration and Continuity Issues", desc: "Transition between the platform and external sites was cumbersome and disruptive." },
    ],
    []
  );

  const quotes = useMemo(
    () => [
      '"Instead of calling it "Profile," I would name it something more personal, like "Your Account" or something similar".',
      '"Switching between \'My Digital\' and other sites is a hassle."',
      '""Profile" feels less personal to me... Calling it "Profile" seems too generic."',
      '"I expected more customization options."',
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
          {/* Header */}
          <motion.header variants={fadeIn} className="text-center mb-16">
            <h1 className="text-2xl md:text-4xl font-bold gradient-text mb-6 leading-normal pb-4">
              Navigating Municipal Services Shouldn't Be Hard
            </h1>
            <p className="text-sm md:text-lg text-brown-700 max-w-4xl mx-auto leading-relaxed">
              I designed an app for the municipality to streamline citizen interactions and improve access to services. By conducting usability studies and implementing user feedback, I enhanced the digital platform, increasing efficiency, user satisfaction, and adoption rates.
            </p>
            <div className="mt-8 flex justify-center items-center gap-4 text-xs md:text-base">
              <Button onClick={scrollToSolutions} className="bg-brown-600 hover:bg-brown-700 text-white text-sm md:text-base">
                Jump to Solution
              </Button>
              <span className="text-brown-600">or scroll for the story</span>
            </div>
          </motion.header>

          {/* Main Project Image */}
          <div className="max-w-3xl mx-auto mb-20">
            <ClickableImage
              src="/projects/municipal-services-cover.png"
              alt="Municipal Services App"
              onImageClick={openImageModal}
              priority
            />
          </div>

          {/* Sections */}
          <div className="space-y-20">
            {/* TL;DR */}
            <motion.section variants={fadeIn} className="bg-brown-100 p-6 md:p-12 rounded-2xl">
              <h2 className="text-xl md:text-2xl font-bold text-brown-800 mb-8 text-center leading-tight">
                TL;DR
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg md::text-xl font-bold text-brown-800 mb-4 flex items-center gap-2 leading-tight">
                    <Target className="w-5 h-5 md:w-6 md:h-6 text-brown-600" />
                    Problem
                  </h3>
                  <p className="text-sm md:text-base text-brown-700 leading-relaxed">
                    Most resident interactions are handled through the call center. The "My Digital" website, meant to simplify this, is difficult for residents to use efficiently.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-brown-800 mb-4 flex items-center gap-2 leading-tight">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-brown-600" />
                    Solution
                  </h3>
                  <ul className="text-sm md:text-base text-brown-700 list-disc list-inside space-y-1">
                    <li>Conduct a usability study for the prototype.</li>
                    <li>Enhance the digital platform based on research findings.</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* My Role */}
            <motion.section variants={fadeIn}>
              <h2 className="text-xl md:text-2xl font-bold gradient-text text-center mb-8 leading-tight pb-4">
                My Role
              </h2>
              <p className="text-center text-brown-700 max-w-3xl mx-auto mb-10 leading-relaxed text-sm md:text-base">
                During the project, my roles included recruiting users, conducting SWOT analysis, creating personas, developing research questions, performing usability testing, facilitating Design Thinking workshops, mapping the customer journey, and creating high-fidelity prototypes.
              </p>
            </motion.section>

            {/* Problem Space */}
            <motion.section variants={fadeIn} className="bg-white p-6 md:p-12 rounded-2xl shadow-brown-lg">
              <h2 className="text-xl md::text-2xl font-bold text-brown-800 mb-6 text-center leading-tight">
                Problem Space
              </h2>
              <p className="text-sm md:text-lg text-brown-700 leading-relaxed max-w-4xl mx-auto text-center">
                How can we improve the usability of the "My Digital" platform to ensure residents can efficiently access municipal services? Despite a new platform, most interactions were still managed through the call center, indicating residents found the interface challenging to use.
              </p>
            </motion.section>

            {/* Usability Testing */}
            <motion.section variants={fadeIn} className="text-center">
              <h2 className="text-xl md:text-2xl font-bold gradient-text mb-6 leading-tight pb-4">
                Usability Testing
              </h2>
              <p className="text-brown-700 mb-8 leading-relaxed text-sm md:text-base">
                I decided to write the customer journey maps to help me during this stage.
              </p>
              <div className="max-w-5xl mx-auto">
                <motion.div
                  className="relative group cursor-pointer"
                  onClick={() =>
                    openImageModal(municipalCustomerJourneyMapsImage, "Customer Journey Maps")
                  }
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={municipalCustomerJourneyMapsImage}
                    alt="Customer Journey Maps"
                    className="rounded-lg shadow-brown-xl w-full h-auto max-w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-brown-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center will-change-transform">
                    <ZoomIn className="w-10 h-10 text-white" />
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* Key Insights & Quotes */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              <motion.section variants={slideInLeft} className="lg:col-span-3">
                <h2 className="text-xl md:text-2xl font-bold gradient-text mb-8 leading-tight pb-4">
                  Key Insights
                </h2>
                <div className="space-y-6">
                  {insights.map((insight) => (
                    <div key={insight.title} className="bg-white p-6 rounded-lg shadow-brown-lg">
                      <h4 className="font-bold text-brown-800 text-base md:text-lg mb-2 leading-tight">
                        {insight.title}
                      </h4>
                      <p className="text-brown-700 leading-relaxed text-sm md:text-base">
                        {insight.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.section>
              <motion.section variants={slideInRight} className="lg:col-span-2 bg-brown-50 p-6 rounded-2xl">
                <h3 className="text-lg md:text-xl font-bold text-brown-800 mb-6 text-center leading-tight">
                  Key Quotes
                </h3>
                <div className="space-y-6">
                  {quotes.map((quote, i) => (
                    <blockquote
                      key={i}
                      className="border-l-4 border-brown-300 pl-4 text-brown-700 italic leading-relaxed text-xs md:text-sm"
                    >
                      <MessageSquare className="inline w-4 h-4 mr-2 opacity-50" />
                      {quote}
                    </blockquote>
                  ))}
                </div>
              </motion.section>
            </div>

            {/* UX Phase */}
            <motion.section variants={fadeIn} className="text-center">
              <h2 className="text-xl md:text-2xl font-bold gradient-text mb-6 leading-tight pb-4">
                UX Phase: Making Ideas Tangible
              </h2>
              <div className="mx-auto max-w-7xl">
                <ClickableImage
                  src={municipalScreensOverviewImage}
                  alt="UX phase explorations: home, favorites, services, parking, payment, and 106 Plus flows"
                  onImageClick={(src, alt) => openImageModal(src, alt, { grayscale: true })}
                  className="w-full"
                  imageClassName="grayscale max-h-[min(38rem,78vh)] w-full object-contain md:max-h-[min(46rem,82vh)]"
                />
              </div>
            </motion.section>

            {/* The Solutions */}
            <motion.section id="solutions" variants={fadeIn} className="space-y-12">
              <h2 className="text-2xl md:text-4xl font-bold gradient-text text-center leading-tight pb-4">
                The Solutions
              </h2>
              <SolutionsTabs onImageClick={openImageModal} />
            </motion.section>

            {/* Visual Design */}
            <motion.section variants={fadeIn} className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl md:text-4xl font-bold gradient-text mb-4 leading-tight pb-4">
                  Visual Design
                </h2>
                <p className="text-brown-700 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
                  I aimed for an experience that felt friendly and professional. I used{" "}
                  <strong>Manrope</strong> for clear typographic hierarchy and a restrained civic palette
                  — warm orange accents, cool neutrals, and functional greens and reds where context
                  required emphasis.
                </p>
              </div>
              <div className="mx-auto flex max-w-6xl flex-col gap-8">
                <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
                  <ClickableImage
                    src="/projects/municipal-visual-color-palette.png"
                    alt="Color palette: orange, blue-grey, green, red, and white"
                    onImageClick={openImageModal}
                    className="flex min-h-[8rem] w-full items-center justify-center md:min-h-[10rem]"
                    imageClassName="max-h-32 w-full object-contain md:max-h-40"
                  />
                  <ClickableImage
                    src="/projects/municipal-visual-typography.png"
                    alt="Typography: Manrope type scale for titles and body"
                    onImageClick={openImageModal}
                    className="w-full"
                    imageClassName="max-h-40 w-full object-contain md:max-h-48"
                  />
                </div>
                <ClickableImage
                  src={municipalScreensOverviewImage}
                  alt="My Digitel interface overview: home, favorites, services, parking, payment, and support flows"
                  onImageClick={openImageModal}
                  className="w-full"
                  imageClassName="max-h-[min(32rem,70vh)] w-full object-contain md:max-h-[min(36rem,75vh)]"
                />
              </div>
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
