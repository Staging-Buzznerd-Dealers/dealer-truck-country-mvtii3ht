/* News index pagination: 12 posts a page, as the handoff's own script does. The cards are
   one list (the "News cards" component); this only decides which twelve show. Without
   script every card is visible, so the page is complete before this runs. */
(function () {
  var PER = 12;
  var grid = document.querySelector('[data-bz-node="ng-grid"]');
  var mount = document.querySelector('[data-bz-node="news-pager-col"]');
  if (!grid || !mount) return;
  var cards = Array.prototype.slice.call(grid.children);
  var pages = Math.ceil(cards.length / PER);
  if (pages < 2) return;

  var nav = document.createElement('nav');
  nav.className = 'tc-pagination';
  nav.setAttribute('aria-label', 'Pagination');
  mount.appendChild(nav);

  function button(label, aria, onClick, state) {
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    if (aria) b.setAttribute('aria-label', aria);
    if (state === 'current') b.setAttribute('aria-current', 'page');
    if (state === 'disabled') b.disabled = true;
    b.addEventListener('click', onClick);
    return b;
  }

  function show(n, push) {
    n = Math.min(Math.max(1, n), pages);
    cards.forEach(function (c, i) { c.hidden = Math.floor(i / PER) + 1 !== n; });
    nav.textContent = '';
    nav.appendChild(button('\u00ab Previous', 'Previous page', function () { show(n - 1, true); }, n === 1 ? 'disabled' : ''));
    for (var i = 1; i <= pages; i++) {
      (function (i) {
        nav.appendChild(button(String(i), 'Page ' + i, function () { show(i, true); }, i === n ? 'current' : ''));
      })(i);
    }
    nav.appendChild(button('Next \u00bb', 'Next page', function () { show(n + 1, true); }, n === pages ? 'disabled' : ''));
    if (push) {
      history.replaceState(null, '', n === 1 ? location.pathname : '#page-' + n);
      grid.scrollIntoView({ block: 'start' });
    }
  }

  function fromHash() {
    var m = /^#page-(\d+)$/.exec(location.hash);
    show(m ? Number(m[1]) : 1, false);
  }
  window.addEventListener('hashchange', fromHash);
  fromHash();
})();
