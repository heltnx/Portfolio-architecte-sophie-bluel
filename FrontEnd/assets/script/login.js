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
  
    /** ouvrir la page avec le bandeau edition si login ok */
    function open_edition() {
      const elements = document.querySelectorAll("body .modification");
      elements.forEach(element => {
        element.classList.replace('modification', 'modification-active');
      });
    }
    // requête Fetch méthode POST
      fetch('http://localhost:5678/api/users/login', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => { // Traite la réponse du serveur

          if (response.ok) { //si connection reussie !!!
            open_edition(); // function replace modification "active"
            window.location.href = 'index.html';//redirige vers la page d'

          } else { // si non,

            alert('Échec de la connexion.');
          }
        })
        .catch(error => {
          console.log('Une erreur s\'est produite :', error);
        });
    });
