let myEmail = document.getElementById("email").value;
let myPassword = document.getElementById("password").value;

let user = {
  myEmail,
  myPassword,
};

const btnEnvoyer = document.querySelector("#valider");

btnEnvoyer.addEventListener("click", async (event) => {
  let response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  let result = await response.json();
  alert(result.message);
});

/* window.location.href="";
ou 
document.location.href="";
*/
/*if (response.ok) { // if HTTP-status is 200-299
    // obtenir le corps de réponse (la méthode expliquée ci-dessous)
    let json = await response.json();
  } else {
    alert("HTTP-Error: " + response.status);
  }*/
