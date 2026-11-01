"use strict";
// PART 2
let nombre = "Juan"; // primitiva string
let edad = 28; // primitiva number
let activo = true; // primitiva boolean
console.log(nombre, edad, activo);
// TypeScript con el tipo primitivo number no diferencia
// entre enteros y decimales, ambos son del tipo number
let edadDecimal = 28.5; // primitiva number
let edadEntera = 28; // primitiva number
console.log(edadDecimal, edadEntera);
let numeros = [1, 2, 3, 4, 5]; // array de números
let nombres = ["Juan", "Pedro", "Maria"]; // array de strings
let booleanos = [true, false, true]; // array de booleanos
console.log(numeros);
numeros.push(6); // agregamos un número al array
console.log(numeros);
let numeros_2 = [1, 2, 3, 4, 5]; // otra forma de declarar un array de números
console.log(numeros_2);
// any permite que una variable pueda contener practicamente cualquier valor y desactiva la comprobacion de tipos sobre
// ese valor
let valor = "HOla";
console.log(valor);
valor = 28;
console.log(valor);
valor = true;
console.log(valor);
valor = [1, 2, 3];
console.log(valor);
// Todo lo anterior es valido, sin embargo no es recomendable
// usar any ya que desactiva la comprobacion de tipos durante compilacion
// y puede llevar a errores en tiempo de ejecucion, por lo que es recomendable
// usar tipos especificos en lugar de any, para que el compilador pueda
// ayudarnos a detectar errores en tiempo de compilacion y no en tiempo de ejecucion
// IMPORTANTE: Tratar de evitar el any ya que asi aprovechamos todo el potencial de TypeScript
// Por otro lado TypeScript tiene inferencia de tipos, por ejemplo:
let nombre_nuevo = "Juan"; // TypeScript infiere que nombre es de tipo string aunque no le avisemos explicitamente
console.log(nombre_nuevo);
let edad_nuevo = 28; // Lo mismo aca
let activo_nuevo = true; // Lo mismo aca
console.log(edad_nuevo, activo_nuevo);
// -----------------------------
// -----------------------------
// -----------------------------
// -----------------------------
// Funcion que recibe un string
function greet(name) {
    console.log(`Hello ${name}`);
}
greet("Juan");
// Tambien podemos especificar el retorno aunque tambien TypeScript
// puede inferirlo
function obtenerEdad() {
    return 28;
}
// NOTA: Utilicemos anotaciones de retorno cuando ayuden a dejar claro el contrato
// de una funcion, especialmente en funciones importantes o interfaces publicas
// PROMESAS: Una promesa representa un resultado que estara disponible en algun momento futuro
// normalmente como consecuencia de una operacion asincrona.
// Por ejemplo imaginemos que queremos obtener info. de un servidor
async function obtenerEdad_async() {
    return 28;
}
/*
El Promise<number> significa que la funcion devuelve una promesa cuyo resultado sera un numero
Entonces:

  - number: La funcion devuelve directamente un numero
  - Promise<number>: La funcion devuelve una promesa que eventualmente se resolvera con un numero
*/
// FUNCIONES ANONIMAS: Son funciones que no tienen nombre propio
const nombres_varios = ["Juan", "Pedro", "Maria"];
// Por ejemplo podemos usar una funcion anonima para recorrer un array y mostrar sus elementos
nombres_varios.forEach(function (nombre) {
    console.log(nombre.toUpperCase());
});
// Tambien podemos usar funciones flecha
nombres_varios.forEach((nombre) => {
    console.log(nombre.toUpperCase());
});
// OBJETOS
function imprimirCoordenadas(punto) {
    console.log(`Coordenadas: x=${punto.x}, y=${punto.y}`);
}
// La funcion imprimirCoordenadas recibe un objeto con dos propiedades
// x e y, ambas de tipo number. Entonces podemos llamar a la funcion
// pasandole un objeto con esas propiedades
imprimirCoordenadas({ x: 10, y: 20 });
function imprimiNombre(usuario) {
    // La propiedad apellido es opcional, por lo que podemos verificar si existe antes de usarla
    if (usuario.apellido) {
        console.log(`Nombre completo: ${usuario.nombre} ${usuario.apellido}`);
    }
    else {
        console.log(`Nombre: ${usuario.nombre}`);
    }
}
// El signo '?' significa que la propiedad es opcional.
imprimiNombre({ nombre: "Juan" }); // Llamada sin apellido
imprimiNombre({ nombre: "Juan", apellido: "Perez" }); // Llamada con apellido
// UNION TYPES
// Permite combinar 2 o mas tipos para indicar que una variable o parametro puede contener valores
// de cualquiera de ellos, usamos el operador |, por ejemplo:
let identificador; // Puede ser string o number
identificador = "ABC123";
console.log(identificador);
identificador = 123456;
console.log(identificador);
// Tambien se puede usar en los parametros de las funciones
function imprimirID(id) {
    console.log(`El ID es: ${id}`);
}
imprimirID("ABC123");
imprimirID(123456);
// Tambien se puede combinar mas de 2 tipos
function imprimirValor(valor) {
    console.log(`El valor es: ${valor}`);
}
imprimirValor("Hola");
imprimirValor(123);
imprimirValor(true);
// Podemos hacer una funcion que dependiendo de un tipo de dato haga una cosa, o sino otra:
function procesarValor(valor) {
    if (typeof valor === "string") { // Usamos TYPEOF para determinar el tipo de dato
        console.log(`El valor es un string: ${valor.toUpperCase()}`);
    }
    else {
        console.log(`El valor es un number: ${valor.toFixed(2)}`);
    }
}
procesarValor("Hola");
procesarValor(123.456);
// O por ejemplo si es un array de strings o si es un string:
function procesarEntrada(entrada) {
    if (typeof entrada === "string") {
        console.log(`La entrada es un string: ${entrada}`);
    }
    else {
        console.log(`La entrada es un array de strings: ${entrada.join(", ")}`);
    }
}
procesarEntrada("Hola");
procesarEntrada(["Hola", "Mundo", "TypeScript"]);
// Acabamos de crear un tipo nuevo llamado Point y lo podemos usar en funciones que reciben un objeto Point
function imprimirPunto(punto) {
    console.log(`Coordenadas: x=${punto.x}, y=${punto.y}`);
}
let coordenada = { x: 10, y: 20 };
imprimirPunto(coordenada);
function imprimirID_alias(id) {
    console.log(`El ID es: ${id}`);
}
imprimirID_alias("ABC123");
imprimirID_alias(123456);
// Y despues usarla en una funcion
function imprimirPuntoInterface(punto) {
    console.log(`Coordenadas: x=${punto.x}, y=${punto.y}`);
}
let coordenadaInterface = { x: 10, y: 20 };
imprimirPuntoInterface(coordenadaInterface);
// La interfaz Oso hereda la propiedad nombre de la interfaz Animal y agrega una nueva propiedad miel.
// Por lo tanto:
const oso = {
    nombre: "Winnie",
    miel: true,
};
console.log(oso.nombre, oso.miel);
const osoType = {
    nombre: "Winnie",
    miel: true,
};
console.log(osoType.nombre, osoType.miel);
/*
Type o Interface, cual usar?

  - Utiliza interface cuando quieras describir la estructura de un objeto
  - Utiliza type cuando necesites representar uniones, intersecciones y otras construcciones del sistema de tipos
 */
