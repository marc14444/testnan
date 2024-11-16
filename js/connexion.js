// Sélectionner le formulaire et les champs
const loginForm = document.getElementById('loginForm');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('motDePasse');

// Fonction pour gérer la soumission du formulaire
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();  // Empêcher le rechargement de la page lors de la soumission

    // Récupérer les valeurs des champs
    const email = emailField.value;
    const motDePasse = passwordField.value;
    

    // Vérifier si les champs sont remplis
    if (!email || !motDePasse) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    // Créer un objet de données pour l'envoi à l'API
    const loginData = {
        email: email,
        motDePasse: motDePasse
    };
    //sauvegarder l'email dans localStorage
    localStorage.setItem('adminEmail', loginData.email);

    // Faire une requête POST vers l'API
    try {
        const response = await fetch('https://testnanbackend.onrender.com/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        // Vérifier si la réponse est ok (statut 200)
        if (response.ok) {
            const data = await response.json();
            console.log(data); // Affiche la réponse du serveur dans la console

            // Si la connexion est réussie, rediriger vers le dashboard
            if (data.token) {
                // Sauvegarder le token dans localStorage
                localStorage.setItem('adminToken', data.token);
                
                // Redirection vers le dashboard
                window.location.href = './html/connecter.html'; 
            } else {
                alert('Erreur de connexion : ' + data.message);
            }
        } else {
            const errorData = await response.json();
            alert('Erreur : ' + errorData.message);
        }
    } catch (error) {
        console.error('Erreur de connexion:', error);
        alert('Erreur lors de la connexion, veuillez réessayer plus tard.');
    }
});