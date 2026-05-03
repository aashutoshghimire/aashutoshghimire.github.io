(function () {
  const data = window.siteData;
  const page = document.body.dataset.page;

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function externalAttrs(url) {
    return /^https?:\/\//.test(url) ? ' target="_blank" rel="noreferrer"' : "";
  }

  function tags(items) {
    return `<div class="tag-row">${items.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("")}</div>`;
  }

  function setupNav() {
    document.querySelectorAll(".nav-menu a").forEach((link) => {
      const href = link.getAttribute("href");
      if ((page === "home" && href === "index.html") || href === `${page}.html`) {
        link.classList.add("is-active");
      }
    });

    const toggle = document.querySelector("[data-nav-toggle]");
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  function renderLinks() {
    const socials = document.querySelector("[data-social-links]");
    if (socials) {
      socials.innerHTML = data.profile.links.map((link) => `<a class="social-link" href="${link.url}"${externalAttrs(link.url)}>${escapeHtml(link.short)}</a>`).join("");
    }

    document.querySelectorAll("[data-footer-links]").forEach((target) => {
      target.innerHTML = data.profile.links.map((link) => `<a href="${link.url}"${externalAttrs(link.url)}>${escapeHtml(link.short)}</a>`).join("");
    });

    const contact = document.querySelector("[data-contact-links]");
    if (contact) {
      const links = [
        { label: "Academic Email", value: data.profile.email, url: `mailto:${data.profile.email}` },
        { label: "Location", value: data.profile.location, url: "#" },
        ...data.profile.links
      ];
      contact.innerHTML = links.map((link) => {
        if (link.url === "#") {
          return `<div class="contact-link"><strong>${escapeHtml(link.label)}</strong><span>${escapeHtml(link.value || link.short)}</span></div>`;
        }
        return `<a class="contact-link" href="${link.url}"${externalAttrs(link.url)}><strong>${escapeHtml(link.label)}</strong><span>${escapeHtml(link.value || link.short)}</span></a>`;
      }).join("");
    }
  }

  function renderStats() {
    const target = document.querySelector("[data-profile-stats]");
    if (!target) return;
    target.innerHTML = data.stats.map((stat) => `
      <article class="stat-card">
        <strong>${escapeHtml(stat.value)}</strong>
        <span>${escapeHtml(stat.label)}</span>
      </article>
    `).join("");
  }

  function renderRoleFit() {
    const target = document.querySelector("[data-role-fit]");
    if (!target || !data.roleFit) return;
    target.innerHTML = data.roleFit.map((role) => `
      <article class="domain-card role-fit-card">
        <strong>${escapeHtml(role.title)}</strong>
        <span>${escapeHtml(role.description)}</span>
        ${tags(role.tags)}
      </article>
    `).join("");
  }

  function themeCard(theme) {
    return `
      <article class="theme-card">
        <img src="${theme.image}" alt="${escapeHtml(theme.title)} visual">
        <h3>${escapeHtml(theme.title)}</h3>
        <p>${escapeHtml(theme.description)}</p>
        ${tags(theme.tags)}
      </article>
    `;
  }

  function renderThemes() {
    const preview = document.querySelector("[data-theme-preview]");
    if (preview) preview.innerHTML = data.themes.slice(0, 4).map(themeCard).join("");
    const all = document.querySelector("[data-research-themes]");
    if (all) all.innerHTML = data.themes.map(themeCard).join("");
  }

  function projectCard(project) {
    const links = project.links.map((link) => `<a class="mini-link" href="${link.url}"${externalAttrs(link.url)}>${escapeHtml(link.label)}</a>`).join("");
    const searchText = [project.title, project.category, project.status, project.problem, project.approach, project.result, project.tags.join(" "), project.tech.join(" ")].join(" ").toLowerCase();
    return `
      <article class="project-card" data-tags="${project.tags.map((tag) => tag.toLowerCase()).join("|")}" data-search="${escapeHtml(searchText)}">
        <img src="${project.image}" alt="${escapeHtml(project.title)} visual">
        <div class="project-card-body">
          <div class="project-meta">
            <span>${escapeHtml(project.category)}</span>
            <span>${escapeHtml(project.status)}</span>
          </div>
          <h3>${escapeHtml(project.title)}</h3>
          <p><strong>Challenge:</strong> ${escapeHtml(project.problem)}</p>
          <p><strong>Build:</strong> ${escapeHtml(project.approach)}</p>
          <p><strong>Impact:</strong> ${escapeHtml(project.result)}</p>
          ${tags(project.tech.slice(0, 6))}
          <div class="project-links">${links}</div>
        </div>
      </article>
    `;
  }

  function renderProjects() {
    const featured = document.querySelector("[data-featured-projects]");
    if (featured) featured.innerHTML = data.projects.filter((project) => project.priority === "Featured").slice(0, 6).map(projectCard).join("");

    const all = document.querySelector("[data-projects]");
    if (!all) return;
    all.innerHTML = data.projects.map(projectCard).join("");
    let currentQuery = "";
    const countTarget = document.querySelector("[data-project-count]");
    const apply = () => {
      let visible = 0;
      all.querySelectorAll(".project-card").forEach((card) => {
        const queryMatch = !currentQuery || card.dataset.search.includes(currentQuery);
        const show = queryMatch;
        card.hidden = !show;
        if (show) visible += 1;
      });
      if (countTarget) countTarget.textContent = `${visible} project${visible === 1 ? "" : "s"} shown`;
    };
    const input = document.querySelector("[data-project-search]");
    if (input) {
      input.addEventListener("input", () => {
        currentQuery = input.value.trim().toLowerCase();
        apply();
      });
    }
    apply();
  }

  function renderProjectDomains() {
    const target = document.querySelector("[data-project-domains]");
    if (!target || !data.projectDomains) return;
    target.innerHTML = data.projectDomains.map((domain) => `
      <article class="domain-card">
        <strong>${escapeHtml(domain.title)}</strong>
        <span>${escapeHtml(domain.description)}</span>
      </article>
    `).join("");
  }

  function publicationCard(publication) {
    return `
      <article class="publication-card" data-tags="${publication.tags.map((tag) => tag.toLowerCase()).join("|")}" data-search="${escapeHtml([publication.title, publication.authors, publication.venue, publication.year, publication.tags.join(" ")].join(" ").toLowerCase())}">
        <div>
          <div class="publication-meta">
            <span>${escapeHtml(publication.year)}</span>
            <span>${escapeHtml(publication.type)}</span>
            <span>${escapeHtml(publication.venue)}</span>
          </div>
          <h3>${escapeHtml(publication.title)}</h3>
          <p>${escapeHtml(publication.authors)}</p>
          ${tags(publication.tags)}
        </div>
        <div class="publication-links">
          ${publication.featured ? '<span class="publication-badge">Featured</span>' : ""}
          <a class="mini-link" href="${publication.link}"${externalAttrs(publication.link)}>Open</a>
        </div>
      </article>
    `;
  }

  function renderPublications() {
    const featured = document.querySelector("[data-featured-publications]");
    if (featured) featured.innerHTML = data.publications.filter((item) => item.featured).slice(0, 4).map(publicationCard).join("");

    const all = document.querySelector("[data-publications]");
    if (!all) return;
    all.innerHTML = data.publications.map(publicationCard).join("");
    let currentQuery = "";
    const apply = () => {
      all.querySelectorAll(".publication-card").forEach((card) => {
        const queryMatch = !currentQuery || card.dataset.search.includes(currentQuery);
        card.hidden = !queryMatch;
      });
    };
    const input = document.querySelector("[data-publication-search]");
    if (input) {
      input.addEventListener("input", () => {
        currentQuery = input.value.trim().toLowerCase();
        apply();
      });
    }
  }

  function setupFilters(selector, values, callback) {
    const target = document.querySelector(selector);
    if (!target) return;
    const withoutAll = values.filter((value) => value !== "All");
    const unique = ["All", ...Array.from(new Set(withoutAll))];
    target.innerHTML = unique.map((tag, index) => `<button class="filter-button${index === 0 ? " is-active" : ""}" type="button" data-filter="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`).join("");
    target.querySelectorAll("[data-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        target.querySelectorAll(".filter-button").forEach((item) => item.classList.remove("is-active"));
        button.classList.add("is-active");
        callback(button.dataset.filter);
      });
    });
  }

  function renderExperience() {
    const highlights = document.querySelector("[data-experience-highlights]");
    if (highlights && data.experienceHighlights) {
      highlights.innerHTML = data.experienceHighlights.map((item) => `
        <article class="experience-highlight-card">
          <span>${escapeHtml(item.kicker)}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.description)}</p>
          ${tags(item.tags)}
        </article>
      `).join("");
    }

    const timeline = document.querySelector("[data-experience-timeline]");
    if (timeline) {
      timeline.innerHTML = data.experience.map((item) => `
        <article class="timeline-item">
          <div class="timeline-meta">
            <span>${escapeHtml(item.dates)}</span>
            <span>${escapeHtml(item.location)}</span>
          </div>
          <h3>${escapeHtml(item.role)}</h3>
          <p>${escapeHtml(item.org)}</p>
          <ul>${item.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>
        </article>
      `).join("");
    }

    const education = document.querySelector("[data-education]");
    if (education) {
      education.innerHTML = data.education.map((item) => `
        <article class="education-card">
          <div class="timeline-meta"><span>${escapeHtml(item.dates)}</span></div>
          <h3>${escapeHtml(item.degree)}</h3>
          <p><strong>${escapeHtml(item.school)}</strong></p>
          <p>${escapeHtml(item.detail)}</p>
        </article>
      `).join("");
    }

    const skills = document.querySelector("[data-skills]");
    if (skills) {
      skills.innerHTML = data.skills.map((group) => `
        <article class="skill-card">
          <h3>${escapeHtml(group.title)}</h3>
          ${tags(group.items)}
        </article>
      `).join("");
    }

    const awards = document.querySelector("[data-awards]");
    if (awards) {
      awards.innerHTML = data.awards.map((award) => `
        <article class="award-card">
          <h3>${escapeHtml(award.title)}</h3>
          <p><strong>${escapeHtml(award.org)}</strong></p>
          <p>${escapeHtml(award.detail)}</p>
        </article>
      `).join("");
    }
  }

  function setupContactForm() {
    const form = document.querySelector("[data-contact-form]");
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const name = formData.get("name") || "";
      const email = formData.get("email") || "";
      const topic = formData.get("topic") || "Internship or job opportunity";
      const message = formData.get("message") || "";
      const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        message
      ].join("\n");
      window.location.href = `mailto:${data.profile.email}?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(body)}`;
    });
  }

  function setupYear() {
    document.querySelectorAll("[data-year]").forEach((target) => {
      target.textContent = new Date().getFullYear();
    });
  }

  setupNav();
  setupYear();
  renderLinks();
  renderStats();
  renderRoleFit();
  renderThemes();
  renderProjectDomains();
  renderProjects();
  renderPublications();
  renderExperience();
  setupContactForm();
})();
