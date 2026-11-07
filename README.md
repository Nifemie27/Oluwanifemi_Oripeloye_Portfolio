# Oluwanifemi Oripeloye — Personal Portfolio

A modern, responsive personal portfolio built with plain **HTML5, CSS3, and vanilla JavaScript** — no frameworks, no build step. Showcases my background as a Software Engineer and Cloud Engineering Intern (MSc Applied Computing, University of Sunderland, UK), along with my skills, projects, and contact details.

**Live site:** [oluwanifemi-oripeloye-portfolio.vercel.app](https://oluwanifemi-oripeloye-portfolio.vercel.app)
**Repository:** [github.com/Nifemie27/Oluwanifemi_Oripeloye_Portfolio](https://github.com/Nifemie27/Oluwanifemi_Oripeloye_Portfolio)

---

## Overview

This is my personal developer portfolio — a single-page site that introduces who I am, what I work on, and how to get in touch. It's built to act as a professional digital identity I can share with recruiters, collaborators, and clients.

It includes a hero introduction, an About Me section, a categorized Skills grid, real project case studies, and a contact form that sends real email — all wrapped in a dark/light themeable design system with scroll animations.

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
  - [Geniusis](https://geniusis.app) — multi-tenant SaaS school management platform for African schools
- **Contact form** with client-side validation, a spam honeypot, and real email delivery via a serverless SMTP endpoint
- **Back-to-top button**, social links, and a clean footer
- Fully **responsive** (mobile, tablet, laptop, desktop) with no horizontal scrolling
- **Accessible**: semantic landmarks, skip link, visible focus states, `aria-*` attributes, keyboard-operable navigation and menu

## Technology Stack

| Layer      | Technology                        |
|------------|------------------------------------|
| Markup     | HTML5 (semantic elements)          |
| Styling    | CSS3 (custom properties, Flexbox, Grid, animations) |
| Behavior   | Vanilla JavaScript (ES6+, no dependencies) |
| Contact form backend | Node.js serverless function on Vercel (`api/contact.js`) using [Nodemailer](https://nodemailer.com/) over SMTP |
| Fonts      | Google Fonts — Space Grotesk & Inter |
| Deployment | Vercel (static frontend + serverless function) |

The frontend itself is plain static HTML/CSS/JS — no build step. The only Node dependency (`nodemailer`) powers the single serverless function that sends contact-form email.

## Folder Structure

```
My Portfolio/
├── index.html        # Page markup and structure
├── style.css         # Design system + responsive layout + animations
├── script.js         # All interactive behavior (theme, nav, form, etc.)
├── api/
│   └── contact.js    # Serverless function: validates + emails contact form submissions
├── package.json       # Declares the nodemailer dependency for api/contact.js
├── .gitignore
├── README.md
├── images/            # Add project screenshots, OG image, etc. here
└── assets/            # Additional static assets (icons, downloads, etc.)
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

The frontend deploys with zero configuration; the contact form additionally needs SMTP environment variables set on whatever platform runs `api/contact.js`.

**Vercel** (recommended — used for the live site)
```bash
npm install -g vercel
vercel
```
Or connect the GitHub repository directly at [vercel.com](https://vercel.com/). Vercel auto-detects the `api/` directory as a serverless function and installs `nodemailer` from `package.json` — no build command or output directory needs to be set.

**Netlify / GitHub Pages** — these only serve static files, so `api/contact.js` won't run as-is. The frontend (everything except the contact form's email delivery) still works if deployed there; porting `api/contact.js` to a Netlify Function would be needed for the form to send mail.

## Contact Form / Email Setup

The contact form posts to `api/contact.js`, which sends the message via SMTP using [Nodemailer](https://nodemailer.com/). No credentials are stored in the repo — they're read from environment variables at runtime.

**1. Set these environment variables** in the Vercel project (Project → Settings → Environment Variables):

| Variable | Description | Example |
|---|---|---|
| `SMTP_HOST` | Your SMTP provider's host | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | `587` (STARTTLS) or `465` (SSL) |
| `SMTP_USER` | SMTP account username (usually your email address) | `you@gmail.com` |
| `SMTP_PASS` | SMTP account password or app password | *(app password, not your regular password)* |
| `CONTACT_TO_EMAIL` | Where form submissions get delivered | `oluwanifemioripeloye@gmail.com` |

**Using Gmail:** enable 2-Step Verification on the account, then create an [App Password](https://myaccount.google.com/apppasswords) — use that 16-character value as `SMTP_PASS`, not your normal Gmail password. Use `smtp.gmail.com` / port `587` for `SMTP_HOST` / `SMTP_PORT`.

Any other SMTP provider (Outlook, Zoho, Resend, Brevo, SendGrid, etc.) works the same way — just use that provider's host, port, and credentials.

**2. Redeploy** after adding the variables so the function picks them up.

**3. Local testing** (optional): create a `.env` file (already gitignored) with the same variables and run `vercel dev`, which serves both the static site and the `api/` function together.

The endpoint also validates input server-side and includes a hidden honeypot field to reject basic bot spam before it ever reaches the SMTP call.

## Customization

- **Colors / theme**: edit the CSS custom properties at the top of `style.css` (`:root` for dark theme, `:root[data-theme="light"]` for light theme).
- **Fonts**: update the Google Fonts `<link>` in `index.html` and the `--font-heading` / `--font-body` variables in `style.css`.
- **Content**: all text lives directly in `index.html` — sections are clearly commented (Hero, About, Skills, Projects, Contact, Footer).
- **Contact form**: validates client-side and server-side, then emails the submission via `api/contact.js`. See [Contact Form / Email Setup](#contact-form--email-setup) above.

## Future Improvements

- Add real project screenshots to `images/`
- Re-add a Certifications section as credentials are earned
- Add a blog/writing section
- Add unit tests for form validation logic

## License

This project is open for personal reference and learning purposes. Feel free to fork the structure for your own portfolio, but please use your own content and personal information.
