const API_BASE = window.location.origin.includes("localhost")
    ? "http://localhost:8001/api"
    : "/api";

async function login() {
    var email = document.getElementById("txtEmail").value;
    var password = document.getElementById("txtPassword").value;

    var body = { 
        "email" : email, 
        "password" : password
    };

    var config = {
        "method": 'POST' ,
        "headers": {
            "Content-Type": 'application/json'
        },

        "body": JSON.stringify(body)

    };

    let response = await fetch(`${API_BASE}/auth/login`, config);

   let token = await response.text();

   sessionStorage.token = token;

    existe();
   





}

async function existe(){
    let url = `${API_BASE}/auth/existeUsuario`;
    let config = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : sessionStorage.token 
        }
    }


    let response = await fetch(url, config);
    let existe = await response.text();
    if (existe.includes(true)){
      isAdministrador();
    }else{
       window.alert("No existe usuario o datos incorrectos");
    }


}

async function isAdministrador(){



    let url = `${API_BASE}/auth/administrator`;

    let config = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : sessionStorage.token 
        }
    }


    let response = await fetch(url, config);
    let administrator = await response.text();
    if (administrator.includes(true)){
      window.location.href = 'administrador.html'
    }else{
       window.location.href = 'usuario.html'
    }
 }
