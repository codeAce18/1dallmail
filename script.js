// ===== GSAP ANIMATIONS & INTERACTIONS =====

// Import GSAP and plugins
// const gsap = window.gsap
const ScrollTrigger = window.gsap.ScrollTrigger
const TextPlugin = window.gsap.TextPlugin

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin)

// ===== CUSTOM CURSOR =====
const cursor = document.querySelector(".custom-cursor")
const cursorFollower = document.querySelector(".cursor-follower")

if (cursor && cursorFollower) {
  document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
    })

    gsap.to(cursorFollower, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3,
    })
  })

  // Cursor interactions
  document.querySelectorAll("a, button, .interactive").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(cursor, { scale: 1.5, duration: 0.3 })
      gsap.to(cursorFollower, { scale: 1.5, duration: 0.3 })
    })

    el.addEventListener("mouseleave", () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 })
      gsap.to(cursorFollower, { scale: 1, duration: 0.3 })
    })
  })
}

// ===== NAVIGATION =====
const navbar = document.getElementById("mainNav")

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          gsap.to(window, {
            duration: 0.8,
            scrollTo: target,
            ease: "power2.inOut",
          })
        }
      })
    })
  })
  

// ===== HERO ANIMATIONS =====
const heroTimeline = gsap.timeline()

// Hero badge animation
heroTimeline.from(".hero-badge", {
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
})

// Hero title animation with stagger
heroTimeline.from(
  ".title-line",
  {
    y: 100,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power3.out",
  },
  "-=0.5",
)

// Hero subtitle animation
heroTimeline.from(
  ".hero-subtitle",
  {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  },
  "-=0.8",
)

// Hero CTA buttons animation
// heroTimeline.from(
//   ".hero-cta .btn",
//   {
//     y: 50,
//     opacity: 0,
//     duration: 0.8,
//     stagger: 0.2,
//     ease: "power2.out",
//   },
//   "-=0.6",
// )

// Hero stats animation
heroTimeline.from(
  ".stat-item",
  {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.out",
  },
  "-=0.4",
)

// ===== HERO VISUAL ANIMATIONS =====
// Central node animations
gsap.set(".central-node", { scale: 0 })
gsap.to(".central-node", {
  scale: 1,
  duration: 1.5,
  ease: "elastic.out(1, 0.3)",
  delay: 1,
})

// Satellite nodes animation
gsap.from(".satellite-node", {
  scale: 0,
  rotation: 180,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "back.out(1.7)",
  delay: 1.5,
})

// Hologram UI panels animation
gsap.from(".ui-panel", {
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.3,
  ease: "power2.out",
  delay: 2,
})

// Continuous animations
gsap.to(".node-ring", {
  rotation: 360,
  duration: 10,
  repeat: -1,
  ease: "none",
})

gsap.to(".central-node", {
  y: -10,
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
})

// ===== SCROLL TRIGGERED ANIMATIONS =====

// Problem section animations
ScrollTrigger.create({
  trigger: ".problem-section",
  start: "top 80%",
  onEnter: () => {
    gsap.from(".problem-item", {
      x: -100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    })

    gsap.from(".chaos-network .connection.error", {
      scaleX: 0,
      duration: 1.5,
      stagger: 0.3,
      ease: "power2.out",
    })

    gsap.from(".domain-item.error", {
      scale: 0,
      rotation: 180,
      duration: 1,
      stagger: 0.2,
      ease: "back.out(1.7)",
    })
  },
})

// Innovation section animations with 3D integration
ScrollTrigger.create({
  trigger: ".innovation-section",
  start: "top 80%",
  onEnter: () => {
    gsap.from(".innovation-item", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    })

    // Trigger 3D scene initialization if not already done
    if (window.serverArchitecture3D) {
      gsap.from(".architecture-3d-container", {
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.5,
      })
    }
  },
})

// Comparison table animation
ScrollTrigger.create({
  trigger: ".comparison-section",
  start: "top 80%",
  onEnter: () => {
    gsap.from(".table-header", {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    })

    gsap.from(".table-row", {
      x: -100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.3,
    })
  },
})

// Benefits section animation
ScrollTrigger.create({
  trigger: ".benefits-section",
  start: "top 80%",
  onEnter: () => {
    gsap.from(".benefit-card", {
      y: 100,
      opacity: 0,
      rotation: 5,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
    })
  },
})

// Urgency section animation
ScrollTrigger.create({
  trigger: ".urgency-section",
  start: "top 80%",
  onEnter: () => {
    gsap.from(".urgency-badge", {
      scale: 0,
      rotation: 180,
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    })

    gsap.from(".urgency-title", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.3,
    })

    gsap.from(".counter-item", {
      scale: 0,
      rotation: 180,
      duration: 1,
      stagger: 0.2,
      ease: "elastic.out(1, 0.3)",
      delay: 0.6,
    })

    gsap.from(".feature-item", {
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      delay: 1,
    })
  },
})

