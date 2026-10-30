/* The handoff sets section headings and group legends inside the form. The platform form is a
   flat list of fields, so these are added ahead of the field that opens each group; with the
   script off the form is complete, only without its headings. */
(function () {
  var form = document.querySelector('form[data-bz-form="schedule-service"]');
  if (!form) return;
  var ITEMS = [["h2", "Vehicle information", "ss-year"], ["h2", "Service Information", "ss-service"], ["legend", "Preferred Date", "ss-month"], ["legend", "Preferred Time", "ss-hours"], ["h2", "Contact Information", "ss-first-name"]];
  ITEMS.forEach(function (it) {
    var w = form.querySelector('[data-bz-field="' + it[2] + '"]');
    if (!w) return;
    var el = document.createElement(it[0] === 'h2' ? 'h2' : 'p');
    el.className = 'tc-form-' + it[0];
    el.textContent = it[1];
    w.parentNode.insertBefore(el, w);
  });
  /* Date and time pickers: compact selects on one line, the label as the placeholder
     (the handoff has no visible label for them). */
  var GROUPS = [["ss-month", "ss-day", "ss-year-pref"], ["ss-hours", "ss-minutes", "ss-ampm"]];
  GROUPS.forEach(function (ids) {
    var ws = ids.map(function (id) { return form.querySelector('[data-bz-field="' + id + '"]'); });
    if (ws.some(function (w) { return !w; })) return;
    var row = document.createElement('div');
    row.className = 'tc-form-inline';
    ws[0].parentNode.insertBefore(row, ws[0]);
    ws.forEach(function (w, i) {
      var lab = w.querySelector('.bz-label'), opt = w.querySelector('select option[value=""]');
      if (lab && opt) { opt.textContent = lab.textContent.replace(/\s*\*\s*$/, '').trim(); lab.classList.add('bz-sr'); }
      row.appendChild(w);
      if (ids.length === 3 && ids[0].slice(-5) === 'hours' && i === 0) { var c = document.createElement('span'); c.textContent = ':'; row.appendChild(c); }
    });
  });
})();
