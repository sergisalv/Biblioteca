let usuarioIdGlobal = null;

const API_BASE = window.location.origin.includes("localhost")
    ? "http://localhost:8001/api"
    : "/api";

async function loadUsuario(id) {
    if (await isAdministrador()) {
        if (isNew()) {
            return;
        }
        if (!id) {
            id = getUsuarioId() || usuarioIdGlobal || sessionStorage.getItem('usuarioId');
            }
        if (!id) {
          console.error('No se encontró el id del usuario');
          return;
        }
        sessionStorage.setItem('usuarioId', id);
        usuarioIdGlobal = id; // actualizamos el id global
       

        let usuario = await getUsuariosById(id);

        document.getElementById('txtEmail').value = usuario.email;
        const contenedor = document.getElementById('contenedorPrestamos');
        contenedor.innerHTML = '';

        let prestamoIds = usuario.prestamo
            ? usuario.prestamo.split(',').map(id => id.trim())
            : [];

        for (const id of prestamoIds) {
            try {
                const libro = await getLibrosById(id);
                const titulo = libro.titulo;

                const item = document.createElement('div');
                item.className = 'list-group-item d-flex justify-content-between align-items-center bg-white text-dark';

                const texto = document.createElement('span');
                texto.textContent = titulo || `Libro desconocido (ID: ${id})`;

                document.getElementById('txtPrestamo').value = prestamoIds.join(',');

                const botonBorrar = document.createElement('button');
                botonBorrar.className = 'btn btn-danger btn-sm';
                botonBorrar.textContent = 'Borrar';

                botonBorrar.onclick = () => {
                    item.remove();

                    prestamoIds = prestamoIds.filter(pid => pid !== id);
                    usuario.prestamo = prestamoIds.join(',');

                    document.getElementById('txtPrestamo').value = usuario.prestamo;
                };

                item.appendChild(texto);
                item.appendChild(botonBorrar);
                contenedor.appendChild(item);
            } catch (error) {
                console.error(`Error al obtener libro con ID ${id}:`, error);
            }
        }
    }
}

async function isAdministrador(){
    let url = `${API_BASE}/auth/administrator`;

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
 

function getUsuarioId(){
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id'); 
    return id;

}

function isNew(){
    let hasIdInUrl = window.location.href.includes('id=');
    return !hasIdInUrl;
}

async function getUsuariosById(id){
    let url = `${API_BASE}/usuario/` + id;
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
     
    let url = `${API_BASE}/usuario`;
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

async function getLibrosById(id){
    let url = `${API_BASE}/libro/` + id;
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
async function getLibros(){
    let url = `${API_BASE}/libro`;

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


async function inicializarSelectLibros() {
  try {
    const libros = await getLibros();
    const select = document.getElementById('selectLibros');
    select.innerHTML = '';

    libros.forEach(libro => {
      const option = document.createElement('option');
      option.value = libro.id;
      option.textContent = libro.titulo;
      select.appendChild(option);
    });
  } catch (err) {
    console.error('Error al cargar libros disponibles:', err);
  }
}


document.addEventListener('DOMContentLoaded', async () => {
  let id = getUsuarioId() || sessionStorage.getItem('usuarioId');
  await loadUsuario(id);
  await inicializarSelectLibros();
});

document.getElementById('btnAgregarLibro').addEventListener('click', (event) => {
  event.preventDefault(); 
  if (!usuarioIdGlobal) {
    alert('No se ha podido determinar el usuario');
    return;
  }

  const select = document.getElementById('selectLibros');
  const idSeleccionado = select.value;
  const tituloSeleccionado = select.options[select.selectedIndex].text;

  if (!idSeleccionado) return;

  let prestamoActual = document.getElementById('txtPrestamo').value || '';
  let prestamos = prestamoActual ? prestamoActual.split(',') : [];

  if (prestamos.includes(idSeleccionado)) {
    alert('Este libro ya está en préstamo.');
    return;
  }

  // Añadir visualmente y actualizar el campo oculto
  const item = document.createElement('div');
  item.className = 'list-group-item d-flex justify-content-between align-items-center bg-white text-dark';

  const texto = document.createElement('span');
  texto.textContent = tituloSeleccionado;

  const botonBorrar = document.createElement('button');
  botonBorrar.className = 'btn btn-danger btn-sm';
  botonBorrar.textContent = 'Borrar';

  botonBorrar.onclick = () => {
    item.remove();
    prestamos = prestamos.filter(id => id !== idSeleccionado);
    document.getElementById('txtPrestamo').value = prestamos.join(',');
  };

  item.appendChild(texto);
  item.appendChild(botonBorrar);
  document.getElementById('contenedorPrestamos').appendChild(item);

  prestamos.push(idSeleccionado);
  document.getElementById('txtPrestamo').value = prestamos.join(',');
  //const id = sessionStorage.getItem('usuarioId');
  //loadUsuario(id)
});