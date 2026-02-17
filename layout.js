// Mobile menu toggle
document.getElementById("menuToggle").addEventListener("click", function () {
  const nav = document.getElementById("siteNav");
  nav.classList.toggle("nav-open");
});

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
  const nav = document.getElementById("siteNav");
  const toggle = document.getElementById("menuToggle");

  if (!nav.contains(e.target) && !toggle.contains(e.target)) {
    nav.classList.remove("nav-open");
  }
});
