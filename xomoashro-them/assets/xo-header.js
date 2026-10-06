import { DialogComponent, DialogOpenEvent, DialogCloseEvent } from '@theme/dialog';

/**
 * Mobile navigation drawer. Extends Horizon's dialog component (native modal
 * dialog: focus trap, Escape, backdrop click, scroll lock) and adds:
 *
 * - `aria-expanded` kept in sync on every button that controls the drawer;
 * - closing when a link inside is followed;
 * - `data-xo-open-after-close="<dialog-component id>"` on a button: closes the
 *   drawer first, then opens that dialog (used for search);
 * - in the Theme Editor, selecting a block inside the drawer opens it.
 */
class XoNavDrawer extends DialogComponent {
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener(DialogOpenEvent.eventName, this.#syncTriggers);
    this.addEventListener(DialogCloseEvent.eventName, this.#syncTriggers);
    this.addEventListener('click', this.#onClick);

    if (window.Shopify?.designMode) {
      document.addEventListener('shopify:block:select', this.#onBlockSelect);
      document.addEventListener('shopify:block:deselect', this.#onBlockDeselect);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('shopify:block:select', this.#onBlockSelect);
    document.removeEventListener('shopify:block:deselect', this.#onBlockDeselect);
  }

  #syncTriggers = () => {
    const { dialog } = this.refs;
    for (const trigger of document.querySelectorAll(`[aria-controls="${dialog.id}"]`)) {
      trigger.setAttribute('aria-expanded', String(dialog.open));
    }
  };

  /** @param {MouseEvent} event */
  #onClick = (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    const opener = target.closest('[data-xo-open-after-close]');
    if (opener) {
      const next = document.getElementById(opener.getAttribute('data-xo-open-after-close') ?? '');
      this.closeDialog().then(() => {
        if (next instanceof DialogComponent) next.showDialog();
      });
      return;
    }

    if (target.closest('a[href]')) this.closeDialog();
  };

  /** @param {Event} event */
  #onBlockSelect = (event) => {
    if (event.target instanceof Node && this.contains(event.target)) this.showDialog();
  };

  /** @param {Event} event */
  #onBlockDeselect = (event) => {
    if (event.target instanceof Node && this.contains(event.target)) this.closeDialog();
  };
}

if (!customElements.get('xo-nav-drawer')) customElements.define('xo-nav-drawer', XoNavDrawer);

/* Desktop dropdowns are <details> elements: close them on outside click and on Escape. */

const DROPDOWN = '.xo-header__dropdown[open]';

document.addEventListener('click', (event) => {
  for (const dropdown of document.querySelectorAll(DROPDOWN)) {
    if (event.target instanceof Node && !dropdown.contains(event.target)) dropdown.removeAttribute('open');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  const dropdown = document.querySelector(DROPDOWN);
  if (!dropdown) return;
  dropdown.removeAttribute('open');
  dropdown.querySelector('summary')?.focus();
});
