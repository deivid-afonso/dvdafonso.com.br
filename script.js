const translations = {
  en: {
    "nav.about": "About", "nav.projects": "Projects", "nav.notes": "Notes", "nav.experience": "Experience", "nav.contact": "Contact",
    "hero.eyebrow": "Available for remote work — full-time or contract", "hero.title": "Technology, projects and ideas <em>in motion.</em>",
    "hero.text": "I am Deivid Afonso, a Senior Backend Engineer specialized in .NET, C# and AWS. I build robust systems and solutions that help people.",
    "hero.cta": "Let's talk", "hero.cv": "Download CV", "hero.meta": "7+ years building software", "about.label": "About me",
    "about.title": "Engineering with purpose,<br /><em>people at the center.</em>", "about.lead": "Software engineering with technical depth and attention to the impact every solution creates.",
    "about.body": "I build high-performance corporate systems with C#/.NET, REST APIs, messaging, caching, relational databases and AWS. I also integrate AI tools into the development cycle to accelerate delivery and eliminate manual work. As an autistic person with ADHD, I bring a neurodivergent perspective to create with more empathy, clarity and intention.",
    "projects.label": "Featured projects", "projects.title": "Ideas that became<br /><em>code and shape.</em>", "projects.all": "See all on GitHub ↗",
    "projects.console": "Full stack project exploring Web API, Angular and Entity Framework Core.", "projects.events": "Full stack application built with ASP.NET Core for event management.", "projects.git": "A project dedicated to sharing practical knowledge about Git.",
    "notes.label": "Workbench notes", "notes.title": "What I am<br /><em>investigating.</em>", "notes.aside": "Short learnings, real decisions.", "notes.one.title": "When a queue solves more than a retry", "notes.one.text": "An integration failed 3 times a day with synchronous retries and growing timeouts. I replaced it with a RabbitMQ queue and dead-letter: processing became async, failures became traceable, and API response time dropped from 12s to 200ms. Not every integration problem needs more retries — sometimes it needs decoupling.", "notes.two.title": "The database usually tells only part of the story", "notes.two.text": "Queries, indexes and logs are clues. The work is tracing the full path until the user feels the difference.", "notes.three.title": "Using AI without outsourcing your thinking", "notes.three.text": "Copilots speed up typing. Responsibility for the decision, context and code is still ours.",
    "experience.label": "Experience", "experience.title": "Learn, build,<br /><em>evolve.</em>", "experience.basis": "Basis Tecnologia — Software Engineer", "experience.basisText": "Corporate C#/.NET system evolution with stakeholder validation. SQL Server/Oracle query and procedure tuning — up to 70% faster critical reports. AI-assisted code review (GitHub Copilot) reducing review cycles.", "experience.g4f": "G4F — Backend Engineer", "experience.g4fText": "Optimized 30+ procedures and indexes in production routines. Reduced MTTR from ~4h to under 1h with RCA and structural fixes. Clean Code/SOLID in code reviews, cutting rework by ~40%.", "experience.gov": "GovBr — Software Engineer", "experience.govText": "VB.NET/C# modules for a municipal system serving thousands of citizens, integrating SQL Server and Java APIs. Improved delivery speed and public service stability.", "experience.marcius": "Marcius Magazine — Software Engineer", "experience.marciusText": "Multi-branch ERP with .NET Core + PostgreSQL, integrating 3 marketplaces (Mercado Livre, B2W). Order and inventory flow automation. Selenium regression test suite enabling safer releases.",
    "skills.label": "Skills", "contact.label": "Contact", "contact.title": "Have an idea?<br /><em>Let's bring it to life.</em>", "contact.text": "If you want to talk about technology, a project or an opportunity, send me a message.", "contact.name": "Your name", "contact.email": "Your e-mail", "contact.message": "How can I help?", "contact.send": "Send message", "footer": "Made with intention and code."
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
