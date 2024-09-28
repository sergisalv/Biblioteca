async function loadUsuario(){
    if (isNew()){
        return;
    }
    let id = getUsuarioId();
    let usuario =  await getUsuariosById(id);

    document.getElementById('txtEmail').value = usuario.email;
    document.getElementById('txtPrestamo').value = usuario.prestamo;
  
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
    let url = 'http://localhost:8080/api/' + 'usuario/' + id;
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
     
    let url = 'http://localhost:8080/api/' + 'usuario';
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