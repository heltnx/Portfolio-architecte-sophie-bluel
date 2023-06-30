
/*---------- gestion ouverture fermetures modales ------------------------*/

let modal = null; // initialise la variable 'modal' à null (fermée)

//déclaration des variables
const divModalGallery = document.getElementById("galleryPhoto"); // modale 1 gallery
const divModalAjout = document.getElementById("ajout"); // modale 2 ajout
const fleche_retour = document.getElementById("retour"); // fleche retour 

// Fonction pour ajouter une classe d'un élément
function addClass(element, className) {
  element.classList.add(className);
}

// Fonction pour supprimer une classe d'un élément
function removeClass(element, className) {
  element.classList.remove(className);
}

// Fonction pour ouvrir la modale "gallery"
function opengallery() {
  addClass(divModalAjout, "hidden"); // cache le contenu de la modale "ajout"
  removeClass(divModalAjout, "active"); // supprime la class active
  removeClass(divModalGallery, "hidden"); // supprime le "display none"
  addClass(divModalGallery, "active"); // Ajoute le contenu de la modale "gallery"
}

// Fonction pour ouvrir la modale "ajout"
function openform() {
  addClass(divModalGallery, "hidden"); // cache le contenu de la modale "gallery"
  removeClass(divModalGallery, "active"); // supprime la class active
  addClass(divModalAjout, "active"); // Ajoute le contenu de la modale "ajout"
  removeClass(divModalAjout, "hidden"); // supprime le "display none"
}

// Fonction pour ouvrir la modale "principale" au click sur "modifier"
const open_modal = function (event) {
  event.preventDefault();
  const target = document.querySelector(event.target.getAttribute('href')); // selectionne la modale "cible" à partir de l'attribut href du lien cliqué (#modal1)
  target.style.display = null; //definit la modale avec une valeur par défaut à "null" (enlève le "display none")
  target.style.zIndex = "2"; // Définit un index z pour placer la modale au-dessus des autres éléments de la page
  target.removeAttribute('aria-hidden'); // Supprime aria-hidden pour rendre la modale accessible aux lecteurs d'écran
  target.setAttribute('aria-modal', true); // Ajoute aria-modal = true pour indiquer qu'il s'agit d'une modale
  
  opengallery();

  modal = target; // Attribue la modale actuelle à la variable 'modal'

  modal.addEventListener('click', close_modal); // au click "fermer la modale" 

  modal.querySelector('.js-modal-close').addEventListener('click', close_modal); // au click sur le bouton "fermer la modale"

  // Arrête la propagation du click "fermer la modale" à l'interieur de la modale
  modal.querySelector('.modal-contain').addEventListener('click', function (event) {
    event.stopPropagation(); 
  });
}

// Fonction pour "fermer la modale"
const close_modal = function (event) {
  if (modal === null) return; // Si la variable 'modal' est null, elle est déjà fermée, on ne fait rien.
  event.preventDefault();
  modal.style.display = "none"; // rend la modale invisible
  modal.setAttribute('aria-hidden', true); // Ajoute aria-hidden = true pour cacher la modale aux lecteurs d'écran
  modal.removeAttribute('aria-modal'); // Supprime l'attribut aria-modal pour indiquer que la modale n'est plus active
  modal.removeEventListener('click', close_modal); // Supprime le click pour "fermer la modale"
  modal.querySelector('.js-modal-close').removeEventListener('click', close_modal); // Supprime le click pour "fermer la modale" sur le bouton
  modal = null; // Réinitialise la variable 'modal' à null
}

/* ouvrir la modale au click sur un lien des elements ayant cette class ".js-modal" */
document.querySelectorAll('.js-modal').forEach(a => { // Sélectionne tous les éléments avec la classe 'js-modal'
  a.addEventListener("click", open_modal);
});


// click sur le bouton "Ajouter" dans la première modale
document.getElementById("ajouter").addEventListener("click", function () {
  openform();
});

// click sur la flêche "retour" de la modale "ajout"
document.getElementById("retour").addEventListener("click", function () {
  opengallery();
});



/*-------- remplis dynamiquement la modale Gallery Photo-----------------*/

// fonction pour générer le modèle HTML d'un élément de la modale
function genererHTMLmodale(element, index) {
  // Ajouter la classe "active" uniquement si l'index est égal à 0
  const mooveClass = index === 0 ? "active" : "";

  return `
    <article class="projet-modale">
      <div class="icon-action">
        <span class="icon-moove ${mooveClass}"><i class="fa-solid fa-arrows-up-down-left-right moove"></i></span>
        <span class="icon-contain"><i class="fa-solid fa-trash-can trash"></i></span>
      </div>
      <figure>
        <img src="${element.imageUrl}" alt="${element.title}">
        <span class="edit">éditer</span>
      </figure>
    </article>
  `;
}

// fonction pour afficher la galerie dans la modale
const gallery_modale = document.querySelector(".gallery-edit"); // Sélection du 1er élément HTML de la classe 'gallery-edit'

async function showPhotoModal() {
  await getworks(); // Appel de la fonction 'getworks' pour récupérer les données
  works.forEach((element, index) => { // Parcours de chaque élément dans le tableau 'works'
    gallery_modale.innerHTML += genererHTMLmodale(element, index); // Génère le contenu HTML pour chaque élément en passant l'index
  });
}

// Appel de la fonction 'showPhotoModal' 
showPhotoModal();

/** ---- ajout des "categories" ---- liste options ----------------------------------------------*/

getcategories()

//fonction pour générer le modèle HTML d'une categorie
function genererHTMLFormCategory(element) {
  return `
  <option value="${element.id}">${element.name}</option>
  `;
}

// fonction pour afficher les categories dans la liste
const form_category = document.querySelector("#form-category"); // Sélection du 1er élément HTML de la class 'gallery'

async function showFormCategory() {
  await getcategories();  // Appel de la fonction 'getworks' pour récupérer les données
  categories.forEach(element => {  // Parcours de chaque élément dans le tableau 'works'
    form_category.innerHTML += genererHTMLFormCategory(element) // Génére le contenu HTML pour chaque element
  });
}

// Appel de la fonction 'showcategories' 

showFormCategory(); // affiche les données dans la liste d'options


