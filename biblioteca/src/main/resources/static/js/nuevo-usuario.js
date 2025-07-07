const API_BASE = window.location.origin.includes("localhost")
    ? "http://localhost:8001/api"
    : "/api";

async function crearUsuario() {
    var email = document.getElementById("txtEmail").value;
    var password = document.getElementById("txtPassword").value;

    var body = { 
        "email" : email, 
        "password" : password,
        "administrador" : false
    };

    var config = {
        "method": 'POST',
        "body": JSON.stringify(body),
        "headers": {
            "Content-Type": 'application/json'
        }



    };

await fetch(`${API_BASE}/auth/register`, config);

window.location.href = 'login.html'

   


}