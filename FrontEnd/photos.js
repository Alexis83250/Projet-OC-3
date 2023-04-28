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

    const idElement = document.createElement("p");
    idElement.innerText = article.id;

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

// MODAL -----------------------------

const reponseFilt = await fetch("filtre.json");
const filtres = await reponseFilt.json();

function genFiltres(filtres) {
  for (let i = 0; i < filtres.length; i++) {
    const div = filtres[i];

    const sectionFiltres = document.querySelector(".filterCategory");

    const divEl = document.createElement("div");
    divEl.classList.add("filterChoice");
    divEl.dataset.id = [i];
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
    if (categoryId <= 0) {
      document.querySelector(".gallery").innerHTML = "";
      genererPhotos(photos);
    } else {
      const photosFiltrees4 = photos.filter(function (photo) {
        return photo.categoryId == categoryId;
      });
      document.querySelector(".gallery").innerHTML = "";
      genererPhotos(photosFiltrees4);
    }
  });
});

//modification du site apres login -----------------------------------------
let monToken = localStorage.getItem("token");
//Faire ça à créer un tableau
let afficherValeur = document.querySelectorAll(".postlogin");
let enleverSeLog = document.querySelector("#selog");
let seDeLogin = document.querySelector(".sedelog");
let filtre1 = document.querySelector(".filterCategory");

if (monToken === null || monToken === undefined) {
  Array.from(afficherValeur).forEach((el) => {
    el.style.display = "none";
  });
} else {
  Array.from(afficherValeur).forEach((el) => {
    el.style.display = "block";
    enleverSeLog.style.display = "none";
    filtre1.style.display = "none";
  });
}

seDeLogin.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.reload();
});

//---------------MODAL--------------------
//OUVRIR LA MODAL----------------------------------

const target = document.querySelector("#modal1");

const openModal = function (e) {
  e.preventDefault();
  target.style.display = null;
  target.setAttribute("aria-hidden", "false");
  target.setAttribute("aria-modal", "true");
  document
    .querySelector(".contenu-enlever")
    .addEventListener("click", stopPropagation);
  document
    .querySelector(".modal-photo")
    .addEventListener("click", stopPropagation);
};

document.querySelector(".js-modal").addEventListener("click", openModal);
//CLOSE LA MODAL----------------------------------
const stopPropagation = function (e) {
  e.stopPropagation();
};

const closeModal = function (e) {
  e.preventDefault();

  document
    .querySelector(".contenu-enlever")
    .removeEventListener("click", stopPropagation);
  document
    .querySelector(".modal-photo")
    .removeEventListener("click", stopPropagation);
  target.style.display = "none";
  target.setAttribute("aria-hidden", "true");
  target.setAttribute("aria-modal", "false");
};

document.querySelector(".modal").addEventListener("click", closeModal);
document.querySelector(".close").addEventListener("click", closeModal);

//---------CHANGER VISUEL MODAL------------
const target1 = document.querySelector(".contenu-enlever");
const target2 = document.querySelector(".modal-photo");
const target3 = document.querySelector(".return");

const changeModal = function (e) {
  e.preventDefault();
  target1.style.display = "none";
  target2.style.display = null;
};

document.querySelector("#validerModale").addEventListener("click", changeModal);

const returnModal = function (e) {
  e.preventDefault();
  target1.style.display = null;
  target2.style.display = "none";
};

document.querySelector(".return").addEventListener("click", returnModal);
/* -----------FERMER LA DEUXIEME MODALE ----------*/
document.querySelector(".close2").addEventListener("click", closeModal);

// Récupération des pièces depuis le fichier JSON
const reponseModal = await fetch("http://localhost:5678/api/works");
const photosModal = await reponseModal.json();

//Création d'une function qui genere les photos
function genererPhotosModal(photosModal) {
  //Création d'une boucle qui va prendre toutes les photos
  for (let i = 0; i < photosModal.length; i++) {
    // Création des balises
    const article = photosModal[i];

    const sectionGallery = document.querySelector(".galleryModal");

    const articleElement = document.createElement("article");
    articleElement.classList.add("photosRealisation");
    articleElement.dataset.id = [i];

    const idElement = document.createElement("p");
    idElement.innerText = article.id;

    const titleElement = document.createElement("p");
    titleElement.innerText = "editer";

    const iconeElement = document.createElement("div");
    iconeElement.classList.add("deletePhoto");
    iconeElement.innerText = "III";

    const imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;

    const categoryIdElement = document.createElement("p");
    categoryIdElement.innerText = article.categoryId;

    //Ajout de articleElement dans sectionGallery

    sectionGallery.appendChild(articleElement);

    //Ajout de nos balises au DOM
    articleElement.appendChild(imageElement);
    articleElement.appendChild(titleElement);
    articleElement.appendChild(iconeElement);
    //--------------Suppression photo----------------
    iconeElement.addEventListener("click", async () => {
      const iconeElement = article.id;
      console.log(iconeElement);
      let response = await fetch("http://localhost:5678/api/works/id", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // if HTTP-status is 200-299
        alert("Photo supprimé avec succes");
        // obtenir le corps de réponse (la méthode expliquée ci-dessous)
      } else {
        alert("Echec de suppression");
      }
    });

    //---------------FIN DE GENERER PHOTO--------------------
  }
}
//permet de generer les photos non filtrés par default
genererPhotosModal(photosModal);

//---------------FIN DE GENERER PHOTO--------------------

// ajout d'une photo avec input file------------------

const ajoutPhoto = document.querySelector(".filePhoto");
ajoutPhoto.addEventListener("click", getImage);

function getImage() {
  let filePht = document.getElementById("#ajouter-photo").files;
  const imageElement = document.createElement("img");
  imageElement.classList.add("maNouvelleImage");
  imageElement.src = filePht;

  const afficherPhoto = (document.querySelector(".aj-photo").innerHTML = "");
  imageElement.appendChild(afficherPhoto);
}

//Ajouter une photo avec id dans l'API-------------------

const btnEnvoyerObj = document.querySelector("#valider");
btnEnvoyerObj.addEventListener("click", async (e) => {
  e.preventDefault();
  let photosExistant = photosModal.length;

  let formData = new FormData();

  // fichier HTML choisi par l'utilisateur
  formData.append("id", photosExistant++);
  formData.append("title", document.getElementById("#titre").value);
  formData.append(
    "categoryId",
    document.getElementsByClassName("#maNouvelleImage")
  );

  // objet JavaScript de type fichier
  let blob = new Blob([content], { type: "text/xml" });

  formData.append("imageUrl", blob);
  let request = new XMLHttpRequest();
  request.open("POST", "http://localhost:5678/api/works");
  request.send(formData);
});
