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
    

    let config = {
        "method": 'Post',
        "body": JSON.stringify(libro),
        "headers":{
           'Content-Type':'application/json',
           /*'Authorization' : sessionStorage.token*/
        }

    };

     await fetch(url, config);
}