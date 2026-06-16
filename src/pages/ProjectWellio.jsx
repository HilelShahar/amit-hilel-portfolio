import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Play,
  Pause,
  RotateCcw,
  Search,
  CalendarCheck,
  Pill,
  Activity,
  ShieldCheck,
  Heart,
  Layers,
  AlertCircle,
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
 * Wellio screens, in the order a real person would actually move through care:
 * arrive -> see today -> find a doctor -> decide -> book -> stay on top of the
 * boring-but-critical stuff (shots, meds, numbers) -> keep talking to the clinic.
 * Each caption is the one job that screen is doing.
 */
/* The auto-play reel — a focused 7-beat narrative (mirrors the case-study walkthrough). */
const REEL_SCREENS = [
  { src: "/projects/wellio-splash.png", caption: "It starts calm — just the mark, then you're in." },
  { src: "/projects/wellio-welcome.png", caption: "One promise, not a menu — “healthcare made easy.”" },
  { src: "/projects/wellio-home.png", caption: "Home leads with what's next — your appointment, first." },
  { src: "/projects/wellio-search-results.png", caption: "Find the right doctor, fast — by rating, specialty, location." },
  { src: "/projects/wellio-doctor.png", caption: "A profile you can actually decide from." },
  { src: "/projects/wellio-reminder.png", caption: "Reminders that fit real life — not perfect ones." },
  { src: "/projects/wellio-chat.png", caption: "Care continues after the door — chat, voice, video." },
];

/* The full gallery — every major screen, grouped by the app's information architecture. */
const G1 = "Onboarding & your patient card";
const G2 = "Home — find & book care";
const G3 = "Records — everything in one place";
const G4 = "Chat — care that continues";
const WELLIO_SCREENS = [
  { src: "/projects/wellio-splash.png", caption: "Splash — the calm first impression.", group: G1 },
  { src: "/projects/wellio-welcome.png", caption: "Onboarding — Healthcare Made Easy.", group: G1 },
  { src: "/projects/wellio-welcome2.png", caption: "Onboarding — Here for You, Always.", group: G1 },
  { src: "/projects/wellio-welcome3.png", caption: "Welcome — create an account or log in.", group: G1 },
  { src: "/projects/wellio-account.png", caption: "Create account.", group: G1 },
  { src: "/projects/wellio-patient.png", caption: "Patient card — personal data.", group: G1 },
  { src: "/projects/wellio-insurance.png", caption: "Insurance information.", group: G1 },
  { src: "/projects/wellio-assessment.png", caption: "Health assessment.", group: G1 },
  { src: "/projects/wellio-home.png", caption: "Home — today's care, first.", group: G2 },
  { src: "/projects/wellio-specialties.png", caption: "Browse by specialisation.", group: G2 },
  { src: "/projects/wellio-doctors.png", caption: "Doctors near you.", group: G2 },
  { src: "/projects/wellio-search-results.png", caption: "Search results — compare by rating & location.", group: G2 },
  { src: "/projects/wellio-doctor.png", caption: "Doctor profile — about & credentials.", group: G2 },
  { src: "/projects/wellio-reviews.png", caption: "Doctor profile — reviews.", group: G2 },
  { src: "/projects/wellio-book.png", caption: "Book — price, calendar & visit type.", group: G2 },
  { src: "/projects/wellio-appointments.png", caption: "Upcoming appointments.", group: G2 },
  { src: "/projects/wellio-records.png", caption: "Medical records hub.", group: G3 },
  { src: "/projects/wellio-reports.png", caption: "Lab reports.", group: G3 },
  { src: "/projects/wellio-visits.png", caption: "Visit summaries.", group: G3 },
  { src: "/projects/wellio-prescriptions.png", caption: "Prescriptions, history & refills.", group: G3 },
  { src: "/projects/wellio-vaccination.png", caption: "Vaccination calendar.", group: G3 },
  { src: "/projects/wellio-vaccination-detail.png", caption: "Vaccination details.", group: G3 },
  { src: "/projects/wellio-metrics.png", caption: "Health metrics overview.", group: G3 },
  { src: "/projects/wellio-reminder.png", caption: "Medication reminder.", group: G3 },
  { src: "/projects/wellio-messages.png", caption: "Messages with your clinicians.", group: G4 },
  { src: "/projects/wellio-chat.png", caption: "Chat — voice, photos & more.", group: G4 },
  { src: "/projects/wellio-video.png", caption: "Video visit — the clinic, in your pocket.", group: G4 },
];

