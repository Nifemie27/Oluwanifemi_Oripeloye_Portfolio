/* ==========================================================================
   Oluwanifemi Oripeloye — Portfolio Scripts
   Vanilla JS, split into small independent features. Each feature guards
   against missing DOM nodes so sections can be edited independently.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMobileNav();
  initNavbarScrollState();
  initScrollProgress();
  initActiveNavHighlight();
  initScrollReveal();
  initBackToTop();
  initTypingEffect();
  initSmoothAnchorFocus();
  initContactForm();
  initButtonRipple();
});

/* ---------------------------------------------------------------------
   Theme toggle (dark/light) with localStorage persistence
   --------------------------------------------------------------------- */
function initThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  const STORAGE_KEY = "portfolio-theme";
  const root = document.documentElement;

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    toggle.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
  };

  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  applyTheme(savedTheme || (prefersLight ? "light" : "dark"));

  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });
}

/* ---------------------------------------------------------------------
   Mobile hamburger navigation
   --------------------------------------------------------------------- */
function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (!hamburger || !navLinks) return;

  const closeMenu = () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  };

  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

/* ---------------------------------------------------------------------
   Navbar background state on scroll
   --------------------------------------------------------------------- */
function initNavbarScrollState() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const updateState = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 12);
  };

  // The page always loads at scrollY 0, so the unscrolled state already
  // matches the default markup — defer this read to the next frame
  // instead of forcing the page's first layout pass synchronously here.
  requestAnimationFrame(updateState);
  window.addEventListener("scroll", updateState, { passive: true });
}

/* ---------------------------------------------------------------------
   Scroll progress indicator bar
   --------------------------------------------------------------------- */
function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
  };

  // Reading scrollHeight forces a synchronous layout — defer the initial
  // measurement to the next frame so it doesn't block first paint.
  requestAnimationFrame(updateProgress);
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
}

/* ---------------------------------------------------------------------
   Highlight active nav link based on visible section
   --------------------------------------------------------------------- */
function initActiveNavHighlight() {
  const navLinks = document.querySelectorAll("[data-nav]");
  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active-link", link.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------------------------------------------
   Scroll-reveal animations via IntersectionObserver
   --------------------------------------------------------------------- */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index % 4, 3) * 90}ms`;
    observer.observe(el);
  });
}

/* ---------------------------------------------------------------------
   Back-to-top button
   --------------------------------------------------------------------- */
function initBackToTop() {
  const button = document.getElementById("backToTop");
  if (!button) return;

  const toggleVisibility = () => {
    button.classList.toggle("visible", window.scrollY > 480);
  };

  requestAnimationFrame(toggleVisibility);
  window.addEventListener("scroll", toggleVisibility, { passive: true });

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------------------------------------------------------------------
   Hero typing effect — rotates through role titles
   --------------------------------------------------------------------- */
function initTypingEffect() {
  const target = document.getElementById("typingText");
  if (!target) return;

  const roles = ["Software Engineer", "Cloud Engineering Intern", "AI Enthusiast", "Problem Solver"];
  const TYPE_SPEED = 70;
  const DELETE_SPEED = 40;
  const HOLD_TIME = 1600;

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const tick = () => {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex -= 1;
    } else {
      charIndex += 1;
    }

    target.textContent = currentRole.slice(0, charIndex);

    let delay = isDeleting ? DELETE_SPEED : TYPE_SPEED;

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      delay = HOLD_TIME;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 300;
    }

    window.setTimeout(tick, delay);
  };

  tick();
}

/* ---------------------------------------------------------------------
   Ensure anchor targets receive focus after smooth scroll (a11y)
   --------------------------------------------------------------------- */
function initSmoothAnchorFocus() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      event.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });

      window.setTimeout(() => {
        targetEl.setAttribute("tabindex", "-1");
        targetEl.focus({ preventScroll: true });
      }, 500);
    });
  });
}

/* ---------------------------------------------------------------------
   Contact form validation + simulated success feedback
   --------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const fields = {
    name: { input: form.querySelector("#name"), error: form.querySelector("#nameError") },
    email: { input: form.querySelector("#email"), error: form.querySelector("#emailError") },
    message: { input: form.querySelector("#message"), error: form.querySelector("#messageError") },
  };
  const successEl = form.querySelector("#formSuccess");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const setError = (field, message) => {
    field.input.closest(".form-group").classList.toggle("has-error", Boolean(message));
    field.error.textContent = message;
  };

  const validateField = (key) => {
    const { input } = fields[key];
    const value = input.value.trim();

    if (!value) {
      setError(fields[key], "This field is required.");
      return false;
    }

    if (key === "email" && !emailPattern.test(value)) {
      setError(fields[key], "Enter a valid email address.");
      return false;
    }

    if (key === "message" && value.length < 10) {
      setError(fields[key], "Message should be at least 10 characters.");
      return false;
    }

    setError(fields[key], "");
    return true;
  };

  Object.keys(fields).forEach((key) => {
    fields[key].input.addEventListener("blur", () => validateField(key));
    fields[key].input.addEventListener("input", () => {
      if (fields[key].input.closest(".form-group").classList.contains("has-error")) {
        validateField(key);
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const isValid = Object.keys(fields)
      .map((key) => validateField(key))
      .every(Boolean);

    if (!isValid) {
      successEl.textContent = "";
      return;
    }

    // Static site: no backend wired up. Swap this block for a real request
    // (e.g. Formspree, EmailJS) when connecting the form to email delivery.
    successEl.textContent = `Thanks, ${fields.name.input.value.trim()}! Your message has been received — I'll get back to you soon.`;
    form.reset();
    Object.keys(fields).forEach((key) => setError(fields[key], ""));
  });
}

/* ---------------------------------------------------------------------
   Button ripple effect on click
   --------------------------------------------------------------------- */
function initButtonRipple() {
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const rect = btn.getBoundingClientRect();
      btn.style.setProperty("--ripple-x", `${event.clientX - rect.left}px`);
      btn.style.setProperty("--ripple-y", `${event.clientY - rect.top}px`);
      btn.classList.remove("rippling");
      // Force reflow so the animation can restart on rapid clicks
      void btn.offsetWidth;
      btn.classList.add("rippling");
    });
  });
}
