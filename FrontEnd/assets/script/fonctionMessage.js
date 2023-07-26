
// Utilisation de la fonction pour les deux cibles
const messageContainer = document.querySelector(".messageContainer");
const messageContainerAjout = document.querySelector(".messageContainerAjout");

// Fonction de gestion des messages générique
function messageGestion(messageElement) {
  messageElement.classList.add("show-error"); // Ajouter la classe "show-error"
  let closeButton = messageElement.querySelector(".supprim-close");
  closeButton.addEventListener("click", function() {
    resetMessage(messageElement);
  });
}

// Fonction pour effacer les messages
function resetMessage(messageElement) {
  messageElement.innerHTML = ''; // Effacer le contenu de l'élément messageElement
}



