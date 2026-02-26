const range = document.getElementById("ticketRange");
const display = document.getElementById("ticketCountDisplay");

range.addEventListener("input", function() {
    display.textContent = this.value;
});



document.getElementById("checkPromo").addEventListener("click", function() {
    const code = document.getElementById("promoCode").value.trim().toUpperCase();
    const feedback = document.getElementById("promoFeedback");

    if (code === "SALE10") {
        feedback.textContent = "Kortingscode correct!";
        feedback.className = "success";
    } else {
        feedback.textContent = "Ongeldige kortingscode.";
        feedback.className = "error";
    }
});

const endDate = new Date("March 13, 2026 23:59:59").getTime();

const timer = setInterval(function() {

    const now = new Date().getTime();
    const distance = endDate - now;

    if (distance <= 0) {
        clearInterval(timer);
        document.getElementById("countdown").textContent = "Actie is afgelopen!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    document.getElementById("countdown").textContent =
        days + "d " + hours + "u " + minutes + "m " + seconds + "s ";

}, 1000);


const vipRadio = document.getElementById("vip");
const ticketRadios = document.querySelectorAll('input[name="tickettype"]');
const vipOptions = document.getElementById("vipOptions");

ticketRadios.forEach(radio => {
    radio.addEventListener("change", function() {
        if (vipRadio.checked) {
            vipOptions.style.display = "block";
        } else {
            vipOptions.style.display = "none";
        }
    });
});


const radios = document.querySelectorAll('input[name="tickettype"]');
const workshops = document.querySelectorAll('input[name="workshop"]');
const promoBtn = document.getElementById("checkPromo");
const promoInput = document.getElementById("promoCode");
const promoFeedback = document.getElementById("promoFeedback");
const totalEl = document.getElementById("totalPrice");

let korting = false;
const workshopPrijs = 100;

function updatePrijs() {
    const selected = document.querySelector('input[name="tickettype"]:checked');
    const ticketPrijs = selected ? Number(selected.value) : 0;
    const aantal = Number(range.value);

    const workshopAantal =
        [...workshops].filter(w => w.checked).length;

    let totaal = ticketPrijs * aantal + (workshopAantal * workshopPrijs);

    if (korting) {
        totaal *= 0.8; 
    }

    totalEl.textContent = totaal.toFixed(2);
}


radios.forEach(r => r.addEventListener("change", updatePrijs));

range.addEventListener("input", function() {
    display.textContent = this.value;
    updatePrijs();
});


workshops.forEach(w => w.addEventListener("change", updatePrijs));


promoBtn.addEventListener("click", function() {
    const code = promoInput.value.trim().toUpperCase();

    if (code === "SALE10") {
        korting = true;
        promoFeedback.textContent = "20% korting toegepast";
        promoFeedback.className = "success";
    } else {
        korting = false;
        promoFeedback.textContent = "Ongeldige kortingscode";
        promoFeedback.className = "error";
    }

    updatePrijs();
});

updatePrijs();