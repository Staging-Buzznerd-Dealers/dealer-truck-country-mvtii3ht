/* Three-step credit application. The form is one platform form, so the layout is complete
   with this script off (every field in one column, as the dashboard canvas shows it); the
   script only decides which fields show. Step panels, conditional groups and the progress
   header follow the handoff's own wizard (js/wizard.js). */
(function () {
  var form = document.querySelector('form[data-bz-form="parts-credit-application"]');
  if (!form) return;
  var step = 1;
  var P = 'pca-';
  /* field id -> step and the conditional groups it sits in */
  var MAP = {"pca-company-or-individual-name":[1],"pca-billing-mailing-address":[1],"pca-billing-city":[1],"pca-billing-state":[1],"pca-billing-zip":[1],"pca-shipsame":[1],"pca-shipping-address":[1,"hideShip"],"pca-shipping-city":[1,"hideShip"],"pca-shipping-state":[1,"hideShip"],"pca-shipping-zip":[1,"hideShip"],"pca-business-phone":[1],"pca-ext":[1],"pca-fax":[1],"pca-cell-phone":[1],"pca-yrs-in-business":[1],"pca-trucks-in-fleet":[1],"pca-federal-employer-id-no-fein":[1],"pca-no-of-employees":[1],"pca-business-email":[1],"pca-biztype":[1],"pca-ctype":[1,"hideCCorp"],"pca-if-publicly-traded-state-your-stock-ticker":[1,"hideCCorp","hideTicker"],"pca-domicile-city":[1],"pca-domicile-state":[1],"pca-accts-payable-contact-name":[1],"pca-a-p-phone":[1],"pca-a-p-fax":[1],"pca-accts-payable-e-mail":[1],"pca-requested-line-of-credit":[1],"pca-leased":[1],"pca-if-yes-to-whom":[1,"hideLeased"],"pca-leased-street":[1,"hideLeased"],"pca-leased-city":[1,"hideLeased"],"pca-leased-state":[1,"hideLeased"],"pca-leased-zip":[1,"hideLeased"],"pca-division":[1],"pca-location-iowa":[1,"hideLocIowa"],"pca-location-illinois":[1,"hideLocIllinois"],"pca-location-wisconsin":[1,"hideLocWisconsin"],"pca-location-indiana":[1,"hideLocIndiana"],"pca-location-michigan":[1,"hideLocMichigan"],"pca-location-ohio":[1,"hideLocOhio"],"pca-owner1-name":[2],"pca-owner1-ssn":[2],"pca-owner1-title":[2],"pca-owner1-address":[2],"pca-owner2-name":[2],"pca-owner2-ssn":[2],"pca-owner2-title":[2],"pca-owner2-address":[2],"pca-owner3-name":[2],"pca-owner3-ssn":[2],"pca-owner3-title":[2],"pca-owner3-address":[2],"pca-taxex":[2],"pca-taxall":[2,"hideTax"],"pca-taxstate":[2,"hideTax"],"pca-taxstate-2":[2,"hideTax"],"pca-taxstate-3":[2,"hideTax"],"pca-taxstate-4":[2,"hideTax"],"pca-taxstate-5":[2,"hideTax"],"pca-taxstate-6":[2,"hideTax"],"pca-taxstate-7":[2,"hideTax"],"pca-taxstate-8":[2,"hideTax"],"pca-taxstate-9":[2,"hideTax"],"pca-taxstate-10":[2,"hideTax"],"pca-taxstate-11":[2,"hideTax"],"pca-taxstate-12":[2,"hideTax"],"pca-taxstate-13":[2,"hideTax"],"pca-taxstate-14":[2,"hideTax"],"pca-taxstate-15":[2,"hideTax"],"pca-taxstate-16":[2,"hideTax"],"pca-taxstate-17":[2,"hideTax"],"pca-taxstate-18":[2,"hideTax"],"pca-taxstate-19":[2,"hideTax"],"pca-taxstate-20":[2,"hideTax"],"pca-taxstate-21":[2,"hideTax"],"pca-taxstate-22":[2,"hideTax"],"pca-taxstate-23":[2,"hideTax"],"pca-taxstate-24":[2,"hideTax"],"pca-taxstate-25":[2,"hideTax"],"pca-taxstate-26":[2,"hideTax"],"pca-taxstate-27":[2,"hideTax"],"pca-taxstate-28":[2,"hideTax"],"pca-taxstate-29":[2,"hideTax"],"pca-taxstate-30":[2,"hideTax"],"pca-taxstate-31":[2,"hideTax"],"pca-taxstate-32":[2,"hideTax"],"pca-taxstate-33":[2,"hideTax"],"pca-taxstate-34":[2,"hideTax"],"pca-taxstate-35":[2,"hideTax"],"pca-taxstate-36":[2,"hideTax"],"pca-taxstate-37":[2,"hideTax"],"pca-taxstate-38":[2,"hideTax"],"pca-taxstate-39":[2,"hideTax"],"pca-taxstate-40":[2,"hideTax"],"pca-taxstate-41":[2,"hideTax"],"pca-taxstate-42":[2,"hideTax"],"pca-taxstate-43":[2,"hideTax"],"pca-taxstate-44":[2,"hideTax"],"pca-taxstate-45":[2,"hideTax"],"pca-taxstate-46":[2,"hideTax"],"pca-taxstate-47":[2,"hideTax"],"pca-taxstate-48":[2,"hideTax"],"pca-taxstate-49":[2,"hideTax"],"pca-taxstate-50":[2,"hideTax"],"pca-po":[2],"pca-bank1-name":[2],"pca-bank1-type":[2],"pca-bank1-street":[2],"pca-bank1-city":[2],"pca-bank1-phone":[2],"pca-bank1-state":[2],"pca-bank1-zip":[2],"pca-bank1-acct":[2],"pca-bank1-contact":[2],"pca-bank2-name":[2],"pca-bank2-type":[2],"pca-bank2-street":[2],"pca-bank2-city":[2],"pca-bank2-state":[2],"pca-bank2-zip":[2],"pca-bank2-phone":[2],"pca-bank2-acct":[2],"pca-bank2-contact":[2],"pca-bank-finance-company":[2],"pca-tp-street":[2],"pca-tp-city":[2],"pca-tp-state":[2],"pca-tp-zip":[2],"pca-tp-phone":[2],"pca-tp-acct":[2],"pca-tp-contact":[2],"pca-trade1-name":[2],"pca-trade1-citystate":[2],"pca-trade1-fax":[2],"pca-trade1-phone":[2],"pca-trade2-name":[2],"pca-trade2-citystate":[2],"pca-trade2-fax":[2],"pca-trade2-phone":[2],"pca-trade3-name":[2],"pca-trade3-citystate":[2],"pca-trade3-fax":[2],"pca-trade3-phone":[2],"pca-print-name":[3],"pca-customer-signature":[3],"pca-date":[3],"pca-agree1":[3],"pca-agree2":[3],"pca-agree3":[3]};
  var HEADINGS = [["Owners, Partners or Officers", "pca-owner1-name"], ["Tax Exempt", "pca-taxex"], ["Credit References - Please Provide Two Bank References (Confidential)", "pca-bank1-name"], ["Truck Payment (if applicable) made to", "pca-bank-finance-company"], ["Major Trade References", "pca-trade1-name"]];
  var DIV = { Iowa: 'Truck Country of Iowa', Illinois: 'Truck Country of Illinois', Wisconsin: 'Truck Country of Wisconsin', Indiana: 'Truck Country of Indiana - dba Stoops Freightliner', Michigan: 'Truck Country of Michigan - dba Stoops Freightliner', Ohio: 'Truck Country of Ohio - dba Stoops Freightliner' };
  function val(n) { var c = form.querySelector('input[name="' + P + n + '"]:checked'); return c ? c.value : ''; }
  var SHOW = {
    hideShip: function () { return val('shipsame') === 'No'; },
    hideCCorp: function () { return val('biztype') === 'C Corp'; },
    hideTicker: function () { return val('ctype') === 'Publicly Traded'; },
    hideLeased: function () { return val('leased') === 'Yes'; },
    hideTax: function () { return val('taxex') === 'Yes'; }
  };
  Object.keys(DIV).forEach(function (k) { SHOW['hideLoc' + k] = function () { return val('division') === DIV[k]; }; });

  /* wrappers and the required flags they carry, so a hidden field never blocks submit */
  var nodes = {};
  Object.keys(MAP).forEach(function (id) {
    var w = form.querySelector('[data-bz-field="' + id + '"]');
    if (!w) return;
    var req = [].slice.call(w.querySelectorAll('[required]'));
    nodes[id] = { w: w, req: req };
  });

  /* progress header, above the form */
  var head = document.createElement('div');
  head.className = 'tc-wiz-head';
  head.innerHTML = '<div class="tc-wiz-head__row"><span data-step-label></span><span data-pct></span></div><progress max="3" aria-label="Application progress"></progress>';
  form.parentNode.insertBefore(head, form);
  var label = head.querySelector('[data-step-label]'), pct = head.querySelector('[data-pct]'), bar = head.querySelector('progress');

  /* group headings, ahead of the first field of each group */
  var heads = HEADINGS.map(function (h) {
    var n = nodes[h[1]];
    if (!n) return null;
    var el = document.createElement('h3');
    el.className = 'tc-wiz-h';
    el.textContent = h[0];
    n.w.parentNode.insertBefore(el, n.w);
    return { el: el, id: h[1] };
  }).filter(Boolean);

  /* previous / next, with the platform's own submit button moved in beside them */
  var nav = document.createElement('div');
  nav.className = 'tc-wiz-nav';
  var back = document.createElement('button'); back.type = 'button'; back.textContent = 'Previous'; back.className = 'tc-wiz-back';
  var next = document.createElement('button'); next.type = 'button'; next.textContent = 'Next'; next.className = 'tc-wiz-next';
  var submit = form.querySelector('button[type="submit"]');
  nav.appendChild(back); nav.appendChild(next);
  if (submit) { submit.classList.add('tc-wiz-submit'); form.insertBefore(nav, submit); nav.appendChild(submit); }
  else form.appendChild(nav);

  function visible(id) {
    var m = MAP[id];
    if (m[0] !== step) return false;
    for (var i = 1; i < m.length; i++) if (!SHOW[m[i]]()) return false;
    return true;
  }
  function render() {
    Object.keys(nodes).forEach(function (id) {
      var on = visible(id), n = nodes[id];
      n.w.hidden = !on;
      n.req.forEach(function (r) { if (on) r.setAttribute('required', ''); else r.removeAttribute('required'); });
    });
    heads.forEach(function (h) { h.el.hidden = MAP[h.id][0] !== step; });
    label.textContent = 'Step ' + step + ' of 3';
    pct.textContent = Math.round(step / 3 * 100) + '%';
    bar.value = step;
    back.hidden = step === 1;
    next.hidden = step === 3;
    if (submit) submit.hidden = step !== 3;
  }
  function stepValid() {
    var bad = [].slice.call(form.querySelectorAll('[required]')).filter(function (r) { return !r.closest('[hidden]') && !r.checkValidity(); })[0];
    if (bad) { bad.reportValidity(); return false; }
    return true;
  }
  function go(d) {
    if (d > 0 && !stepValid()) return;
    step = Math.max(1, Math.min(3, step + d));
    render();
    head.scrollIntoView({ block: 'start' });
  }
  back.addEventListener('click', function () { go(-1); });
  next.addEventListener('click', function () { go(1); });
  form.addEventListener('change', function (e) {
    var t = e.target;
    if (t.name === P + 'taxall') form.querySelectorAll('input[name^="' + P + 'taxstate"]').forEach(function (c) { c.checked = t.checked; });
    render();
  });
  form.addEventListener('reset', function () { setTimeout(function () { step = 1; render(); }, 0); });
  render();
})();
