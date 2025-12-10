/* ============================
   PRELOADER
============================ */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("hidden");
  }, 800);
});

/* ============================
   PLAY HERO VIDEO
============================ */
const heroVideo = document.getElementById("heroVideo");
if (heroVideo) {
  heroVideo.play().catch(() => {
    console.warn("Autoplay blocked. Video requires user interaction.");
  });
}

/* ============================
   THEME TOGGLE (LIGHT / DARK)
============================ */
const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  document.body.className = theme === "light" ? "light-theme" : "dark-theme";
  themeToggle.textContent = theme === "light" ? "☀️" : "🌙";
  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme") || "dark";
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("dark-theme")
    ? "light"
    : "dark";
  applyTheme(newTheme);
});

/* ============================
   MOBILE MENU
============================ */
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.getElementById("navLinks");

menuToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

/* ============================
   SCROLL TOP BUTTON
============================ */
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ============================
   ANIMATION ON SCROLL
============================ */
const animatedElements = document.querySelectorAll("[data-animate]");

function checkAnimations() {
  animatedElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", checkAnimations);
window.addEventListener("load", checkAnimations);

/* ============================
   PROPERTY FILTERS
============================ */
const cityFilter = document.getElementById("cityFilter");
const profileFilter = document.getElementById("profileFilter");
const propertyCards = document.querySelectorAll(".property-card");

function filterProperties() {
  const city = cityFilter.value;
  const profile = profileFilter.value;

  propertyCards.forEach((card) => {
    const matchCity = city === "all" || card.dataset.city === city;
    const matchProfile =
      profile === "all" || card.dataset.profile === profile;

    card.style.display = matchCity && matchProfile ? "block" : "none";
  });
}

cityFilter?.addEventListener("change", filterProperties);
profileFilter?.addEventListener("change", filterProperties);

/* ============================
   CONTACT FORM (DEMO MODE)
============================ */
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    formStatus.textContent = "Sending...";
    formStatus.style.color = "#38bdf8";

    setTimeout(() => {
      formStatus.textContent =
        "Thank you! We received your request. Our team will contact you within 24 hours.";
      formStatus.style.color = "#22c55e";

      contactForm.reset();
    }, 1200);
  });
}

/* ============================
   LANGUAGE SYSTEM
============================ */
const langButtons = document.querySelectorAll(".lang-btn");

let currentLang = localStorage.getItem("lang") || "en";
loadLanguage(currentLang);

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    langButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const lang = btn.dataset.lang;
    currentLang = lang;

    loadLanguage(lang);
    localStorage.setItem("lang", lang);
  });
});

function loadLanguage(lang) {
  fetch("assets/js/i18n.json")
    .then((res) => res.json())
    .then((data) => {
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.dataset.i18n;
        if (data[lang] && data[lang][key]) {
          el.textContent = data[lang][key];
        }
      });

      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    })
    .catch((err) => console.error("Language load error:", err));
}

/* ============================
   UPDATE YEAR IN FOOTER
============================ */
document.getElementById("year").textContent = new Date().getFullYear();