// Contact section animation
ScrollTrigger.create({
  trigger: ".contact-section",
  start: "top 80%",
  onEnter: () => {
    gsap.from(".contact-form-wrapper", {
      scale: 0.9,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    })

    gsap.from(".form-group", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.5,
    })

    gsap.from(".form-actions .btn", {
      scale: 0,
      duration: 1,
      stagger: 0.2,
      ease: "elastic.out(1, 0.3)",
      delay: 1,
    })
  },
})

// ===== INTERACTIVE ELEMENTS =====

// Form interactions
document.querySelectorAll(".form-control").forEach((input) => {
  input.addEventListener("focus", function () {
    const formLine = this.nextElementSibling
    if (formLine && formLine.classList.contains("form-line")) {
      gsap.to(formLine, {
        width: "100%",
        duration: 0.3,
        ease: "power2.out",
      })
    }
  })

  input.addEventListener("blur", function () {
    if (!this.value) {
      const formLine = this.nextElementSibling
      if (formLine && formLine.classList.contains("form-line")) {
        gsap.to(formLine, {
          width: "0%",
          duration: 0.3,
          ease: "power2.out",
        })
      }
    }
  })
})

// Button hover effects
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("mouseenter", function () {
    gsap.to(this, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    })
  })

  btn.addEventListener("mouseleave", function () {
    gsap.to(this, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    })
  })
})

// Card hover effects
document.querySelectorAll(".innovation-item, .benefit-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    gsap.to(this, {
      y: -10,
      duration: 0.3,
      ease: "power2.out",
    })
  })

  card.addEventListener("mouseleave", function () {
    gsap.to(this, {
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    })
  })
})

// ===== PARALLAX EFFECTS =====
gsap.to(".floating-particles::before", {
  y: -100,
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom top",
    scrub: 1,
  },
})

gsap.to(".floating-particles::after", {
  y: -150,
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom top",
    scrub: 1,
  },
})

// ===== FORM SUBMISSION =====
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Show loading animation
    const submitBtn = this.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...'
    submitBtn.disabled = true

    // Simulate form submission
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Request Sent!'
      submitBtn.style.background = "linear-gradient(135deg, #00FF88, #00CC6A)"

      // Reset after 3 seconds
      setTimeout(() => {
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
        submitBtn.style.background = ""
        this.reset()
      }, 3000)
    }, 2000)
  })
}

// ===== PERFORMANCE OPTIMIZATIONS =====

// Lazy loading for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observe elements for lazy animation
document.querySelectorAll(".fade-in, .slide-left, .slide-right, .scale-in").forEach((el) => {
  observer.observe(el)
})

// ===== MOBILE OPTIMIZATIONS =====
if (window.innerWidth <= 768) {
  // Reduce animation complexity on mobile
  gsap.set(".floating-particles", { display: "none" })

  // Simplify hero animations
  gsap.set(".server-network", { scale: 0.8 })

  // Optimize scroll triggers for mobile
  ScrollTrigger.batch(".benefit-card", {
    onEnter: (elements) =>
      gsap.from(elements, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      }),
    start: "top 90%",
  })
}

// ===== ACCESSIBILITY =====
// Respect user's motion preferences
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.set("*", { animation: "none !important" })
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation")
  }
})

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-navigation")
})

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all animations
  gsap.from(".navbar", {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  })

  // Preload critical animations
  gsap.set(".hero-content > *", { opacity: 0, y: 50 })
  gsap.set(".hero-visual", { opacity: 0, scale: 0.8 })

  // Start hero animations after a brief delay
  setTimeout(() => {
    heroTimeline.play()

    gsap.to(".hero-visual", {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.5,
    })
  }, 500)
})

// ===== UTILITY FUNCTIONS =====
function animateCounter(element, target, duration = 2) {
  const obj = { value: 0 }
  gsap.to(obj, {
    value: target,
    duration: duration,
    ease: "power2.out",
    onUpdate: () => {
      element.textContent = Math.floor(obj.value)
    },
  })
}

function createParticles(container, count = 20) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: var(--accent-gold);
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.3};
        `

    container.appendChild(particle)

    gsap.set(particle, {
      x: Math.random() * container.offsetWidth,
      y: Math.random() * container.offsetHeight,
    })

    gsap.to(particle, {
      x: `+=${Math.random() * 200 - 100}`,
      y: `+=${Math.random() * 200 - 100}`,
      duration: Math.random() * 10 + 5,
      repeat: -1,
      yoyo: true,
      ease: "none",
    })
  }
}

// // Initialize particles for hero section
// const heroSection = document.querySelector(".hero-section")
// if (heroSection && window.innerWidth > 768) {
//   create
