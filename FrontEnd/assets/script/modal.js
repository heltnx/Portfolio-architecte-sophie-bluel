
let modal = null; // initialise la variable 'modal' à null (fermée)

// Fonction pour ouvrir la modale
const open_modal = function(event){
    event.preventDefault();
    const target = document.querySelector(event.target.getAttribute('href')); // selectionne la modale "cible" à partir de l'attribut href du lien cliqué (#modal1)
    target.style.display = null; //definit la modale avec une valeur par défaut à "null" (enlève le "display none")
    target.style.zIndex = "2"; // Définit un index z pour placer la modale au-dessus des autres éléments de la page
    target.removeAttribute('aria-hidden'); // Supprime aria-hidden pour rendre la modale accessible aux lecteurs d'écran
    target.setAttribute('aria-modal', true); // Ajoute aria-modal = true pour indiquer qu'il s'agit d'une modale

    modal = target; // Attribue la modale actuelle à la variable 'modal'

    modal.addEventListener('click', close_modal); // au click "fermer la modale" 

    modal.querySelector('.js-modal-close').addEventListener('click', close_modal); // au click sur le bouton "fermer la modale"
    
    modal.querySelector('.modal-contain').addEventListener('click', function(event) { 
    event.stopPropagation(); // au click dans le conteneur de la modale

    event.stopPropagation(); // Arrête la propagation du click "fermer la modale" à l'interieur de la modale
});
}

// Fonction pour "fermer la modale"
const close_modal = function(event){
    if (modal === null) return ; // Si la variable 'modal' est null, elle est déjà fermée, on ne fait rien.
    event.preventDefault();
    modal.style.display = "none"; // rend la modale invisible
    modal.setAttribute('aria-hidden', true); // Ajoute aria-hidden = true pour cacher la modale aux lecteurs d'écran
    modal.removeAttribute('aria-modal'); // Supprime l'attribut aria-modal pour indiquer que la modale n'est plus active
    modal.removeEventListener('click', close_modal); // Supprime le click pour "fermer la modale"
    modal.querySelector('.js-modal-close').removeEventListener('click', close_modal); // Supprime le click pour "fermer la modale" sur le bouton
    modal = null; // Réinitialise la variable 'modal' à null
}

 /* action ouvrir la modale au click sur un lien de cette classe */
    document.querySelectorAll('.js-modal').forEach(a => { // Sélectionne tous les éléments avec la classe 'js-modal'
    a.addEventListener("click", open_modal); 
});

/*--------------contenu des modales------------------------------------*/

const divModalGallery = document.createElement("div");
divModalGallery.setAttribute("class", "modal-gallery");
divModalGallery.innerHTML = ` 
    <section class="modal2 modal-contain class="gallery">
        <h2>Galerie Photo</h2>
        <div class="gallery-edit"></div>
        <hr>
        <button id="ajouter">Ajouter une photo</button>
        <span id="supprimer">Supprimer la galerie</span>
    </section>
`;

const divModalAjout = document.createElement("div");
divModalAjout.setAttribute("class", "modal-gallery ajout");
divModalAjout.innerHTML = ` 
    <section class="modal-gallery modal-contain" >
    <img class="back-icon" id="retour" src="./assets/icons/back-svgrepo-com 1.png" alt="Flèche retour" />
        <h2>Ajout Photo</h2>
        <div class="picture">
            <img src="./assets/icons/picture.png" alt="modèle picture">
            <button id="picture-ajout">+ Ajouter photo</button>
            <span>jpg, png : 4mo max</span>
        </div>
        <hr>
        <button id="action">Valider</button>
    </section>
`;

/*---------gestionnaire d'évènements au click sur la modale--------- */

const asideModale = document.querySelector(".modal-contain");
asideModale.appendChild(divModalGallery);

// Variable pour suivre l'état de la fenêtre modale actuellement affichée
let currentModal = "gallery";

// click sur bouton "Modifier" (à l'extérieur de la fenêtre modale)
document.getElementById("modifier").addEventListener("click", function() {
    currentModal = "gallery"; // Met à jour l'état de la modale
    divModalGallery.style.display = "block"; // Affiche la première modale
});

// click sur le bouton "Ajouter" dans la première modale
document.getElementById("ajouter").addEventListener("click", function() {
    currentModal = "ajout"; // Met à jour l'état de la modale
    asideModale.removeChild(divModalGallery); // Supprime la première modale
    asideModale.appendChild(divModalAjout); // Ajoute la deuxième modale
});

// click sur la flêche "retour" de la deuxieme modale
asideModale.addEventListener("click", function(event) {
    if (event.target.id === "retour") {
        currentModal = "gallery"; // Met à jour l'état de la modale
        asideModale.removeChild(divModalAjout); // Supprime la deuxième modale
        asideModale.appendChild(divModalGallery); // Ajoute la première modale
    }
});

