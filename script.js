const translations = {
  en: {
    "nav.about": "About", "nav.projects": "Projects", "nav.notes": "Notes", "nav.experience": "Experience", "nav.contact": "Contact",
    "hero.eyebrow": "Available for good connections", "hero.title": "Technology, projects and ideas <em>in motion.</em>",
    "hero.text": "I am Deivid Afonso, a Senior Backend Engineer specialized in .NET, C# and AWS. I build robust systems and solutions that help people.",
    "hero.cta": "Let's talk", "hero.meta": "7+ years building software", "about.label": "About me",
    "about.title": "Engineering with purpose,<br /><em>people at the center.</em>", "about.lead": "Software engineering with technical depth and attention to the impact every solution creates.",
    "about.body": "I build high-performance corporate systems with C#/.NET, REST APIs, messaging, caching, relational databases and AWS. I also integrate AI tools into the development cycle to accelerate delivery and eliminate manual work. As an autistic person with ADHD, I bring a neurodivergent perspective to create with more empathy, clarity and intention.",
    "projects.label": "Featured projects", "projects.title": "Ideas that became<br /><em>code and shape.</em>", "projects.all": "See all on GitHub ↗",
    "projects.console": "Full stack project exploring Web API, Angular and Entity Framework Core.", "projects.events": "Full stack application built with ASP.NET Core for event management.", "projects.git": "A project dedicated to sharing practical knowledge about Git.",
    "notes.label": "Workbench notes", "notes.title": "What I am<br /><em>investigating.</em>", "notes.aside": "Short learnings, real decisions.", "notes.one.title": "When a queue solves more than a retry", "notes.one.text": "Not every integration problem is solved by increasing the timeout. Some answers appear when we accept time.", "notes.two.title": "The database usually tells only part of the story", "notes.two.text": "Queries, indexes and logs are clues. The work is tracing the full path until the user feels the difference.", "notes.three.title": "Using AI without outsourcing your thinking", "notes.three.text": "Copilots speed up typing. Responsibility for the decision, context and code is still ours.",
    "experience.label": "Experience", "experience.title": "Learn, build,<br /><em>evolve.</em>", "experience.basis": "Basis Tecnologia — Software Engineer", "experience.basisText": "Corporate systems evolution in C#/.NET, SQL Server/Oracle query and procedure tuning, and GitHub Copilot-assisted reviews.", "experience.g4f": "G4F — Backend Engineer", "experience.g4fText": "Production routine optimization, root cause analysis, MTTR reduction and Clean Code/SOLID in code reviews.", "experience.gov": "GovBr — Software Engineer", "experience.govText": "VB.NET/C# module development for a high-impact municipal system, integrating SQL Server and Java APIs.", "experience.marcius": "Marcius Magazine — Software Engineer", "experience.marciusText": "ERP modules with .NET Core and PostgreSQL, marketplace integrations and regression testing with Selenium.",
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
  document.title = english ? "Deivid Afonso | Technology, projects and ideas" : "Deivid Afonso | Tecnologia, projetos e ideias";
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

const themeButton = document.querySelector("[data-action='theme']");
const fontDecreaseButton = document.querySelector("[data-action='font-decrease']");
const fontIncreaseButton = document.querySelector("[data-action='font-increase']");
const savedTheme = localStorage.getItem("theme");
const savedFontScale = Number(localStorage.getItem("fontScale") || "1");

const updateAccessibilityButton = (button, active, activeLabel, inactiveLabel) => {
  button.setAttribute("aria-pressed", String(active));
  button.setAttribute("aria-label", active ? activeLabel : inactiveLabel);
};

const setTheme = (light) => {
  document.documentElement.dataset.theme = light ? "light" : "dark";
  localStorage.setItem("theme", light ? "light" : "dark");
  themeButton.dataset.theme = light ? "light" : "dark";
  updateAccessibilityButton(themeButton, light, "Ativar tema escuro", "Ativar tema claro");
};

const setFontScale = (scale) => {
  const boundedScale = Math.min(1.2, Math.max(0.9, scale));
  const scaleName = boundedScale > 1 ? "large" : boundedScale < 1 ? "small" : "normal";
  document.documentElement.dataset.fontScale = scaleName;
  document.documentElement.style.setProperty("--font-scale", String(boundedScale));
  localStorage.setItem("fontScale", String(boundedScale));
  fontDecreaseButton.disabled = boundedScale <= 0.9;
  fontIncreaseButton.disabled = boundedScale >= 1.2;
};

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
if (savedTheme) {
  setTheme(savedTheme === "light");
} else {
  setTheme(!prefersDark.matches);
}
prefersDark.addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) setTheme(!e.matches);
});

setFontScale(Number.isFinite(savedFontScale) ? savedFontScale : 1);
themeButton.addEventListener("click", () => setTheme(document.documentElement.dataset.theme !== "light"));
fontDecreaseButton.addEventListener("click", () => setFontScale(Number(document.documentElement.style.getPropertyValue("--font-scale")) - 0.1));
fontIncreaseButton.addEventListener("click", () => setFontScale(Number(document.documentElement.style.getPropertyValue("--font-scale")) + 0.1));

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
  fetch(form.action, { method: "POST", body: formData, headers: { Accept: "application/json" } })
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