const SCREEN_MS = 2600;

/*
 * Render only the screens whose PNG actually exists in /public.
 * This keeps the page clean while assets are still being exported, and lets new
 * screens light up automatically the moment their file is dropped in — no code edit.
 */
function useAvailableScreens(screens) {
  const [available, setAvailable] = useState(screens);

  useEffect(() => {
    let alive = true;
    Promise.all(
      screens.map(
        (s) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = s.src;
          })
      )
    ).then((flags) => {
      if (!alive) return;
      const ok = screens.filter((_, i) => flags[i]);
      setAvailable(ok.length ? ok : screens);
    });
    return () => {
      alive = false;
    };
  }, [screens]);

  return available;
}

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
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
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

/* -------------------- Cinematic auto-play prototype (the "product film") -------------------- */
const WellioFilm = React.memo(function WellioFilm({ screens }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const total = screens.length;
  const timer = useRef(null);

  const go = useCallback((i) => setIndex(((i % total) + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  // Auto-advance like a reel; pause cleanly when the user takes over.
  useEffect(() => {
    if (!playing) return;
    timer.current = setTimeout(next, SCREEN_MS);
    return () => clearTimeout(timer.current);
  }, [index, playing, next]);

  // Keep the index valid if the screen set changes (e.g. assets finish loading).
  useEffect(() => {
    setIndex((i) => (i >= total ? 0 : i));
  }, [total]);

  // Preload every screen so the cut is instant — no load flash mid-reel.
  useEffect(() => {
    screens.forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });
  }, [screens]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") { setPlaying(false); next(); }
      else if (e.key === "ArrowLeft") { setPlaying(false); prev(); }
      else if (e.key === " ") { e.preventDefault(); setPlaying((p) => !p); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const { src, caption } = screens[index] || screens[0];

  return (
    <div className="flex flex-col items-center">
      {/* Soft ambient stage */}
      <div className="relative w-full max-w-3xl flex justify-center py-6">
        <div className="absolute inset-0 bg-gradient-to-b from-brown-100/60 to-transparent rounded-[3rem] blur-2xl" />

        {/* Phone */}
        <div
          className="relative w-[258px] sm:w-[300px] aspect-[375/812] rounded-[2.4rem] border-[10px] border-brown-800 shadow-brown-xl overflow-hidden bg-cream-50"
          onMouseEnter={() => setPlaying(false)}
          onMouseLeave={() => setPlaying(true)}
        >
          <button
            type="button"
            onClick={() => { setPlaying(false); next(); }}
            className="absolute inset-0 w-full h-full cursor-pointer"
            aria-label="Tap to advance to the next screen"
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.img
                key={src}
                src={src}
                alt={caption}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 w-full h-full object-cover select-none"
                draggable={false}
                decoding="async"
              />
            </AnimatePresence>
          </button>

          {/* Progress segments, like chapters in a reel */}
          <div className="pointer-events-none absolute top-3 left-3 right-3 flex gap-1">
            {screens.map((s, i) => (
              <span key={s.src} className="h-1 flex-1 rounded-full bg-white/35 overflow-hidden">
                <motion.span
                  className="block h-full bg-white"
                  initial={false}
                  animate={{ width: i < index ? "100%" : i === index ? "100%" : "0%" }}
                  transition={{
                    duration: i === index && playing ? SCREEN_MS / 1000 : 0.2,
                    ease: "linear",
                  }}
                />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Caption — the job this screen is doing */}
      <div className="h-12 mt-1 flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={caption}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-center text-sm md:text-base text-brown-700 max-w-md"
          >
            {caption}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Transport controls */}
      <div className="mt-3 flex items-center gap-4">
        <button
          type="button"
          onClick={() => { setPlaying(false); prev(); }}
          aria-label="Previous screen"
          className="w-9 h-9 rounded-full bg-white border border-brown-300 text-brown-700 hover:bg-brown-100 flex items-center justify-center shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Play"}
          className="w-11 h-11 rounded-full bg-brown-600 hover:bg-brown-700 text-white flex items-center justify-center shadow-md"
        >
          {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>

        <button
          type="button"
          onClick={() => { setPlaying(true); go(0); }}
          aria-label="Restart"
          className="w-9 h-9 rounded-full bg-white border border-brown-300 text-brown-700 hover:bg-brown-100 flex items-center justify-center shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <p className="mt-3 text-xs md:text-sm text-brown-500 text-center">
        Plays on its own — hover or tap to take the wheel.
      </p>
    </div>
  );
});

/* -------------------- Screens Gallery -------------------- */
const WellioGallery = React.memo(function WellioGallery({ screens, onImageClick }) {
  // Preserve first-appearance order of groups, falling back to a single unlabeled group.
  const groups = [];
  screens.forEach((s) => {
    const key = s.group || "";
    let g = groups.find((x) => x.key === key);
    if (!g) groups.push((g = { key, items: [] }));
    g.items.push(s);
  });

  return (
    <div className="space-y-12">
      {groups.map((g) => (
        <div key={g.key || "all"}>
          {g.key && (
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-brown-400 mb-5">
              {g.key}
              <span className="flex-1 h-px bg-brown-200" />
            </p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {g.items.map(({ src, caption }, index) => (
              <motion.button
                type="button"
                key={src}
                onClick={() => onImageClick(src, caption)}
                className="group relative rounded-2xl overflow-hidden bg-cream-100 border border-brown-200 shadow-brown-lg cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
                whileHover={{ y: -4 }}
                aria-label={caption}
              >
                <img
                  src={src}
                  alt={caption}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-brown-800/0 group-hover:bg-brown-800/15 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

/* -------------------- Page -------------------- */
export default function ProjectWellio() {
  const reel = useAvailableScreens(REEL_SCREENS);
  const screens = useAvailableScreens(WELLIO_SCREENS);
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
          <motion.header variants={fadeIn} className="text-center mb-14">
            <span className="inline-block text-xs md:text-sm tracking-widest uppercase text-brown-500 mb-4">
              Healthcare · Mobile App · End-to-end UX/UI
            </span>
            <h1 className="text-2xl md:text-4xl font-bold gradient-text mb-6 leading-tight pb-4">
              Wellio: Making Healthcare Feel Less Like Paperwork and More Like Care
            </h1>
            <p className="text-sm md:text-lg text-brown-700 max-w-3xl mx-auto leading-relaxed">
              Most of us don't have a "healthcare app." We have a phone number we dread calling,
              a folder of paper results, three different portals, and a vaccination date we're
              fairly sure we missed. Wellio is my attempt to gather all of that into one calm,
              trustworthy place — and to make booking a doctor feel as ordinary as ordering a taxi.
            </p>
            <div className="mt-8 flex flex-wrap justify-center items-center gap-4 text-xs md:text-base">
              <Button onClick={scrollToSolutions} className="bg-brown-600 hover:bg-brown-700 text-white text-sm md:text-base">
                Jump to the Solution
              </Button>
              <span className="text-brown-600">or scroll — there's a real story here</span>
            </div>
          </motion.header>

          {/* The film */}
          <div className="mb-20">
            <WellioFilm screens={reel} />
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
                    Getting care is technically possible but emotionally exhausting. People juggle
                    phone queues, fragmented portals, and paper records — and the admin around
                    health (refills, shots, follow-ups) quietly falls through the cracks until it
                    becomes urgent.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-brown-800 mb-4 flex items-center gap-2 leading-tight">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-brown-600" />
                    Solution
                  </h3>
                  <p className="text-sm md:text-base text-brown-700 leading-relaxed">
                    A single mobile app that takes you from "I think I need a doctor" to "booked,
                    reminded, and followed up" — covering search, profiles, appointments, records,
                    prescriptions, vaccinations, health metrics, and direct chat with your clinician.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Where this started */}
            <motion.section variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-5">
                <h2 className="text-xl md:text-2xl font-bold gradient-text leading-tight pb-2">Where this started</h2>
                <p className="text-sm md:text-base text-brown-700 leading-relaxed">
                  This project began with a small, unglamorous moment: a friend asking me to help
                  her find the PDF of her blood test, because the clinic "sent it somewhere." We
                  spent twenty minutes between an email, an SMS link that had expired, and a portal
                  that logged her out twice. She wasn't sick — she just wanted a number off a page.
                </p>
                <p className="text-sm md:text-base text-brown-700 leading-relaxed">
                  That stuck with me. The hard part of healthcare, for most healthy-ish people most
                  of the time, isn't medicine — it's logistics. So I gave myself a brief: design the
                  product that would have made that twenty minutes disappear, without pretending to
                  be a doctor.
                </p>
              </div>
              <div className="bg-brown-50 p-6 rounded-2xl border-l-4 border-brown-300">
                <blockquote className="text-brown-700 italic leading-relaxed text-base md:text-lg">
                  <MessageSquare className="inline w-6 h-6 mr-2 opacity-50" />
                  "I don't need an app to diagnose me. I need it to stop making me feel like I'm
                  filing taxes every time I want to see someone."
                  <p className="text-right text-sm mt-4 not-italic font-semibold">— Participant, first round of interviews</p>
                </blockquote>
              </div>
            </motion.section>

            {/* My Role */}
            <motion.section variants={fadeIn} className="bg-white p-6 md:p-12 rounded-2xl shadow-brown-lg">
              <h2 className="text-xl md:text-2xl font-bold text-brown-800 mb-6 leading-tight">My Role</h2>
              <p className="text-sm md:text-base text-brown-700 leading-relaxed mb-6">
                I owned this end to end as the product designer: framing the problem, running the
                research, shaping the information architecture, and designing every screen and state
                you see here — from the first wireframe to a full, componentized UI library.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  "User research & interviews",
                  "Market & competitive scan",
                  "IA & user flows",
                  "UI design & design system",
                ].map((t) => (
                  <div key={t} className="bg-cream-50 p-4 rounded-xl text-sm font-semibold text-brown-800">
                    {t}
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Research: listening first */}
            <motion.section variants={fadeIn} className="bg-white p-6 md:p-12 rounded-2xl shadow-brown-lg">
              <h2 className="text-xl md:text-2xl font-bold text-brown-800 mb-2 text-center leading-tight">
                Listening Before Designing
              </h2>
              <p className="text-center text-lg text-brown-600 mb-8 italic">
                You can't fix a feeling you haven't sat with.
              </p>
              <p className="text-sm md:text-base text-brown-700 leading-relaxed mb-8 max-w-3xl mx-auto text-center">
                Before drawing a single screen, I wanted to understand who actually carries the
                weight of "managing health" — and it's rarely just the patient. I ran two rounds of
                interviews and a survey, deliberately mixing the people who use these apps with the
                people who quietly run them for everyone else.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-cream-50 p-5 rounded-xl">
                  <h4 className="font-semibold text-brown-800 mb-1">Who I talked to</h4>
                  <p className="text-sm text-brown-600 leading-relaxed">
                    12 interviews across three groups: busy professionals, parents managing a whole
                    family's care, and people over 60 managing ongoing conditions. Each group breaks
                    in a different place.
                  </p>
                </div>
                <div className="bg-cream-50 p-5 rounded-xl">
                  <h4 className="font-semibold text-brown-800 mb-1">The hidden stakeholder</h4>
                  <p className="text-sm text-brown-600 leading-relaxed">
                    The "family health manager" — usually one person booking, reminding, and chasing
                    results for parents, partners, and kids. Design for them and you design for four
                    people at once.
                  </p>
                </div>
                <div className="bg-cream-50 p-5 rounded-xl">
                  <h4 className="font-semibold text-brown-800 mb-1">What I asked</h4>
                  <p className="text-sm text-brown-600 leading-relaxed">
                    Not "what features do you want," but "walk me through the last time you needed a
                    doctor." Stories surface friction that feature wishlists hide.
                  </p>
                </div>
                <div className="bg-cream-50 p-5 rounded-xl">
                  <h4 className="font-semibold text-brown-800 mb-1">Where it hurt most</h4>
                  <p className="text-sm text-brown-600 leading-relaxed">
                    Three moments came up again and again: booking, finding past results, and
                    remembering the follow-up. The medicine was fine. The seams between steps weren't.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Key Insights */}
            <motion.section variants={staggerContainer}>
              <h2 className="text-xl md:text-2xl font-bold gradient-text text-center mb-3 leading-tight pb-2">
                What the Research Actually Said
              </h2>
              <p className="text-center text-brown-600 mb-8 text-sm md:text-base max-w-2xl mx-auto">
                Four patterns showed up often enough that I stopped treating them as anecdotes and
                started treating them as requirements.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Search,
                    title: "People search by symptom, not specialty",
                    desc: "Almost nobody wakes up looking for a \"gastroenterologist.\" They look for \"stomach\" and hope the app meets them there. Forcing the medical vocabulary onto them is the first place we lose people.",
                  },
                  {
                    icon: Eye,
                    title: "Trust is decided on the profile, not the brand",
                    desc: "Before booking, people scan for the same things: face, rating, languages spoken, price, and the next free slot. If any one is missing, they bounce to Google and often don't come back.",
                  },
                  {
                    icon: AlertCircle,
                    title: "The admin is what fails, not the visit",
                    desc: "Refills run out on a Friday night. A child's vaccination quietly slips a month. The visit itself goes fine — it's the before and after that people described as stressful.",
                  },
                  {
                    icon: Users,
                    title: "One person carries many people's health",
                    desc: "The family health manager is invisible in most apps. Everything assumes a single \"me.\" In real life it's me, two parents, and a kid who can't book for himself.",
                  },
                ].map((insight, index) => (
                  <motion.div key={index} variants={fadeIn} className="bg-white p-6 rounded-2xl shadow-brown-lg">
                    <insight.icon className="w-6 h-6 text-brown-600 mb-3" />
                    <h4 className="font-bold text-brown-800 text-base md:text-lg mb-2 leading-tight">
                      {insight.title}
                    </h4>
                    <p className="text-brown-700 leading-relaxed text-sm md:text-base">{insight.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Market scan */}
            <motion.section variants={fadeIn} className="bg-white p-6 md:p-12 rounded-2xl shadow-brown-lg">
              <h2 className="text-xl md:text-2xl font-bold text-brown-800 mb-2 text-center leading-tight">
                Looking at What's Already Out There
              </h2>
              <p className="text-center text-brown-600 mb-8 text-sm md:text-base max-w-3xl mx-auto">
                I split the field into three kinds of products, used each one as a patient would, and
                stole the best idea from each while avoiding the trap they all fall into.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    label: "HMO / insurer portals",
                    examples: "Clalit, Maccabi, MyChart",
                    good: "Real medical data, official records.",
                    bad: "Built around the institution, not the person. Dense, clinical, intimidating.",
                  },
                  {
                    label: "Booking marketplaces",
                    examples: "ZocDoc, Practo, Doctolib",
                    good: "Finding and booking a doctor is genuinely easy.",
                    bad: "The relationship ends at the booking. No records, no follow-up, no continuity.",
                  },
                  {
                    label: "Wellness & tracking apps",
                    examples: "Apple Health, Ada, Flo",
                    good: "Beautiful, motivating, habit-forming.",
                    bad: "Disconnected from actual care — they watch you, but can't get you seen.",
                  },
                ].map((c) => (
                  <div key={c.label} className="bg-cream-50 p-5 rounded-xl border border-brown-100">
                    <h4 className="font-bold text-brown-800 mb-1">{c.label}</h4>
                    <p className="text-xs text-brown-500 mb-3 italic">{c.examples}</p>
                    <p className="text-sm text-brown-700 mb-2"><span className="font-semibold text-brown-800">Strength: </span>{c.good}</p>
                    <p className="text-sm text-brown-700"><span className="font-semibold text-brown-800">Gap: </span>{c.bad}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm md:text-base text-brown-700 leading-relaxed mt-8 max-w-3xl mx-auto text-center">
                The gap was hiding in plain sight. Each category nails one third of the journey.
                Nobody owns the whole arc — <span className="font-semibold text-brown-800">find → decide → book → remember → follow up</span> — as
                one continuous experience. That arc became Wellio's reason to exist.
              </p>
            </motion.section>

            {/* Reframing the problem */}
            <motion.section variants={fadeIn} className="bg-brown-100 p-6 md:p-12 rounded-2xl">
              <h2 className="text-xl md:text-2xl font-bold text-brown-800 mb-6 text-center leading-tight">
                Reframing the Problem
              </h2>
              <div className="max-w-3xl mx-auto space-y-5">
                <p className="text-sm md:text-base text-brown-700 leading-relaxed">
                  It would have been easy to define this as "a doctor-booking app." But the research
                  kept pushing me somewhere bigger and quieter. So I reframed it as a set of
                  <span className="font-semibold text-brown-800"> How Might We</span> questions that
                  each map to a real moment of friction:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "How might we let people search in their own words and still land on the right specialist?",
                    "How might we give enough information to decide on a doctor without overwhelming the page?",
                    "How might we make the boring admin — refills, shots, follow-ups — happen almost on its own?",
                    "How might we hold a whole family's health without the app feeling like a spreadsheet?",
                  ].map((q) => (
                    <p key={q} className="bg-white p-4 rounded-xl text-sm md:text-base text-brown-800 leading-relaxed">
                      {q}
                    </p>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* IA & hierarchy */}
            <motion.section variants={fadeIn} className="bg-white p-6 md:p-12 rounded-2xl shadow-brown-lg">
              <h2 className="text-xl md:text-2xl font-bold text-brown-800 mb-2 text-center leading-tight">
                Architecture &amp; Hierarchy
              </h2>
              <p className="text-center text-brown-600 mb-8 text-sm md:text-base max-w-3xl mx-auto">
                With sixteen feature areas, the real design problem wasn't any single screen — it was
                deciding what earns the home screen and what waits politely one tap away.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Layers className="w-5 h-5 text-brown-600 mt-1 shrink-0" />
                    <p className="text-sm md:text-base text-brown-700 leading-relaxed">
                      <span className="font-semibold text-brown-800">Four tabs, not ten.</span> I
                      collapsed everything into Home, Records, Chat, and Profile. Anything else is
                      reached through context, not a crowded tab bar.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CalendarCheck className="w-5 h-5 text-brown-600 mt-1 shrink-0" />
                    <p className="text-sm md:text-base text-brown-700 leading-relaxed">
                      <span className="font-semibold text-brown-800">Home answers "what's next."</span> The
                      next appointment sits at the very top — because that's the question people open
                      the app with — followed by quick ways to act, then to explore.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-brown-600 mt-1 shrink-0" />
                    <p className="text-sm md:text-base text-brown-700 leading-relaxed">
                      <span className="font-semibold text-brown-800">Medical depth lives in Records.</span> Reports,
                      visit summaries, and prescriptions are grouped where people go looking with
                      intent — not scattered across the surface where they create anxiety.
                    </p>
                  </div>
                </div>
                <div className="bg-cream-50 rounded-2xl p-5 border border-brown-100">
                  <p className="text-xs uppercase tracking-wider text-brown-500 mb-4 text-center">The spine of the app</p>
                  <div className="space-y-2 text-sm">
                    {[
                      ["Home", "Next appointment · book · specialisations · services"],
                      ["Records", "Reports · visit summaries · prescriptions · vaccinations · metrics"],
                      ["Chat", "Messages · clinician chat · voice · video visit"],
                      ["Profile", "Patient card · insurance · family · settings"],
                    ].map(([k, v]) => (
                      <div key={k} className="bg-white rounded-lg p-3">
                        <span className="font-bold text-brown-800">{k}</span>
                        <span className="text-brown-600"> — {v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Design principles */}
            <motion.section variants={staggerContainer}>
              <h2 className="text-xl md:text-2xl font-bold gradient-text text-center mb-8 leading-tight pb-2">
                Three Principles I Designed Against
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Heart,
                    title: "Calm beats clever",
                    desc: "Health is already stressful. Soft teals, generous spacing, and one clear action per screen — the interface should lower the heart rate, not raise it.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Earn trust on every screen",
                    desc: "Real photos, ratings, plain-language labels, and honest empty states. Nothing hidden, nothing salesy — trust is the actual product in healthcare.",
                  },
                  {
                    icon: CheckCircle,
                    title: "Fewer steps, fewer dead ends",
                    desc: "Every flow was measured in taps and exits. If a path could lose someone, it got a shortcut, a default, or a way back.",
                  },
                ].map((p, i) => (
                  <motion.div key={i} variants={fadeIn} className="bg-white p-6 rounded-2xl shadow-brown-lg text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-brown-100 flex items-center justify-center">
                      <p.icon className="w-6 h-6 text-brown-600" />
                    </div>
                    <h4 className="font-bold text-brown-800 text-base md:text-lg mb-2">{p.title}</h4>
                    <p className="text-brown-700 leading-relaxed text-sm md:text-base">{p.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* The Solutions */}
            <motion.section id="solutions" variants={staggerContainer} className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl md:text-4xl font-bold gradient-text leading-tight pb-2">
                  The Solution, Insight by Insight
                </h2>
                <p className="text-brown-600 max-w-2xl mx-auto mt-3 text-sm md:text-base">
                  Each design decision below traces straight back to something a real person told me.
                </p>
              </div>
              {[
                {
                  icon: Search,
                  insight: "People search by symptom, not specialty",
                  title: "Search that meets people in plain language",
                  solution:
                    "The search bar accepts symptoms, body parts, and everyday words, then translates them into the right specialisation behind the scenes. Popular specialisations and \"doctors near you\" sit right on the home screen, so the journey can start with a tap instead of a typed guess.",
                },
                {
                  icon: Eye,
                  insight: "Trust is decided on the profile",
                  title: "A doctor profile built for a decision",
                  solution:
                    "Every profile leads with the five things research said people scan for — photo, rating, specialty, next available slot, and price — above the fold. Reviews, about, and booking are one swipe away, so the page informs without burying the one button that matters.",
                },
                {
                  icon: CalendarCheck,
                  insight: "Booking and rescheduling cause real dread",
                  title: "Booking without the phone call",
                  solution:
                    "Booking, rescheduling, and cancelling all happen in-app, with clear confirmation, error, and success states for each. The hold music is gone. Even the unhappy paths — a slot taken, a failed reschedule — are designed, not left to a generic error.",
                },
                {
                  icon: Pill,
                  insight: "The admin is what fails, not the visit",
                  title: "Prescriptions and reminders that quietly keep up",
                  solution:
                    "Prescriptions, refills, and history live together, and medication reminders are built around real days — snooze, skip, mark as taken — instead of assuming a perfect one. The vaccination calendar does the same for shots: it remembers, so a parent doesn't have to.",
                },
                {
                  icon: Activity,
                  insight: "Numbers without context create anxiety",
                  title: "Health metrics that read as a trend",
                  solution:
                    "Body parameters, lifestyle, and history are presented as a story over time rather than a wall of values, with calm empty states for anyone just getting started — so the data invites attention instead of alarm.",
                },
                {
                  icon: MessageSquare,
                  insight: "Care doesn't end when the visit does",
                  title: "A conversation that continues",
                  solution:
                    "Chat, voice notes, photo sharing, and video visits keep the clinician one tap away after the appointment, with the small, human details handled — typing states, message actions, lock-screen notifications — so the channel feels as reliable as texting a friend.",
                },
              ].map((item, index) => (
                <motion.div key={index} variants={fadeIn} className="bg-white p-6 md:p-8 rounded-2xl shadow-brown-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-brown-100 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-brown-600" />
                    </div>
                    <span className="text-xs md:text-sm uppercase tracking-wider text-brown-500">
                      From insight: {item.insight}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-brown-800 mb-3 leading-tight">{item.title}</h3>
                  <p className="text-sm md:text-base text-brown-700 leading-relaxed">{item.solution}</p>
                </motion.div>
              ))}
            </motion.section>

            {/* Edge cases / thinking in all directions */}
            <motion.section variants={fadeIn} className="bg-brown-100 p-6 md:p-12 rounded-2xl">
              <h2 className="text-xl md:text-2xl font-bold text-brown-800 mb-3 text-center leading-tight">
                The Unglamorous 80%
              </h2>
              <p className="text-center text-brown-600 mb-8 text-sm md:text-base max-w-3xl mx-auto">
                A demo is the happy path. A product is everything that happens when the happy path
                breaks. A real chunk of this project was designing the moments nobody screenshots.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  ["Empty states", "No appointments, no prescriptions, no results yet — each one reassures and points to the next action instead of showing a blank void."],
                  ["Errors & failures", "Expired links, taken slots, failed reschedules, network drops — written in human language with a clear way forward."],
                  ["Accessibility", "Readable type sizes, strong contrast on the teal palette, and tap targets sized for an older hand, not just a designer's thumb."],
                  ["Trust & privacy", "Sensitive data framed carefully, share actions made explicit, and nothing surfaced on a home screen that you wouldn't want a stranger to glance at."],
                ].map(([t, d]) => (
                  <div key={t} className="bg-white p-5 rounded-xl">
                    <h4 className="font-bold text-brown-800 mb-1">{t}</h4>
                    <p className="text-sm text-brown-700 leading-relaxed">{d}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Full gallery */}
            <motion.section variants={fadeIn}>
              <h2 className="text-xl md:text-2xl font-bold text-brown-800 mb-3 text-center leading-tight">
                The Screens
              </h2>
              <p className="text-center text-brown-600 mb-8 text-sm md:text-base">
                Tap any screen to look closer.
              </p>
              <WellioGallery screens={screens} onImageClick={openImageModal} />
            </motion.section>

            {/* Outcome / what I'd measure */}
            <motion.section variants={fadeIn} className="bg-white p-6 md:p-12 rounded-2xl shadow-brown-lg">
              <h2 className="text-xl md:text-2xl font-bold text-brown-800 mb-6 text-center leading-tight">
                How I'd Know It Worked
              </h2>
              <p className="text-sm md:text-base text-brown-700 leading-relaxed mb-8 max-w-3xl mx-auto text-center">
                I'm wary of vanity metrics in healthcare — more time in the app isn't a win. So I'd
                hold the design against numbers that mean someone's life actually got easier:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                {[
                  ["Time to booked", "From opening the app to a confirmed appointment — measured in taps and seconds, not screens."],
                  ["Admin completion", "Refills reordered on time and vaccinations kept on schedule, without a human chasing them."],
                  ["Return without prompting", "People coming back to manage care because it's easier here — not because a notification nagged them."],
                ].map(([k, v]) => (
                  <div key={k} className="bg-cream-50 p-5 rounded-xl">
                    <h4 className="font-bold text-brown-800 mb-2">{k}</h4>
                    <p className="text-sm text-brown-700 leading-relaxed">{v}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Lessons */}
            <motion.section variants={fadeIn} className="bg-brown-100 p-6 md:p-12 rounded-2xl">
              <h2 className="text-xl md:text-2xl font-bold text-brown-800 mb-4 leading-tight">
                What I'd Carry Forward
              </h2>
              <p className="text-sm md:text-base text-brown-700 leading-relaxed mb-4">
                The biggest lesson was restraint. With sixteen feature areas, the constant temptation
                was to surface everything — and every time I gave in, the home screen got a little more
                frightening. The work that mattered most wasn't adding; it was deciding what to hide,
                and trusting people to find depth when they needed it.
              </p>
              <p className="text-sm md:text-base text-brown-700 leading-relaxed">
                If I took Wellio further, I'd prototype the family-account model properly — switching
                between "me" and "my dad" is the flow most likely to make or break this for the people
                who carry everyone else's health. That's the hard, human problem I'd want to solve next.
              </p>
            </motion.section>

            {/* Back Button */}
            <motion.div variants={fadeIn} className="text-center pt-8">
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
