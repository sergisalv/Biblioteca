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

    let response = await fetch('/api/auth/login', config);

   let token = await response.text();

   sessionStorage.token = token;

    existe();
   





}

async function existe(){
    let url = 'http://localhost:8001/api/' + 'auth/existeUsuario';
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



    let url = 'http://localhost:8001/api/' + 'auth/administrator';

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
