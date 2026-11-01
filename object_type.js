"use strict";
// PART 5
// Los objetos en TS nos permite agrupar distintos datos en una unica estructura
// por ejemplo al representar un producto:
const producto = {
    nombre: "Teclado",
    precio: 25000,
    disponible: true,
};
// En este caso definimos el tipo Producto que tiene 3 propiedades, nombre de tipo string, precio de tipo number y disponible de tipo boolean.
// Esto ultimo es un OBJECT TYPE y ahora podemos declarar una variable utilizando este tipo de objeto:
const producto2 = {
    nombre: "Monitor",
    precio: 50000,
    disponible: false,
};
// -----------------------------------
// -----------------------------------
// -----------------------------------
// FORMAS DE DEFINIR TIPOS DE OBJETOS (OBJECT TYPES)
// Podemos declarar el tipo de objeto directamente donde lo necesitamos:
function mostrarProducto(producto) {
    console.log(`El producto ${producto.nombre} tiene un precio de ${producto.precio} y está disponible: ${producto.disponible}`);
}
// En este ultimo caso el parametro producto debe tener un objeto con las propiedades de nombre, precio y disponible con sus respectivos tipos de datos.
// En invocamos la funcion asi:
console.log(mostrarProducto(producto2));
// Es perfectamente válido, pero si necesitamos reutilizar esa estructura en distintas partes del programa, conviene darle un nombre con TYPE
function mostrarProducto2(producto) {
    console.log(`El producto ${producto.nombre} tiene un precio de ${producto.precio} y está disponible: ${producto.disponible}`);
}
// Podemos usar la interface de la misma manera que usamos el type:
const producto3 = {
    nombre: "Mouse",
    precio: 15000,
    disponible: true,
};
console.log(mostrarProducto2(producto3));
// Al ser opcional la propiedad telefono entonces estas 2 declaraciones son validas:
const usuario1 = {
    nombre: "Juan",
    edad: 30,
};
const usuario2 = {
    nombre: "Maria",
    edad: 25,
    telefono: "123456789",
};
// De esta menra podemos leer el cliente pero no podemos modificar su id
const cliente = {
    id: 1,
    nombre: "Pedro",
};
console.log(cliente.id); // 1
console.log(cliente.nombre); // Pedro
// cliente.id = 2; // Esto nos dara un error porque id es readonly
cliente.nombre = "Juan"; // Esto si es valido porque nombre no es readonly
console.log(cliente.nombre); // Juan
// readonly es una restriccion del sistema de tipos de TypeSctript. No congela el objeto en tiempo de ejecucion.
// Si realmente necesitamos impedir modificaciones en runtime, podemos usar Object .freeze()
// --------------------------------
// --------------------------------
// --------------------------------
// INDEX SIGNATURES
// Este concepto es util cuando trabajamos con objetos cuyas propiedades no concoemos de antemano
// Si queremos representar las notas de un estudiante podemos tener:
const notas = {
    matematica: 9,
    programacion: 10,
    fisica: 8,
};
// Entonces un objeto de este tipo puede ser asi:
const notas2 = {
    matematica: 9,
    programacion: 10,
    fisica: 8,
    quimica: 7,
    biologia: 6,
};
// O sino:
const notas3 = {
    historia: 8,
    geografia: 9,
};
// Tambien podemos acceder a las propiedades de este objeto de la misma manera dinamicamente:
console.log(notas2["matematica"]); // 9
const nombres = {
    0: "Juan",
    1: "Maria",
    2: "Pedro",
};
console.log(nombres[1]); // Maria
const config = {
    apiUrl: "https://api.example.com",
    apiKey: "123456789",
};
console.log(config.apiUrl); // https://api.example.com
console.log(config.apiKey); // 123456789
// Basicamente con extends estamos diciendo que Auto2 y Moto2 hereden las propiedades
// definidas en Vehiculo dentro de sus respectivos tipos
const miAuto = {
    marca: "Toyota",
    modelo: "Corolla",
    anio: 2020,
    cantidadPuertas: 4,
};
const miMoto = {
    marca: "Honda",
    modelo: "CBR500R",
    anio: 2021,
    cilindrada: 500,
};
// Ahora un objeto de tipo VehiculoDeportivo tendra las propiedades de Auto2, Moto2
// y ademas la propiedad velocidadMaxima
const miVehiculoDeportivo = {
    marca: "Ferrari",
    modelo: "488 GTB",
    anio: 2020,
    cantidadPuertas: 2,
    cilindrada: 3902,
    velocidadMaxima: 330,
};
// Ahora Auto3 tendra las propiedades de Motor y Color
const miAuto3 = {
    potencia: 150,
    color: "Rojo",
};
// Ahora podemos crear cajas de distintos tipos de datos:
const cajaDeNumeros = {
    contenido: 123,
};
const cajaDeStrings = {
    contenido: "Hola",
};
const cajaDeBooleanos = {
    contenido: true,
};
const cajaDeNumeros2 = {
    contenido: 456,
};
const cajaDeStrings2 = {
    contenido: "Mundo",
};
const cajaDeBooleanos2 = {
    contenido: false,
};
const cajaDeNumerosYStrings = {
    contenido1: 789,
    contenido2: "Hola Mundo",
};
// --------------------------------
// --------------------------------
// --------------------------------
// ARRAYS DE SOLO LECTURA
// Hasta ahora vimo que podemos utilizar readonly para impedir que se reasigne una propiedad
// a un objeto, pero tambien pdoemos impedir que se modifiqeu un array a traves de una referecia:
const numeros = [1, 2, 3, 4, 5];
// Logicamente podemos consultar sus elementos pero no modificarlos:
console.log(numeros[0]); // 1
console.log(numeros.length); // 5
// numeros.push(6); // Esto nos dara un error porque el array es readonly
// numeros[0] = 10; // Esto tambien nos dara un error porque el array es readonly
// Tambien a una funcion le podemos pasar un array de solo lectura como parametro:
function mostrarNumeros(numeros) {
    numeros.forEach((numero) => {
        console.log(numero);
    });
}
mostrarNumeros(numeros); // 1 2 3 4 5
// --------------------------------
// --------------------------------
// --------------------------------
// TUPOS DE TUPLAS
// Hasta ahora usamos arrays como:
const datos = ["Juan", 30, "Maria", 25];
const persona1 = ["Juan", 30];
const persona2 = ["Maria", 25];
const punto = [10, 20];
// Y podemos acceder
console.log(punto[0]); // 10
console.log(punto[1]); // 20
// Tambien podemos extraer sus elementos facilmente:
const [x, y] = punto;
console.log(x); // 10
console.log(y); // 20
// Entonces:
const punto2D = [10, 20]; // Valido
const punto3D = [10, 20, 30]; // Valido
const datos1 = ["Juan", 30, 25, 20]; // Valido
const datos2 = ["Maria"]; // Valido
// Y tambien podemos tener tuplas de solo lectura
const coordenadas = [10, 20];
console.log(coordenadas[0]); // 10
console.log(coordenadas[1]); // 20
// coordenadas[0] = 30; // Esto nos dara un error porque la tupla es readonly
