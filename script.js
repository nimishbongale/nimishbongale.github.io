/* ── DOM Refs ── */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const revealElements = document.querySelectorAll(".reveal");
const statNumbers = document.querySelectorAll(".stat-number");
const yearNode = document.querySelector("#year");
const tiltCards = document.querySelectorAll(".tilt");

if (yearNode) yearNode.textContent = String(new Date().getFullYear());

/* ── Mobile Nav ── */
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const hasReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── Reveal on Scroll ── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
);

if (hasReducedMotion) {
  revealElements.forEach((el) => el.classList.add("revealed"));
} else {
  revealElements.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 40, 320)}ms`;
    revealObserver.observe(el);
  });
}

/* ── Counter Animation ── */
const animateCounter = (node) => {
  const target = Number(node.dataset.count);
  const suffix = node.dataset.suffix || "";
  if (!target) return;
  const duration = 1200;
  const start = performance.now();
  const frame = (time) => {
    const p = Math.min((time - start) / duration, 1);
    const eased = 1 - (1 - p) ** 3;
    node.textContent = `${Math.floor(eased * target)}${suffix}`;
    if (p < 1) requestAnimationFrame(frame);
    else node.textContent = `${target}${suffix}`;
  };
  requestAnimationFrame(frame);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { animateCounter(e.target); counterObserver.unobserve(e.target); }
    });
  },
  { threshold: 0.8 }
);
statNumbers.forEach((n) => counterObserver.observe(n));

/* ── 3D Tilt Cards ── */
if (!hasReducedMotion) {
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const b = card.getBoundingClientRect();
      const rx = ((e.clientY - b.top) / b.height - 0.5) * -6;
      const ry = ((e.clientX - b.left) / b.width - 0.5) * 8;
      card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-2px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });
}

/* ══════════════════════════════════════
   PARTICLE BACKGROUND
   ══════════════════════════════════════ */
(function initParticles() {
  if (hasReducedMotion) return;
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, particles = [], mouse = { x: -999, y: -999 };
  const PARTICLE_COUNT = 80;
  const CONNECTION_DIST = 140;
  const MOUSE_RADIUS = 120;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
    };
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(createParticle());
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      // Move
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      // Mouse repel
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS && dist > 0) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.02;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }

      // Dampen
      p.vx *= 0.999;
      p.vy *= 0.999;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
      ctx.fill();

      // Connections
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const cx = p.x - q.x;
        const cy = p.y - q.y;
        const cd = Math.sqrt(cx * cx + cy * cy);
        if (cd < CONNECTION_DIST) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - cd / CONNECTION_DIST)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener("mouseleave", () => { mouse.x = -999; mouse.y = -999; });

  init();
  draw();
})();

/* ══════════════════════════════════════
   SKILL BARS — Animate on scroll
   ══════════════════════════════════════ */
(function initSkillBars() {
  const fills = document.querySelectorAll(".skill-fill");
  if (!fills.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          fills.forEach((bar, i) => {
            const level = bar.dataset.level || 0;
            setTimeout(() => {
              bar.style.width = level + "%";
            }, i * 80);
          });
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  const container = document.querySelector(".skills-bars");
  if (container) obs.observe(container);
})();





