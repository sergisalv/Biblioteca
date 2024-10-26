function init(){
    renderLibro();
 
 }

 async function getLibros(){

    let url = URL_SERVER + 'libro/prestamo';

    let config = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : sessionStorage.token 
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
                
            </tr>`;
    
    }

    function onClickLogOut(){
        sessionStorage.token = null;
        window.location.href = 'login.html';
    }
    
    
    init();



