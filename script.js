/* =========================================================
   ZERO — Icy Blue & Frost Bio Site — behavior
   ========================================================= */

(function () {
  "use strict";

  /* ---------- Theme toggle ---------- */

  var root = document.body;
  var toggleBtn = document.getElementById("theme-toggle");
  var STORAGE_KEY = "zero-theme";

  function applyTheme(theme) {
    if (theme === "dark") {
      root.classList.add("dark-mode");
    } else {
      root.classList.remove("dark-mode");
    }
  }

  function getPreferredTheme() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  applyTheme(getPreferredTheme());

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      var isDark = root.classList.contains("dark-mode");
      var next = isDark ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  /* ---------- Background video: seamless loop fix ---------- */

  var video = document.getElementById("bg-video");
  if (video) {
    video.addEventListener("timeupdate", function () {
      if (this.currentTime >= this.duration - 0.15) {
        this.currentTime = 0;
        this.play();
      }
    });

    video.addEventListener("error", function () {
      video.style.display = "none";
    });

    var source = video.querySelector("source");
    if (source) {
      source.addEventListener("error", function () {
        video.style.display = "none";
      });
    }
  }

  /* ---------- Footer year ---------- */

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Scroll reveal ---------- */

  var revealEls = document.querySelectorAll(".reveal-up");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  /* ---------- Frost particle background ---------- */

  var canvas = document.getElementById("frost-canvas");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var particles = [];
    var particleCount = window.innerWidth < 640 ? 40 : 80;
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function makeParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.2 + 0.6,
        speedY: Math.random() * 0.4 + 0.1,
        speedX: (Math.random() - 0.5) * 0.3,
        drift: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.5 + 0.2,
      };
    }

    function init() {
      resize();
      particles = [];
      for (var i = 0; i < particleCount; i++) {
        particles.push(makeParticle());
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var isDark = root.classList.contains("dark-mode");
      var dotColor = isDark ? "rgba(200, 240, 255, 1)" : "rgba(79, 172, 254, 1)";

      particles.forEach(function (p) {
        p.y += p.speedY;
        p.drift += 0.01;
        p.x += p.speedX + Math.sin(p.drift) * 0.15;

        if (p.y > canvas.height + 5) {
          p.y = -5;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 5) p.x = -5;
        if (p.x < -5) p.x = canvas.width + 5;

        ctx.beginPath();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = dotColor;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      if (!reducedMotion) {
        requestAnimationFrame(draw);
      }
    }

    window.addEventListener("resize", init);
    init();
    draw();
  }
})();
