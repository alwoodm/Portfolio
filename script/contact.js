const form = document.getElementById('form');
const toastContainer = document.getElementById('toast-container');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    showToast('alwood.site', 'Przetwarzanie...', 'info');

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
            showToast('alwood.site', 'Formularz został pomyślnie wysłany', 'success');
        } else {
            console.log(response);
            showToast('alwood.site', json.message, 'danger');
        }
    })
    .catch(error => {
        console.log(error);
        showToast('alwood.site', 'Coś poszło nie tak!', 'danger');
    })
    .then(function () {
        form.reset();
    });
});

function showToast(title, message, type) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.role = 'alert';
    toast.ariaLive = 'assertive';
    toast.ariaAtomic = 'true';

    const startTime = new Date();

    toast.innerHTML = `
        <div class="toast-header">
            <strong class="me-auto">${title}</strong>
            <small class="toast-time">0 seconds ago</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;

    toastContainer.appendChild(toast);

    const bootstrapToast = new bootstrap.Toast(toast, { autohide: false });
    bootstrapToast.show();

    const updateTime = () => {
        const now = new Date();
        const elapsedTime = Math.floor((now - startTime) / 1000);
        const toastTime = toast.querySelector('.toast-time');
        toastTime.textContent = `${elapsedTime} seconds ago`;
    };
    const interval = setInterval(updateTime, 1000);
    toast.querySelector('.btn-close').addEventListener('click', () => {
        clearInterval(interval);
    });
}
