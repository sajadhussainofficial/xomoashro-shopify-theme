// <xo-tabs>: buttons with role="tab" switch the panels named in their aria-controls.
// Arrow keys move between tabs. Used by the purity checks and the questions sections.
class XoTabs extends HTMLElement {
  connectedCallback() {
    this.tabs = [...this.querySelectorAll('[role="tab"]')];
    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => this.select(tab));
      tab.addEventListener('keydown', (event) => {
        const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
        if (!step) return;
        event.preventDefault();
        this.select(this.tabs[(index + step + this.tabs.length) % this.tabs.length], true);
      });
    });
  }

  select(tab, focus = false) {
    this.tabs.forEach((other) => {
      const on = other === tab;
      other.setAttribute('aria-selected', String(on));
      other.tabIndex = on ? 0 : -1;
      const panel = this.querySelector(`#${CSS.escape(other.getAttribute('aria-controls'))}`);
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
  }
}

if (!customElements.get('xo-tabs')) customElements.define('xo-tabs', XoTabs);

// In the Theme Editor, selecting a block inside a tab panel shows that panel.
document.addEventListener('shopify:block:select', (event) => {
  const panel = event.target.closest('[role="tabpanel"]');
  const tabs = panel?.closest('xo-tabs');
  const tab = tabs?.querySelector(`[aria-controls="${panel.id}"]`);
  if (tab) tabs.select(tab);
});
