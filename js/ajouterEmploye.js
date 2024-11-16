document.getElementById('createEmployeeForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupération du token d'authentification depuis le localStorage
    const token = localStorage.getItem('adminToken');  // Adapte ceci en fonction de l'endroit où tu stockes le token

    if (!token) {
        alert('Token d\'authentification manquant. Veuillez vous connecter.');
        return;
    }

    const formData = new FormData();
    formData.append('nom', document.getElementById('nom').value);
    formData.append('prenom', document.getElementById('prenom').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('numeroTelephone', document.getElementById('numeroTelephone').value);
    formData.append('role', document.getElementById('role').value);
    formData.append('pays', document.getElementById('pays').value);
    formData.append('ville', document.getElementById('ville').value);
    formData.append('commune', document.getElementById('commune').value);

    try {
        const response = await fetch('https://testnanbackend.onrender.com/api/admin/employes', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,  // Ajout du token dans l'en-tête
            },
            body: formData, // Envoie le FormData, y compris l'image
        });

        const data = await response.json();
        if (response.ok) {
            alert('Employé créé avec succès');
            // Réinitialiser le formulaire si nécessaire
            document.getElementById('createEmployeeForm').reset();
        } else {
            alert('Erreur lors de la création de l\'employé : ' + data.message);
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi des données:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    }
});
