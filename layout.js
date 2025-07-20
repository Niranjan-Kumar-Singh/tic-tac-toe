// Mobile menu toggle
document.getElementById("menuToggle").addEventListener("click", function () {
  const nav = document.getElementById("siteNav");
  nav.classList.toggle("nav-open");
});

// Create floating particles
function createParticles() {
  const container = document.getElementById("particles");
  const particleCount = window.innerWidth < 768 ? 20 : 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random position
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";

    // Random animation delay
    particle.style.animationDelay = Math.random() * 6 + "s";

    // Random size variation
    const size = Math.random() * 3 + 2;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    container.appendChild(particle);
  }
}

// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.querySelector(".site-header");
  if (window.scrollY > 50) {
    header.style.background = "rgba(255, 255, 255, 0.12)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.08)";
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
