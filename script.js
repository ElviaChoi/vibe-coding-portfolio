// Smooth scrolling, animations, mobile nav
document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(
        (entry) => entry.isIntersecting && entry.target.classList.add("visible")
      );
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  const animatedSelectors = [
    ".hero-left",
    ".hero-right",
    ".services-left",
    ".services-right",
    ".skills-left",
    ".skills-right",
    ".testimonial-left",
    ".testimonial-right",
    ".contact-left",
    ".contact-right",
    ".skill-item",
    ".service-item",
    ".experience-item",
  ];
  animatedSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el, idx) => {
      if (selector.includes("-left")) el.classList.add("slide-in-left");
      else if (selector.includes("-right")) el.classList.add("slide-in-right");
      else el.classList.add("fade-in");
      if (selector.includes("item")) el.style.transitionDelay = `${idx * 0.1}s`;
      observer.observe(el);
    });
  });

  // Smooth anchor scroll only for internal links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href) return;
      if (href.startsWith("http")) return;
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = document.querySelector(".header").offsetHeight;
          window.scrollTo({
            top: target.offsetTop - headerHeight,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Ripple on .btn
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.className = "ripple";
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Header hide on scroll down
  let lastScrollTop = 0;
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    header.style.transform =
      y > lastScrollTop && y > 100 ? "translateY(-100%)" : "translateY(0)";
    lastScrollTop = y;
  });

  // Active nav link
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + 100;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((l) => l.classList.remove("active"));
        if (link) link.classList.add("active");
      }
    });
  });

  // Hover effects
  document.querySelectorAll(".service-item").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(15px)";
    });
    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)";
    });
  });
  document.querySelectorAll(".skill-item").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
    });
    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Testimonial controls click anim
  document.querySelectorAll(".control-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      this.style.transform = "scale(0.9)";
      setTimeout(() => {
        this.style.transform = "scale(1.1)";
        setTimeout(() => (this.style.transform = "scale(1)"), 150);
      }, 150);
    });
  });

  // Mobile menu toggle (created dynamically)
  const ensureMobileMenu = () => {
    const headerRow = document.querySelector(".header .container");
    const nav = document.querySelector(".nav");

    if (window.innerWidth <= 768) {
      if (!document.querySelector(".mobile-menu-toggle")) {
        const toggle = document.createElement("button");
        toggle.className = "mobile-menu-toggle";
        toggle.innerHTML = '<i class="fas fa-bars"></i>';
        headerRow.appendChild(toggle);

        const setNavTop = () => {
          const h = document.querySelector(".header").offsetHeight;
          nav.style.top = `${h}px`;
          nav.style.position = "fixed";
          nav.style.left = "0";
          nav.style.right = "0";
          nav.style.maxWidth = "100%";
        };

        toggle.addEventListener("click", function () {
          nav.classList.toggle("active");
          this.innerHTML = nav.classList.contains("active")
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
          setNavTop();
        });

        window.addEventListener("resize", setNavTop);
        setNavTop();
      }
    } else {
      const toggle = document.querySelector(".mobile-menu-toggle");
      if (toggle) toggle.remove();
      nav.classList.remove("active");
      nav.removeAttribute("style");
    }
  };

  ensureMobileMenu();
  window.addEventListener("resize", ensureMobileMenu);

  // Inline styles for ripple & nav active underline
  const style = document.createElement("style");
  style.textContent = `
    .ripple{position:absolute;border-radius:50%;background:rgba(255,255,255,.3);transform:scale(0);animation:ripple-animation .6s linear;pointer-events:none;}
    @keyframes ripple-animation{to{transform:scale(4);opacity:0;}}
    .nav-link.active{color:#8b5cf6 !important;font-weight:600;}
    .nav-link::after{content:'';position:absolute;bottom:-5px;left:0;width:0;height:2px;background:#8b5cf6;transition:width .3s ease;}
    .nav-link.active::after{width:100%;}
    .service-item,.skill-item,.cta-circle,.services-button,.control-btn{transition:all .3s ease;}
  `;
  document.head.appendChild(style);

  // Typing effect
  const heroTitle = document.querySelector(".hero-left h1");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i++);
        setTimeout(typeWriter, 50);
      }
    };
    setTimeout(typeWriter, 500);
  }

  // Parallax for profile cards
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll(".profile-card").forEach((card) => {
      card.style.transform = `translateY(${scrolled * -0.05}px)`;
    });
  });

  // Fade-in body after load
  window.addEventListener("load", () => {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity .5s ease";
    setTimeout(() => (document.body.style.opacity = "1"), 100);
  });

  console.log("Portfolio website loaded successfully! 🚀");
});
