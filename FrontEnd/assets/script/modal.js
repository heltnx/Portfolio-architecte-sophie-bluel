let modal = null;

// Fonction pour ouvrir la modale
const open_modal = function(event){
    event.preventDefault();
    const target = document.querySelector(event.target.getAttribute('href')); // selectionne la modale "cible" à partir de l'attribut href du lien cliqué (#modal1)
    target.style.display = null; //definit la modale avec une valeur par défaut à "null" (enlève le "display none")
    target.style.zIndex = "2"; // Définit un index z pour placer la modal au-dessus des autres éléments de la page
    target.removeAttribute('aria-hidden'); // Supprime l'attribut aria-hidden pour rendre la modale accessible aux lecteurs d'écran
    target.setAttribute('aria-modal', true); // Ajoute l'attribut aria-modal = true pour indiquer qu'il s'agit d'une modale
    modal = target; // Affecte la modal actuelle à la variable 'modal'
    modal.addEventListener('click', close_modal); // Ajoute un écouteur d'événements pour fermer la modale lorsqu'on clique à l'intérieur
    modal.querySelector('.js-modal-close').addEventListener('click', close_modal); // Ajoute un écouteur d'événements pour fermer la modal lorsqu'on clique sur le bouton de fermeture
    event.stopPropagation(); // Arrête la propagation de l'événement (sans atteindre l'élément parent)
    
    // Ajoute un écouteur d'événements au conteneur de la modal pour arrêter la propagation du clic
    modal.querySelector('.modal-contain').addEventListener('click', function(event) {
    event.stopPropagation();
});
}

// Fonction pour fermer la modale
const close_modal = function(event){
    if (modal === null) return ; // Si la variable 'modal' est null, cela signifie que la modal est déjà fermée, donc on ne fait rien
    event.preventDefault();
    modal.style.display = "none"; // Masque la modal en la rendant invisible
    modal.setAttribute('aria-hidden', true); // Ajoute l'attribut aria-hidden avec la valeur true pour cacher la modal aux lecteurs d'écran
    modal.removeAttribute('aria-modal'); // Supprime l'attribut aria-modal pour indiquer que la modal n'est plus active
    modal.removeEventListener('click', close_modal); // Supprime l'écouteur d'événements pour fermer la modal lorsqu'on clique à l'intérieur
    modal.querySelector('.js-modal-close').removeEventListener('click', close_modal); // Supprime l'écouteur d'événements pour fermer la modal lorsqu'on clique sur le bouton de fermeture
    modal = null; // Réinitialise la variable 'modal' à null
}

// Sélectionne tous les éléments avec la classe 'js-modal' (les liens qui ouvrent la modal)
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener("click", open_modal); // Ajoute un écouteur d'événements pour ouvrir la modal lorsqu'on clique sur un lien
});







