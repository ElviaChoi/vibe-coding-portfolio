// Smooth scrolling and animations
document.addEventListener("DOMContentLoaded", function () {
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Add animation classes to elements
  const animatedElements = [
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

  animatedElements.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      if (selector.includes("-left")) {
        element.classList.add("slide-in-left");
      } else if (selector.includes("-right")) {
        element.classList.add("slide-in-right");
      } else {
        element.classList.add("fade-in");
      }

      // Stagger animation for items
      if (selector.includes("item")) {
        element.style.transitionDelay = `${index * 0.1}s`;
      }

      observer.observe(element);
    });
  });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      // 외부 링크인 경우 기본 동작 허용
      if (targetId.startsWith("http")) {
        return; // 기본 동작 허용 (새 탭에서 열림)
      }

      // 내부 앵커 링크인 경우에만 스크롤 동작 적용
      if (targetId.startsWith("#")) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = document.querySelector(".header").offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Button interactions
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Header scroll effect
  let lastScrollTop = 0;
  const header = document.querySelector(".header");

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      header.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });

  // Active navigation link highlighting
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", function () {
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (navLink) {
          navLink.classList.add("active");
        }
      }
    });
  });

  // Service item hover effects
  const serviceItems = document.querySelectorAll(".service-item");
  serviceItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(15px)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)";
    });
  });

  // Skill item hover effects
  const skillItems = document.querySelectorAll(".skill-item");
  skillItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Play button interaction
  const playButton = document.querySelector(".play-button");
  if (playButton) {
    playButton.addEventListener("click", function () {
      // Add click animation
      this.style.transform = "translate(-50%, -50%) scale(0.95)";
      setTimeout(() => {
        this.style.transform = "translate(-50%, -50%) scale(1.05)";
        setTimeout(() => {
          this.style.transform = "translate(-50%, -50%) scale(1)";
        }, 150);
      }, 150);
    });
  }

  // Services button interaction
  const servicesButton = document.querySelector(".services-button");
  if (servicesButton) {
    servicesButton.addEventListener("click", function () {
      // Add click animation
      this.style.transform = "translateX(20px) scale(1.05)";
      setTimeout(() => {
        this.style.transform = "translateX(10px) scale(1)";
      }, 200);
    });
  }

  // Contact CTA interaction
  const ctaCircle = document.querySelector(".cta-circle");
  if (ctaCircle) {
    ctaCircle.addEventListener("click", function () {
      // Add click animation
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1.05)";
        setTimeout(() => {
          this.style.transform = "scale(1)";
        }, 150);
      }, 150);
    });
  }

  // Testimonial controls
  const controlBtns = document.querySelectorAll(".control-btn");
  controlBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Add click animation
      this.style.transform = "scale(0.9)";
      setTimeout(() => {
        this.style.transform = "scale(1.1)";
        setTimeout(() => {
          this.style.transform = "scale(1)";
        }, 150);
      }, 150);
    });
  });

  // Mobile menu toggle
  const createMobileMenu = () => {
    const header = document.querySelector(".header .container");
    const nav = document.querySelector(".nav");

    if (window.innerWidth <= 768) {
      if (!document.querySelector(".mobile-menu-toggle")) {
        const toggle = document.createElement("button");
        toggle.className = "mobile-menu-toggle";
        toggle.innerHTML = '<i class="fas fa-bars"></i>';

        header.appendChild(toggle);

        toggle.addEventListener("click", function () {
          nav.classList.toggle("active");
          this.innerHTML = nav.classList.contains("active")
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
        });
      }
    } else {
      const toggle = document.querySelector(".mobile-menu-toggle");
      if (toggle) {
        toggle.remove();
      }
      nav.classList.remove("active");
    }
  };

  // Initialize mobile menu
  createMobileMenu();
  window.addEventListener("resize", createMobileMenu);

  // Add ripple effect CSS
  const style = document.createElement("style");
  style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .header {
            transition: transform 0.3s ease;
        }
        
        .nav-link.active {
            color: #8b5cf6 !important;
            font-weight: 600;
        }
        
        .nav-link {
            position: relative;
        }
        
        .nav-link::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: #8b5cf6;
            transition: width 0.3s ease;
        }
        
        .nav-link.active::after {
            width: 100%;
        }
        
        .service-item,
        .skill-item,
        .cta-circle,
        .services-button,
        .play-button,
        .control-btn {
            transition: all 0.3s ease;
        }
    `;
  document.head.appendChild(style);

  // Typing effect for hero title
  const heroTitle = document.querySelector(".hero-left h1");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };

    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
  }

  // Parallax effect for profile images
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const profileCards = document.querySelectorAll(
      ".profile-card, .profile-image"
    );

    profileCards.forEach((card) => {
      const rate = scrolled * -0.05;
      card.style.transform = `translateY(${rate}px)`;
    });
  });

  // Add loading animation
  window.addEventListener("load", function () {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s ease";

    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 100);
  });

  console.log("Portfolio website loaded successfully! 🚀");
});
