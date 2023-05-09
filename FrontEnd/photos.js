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
//let monUserId = localStorage.getItem("userId");
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
  localStorage.removeItem("userId");
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
document.querySelector(".close2").addEventListener("click", returnModal);
document.querySelector(".close2").addEventListener("click", closeModal);
document.querySelector(".close2").addEventListener("click", resetFields);
document.querySelector(".close2").addEventListener("click", changeColor);

function resetFields() {
  document.getElementById("titre").value = "";
  document.getElementById("categorie").value = "";
  document.querySelector(".nvPhoto").src = "";
}

//Changer le couleur de + Ajouter photo lorsuq'on click sur fermer
function changeColor() {
  filePhoto.style.backgroundColor = "#CBD6DC";
}

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
    iconeElement.innerHTML =
      '<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.6 1.8V0.9C6.6 0.402944 6.19704 0 5.7 0H3.3C2.80294 0 2.4 0.402944 2.4 0.9V1.8H0V2.4H0.6V8.1C0.6 8.59704 1.00294 9 1.5 9H7.5C7.99704 9 8.4 8.59704 8.4 8.1V2.4H9V1.8H6.6ZM3 0.9C3 0.734316 3.13432 0.6 3.3 0.6H5.7C5.86568 0.6 6 0.734316 6 0.9V1.8H3V0.9ZM4.2 4.2V7.2H4.8V4.2H4.2ZM2.4 7.2V5.4H3V7.2H2.4ZM6 5.4V7.2H6.6V5.4H6Z" fill="white"/></svg>';

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
      let monToken = localStorage.getItem("token");
      console.log(iconeElement);
      let response = await fetch(
        `http://localhost:5678/api/works/${iconeElement}`,
        {
          method: "DELETE",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${monToken}`,
          },
        }
      );
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
//console.log(monToken);

//---------------FIN DE GENERER PHOTO--------------------

// ajout d'une photo avec input file------------------
const nvPhoto = document.querySelector(".nvPhoto"),
  input = document.querySelector("#ajouter-photo"),
  filePhoto = document.querySelector(".filePhoto");

input.addEventListener("change", () => {
  nvPhoto.src = URL.createObjectURL(input.files[0]);
  filePhoto.style.backgroundColor = "#E8F1F6";
  //console.log(nvPhoto.src);
});

//Ajouter une photo avec id dans l'API-------------------

const photoForm = document.querySelector("#addPhotos");
photoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  e.stopPropagation();
  //Object.fromEntries(new FormData(e.target).entries())
  const data = new FormData(photoForm);

  //const formData = new FormData(data);
  /*
  const imgUrl = document.querySelector("#ajouter-photo").files;
  const title = document.getElementById("titre").value;
  const category = document.getElementById("categorie"); */

  console.log(data);

  const answer = await fetch("http://localhost:5678/api/works/", {
    method: "POST",
    headers: {
      //"Content-Type": "multipart/form-data",
      //Accept: "application/json",
      Authorization: `Bearer ${monToken}`,
    },
    body: data,
  }).then((response) => {
    if (response.ok) {
      console.log(response.json());
    }
  });
});

/*
function addNewPhotos(e) {
  e.preventDefault();
  e.stopPropagation();
  /*
  let nbPhotos = photosModal.length;
  let idNbPhotos = ++nbPhotos;

  const formData = new FormData();
  //const id = idNbPhotos;
  const title = formData.get("titre");
  const categoryId = formData.get("categorie");
  const image = formData.get("img");

  //const userId = parseInt(localStorage.getItem("userId"));

  for (const value of formData.values()) {
    console.log(value);
  }
  
}*/
