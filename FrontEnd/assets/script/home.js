// Vérifie si l'utilisateur est connecté
const connected = localStorage.getItem("connected");

// Fonction pour ouvrir la page avec le bandeau "édition" si la connexion est réussie
function openEdition() {
  const filtres = document.querySelector(".filtres");
  const elements = document.querySelectorAll(".modification");
  if (connected === "true") {
    elements.forEach(element => {
      element.classList.add('modification-active');
    });
    filtres.classList.add('filtres-hidden');
  }
}

// Met à jour le lien "login/logout"
function changeLogin() {
  const loginLink = document.getElementById("login-link");
  // connected ? si vrai logout : si faux login
  loginLink.innerText = connected ? "Logout" : "Login";
  // lors du clic sur le lien de déconnexion
  loginLink.addEventListener("click", function () {
    // Efface l'état de connexion du localStorage 
    localStorage.removeItem("connected");
    localStorage.removeItem("token");
  });
}

// Appel des fonctions pour activer les éléments d'édition
window.addEventListener("load", changeLogin); // au chargement de la page
openEdition();

/* ---- récuperer et afficher dynamiquement les éléménts dans la gallery via l'api ---*/

// fonction pour récupérer les éléments dans l'api
let works = []; //déclaration d'un tableau vide
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

// fonction pour afficher les données dans la galerie
const gallery = document.querySelector(".gallery"); // Sélection du 1er élément HTML de la class 'gallery'

async function showWorks() {
  gallery.innerHTML = ""; // Vide le contenu de la galerie
  await getworks();  // Appel de la fonction 'getworks' pour récupérer les données
  works.forEach(element => {  // Parcours de chaque élément dans le tableau 'works'
    gallery.innerHTML += genererHTML(element) // Génére le contenu HTML pour chaque element
  });
}

// Appel de la fonction 'showWorks' 
showWorks(); // affiche les données dans la galerie principale

/** ---- ajout des "categories" ---- boutons filtres ----------------------------------------------*/

// fonction pour récupérer les categories dans l'api
let categories = [];
async function getcategories() {
  const reponse = await fetch("http://localhost:5678/api/categories"); // Envoi une requête GET à l'API pour récupérer les données
  categories = await reponse.json(); // Conversion de la réponse en format JSON et stockage dans la variable 'works'
}

//fonction pour générer le modèle HTML d'une categorie
function genererHTMLcategories(element) {
  return `
  <button id="${element.id}">${element.name}</button>
  `;
}

// fonction pour afficher les filtres 
const filtres = document.querySelector(".filtres"); // Sélection du 1er élément HTML de la class 'gallery'

async function showcategories() {
  await getcategories();  // Appel de la fonction 'getworks' pour récupérer les données
  categories.forEach(element => {  // Parcours de chaque élément dans le tableau 'works'
    filtres.innerHTML += genererHTMLcategories(element) // Génére le contenu HTML pour chaque element
  });
}

// Appel de la fonction 'showcategories' 
showcategories(); // affiche les données dans la galerie

/**  Gestion du Filtrage au click sur les boutons -----------------------------------*/

function filterworks(event) {
  const categoryId = event.target.id; // Cible l'ID de la catégorie cliquée

  // Cible les éléments avec la même (categoryId) que celle cliquée ou tous les éléments (si categoryId == 0)
  const categorie = works.filter(element => element.categoryId == categoryId || categoryId == 0);

  // Générer le contenu HTML pour les éléments filtrés
  let galleryHTML = ""; // initialise une gallery vide
  categorie.forEach(element => { // Parcourt les éléments filtrés 
    galleryHTML += genererHTML(element) // génère le contenu HTML correspondant à chaque élément.
  });

  // Mettre à jour le contenu de la galerie avec les éléments filtrés
  gallery.innerHTML = galleryHTML;

  // Met à jour l'affichage des boutons actifs
  const buttons = filtres.getElementsByTagName("button"); // cible tous les butons de la div filtre 
  for (let i = 0; i < buttons.length; i++) { // parcours l’integralité des boutons
    buttons[i].classList.toggle("active", buttons[i] === event.target);
  }
}

// Ajout de l'écouteur d'événement à la "div filtres" (avec tous ses boutons)
filtres.addEventListener("click", filterworks); // au click appel fonction filterworks(event)




