// src/components/pages/About.jsx
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Heart, Briefcase, GraduationCap, Users, Star } from "lucide-react";

/* ---------- Stable variants (defined once) ---------- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function AboutBase() {
  // Precompute particle positions/timings once so they don't change on re-render
  const particles = useMemo(
    () =>
      Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        dx: Math.random() * 30 - 15,
        duration: 4 + Math.random() * 3,
        delay: Math.random() * 3,
      })),
    []
  );

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated particles background */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-brown-300 rounded-full opacity-20 will-change-transform"
          style={{ left: p.left, top: p.top }}
          animate={{ y: [0, -50, 0], x: [0, p.dx, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
        />
      ))}

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold gradient-text mb-6 pb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            About Me
          </motion.h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="text-lg md:text-xl text-brown-700 leading-relaxed space-y-4">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ x: 5, color: "#6f4423" }}
              >
                <strong>Hi,</strong>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ x: 5 }}
              >
                I'm Amit — a passionate <strong>UX Researcher</strong> with a Master's degree in Social Psychology and over 8 years of experience in customer experience research.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ x: 5 }}
              >
                I specialize in crafting meaningful digital experiences through need-finding studies, usability testing, and satisfaction surveys. Beyond research, I also design and build intuitive websites aligned with user needs.
              </motion.p>

              <motion.div
                className="bg-brown-50 p-6 rounded-xl relative overflow-hidden will-change-transform"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                whileHover={{
                  backgroundColor: "#f4e6d9",
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(139, 90, 43, 0.1)",
                }}
              >
                {/* Floating star animation */}
                <motion.div
                  className="absolute top-2 right-2 will-change-transform"
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Star className="w-4 h-4 text-brown-400 opacity-50" />
                </motion.div>

                <h3 className="text-xl font-bold text-brown-800 mb-3 flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="will-change-transform"
                  >
                    <Heart className="w-5 h-5 text-brown-600" />
                  </motion.div>
                  Other Cool Facts About Me:
                </h3>
                <motion.p className="text-brown-700 leading-relaxed" whileHover={{ x: 5 }}>
                  Proudly mom to Romi and Ray — plus two mischievous dogs! When I'm not immersed in UX, you'll find me working out, hunting down food gems, or experimenting in my kitchen.
                </motion.p>
              </motion.div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div className="relative group will-change-transform" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <motion.img
                src="/about_img.jpeg"
                alt="Amit Hilel"
                loading="lazy"
                className="w-80 h-80 md:w-96 md:h-96 object-cover object-top rounded-2xl shadow-brown-xl border-4 border-cream-200 group-hover:shadow-brown-2xl transition-shadow duration-300"
                whileHover={{ borderColor: "#d4a574", boxShadow: "0 25px 50px -12px rgba(74, 47, 23, 0.25)" }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { icon: Briefcase, title: "8+ Years", subtitle: "Experience in UX Research", color: "text-blue-600", bg: "bg-blue-50" },
            { icon: GraduationCap, title: "M.A.", subtitle: "Social Psychology", color: "text-purple-600", bg: "bg-purple-50" },
            { icon: Users, title: "Mom", subtitle: "To Romi & Ray", color: "text-pink-600", bg: "bg-pink-50" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center p-6 bg-white rounded-xl shadow-brown-lg border border-brown-100 group cursor-pointer relative overflow-hidden will-change-transform"
              whileHover={{
                y: -8,
                boxShadow: "0 20px 40px rgba(74, 47, 23, 0.1)",
                borderColor: stat.color,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Background glow effect */}
              <motion.div className={`absolute inset-0 ${stat.bg} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

              <motion.div
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0], color: stat.color }}
                transition={{ scale: { type: "spring", stiffness: 300 }, rotate: { duration: 0.6 } }}
                className="relative z-10 will-change-transform"
              >
                <stat.icon className="w-8 h-8 text-brown-600 mx-auto mb-3 transition-colors duration-300" />
              </motion.div>

              <motion.h3
                className="text-2xl font-bold text-brown-800 group-hover:text-brown-700 transition-colors duration-300 relative z-10"
                whileHover={{ scale: 1.05 }}
              >
                {stat.title}
              </motion.h3>
              <p className="text-brown-600 relative z-10">{stat.subtitle}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default React.memo(AboutBase);
