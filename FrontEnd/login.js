const btnEnvoyer = document.querySelector("#valider");
btnEnvoyer.addEventListener("click", async (e) => {
  e.preventDefault();

  //let elt = document.forms["loginform1"].elements["email"];

  let user = {
    email: document.querySelector("#email").value,
    password: document.querySelector("#myPassword").value,
  };
  console.log(email.value.length);
  console.log(JSON.stringify(user));
  if (email.value.length <= 0) {
    alert("veuillez indiquer votre E-mail");
  } else if (myPassword.value.length <= 0) {
    alert("veuillez indiquer votre Mot de passe");
  } else {
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
  }
});
