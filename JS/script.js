// Vamos a hacer un stock limitado de ropa de tienda

// donde el cliente cuando pregunte por una Prenda pueda saber el precio y sus detalles

// El usuario preguntara por una prenda del stock y le dira el nombre, color y precio con o sin descuento, depende si la prenda presenta alguna falla o no

let prendas =[
    {
        nombre : "pantalon",
        color : "azul",
        falla : false,
        precio : 50,
    },
    {
        nombre : "remera",
        color : "blanco",
        falla : false,
        precio : 30,
    },
    {
        nombre : "calcetines",
        color : "gris",
        falla : true,
        precio : 10,
    },
    {
        nombre : "zapatillas",
        color : "negras",
        falla : false,
        precio : 150,
    }
]

function catalogo (){
    let catalogoLista = prendas.map (prenda => `prenda: ${prenda.nombre}, color: ${prenda.color} `).join ('\n');
    alert (`Bienvenido, este es nuestro catalogo:\n ${catalogoLista}`)
}

function aplicarDescuento(precio, falla){
    if (falla) {
        return precio * 0.75;
    }
    return precio;
}

let desea = prompt("Deseas ver el catalogo? si/no").toLocaleLowerCase();


while (true) {
    if (desea === "si"){
        console.log("Viendo el catalogo");
        catalogo()
        break;
    } else if (desea === "no"){ 
        const ropa = prompt("Quiero mas informacion de (zapatillas, pantalon, calcetines, remera):").toLocaleLowerCase();
        let prendaEncontrada = prendas.find(prenda => prenda.nombre.toLocaleLowerCase() === ropa);

        if (prendaEncontrada){

            let precioFinal = aplicarDescuento(prendaEncontrada.precio, prendaEncontrada.falla);

            alert(`nombre: ${prendaEncontrada.nombre}, color: ${prendaEncontrada.color}, costo: $${precioFinal.toFixed(2)}`);
        }else {
            alert("Prenda no encontrada.");
        }
        break;
    }else {
        alert("Opción no válida. Por favor, ingresa 'si' o 'no'.");
    }
    break;

}

