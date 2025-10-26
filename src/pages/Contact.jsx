// src/components/pages/Contact.jsx
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Facebook, MapPin, Send, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/amithilel",
    color: "text-blue-600",
    bg: "bg-blue-50",
    hoverBg: "hover:bg-blue-100",
  },
  {
    icon: Facebook,
    label: "Facebook",
    url: "https://www.facebook.com/amit.hilel.7",
    color: "text-blue-700",
    bg: "bg-blue-50",
    hoverBg: "hover:bg-blue-100",
  },
];

function ContactBase() {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  // Floating elements for background (precompute randoms once)
  const floatingElements = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        yAmp: -30 - Math.random() * 20,
        xAmp: Math.random() * 40 - 20,
        rot: Math.random() * 360,
        dur: 5 + Math.random() * 3,
        delay: Math.random() * 2,
      })),
    []
  );

  // Sparkles inside the CTA card (precompute)
  const ctaSparkles = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        left: `${20 + i * 12}%`,
        top: `${15 + i * 10}%`,
        delay: i * 0.3,
      })),
    []
  );

  return (
    <div className="relative min-h-screen pt-12 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Background container with overflow hidden */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated background elements */}
        {floatingElements.map((el) => (
          <motion.div
            key={el.id}
            className="absolute will-change-transform"
            style={{ left: el.left, top: el.top }}
            animate={{
              y: [0, el.yAmp, 0],
              x: [0, el.xAmp, 0],
              rotate: [0, el.rot],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: el.dur,
              repeat: Infinity,
              delay: el.delay,
              ease: "easeInOut",
            }}
          >
            {el.id % 3 === 0 ? (
              <Heart className="w-3 h-3 text-brown-300" />
            ) : el.id % 3 === 1 ? (
              <Sparkles className="w-2 h-2 text-amber-300" />
            ) : (
              <div className="w-2 h-2 bg-brown-400 rounded-full" />
            )}
          </motion.div>
        ))}

        {/* Gradient orbs */}
        <motion.div
          className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-r from-brown-200 to-amber-200 rounded-full blur-3xl opacity-20 will-change-transform"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-r from-brown-300 to-cream-200 rounded-full blur-2xl opacity-25 will-change-transform"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Content container which can overflow */}
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold gradient-text mb-8 pb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Let's Work Together
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-brown-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Ready to create something amazing? I'd love to hear about your project.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {/* Contact Info */}
          <div className="space-y-8">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-brown-800 mb-6">Get In Touch</h2>

              {[
                { icon: Mail, label: "Email", value: "amithilel0211@gmail.com", link: "mailto:amithilel0211@gmail.com" },
                { icon: Phone, label: "Phone", value: "+972 52-331-2052", link: "https://wa.me/972523312052" },
                { icon: MapPin, label: "Location", value: "US", link: null },
              ].map((contact) => (
                <motion.div
                  key={contact.label}
                  className="flex items-center gap-4 text-brown-600 group cursor-pointer will-change-transform"
                  whileHover={{ x: 10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-12 h-12 bg-brown-100 rounded-full flex items-center justify-center group-hover:bg-brown-200 transition-colors duration-300 relative overflow-hidden will-change-transform"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-brown-400 to-amber-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <contact.icon className="w-5 h-5 relative z-10" />
                  </motion.div>
                  <div>
                    <p className="font-medium group-hover:text-brown-800 transition-colors duration-200">
                      {contact.label}
                    </p>
                    {contact.link ? (
                      <motion.a
                        href={contact.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brown-500 hover:text-brown-700 transition-colors duration-200"
                        whileHover={{ letterSpacing: "0.02em" }}
                      >
                        {contact.value}
                      </motion.a>
                    ) : (
                      <p className="text-brown-500">{contact.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <h3 className="text-xl font-bold text-brown-800">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.label}
                    onMouseEnter={() => setHoveredSocial(index)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className={`w-12 h-12 rounded-full border-brown-200 ${social.hoverBg} hover:border-brown-300 relative overflow-hidden group`}
                    >
                      <a href={social.url} target="_blank" rel="noopener noreferrer">
                        <motion.div
                          className={`absolute inset-0 ${social.bg} opacity-0 group-hover:opacity-50 transition-opacity duration-300 will-change-transform`}
                          animate={hoveredSocial === index ? { scale: [0, 1.2, 1] } : {}}
                          transition={{ duration: 0.4 }}
                        />
                        <social.icon className={`w-5 h-5 ${social.color} relative z-10`} />
                        {hoveredSocial === index && (
                          <motion.div
                            className="absolute inset-0 border-2 border-current rounded-full will-change-transform"
                            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                          />
                        )}
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            className="bg-gradient-to-br from-brown-50 to-cream-100 rounded-2xl p-8 relative overflow-hidden will-change-transform"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Floating sparkles inside the card */}
            {ctaSparkles.map((s) => (
              <motion.div
                key={s.id}
                className="absolute w-1 h-1 bg-amber-400 rounded-full will-change-transform"
                style={{ left: s.left, top: s.top }}
                animate={{ y: [0, -10, 0], opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: s.delay }}
              />
            ))}

            <motion.h3
              className="text-2xl font-bold text-brown-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Ready to Start Your Project?
            </motion.h3>
            <motion.p
              className="text-brown-600 mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Whether you need UX research, UI design, or complete digital experience development, I'm
              here to help bring your vision to life.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
              <Button
                size="lg"
                className="bg-brown-600 hover:bg-brown-700 text-white w-full md:w-auto group relative overflow-hidden"
                asChild
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="mailto:amithilel0211@gmail.com">
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-brown-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Mail className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">Send Me a Message</span>
                  <motion.div
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 will-change-transform"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.div>
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default React.memo(ContactBase);
