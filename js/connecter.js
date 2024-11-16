document.addEventListener('DOMContentLoaded', () => {
    const emailElement = document.getElementById('userEmail');
    if (!emailElement) {
        console.error("Élément avec l'ID 'userEmail' introuvable !");
        return;
    }
    let myemail = localStorage.getItem('adminEmail');
    console.log("ton email est ici ho:", myemail);
    try {
        if (myemail) {
            emailElement.textContent = myemail;
        } else {
            emailElement.textContent = 'Email invalide';
        }
    } catch (error) {
        console.error("Erreur lors de l'accès à localStorage :", error);
    }
});