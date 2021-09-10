function displayGreeting() {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user == null) {
      document.getElementById('users').innerHTML = ''
    }
    else if (user[0].password == "00Cassiem00"){
      document.getElementById('users').innerHTML = `Welcome back Admin`
    }
    else{
      document.getElementById('users').innerHTML = `Welcome ${user[0].firstname}`
    }
  }
  
  displayGreeting()