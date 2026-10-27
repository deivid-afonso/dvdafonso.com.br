const translations = {
  en: {
    "nav.about": "About", "nav.projects": "Projects", "nav.notes": "Notes", "nav.experience": "Experience", "nav.contact": "Contact",
    "hero.eyebrow": "Available since Oct/2025 — remote, full-time or contract", "hero.title": "Backend systems that <em>scale and deliver.</em>",
    "hero.text": "I am Deivid Afonso, a Senior Backend Engineer specialized in .NET, C# and AWS. I build robust systems and solutions that help people.",
    "hero.cta": "Let's talk", "hero.cv": "Download CV", "hero.meta": "7+ years building software", "about.label": "About me",
    "about.title": "Backend that solves,<br /><em>not just compiles.</em>", "about.lead": "Software engineering with technical depth and attention to the impact every solution creates.",
    "about.body": "I build high-performance corporate systems with C#/.NET, REST APIs, messaging, caching, relational databases and AWS. I also integrate AI tools into the development cycle to accelerate delivery and eliminate manual work. As an autistic person with ADHD, I bring a neurodivergent perspective to create with more empathy, clarity and intention.",
    "projects.label": "Featured projects", "projects.title": "Ideas that became<br /><em>code and shape.</em>", "projects.all": "See all on GitHub ↗",
    "projects.trade": "REST API with Repository Pattern, dependency injection and Entity Framework Core. Layered architecture with Services, Repository and Controllers separation.", "projects.nutrimente": "Platform with 5 Docker containers: Spring Boot API (Java), Next.js frontend, SQL Server, MongoDB for logs and Node.js audit service. Playwright E2E tests, healthchecks and JWT.", "projects.portfolio": "This site: CI/CD with GitHub Actions, FTPS deploy, authenticated SMTP, CSRF protection, E2E tests, Lighthouse CI and Cloudflare CDN. Accessibility score 100.",
    "notes.label": "Workbench notes", "notes.title": "What I am<br /><em>investigating.</em>", "notes.aside": "Short learnings, real decisions.", "notes.one.title": "When a queue solves more than a retry", "notes.one.text": "An integration failed 3 times a day with synchronous retries and growing timeouts. I replaced it with a RabbitMQ queue and dead-letter: processing became async, failures became traceable, and API response time dropped from 12s to 200ms. Not every integration problem needs more retries — sometimes it needs decoupling.", "notes.two.title": "The database usually tells only part of the story", "notes.two.text": "A critical report took 45 seconds. The execution plan showed table scans on 3 tables. I created composite indexes, rewrote the procedure eliminating cursors and added server-side pagination. Final time: 2 seconds. The database gives the clues — the work is tracing the full path.", "notes.three.title": "Using AI without outsourcing your thinking", "notes.three.text": "I integrated GitHub Copilot and Claude into my daily workflow: test generation, PR reviews, API documentation. The real gain isn't typing less — it's having a second pair of eyes on every decision. But the responsibility for context, architecture and production code is still mine.",
    "experience.label": "Experience", "experience.title": "Learn, build,<br /><em>evolve.</em>", "experience.basis": "Basis Tecnologia — Software Engineer", "experience.basisText": "Owned the evolution of a corporate C#/.NET system with 50+ modules in a 5-dev team. Rewrote SQL Server/Oracle procedures and queries, cutting critical report times by up to 70% (from ~30s to ~9s on 500k+ row queries). Implemented GitHub Copilot-assisted reviews, catching regressions before production.", "experience.g4f": "G4F — Backend Engineer", "experience.g4fText": "Led optimization of 30+ procedures and indexing strategies across 200+ production routines, team of 4. Drove RCA on P1/P2 incidents, cutting MTTR from ~4h to under 1h with improved logging and structural fixes. Introduced Clean Code/SOLID in code reviews, cutting rework by ~40% measured by rejected PRs.", "experience.gov": "GovBr — Software Engineer", "experience.govText": "Built and maintained VB.NET/C# modules for a municipal system used by thousands of citizens for services like property tax and permits. Owned SQL Server and legacy Java API integration, reducing integration failures and delivering in 2-week cycles.", "experience.marcius": "Marcius Magazine — Software Engineer", "experience.marciusText": "Built multi-branch ERP modules with .NET Core + PostgreSQL and integrated 3 marketplaces (Mercado Livre, B2W). Automated order and inventory flows, eliminating manual processes. Implemented Selenium regression test suite that enabled safe weekly releases.",
    "skills.label": "Skills", "skills.expert": "Expert", "skills.proficient": "Proficient", "skills.working": "Working knowledge",
    "education.label": "Education", "education.arch": "Postgraduate — .NET Software Architecture", "education.archDate": "2024", "education.archSchool": "Anhanguera", "education.dsm": "Associate Degree — Multiplatform Systems Development", "education.dsmDate": "In progress", "education.dsmSchool": "Fatec Diadema — 3rd semester · Expected: 2028", "education.web": "Associate Degree — Internet Systems", "education.webDate": "2020", "education.webSchool": "Fatec Jahu",
    "contact.label": "Contact", "contact.title": "Have an idea?<br /><em>Let's bring it to life.</em>", "contact.text": "If you want to talk about technology, a project or an opportunity, send me a message.", "contact.name": "Your name", "contact.email": "Your e-mail", "contact.message": "How can I help?", "contact.send": "Send message", "footer": "C#, .NET, AWS and coffee."
  }
};

