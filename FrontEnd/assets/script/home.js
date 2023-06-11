
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
baliseh2.appendChild(divFiltres); // ajoute la div filtres au dessous du "h2" dans le html

/* fonction pour récupérer les données dans l' api ---------------------------*/
async function getworks(){
    const reponse = await fetch("http://localhost:5678/api/works"); // Envoi une requête GET à l'API pour récupérer les données
    works = await reponse.json(); // Conversion de la réponse en format JSON et stockage dans la variable 'works'
}


/**--- afficher tous les elements dans la galerie ---------------------------*/

// Sélection du 1er élément HTML de la class 'gallery'
const gallery = document.querySelector(".gallery"); 

//fonction pour générer le contenu HTML d'un élément
function genererHTML(element) {
  return `
    <figure>
      <img src="${element.imageUrl}" alt="${element.title}">
      <figcaption>${element.title}</figcaption>
    </figure>
  `;
}

// fonction pour afficher les données dans la galerie
async function showWorks(){ 
   
    await getworks();  // Appel de la fonction 'getworks' pour récupérer les données
    works.forEach(element => {  // Parcours de chaque élément dans le tableau 'works'
        gallery.innerHTML += genererHTML(element) // Génére le contenu HTML pour chaque element
      
    });
}

/**--- Filtrer au click sur les boutons ----------------------------------*/

function categories(event) {
  const categoryId = event.target.id; // Récupère l'ID de la catégorie cliquée
 
  // Filtrer les éléments en fonction de la catégorie
  const filteredWorks = works.filter(element => element.categoryId == categoryId || categoryId == 0);
  // La fonction 'filter' crée un nouveau tableau contenant uniquement les éléments qui satisfont la condition spécifiée.
  // Dans ce cas, les éléments avec la même catégorie (categoryId) que celle cliquée ou tous les éléments (si categoryId == 0) seront conservés.

  // Générer le contenu HTML pour les éléments filtrés
    let galleryHTML = "";
  filteredWorks.forEach(element => { // Parcourt les éléments filtrés et génère le contenu HTML correspondant à chaque élément.
    galleryHTML += genererHTML(element)
  });

  // Mettre à jour le contenu de la galerie avec les éléments filtrés
  gallery.innerHTML = galleryHTML;
  
}


// Ajout de l'écouteur d'événement au conteneur de boutons
divFiltres.addEventListener("click", categories);


// Appel de la fonction 'showWorks' pour afficher les donnees dans la galerie

showWorks();




