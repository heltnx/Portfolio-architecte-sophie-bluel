
// Fonction de réinitialisation de l'erreur
function errorGestion(){errorContainer.classList.add("show-error"); // Ajouter la classe "show-error"
    const errorCloseButton = errorContainer.querySelector(".supprim-close");
    errorCloseButton.addEventListener("click", resetError)};

function resetError() {
  errorContainer.innerHTML = ''; // Effacer le contenu de l'élément errorContainer
}