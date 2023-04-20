const reponse = await fetch("filtre.json");
const filtres = await reponse.json();

function genFiltres(filtres) {
  for (let i = 0; i < filtres.length; i++) {
    const div = filtres[i];

    const sectionFiltres = document.querySelector(".filterCategory");

    const divEl = document.createElement("div");
    divEl.classList.add("filterChoice");

    const nameFiltres = document.createElement("p");
    nameFiltres.innerText = div.name;

    sectionFiltres.appendChild(divEl);

    divEl.appendChild(nameFiltres);
  }
}
genFiltres(filtres);

/*

/*
Permet de selectionner toutes les filterchoice
*/

/*
console.log(Array.from(document.querySelectorAll(".filterChoice")));

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
});*/
