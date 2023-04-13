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

    //Création des élements pour l'exercice
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText =
      article.description ?? "Pas de description pour le moment.";

    //Ajout de articleElement dans sectionGallery

    sectionGallery.appendChild(articleElement);

    //Ajout de nos balises au DOM
    articleElement.appendChild(imageElement);
    articleElement.appendChild(titleElement);
  }
}

genererPhotos(photos);
//Filtre des photos pas encore simplifié -------------

const filtre1 = document.querySelector(".choix1");

filtre1.addEventListener("click", function () {
  const photosFiltrees1 = photos.filter(function (photo) {
    return photo.categoryId <= 4;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererPhotos(photosFiltrees1);
});

const filtre2 = document.querySelector(".choix2");

filtre2.addEventListener("click", function () {
  const photosFiltrees2 = photos.filter(function (photo) {
    return photo.categoryId == 1;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererPhotos(photosFiltrees2);
});

const filtre3 = document.querySelector(".choix3");

filtre3.addEventListener("click", function () {
  const photosFiltrees3 = photos.filter(function (photo) {
    return photo.categoryId == 2;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererPhotos(photosFiltrees3);
});

const filtre4 = document.querySelector(".choix4");

filtre4.addEventListener("click", function () {
  const photosFiltrees4 = photos.filter(function (photo) {
    return photo.categoryId == 3;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererPhotos(photosFiltrees4);
});
