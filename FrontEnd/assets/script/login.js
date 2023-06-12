    //cibler le formulaire
    document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission du formulaire
  
    // Récupère les valeurs des champs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Crée un objet de données JSON
    const data = {
      email,
      password
    };
  
    // Effectue une requête Fetch en utilisant la méthode POST
    fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      // Traite la réponse du serveur
      if (response.ok) { //connection reussie !!!
        alert('connection reussie.');// window.location.href = 'index.html';//redirige vers la page d'acceuil
      } else {
        alert('Échec de la connexion.');
      }
    })
    .catch(error => {
      console.log('Une erreur s\'est produite :', error);
    });
  });
  