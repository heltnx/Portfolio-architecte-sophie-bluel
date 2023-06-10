
/*   INFO   "await" est utilisé pour attendre que 
  la requête soit résolue à chaque étapes 
  il ne peut être utilisé que dans une fonction "async" */

/* fonction pour récupérer les données */

async function getworks(){

    const reponse = await fetch("http://localhost:5678/api/works"); // Envoi une requête GET à l'API pour récupérer les données
    
    works = await reponse.json(); // Conversion de la réponse en format JSON et stockage dans la variable 'works'
}

/**--- remplir la galerie ----*/

// Sélection du 1er élément HTML de la class 'gallery'

const gallery = document.querySelector(".gallery"); 

// fonction pour afficher les données dans la galerie

async function showWorks(){ 
   
    await getworks();  // Appel de la fonction 'getworks' pour récupérer les données

   
    works.forEach(element => {  // Parcours de chaque élément dans le tableau 'works'
       
        gallery.innerHTML +=  // Génére le contenu HTML pour chaque element
        `<figure>
            <img src="${element.imageUrl}" alt="${element.title}">
            <figcaption>${element.title}</figcaption>
        </figure>` ;
    });
}

// Appel de la fonction 'showWorks' pour afficher les donnees dans la galerie

showWorks();
