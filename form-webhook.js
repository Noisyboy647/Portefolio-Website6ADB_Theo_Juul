/**
 * Verstuurt sollicitatieformulier naar Make.com webhook (geen PHP).
 */
(function () {
  'use strict';

  var WEBHOOK_URL = 'https://hook.eu2.make.com/q7a56wf545m5vv1boz7uxmrs9413nxow';

  var form = document.getElementById('formulier');
  var voornaamEl = document.getElementById('voornaam');
  var achternaamEl = document.getElementById('achternaam');
  var emailEl = document.getElementById('email');
  var geboortedatumEl = document.getElementById('geboorte');
  var motivatieEl = document.getElementById('motivatie');
  var checkbox = document.getElementById('checkbox');
  var radiobox = document.getElementsByName('werk');

  function valideerNaam() {
    var voornaam = (voornaamEl.value || '').trim();
    var achternaam = (achternaamEl.value || '').trim();

    if (voornaam.length < 2 || achternaam.length < 2) {
      alert('Voornaam en achternaam moeten minstens 2 karakters bevatten.');
      return false;
    }
    return true;
  }

  function valideerGeboortedatum() {
    if (!geboortedatumEl.value) {
      alert('Vul je geboortedatum in.');
      return false;
    }
    return true;
  }

  function verzamelFormData() {

    // geselecteerde vaardigheden verzamelen
    var vaardighedenEls = document.querySelectorAll('.col input[type="checkbox"]:checked');
    var vaardigheden = [];

    for (var i = 0; i < vaardighedenEls.length; i++) {
      vaardigheden.push(vaardighedenEls[i].nextSibling.textContent.trim());
    }

//    var geluksgetalEl = document.getElementById('geluksgetal');

    return {
      voornaam: voornaamEl.value.trim(),
      achternaam: achternaamEl.value.trim(),
      email: emailEl.value.trim(),
      geboortedatum: geboortedatumEl.value,
      afdeling: document.getElementById('afdeling').value,
      ervaring: document.getElementById('ervaring').value,
//      werk: document.querySelector('input[name="werk"]:checked')?.value || '',
      beschikbaarheid: document.querySelector('input[name="beschikbaarheid"]:checked')?.value || '',
      startdatum: document.getElementById('startdatum').value,
      motivatie: motivatieEl.value,
      vaardigheden: vaardigheden,
      geluksgetal: document.getElementById('geluksgetal_input').value || 0,
      resultaat: document.getElementById('resultaat_input').value || 'Nog niet gespeeld'
    };
  }

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!valideerNaam() || !valideerGeboortedatum()) return;

    var data = verzamelFormData();

    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (res) {
        if (res.ok) {
          window.location.href = 'bedankt.html';
        } else {
          alert('Versturen mislukt. Probeer later opnieuw.');
        }
      })
      .catch(function () {
        alert('Fout bij versturen. Controleer je internetverbinding.');
      });
  });

})();
