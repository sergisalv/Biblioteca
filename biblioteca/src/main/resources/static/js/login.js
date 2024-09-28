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

    if(email == "admin@admin.com"){
    window.location.href = 'administrador.html'
   }else{
    window.location.href = 'usuario.html'
   }





}