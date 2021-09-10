function toggleNavbar() {
    document.getElementsByClassName("navbar-links")[0].classList.toggle("active");
  }

if(JSON.parse(localStorage.getItem('user')).length > 0){
  let logout = document.querySelector('.log');
}

function logout() {
  user = [];
  localStorage.setItem('user', JSON.stringify(user))
  window.location.reload()
}