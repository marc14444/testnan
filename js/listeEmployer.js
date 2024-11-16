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
      const response = await fetch('http://localhost:9000/api/admin/employes/stats', {
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
  
  // Fonction pour afficher la popup de modification avec les données de l'employé
  function editEmploye(employeeId) {
    // Appel API pour récupérer les données de l'employé
    fetch(`https://testnanbackend.onrender.com/api/admin/employes/${employeeId}`, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
        // Si l'employé est trouvé
        if (data && data.data) {
            const employe = data.data;
            // Remplir le formulaire avec les données de l'employé
            document.getElementById('editEmployeeId').value = employe._id;
            document.getElementById('editNom').value = employe.nom;
            document.getElementById('editPrenom').value = employe.prenom;
            document.getElementById('editEmail').value = employe.email;
            document.getElementById('editNumeroTelephone').value = employe.numeroTelephone;
            document.getElementById('editRole').value = employe.role;
            document.getElementById('editPays').value = employe.pays;
            document.getElementById('editVille').value = employe.ville;
            document.getElementById('editCommune').value = employe.commune;
  
            // Afficher la popup
            document.getElementById('editEmployeeModal').classList.remove('hidden');
        } else {
            alert("Employé non trouvé.");
        }
    })
    .catch(error => {
        console.error("Erreur lors de la récupération des données de l'employé:", error);
    });
  }
  
  // Fonction pour fermer la popup de modification
  function closeEditEmployeeModal() {
    document.getElementById('editEmployeeModal').classList.add('hidden');
  }
  