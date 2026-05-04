(function () {
  const page = document.body.dataset.page || "";

  function setupNav() {
    document.querySelectorAll(".nav-menu a").forEach((link) => {
      const href = link.getAttribute("href") || "";
      if ((page === "home" && href === "index.html") || href === `${page}.html`) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });

    const toggle = document.querySelector("[data-nav-toggle]");
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  function setupYear() {
    document.querySelectorAll("[data-year]").forEach((target) => {
      target.textContent = new Date().getFullYear();
    });
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  }

  function setupFilterableLists() {
    document.querySelectorAll("[data-filter-target]").forEach((input) => {
      const targetSelector = input.getAttribute("data-filter-target");
      const items = Array.from(document.querySelectorAll(targetSelector || ""));
      if (!items.length) return;

      let activeTag = "";
      const chips = Array.from(document.querySelectorAll(`[data-filter-chip-for="${input.id}"]`));
      const countTarget = input.dataset.countTarget ? document.querySelector(input.dataset.countTarget) : null;

      function matchesTag(item) {
        if (!activeTag) return true;
        const tagText = (item.getAttribute("data-tags") || "").toLowerCase();
        const normalized = tagText.replace(/\|/g, " ");
        return normalized.includes(activeTag);
      }

      function apply() {
        const query = input.value.trim().toLowerCase();
        let visible = 0;
        items.forEach((item) => {
          const text = (item.getAttribute("data-search") || item.textContent || "").toLowerCase();
          const show = (!query || text.includes(query)) && matchesTag(item);
          item.hidden = !show;
          if (show) visible += 1;
        });
        if (countTarget) {
          const noun = countTarget.dataset.noun || "item";
          countTarget.textContent = `${visible} ${noun}${visible === 1 ? "" : "s"} shown`;
        }
      }

      input.addEventListener("input", apply);
      chips.forEach((chip) => {
        chip.addEventListener("click", () => {
          const tag = (chip.getAttribute("data-filter-tag") || "").toLowerCase();
          if (activeTag === tag) {
            activeTag = "";
            chip.classList.remove("is-active");
          } else {
            activeTag = tag;
            chips.forEach((item) => item.classList.remove("is-active"));
            chip.classList.add("is-active");
          }
          apply();
        });
      });
      apply();
    });
  }

  function setupContactForm() {
    const forms = document.querySelectorAll("[data-contact-form], #contact-form");
    forms.forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const name = formData.get("name") || "";
        const email = formData.get("email") || "";
        const topic = formData.get("topic") || "Internship or job opportunity";
        const message = formData.get("message") || "";
        const recipient = form.dataset.recipient || "ashutosh.ghimire@wright.edu";
        const subject = `[Portfolio] ${topic}`;
        const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");
        window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      });
    });
  }

  setupNav();
  setupYear();
  setupFilterableLists();
  setupContactForm();
})();
