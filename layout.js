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

// Lazy load Google AdSense and other non-critical scripts on user interaction
function initNonCriticalScripts() {
  // Only run once
  if (window.nonCriticalScriptsInitialized) return;
  window.nonCriticalScriptsInitialized = true;

  // 1. Inject Google Funding Choices CMP Script
  const cmpScript1 = document.createElement('script');
  cmpScript1.async = true;
  cmpScript1.src = "https://fundingchoicesmessages.google.com/i/pub-4208665414964925?ers=1";
  cmpScript1.setAttribute("nonce", "YOUR_NONCE");
  document.head.appendChild(cmpScript1);

  const cmpScript2 = document.createElement('script');
  cmpScript2.setAttribute("nonce", "YOUR_NONCE");
  cmpScript2.textContent = `(function () { function signalGooglefcPresent() { if (!window.frames['googlefcPresent']) { if (document.body) { const iframe = document.createElement('iframe'); iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;'; iframe.style.display = 'none'; iframe.name = 'googlefcPresent'; document.body.appendChild(iframe); } else { setTimeout(signalGooglefcPresent, 0); } } } signalGooglefcPresent(); })();`;
  document.head.appendChild(cmpScript2);

  // 2. Inject Google AdSense Script
  const adsenseScript = document.createElement('script');
  adsenseScript.async = true;
  adsenseScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4208665414964925";
  adsenseScript.crossOrigin = "anonymous";
  document.head.appendChild(adsenseScript);

  // 3. Initialize Adsense push
  adsenseScript.onload = () => {
    const adsenseElements = document.querySelectorAll('.adsbygoogle');
    if (adsenseElements.length > 0) {
      try {
        (adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense initialization error:', e);
      }
    }
  };
}

// Attach event listeners to initialize scripts on first user interaction
['scroll', 'mousemove', 'touchstart', 'click', 'keydown'].forEach(eventType => {
  window.addEventListener(eventType, initNonCriticalScripts, { once: true, passive: true });
});
