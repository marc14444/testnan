document.addEventListener('DOMContentLoaded', () => {
    const emailElement = document.getElementById('userEmail');
    if (!emailElement) {
        console.error("Élément avec l'ID 'userEmail' introuvable !");
        return;
    }

    let myemail = null;
    try {
        myemail = localStorage.getItem('adminEmail');
    } catch (error) {
        console.error("Erreur lors de l'accès à localStorage :", error);
    }

    if (myemail) {
        const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
        if (isValidEmail(myemail)) {
            emailElement.textContent = myemail;
        } else {
            emailElement.textContent = 'Email invalide';
        }
    } else {
        emailElement.textContent = 'Non connecté';
    }
});