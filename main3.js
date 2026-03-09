const formulier = document.getElementById('foto-formulier');
const inputFoto = document.getElementById('foto');
const previewContainer = document.getElementById('preview-container');


inputFoto.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewContainer.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        }
        reader.readAsDataURL(file);
    }
});


formulier.addEventListener('submit', async function(e) {
    e.preventDefault();


    document.querySelector('.form-section').style.display = 'none';
    document.getElementById('laden').style.display = 'block';

    const formData = new FormData(formulier);
    const webhookUrl = 'https://hook.eu2.make.com/8r23kktwyiwpkfnty9iwc64n36x69667';

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('De server van Make reageert niet correct.');

       
        const flyerUrl = await response.text();

        
        if (flyerUrl && flyerUrl.trim().startsWith('http')) {
            document.getElementById('laden').style.display = 'none';
            document.getElementById('resultaat').style.display = 'block';
            
            const imgResult = document.getElementById('flyerAfbeelding');
            const downloadBtn = document.getElementById('downloadBtn');

           
            imgResult.src = flyerUrl.trim();

           
            downloadBtn.href = flyerUrl.trim();
            downloadBtn.target = "_blank"; 
            

            downloadBtn.onclick = function(event) {
                window.open(flyerUrl.trim(), '_blank');
                return false;
            };

        } else {
            console.error("Foutieve data ontvangen:", flyerUrl);
            throw new Error('ChatGPT heeft geen geldige link teruggestuurd. Controleer je Webhook Body in Make.');
        }

    } catch (error) {
        document.getElementById('laden').style.display = 'none';
        document.querySelector('.form-section').style.display = 'block';
        alert('Oeps! Er ging iets mis: ' + error.message);
    }
});