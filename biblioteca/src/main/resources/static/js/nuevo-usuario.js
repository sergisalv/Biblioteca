async function crearUsuario() {
    var email = document.getElementById("txtEmail").value;
    var password = document.getElementById("txtPassword").value;

    var body = { 
        "email" : email, 
        "password" : password,
        "administrador" : false
    };

    var config = {
        "method": 'POST' ,
        "headers": {
            "Content-Type": 'application/json'
        },

        "body": JSON.stringify(body)

    };

await fetch('http://sergisalv27.duckdns.org:8001/api/auth/register', config);
   


}