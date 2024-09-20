function init(){
    renderLibro();
 
 }

 async function getLibros(){
    let url = 'http://localhost:8080/api/' + 'libro';

    let config = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            /*
            'Authorization' : sessionStorage.token */
        }
    }


    let response = await fetch(url, config);
    let json =  await response.json();

    return(json);

}

 async function renderLibro(){
    let libros = await getLibros();
    let html = '';
    for (let libro of libros){
        html += getHtmlRowLibros(libro);
    }

    let tbody = document.getElementById('tbody-usuario');
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
    
    
    init();



