// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("http://localhost:5678/api/works");
const photos = await reponse.json();

//Création d'une function qui genere les photos
function genererPhotos(photos) {
  //Création d'une boucle qui va prendre toutes les photos
  for (let i = 0; i < photos.length; i++) {
    // Création des balises
    const article = photos[i];

    const sectionGallery = document.querySelector(".gallery");

    const articleElement = document.createElement("article");

    const titleElement = document.createElement("p");
    titleElement.innerText = article.title;

    const imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;

    const categoryIdElement = document.createElement("p");
    categoryIdElement.innerText = article.categoryId;

    //Ajout de articleElement dans sectionGallery

    sectionGallery.appendChild(articleElement);

    //Ajout de nos balises au DOM
    articleElement.appendChild(imageElement);
    articleElement.appendChild(titleElement);
  }
}
//permet de generer les photos non filtrés par default
genererPhotos(photos);

const reponseFilt = await fetch("filtre.json");
const filtres = await reponseFilt.json();

function genFiltres(filtres) {
  for (let i = 0; i < filtres.length; i++) {
    const div = filtres[i];

    const sectionFiltres = document.querySelector(".filterCategory");

    const divEl = document.createElement("div");
    divEl.classList.add("filterChoice", "data-id[i]");
    divEl.innerText = div.name;

    //const nameFiltres = document.createElement("p");
    //nameFiltres.innerText = div.name;

    //divEl.appendChild(nameFiltres);

    sectionFiltres.appendChild(divEl);
  }
}
genFiltres(filtres);

// Permet de selectionner toutes les filterchoice

//console.log(Array.from(document.querySelectorAll(".filterChoice")));

Array.from(document.querySelectorAll(".filterChoice")).forEach((el) => {
  el.addEventListener("click", (event) => {
    const categoryId = event.target.dataset.id;
    console.log("Category", categoryId);
    const photosFiltrees4 = photos.filter(function (photo) {
      return photo.categoryId == categoryId;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererPhotos(photosFiltrees4);
  });
});

//modification du site apres login
let monToken = localStorage.getItem("token");
let afficherValeur = document.querySelector(".postlogin");
let enleverSeLog = document.querySelector("#selog");
let seDeLogin = document.querySelector(".sedelog");

console.log(monToken);

if (monToken === null) {
  afficherValeur.style.display = "none";
} else {
  afficherValeur.style.display = "block";
  enleverSeLog.style.display = "none";
}
/*
seDeLogin.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("Key");
  localStorage.removeItem("email");
  localStorage.removeItem("myPassword");
  window.location.reload();
});*/
