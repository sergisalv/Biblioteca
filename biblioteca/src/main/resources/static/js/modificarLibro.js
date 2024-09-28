async function loadLibro(){
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
    let url = 'http://localhost:8080/api/' + 'libro/' + id;
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
     
    let url = 'http://localhost:8080/api/' + 'libro';
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


