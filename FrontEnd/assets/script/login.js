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
      accessToken = userData.token; // Récupère le jeton d'accès de la réponse JSON
    
      localStorage.setItem("connected", "true"); // stock les éléments en local 
      localStorage.setItem('token', accessToken); // stock le jeton token en local

      window.location.href = 'index.html'; // redirige vers la page d'accueil
    })
    .catch(error => {
      console.log('Une erreur s\'est produite :', error);
      alert(error.message);
    });
});

