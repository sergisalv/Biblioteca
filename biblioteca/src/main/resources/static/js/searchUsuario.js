


async function renderUsuario(json){
    let usuarios = await json;
    let html = '';
    
for (let usuario of usuarios){
        html += getHtmlRowUsuarios(usuario);
    }

    let tbody = document.getElementById('tbody-usuario');
    tbody.innerHTML = html;
    
    
}


function getHtmlRowUsuarios(usuario){
    return `<tr>
                <td>${usuario.id} </td>
                <td>${usuario.email}</td>
                <td>${usuario.prestamo}</td>
                <td>
                    <a href="#" onClick="onClickEdit(${usuario.id})" class="btn btn-warning">Editar</a>
                    <a href="#" onClick="onClickRemove(${usuario.id})" class="btn btn-danger">Eliminar</a>
                </td>
            </tr>`;
    
    }

    async function searchUsuario(){
        let email = document.getElementById('txtEmail').value;
    
        let url = 'http://localhost:8080/api/' + 'usuario/search?email=' + email;
        let config = {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : sessionStorage.token
            }
        };
        let response = await fetch(url, config);
        let json =  await response.json();

         renderUsuario(json)


         
        
    }
    async function onClickEdit(id) {
    
        window.location.href = 'editarUsuario.html?id=' + id;
    }
    
    async function onClickRemove(id){
        let response = confirm("¿Quiere borrar este Usuario?")
        if(!response){
            return;
        }
        let url = 'http://localhost:8080/api/' + 'usuario/' + id;
        let config = {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : sessionStorage.token
            }
        };
         await fetch(url, config);
         searchUsuario();
        
    }



   