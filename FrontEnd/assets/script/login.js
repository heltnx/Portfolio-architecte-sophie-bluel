let accessToken;

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
      const userId = userData.userId;
    
      localStorage.setItem("connected", "true"); // stock les éléments en local 
      localStorage.setItem("userId", userId); // stock l'id utilisateur en local 

      window.location.href = 'index.html'; // redirige vers la page d'accueil
    })
    .catch(error => {
      console.log('Une erreur s\'est produite :', error);
      alert(error.message);
    });
});

// fonction ouvrir la page avec le bandeau edition si login ok
function open_edition() {
  const connected = localStorage.getItem("connected");
  const elements = document.querySelectorAll(".modification");
  elements.forEach(element => {

    if (connected == "true") {
      element.classList.add('modification-active');
      // Utilise le jeton d'accès dans une autre requête ou pour effectuer des opérations
      fetch('http://localhost:5678/api/users/login', {
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Utilise le jeton d'accès dans l'en-tête Authorization
        },
        // Autres options de la requête
      })
        .then(response => {
          // Traiter la réponse de l'API
        })
        .catch(error => {
          // Gérer les erreurs
        });
    } else {
      element.classList.remove('modification-active');
    }
  });
}


// fonction ouvrir la page avec le bandeau edition si login ok
function open_edition() {
  const connected = localStorage.getItem("connected");
  const elements = document.querySelectorAll(".modification");
  elements.forEach(element => {

    if (connected == "true") {
      element.classList.add('modification-active');
    } else {
      element.classList.remove('modification-active');
    }
  });
}

// Met à jour le lien "login/logout"
function changelogin() {
  const loginLink = document.getElementById("login-link");
  const connected = localStorage.getItem("connected");

  if (connected) {
    loginLink.innerText = "Logout";
    loginLink.addEventListener("click", function () {
      // Effacer l'état de connexion du localStorage lors du clic sur le lien de déconnexion
      localStorage.removeItem("connected");
    });
  } else {
    loginLink.innerText = "Login";
    loginLink.removeEventListener("click", function () {
      // Supprime l'événement de clic sur le lien de déconnexion s'il existe
      localStorage.removeItem("connected");
    });
  }
}


function checkLoginStatus() {
  const connected = localStorage.getItem("connected");

  if (connected == "true") {
//appel function "changelogin" passe sur "logout" sur "storage connected"

window.addEventListener("load", changelogin); // au chargement de la page
window.addEventListener("localStorage", changelogin); // au changement de "localStorage"

open_edition(); // appel function replace modification "active"
  }
}




