let chismes = [];
let id_para_eliminar = 1;

function guardarChisme(event) {
    event.preventDefault();

    const descripcion = document.getElementById('descripcion').value;
    const categoria = document.getElementById('categoria').value;
    const fecha = document.getElementById('date').value;
    const estado = document.getElementById('estado').value;
    const comentarios = document.getElementById('comentarios').value;

    const chisme = {
        id: id_para_eliminar++,
        descripcion,
        categoria,
        fecha,
        estado,
        comentarios
    };

    chismes.push(chisme);
    document.querySelector('#chisme-form form').reset();
    mostrarChismes();
}

function mostrarChismes() {
    const contenedor = document.getElementById('lista-container');
    contenedor.innerHTML = '';

    const busqueda = document.getElementById('buscar').value.toLowerCase();
    const estadoFiltro = document.getElementById('filtrar-estado').value;
    const categoriaFiltro = document.getElementById('filtrar-categoria').value;

    const chismesFiltrados = chismes.filter(chisme => {
        const coincideBusqueda = chisme.descripcion.toLowerCase().includes(busqueda);
        const coincideEstado = estadoFiltro ? chisme.estado === estadoFiltro : true;
        const coincideCategoria = categoriaFiltro ? chisme.categoria === categoriaFiltro : true;

        return coincideBusqueda && coincideEstado && coincideCategoria;
    });

    chismesFiltrados.forEach(chisme => {
        const div = document.createElement('div');
        div.className = 'chisme-item';
        div.dataset.id = chisme.id;
        div.innerHTML = `
            <p><strong>Descripción:</strong> ${chisme.descripcion}</p>
            <p><strong>Categoría:</strong> ${chisme.categoria}</p>
            <p><strong>Fecha:</strong> ${chisme.fecha}</p>
            <p><strong>Estado:</strong> ${chisme.estado}</p>
            <p><strong>Comentarios:</strong> ${chisme.comentarios}</p>
            <button onclick="editarChisme(${chisme.id})">Editar</button>
            <button onclick="eliminarChisme(${chisme.id})">Eliminar</button>
        `;
        contenedor.appendChild(div);
    });
}

function eliminarChisme(id) {
    chismes = chismes.filter(chisme => chisme.id !== id);
    mostrarChismes();
}

function editarChisme(id) {
    const chisme = chismes.find(ch => ch.id === id);
    if (chisme) {
        document.getElementById('descripcion').value = chisme.descripcion;
        document.getElementById('categoria').value = chisme.categoria;
        document.getElementById('date').value = chisme.fecha;
        document.getElementById('estado').value = chisme.estado;
        document.getElementById('comentarios').value = chisme.comentarios;

        
        chismes = chismes.filter(ch => ch.id !== id);
        mostrarChismes();
    }
}

document.getElementById('guardar-chisme').addEventListener('click', guardarChisme);
document.getElementById('buscar').addEventListener('input', mostrarChismes);
document.getElementById('filtrar-estado').addEventListener('change', mostrarChismes);
document.getElementById('filtrar-categoria').addEventListener('change', mostrarChismes);



