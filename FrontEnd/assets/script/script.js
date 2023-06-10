let works;

async function getworks(){
    const reponse = await fetch("http://localhost:5678/api/works");
    works = await reponse.json();
}

/** remplir la gallery */

const gallery = document.querySelector(".gallery");

async function showWorks(){ 
    
    await getworks();

works.forEach(element => {
    gallery.innerHTML += 
    `<figure>
    <img src="${element.imageUrl}" alt="${element.title}">
    <figcaption>${element.title}</figcaption>
</figure>` ;
});

}

showWorks();
