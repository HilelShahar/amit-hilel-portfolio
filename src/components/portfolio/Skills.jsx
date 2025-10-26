// src/components/portfolio/Skills.jsx
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Palette, Code, Zap } from "lucide-react";

const skills = [
  {
    id: 1,
    icon: Search,
    title: "UX Design",
    description:
      "Designing user experiences with a focus on user research, accessibility, and usability. I transform complex ideas into clear, actionable, and delightful journeys.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    glowColor: "shadow-blue-200",
  },
  {
    id: 2,
    icon: Palette,
    title: "UI Design",
    description:
      "Creating visually stunning and functional user interfaces. I focus on seamless, intuitive experiences using the latest design trends.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    glowColor: "shadow-purple-200",
  },
  {
    id: 3,
    icon: Code,
    title: "Website Development",
    description:
      "Building modern, responsive websites using WordPress, Elementor, and Shopify. Custom solutions for every business need.",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    glowColor: "shadow-green-200",
  },
];

/* ---------- Stable variants (defined once) ---------- */
const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardEnter = (delay = 0) => ({
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

const cardHover = {
  hover: {
    y: -12,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const tileHover = {
  hover: {
    scale: 1.02,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const gradientBlobAnim = {
  animate: {
    x: [0, 50, 0],
    y: [0, -30, 0],
    scale: [1, 1.2, 1],
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
  },
};

function SkillCardBase({ skill, index }) {
  // Memoize the tiny “particles” list so positions aren’t re-created every render
  const particles = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => ({
        key: i,
        left: `${20 + i * 15}%`,
        top: `${30 + i * 10}%`,
        delay: i * 0.2,
      })),
    []
  );

  return (
    <motion.div
      variants={{ ...cardEnter(index * 0.2), ...cardHover }}
      initial="hidden"
      whileInView="show"
      whileHover="hover"
      viewport={{ once: true }}
      className="group cursor-pointer will-change-transform"
    >
      <motion.div
        className={`bg-white rounded-2xl p-8 shadow-brown-lg transition-all duration-500 border ${skill.borderColor} relative overflow-hidden h-full will-change-transform`}
        variants={tileHover}
        whileHover="hover"
      >
        {/* Background pattern */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
          style={{
            // Keeping original behavior: use the provided Tailwind color token text as-is
            backgroundImage: `radial-gradient(circle at 50% 50%, ${skill.color} 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Floating particles on hover */}
        {particles.map((p) => (
          <motion.div
            key={p.key}
            className={`absolute w-1 h-1 ${skill.bgColor} rounded-full opacity-0 group-hover:opacity-60 will-change-transform`}
            style={{ left: p.left, top: p.top }}
            animate={{ y: [0, -20, 0], opacity: [0, 0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: p.delay }}
          />
        ))}

        {/* Icon with hover animations */}
        <motion.div
          className={`w-16 h-16 ${skill.bgColor} rounded-2xl flex items-center justify-center mb-6 relative will-change-transform`}
          whileHover={{
            scale: 1.1,
            rotate: [0, -10, 10, -5, 0],
            // Keep as-is (original used whileHover with class token); no behavior change
            backgroundColor: skill.color,
          }}
          transition={{
            scale: { type: "spring", stiffness: 300 },
            rotate: { duration: 0.6 },
            backgroundColor: { duration: 0.3 },
          }}
        >
          <motion.div whileHover={{ color: "#ffffff" }} transition={{ duration: 0.3 }}>
            <skill.icon className={`w-8 h-8 ${skill.color} transition-colors duration-300`} />
          </motion.div>

          {/* Zap effect on hover */}
          <motion.div
            className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 will-change-transform"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Zap className="w-4 h-4 text-yellow-500" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-xl md:text-2xl font-bold text-brown-800 mb-4 pb-2 relative"
          whileHover={{ color: skill.color }}
          transition={{ duration: 0.3 }}
        >
          {skill.title}
          <motion.span
            className="absolute bottom-0 left-0 h-0.5 bg-brown-400 transition-all duration-400 ease-out"
            initial={{ width: 0 }}
            whileInView={{ width: "30%" }}
            whileHover={{ width: "100%", backgroundColor: skill.color }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-brown-600 leading-relaxed text-base"
          whileHover={{ color: "#6f4423" }}
          transition={{ duration: 0.3 }}
        >
          {skill.description}
        </motion.p>

        {/* Hover glow */}
        <motion.div
          className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none ${skill.bgColor}`}
        />
      </motion.div>
    </motion.div>
  );
}

const SkillCard = React.memo(SkillCardBase);

function SkillsBase() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cream-50 to-white relative overflow-hidden">
      {/* Animated background element */}
      <motion.div
        className="absolute top-1/4 left-10 w-20 h-20 bg-brown-200 rounded-full blur-2xl opacity-20 will-change-transform"
        {...gradientBlobAnim}
      />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-6 pb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            What I Do Best
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-brown-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Combining research, creativity, and technology to deliver exceptional digital experiences.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <SkillCard key={skill.id} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default React.memo(SkillsBase);
