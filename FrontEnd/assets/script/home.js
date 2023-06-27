
let works = [];
async function getworks() {
  const reponse = await fetch("http://localhost:5678/api/works"); // Envoi une requête GET à l'API pour récupérer les données
  works = await reponse.json(); // Conversion de la réponse en format JSON et stockage dans la variable 'works'
}

// fonction pour récupérer les categories dans l'api
let categories = [];
async function getcategories() {
  const reponse = await fetch("http://localhost:5678/api/categories"); // Envoi une requête GET à l'API pour récupérer les données
  categories = await reponse.json(); // Conversion de la réponse en format JSON et stockage dans la variable 'works'
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

//fonction pour générer le modèle HTML d'une categorie
function genererHTMLcategories(element) {
  return `
  <button id="${element.id}">${element.name}</button>
  `;
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

// fonction pour afficher les filtres 
const filtres = document.querySelector(".filtres"); // Sélection du 1er élément HTML de la class 'gallery'

async function showcategories() {
  await getcategories();  // Appel de la fonction 'getworks' pour récupérer les données
  categories.forEach(element => {  // Parcours de chaque élément dans le tableau 'works'
    filtres.innerHTML += genererHTMLcategories(element) // Génére le contenu HTML pour chaque element
  });
}



/**  Filtrer au click sur les boutons -----------------------------------*/

function filterworks(event) {
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
  const buttons = filtres.getElementsByTagName("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.toggle("active", buttons[i] === event.target);
  }
}
 
/**  Actions à executer ------------------------------------------------*/

// Appel de la fonction 'showWorks' 
showWorks(); // affiche les données dans la galerie

// Appel de la fonction 'showcategories' 
showcategories(); // affiche les données dans la galerie



// Ajout de l'écouteur d'événement à la "div filtres" (avec tous ses boutons)
filtres.addEventListener("click", filterworks); // au click appel fonction categories(event)




