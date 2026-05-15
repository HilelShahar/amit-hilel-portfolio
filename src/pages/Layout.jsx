// src/components/pages/Layout.jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Facebook, Linkedin, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const STYLE_CSS = `
  :root {
    --cream-50: #fefcf7;
    --cream-100: #fef8f0;
    --cream-200: #fdeee0;
    --brown-100: #f4e6d9;
    --brown-200: #e8cdb3;
    --brown-300: #d4a574;
    --brown-400: #c08552;
    --brown-500: #a67542;
    --brown-600: #8b5a2b;
    --brown-700: #6f4423;
    --brown-800: #5c391d;
    --brown-900: #4a2f17;
  }

  .bg-cream-50 { background-color: var(--cream-50); }
  .bg-cream-100 { background-color: var(--cream-100); }
  .bg-cream-200 { background-color: var(--cream-200); }
  .bg-brown-100 { background-color: var(--brown-100); }
  .bg-brown-200 { background-color: var(--brown-200); }
  .bg-brown-500 { background-color: var(--brown-500); }
  .bg-brown-600 { background-color: var(--brown-600); }
  .bg-brown-700 { background-color: var(--brown-700); }

  .text-brown-600 { color: var(--brown-600); }
  .text-brown-700 { color: var(--brown-700); }
  .text-brown-800 { color: var(--brown-800); }
  .text-brown-900 { color: var(--brown-900); }

  .border-brown-200 { border-color: var(--brown-200); }
  .border-brown-300 { border-color: var(--brown-300); }
  .border-brown-500 { border-color: var(--brown-500); }

  .hover\\:bg-brown-100:hover { background-color: var(--brown-100); }
  .hover\\:bg-brown-500:hover { background-color: var(--brown-500); }
  .hover\\:text-brown-700:hover { color: var(--brown-700); }
  .hover\\:border-brown-500:hover { border-color: var(--brown-500); }

  .shadow-brown-lg {
    box-shadow: 0 10px 15px -3px rgb(74 47 23 / 0.1), 0 4px 6px -4px rgb(74 47 23 / 0.1);
  }
  .hover\\:shadow-brown-lg:hover {
    box-shadow: 0 10px 15px -3px rgb(74 47 23 / 0.1), 0 4px 6px -4px rgb(74 47 23 / 0.1);
  }
  .shadow-brown-xl {
    box-shadow: 0 20px 25px -5px rgb(74 47 23 / 0.1), 0 8px 10px -6px rgb(74 47 23 / 0.1);
  }
  .hover\\:shadow-brown-xl:hover {
    box-shadow: 0 20px 25px -5px rgb(74 47 23 / 0.1), 0 8px 10px -6px rgb(74 47 23 / 0.1);
  }
  .shadow-brown-2xl {
    box-shadow: 0 25px 50px -12px rgb(74 47 23 / 0.25);
  }
  .hover\\:shadow-brown-2xl:hover {
    box-shadow: 0 25px 50px -12px rgb(74 47 23 / 0.25);
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }

  .animate-slide-in {
    animation: slideIn 0.8s ease-out forwards;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .gradient-text {
    background: linear-gradient(135deg, var(--brown-600), var(--brown-400));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const NAV_ITEMS = [
  { name: "HOME", url: createPageUrl("Home") },
  { name: "ABOUT", url: createPageUrl("About") },
  { name: "CONTACT", url: createPageUrl("Contact") },
  { name: "RESUME", url: createPageUrl("Resume") },
];

const SOCIAL_LINKS = [
  { icon: Facebook, url: "https://www.facebook.com/amit.hilel.7", label: "Facebook" },
  { icon: Linkedin, url: "https://www.linkedin.com/in/amithilel", label: "LinkedIn" },
  { icon: FileText, url: "/Amit_Hilel_CV_2026.pdf", label: "Resume"},
];

function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // rAF-batched scroll handler, passive listener
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // initialize once in case page is not at top
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Force scroll-to-top on route change (keeps your original intent)
  useEffect(() => {
    // immediate
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // next frame (in case layout mounts a bit later)
    const rafId = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });

    // small delayed retry (mirrors your original fallback)
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 10);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
    };
  }, [location.pathname]);

  const pathname = location.pathname;

  const isActive = useCallback((url) => pathname === url, [pathname]);

  const handleSocialClick = useCallback((url) => {
    window.open(url, "_blank");
  }, []);

  const headerClasses = useMemo(
    () =>
      `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md bg-white/80 shadow-sm" : "bg-transparent"
      }`,
    [isScrolled]
  );

  const navWrapClasses = useMemo(
    () =>
      `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isScrolled ? "border-b border-brown-200/30" : "border-transparent"
      }`,
    [isScrolled]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-amber-50">
      <style>{STYLE_CSS}</style>

      {/* Header */}
      <header className={headerClasses}>
        <nav className={navWrapClasses}>
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo/Name */}
            <Link to={createPageUrl("Home")} className="flex-shrink-0 flex items-center">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b69f4784813da7e3830160/24aa0067a_cropped-cropped-Logo-Amit.png"
                alt="Amit Hilel Logo"
                className="h-10 md:h-12 w-auto transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  to={item.url}
                  className={`text-sm font-medium tracking-wide transition-all duration-200 hover:text-brown-700 hover:scale-105 ${
                    isActive(item.url)
                      ? "text-brown-700 border-b-2 border-brown-500 pb-1"
                      : "text-brown-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-1 md:space-x-2">
              {SOCIAL_LINKS.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  className="text-brown-600 hover:text-brown-800 transition-all duration-300 hover:scale-110 rounded-full"
                  onClick={() => handleSocialClick(social.url)}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden flex justify-center space-x-6 pb-4 pt-4 border-t ${
              isScrolled ? "border-brown-200/30" : "border-transparent"
            }`}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.url}
                className={`text-xs font-medium tracking-wide transition-all duration-200 ${
                  isActive(item.url)
                    ? "text-brown-700 border-b-2 border-brown-500 pb-1"
                    : "text-brown-600 hover:text-brown-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-28 md:pt-20">{children}</main>

      {/* Footer */}
      <footer className="bg-cream-50 text-brown-700 py-12 border-t border-brown-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-brown-800 mb-4">Let's Create Together</h3>
            <p className="text-brown-600 mb-6 max-w-md mx-auto">
              Ready to transform your ideas into exceptional user experiences?
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                className="bg-transparent border-brown-500 text-brown-700 hover:bg-brown-500 hover:text-white transition-all duration-300 hover:scale-105 px-6 py-3"
                onClick={() => window.open("mailto:amithilel0211@gmail.com", "_self")}
              >
                <Mail className="w-4 h-4 mr-2" />
                Get In Touch
              </Button>
            </div>
            <div className="mt-8 pt-8 border-t border-brown-200 text-sm text-brown-500">
              © 2026 Amit Hilel. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default React.memo(Layout);
