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
// Generer filtre------------------------

//const reponseFilt = await fetch("filtre.json");
//const filtres = await reponseFilt.json();
const reponseFilt = await fetch("http://localhost:5678/api/categories");
const filtres = await reponseFilt.json();

//let filterTab = [filtres];
let filterTous = {
  id: 0,
  name: "Tous",
};

filtres.unshift(filterTous);

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
  document.getElementById("category").value = "";
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

    //Ajout de l'icone supprimé-----------
    const iconeElement = document.createElement("div");
    iconeElement.classList.add("deletePhoto");
    iconeElement.innerHTML =
      '<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.6 1.8V0.9C6.6 0.402944 6.19704 0 5.7 0H3.3C2.80294 0 2.4 0.402944 2.4 0.9V1.8H0V2.4H0.6V8.1C0.6 8.59704 1.00294 9 1.5 9H7.5C7.99704 9 8.4 8.59704 8.4 8.1V2.4H9V1.8H6.6ZM3 0.9C3 0.734316 3.13432 0.6 3.3 0.6H5.7C5.86568 0.6 6 0.734316 6 0.9V1.8H3V0.9ZM4.2 4.2V7.2H4.8V4.2H4.2ZM2.4 7.2V5.4H3V7.2H2.4ZM6 5.4V7.2H6.6V5.4H6Z" fill="white"/></svg>';

    const iconeElement2 = document.createElement("div");
    iconeElement2.classList.add("deletePhoto2");
    iconeElement2.innerHTML =
      '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.2364 5.81583L9.97332 4.55272C9.82886 4.40818 9.61143 4.36503 9.42271 4.44318C9.23391 4.52139 9.1108 4.7056 9.1108 4.90996V5.66783H6.33199V2.88898H7.08986C7.29421 2.88898 7.47843 2.76587 7.55664 2.57707C7.63482 2.38828 7.5916 2.17096 7.4471 2.02646L6.18399 0.763343C5.98671 0.566028 5.66679 0.566028 5.46947 0.763343L4.20636 2.02646C4.06186 2.17096 4.01865 2.38828 4.09683 2.57707C4.17504 2.76587 4.35928 2.88898 4.5636 2.88898H5.3215V5.66783H2.54266V4.90996C2.54266 4.7056 2.41955 4.52136 2.23076 4.44318C2.04193 4.365 1.82461 4.40822 1.68014 4.55272L0.417029 5.81583C0.219714 6.01314 0.219714 6.33303 0.417029 6.53035L1.68014 7.79346C1.77681 7.89013 1.90598 7.94146 2.03752 7.94146C2.10259 7.94146 2.16824 7.92887 2.23076 7.903C2.41955 7.82479 2.54266 7.64054 2.54266 7.43622V6.67832H5.3215V9.45716H4.56364C4.35928 9.45716 4.17504 9.58028 4.09686 9.76907C4.01868 9.95786 4.0619 10.1752 4.2064 10.3197L5.46951 11.5828C5.56813 11.6815 5.69744 11.7308 5.82675 11.7308C5.95606 11.7308 6.08537 11.6815 6.18399 11.5828L7.4471 10.3197C7.5916 10.1752 7.63482 9.95783 7.55664 9.76904C7.47843 9.58024 7.29421 9.45713 7.08986 9.45713H6.33199V6.67832H9.11084V7.43618C9.11084 7.64054 9.23391 7.82479 9.42274 7.90296C9.48522 7.92887 9.5509 7.94143 9.61598 7.94143C9.74744 7.94143 9.87669 7.8901 9.97332 7.79343L11.2364 6.53031C11.4338 6.33303 11.4338 6.01314 11.2364 5.81583Z" fill="white"/></svg>';

    const imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;

    const categoryIdElement = document.createElement("p");
    categoryIdElement.innerText = article.categoryId;

    //Ajouter l'icone modifié-----------
    if (articleElement.dataset.id == 0) {
      articleElement.appendChild(iconeElement2);
    }
    //Ajout de articleElement dans sectionGallery

    sectionGallery.appendChild(articleElement);

    //Ajout de nos balises au DOM
    articleElement.appendChild(imageElement);
    articleElement.appendChild(titleElement);
    articleElement.appendChild(iconeElement);

    //--------------Suppression photo--------------------------------
    iconeElement.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const iconeElement = article.id;
      let monToken = localStorage.getItem("token");
      //console.log(iconeElement);
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
  let errorMessage = "";

  if (document.querySelector("#ajouter-photo").files.length == 0) {
    errorMessage += "Merci de renseigner une image \n";
  }

  if (document.querySelector("#category").options.length == 0) {
    errorMessage += "Merci de renseigner une catégorie \n";
  }
  /*
  if (document.querySelector("#titre").value.length === 0) {
    errorMessage += "Merci de renseigner un titre \n";
  }*/
  //console.log(errorMessage);
  if (errorMessage.length) {
    alert(errorMessage);
  } else {
    //Object.fromEntries(new FormData(e.target).entries())
    const data = new FormData(photoForm);

    //console.log(data);
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
        //console.log(response.json());
      }
    });
  }
});
