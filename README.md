# Oluwanifemi Oripeloye — Personal Portfolio

A modern, responsive personal portfolio built with plain **HTML5, CSS3, and vanilla JavaScript** — no frameworks, no build step. Showcases my background as a Software Engineer and Cloud Engineering Intern (MSc Applied Computing, University of Sunderland, UK), along with my skills, projects, and contact details.

**Live site:** [oluwanifemi-oripeloye-portfolio.vercel.app](https://oluwanifemi-oripeloye-portfolio.vercel.app)
**Repository:** [github.com/Nifemie27/Oluwanifemi_Oripeloye_Portfolio](https://github.com/Nifemie27/Oluwanifemi_Oripeloye_Portfolio)

---

## Overview

This is my personal developer portfolio — a single-page site that introduces who I am, what I work on, and how to get in touch. It's built to act as a professional digital identity I can share with recruiters, collaborators, and clients.

It includes a hero introduction, an About Me section, a categorized Skills grid, real project case studies, a certifications section, and a validated contact form — all wrapped in a dark/light themeable design system with scroll animations.

## Features

- **Sticky, responsive navbar** with smooth scrolling, scroll-aware active-link highlighting, and an animated mobile hamburger menu
- **Hero section** with a rotating typing effect, animated gradient blobs, and a scroll indicator
- **Dark/light theme toggle** persisted via `localStorage`, respecting the visitor's OS preference on first visit
- **Scroll-reveal animations** powered by `IntersectionObserver` (fade/slide-up on scroll)
- **Scroll progress bar** fixed to the top of the viewport
- **Skills** organized into Programming Languages, Frontend, Backend, Databases, Cloud & DevOps, Tools & Version Control, AI & APIs, and Soft Skills
- **Projects** section featuring real work:
  - [Wéda AI](https://weda-ai.vercel.app) — AI-powered weather & travel insights app
  - PocketLedger — AWS-deployed transaction tracker (cloud engineering internship project)
  - School Management System — in-progress, private repository
- **Certifications** section with editable placeholder cards
- **Contact form** with client-side validation (required fields, email format, minimum message length) and an accessible success message
- **Back-to-top button**, social links, and a clean footer
- Fully **responsive** (mobile, tablet, laptop, desktop) with no horizontal scrolling
- **Accessible**: semantic landmarks, skip link, visible focus states, `aria-*` attributes, keyboard-operable navigation and menu

## Technology Stack

| Layer      | Technology                        |
|------------|------------------------------------|
| Markup     | HTML5 (semantic elements)          |
| Styling    | CSS3 (custom properties, Flexbox, Grid, animations) |
| Behavior   | Vanilla JavaScript (ES6+, no dependencies) |
| Fonts      | Google Fonts — Space Grotesk & Inter |
| Deployment | Vercel / Netlify / GitHub Pages (static hosting) |

No build tools, bundlers, or frameworks are required — the site runs directly in the browser.

## Folder Structure

```
My Portfolio/
├── index.html      # Page markup and structure
├── style.css        # Design system + responsive layout + animations
├── script.js         # All interactive behavior (theme, nav, form, etc.)
├── README.md
├── images/           # Add project screenshots, OG image, etc. here
└── assets/           # Additional static assets (icons, downloads, etc.)
```

## Installation / Running Locally

No dependencies to install. Either:

1. Open `index.html` directly in a browser, **or**
2. Serve it locally for a closer-to-production experience:

   ```bash
   # Python
   python3 -m http.server 8000

   # or Node
   npx serve .
   ```

   Then visit `http://localhost:8000`.

## Deployment

The project is a static site and deploys with zero configuration.

**Vercel**
```bash
npm install -g vercel
vercel
```
Or connect the GitHub repository directly at [vercel.com](https://vercel.com/) — no build command or output directory needs to be set.

**Netlify** — drag and drop the project folder at [app.netlify.com/drop](https://app.netlify.com/drop), or connect the repository.

**GitHub Pages** — push to a repository and enable Pages on the `main` branch in repository settings.

## Customization

- **Colors / theme**: edit the CSS custom properties at the top of `style.css` (`:root` for dark theme, `:root[data-theme="light"]` for light theme).
- **Fonts**: update the Google Fonts `<link>` in `index.html` and the `--font-heading` / `--font-body` variables in `style.css`.
- **Content**: all text lives directly in `index.html` — sections are clearly commented (Hero, About, Skills, Projects, Certifications, Contact, Footer).
- **Certifications**: replace the placeholder cards in the `#certifications` section with real entries as they're earned.
- **Contact form**: currently validates client-side and shows a simulated success message. To actually deliver messages, wire the `fetch` call of your choice (e.g. [Formspree](https://formspree.io/) or [EmailJS](https://www.emailjs.com/)) into the submit handler in `script.js` (`initContactForm`).

## Future Improvements

- Wire the contact form to a real email delivery service
- Add real project screenshots to `images/`
- Populate the Certifications section as credentials are earned
- Add a blog/writing section
- Add unit tests for form validation logic

## License

This project is open for personal reference and learning purposes. Feel free to fork the structure for your own portfolio, but please use your own content and personal information.
