
/*---------- gestion ouverture fermetures modales ------------------------*/

let modal = null; // initialise la variable 'modal' à null (fermée)

//déclaration des variables
const divModalGallery = document.getElementById("galleryPhoto"); // modale 1 gallery
const divModalAjout = document.getElementById("ajout"); // modale 2 ajout

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
  event.preventDefault();
  modal.style.display = "none"; // Rend la modale invisible
  modal.setAttribute('aria-hidden', true); // Ajoute aria-hidden = true pour cacher la modale aux lecteurs d'écran
  modal.removeAttribute('aria-modal'); // Supprime l'attribut aria-modal pour indiquer que la modale n'est plus active
  modal.removeEventListener('click', close_modal); // Supprime le clic pour "fermer la modale"
  modal.querySelector('.js-modal-close').removeEventListener('click', close_modal); // Supprime le clic pour "fermer la modale" sur le bouton
  modal = null; // Réinitialise la variable 'modal' à null
};


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


/*-------- rempli dynamiquement la modale Gallery Photo-----------------*/

// fonction pour générer le modèle HTML d'un élément de la modale
function genererHTMLmodale(element, index) {
  console.log("Index de l'élément :", index, element);
  // Ajouter la classe "active" uniquement si l'index est égal à 0
  const mooveClass = index === 0 ? "active" : "";

  return `
    <article class="projet-modale">
      <div class="icon-action">
        <span class="icon-moove ${mooveClass}"><i class="fa-solid fa-arrows-up-down-left-right moove"></i></span>
        <span class="icon-contain"><i id="trash-icon-modal-${index}" class="fa-solid fa-trash-can trash" data-index="${element.id}"></i></span>
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
  await getworks();
  gallery_modale.innerHTML = ''; // Réinitialiser la galerie en vidant son contenu existant
  works.forEach((element, index) => {
    gallery_modale.innerHTML += genererHTMLmodale(element, index);
  });
}

// Appel de la fonction 'showPhotoModal' 
showPhotoModal();

/** ---- ajout des "categories" dans la liste selects ----------------------------------------------*/

// fonction dans home.js récupère les categories dans l'api
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
showFormCategory(); // affiche les données dans la liste


/** ---- ajout de la photo dans le formulaire ajout ----------------------------------------------*/

const fileUpload = document.getElementById("file-upload");
const selectedImage = document.getElementById("selected-image");

fileUpload.addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    selectedImage.src = event.target.result;
    selectedImage.style.display = "inline"; // Affiche l'image sélectionnée
    document.getElementById("picture-ajout").style.display = "none"; // Masque l'élément "picture-ajout"
  };

  reader.readAsDataURL(file);
});


/** ---- verification remplissage des champs / bouton coloré  ----------------------------------------------*/

// Sélection des champs du formulaire
const titleInput = document.getElementById('titre');
const imageInput = document.getElementById('file-upload');
const validerButton = document.getElementById('valider');

// Fonction pour vérifier si tous les champs sont remplis
function checkAllFieldsFilled() {
  if (titleInput.value.trim() !== '' && imageInput.files.length > 0) {
    validerButton.style.backgroundColor = '#1D6154'; // Modifier la couleur du bouton si les champs sont remplis
  } else {
    validerButton.style.backgroundColor = ''; // Réinitialiser la couleur du bouton si les champs ne sont pas tous remplis
  }
}

// Écouter l'événement "input" pour les champs du formulaire
titleInput.addEventListener('input', checkAllFieldsFilled);
imageInput.addEventListener('input', checkAllFieldsFilled);

/** ---- submit formulaire ajout ----------------------------------------------*/

//cibler le formulaire
document.getElementById('form-ajout').addEventListener('submit', function (event) {
  event.preventDefault(); // Empêche la soumission du formulaire

  // Récupère les valeurs du formulaire
  const title = document.getElementById('titre').value;
  const category = document.getElementById('form-category').value;
  const image = document.getElementById('file-upload').files[0];

  // Crée un objet FormData pour envoyer les données multipart/form-data
  const formData = new FormData();
  formData.append('image', image);
  formData.append('title', title);
  formData.append('category', category);

  // Envoie une requête POST à l'API pour ajouter une nouvelle Element
  const token = localStorage.getItem('token');// récupère le token en local

  fetch('http://localhost:5678/api/works', { // requête methode post
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  })
    .then(response => {  // Traite la réponse du serveur
      if (response.ok) {  // si la connexion réussit
        return response.json(); // Renvoie la réponse sous forme de JSON
      } else { // si non
        throw new Error('Erreur de connexion');
      }
    })
    .then(response => {
      const newWork = response; // Récupère les données de la nouvelle Element ajoutée

      // Ajoute la nouvelle Element à la galerie sans recharger la page
      const gallery = document.getElementById('gallery');
      const newWorkHTML = genererHTML(newWork); //fonction dans home.js
      gallery.insertAdjacentHTML('beforeend', newWorkHTML);
    })
});

/** ---- supprim Element de l'api DELETE Methode----------------------------------------------*/

// Fonction pour supprimer un Element
async function deleteWork(id) {
  const token = localStorage.getItem('token');// récupère le token en local
  return await fetch(`http://localhost:5678/api/works/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    },
  })

    .then(response => {
      if (response.ok) {
        alert(`l'Element ${id} a bien été supprimé.`);
      } else {
        alert(`Erreur lors de la suppression de l'Element ${id}.`);
      }
    })
    .catch(error => {
      alert(`Une erreur s'est produite lors de la suppression de l'Element ${id}:`, error);
    });
}

// Fonction pour mettre à jour la galerie après la suppression d'un Element

async function updateGallery(id) {
  try {
    const token = localStorage.getItem('token');// récupère le token en local
    const response = await fetch('http://localhost:5678/api/works', {

      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    if (response.ok) {
      const galleryData = await response.json();
      works = galleryData.works;
      gallery_modale.innerHTML = ''; // Réinitialiser la galerie en vidant le contenu
      works.forEach((element, index) => {
        gallery_modale.innerHTML += genererHTMLmodale(element, index); // Générer le contenu HTML pour chaque élément avec l'index
      });
      opengallery(false); // Ouvre la modale sans la fermer après la suppression d'un élément
    } else {
      throw new Error('Erreur lors de la récupération des données de la galerie après suppression.');
    }
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des données de la galerie après suppression:', error);
  }
}


// Gestionnaire d'événement pour le clic sur l'icône de corbeille
gallery_modale.addEventListener('click', (event) => {
  if (event.target.classList.contains('trash')) {
    const id = event.target.getAttribute('data-index');
    deleteWork(id)
      .then(() => {
        return updateGallery(id);
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la suppression et de la mise à jour de la galerie:', error);
      });
  }
});