// -----------------------------
// TypeScript sabe que getElementById devuelve un HTMLElement o null, pero no necesariamente conoce su tipo concreto
// Sin embargo nosotros sabemos que el elemnto con ese identificador es un HTMLCanvasElement
// Podemos indicarselo con una asercion
// const elemento = document.getElementById("miCanvas") as HTMLCanvasElement; // Asercion de tipo
// Ahora TypeScript sabe que elemento es un HTMLCanvasElement y podemos acceder a sus propiedades y metodos especificos
// Una aserción de tipo no transforma un objeto ni realiza una conversión de tipos durante la ejecución.
// Simplemente modifica cómo TypeScript interpreta ese valor durante la comprobación estática.
// Por ejemplo:
const valor2 = "Hola";
// En este ultimo caso estamos forzando a TypeScript a tratar un string como un number mediante 2 aserciones.
// Pero durante la ejecucion el valor continua siendo una cadena de caracteres. Por eso hay que tener cuidado
// ya que las aserciones no garantizan que el valor realmente tenga el tipo indicado.
// Entonces el TYpe Assertion le indica al compilador que tipo queremos asumir que tiene un valor.
console.log(valor2);
// Hasta ahora trabajamos con tipos generales:
let name2;
let age2;
// Pero TypeScript tambien nos permite crear tipos literales, que son tipos que solo pueden tener un valor especifico
// Por ejemplo podemos crear un tipo literal para el nombre y la edad:
let nameLiteral; // Solo puede ser "Juan"
let ageLiteral; // Solo puede ser 28
// Por lo tanto:
nameLiteral = "Juan"; // Esto es valido, solo puede tener el valor de "Juan", no "Pedro", "Maria", etc.
ageLiteral = 28; // Esto es valido, solo puede tener el valor de 28, no 30, 43, etc.
console.log(nameLiteral, ageLiteral);
// Esto es util porque por ej:
function imprimirTexto(texto, alineacion // Solo puede ser "left", "right" o "center"
) {
    console.log(`Texto: ${texto}, Alineacion: ${alineacion}`);
}
imprimirTexto("Hola", "left"); // Esto es valido
imprimirTexto("Hola", "right"); // Esto es valido
imprimirTexto("Hola", "center"); // Esto es valido
// imprimirTexto("Hola", "justify"); // Esto NO es valido, ya que "justify" no es un valor permitido para alineacion
// Tambien podemos usar tipos literales para lo que devuelve una funcion:
function obtenerEstado() {
    return Math.random() < 0.5 ? "activo" : "inactivo"; // Devuelve "activo" o "inactivo" aleatoriamente
}
const estado = obtenerEstado();
console.log(`El estado es: ${estado}`); // Esto es valido, ya que estado solo puede ser "activo" o "inactivo"
// De aca viene como TypeScript infiere los tipos literales, por ejemplo:
let mensaje = "Hola"; // TypeScript infiere que mensaje es de tipo string
console.log(mensaje);
const mensajeLiteral = "Hola"; // TypeScript infiere que mensajeLiteral es de tipo "Hola" (literal), no string
console.log(mensajeLiteral);
// Esto ultimo es porque una variable declarada con CONST no puede recibir otra asignacion que no sea "Hola" por lo tanto es de tipo "Hola"
// Sin embargo CONST cambia con los objetos, veamos:
const solicitud = {
    url: "https://api.example.com",
    method: "GET",
};
console.log(solicitud);
// Aunque solicitud sea un objeto constante, sus propiedades pueden cambiar.
// Por eso TypeScript infiere que solicitud.url es de tipo string y solicitud.method es de tipo string, no tipos literales "https://api.example.com" y "GET" respectivamente.
// Para cambiarlo deberiamos hacer:
const solicitudLiteral = {
    url: "https://api.example.com", // Asercion de tipo literal
    method: "GET", // Asercion de tipo literal
};
// Ahora TypeScript infiere que solicitudLiteral.url es de tipo "https://api.example.com" y solicitudLiteral.method es de tipo "GET"
console.log(solicitudLiteral);
// -----------------------------
// -----------------------------
// NULL y UNDEFINED
// La ausencia de info. en TS es NULL y UNDEFINED representar situaciones donde no tenemos info disponible
let nombrexs = null;
let apellidoxs = undefined;
console.log(nombrexs, apellidoxs);
// Tambien tneemos el operador ! donde le podemos indicar al compilador que estamos seguros
// de que un valor no es null ni undefined.
// La funcion recibe un numero que puede ser number, null o undefined.
function procesarNumber(numero) {
    console.log(numero.toFixed(2)); // El operador ! le indica al compilador que estamos seguros de que numero no es null ni undefined
}
// ----------------------------
// ----------------------------
// ENUMS
// Enums permiten representar un conjunto de valores constantes con nombres.
var EstadoPedido;
(function (EstadoPedido) {
    EstadoPedido[EstadoPedido["Pendiente"] = 0] = "Pendiente";
    EstadoPedido[EstadoPedido["EnPreparacion"] = 1] = "EnPreparacion";
    EstadoPedido[EstadoPedido["Entregado"] = 2] = "Entregado";
})(EstadoPedido || (EstadoPedido = {}));
let estadoPedido = EstadoPedido.Pendiente;
console.log(estadoPedido); // Imprime 0, que es el valor asociado a Pendiente
estadoPedido = EstadoPedido.EnPreparacion;
console.log(estadoPedido); // Imprime 1, que es el valor asociado a EnPreparacion
estadoPedido = EstadoPedido.Entregado;
console.log(estadoPedido); // Imprime 2, que es el valor asociado a Entregado
// Tambien podemos comparar
if (estadoPedido === EstadoPedido.Entregado) {
    console.log("El pedido ha sido entregado");
}
// La documentación recomienda conocer los enums, pero no necesariamente utilizarlos en todos los proyectos.
// Muchas veces los Union Types con literales pueden ser una alternativa más sencilla.
// ------------------------------
// ------------------------------
// PRIMITIVOS MENOS HABITUALES: Symbol
// Symbol es un tipo primitivo que permite crear IDENTIFICADORES UNICOS
const primerNombre = Symbol("nombre");
const segundoNombre = Symbol("nombre");
// Por mas que ambos symbols tengan la misma descripcion, son unicos y no son iguales
// Esto puede ser util para crear IDs unicos para propiedades de objetos y evitar colisiones