const KEYS_WITH_HTML = new Set([
  "hero.title", "about.title", "projects.title", "notes.title",
  "experience.title", "contact.title"
]);

const languageButton = document.querySelector(".language-switch");
let english = false;
document.querySelectorAll("[data-i18n]").forEach((element) => {
  element.dataset.original = element.innerHTML;
});
languageButton.addEventListener("click", () => {
  english = !english;
  document.documentElement.lang = english ? "en" : "pt-BR";
  languageButton.textContent = english ? "PT" : "EN";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const value = english ? translations.en[key] : null;
    const content = value || element.dataset.original;
    if (KEYS_WITH_HTML.has(key)) {
      element.innerHTML = content;
    } else {
      element.textContent = content;
    }
  });
  document.title = english ? "Deivid Afonso | Backend Engineer .NET C# AWS — São Paulo, Brazil" : "Deivid Afonso | Engenheiro Backend .NET C# AWS — São Paulo, SP";
  const cvLink = document.querySelector("#cv-link");
  if (cvLink) cvLink.href = english ? "cv-deivid-afonso-en.pdf" : "cv-deivid-afonso.pdf";
});

document.querySelector("#year").textContent = new Date().getFullYear();

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const menuLabel = (open) => open ? "Fechar menu" : "Abrir menu";

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute("aria-label", menuLabel(isOpen));
});

document.addEventListener("click", (e) => {
  if (nav.classList.contains("is-open") && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", menuLabel(false));
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("is-open")) {
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", menuLabel(false));
    menuToggle.focus();
  }
});

document.querySelectorAll(".site-nav a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", menuLabel(false));
}));

const themeToggle = document.querySelector("#theme-toggle");
const fontDown = document.querySelector("#font-down");
const fontUp = document.querySelector("#font-up");

const FONT_STEPS = [0.9, 1, 1.1, 1.2];
const FONT_NAMES = ["small", "normal", "large", "large"];
let fontIndex = 1;

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute("aria-label", theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro");
};

const applyFontScale = () => {
  document.documentElement.dataset.fontScale = FONT_NAMES[fontIndex];
  document.documentElement.style.setProperty("--font-scale", String(FONT_STEPS[fontIndex]));
  fontDown.disabled = fontIndex <= 0;
  fontUp.disabled = fontIndex >= FONT_STEPS.length - 1;
  fontDown.classList.toggle("is-active", fontIndex < 1);
  fontUp.classList.toggle("is-active", fontIndex > 1);
  try { localStorage.setItem("fontIndex", String(fontIndex)); } catch {}
};

const savedTheme = (() => { try { return localStorage.getItem("theme"); } catch { return null; } })();
const savedFontIndex = (() => { try { const v = localStorage.getItem("fontIndex"); return v === null ? NaN : Number(v); } catch { return NaN; } })();

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme(window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
}

if (Number.isFinite(savedFontIndex) && savedFontIndex >= 0 && savedFontIndex < FONT_STEPS.length) {
  fontIndex = savedFontIndex;
}
applyFontScale();

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch {}
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  if (!savedTheme) applyTheme(e.matches ? "dark" : "light");
});

fontDown.addEventListener("click", () => {
  if (fontIndex > 0) { fontIndex--; applyFontScale(); }
});

fontUp.addEventListener("click", () => {
  if (fontIndex < FONT_STEPS.length - 1) { fontIndex++; applyFontScale(); }
});

fetch("csrf-token.php", { credentials: "same-origin" })
  .then((r) => r.json())
  .then((d) => { document.querySelector("#csrf_token").value = d.csrf_token; })
  .catch(() => {});

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.querySelector("#form-status");
  const submit = form.querySelector("button[type='submit']");
  const formData = new FormData(form);
  status.className = "form-status";
  status.textContent = english ? "Sending..." : "Enviando...";
  submit.disabled = true;
  fetch(form.action, { method: "POST", body: formData, credentials: "same-origin", headers: { Accept: "application/json" } })
    .then((response) => response.json().then((data) => ({ ok: response.ok, data })))
    .then(({ ok, data }) => {
      if (!ok) throw new Error(data.message || "contact_failed");
      form.reset();
      if (data.csrf_token) document.querySelector("#csrf_token").value = data.csrf_token;
      status.className = "form-status success";
      status.textContent = english ? "Message sent. I will get back to you soon." : "Mensagem enviada. Responderei em breve.";
    })
    .catch(() => {
      status.className = "form-status";
      status.textContent = english ? "Could not send. Please email contato@dvdafonso.com.br." : "Não foi possível enviar. Escreva para contato@dvdafonso.com.br.";
    })
    .finally(() => { submit.disabled = false; });
});

const navLinks = document.querySelectorAll(".site-nav a[href^='#']");
const sections = document.querySelectorAll("section[id]");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
      });
    }
  });
}, { rootMargin: "-20% 0px -60% 0px" });

sections.forEach((section) => sectionObserver.observe(section));

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
}
