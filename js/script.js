"use strict";

class UltimateCorporate {
  constructor() {
    this.particles = [];
    this.isAnimating = false;
    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.setupCorporateParticles();
    this.setupSubtleEffects();
    this.setupScrollEffects();
    this.setupStatCounters();
    this.setupRevealAnimations();
    this.setupProfessionalInteractions();
    this.setupProtectedEmails();
    this.setupFloatingContact();
    this.setupContactForm();
    this.startCorporateAnimations();
  }

  setupMobileMenu() {
    const toggle = document.getElementById("mobileMenuToggle");
    const nav = document.getElementById("corporateNav");

    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        nav.classList.toggle("active");
        toggle.textContent = nav.classList.contains("active") ? "✕" : "☰";

        if (nav.classList.contains("active")) {
          this.animateMobileMenuItems();
        }
      });

      nav.querySelectorAll("a:not(.dropdown-toggle)").forEach((link) => {
        link.addEventListener("click", () => {
          nav.classList.remove("active");
          toggle.textContent = "☰";
        });
      });

      this.setupDropdownMenus();
    }
  }

  setupDropdownMenus() {
    const dropdowns = document.querySelectorAll(".nav-dropdown");

    dropdowns.forEach((dropdown) => {
      const toggle = dropdown.querySelector(".dropdown-toggle");
      const menu = dropdown.querySelector(".dropdown-menu");

      const handleDropdownClick = (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          menu.classList.toggle("show");
        }
      };

      toggle.addEventListener("click", handleDropdownClick);

      menu.querySelectorAll(".dropdown-item").forEach((item) => {
        item.addEventListener("click", () => {
          const nav = document.getElementById("corporateNav");
          const toggle = document.getElementById("mobileMenuToggle");

          if (nav.classList.contains("active")) {
            nav.classList.remove("active");
            toggle.textContent = "☰";
          }
        });
      });
    });

    const handleResize = () => {
      dropdowns.forEach((dropdown) => {
        const menu = dropdown.querySelector(".dropdown-menu");
        if (window.innerWidth > 768) {
          menu.classList.remove("show");
        }
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();
  }

  animateMobileMenuItems() {
    const menuItems = document.querySelectorAll(".corporate-nav > li");
    menuItems.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(-10px)";
      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
        item.style.transition = "all 0.3s ease";
      }, index * 100);
    });
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          this.smoothScrollTo(target);
        }
      });
    });
  }

  smoothScrollTo(target) {
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset - 100;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = this.easeInOutCubic(
        timeElapsed,
        startPosition,
        distance,
        1000,
      );
      window.scrollTo(0, run);
      if (timeElapsed < 1000) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  }

  easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  }

  setupCorporateParticles() {
    const container = document.getElementById("corporateParticles");
    if (!container) return;

    for (let i = 0; i < 8; i++) {
      this.createCorporateParticle(container);
    }

    this.animateCorporateParticles();
  }

  createCorporateParticle(container) {
    const particle = document.createElement("div");
    particle.className = "corporate-particle";

    const size = Math.random() * 60 + 30;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const opacity = Math.random() * 0.08 + 0.02;

    particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(61, 133, 198, ${opacity}) 0%, transparent 60%);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            filter: blur(1px);
            z-index: 1;
        `;

    container.appendChild(particle);

    this.particles.push({
      element: particle,
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: size,
      opacity: opacity,
      pulse: Math.random() * Math.PI * 2,
    });
  }

  animateCorporateParticles() {
    this.particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.pulse += 0.008;

      if (particle.x <= 0 || particle.x >= window.innerWidth - particle.size)
        particle.vx *= -1;
      if (particle.y <= 0 || particle.y >= window.innerHeight - particle.size)
        particle.vy *= -1;

      const pulseOpacity = particle.opacity + Math.sin(particle.pulse) * 0.01;

      particle.element.style.left = particle.x + "px";
      particle.element.style.top = particle.y + "px";
      particle.element.style.background = `radial-gradient(circle, rgba(61, 133, 198, ${pulseOpacity}) 0%, transparent 60%)`;
    });

    requestAnimationFrame(() => this.animateCorporateParticles());
  }

  setupSubtleEffects() {
    this.createDataStream();
    this.setupProfessionalHovers();
  }

  createDataStream() {
    const stream = document.getElementById("dataStream");
    if (!stream) return;

    setInterval(() => {
      const dot = document.createElement("div");
      dot.style.cssText = `
                position: absolute;
                width: 2px;
                height: 8px;
                background: rgba(61, 133, 198, 0.4);
                top: -10px;
                left: 50%;
                border-radius: 1px;
                animation: data-dot-flow 3s linear forwards;
            `;

      stream.appendChild(dot);
      setTimeout(() => dot.remove(), 3000);
    }, 300);
  }

  setupProfessionalHovers() {
    const logo = document.getElementById("corporateLogo");
    if (logo) {
      logo.addEventListener("click", () => {
        this.animateLogo();
      });
    }

    document.querySelectorAll(".corporate-button").forEach((button) => {
      button.addEventListener("mouseenter", () => {
        this.activateButtonGlow(button);
      });

      button.addEventListener("mouseleave", () => {
        this.deactivateButtonGlow(button);
      });

      button.addEventListener("click", (e) => {
        this.createClickEffect(e);
      });
    });
  }

  animateLogo() {
    const logo = document.getElementById("corporateLogo");
    const logoSvg = logo.querySelector(".logo-svg");
    const logoAccent = logo.querySelector(".logo-accent");

    logoAccent.style.opacity = "1";
    logoAccent.style.animation = "logo-glow-pulse 1s ease-out";

    logoSvg.style.animation = "logo-bounce 0.6s ease-out";

    setTimeout(() => {
      logoAccent.style.opacity = "0";
      logoSvg.style.animation = "";
    }, 1200);
  }

  activateButtonGlow(button) {
    const glow = button.querySelector(".button-effect");
    if (glow) {
      glow.style.opacity = "0.3";
      glow.style.animation = "glow-pulse 0.6s ease-out";
    }
  }

  deactivateButtonGlow(button) {
    const glow = button.querySelector(".button-effect");
    if (glow) {
      glow.style.opacity = "0";
    }
  }

  createClickEffect(e) {
    const ripple = document.createElement("div");
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripple.style.cssText = `
            position: absolute;
            width: 0;
            height: 0;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(91, 160, 242, 0.6) 0%, transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: click-ripple 0.6s ease-out forwards;
            pointer-events: none;
            z-index: 10;
        `;

    e.currentTarget.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  setupScrollEffects() {
    const header = document.getElementById("header");
    let lastScrollTop = 0;

    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }

      if (scrollTop > lastScrollTop && scrollTop > 200) {
        header.style.transform = "translateY(-100%)";
      } else {
        header.style.transform = "translateY(0)";
      }

      lastScrollTop = scrollTop;

      this.updateScrollBasedAnimations(scrollTop);
    });
  }

  updateScrollBasedAnimations(scrollTop) {
    const depthLayers = document.querySelector(".depth-layers");
    if (depthLayers) {
      const translateY = scrollTop * 0.05;
      depthLayers.style.transform = `translate(0, ${translateY}px)`;
    }

    const grid = document.querySelector(".subtle-grid");
    if (grid) {
      const opacity = 0.4 + (scrollTop / window.innerHeight) * 0.3;
      grid.style.opacity = Math.min(opacity, 0.7);
    }
  }

  setupStatCounters() {
    const counters = document.querySelectorAll(".stat-number");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute("data-target"));
    const duration = 2000;
    const start = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      const current = Math.floor(target * this.easeOutCubic(progress));
      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }

  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  setupRevealAnimations() {
    const revealElements = document.querySelectorAll(
      ".vision-card, .intelligence-card, .result-explanation, .solution-card, .service-card, .arch-content, .contact-info",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
              this.createRevealGlow(entry.target);
            }, index * 150);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    revealElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      observer.observe(el);
    });
  }

  createRevealGlow(element) {
    const glow = document.createElement("div");
    glow.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, transparent 30%, rgba(61, 133, 198, 0.1) 50%, transparent 70%);
            background-size: 200% 200%;
            opacity: 0;
            border-radius: inherit;
            z-index: -1;
            animation: reveal-glow 1s ease-out forwards;
        `;

    element.style.position = "relative";
    element.appendChild(glow);
    setTimeout(() => glow.remove(), 1000);
  }

  setupProfessionalInteractions() {
    document
      .querySelectorAll(
        ".vision-card, .intelligence-card, .solution-card, .service-card",
      )
      .forEach((card) => {
        card.addEventListener("mouseenter", () => {
          this.activateCardEffects(card);
        });

        card.addEventListener("mouseleave", () => {
          this.deactivateCardEffects(card);
        });
      });

    document.querySelectorAll(".intelligence-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        this.highlightIntelligenceComparison(card);
      });

      card.addEventListener("mouseleave", () => {
        this.resetIntelligenceComparison();
      });
    });

    document.querySelectorAll(".architecture-item").forEach((item) => {
      item.addEventListener("mouseenter", () => {
        this.highlightTimelineItem(item);
      });

      item.addEventListener("mouseleave", () => {
        this.resetTimelineItem(item);
      });
    });
  }

  setupProtectedEmails() {
    const protectedLinks = document.querySelectorAll(".protected-email");

    protectedLinks.forEach((link) => {
      const user = link.dataset.emailUser;
      const domain = link.dataset.emailDomain;

      if (!user || !domain) {
        return;
      }

      const revealEmail = () => {
        const email = `${user}@${domain}`;
        link.textContent = email;
        link.setAttribute("href", `mailto:${email}`);
        link.classList.add("revealed");
        link.removeAttribute("role");
        link.removeAttribute("tabindex");
      };

      const handleClick = (event) => {
        if (!link.classList.contains("revealed")) {
          event.preventDefault();
          revealEmail();
        }
      };

      const handleKeydown = (event) => {
        if (
          !link.classList.contains("revealed") &&
          (event.key === "Enter" || event.key === " ")
        ) {
          event.preventDefault();
          revealEmail();
        }
      };

      link.setAttribute("role", "button");
      link.setAttribute("tabindex", "0");
      link.addEventListener("click", handleClick);
      link.addEventListener("keydown", handleKeydown);
    });
  }

  activateCardEffects(card) {
    const accentBorder = card.querySelector(
      ".card-accent-border, .card-accent-line",
    );
    if (accentBorder) {
      accentBorder.style.opacity = "1";
    }

    this.createFloatingSymbols(card);
  }

  deactivateCardEffects(card) {
    const accentBorder = card.querySelector(
      ".card-accent-border, .card-accent-line",
    );
    if (accentBorder) {
      accentBorder.style.opacity = "0";
    }

    card.querySelectorAll(".floating-symbol").forEach((symbol) => {
      symbol.remove();
    });
  }

  createFloatingSymbols(card) {
    const symbols = ["∆", "∇", "◎", "◈", "▲", "■", "◇", "○"];

    for (let i = 0; i < 2; i++) {
      const symbol = document.createElement("div");
      symbol.className = "floating-symbol";
      symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];

      symbol.style.cssText = `
                position: absolute;
                font-size: 1rem;
                color: rgba(61, 133, 198, 0.6);
                left: ${Math.random() * 80 + 10}%;
                top: ${Math.random() * 80 + 10}%;
                opacity: 0;
                animation: symbol-float 2s ease-in-out infinite;
                animation-delay: ${i * 0.3}s;
                z-index: 5;
                pointer-events: none;
                font-family: 'Times New Roman', serif;
            `;

      card.appendChild(symbol);
    }
  }

  highlightTimelineItem(item) {
    const marker = item.querySelector(".arch-marker");
    const markerGlow = item.querySelector(".marker-glow");

    if (marker) {
      marker.style.transform = "scale(1.1)";
    }

    if (markerGlow) {
      markerGlow.style.opacity = "0.4";
      markerGlow.style.animation = "marker-pulse 1s ease-in-out";
    }
  }

  resetTimelineItem(item) {
    const marker = item.querySelector(".arch-marker");
    const markerGlow = item.querySelector(".marker-glow");

    if (marker) {
      marker.style.transform = "scale(1)";
    }

    if (markerGlow) {
      markerGlow.style.opacity = "0";
    }
  }

  highlightIntelligenceComparison(activeCard) {
    document.querySelectorAll(".intelligence-card").forEach((card) => {
      if (card !== activeCard) {
        card.style.opacity = "0.7";
        card.style.filter = "blur(1px)";
      }
    });

    const connector = document.querySelector(".synthesis-connector");
    if (connector) {
      const connectorCircle = connector.querySelector(".connector-circle");
      const synthesisFlow = connector.querySelector(".synthesis-flow");

      if (connectorCircle) {
        connectorCircle.style.transform = "scale(1.1)";
        connectorCircle.style.boxShadow = "0 0 30px rgba(61, 133, 198, 0.6)";
      }

      if (synthesisFlow) {
        synthesisFlow.style.borderColor = "rgba(61, 133, 198, 0.4)";
        synthesisFlow.style.animationDuration = "10s";
      }
    }
  }

  resetIntelligenceComparison() {
    document.querySelectorAll(".intelligence-card").forEach((card) => {
      card.style.opacity = "1";
      card.style.filter = "none";
    });

    const connector = document.querySelector(".synthesis-connector");
    if (connector) {
      const connectorCircle = connector.querySelector(".connector-circle");
      const synthesisFlow = connector.querySelector(".synthesis-flow");

      if (connectorCircle) {
        connectorCircle.style.transform = "scale(1)";
        connectorCircle.style.boxShadow = "0 0 20px rgba(61, 133, 198, 0.2)";
      }

      if (synthesisFlow) {
        synthesisFlow.style.borderColor = "rgba(61, 133, 198, 0.2)";
        synthesisFlow.style.animationDuration = "20s";
      }
    }
  }

  setupFloatingContact() {
    const floatingContact = document.getElementById("floatingContact");
    if (!floatingContact) return;

    floatingContact.style.opacity = "0";
    floatingContact.style.transform = "translateY(100px)";

    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset;
      const contactSection = document.getElementById("contact");

      if (scrollTop > 300 && contactSection) {
        const contactTop =
          contactSection.getBoundingClientRect().top + window.pageYOffset;
        const windowBottom = window.pageYOffset + window.innerHeight;

        if (windowBottom > contactTop - 100) {
          floatingContact.style.opacity = "0";
          floatingContact.style.transform = "translateY(100px)";
        } else {
          floatingContact.style.opacity = "1";
          floatingContact.style.transform = "translateY(0)";
        }
      } else {
        floatingContact.style.opacity = "0";
        floatingContact.style.transform = "translateY(100px)";
      }
    });

    floatingContact.addEventListener("click", () => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        this.smoothScrollTo(contactSection);
      }
    });
  }

  setupContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const initialConsent = localStorage.getItem("cookieConsent");
    this.updateContactFormConsent(initialConsent);

    window.addEventListener("cookieConsentChanged", (event) => {
      const status =
        event.detail && event.detail.status ? event.detail.status : null;
      this.updateContactFormConsent(status);
    });

    const formGroups = form.querySelectorAll(".form-group");
    formGroups.forEach((group) => {
      const input = group.querySelector("input, textarea");
      const label = group.querySelector("label");
      const underline = group.querySelector(".form-underline");

      if (input && label) {
        input.addEventListener("input", () => {
          if (input.value.trim()) {
            label.style.transform = "translateY(-25px) scale(0.8)";
            label.style.color = "var(--primary-blue)";
          } else {
            label.style.transform = "translateY(0) scale(1)";
            label.style.color = "var(--text-muted)";
          }
        });

        input.addEventListener("focus", () => {
          if (underline) {
            underline.style.width = "100%";
          }
          this.createInputGlow(group);
        });

        input.addEventListener("blur", () => {
          if (underline && !input.value.trim()) {
            underline.style.width = "0";
          }
        });
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleFormSubmission(form);
    });
  }

  updateContactFormConsent(status) {
    const consentState =
      status === "accepted"
        ? "granted"
        : status === "declined"
          ? "denied"
          : "pending";
    const formEnabled = consentState !== "denied";

    this.toggleContactFormAvailability(formEnabled);
    this.updateContactConsentNote(consentState);
  }

  toggleContactFormAvailability(isEnabled) {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.disabled = !isEnabled;
      if (!isEnabled) {
        input.value = "";
        input.dispatchEvent(new Event("input"));
      }
    });

    const submitBtn = form.querySelector(".form-submit");
    if (submitBtn) {
      submitBtn.disabled = !isEnabled;
      submitBtn.style.opacity = isEnabled ? "1" : "";
      const buttonText = submitBtn.querySelector(".button-text");
      if (buttonText) {
        buttonText.textContent = "Start the Conversation →";
      }
      if (!isEnabled) {
        const loader = submitBtn.querySelector(".form-loader");
        if (loader) {
          loader.remove();
        }
      }
    }

    const recaptchaContainer = form.querySelector(".recaptcha-container");
    if (recaptchaContainer) {
      recaptchaContainer.style.display = isEnabled ? "" : "none";
    }

    form.classList.toggle("contact-form--disabled", !isEnabled);

    if (!isEnabled && typeof grecaptcha !== "undefined") {
      grecaptcha.reset();
    }
  }

  updateContactConsentNote(state) {
    const note = document.getElementById("contactConsentNote");
    if (!note) return;

    const consentStates = ["pending", "granted", "denied"];
    consentStates.forEach((consentState) => {
      note
        .querySelectorAll(`[data-consent-state="${consentState}"]`)
        .forEach((element) => {
          const isActive = consentState === state;
          element.hidden = !isActive;
          element.setAttribute("aria-hidden", isActive ? "false" : "true");
        });
    });
  }

  createInputGlow(formGroup) {
    const existingGlow = formGroup.querySelector(".input-glow");
    if (existingGlow) existingGlow.remove();

    const glow = document.createElement("div");
    glow.className = "input-glow";
    glow.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent 0%, rgba(61, 133, 198, 0.1) 50%, transparent 100%);
            background-size: 200% 100%;
            opacity: 0;
            animation: input-glow-sweep 0.6s ease-out forwards;
            pointer-events: none;
            z-index: 1;
        `;

    formGroup.appendChild(glow);
    setTimeout(() => glow.remove(), 600);
  }

  handleFormSubmission(form) {
    if (form.classList.contains("contact-form--disabled")) {
      this.showNotification(
        "The contact form is disabled. Please use the email link below.",
        "error",
      );
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const validationResult = this.validateFormData(data);
    if (!validationResult.isValid) {
      this.showFormError(form, validationResult.message);
      return;
    }

    this.showFormLoading(form);

    this.sendEmailJS(data, form);
  }

  validateFormData(data) {
    const required = ["firstName", "lastName", "email", "message"];
    for (const field of required) {
      if (!data[field] || !data[field].trim()) {
        return {
          isValid: false,
          message: "Please fill in all required fields.",
        };
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        isValid: false,
        message: "Please enter a valid email address.",
      };
    }

    if (typeof grecaptcha !== "undefined") {
      const recaptchaResponse = grecaptcha.getResponse();
      if (!recaptchaResponse) {
        return {
          isValid: false,
          message: "Please confirm that you are not a robot.",
        };
      }
    }

    return {
      isValid: true,
      message: "",
    };
  }

  sendEmailJS(data, form) {
    const serviceID = "service_g6z82zq";
    const templateID = "template_55get2t";
    const publicKey = "gGTxcUndpi8JpaQ1Z";

    emailjs.init(publicKey);

    const recaptchaToken = grecaptcha.getResponse();

    const templateParams = {
      from_name: `${data.firstName} ${data.lastName}`,
      from_email: data.email,
      company: data.company || "n.a",
      message: data.message,
      subject: `Logicl.ai | Contact Request from ${data.firstName} ${data.lastName}`,
      reply_to: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      "g-recaptcha-response": recaptchaToken,
    };

    emailjs
      .send(serviceID, templateID, templateParams)
      .then(() => {
        this.showFormSuccess(form);
        form.reset();

        form.querySelectorAll("label").forEach((label) => {
          label.style.transform = "translateY(0) scale(1)";
          label.style.color = "var(--text-muted)";
        });

        form.querySelectorAll(".form-underline").forEach((underline) => {
          underline.style.width = "0";
        });

        if (typeof grecaptcha !== "undefined") {
          grecaptcha.reset();
        }
      })
      .catch((error) => {
        let errorMessage = "Message could not be sent. ";

        if (error.status === 422) {
          errorMessage += "reCAPTCHA verification failed.";
        } else if (error.status === 400) {
          errorMessage += "Invalid template parameters.";
        } else if (error.status === 401) {
          errorMessage += "EmailJS authentication failed.";
        } else {
          errorMessage += "Please try again or contact us directly.";
        }

        this.showFormError(form, errorMessage);
        this.fallbackToMailto(data);
      });
  }

  fallbackToMailto(data) {
    const subject = encodeURIComponent(
      "LogicLAI Inquiry from " + (data.firstName + " " + data.lastName).trim(),
    );
    const body = encodeURIComponent(
      `Hello,\n\n` +
        `I am interested in your AI-Solver solutions.\n\n` +
        `Name: ${data.firstName} ${data.lastName}\n` +
        `Email: ${data.email}\n` +
        `Company: ${data.company || "Not specified"}\n\n` +
        `Message:\n${data.message}\n\n` +
        `Best regards\n${data.firstName} ${data.lastName}`,
    );

    const mailtoLink = `mailto:michael@logicl.ai?subject=${subject}&body=${body}`;
    setTimeout(() => {
      window.location.href = mailtoLink;
    }, 1000);
  }

  showFormLoading(form) {
    const submitBtn = form.querySelector(".form-submit");
    const buttonText = submitBtn.querySelector(".button-text");

    buttonText.textContent = "Sending...";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";

    // Add loading animation
    const loader = document.createElement("div");
    loader.className = "form-loader";
    loader.style.cssText = `
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 1s ease-in-out infinite;
            margin-left: 8px;
        `;

    buttonText.appendChild(loader);
  }

  showFormError(form, message) {
    const submitBtn = form.querySelector(".form-submit");
    const buttonText = submitBtn.querySelector(".button-text");

    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
    const loader = submitBtn.querySelector(".form-loader");
    if (loader) loader.remove();

    buttonText.textContent = "Error sending";
    submitBtn.style.background = "linear-gradient(135deg, #f44336, #d32f2f)";

    this.showNotification(message, "error");

    setTimeout(() => {
      buttonText.textContent = "Discuss Project";
      submitBtn.style.background = "";
    }, 3000);
  }

  showFormSuccess(form) {
    const submitBtn = form.querySelector(".form-submit");
    const buttonText = submitBtn.querySelector(".button-text");

    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
    const loader = submitBtn.querySelector(".form-loader");
    if (loader) loader.remove();

    buttonText.textContent = "Successfully sent!";
    submitBtn.style.background = "linear-gradient(135deg, #4caf50, #45a049)";

    this.showNotification(
      "Your message was successfully sent. We will get back to you soon!",
      "success",
    );

    setTimeout(() => {
      buttonText.textContent = "Discuss Project";
      submitBtn.style.background = "";
    }, 3000);
  }

  showNotification(message, type = "info") {
    const existingNotifications =
      document.querySelectorAll(".form-notification");
    existingNotifications.forEach((n) => n.remove());

    const notification = document.createElement("div");
    notification.className = "form-notification";

    const bgColor =
      type === "success" ? "#4caf50" : type === "error" ? "#f44336" : "#2196f3";

    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            max-width: 400px;
            font-size: 14px;
            line-height: 1.4;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    }, 5000);

    notification.addEventListener("click", () => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    });
  }

  startCorporateAnimations() {
    this.animateDataFlow();
  }

  animateDataFlow() {
    setInterval(() => {
      const depthLayers = document.querySelector(".depth-layers");
      if (depthLayers) {
        const randomX = Math.sin(Date.now() * 0.0008) * 3;
        const randomY = Math.cos(Date.now() * 0.0008) * 2;
        depthLayers.style.transform = `translate(${randomX}px, ${randomY}px)`;
      }
    }, 100);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new UltimateCorporate();
  setupLegalPages();
  setupCookieBanner();
});

function setupCookieBanner() {
  const cookieBanner = document.getElementById("cookieBanner");
  const acceptBtn = document.getElementById("acceptCookies");
  const declineBtn = document.getElementById("declineCookies");

  const cookieConsent = localStorage.getItem("cookieConsent");

  if (!cookieConsent) {
    setTimeout(() => {
      cookieBanner.style.display = "block";
      cookieBanner.style.animation = "slideUpFade 0.5s ease forwards";
    }, 2000);
  }

  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "accepted");
    localStorage.setItem("cookieConsentDate", new Date().toISOString());
    window.dispatchEvent(
      new CustomEvent("cookieConsentChanged", {
        detail: { status: "accepted" },
      }),
    );
    hideCookieBanner();
  });

  declineBtn.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "declined");
    localStorage.setItem("cookieConsentDate", new Date().toISOString());
    window.dispatchEvent(
      new CustomEvent("cookieConsentChanged", {
        detail: { status: "declined" },
      }),
    );
    hideCookieBanner();
  });

  function hideCookieBanner() {
    cookieBanner.style.animation = "slideDownFade 0.5s ease forwards";
    setTimeout(() => {
      cookieBanner.style.display = "none";
    }, 500);
  }
}

function setupLegalPages() {
  const legalLinks = document.querySelectorAll(
    'a[href^="#privacy"], a[href^="#imprint"]',
  );

  legalLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const pageId = link.getAttribute("href").substring(1);
      showLegalPage(pageId);
    });
  });
}

function showLegalPage(pageId) {
  const legalPage = document.getElementById(pageId);
  if (legalPage) {
    legalPage.style.display = "block";
    document.body.style.overflow = "hidden";

    legalPage.addEventListener("click", (e) => {
      if (e.target === legalPage) {
        closeLegalPage();
      }
    });

    document.addEventListener("keydown", handleEscapeKey);
  }
}

function closeLegalPage() {
  const legalPages = document.querySelectorAll(".legal-page");
  legalPages.forEach((page) => {
    page.style.display = "none";
  });
  document.body.style.overflow = "auto";
  document.removeEventListener("keydown", handleEscapeKey);
}

function handleEscapeKey(e) {
  if (e.key === "Escape") {
    closeLegalPage();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const styles = `
        <style>
            @keyframes reveal-glow {
                0% { 
                    opacity: 0; 
                    background-position: -200% center; 
                }
                50% { 
                    opacity: 1; 
                    background-position: center center; 
                }
                100% { 
                    opacity: 0; 
                    background-position: 200% center; 
                }
            }
            
            @keyframes glow-pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            @keyframes click-ripple {
                0% { width: 0; height: 0; opacity: 0.8; }
                100% { width: 100px; height: 100px; opacity: 0; }
            }
            
            @keyframes symbol-float {
                0%, 100% { 
                    opacity: 0; 
                    transform: translateY(0) scale(0.5); 
                }
                50% { 
                    opacity: 1; 
                    transform: translateY(-10px) scale(1); 
                }
            }
            
            @keyframes data-dot-flow {
                0% { 
                    transform: translateY(0); 
                    opacity: 0; 
                }
                10% { 
                    opacity: 1; 
                }
                90% { 
                    opacity: 1; 
                }
                100% { 
                    transform: translateY(100vh); 
                    opacity: 0; 
                }
            }
            
            @keyframes logo-glow-pulse {
                0% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.8; transform: scale(1.05); }
                100% { opacity: 0; transform: scale(1.1); }
            }
            
            @keyframes logo-bounce {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            @keyframes input-glow-sweep {
                0% { 
                    opacity: 0; 
                    background-position: -200% center; 
                }
                50% { 
                    opacity: 1; 
                    background-position: center center; 
                }
                100% { 
                    opacity: 0; 
                    background-position: 200% center; 
                }
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            @keyframes slideUpFade {
                0% { 
                    transform: translateY(100%); 
                    opacity: 0; 
                }
                100% { 
                    transform: translateY(0); 
                    opacity: 1; 
                }
            }
            
            @keyframes slideDownFade {
                0% { 
                    transform: translateY(0); 
                    opacity: 1; 
                }
                100% { 
                    transform: translateY(100%); 
                    opacity: 0; 
                }
            }
            
            @keyframes fadeInTooltip {
                from { 
                    opacity: 0; 
                    transform: translateX(-50%) translateY(-5px); 
                }
                to { 
                    opacity: 1; 
                    transform: translateX(-50%) translateY(0); 
                }
            }
            
            .recaptcha-container {
                margin: 20px 0;
                display: flex;
                justify-content: center;
            }
            
            .recaptcha-container .g-recaptcha {
                transform: scale(0.9);
                transform-origin: center;
            }
            
            @media (max-width: 768px) {
                .recaptcha-container .g-recaptcha {
                    transform: scale(0.8);
                }
            }
        </style>
    `;
  document.head.insertAdjacentHTML("beforeend", styles);
});
