function loginUser() {
    let userEmail = document.getElementById('email').value
    let userPassword = document.getElementById('password').value
    fetch('https://finals-backend.herokuapp.com/user-login/', {
        method: 'PATCH',
        body: JSON.stringify({
            email: userEmail,
            password: userPassword
        }),
        headers: {
            "Content-type": "application/json",
        },
    })
    .then((res) => res.json())
    .then(res => {
        console.log(res.data);
        if (res.data.length == 0) {
            alert("Incorrect email or password")
        }
        else{
            localStorage.setItem('user', JSON.stringify(res.data));
            window.location = './index.html'
        }
    })
}
