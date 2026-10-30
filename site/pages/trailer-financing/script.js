/* Loan payment estimator.
   A behaviour cannot do this: the eight move, show, hide and filter existing
   DOM, and none of them computes an amortised payment. Scoped to the band's
   own node so a second calculator on the page keeps its own figures. */
(function () {
  var money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  var num = function (el) {
    var v = parseFloat(String(el && el.value || '').replace(/[^0-9.\-]/g, ''));
    return isFinite(v) ? v : 0;
  };

  function wire(root) {
    var calc = root.classList && root.classList.contains('tc-calc') ? root : root.querySelector('.tc-calc');
    if (!calc || calc.dataset.tcWired) return;
    calc.dataset.tcWired = '1';

    var loan = calc.querySelector('[name="loan"]');
    var down = calc.querySelector('[name="down"]');
    var rate = calc.querySelector('[name="rate"]');
    var term = calc.querySelector('[name="term"]');
    var unit = calc.querySelector('[name="unit"]');
    var out = {};
    calc.querySelectorAll('[data-out]').forEach(function (el) { out[el.dataset.out] = el; });

    function render() {
      var principal = Math.max(0, num(loan) - num(down));
      var months = Math.round(num(term) * (unit && unit.value === 'months' ? 1 : 12));
      var monthlyRate = num(rate) / 100 / 12;
      var payment;
      if (!principal || months <= 0) payment = 0;
      else if (monthlyRate <= 0) payment = principal / months;
      else {
        var growth = Math.pow(1 + monthlyRate, months);
        payment = principal * monthlyRate * growth / (growth - 1);
      }
      var paid = payment * (months > 0 ? months : 0);
      var interest = Math.max(0, paid - principal);
      if (out.monthly) out.monthly.textContent = money.format(payment || 0);
      if (out.principal) out.principal.textContent = money.format(principal);
      if (out.interest) out.interest.textContent = money.format(interest);
      if (out.total) out.total.textContent = money.format(principal + interest);
    }

    [loan, down, rate, term, unit].forEach(function (el) {
      if (!el) return;
      el.addEventListener('input', render);
      el.addEventListener('change', render);
    });
    render();
  }

  document.querySelectorAll('.tc-calc').forEach(wire);
})();