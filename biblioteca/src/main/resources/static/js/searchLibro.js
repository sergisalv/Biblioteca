
async function renderLibro(json){
    let libros = await json;
    let html = '';
    
for (let libro of libros){
        html += getHtmlRowLibros(libro);
    }

    let tbody = document.getElementById('tbody-libro');
    tbody.innerHTML = html;
    
    
}


function getHtmlRowLibros(libro){
    return `<tr>
                <td>${libro.id} </td>
                <td>${libro.titulo}</td>
                <td>${libro.autor}</td>
                <td>${libro.isbn}</td>
                <td>${libro.disponibles}</td>
                <td>
                    <a href="#" onClick="onClickEdit(${libro.id})" class="btn btn-warning">Editar</a>
                    <a href="#" onClick="onClickRemove(${libro.id})" class="btn btn-danger">Eliminar</a>
                </td>
            </tr>`;
    
    }

    async function searchLibro(){
        let titulo = document.getElementById('txtTitulo').value;
        let isbn = document.getElementById('txtIsbn').value;
        let url ="";


        if(titulo != "" && isbn == ""){
          url = 'http://localhost:8080/api/' + 'libro/search?titulo=' + titulo;   
        }else if(isbn != "" && titulo == ""){
         url = 'http://localhost:8080/api/' + 'libro/search?isbn=' + isbn;
        }else if(titulo != "" && isbn != ""){
            url = 'http://localhost:8080/api/' + 'libro/search?isbn=' + isbn + '&&titulo=' + titulo; 
        }else{
            window.alert("Debe introducir al menos uno de los parámetros")
        }
        
        let config = {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                /*'Authorization' : sessionStorage.token*/
            }
        };
        let response = await fetch(url, config);
        let json =  await response.json();

         renderLibro(json)


         /*await fetch(url, config);*/
        
    }
    async function onClickEdit(id) {
    
        window.location.href = 'editarLibro.html?id=' + id;
    }
    
    async function onClickRemove(id){
        let response = confirm("¿Quiere borrar este Libro?")
        if(!response){
            return;
        }
        let url = 'http://localhost:8080/api/' + 'libro/' + id;
        let config = {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                /*'Authorization' : sessionStorage.token*/
            }
        };
         await fetch(url, config);
         searchLibro();
        
    }