function registerUser() {
  let firstName = document.getElementById("name").value;
  let surName = document.getElementById("surname").value;
  let Email = document.getElementById("email").value;
  let Password = document.getElementById("password").value;
  console.log(firstName, surName, Email, Password);
  fetch("https://finals-backend.herokuapp.com/user-registration/", {
    method: "POST",
    body: JSON.stringify({
      firstname: firstName,
      surname: surName,
      email: Email,
      password: Password,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
   .then((response) => response.json())
    .then((json) => {
      console.log(json);
      window.location = "./login.html";
    });
}
