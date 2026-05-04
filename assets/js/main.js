/* Ashutosh Ghimire — main.js
 * Lightweight, no-framework. Operates on existing HTML so content remains indexable.
 */
(function () {
  'use strict';

  // ---- Mobile nav toggle ----
  const toggle = document.querySelector('.nav-toggle');
  const list = document.querySelector('.nav-list');
  if (toggle && list) {
    toggle.addEventListener('click', () => {
      const open = list.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // ---- Mark active nav link ----
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-list a').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href) return;
    const file = href.split('/').pop();
    if (file === path || (path === '' && file === 'index.html')) {
      a.classList.add('is-active');
      a.setAttribute('aria-current', 'page');
    }
  });

  // ---- Generic filterable list (projects, publications) ----
  // Wire up: a search input with [data-filter-target="<selector>"] and optional chips with [data-filter-tag]
  document.querySelectorAll('[data-filter-target]').forEach((input) => {
    const targetSel = input.getAttribute('data-filter-target');
    const items = document.querySelectorAll(targetSel);
    let activeTag = '';

    function apply() {
      const q = input.value.trim().toLowerCase();
      items.forEach((item) => {
        const text = (item.getAttribute('data-search') || item.textContent || '').toLowerCase();
        const tags = (item.getAttribute('data-tags') || '').toLowerCase();
        const matchesQuery = !q || text.includes(q);
        const matchesTag = !activeTag || tags.split(/\s+/).includes(activeTag);
        item.style.display = matchesQuery && matchesTag ? '' : 'none';
      });
    }

    input.addEventListener('input', apply);

    document.querySelectorAll(`[data-filter-chip-for="${input.id}"]`).forEach((chip) => {
      chip.addEventListener('click', () => {
        const tag = chip.getAttribute('data-filter-tag') || '';
        if (activeTag === tag) {
          activeTag = '';
          chip.classList.remove('is-active');
        } else {
          activeTag = tag;
          document
            .querySelectorAll(`[data-filter-chip-for="${input.id}"]`)
            .forEach((c) => c.classList.remove('is-active'));
          chip.classList.add('is-active');
        }
        apply();
      });
    });
  });

  // ---- Contact page: build mailto link from form (no backend needed) ----
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const subject = encodeURIComponent(`[Portfolio] ${data.get('topic')} — ${data.get('name')}`);
      const body = encodeURIComponent(
        `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nTopic: ${data.get('topic')}\n\n${data.get('message')}`
      );
      const to = contactForm.dataset.recipient || 'ghimire.4@wright.edu';
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  }
})();
