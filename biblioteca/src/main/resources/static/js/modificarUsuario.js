async function loadUsuario(){
    if(isAdministrador()){
      if (isNew()){
        return;
    }
    let id = getUsuarioId();
    let usuario =  await getUsuariosById(id);

    document.getElementById('txtEmail').value = usuario.email;
    document.getElementById('txtPrestamo').value = usuario.prestamo;  
    }
    
  
}

async function isAdministrador(){
    let url = 'http://sergisalv27.duckdns.org:8001/api/' + 'auth/administrator';

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
       return true;
    }else{
        window.alert('Usted no tiene permisos de administrador');
        window.location.href='login.html';
    }
 }

function getUsuarioId(){
    let auxSplit = window.location.href.split('id=');
    let id = auxSplit[1];

    return id;

}
function isNew(){
    let hasIdInUrl = window.location.href.includes('id=');
    return !hasIdInUrl;
}

async function getUsuariosById(id){
    let url = 'http://sergisalv27.duckdns.org:8001/api/' + 'usuario/' + id;
    let config = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : sessionStorage.token
        }
    };
    
    let response = await fetch(url, config);
    let json =  await response.json();

    return(json);
}

function clickCreate(){

    let email = document.getElementById('txtEmail').value;
    let prestamo = document.getElementById('txtPrestamo').value;
    
    

    let usuario = {
       "email": email,
        "prestamo": prestamo
        };
        save(usuario);
}

async function save(usuario){
     
    let url = 'http://sergisalv27.duckdns.org:8001/api/' + 'usuario';
    let methodType = isNew() ? 'Post' : 'Put'; 

    if (!isNew()){
       url += '/' + getUsuarioId();
       
    }
    let config = {
        "method": methodType,
        "body": JSON.stringify(usuario),
        "headers":{
           'Content-Type':'application/json',
           'Authorization' : sessionStorage.token
        }

    };

     await fetch(url, config);

     window.alert("Usuario guardado correctamente");
     window.location.href = 'administrador.html';

     
    
 
    
}


loadUsuario();