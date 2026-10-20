/**
 * Table of contents for journal articles. Folds the list on phones, closes it
 * after a link is chosen there, and marks the link of the heading in view.
 */
class XoToc extends HTMLElement {
  #observer;
  #media = window.matchMedia('(min-width: 990px)');

  connectedCallback() {
    this.details = this.querySelector('details');
    this.links = Array.from(this.querySelectorAll('a[href^="#"]'));
    if (!this.details || !this.links.length) return;

    this.#syncOpen();
    this.#media.addEventListener('change', this.#syncOpen);
    this.details.querySelector('summary')?.addEventListener('click', this.#onSummary);
    this.addEventListener('click', this.#onLink);
    this.#watchHeadings();
  }

  disconnectedCallback() {
    this.#media.removeEventListener('change', this.#syncOpen);
    this.#observer?.disconnect();
  }

  #syncOpen = () => {
    if (this.details) this.details.open = this.#media.matches;
  };

  /** On computers the list always stays open. */
  #onSummary = (event) => {
    if (this.#media.matches) event.preventDefault();
  };

  /** @param {MouseEvent} event */
  #onLink = (event) => {
    const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
    if (!link || this.#media.matches || !this.details) return;
    this.details.open = false;
  };

  #watchHeadings() {
    const pairs = this.links
      .map((link) => ({ link, heading: document.getElementById(decodeURIComponent(link.hash.slice(1))) }))
      .filter((pair) => pair.heading);
    if (!pairs.length) return;

    this.#observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          for (const { link, heading } of pairs) {
            if (heading === entry.target) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    for (const { heading } of pairs) this.#observer.observe(heading);
  }
}

/** Copies the article's address and says so for screen reader users. */
class XoCopyLink extends HTMLElement {
  connectedCallback() {
    this.querySelector('button')?.addEventListener('click', this.#copy);
  }

  #copy = async () => {
    const url = this.dataset.url || window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      return;
    }
    this.setAttribute('data-copied', '');
    const status = this.querySelector('[data-xo-copy-status]');
    if (status) status.textContent = this.dataset.done || '';
    window.setTimeout(() => {
      this.removeAttribute('data-copied');
      if (status) status.textContent = '';
    }, 2500);
  };
}

if (!customElements.get('xo-toc')) customElements.define('xo-toc', XoToc);
if (!customElements.get('xo-copy-link')) customElements.define('xo-copy-link', XoCopyLink);
