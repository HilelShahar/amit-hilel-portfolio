// src/components/portfolio/Hero.tsx
import React, { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

/** Keep variant objects stable to avoid re-allocation every render */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  /** Use motion values + springs for parallax; avoid React re-renders on mousemove */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 100, damping: 30 });
  const sy = useSpring(my, { stiffness: 100, damping: 30 });

  const bgX = useTransform(sx, (v) => v * 20);
  const bgY = useTransform(sy, (v) => v * 20);
  const blob1X = useTransform(sx, (v) => v * 30);
  const blob1Y = useTransform(sy, (v) => v * 30);
  const blob2X = useTransform(sx, (v) => v * -20);
  const blob2Y = useTransform(sy, (v) => v * -20);

  useEffect(() => {
    setIsVisible(true);

    let raf = 0;
    const handleMouseMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        mx.set(e.clientX / window.innerWidth);
        my.set(e.clientY / window.innerHeight);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mx, my]);

  // Typing animation for the name (kept as-is)
  const nameText = "Amit Hilel";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (isVisible) {
      let currentIndex = 0;
      const timer = setInterval(() => {
        if (currentIndex <= nameText.length) {
          setDisplayedText(nameText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(timer);
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, [isVisible]);

  /** Precompute particle randoms once to avoid regenerating on each render */
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        dx: Math.random() * 20 - 10,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      })),
    []
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background with Parallax Effect (now using motion values) */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cream-50 via-white to-brown-100 opacity-60 will-change-transform"
        style={{ x: bgX, y: bgY }}
      />

      {/* Floating Particles (positions/durations memoized) */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 bg-brown-300 rounded-full opacity-30 will-change-transform"
          style={{ left: p.left, top: p.top }}
          animate={{
            y: [0, -30, 0],
            x: [0, p.dx, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}

      {/* Morphing Background Elements (parallax via motion values) */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 bg-brown-200 rounded-full blur-3xl opacity-20 will-change-transform"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
        style={{ x: blob1X, y: blob1Y }}
      />
      <motion.div
        className="absolute bottom-40 left-10 w-24 h-24 bg-amber-200 rounded-full blur-2xl opacity-30 will-change-transform"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }}
        transition={{
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
        style={{ x: blob2X, y: blob2Y }}
      />

      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="mb-8">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight pb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span
              className="block text-brown-800"
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Hi, I'm
            </motion.span>
            <motion.span
              className="block gradient-text mt-2 min-h-[1.2em]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {displayedText}
              <motion.span
                className="inline-block w-1 h-16 bg-brown-600 ml-2"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Personal intro video */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-2xl overflow-hidden shadow-brown-xl border-4 border-cream-200 bg-black">
              <video
                src="/amit-intro.mp4"
                controls
                playsInline
                preload="metadata"
                className="w-full h-auto block"
              >
                Sorry, your browser doesn't support embedded videos.
              </video>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <div className="text-xl md:text-2xl lg:text-3xl font-light text-brown-700 space-y-2">
            {["UX Researcher.", "UI Designer.", "Master's in Social Psychology."].map(
              (text, index) => (
                <motion.p
                  key={text}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                  whileHover={{ x: 10, color: "#8b5a2b" }}
                >
                  {text}
                </motion.p>
              )
            )}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12">
          <div className="text-base md:text-lg text-brown-600 max-w-2xl mx-auto space-y-3">
            {[
              "Over 8 years of experience.",
              "Mom to Romi and Ray.",
              "Dog lover.",
              "Foodie.",
            ].map((text, index) => (
              <motion.p
                key={text}
                className="flex items-center justify-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  className="w-2 h-2 bg-brown-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                />
                {text}
              </motion.p>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="flex justify-center">
            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
              className="text-brown-500 cursor-pointer hover:text-brown-700 transition-colors duration-200"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronDown className="w-8 h-8" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator with animation - Final Fix for centering */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 flex justify-center text-brown-500 text-sm font-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        <motion.span
          className="hidden md:block"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to explore my work
        </motion.span>
      </motion.div>
    </section>
  );
}
