
//cibler le formulaire
document.querySelector('form').addEventListener('submit', function (event) {
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
    .then(response => { // Traite la réponse du serveur

      if (response.ok) { //si connection reussie !!!
        // Localstorage element
        localStorage.setItem("connected", true);

        window.location.href = 'index.html';//redirige vers la page d'

      } else { // si non,

        alert('"Erreur dans l’identifiant ou le mot de passe."');
      }
    })
    .catch(error => {
      console.log('Une erreur s\'est produite :', error);
    });
});

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

//appel function "changelogin" passe sur "logout" sur "storage connected"

window.addEventListener("load", changelogin); // au chargement de la page
window.addEventListener("localStorage", changelogin); // au changement de "localStorage"

open_edition(); // appel function replace modification "active"


