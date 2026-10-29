/**
 * Scroll-reveal for the homepage's card and split bands.
 *
 * None of the eight platform behaviours expresses this: `scrollstate` toggles a
 * flag on one node after a scroll offset, and this needs a per-element
 * IntersectionObserver that fires once. So it is written here, in the narrowest
 * scope that covers it — the page that uses it.
 *
 * The staged state is switched on by this script (`data-tc-reveal` on <html>),
 * never by the stylesheet alone. With JavaScript off, on the first paint, and
 * on the dashboard's Design canvas — which runs no site JS — every band is
 * already in flow and fully visible, so there is nothing a dealer cannot see or
 * select. Someone who has asked for reduced motion gets the same.
 */
(function () {
  var root = document.documentElement;
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var SELECTORS = [
    '[data-bz-node="about-row"] > .bz-col',
    '[data-bz-node="svc-grid"] > .bz-col',
    '[data-bz-node="rail-track"] > .bz-col',
    '[data-bz-node="careers-row"] > .bz-col',
    '[data-bz-node="trailers-row"] > .bz-col',
    '[data-bz-node="driven-row"] > .bz-col',
    '[data-bz-node="loc-rows"] > .bz-col',
    '[data-bz-node="news-list"] .bz-post'
  ].join(',');

  var targets = document.querySelectorAll(SELECTORS);
  if (!targets.length) return;

  root.setAttribute('data-tc-reveal', '');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.setAttribute('data-tc-shown', '');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  Array.prototype.forEach.call(targets, function (el) {
    el.setAttribute('data-tc-reveal-item', '');
    observer.observe(el);
  });
})();
