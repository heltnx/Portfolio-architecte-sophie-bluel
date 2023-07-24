//cibler le formulaire
document.querySelector('#loginForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Empêche la soumission du formulaire

  // Récupère les valeurs des champs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Crée un objet de données JSON
  const data = {
    email,
    password
  };

  // requête Fetch méthode POST
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {  // Traite la réponse du serveur
      if (response.ok) {  // si connexion réussie
        return response.json(); // Renvoie la réponse sous forme de JSON
      } else { // si non,
        throw new Error('Erreur dans l’identifiant ou le mot de passe.');
      }
    })
    .then(userData => {
      localStorage.setItem("connected", "true"); // stock l'état connecté en local 
      localStorage.setItem('token', userData.token); // stock le jeton token en local

      window.location.href = 'index.html'; // redirige vers la page d'accueil
    })

    /*--- gestion du message d'erreur ---*/

    .catch(error => {
      errorContainer.innerHTML = `
        <span>${error.message}</span>
        <button class="supprim-close">OK</button>
      `;
      errorGestion();
    });
});

// Fonction de réinitialisation de l'erreur
resetError(); 
 

