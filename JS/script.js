// html y css cards para productos de venta, precios y nombre y detalles de cada producto

// el cliente podra cliquear en los productos y deben guardarse en el carrito(cerrando la pesta;a igual deben guardarse)

// habran productos con descuentos y stock

// cuando el cliente aprete el boton COMPRAR esos productos se deconmtaran del stock, entonces se baja el numero de stock y dira compra realizada.
let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');

// // const data = [
// //     { id: 1, nombre: "Campera Prada", precio: 200, stock: 60, img: "../assets/img/art4.jpg" },
// //     { id: 2, nombre: "Chaleco Prada", precio: 300, stock: 10, img: "../assets/img/art2.jpg" },
// //     { id: 3, nombre: "Falda Prada", precio: 700, stock: 2, img: "../assets/img/art6.jpg" },
// //     { id: 4, nombre: "remera Prada", precio: 249, stock: 2, img: "../assets/img/art3.jpg" },
// //     { id: 5, nombre: "Chaqueta Prada", precio: 999, stock: 2, img: "../assets/img/art5.jpg" },
// //     { id: 6, nombre: "Sueter Prada", precio: 449, stock: 2, img: "../assets/img/art1.jpg" },
// // ];

async function fechData(){
    try{
        const response = await fetch("API/productos.json");
        const data = await response.json()


        data.forEach(function(producto) {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'card';
            tarjeta.innerHTML = `
                <img src="${producto.img}" alt="${producto.nombre}"> 
                <h3>${producto.nombre}</h3> 
                <p>Precio $${producto.precio}</p> 
                <button onclick="agregarProducto('${producto.nombre}', ${producto.precio})">Agregar</button>
            `;
            container.appendChild(tarjeta);
        });
    }catch(error){
        console.error("no funciona", error);
    }
}
fechData();

const container = document.getElementById('product-container');  


function agregarProducto(nombre, precio) {
    const productoExistente = carrito.find(producto => producto.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        const producto = { nombre, precio, cantidad: 1 };
        carrito.push(producto);
    }


    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarTabla();
    actualizarTotal();
}


function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarTabla();
    actualizarTotal();
}

function borrarCarrito (){
    carrito = [];
    actualizarTabla();
    actualizarTotal();


}

function actualizarTabla() {
    const tabla = document.getElementById('carritoTabla').getElementsByTagName('tbody')[0];
    tabla.innerHTML = ''; 

    carrito.forEach((producto, index) => {
        const row = tabla.insertRow();

        const cellNombre = row.insertCell(0);
        cellNombre.textContent = producto.nombre;

        const cellPrecio = row.insertCell(1);
        cellPrecio.textContent = `$${producto.precio}`;

        const cellCantidad = row.insertCell(2);
        cellCantidad.textContent = producto.cantidad;

        const cellEliminar = row.insertCell(3);
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Borrar';
        botonEliminar.onclick = () => eliminarProducto(index);
        cellEliminar.appendChild(botonEliminar);
    });
}

function actualizarTotal() {
    let total = 0;

    carrito.forEach(producto => {
        total += producto.cantidad * producto.precio;
    });

    const inputComprar = document.getElementsByClassName('total')[0];
    inputComprar.value = `$${total.toFixed(2)}`;
    
    const comprarBtn = document.getElementById('comprar');
    comprarBtn.addEventListener ("click", function(){

        Swal.fire({
            title: "Realizar compra?",
            text: "Tu pedido se confirmará al finalizar. ¡Gracias!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Comprar"
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire({
                title: "Compra realizada!",
                text: "Gracias por su compra.",
                icon: "success"
            });
            borrarCarrito();
            }
        });
    }
)
}


actualizarTabla();
actualizarTotal();





