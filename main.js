/* Amit Hilel portfolio — shared interactions */
(function () {
  "use strict";
  document.documentElement.classList.add("reveal-on");

  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 10) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () { links.classList.toggle("open"); });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
      // threshold:0 → reveal as soon as ANY part of the element enters. (A
      // higher threshold breaks on mobile, where stacked image sections can be
      // taller than 10x the viewport, so they never reach a 10% ratio and stay
      // invisible — leaving a big empty gap as you scroll.)
    }, { threshold: 0, rootMargin: "0px 0px -10% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* Ben-style fanned hero cards: scrub the fan → straightened row as you scroll.
     --fan goes 0 (tilted, stacked) → 1 (straight, spread) over the first ~half
     viewport of scrolling. On mobile / reduced-motion we pin it to the calm
     spread row so nothing depends on scroll. */
  var fanGrid = document.querySelector(".fancards");
  if (fanGrid) {
    var fanReduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var fanTicking = false;
    var applyFan = function () {
      fanTicking = false;
      var isDesktop = window.matchMedia("(min-width:861px)").matches;
      if (fanReduce || !isDesktop) { fanGrid.style.setProperty("--fan", "1"); return; }
      var travel = window.innerHeight * 0.5 || 400;
      var p = Math.min(1, Math.max(0, window.scrollY / travel));
      fanGrid.style.setProperty("--fan", p.toFixed(3));
    };
    var requestFan = function () {
      if (fanTicking) return;
      fanTicking = true;
      window.requestAnimationFrame(applyFan);
    };
    window.addEventListener("scroll", requestFan, { passive: true });
    window.addEventListener("resize", requestFan);
    applyFan();
  }

  /* Scroll-triggered video: play when it enters view, pause when it leaves (Ben Shih style) */
  var scrollVids = document.querySelectorAll("[data-scrollplay]");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (scrollVids.length && "IntersectionObserver" in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting && e.intersectionRatio >= 0.45) {
          if (!reduceMotion) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
        } else {
          v.pause();
        }
      });
    }, { threshold: [0, 0.45, 0.8] });
    scrollVids.forEach(function (v) { vio.observe(v); });
  }

  var lb = document.querySelector(".lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img");
    var openLb = function (src, alt) {
      lbImg.src = src; lbImg.alt = alt || "";
      lb.classList.add("open"); document.body.style.overflow = "hidden";
    };
    var closeLb = function () { lb.classList.remove("open"); document.body.style.overflow = ""; lbImg.src = ""; };
    document.querySelectorAll(".zoomable, .screen-grid img, .sol-media img, .cs-cover img").forEach(function (img) {
      img.classList.add("zoomable");
      img.addEventListener("click", function () { openLb(img.dataset.full || img.src, img.alt); });
    });
    lb.addEventListener("click", function (e) { if (e.target === lb || e.target.closest(".lightbox-close")) closeLb(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });
  }

  document.querySelectorAll("[data-proto]").forEach(function (proto) {
    var screens;
    try { screens = JSON.parse(proto.getAttribute("data-screens")); }
    catch (err) { screens = []; }
    if (!screens.length) return;
    var img = proto.querySelector(".phone img");
    var dotsWrap = proto.querySelector(".dots");
    var i = 0;
    screens.forEach(function (s) { var im = new Image(); im.src = s; });
    var dots = screens.map(function (_, idx) {
      var b = document.createElement("button");
      b.setAttribute("aria-label", "Go to screen " + (idx + 1));
      b.addEventListener("click", function (e) { e.stopPropagation(); go(idx); });
      dotsWrap.appendChild(b);
      return b;
    });
    function render() {
      img.src = screens[i];
      img.style.opacity = 0;
      requestAnimationFrame(function () { img.style.transition = "opacity .4s"; img.style.opacity = 1; });
      dots.forEach(function (d, idx) { d.classList.toggle("active", idx === i); });
    }
    function go(n) { i = (n + screens.length) % screens.length; render(); }
    proto.querySelector(".phone").addEventListener("click", function () { go(i + 1); });
    var prev = proto.querySelector("[data-prev]");
    var reset = proto.querySelector("[data-reset]");
    if (prev) prev.addEventListener("click", function () { go(i - 1); });
    if (reset) reset.addEventListener("click", function () { go(0); });
    render();
  });

  document.querySelectorAll("[data-tabs]").forEach(function (group) {
    var btns = group.querySelectorAll("[data-tab-btn]");
    var panes = group.querySelectorAll("[data-tab-pane]");
    btns.forEach(function (btn, idx) {
      btn.addEventListener("click", function () {
        btns.forEach(function (b) { b.classList.remove("active"); });
        panes.forEach(function (p) { p.style.display = "none"; });
        btn.classList.add("active");
        if (panes[idx]) panes[idx].style.display = "";
      });
    });
    if (btns[0]) btns[0].classList.add("active");
    panes.forEach(function (p, idx) { p.style.display = idx === 0 ? "" : "none"; });
  });

  document.querySelectorAll("[data-copy-email]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var email = btn.getAttribute("data-copy-email");
      var done = function () {
        var toast = document.querySelector("[data-copy-toast]");
        if (toast) { toast.textContent = "Copied " + email + " ✓"; setTimeout(function () { toast.textContent = ""; }, 2600); }
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done).catch(done);
      } else {
        var t = document.createElement("textarea"); t.value = email; document.body.appendChild(t); t.select();
        try { document.execCommand("copy"); } catch (e2) {} document.body.removeChild(t); done();
      }
    });
  });

  (function buildAssistant() {
    var AVATAR = "avatar-amit.png";
    var AV_SVG = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#fdf3e7"/><circle cx="50" cy="50" r="42" fill="none" stroke="#e8cdb3" stroke-width="2.5"/><ellipse cx="38" cy="45" rx="8.5" ry="10.5" fill="#fff" stroke="#5c391d" stroke-width="2.4"/><ellipse cx="62" cy="45" rx="8.5" ry="10.5" fill="#fff" stroke="#5c391d" stroke-width="2.4"/><circle class="ask-eye" data-cx="38" data-cy="46" cx="38" cy="46" r="4.2" fill="#3a2a1e"/><circle class="ask-eye" data-cx="62" data-cy="46" cx="62" cy="46" r="4.2" fill="#3a2a1e"/><circle cx="39.6" cy="44" r="1.4" fill="#fff"/><circle cx="63.6" cy="44" r="1.4" fill="#fff"/><path d="M40 64 C46 70 54 70 60 64" fill="none" stroke="#5c391d" stroke-width="3" stroke-linecap="round"/><circle cx="28" cy="57" r="4" fill="#e8917e" opacity="0.3"/><circle cx="72" cy="57" r="4" fill="#e8917e" opacity="0.3"/></svg>';
    var KB = [
      "I'm Amit Hilel - a UX Researcher and UI Designer with a background in Social Psychology, CX research, and data analysis. I turn messy human behavior into clear digital products.",
      "I lead end-to-end UX research: need-finding studies, in-depth interviews, usability testing, journey mapping, and satisfaction surveys. I also design and build intuitive product experiences - increasingly AI-assisted.",
      "8+ years across consumer products, early-stage startups, and public-sector platforms. I've been the first or sole researcher on many engagements, building research practices from scratch.",
      "Four case studies: Revolutionizing CX (AI research tool), Navigating Municipal Services, Routine Builder (accessibility), and MyCookBook. Open any from the work section!",
      "I integrate LLMs into the research workflow - accelerating qualitative coding, generating discussion guides, synthesizing large datasets, and vibe-coding interactive prototypes. Go-Go AI in the CX case study is a good example.",
      "UX Design at the Technion, an M.A. in Social Psychology (IDC), and a B.A. in Psychology. That psych foundation is why I always look for the 'why' behind behavior.",
      "Figma, Axure, Lookback, NVivo, SPSS, SQL, Google Analytics, SurveyMonkey - plus AI tools like Claude, ChatGPT, and Cursor for research and prototyping.",
      "Email amithilel0211@gmail.com, call +1 (650) 405-2823, or connect on LinkedIn (linkedin.com/in/amithilel). I'm based in Sunnyvale, CA.",
      "Yes - I'm open to freelance research engagements and full-time roles. Use the Contact page or email me and let's talk.",
      "I'm a proud mom to Romi and Ray (plus two mischievous dogs!). Outside UX you'll find me working out, hunting down food gems, or experimenting in my kitchen."
    ];
    function findAnswer(text) {
      text = text.toLowerCase();
      var best = null, bestScore = 0;
      var map = [
        { keys: ["contact", "email", "reach", "hire", "available", "work with", "phone"], i: 7 },
        { keys: ["ai", "llm", "gpt", "claude", "prototype", "vibe"], i: 4 },
        { keys: ["project", "case", "work", "portfolio", "study"], i: 3 },
        { keys: ["experience", "years"], i: 2 },
        { keys: ["education", "degree", "psychology", "technion", "school"], i: 5 },
        { keys: ["tool", "figma", "software", "stack"], i: 6 },
        { keys: ["fun", "hobby", "kids", "dog", "kitchen", "food", "mom"], i: 9 },
        { keys: ["who", "about", "yourself"], i: 0 },
        { keys: ["do you do", "what do you", "role", "specialize"], i: 1 }
      ];
      map.forEach(function (m) {
        var score = 0;
        m.keys.forEach(function (k) { if (text.indexOf(k) > -1) score++; });
        if (score > bestScore) { bestScore = score; best = m.i; }
      });
      if (best === null) return "Great question! I'd answer that best over email - amithilel0211@gmail.com. Meanwhile, try one of the suggested questions below.";
      return KB[best];
    }
    var fab = document.createElement("button");
    fab.className = "assistant-fab";
    fab.setAttribute("aria-label", "Ask Amit");
    fab.innerHTML = '<span class="pulse"></span><span class="av">' + AV_SVG + '</span>';
    var badge = document.createElement("div");
    badge.className = "assistant-badge";
    badge.textContent = "Hi! Ask me anything about Amit";
    var panel = document.createElement("div");
    panel.className = "assistant-panel";
    panel.innerHTML =
      '<div class="ap-head"><span class="av">' + AV_SVG + '</span><div><b>Ask Amit</b><span>AI assistant - answers from the portfolio</span></div>' +
      '<button class="ap-close" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>' +
      '<div class="ap-body"></div><div class="ap-chips"></div>';
    document.body.appendChild(fab);
    document.body.appendChild(badge);
    document.body.appendChild(panel);

    // eyes follow the cursor
    var eyes = document.querySelectorAll(".assistant-fab .ask-eye, .assistant-panel .ask-eye");
    if (eyes.length) {
      window.addEventListener("mousemove", function (ev) {
        eyes.forEach(function (p) {
          var svg = p.ownerSVGElement; if (!svg) return;
          var r = svg.getBoundingClientRect(); if (!r.width) return;
          var bx = parseFloat(p.getAttribute("data-cx"));
          var by = parseFloat(p.getAttribute("data-cy"));
          var ex = r.left + r.width * (bx / 100);
          var ey = r.top + r.height * (by / 100);
          var a = Math.atan2(ev.clientY - ey, ev.clientX - ex);
          var d = 2.4;
          p.setAttribute("cx", bx + Math.cos(a) * d);
          p.setAttribute("cy", by + Math.sin(a) * d);
        });
      }, { passive: true });
    }
    var body = panel.querySelector(".ap-body");
    var chips = panel.querySelector(".ap-chips");
    var greeted = false;
    function addMsg(text, who) {
      var m = document.createElement("div");
      m.className = "ap-msg " + who;
      m.textContent = text;
      body.appendChild(m);
      body.scrollTop = body.scrollHeight;
    }
    function ask(q) { addMsg(q, "user"); setTimeout(function () { addMsg(findAnswer(q), "bot"); }, 350); }
    ["What do you do?", "What projects can I see?", "Tell me about your AI work", "How can I contact you?", "Tell me something fun"].forEach(function (q) {
      var chip = document.createElement("button");
      chip.className = "ap-chip";
      chip.textContent = q;
      chip.addEventListener("click", function () { ask(q); });
      chips.appendChild(chip);
    });
    function openPanel() {
      panel.classList.add("open");
      badge.style.display = "none";
      if (!greeted) { addMsg("Hey! I'm Amit's assistant. Ask me about her work, research, or how to get in touch.", "bot"); greeted = true; }
    }
    function closePanel() { panel.classList.remove("open"); }
    fab.addEventListener("click", function () { panel.classList.contains("open") ? closePanel() : openPanel(); });
    panel.querySelector(".ap-close").addEventListener("click", closePanel);
    badge.addEventListener("click", openPanel);
    setTimeout(function () { if (!panel.classList.contains("open")) badge.style.display = "none"; }, 9000);
  })();
})();
