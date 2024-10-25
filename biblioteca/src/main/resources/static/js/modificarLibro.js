async function loadLibro(){
    if(isAdministrador()){
        if (isNew()){
        return;
    }
    let id = getLibroId();
    let libro =  await getLibrosById(id);

    document.getElementById('txtTitulo').value = libro.titulo;
    document.getElementById('txtAutor').value = libro.autor;
    document.getElementById('txtIsbn').value = libro.isbn;
    document.getElementById('txtDisponibles').value = libro.disponibles;
    document.getElementById('txtId').value = libro.id;
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
       return true;
    }else{
        window.alert('Usted no tiene permisos de administrador');
        window.location.href='login.html';
    }
 }



function getLibroId(){
    let auxSplit = window.location.href.split('id=');
    let id = auxSplit[1];

    return id;

}
function isNew(){
    let hasIdInUrl = window.location.href.includes('id=');
    return !hasIdInUrl;
}

async function getLibrosById(id){
    let url = 'http://192.168.0.9:8001/api/' + 'libro/' + id;
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

    let titulo = document.getElementById('txtTitulo').value;
    let autor = document.getElementById('txtAutor').value;
    let isbn = document.getElementById('txtIsbn').value;
    let disponibles = document.getElementById('txtDisponibles').value;
    

    let libro = {
       "titulo": titulo,
        "autor": autor,
        "isbn": isbn,
        "disponibles": disponibles
        };
        save(libro);
}

async function save(libro){
     
    let url = 'http://192.168.0.9:8001/api/' + 'libro';
    let methodType = isNew() ? 'Post' : 'Put'; 

    if (!isNew()){
       url += '/' + getLibroId();
       
    }
    let config = {
        "method": methodType,
        "body": JSON.stringify(libro),
        "headers":{
           'Content-Type':'application/json',
           'Authorization' : sessionStorage.token
        }

    };

     await fetch(url, config);

     window.alert("Libro guardado correctamente");
     window.location.href = 'administrador.html';

     
    
 
    
}


loadLibro();


