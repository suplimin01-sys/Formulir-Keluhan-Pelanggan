const scriptURL = 'https://script.google.com/macros/s/AKfycbxEriKHgUXDdQbkQLFs47IoVz4xAkbXh2WKX9AIjE2eawitik-SjNGvRZwjl4XuLY3w/exec';
const form = document.getElementById('complaintForm');
const btn = document.getElementById('submitBtn');
const msg = document.getElementById('statusMessage');
const resultDisplay = document.getElementById('resultDisplay');
const summaryContent = document.getElementById('summaryContent');

form.addEventListener('submit', e => {
    e.preventDefault();
    btn.disabled = true;
    btn.innerText = 'Sedang Mengirim...';
    
    const formData = new FormData(form);
    const dataObj = Object.fromEntries(formData.entries());

    fetch(scriptURL, { method: 'POST', body: formData})
        .then(response => {
            btn.disabled = false;
            form.classList.add('hidden');
            document.getElementById('formHeader').classList.add('hidden');
            
            msg.classList.remove('hidden');
            msg.classList.add('success');
            msg.innerText = 'Keluhan Berhasil Diterima!';

            resultDisplay.classList.remove('hidden');
            summaryContent.innerHTML = `
                <div class="summary-item"><strong>Nama:</strong> ${dataObj.nama}</div>
                <div class="summary-item"><strong>Kategori:</strong> ${dataObj.kategori}</div>
                <div class="summary-item"><strong>Pesan:</strong> ${dataObj.pesan}</div>
            `;
        })
        .catch(error => {
            btn.disabled = false;
            btn.innerText = 'Kirim Keluhan';
            msg.classList.remove('hidden');
            msg.classList.add('error');
            msg.innerText = 'Gagal mengirim. Cek koneksi atau URL script.';
        });
});
