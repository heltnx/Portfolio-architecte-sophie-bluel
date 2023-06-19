
// fonction pour récupérer les données dans l'api
async function getworks() {
  const reponse = await fetch("http://localhost:5678/api/works"); // Envoi une requête GET à l'API pour récupérer les données
  works = await reponse.json(); // Conversion de la réponse en format JSON et stockage dans la variable 'works'
}

//fonction pour générer le modèle HTML d'un élément
function genererHTML(element) {
  return `
    <figure>
      <img src="${element.imageUrl}" alt="${element.title}">
      <figcaption>${element.title}</figcaption>
    </figure>
  `;
}

// fonction ouvrir la page avec le bandeau edition si login ok
function open_edition() {
  const connected = localStorage.getItem("connected");
  const elements = document.querySelectorAll(".modification");
  elements.forEach(element => {

    if (connected == "connected") {
      element.classList.add('modification-active');
    } else {
      element.classList.remove('modification-active');
    }
  });
}
function close_edition() {
   window.addEventListener('beforeunload', function() {
    localStorage.removeItem("connected");
  });
}
// fonction pour afficher les données dans la galerie
const gallery = document.querySelector(".gallery"); // Sélection du 1er élément HTML de la class 'gallery'

async function showWorks() {

  await getworks();  // Appel de la fonction 'getworks' pour récupérer les données
  works.forEach(element => {  // Parcours de chaque élément dans le tableau 'works'
    gallery.innerHTML += genererHTML(element) // Génére le contenu HTML pour chaque element

  });
}

/** ajouts des boutons filtres ----------------------------------------------*/

let divFiltres = document.createElement("div"); // Création de la div "filtres"
divFiltres.setAttribute("id", "filtres"); // ajoute id = "filtres" à la div

// ajout des boutons avec id de la categorie dans le html
divFiltres.innerHTML = ` 
  <button id="0" class="active" >Tous</button>
  <button id="1" >Objets</button>
  <button id="2" >Appartements</button>
  <button id="3">Hotels & Restaurants</button>
`;

// affichage de la div "filtres" avec les boutons, dans le html
const sectionPortfolio = document.getElementById("portfolio"); // seletione la section html
const baliseh2 = sectionPortfolio.querySelector("h2"); // selectione l'element au dessus de la div à insérer (h2)
sectionPortfolio.insertBefore(divFiltres, baliseh2.nextSibling); // insère la div filtres après le "h2" dans le HTML



/**  Filtrer au click sur les boutons -----------------------------------*/

function categories(event) {
  const categoryId = event.target.id; // Récupère l'ID de la catégorie cliquée

  // récupère les éléments avec la même (categoryId) que celle cliquée ou tous les éléments (si categoryId == 0)
  const categorie = works.filter(element => element.categoryId == categoryId || categoryId == 0);

  // Générer le contenu HTML pour les éléments filtrés
  let galleryHTML = ""; // initialise un tableau vide
  categorie.forEach(element => { // Parcourt les éléments filtrés 
    galleryHTML += genererHTML(element) // génère le contenu HTML correspondant à chaque élément.
  });

  // Mettre à jour le contenu de la galerie avec les éléments filtrés
  gallery.innerHTML = galleryHTML;

  // Met à jour l'affichage des boutons actifs
  const buttons = divFiltres.getElementsByTagName("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.toggle("active", buttons[i] === event.target);
  }
}

 // Met à jour le lien "login/logout"
function changelogin() {
  const loginLink = document.getElementById("login-link");
  const connected = localStorage.getItem("connected");

  if (connected === "connected") {
    loginLink.innerText = "Logout";
  } else {
    loginLink.innerText = "Login";
  }
}

/**  Actions à executer ------------------------------------------------*/

//appel function "changelogin" passe sur "logout" sur "storage connected"
window.addEventListener("load", changelogin); // au chargement de la page
window.addEventListener("localStorage", changelogin); // au changement de "localStorage"

open_edition(); // appel function replace modification "active"
close_edition()

// Appel de la fonction 'showWorks' 
showWorks(); // affiche les données dans la galerie

// Ajout de l'écouteur d'événement à la "div filtres" (avec tous ses boutons)
divFiltres.addEventListener("click", categories); // au click appel fonction categories(event)




