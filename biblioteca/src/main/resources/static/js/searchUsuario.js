


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

        if(isAdministrador()){
          let email = document.getElementById('txtEmail').value;
    
        let url = 'http://localhost:8001/api/' + 'usuario/search?email=' + email;
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

        

         
        
    }

    async function isAdministrador(){
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
           return true;
        }else{
            window.alert('Usted no tiene permisos de administrador');
            window.location.href='login.html';
        }
     }



    async function onClickEdit(id) {
    
        window.location.href = 'editarUsuario.html?id=' + id;
    }
    
    async function onClickRemove(id){
        let response = confirm("¿Quiere borrar este Usuario?")
        if(!response){
            return;
        }
        let url = 'http://http://192.168.0.9:8001/api/' + 'usuario/' + id;
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



   