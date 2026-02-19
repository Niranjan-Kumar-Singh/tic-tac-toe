// Mobile menu toggle
const menuToggle =
  document.getElementById("menuToggle") ||
  document.querySelector(".menu-toggle");
const nav = document.getElementById("siteNav") || document.querySelector(".site-nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", function () {
    nav.classList.toggle("nav-open");
  });
}

// Create floating particles
function createParticles() {
  const container = document.getElementById("particles");
  if (!container) return;

  const count = 20;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    const size = Math.random() * 8 + 4 + "px";
    particle.style.width = size;
    particle.style.height = size;

    particle.style.left = Math.random() * 100 + "vw";
    particle.style.top = Math.random() * 100 + "vh";

    particle.style.opacity = Math.random() * 0.4 + 0.1;
    particle.style.animationDelay = Math.random() * 15 + "s";
    particle.style.animationDuration = Math.random() * 10 + 10 + "s";

    container.appendChild(particle);
  }
}

// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.querySelector(".site-header");
  if (!header) return;
  if (window.scrollY > 50) {
    header.style.background = "linear-gradient(to right, #1a1a1a, #333)";
    header.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.4)";
  } else {
    header.style.background = "";
    header.style.boxShadow = "";
  }
});

// Initialize particles on load
window.addEventListener("load", createParticles);

// Tech items hover effect
document.querySelectorAll(".tech-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px) scale(1.05)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", function (e) {
  const navElement = document.getElementById("siteNav") || document.querySelector(".site-nav");
  const toggleElement =
    document.getElementById("menuToggle") || document.querySelector(".menu-toggle");

  if (
    navElement &&
    toggleElement &&
    !navElement.contains(e.target) &&
    !toggleElement.contains(e.target)
  ) {
    navElement.classList.remove("nav-open");
  }
});

// Service Worker Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        // console.log('ServiceWorker registration successful');
      })
      .catch((err) => {
        // console.error('ServiceWorker registration failed: ', err);
      });
  });
}
