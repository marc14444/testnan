const user = JSON.parse(localStorage.getItem('userData'));

if (user) {
    document.getElementById('userEmail').textContent = `Bonjour🖖, ${user.data.nom}`;
} else {
    window.location.href = '../index.html';
}


function isAuthenticated() {
    const token = localStorage.getItem('adminToken');
    if (token) {
        // Vérifier si le token est valide (vous pouvez ajouter une logique supplémentaire ici)
        return true;
    }
    return false;
}
// Exemple d'utilisation de la fonction de vérification de session
if (isAuthenticated()) {
    console.log("L'admin est authentifié");
} else {
    console.log("L'admin n'est pas authentifié");
}