# Ahasan Arefin — Personal Portfolio

A fast, responsive personal portfolio website for **Ahasan Arefin**, a 5th semester
Computer Science & Engineering student at **Daffodil International University**.

It is a **100% static site** — plain HTML, CSS and JavaScript. There is no backend,
no PHP, no database and no build step, which means it deploys straight to GitHub Pages
and loads instantly anywhere.

**Live site:** https://USERNAME.github.io/Arefin/
*(replace `USERNAME` with your GitHub username after deploying)*

---

## Features

- **Five pages** — Home, About, Skills, Projects and Contact.
- **Fully responsive** — CSS Grid and Flexbox layouts that adapt from mobile to desktop.
- **Dark / light theme toggle** — remembered between visits with `localStorage`.
- **Animated skill bars** — revealed on scroll with `IntersectionObserver`.
- **Working contact form** — delivers messages to your inbox through Formspree,
  with inline success and error messages, a honeypot anti-spam field and
  duplicate-submit protection. No API keys are exposed.
- **GitHub Pages ready** — a single `<base href>` script makes every link work both
  locally and from a repository sub-path such as `/Arefin/`.
- **No dependencies** — zero frameworks, zero npm packages, zero build tooling.
- **Accessible** — semantic HTML, `aria-live` form feedback and visible focus states.

---

## Technologies used

| Layer      | Technology                                             |
| ---------- | ------------------------------------------------------ |
| Markup     | HTML5                                                  |
| Styling    | CSS3 — custom properties, Grid, Flexbox, transitions    |
| Behaviour  | Vanilla JavaScript (ES5-compatible, no libraries)       |
| Forms      | [Formspree](https://formspree.io) (free tier)           |
| Hosting    | GitHub Pages                                            |

---

## Project structure

```
Arefin/
├── index.html          # Home — hero, stats, services, education timeline
├── about.html          # About — story, quick facts, coursework, work habits
├── skills.html         # Skills — languages, tools, currently learning
├── projects.html       # Projects — featured builds and this portfolio
├── contact.html        # Contact — details, Formspree form, social links
├── css/
│   └── style.css       # Single shared stylesheet for every page
├── js/
│   └── main.js         # Theme toggle, active nav, scroll reveal, contact form
├── .gitignore          # Ignores macOS/editor noise and secrets
├── .nojekyll           # Tells GitHub Pages to serve files as-is
└── README.md           # This file
```

> **Note:** files sit in the repository **root**, not in a `public/` folder.
> GitHub Pages serves the root of the branch directly, so `index.html` must be there.

---

## How to run locally

Because the site is static, you have two options.

**Option 1 — just open it (simplest)**

Double-click `index.html`, or:

```bash
open index.html          # macOS
```

**Option 2 — run a local web server (recommended)**

A server matches the GitHub Pages environment more closely:

```bash
cd /Users/md.ahasanarifin/Desktop/Arefin
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

> The contact form needs a real `http://` origin to reach Formspree, so it will fall back
> to opening your email app when opened with `file://`. That is expected behaviour, not a bug.

---

## Configuration — one value you must replace

The contact form talks to Formspree. Until you add your own form id, messages fall back
to opening the visitor's mail app.

1. Create a free account at <https://formspree.io>.
2. Create a new form and set its destination to your email address.
3. Copy the endpoint Formspree gives you — it looks like `https://formspree.io/f/abcdwxyz`.
4. Open `contact.html` and replace the placeholder in the `<form>` tag:

```html
<!-- before -->
<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">

<!-- after -->
<form id="contactForm" action="https://formspree.io/f/abcdwxyz" method="POST">
```

That is the **only** value you need to change. A Formspree endpoint is designed to be
public — no API key, password or SMTP credential is stored in this repository.

Also worth updating:

- `USERNAME` in the `<link rel="canonical">` tags (all five pages) → your GitHub username.
- The GitHub / LinkedIn / resume placeholders on `contact.html`.
- `resume.pdf` — add the file to the root if you link to it.

---

## How to deploy with GitHub Pages

```bash
cd /Users/md.ahasanarifin/Desktop/Arefin
git init
git add .
git commit -m "Add personal portfolio website"
git branch -M main
git remote add origin https://github.com/USERNAME/Arefin.git
git push -u origin main
```

Then, on GitHub:

1. Open your repository → **Settings**.
2. In the sidebar choose **Pages**.
3. Under **Build and deployment → Source**, select **Deploy from a branch**.
4. Set **Branch** to `main` and the folder to **`/ (root)`**.
5. Click **Save** and wait a minute or two.

Your site goes live at:

```
https://USERNAME.github.io/Arefin/
```

Every later push to `main` redeploys automatically.

---

## Contact

- **Email:** [252-15-191@diu.edu.bd](mailto:252-15-191@diu.edu.bd)
- **University:** Daffodil International University — B.Sc. in CSE, 5th semester
- **Student ID:** 252-15-929
- **Location:** Dhaka, Bangladesh

---

© 2026 Ahasan Arefin. Built with HTML, CSS and JavaScript.
# My-Profile
