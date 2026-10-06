import { Component } from '@theme/component';
import { publish } from '@theme/xo-analytics';

/**
 * Announcement bar: rotates messages with a fade, and can be dismissed.
 *
 * - Rotation pauses while the pointer is over the bar, while it has keyboard focus,
 *   and when the visitor presses the pause button (WCAG 2.2.2).
 * - No automatic rotation for visitors who ask for reduced motion.
 * - Hidden messages are `inert`, so their links are not reachable by keyboard.
 * - While rotating, the region is not announced by screen readers; when the visitor
 *   moves between messages themselves, the new message is announced.
 * - Dismissal is remembered for the browser session (`sessionStorage`). An inline
 *   script in the section hides a dismissed bar before first paint.
 *
 * @typedef {object} Refs
 * @property {HTMLElement[]} slides
 * @property {HTMLElement} viewport
 * @property {HTMLButtonElement} [toggle]
 *
 * @extends {Component<Refs>}
 */
class XoAnnouncement extends Component {
  requiredRefs = ['slides', 'viewport'];

  #index = 0;
  /** @type {number | undefined} */
  #timer;
  #hovered = false;
  #focused = false;
  #userPaused = false;

  connectedCallback() {
    super.connectedCallback();
    this.#show(0, false);

    this.addEventListener('pointerenter', this.#onPointerEnter);
    this.addEventListener('pointerleave', this.#onPointerLeave);
    this.addEventListener('focusin', this.#onFocusIn);
    this.addEventListener('focusout', this.#onFocusOut);
    this.addEventListener('click', this.#onClick);
    document.addEventListener('visibilitychange', this.#update);
    document.addEventListener('shopify:block:select', this.#onBlockSelect);

    if (this.#canRotate) this.#update();
    else this.toggleAttribute('data-static', true);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#stop();
    document.removeEventListener('visibilitychange', this.#update);
    document.removeEventListener('shopify:block:select', this.#onBlockSelect);
  }

  get #slides() {
    return this.refs.slides ?? [];
  }

  get #interval() {
    return (Number(this.getAttribute('autoplay')) || 0) * 1000;
  }

  get #canRotate() {
    return (
      this.#slides.length > 1 &&
      this.#interval > 0 &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !window.Shopify?.designMode
    );
  }

  next() {
    this.#show(this.#index + 1, true);
  }

  previous() {
    this.#show(this.#index - 1, true);
  }

  togglePlay() {
    this.#userPaused = !this.#userPaused;
    this.#update();
  }

  dismiss() {
    try {
      sessionStorage.setItem(this.dataset.storageKey ?? 'xo:announcement-dismissed', '1');
    } catch (_) {
      // Storage can be blocked; the bar still closes for this page.
    }
    publish('xo:announcement_dismiss', {});
    const bar = this.closest('[data-xo-announcement]');
    if (bar instanceof HTMLElement) bar.hidden = true;
  }

  /**
   * @param {number} index
   * @param {boolean} byVisitor - Announce the new message to screen readers
   */
  #show(index, byVisitor) {
    const slides = this.#slides;
    if (!slides.length) return;

    this.#index = ((index % slides.length) + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === this.#index;
      slide.toggleAttribute('data-active', active);
      slide.toggleAttribute('inert', !active);
      slide.setAttribute('aria-hidden', String(!active));
    });

    this.refs.viewport.setAttribute('aria-live', byVisitor ? 'polite' : 'off');
    if (byVisitor) this.#restart();
  }

  #update = () => {
    const running = this.#canRotate && !this.#hovered && !this.#focused && !this.#userPaused && !document.hidden;
    if (running) this.#start();
    else this.#stop();

    const { toggle } = this.refs;
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(this.#userPaused));
      toggle.setAttribute('aria-label', (this.#userPaused ? toggle.dataset.labelPlay : toggle.dataset.labelPause) ?? '');
    }
    this.toggleAttribute('data-playing', running);
  };

  #start() {
    if (this.#timer) return;
    this.refs.viewport.setAttribute('aria-live', 'off');
    this.#timer = window.setInterval(() => this.#show(this.#index + 1, false), this.#interval);
  }

  #stop() {
    window.clearInterval(this.#timer);
    this.#timer = undefined;
  }

  #restart() {
    this.#stop();
    this.#update();
  }

  #onPointerEnter = () => {
    this.#hovered = true;
    this.#update();
  };

  #onPointerLeave = () => {
    this.#hovered = false;
    this.#update();
  };

  #onFocusIn = () => {
    this.#focused = true;
    this.#update();
  };

  /** @param {FocusEvent} event */
  #onFocusOut = (event) => {
    if (event.relatedTarget instanceof Node && this.contains(event.relatedTarget)) return;
    this.#focused = false;
    this.#update();
  };

  /** In the Theme Editor, selecting a message block shows that message. */
  #onBlockSelect = (/** @type {Event} */ event) => {
    const index = this.#slides.findIndex((slide) => event.target instanceof Node && slide.contains(event.target));
    if (index >= 0) this.#show(index, false);
  };

  /** @param {MouseEvent} event */
  #onClick = (event) => {
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!link) return;
    publish('xo:announcement_click', {
      message: (link.textContent ?? '').trim().slice(0, 100),
      url: link.getAttribute('href'),
      position: this.#index + 1,
    });
  };
}

if (!customElements.get('xo-announcement')) customElements.define('xo-announcement', XoAnnouncement);
