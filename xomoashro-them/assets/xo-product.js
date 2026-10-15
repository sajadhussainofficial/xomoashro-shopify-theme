import { StandardEvents } from '@shopify/events';

/**
 * Keeps size-dependent parts of the product page in step with the chosen size.
 * Horizon already updates the price, gallery, buttons and sticky bar; this element
 * swaps every `[data-xo-sync]` node (structured data, WhatsApp link) for its copy
 * in the page Horizon fetched for the new size.
 */
class XoProductSync extends HTMLElement {
  #controller = new AbortController();

  connectedCallback() {
    const section = this.closest('.shopify-section') ?? this;
    section.addEventListener(StandardEvents.productSelect, this.#onProductSelect, { signal: this.#controller.signal });
  }

  disconnectedCallback() {
    this.#controller.abort();
    this.#controller = new AbortController();
  }

  /** @param {Event & { promise?: Promise<{ detail?: { html?: Document } }> }} event */
  #onProductSelect = (event) => {
    if (!(event.target instanceof Element) || event.target.closest('product-card')) return;

    event.promise
      ?.then(({ detail }) => {
        const html = detail?.html;
        if (!html) return;

        for (const current of this.querySelectorAll('[data-xo-sync]')) {
          const key = current.getAttribute('data-xo-sync');
          const next = html.querySelector(`[data-xo-sync="${CSS.escape(key ?? '')}"]`);
          if (!next) continue;

          if (current instanceof HTMLScriptElement) {
            current.textContent = next.textContent;
          } else {
            current.replaceWith(document.importNode(next, true));
          }
        }
      })
      .catch((error) => {
        if (error?.name !== 'AbortError') console.warn('[xo-product-sync]', error);
      });
  };
}

/**
 * Shows one customer quote at a time and moves to the next every few seconds.
 * Stops while hovered or focused, and does not move when reduced motion is set.
 */
class XoQuotes extends HTMLElement {
  #timer = 0;
  #index = 0;
  #paused = false;

  connectedCallback() {
    const items = this.#items;
    if (items.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.addEventListener('pointerenter', this.#pause);
    this.addEventListener('pointerleave', this.#resume);
    this.addEventListener('focusin', this.#pause);
    this.addEventListener('focusout', this.#resume);
    this.#start();
  }

  disconnectedCallback() {
    window.clearInterval(this.#timer);
  }

  get #items() {
    return Array.from(this.querySelectorAll('.xo-quotes__item'));
  }

  #start() {
    const interval = Number(this.dataset.interval) || 7000;
    this.#timer = window.setInterval(() => {
      if (this.#paused || document.hidden) return;
      const items = this.#items;
      items[this.#index]?.setAttribute('hidden', '');
      this.#index = (this.#index + 1) % items.length;
      items[this.#index]?.removeAttribute('hidden');
    }, interval);
  }

  #pause = () => {
    this.#paused = true;
  };

  #resume = () => {
    this.#paused = false;
  };
}

/**
 * Jump links for the product page. Hides a link when its section is not on the
 * page (for example the lab report before a report exists) and marks the link of
 * the section in view.
 */
class XoJumpNav extends HTMLElement {
  #observer;

  connectedCallback() {
    const links = Array.from(this.querySelectorAll('a[href^="#"]'));
    const targets = [];

    for (const link of links) {
      const id = decodeURIComponent(link.getAttribute('href')?.slice(1) ?? '');
      const target = id ? document.getElementById(id) : null;
      const item = link.closest('li') ?? link;
      if (!target || target.offsetParent === null) {
        item.hidden = true;
        continue;
      }
      targets.push({ link, target });
    }

    this.hidden = targets.length === 0;
    if (!targets.length) return;

    this.#observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          for (const { link, target } of targets) {
            if (target === entry.target) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    for (const { target } of targets) this.#observer.observe(target);
  }

  disconnectedCallback() {
    this.#observer?.disconnect();
  }
}

if (!customElements.get('xo-product-sync')) customElements.define('xo-product-sync', XoProductSync);
if (!customElements.get('xo-quotes')) customElements.define('xo-quotes', XoQuotes);
if (!customElements.get('xo-jump-nav')) customElements.define('xo-jump-nav', XoJumpNav);
