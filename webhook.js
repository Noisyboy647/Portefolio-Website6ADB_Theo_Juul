(function () {
  'use strict';



  
  const WEBHOOK_URL = 'https://hook.eu2.make.com/6z2784p5acwo4tfc4npo1panjxekj377';
  const form = document.getElementById('reserveer');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const naamInput = document.getElementById('name').value.trim();
    const emailInput = document.getElementById('email').value.trim();
    const gdpr = document.getElementById('gdpr').checked;

    if (!naamInput || !emailInput) {
      alert("Vul naam en e-mail in.");
      return;
    }

    if (!gdpr) {
      alert("Je moet akkoord gaan met de GDPR terms.");
      return;
    }

    
    const naamDeel = naamInput.substring(0, 3).toUpperCase();
    const tijdDeel = Date.now().toString().slice(-4);
    const randomDeel = Math.floor(1000 + Math.random() * 9000);
    const ticketNr = `${naamDeel}${tijdDeel}${randomDeel}`;

    
    const selectedTicket = document.querySelector('input[name="tickettype"]:checked');
    if (!selectedTicket) {
      alert("Selecteer een ticket type.");
      return;
    }

   
    let ticketNaam = "";
    if (selectedTicket.id === "earlybird") ticketNaam = "Early Bird";
    if (selectedTicket.id === "standaard") ticketNaam = "Standaard";
    if (selectedTicket.id === "vip") ticketNaam = "VIP";

    
    const workshops = [];
    document.querySelectorAll('input[name="workshop"]:checked').forEach(cb => {
      workshops.push(cb.parentElement.innerText.trim());
    });

   
    const tshirt = document.getElementById('shirtSize')?.value || "";

  
    const totaalprijs = document.getElementById('totalPrice').innerText.replace("€", "").trim();

    let vip_message = "";

    if (selectedTicket.id === "vip") {
      vip_message = "Je bent een VIP, welkom en geniet van extra voordelen!";
    }



      const data = {
      ticketnummer: ticketNr,
      naam: naamInput,
      email: emailInput,
      telefoon: document.getElementById('telefoon')?.value || '',
      dieet: document.getElementById('dieet')?.value || '',
      ticket_type: ticketNaam,
      ticket_prijs: selectedTicket.value,
      aantal_tickets: document.getElementById('ticketRange')?.value || 1,
      workshops: workshops.join(', '),
      tshirt_maat: tshirt,
      kortingscode: document.getElementById('promoCode')?.value || '',
      totaalprijs: totaalprijs,
      vip_message: vip_message,
      gdpr_akkoord: gdpr
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert(`Succes! Je unieke ticketnummer is: ${ticketNr}`);
        window.location.href = "bedankt.html";
      } else {
        alert("Fout bij verzenden. Probeer opnieuw.");
      }

    } catch (error) {
      console.error(error);
      alert("Netwerkfout.");
    }
  });

})();