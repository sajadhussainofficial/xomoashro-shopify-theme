/**
 * Filters the lab reports table by batch number as the visitor types, and says
 * how many reports match for screen reader users.
 */
class XoLabSearch extends HTMLElement {
  connectedCallback() {
    this.input = this.querySelector('[data-xo-lab-input]');
    this.rows = Array.from(this.querySelectorAll('tbody tr[data-batch]'));
    this.none = this.querySelector('[data-xo-lab-none]');
    this.status = this.querySelector('[data-xo-lab-status]');
    this.input?.addEventListener('input', this.#filter);
  }

  disconnectedCallback() {
    this.input?.removeEventListener('input', this.#filter);
  }

  #filter = () => {
    const query = (this.input?.value ?? '').trim().toLowerCase();
    let shown = 0;

    for (const row of this.rows) {
      const match = !query || (row.dataset.batch ?? '').includes(query);
      row.hidden = !match;
      if (match) shown++;
    }

    if (this.none) this.none.hidden = shown > 0;
    if (this.status) {
      const template = shown === 1 ? this.dataset.oneLabel : this.dataset.otherLabel;
      this.status.textContent = query && template ? template.replace('[count]', String(shown)) : '';
    }
  };
}

if (!customElements.get('xo-lab-search')) customElements.define('xo-lab-search', XoLabSearch);
