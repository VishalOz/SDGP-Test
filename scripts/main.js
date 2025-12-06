// Commit 4

(function () {
  // Utility: add event listener to multiple
  function on(selector, event, handler, root = document) {
    root
      .querySelectorAll(selector)
      .forEach((el) => el.addEventListener(event, handler));
  }

  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen);
      // For keyboard focus management: focus first link when opening
      if (isOpen) {
        const firstLink = nav.querySelector("a, button");
        if (firstLink) firstLink.focus();
      }
    });
  }

  // Close mobile nav on outside click (helpful on small screens)
  document.addEventListener("click", (e) => {
    if (!nav) return;
    if (!nav.classList.contains("open")) return;
    if (!nav.contains(e.target) && e.target !== menuToggle) {
      nav.classList.remove("open");
      if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Keyboard accessibility: close nav on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav && nav.classList.contains("open")) {
      nav.classList.remove("open");
      if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
      menuToggle && menuToggle.focus();
    }
  });

  // Hover/focus style for desktop nav items (add a class for CSS to animate)
  on("#nav .nav-item", "mouseenter", (e) =>
    e.currentTarget.classList.add("hover")
  );
  on("#nav .nav-item", "mouseleave", (e) =>
    e.currentTarget.classList.remove("hover")
  );
  on("#nav .nav-item a", "focus", (e) =>
    e.currentTarget.closest(".nav-item").classList.add("hover")
  );
  on("#nav .nav-item a", "blur", (e) =>
    e.currentTarget.closest(".nav-item").classList.remove("hover")
  );

  // Mock action buttons (RATE & SHIP, TRACK, LOCATIONS)
  on("[data-action]", "click", (e) => {
    const action = e.currentTarget.getAttribute("data-action");
    // Provide lightweight UX: aria-live message + console log + demonstration modal fallback
    const live = document.getElementById("site-live-region");
    const msg =
      {
        "rate-ship": "Rate & Ship clicked — opening rate calculator (mock).",
        track: "Track clicked — focusing the tracking input.",
        locations: "Locations clicked — opening locations finder (mock).",
      }[action] || `Action "${action}" clicked`;

    if (live) {
      live.textContent = msg;
    }
    console.info("[MockAction]", action, msg);

    // Example behaviors
    if (action === "track") {
      const input = document.getElementById("tracking-input");
      input && input.focus();
    }
    // Could trigger modals or route changes in a real app.
  });

  // Optional: initialize any tooltips or small micro-interactions
  document.querySelectorAll("[data-tooltip]").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      // leave to CSS or your tooltip system. This hook is here if needed.
    });
  });
})();
