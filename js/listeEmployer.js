window.addEventListener('load', async () => {
    try {
      // Récupérer le token depuis le localStorage
      const token = localStorage.getItem('adminToken');
    
      if (!token) {
        throw new Error('Token manquant. Vous devez vous connecter.');
      }
    
      // Appel de l'API pour récupérer la liste des employés avec le token dans l'en-tête
      const response = await fetch('https://testnanbackend.onrender.com/api/admin/employes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    
      // Vérification si la réponse est correcte
      if (!response.ok) {
        console.error('Erreur HTTP:', response.status);
        const errorResponse = await response.text();
        console.error('Détails de l\'erreur:', errorResponse);
        throw new Error('Erreur lors de la récupération des employés');
      }
    
      // Récupérer les données sous forme JSON
      const data = await response.json();
    
      // Vérification de la structure des données
      console.log('Données reçues:', data);  // Afficher la réponse pour mieux comprendre sa structure
  
      // Sélection de l'élément où afficher les employés
      const employeList = document.getElementById('employeList');
    
      // Vérifier si la réponse contient des employés
      if (data && data.data && Array.isArray(data.data)) {
        if (data.data.length > 0) {
          // Pour chaque employé, créer un élément <li> et l'ajouter à la liste
          data.data.forEach(employe => {
            const employeItem = document.createElement('li');
            employeItem.classList.add('border-b', 'pb-4', 'mb-4');
      
            // Création du contenu pour chaque employé avec boutons Modifier et Supprimer
            employeItem.innerHTML = `
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-semibold text-lg">${employe.nom} ${employe.prenom}</h4>
                  <p class="text-sm text-gray-500">${employe.email}</p>
                </div>
                <div>
                  <span class="text-sm text-gray-500">${employe.role}</span>
                </div>
                <div class="space-x-4">
                  <button class="text-blue-500 hover:underline" onclick="editEmploye('${employe._id}')">Modifier</button>
                  <button class="text-red-500 hover:underline" onclick="deleteEmploye('${employe._id}')">Supprimer</button>
                </div>
              </div>
            `;
      
            // Ajout de l'élément à la liste
            employeList.appendChild(employeItem);
          });
        } else {
          employeList.innerHTML = '<li>Aucun employé trouvé.</li>';
        }
      } else {
        employeList.innerHTML = '<li>La structure des données est incorrecte.</li>';
      }
    } catch (error) {
      console.error('Erreur:', error);
      const employeList = document.getElementById('employeList');
      employeList.innerHTML = '<li>Erreur de chargement des employés.</li>';
    }
  });
  
  
  // Fonction pour supprimer un employé
  async function deleteEmploye(id) {
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      alert('Vous devez vous connecter pour supprimer un employé.');
      return;
    }
  
    const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cet employé ?');
    if (confirmDelete) {
      try {
        // Appel de l'API pour supprimer l'employé
        const response = await fetch(`https://testnanbackend.onrender.com/api/admin/employes/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (!response.ok) {
          console.error('Erreur HTTP:', response.status);
          const errorResponse = await response.text();
          console.error('Détails de l\'erreur:', errorResponse);
          throw new Error('Erreur lors de la suppression de l\'employé');
        }
  
        // Rafraîchir la liste des employés après suppression
        alert('Employé supprimé avec succès.');
        location.reload();
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la suppression de l\'employé.');
      }
    }
  }
  
  window.addEventListener('load', async () => {
    try {
      // Récupérer le token depuis le localStorage
      const token = localStorage.getItem('adminToken');
    
      if (!token) {
        throw new Error('Token manquant. Vous devez vous connecter.');
      }
    
      // Appel de l'API pour récupérer des statistiques supplémentaires
      const response = await fetch('https://testnanbackend.onrender.com/api/admin/employes/stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    
      // Vérification si la réponse est correcte
      if (!response.ok) {
        console.error('Erreur HTTP:', response.status);
        const errorResponse = await response.text();
        console.error('Détails de l\'erreur:', errorResponse);
        throw new Error('Erreur lors de la récupération des statistiques');
      }
    
      // Récupérer les données sous forme JSON
      const data = await response.json();
    
      // Vérifier si la réponse contient bien les données statistiques
      console.log('Données reçues pour les statistiques:', data);
      
      // Mettre à jour le texte des statistiques
      const totalEmployes = data && data.data && data.data.count ? data.data.count : 0;
      document.querySelector('.text-3xl').textContent = totalEmployes;
    
      // Création d'un graphique avec Chart.js
      const ctx = document.getElementById('otherStatsChart').getContext('2d');
      
      // Exemple de graphique en barre avec le nombre d'employés
      new Chart(ctx, {
        type: 'bar', // Type de graphique (barres)
        data: {
          labels: ['Employés'], // Labels des données
          datasets: [{
            label: 'Total des Employés',
            data: [totalEmployes], // Données du graphique (ici, le nombre total d'employés)
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Couleur de fond des barres
            borderColor: 'rgba(75, 192, 192, 1)', // Couleur des bordures des barres
            borderWidth: 1
          }]
        },
        options: {
          responsive: true, // Réponse dynamique au redimensionnement
          scales: {
            y: {
              beginAtZero: true // Commencer l'échelle y à 0
            }
          }
        }
      });
    
    } catch (error) {
      console.error('Erreur:', error);
      document.querySelector('.text-3xl').textContent = 'Erreur de chargement';
    }
  });
  
  const editPopup = document.getElementById('editPopup');
const editForm = document.getElementById('editForm');
const employeIdInput = document.getElementById('employeId');
const editNom = document.getElementById('editNom');
const editPrenom = document.getElementById('editPrenom');
const editEmail = document.getElementById('editEmail');
const editRole = document.getElementById('editRole');
const cancelEdit = document.getElementById('cancelEdit');

// Fonction pour ouvrir le popup et charger les données de l'employé
async function editEmploye(id) {
  try {
    // Afficher le popup
    editPopup.style.display = 'flex';

    // Récupération du token
    const token = localStorage.getItem('adminToken');
    if (!token) {
      alert('Vous devez être connecté en tant qu\'administrateur.');
      return;
    }

    // Appel API pour récupérer les données de l'employé
    const response = await fetch(`https://testnanbackend.onrender.com/api/admin/employes/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des détails de l\'employé');
    }

    const { data: employe } = await response.json();

    // Pré-remplir les champs du formulaire
    employeIdInput.value = employe._id;
    editNom.value = employe.nom || '';
    editPrenom.value = employe.prenom || '';
    editEmail.value = employe.email || '';
    editRole.value = employe.role || 'Employé'; // Par défaut, Employé
  } catch (error) {
    console.error('Erreur:', error);
    alert('Impossible de charger les données de l\'employé.');
  }
}

// Fonction pour fermer le popup
cancelEdit.addEventListener('click', () => {
  editPopup.style.display = 'none';
});

// Soumission du formulaire de modification
editForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    // Récupération des données du formulaire
    const id = employeIdInput.value;
    const updatedEmploye = {
      nom: editNom.value.trim(),
      prenom: editPrenom.value.trim(),
      email: editEmail.value.trim(),
      role: editRole.value.trim(),
    };

    // Validation simple
    if (!updatedEmploye.nom || !updatedEmploye.prenom || !updatedEmploye.email) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Appel API pour mettre à jour les données de l'employé
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://testnanbackend.onrender.com/api/admin/employes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedEmploye),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour des données de l\'employé');
    }

    const { message, data } = await response.json();

    // Mise à jour réussie
    alert(message);
    editPopup.style.display = 'none';

    // Rechargez la liste des employés (ou mettez à jour uniquement l'employé modifié si vous avez un tableau)
    updateEmployeeInUI(data);
  } catch (error) {
    console.error('Erreur:', error);
    alert('Impossible de modifier les données de l\'employé.');
  }
});

// Fonction pour mettre à jour l'affichage dans l'interface utilisateur
function updateEmployeeInUI(employe) {
  const employeeRow = document.querySelector(`#employee-row-${employe._id}`);
  if (employeeRow) {
    employeeRow.querySelector('.employee-nom').textContent = employe.nom;
    employeeRow.querySelector('.employee-prenom').textContent = employe.prenom;
    employeeRow.querySelector('.employee-email').textContent = employe.email;
    employeeRow.querySelector('.employee-role').textContent = employe.role;
  }
}

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('adminToken');
    const emailElement = document.getElementById('userEmail');

    if (token) {
        // Décoder le token (attention, ce n'est pas sécurisé côté client pour des actions sensibles)
        const payload = JSON.parse(atob(token.split('.')[1])); // Décodage base64
        const email = payload.email;

        if (email) {
            emailElement.textContent = email;
        } else {
            emailElement.textContent = 'Email non disponible';
        }
    } else {
        emailElement.textContent = 'Non connecté';
    }
});
