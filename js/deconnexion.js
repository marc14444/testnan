const deconnexion = document.getElementById('deconnexion');

// Gestion de la déconnexion
deconnexion.addEventListener('click', async () => {
    // Vérification si le token est présent dans le localStorage
    const token = localStorage.getItem('adminToken');
    if (token) {
        // Suppression du token du localStorage
        localStorage.removeItem('adminToken');
        alert('Vous avez été déconnecté avec succès.');
        window.location.href = '../index.html';
    } else {
        alert('Vous n\'êtes pas connecté.');
    }
});