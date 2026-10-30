/* Three-step credit application. The form is one platform form, so the layout is complete
   with this script off (every field in one column, as the dashboard canvas shows it); the
   script only decides which fields show. Step panels, conditional groups and the progress
   header follow the handoff's own wizard (js/wizard.js). */
(function () {
  var form = document.querySelector('form[data-bz-form="service-credit-application"]');
  if (!form) return;
  var step = 1;
  var P = 'sca-';
  /* field id -> step and the conditional groups it sits in */
  var MAP = {"sca-company-or-individual-name":[1],"sca-billing-mailing-address":[1],"sca-billing-city":[1],"sca-billing-state":[1],"sca-billing-zip":[1],"sca-shipsame":[1],"sca-shipping-address":[1,"hideShip"],"sca-shipping-city":[1,"hideShip"],"sca-shipping-state":[1,"hideShip"],"sca-shipping-zip":[1,"hideShip"],"sca-business-phone":[1],"sca-ext":[1],"sca-fax":[1],"sca-cell-phone":[1],"sca-yrs-in-business":[1],"sca-trucks-in-fleet":[1],"sca-federal-employer-id-no-fein":[1],"sca-no-of-employees":[1],"sca-business-email":[1],"sca-biztype":[1],"sca-ctype":[1,"hideCCorp"],"sca-if-publicly-traded-state-your-stock-ticker":[1,"hideCCorp","hideTicker"],"sca-domicile-city":[1],"sca-domicile-state":[1],"sca-accts-payable-contact-name":[1],"sca-a-p-phone":[1],"sca-a-p-fax":[1],"sca-accts-payable-e-mail":[1],"sca-requested-line-of-credit":[1],"sca-leased":[1],"sca-if-yes-to-whom":[1,"hideLeased"],"sca-leased-street":[1,"hideLeased"],"sca-leased-city":[1,"hideLeased"],"sca-leased-state":[1,"hideLeased"],"sca-leased-zip":[1,"hideLeased"],"sca-division":[1],"sca-location-iowa":[1,"hideLocIowa"],"sca-location-illinois":[1,"hideLocIllinois"],"sca-location-wisconsin":[1,"hideLocWisconsin"],"sca-location-indiana":[1,"hideLocIndiana"],"sca-location-michigan":[1,"hideLocMichigan"],"sca-location-ohio":[1,"hideLocOhio"],"sca-owner1-name":[2],"sca-owner1-ssn":[2],"sca-owner1-title":[2],"sca-owner1-address":[2],"sca-owner2-name":[2],"sca-owner2-ssn":[2],"sca-owner2-title":[2],"sca-owner2-address":[2],"sca-owner3-name":[2],"sca-owner3-ssn":[2],"sca-owner3-title":[2],"sca-owner3-address":[2],"sca-taxex":[2],"sca-taxall":[2,"hideTax"],"sca-taxstate":[2,"hideTax"],"sca-taxstate-2":[2,"hideTax"],"sca-taxstate-3":[2,"hideTax"],"sca-taxstate-4":[2,"hideTax"],"sca-taxstate-5":[2,"hideTax"],"sca-taxstate-6":[2,"hideTax"],"sca-taxstate-7":[2,"hideTax"],"sca-taxstate-8":[2,"hideTax"],"sca-taxstate-9":[2,"hideTax"],"sca-taxstate-10":[2,"hideTax"],"sca-taxstate-11":[2,"hideTax"],"sca-taxstate-12":[2,"hideTax"],"sca-taxstate-13":[2,"hideTax"],"sca-taxstate-14":[2,"hideTax"],"sca-taxstate-15":[2,"hideTax"],"sca-taxstate-16":[2,"hideTax"],"sca-taxstate-17":[2,"hideTax"],"sca-taxstate-18":[2,"hideTax"],"sca-taxstate-19":[2,"hideTax"],"sca-taxstate-20":[2,"hideTax"],"sca-taxstate-21":[2,"hideTax"],"sca-taxstate-22":[2,"hideTax"],"sca-taxstate-23":[2,"hideTax"],"sca-taxstate-24":[2,"hideTax"],"sca-taxstate-25":[2,"hideTax"],"sca-taxstate-26":[2,"hideTax"],"sca-taxstate-27":[2,"hideTax"],"sca-taxstate-28":[2,"hideTax"],"sca-taxstate-29":[2,"hideTax"],"sca-taxstate-30":[2,"hideTax"],"sca-taxstate-31":[2,"hideTax"],"sca-taxstate-32":[2,"hideTax"],"sca-taxstate-33":[2,"hideTax"],"sca-taxstate-34":[2,"hideTax"],"sca-taxstate-35":[2,"hideTax"],"sca-taxstate-36":[2,"hideTax"],"sca-taxstate-37":[2,"hideTax"],"sca-taxstate-38":[2,"hideTax"],"sca-taxstate-39":[2,"hideTax"],"sca-taxstate-40":[2,"hideTax"],"sca-taxstate-41":[2,"hideTax"],"sca-taxstate-42":[2,"hideTax"],"sca-taxstate-43":[2,"hideTax"],"sca-taxstate-44":[2,"hideTax"],"sca-taxstate-45":[2,"hideTax"],"sca-taxstate-46":[2,"hideTax"],"sca-taxstate-47":[2,"hideTax"],"sca-taxstate-48":[2,"hideTax"],"sca-taxstate-49":[2,"hideTax"],"sca-taxstate-50":[2,"hideTax"],"sca-po":[2],"sca-bank1-name":[2],"sca-bank1-type":[2],"sca-bank1-street":[2],"sca-bank1-city":[2],"sca-bank1-phone":[2],"sca-bank1-state":[2],"sca-bank1-zip":[2],"sca-bank1-acct":[2],"sca-bank1-contact":[2],"sca-bank2-name":[2],"sca-bank2-type":[2],"sca-bank2-street":[2],"sca-bank2-city":[2],"sca-bank2-state":[2],"sca-bank2-zip":[2],"sca-bank2-phone":[2],"sca-bank2-acct":[2],"sca-bank2-contact":[2],"sca-bank-finance-company":[2],"sca-tp-street":[2],"sca-tp-city":[2],"sca-tp-state":[2],"sca-tp-zip":[2],"sca-tp-phone":[2],"sca-tp-acct":[2],"sca-tp-contact":[2],"sca-trade1-name":[2],"sca-trade1-citystate":[2],"sca-trade1-fax":[2],"sca-trade1-phone":[2],"sca-trade2-name":[2],"sca-trade2-citystate":[2],"sca-trade2-fax":[2],"sca-trade2-phone":[2],"sca-trade3-name":[2],"sca-trade3-citystate":[2],"sca-trade3-fax":[2],"sca-trade3-phone":[2],"sca-print-name":[3],"sca-customer-signature":[3],"sca-date":[3],"sca-agree1":[3],"sca-agree2":[3],"sca-agree3":[3]};
  var HEADINGS = [["Owners, Partners or Officers", "sca-owner1-name"], ["Tax Exempt", "sca-taxex"], ["Credit References - Please Provide Two Bank References (Confidential)", "sca-bank1-name"], ["Truck Payment (if applicable) made to", "sca-bank-finance-company"], ["Major Trade References", "sca-trade1-name"]];
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
