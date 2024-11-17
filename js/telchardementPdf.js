document.getElementById('downloadPdf').addEventListener('click', function () {
    const { jsPDF } = window.jspdf; // Assurez-vous que jsPDF est bien importé
    const pdf = new jsPDF();

    // Définir les marges et les paramètres du PDF
    const margin = 10;
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    
    pdf.setFontSize(16);
    pdf.text('Liste des Employés', margin, margin + 10);

    // Récupérer les données du localStorage
    const data = JSON.parse(localStorage.getItem('ListeEmployer')) || [];

    // Créer un tableau avec les colonnes appropriées
    const tableColumn = ["Nom", "Prénom", "Email", "Téléphone", "Rôle", "Pays", "Ville", "Commune"]; // En-têtes du tableau
    const tableRows = [];

    // Vérifier que les données existent dans le localStorage
    if (data.data && data.data.length > 0) {
        // Trier les employés du plus récent au plus ancien
        data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Pour chaque employé, extraire les informations
        data.data.forEach(employe => {
            // Extraire les informations de chaque employé
            const employeDetails = [
                employe.nom,            // Nom
                employe.prenom,         // Prénom
                employe.email,          // Email
                employe.numeroTelephone, // Numéro de téléphone
                employe.role,           // Rôle
                employe.pays,           // Pays
                employe.ville,          // Ville
                employe.commune         // Commune
            ];
            tableRows.push(employeDetails); // Ajouter ces détails au tableau
        });

        // Ajouter une ligne supplémentaire pour le nombre total d'utilisateurs
        const totalUsers = data.data.length;
        const totalRow = Array(tableColumn.length - 1).fill(''); // Créer une ligne vide
        totalRow.push(`Total Employée: ${totalUsers}`); // Ajouter le total d'utilisateurs dans la dernière colonne
        tableRows.push(totalRow); // Ajouter cette ligne à la fin du tableau
    }

    // Ajouter un tableau avec des bordures et des couleurs
    pdf.autoTable({
        startY: margin + 20, // Position du tableau
        head: [tableColumn], // En-têtes
        body: tableRows, // Corps du tableau avec les données
        theme: 'grid', // Utiliser un thème de tableau avec des bordures
        headStyles: {
            fillColor: [0, 0, 255], // Couleur de fond de l'en-tête
            textColor: [255, 255, 255], // Couleur du texte de l'en-tête
            fontSize: 10,
            fontStyle: 'bold'
        },
        bodyStyles: {
            fontSize: 10,
            cellPadding: 3,
        },
        margin: { top: margin + 20 },
        styles: {
            cellWidth: 'auto', // Ajuster la largeur des colonnes automatiquement
            halign: 'center', // Centrer le texte horizontalement dans chaque cellule
            valign: 'middle', // Centrer le texte verticalement
        },
        columnStyles: {
            0: { cellWidth: 'auto' }, // Ajuster automatiquement la largeur de la colonne 'Nom'
            1: { cellWidth: 'auto' }, // Ajuster automatiquement la largeur de la colonne 'Prénom'
            2: { cellWidth: 'auto' }, // Ajuster automatiquement la largeur de la colonne 'Email'
            3: { cellWidth: 'auto' }, // Ajuster automatiquement la largeur de la colonne 'Téléphone'
            4: { cellWidth: 'auto' }, // Ajuster automatiquement la largeur de la colonne 'Rôle'
            5: { cellWidth: 'auto' }, // Ajuster automatiquement la largeur de la colonne 'Pays'
            6: { cellWidth: 'auto' }, // Ajuster automatiquement la largeur de la colonne 'Ville'
            7: { cellWidth: 'auto' }, // Ajuster automatiquement la largeur de la colonne 'Commune'
        },
        didDrawPage: function (data) {
            // Ajouter un pied de page ou des éléments supplémentaires
            const pageNumber = pdf.internal.pages.length;
            pdf.text(`Page ${pageNumber}`, pageWidth - 20, pageHeight - 10);
        }
    });

    // Télécharger le fichier PDF
    pdf.save('liste_employes_stylise.pdf');
});
