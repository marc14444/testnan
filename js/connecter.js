document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('adminToken');
    const emailElement = document.getElementById('userEmail');

    if (token) {
        // Décoder le token (attention, ce n'est pas sécurisé côté client pour des actions sensibles)
        const payload = JSON.parse(atob(token.split('.')[1])); // Décodage base64
        const email = payload.data.email;

        if (email) {
            emailElement.textContent = email;
        } else {
            emailElement.textContent = 'Email non disponible';
        }
    } else {
        emailElement.textContent = 'Non connecté';
    }
});