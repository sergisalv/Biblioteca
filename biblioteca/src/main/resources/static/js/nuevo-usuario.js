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

await fetch('http://sergisalv27.duckdns.org:8001/api/auth/register', config);

window.location.href = 'login.html'

   


}