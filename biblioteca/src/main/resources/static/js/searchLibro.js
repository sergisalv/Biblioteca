
async function renderLibro(json, userAdmin){
    let libros = await json;
    let html = '';
    
for (let libro of libros){
        html += getHtmlRowLibros(libro, userAdmin);
    }

    let tbody = document.getElementById('tbody-libro');
    tbody.innerHTML = html;
    
    
}


function getHtmlRowLibros(libro, userAdmin){
    if(userAdmin == 'admin'){
       return `<tr>
                <td>${libro.id} </td>
                <td>${libro.titulo}</td>
                <td>${libro.autor}</td>
                <td>${libro.isbn}</td>
                <td>${libro.disponibles}</td>
                <td>
                    <a href="#" onClick="onClickEdit(${libro.id})" class="btn btn-warning">Editar</a>
                    <a href="#" onClick="isAdministrador(${libro.id})" class="btn btn-danger">Eliminar</a>
                </td>
            </tr>`; 
    }else{
        return `<tr>
                <td>${libro.id} </td>
                <td>${libro.titulo}</td>
                <td>${libro.autor}</td>
                <td>${libro.isbn}</td>
                <td>${libro.disponibles}</td>
            </tr>`; 
    }

    
    
    }

    async function searchLibro(userAdmin){

        let titulo = document.getElementById('txtTitulo').value;
        let isbn = document.getElementById('txtIsbn').value;
        let url ="";


        if(titulo != "" && isbn == ""){
          url = 'http://http://192.168.0.9:8001/api/' + 'libro/search?titulo=' + titulo;
        }else if(isbn != "" && titulo == ""){
         url = 'http://http://192.168.0.9:8001/api/' + 'libro/search?isbn=' + isbn;
        }else if(titulo != "" && isbn != ""){
            url = 'http://http://192.168.0.9:8001/api/' + 'libro/search?isbn=' + isbn + '&&titulo=' + titulo;
        }else{
            window.alert("Debe introducir al menos uno de los parámetros")
        }
        
        let config = {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : sessionStorage.token
            }
        };
        let response = await fetch(url, config);
        let json =  await response.json();

         renderLibro(json, userAdmin)



         /*await fetch(url, config);*/
        
    }

    async function isAdministrador(id){
        let url = 'http://192.168.0.9:8001/api/' + 'auth/administrator';
    
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
            onClickRemove(id);
        }else{
            window.alert('Usted no tiene permisos de administrador');
            window.location.href='login.html'; 
        }
     }

    async function onClickEdit(id) {
    
        window.location.href = 'editarLibro.html?id=' + id;
    }
    
    async function onClickRemove(id){
        
        
 
        let response = confirm("¿Quiere borrar este Libro?")
        if(!response){
            return;
        }
        let url = 'http://192.168.0.9:8001/api/' + 'libro/' + id;
        let config = {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : sessionStorage.token
            }
        };
         await fetch(url, config);
         searchLibro();
    
        
    }