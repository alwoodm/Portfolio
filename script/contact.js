// Deklaracja zmiennych
const form = document.getElementById('form');
const toastContainer = document.getElementById('toast-container');

// Obsługa zdarzenia submit formularza
form.addEventListener('submit', function (e) {
    // Zatrzymanie domyślnej akcji formularza
    e.preventDefault();

    // Pobranie danych z formularza i utworzenie obiektu JSON
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    // Wyświetlenie toasta informującego o przetwarzaniu formularza
    showToast('alwood.site', 'Przetwarzanie...', 'info');

    // Wysłanie formularza do Web3Forms
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })

    // Odpowiedź serwera
    .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
            showToast('alwood.site', 'Formularz został pomyślnie wysłany', 'success');
        } else {
            console.log(response);
            showToast('alwood.site', json.message, 'danger');
        }
    })

    // Błąd po stronie klienta
    .catch(error => {
        console.log(error);
        showToast('alwood.site', 'Coś poszło nie tak!', 'danger');
    })

    // Reset formularza po wysłaniu
    .then(function () {
        form.reset();
    });
});

// Funkcja wyświetlająca toast
function showToast(title, message, type) {
    const toast = document.createElement('div');
    toast.className = 'toast m-2';  // Dodanie klasy marginesu
    toast.role = 'alert';
    toast.ariaLive = 'assertive';
    toast.ariaAtomic = 'true';

    const startTime = new Date();
    
    toast.innerHTML = `
        <div class="toast-header">
            <strong class="me-auto">${title}</strong>
            <small class="toast-time">0 sekund temu</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;

    toastContainer.appendChild(toast);

    // Inicjalizacja Bootstrapa dla toastów
    const bootstrapToast = new bootstrap.Toast(toast, { autohide: false });
    bootstrapToast.show();

    // Aktualizacja czasu co sekundę
    const updateTime = () => {
        const now = new Date();
        const elapsedTime = Math.floor((now - startTime) / 1000);
        const toastTime = toast.querySelector('.toast-time');
        toastTime.textContent = `${elapsedTime} sekund temu`;
    };
    const interval = setInterval(updateTime, 1000);

    // Usuwanie toasta po 5 sekundach
    setTimeout(() => {
        bootstrapToast.hide();
        setTimeout(() => {
            clearInterval(interval);
            toast.remove();
        }, 150);
    }, 5000);

    // Usuń toast po zamknięciu
    toast.querySelector('.btn-close').addEventListener('click', () => {
        clearInterval(interval);
        toast.remove();
    });

    // Usuń toast po ukryciu
    toast.addEventListener('hidden.bs.toast', () => {
        clearInterval(interval);
        toast.remove();
    });
}
