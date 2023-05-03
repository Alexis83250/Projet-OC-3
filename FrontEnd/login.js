const btnEnvoyer = document.querySelector("#valider");
btnEnvoyer.addEventListener("click", async (e) => {
  e.preventDefault();

  let user = {
    email: document.querySelector("#email").value,
    password: document.querySelector("#myPassword").value,
  };
  console.log(JSON.stringify(user));
  let response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    // if HTTP-status is 200-299

    // obtenir le corps de réponse (la méthode expliquée ci-dessous)
    let token = await response.json();
    let tok = token.token;
    let userId = token.userId;
    localStorage.setItem("token", tok);
    localStorage.setItem("userId", userId);
    window.location.href = "index.html";
  } else {
    alert("Erreur dans l’identifiant ou le mot de passe");
  }
});

/*
localStorage.setItem("email", document.querySelector("#email").value);
  localStorage.setItem(
    "myPassword",
    document.querySelector("#myPassword").value
  );*/
/*.then((response) => response.json())
    .then((data) => {
      console.log(data);
    });*/

/*if (response.ok) {
  //window.location.href = "index.html";
  let json = await response.json();
  localStorage.setItem("json", document.querySelector("json"));
  let tok = document.querySelector("json");
  console.log(tok);
} else {
  window.location.href = "login.html";
  alert(result.message);
}*/

/*let myEmail = document.querySelector("#email");
let myPassword = document.querySelector("#password");

let user = {
  email: "",
  password: "",
};*/
/*


/*
btnEnvoyer.addEventListener("click", async (e) => {
  e.preventDefault();
  let response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    window.location.href = "index.html";
    let json = await response.json();
  } else {
    window.location.href = "login.html";
    alert(result.message);
  }
});

//Récuperation du token
//let tok = localStorage.setItem("json", document.querySelector("json").token);
/*
function admin(e) {
  e.preventDefault();
  let admintok = tok;
  if (admintok == tok){
    //Permet de rendre les objet de manipulation du site visible
    
  }
  
}*/

/* window.location.href = "";
ou 
document.location.href="";
*/
