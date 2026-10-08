(() => {
  'use strict';
  document.querySelectorAll('.funk-moments').forEach(root => {
    const cards = [...root.querySelectorAll('.moment-card')];
    const filters = [...root.querySelectorAll('[data-moments-filter]')];
    const dialog = root.querySelector('dialog');
    let visible = cards, current = 0, opener = null;
    root.querySelector('.moments-filters').hidden = false;
    filters.forEach(button => button.addEventListener('click', () => {
      const category = button.dataset.momentsFilter;
      filters.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      cards.forEach(card => { card.hidden = category !== 'all' && card.dataset.momentCategory !== category; });
      visible = cards.filter(card => !card.hidden);
      root.querySelector('.moments-status').textContent = `${visible.length} pictures shown`;
    }));
    if (!dialog || typeof dialog.showModal !== 'function') return;
    const show = index => {
      current = (index + visible.length) % visible.length;
      const link = visible[current].querySelector('[data-moment-open]');
      const picture = dialog.querySelector('img');
      picture.src = link.href;
      picture.alt = link.querySelector('img').alt;
      dialog.querySelector('.moment-full-caption').textContent = link.dataset.caption;
      dialog.querySelector('.moment-pager span').textContent = `${current + 1} / ${visible.length}`;
      dialog.querySelectorAll('[data-moment-step]').forEach(button => { button.disabled = visible.length < 2; });
    };
    cards.forEach(card => card.querySelector('[data-moment-open]').addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = event.currentTarget;
      show(visible.indexOf(card));
      dialog.showModal();
    }));
    dialog.querySelector('.moment-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => { if (opener) opener.focus(); });
    dialog.querySelectorAll('[data-moment-step]').forEach(button => button.addEventListener('click', () => show(current + Number(button.dataset.momentStep))));
    dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); show(current + (event.key === 'ArrowRight' ? 1 : -1)); }
    });
    dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  });
})();
