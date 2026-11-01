"use strict";
// PART 6
// Caja que almacena un string
const cajaDeString = {
    contenido: "Hola",
};
// Caja que almacena un number
const cajaDeNumber = {
    contenido: 123,
};
// Caja que almacena un Usuario
const cajaDeUsuario = {
    contenido: {
        nombre: "Juan",
        edad: 30,
        email: "juan@example.com",
    },
};
// Si la respuesta de la API contiene un usuario, podemos usar el tipo RespuestaAPI<UsuarioX>
const respuestaUsuario = {
    datos: { nombre: "Juan" },
    exitoso: true,
};
// Y si la respuesta de la API contiene un producto, podemos usar el tipo RespuestaAPI<ProductoX> reutilizando la misma estructura de datos
const respuestaProducto = {
    datos: { nombre: "Camiseta", precio: 19.99 },
    exitoso: true,
};
// Basicamente lo que hace keyof es obtener los nombres de las propiedades de un tipo y los transforma
// en al union de tipos literales. Es como si hicieramos esto:
// type PropiedadesUsuarioY = "nombre" | "edad" | "email"; // Es tal cual lo mismo a que si hicieramos esto, osea un tipo que es la union de las strings que representan los nombres de las propiedades de UsuarioY
// Para que sirve? Por ejemplo imaginemos una funcion que recibe un Usuario y el nombre de sus propiedades:
function mostrarPropiedad(propiedad) {
    console.log(propiedad);
}
// Entonces podriamos hacer:
mostrarPropiedad("nombre"); // Esto es valido
mostrarPropiedad("edad");
mostrarPropiedad("email");
// mostrarPropiedad("direccion"); // Esto no es valido ya que "direccion" no es una propiedad de UsuarioY
// La ventaja es que no tuvimos que escribir manualmente los nombres permitidos. Si agregamos una propiedad
// al tipo UsuarioY entonces el keyof automaticamente se actualiza y la funcion mostrarPropiedad ahora aceptara esa nueva propiedad tambien.
// LO CENTRAL: keyof obtiene los nombres de las porpiedades de un tipo, asi sin mas.
// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
// TYPEOF - OBTENER EL TIPO DE UNA VARIABLE
// Ahora veamos el operador typeof que en realidad ya lo vimos antes.
// Basicamente nos permite obtener el tipo de una variable, por ejemplo:
const nombreZ = "Juan";
console.log(typeof nombreZ); // Esto nos devuelve "string"
// Tambien podemos usar typeof directamente en una declaracion de tipo:
const usuario = {
    nombre: "Juan",
    edad: 30,
    activo: true,
};
console.log(typeof usuario); // Esto nos devuelve "object"
// Basicamente le dijimos a TS que obtenga el tipo de la variable 'usuario' y es como si hubieramos escrito lo mismo que:
// typeof usuario = {
//   nombre: string;
//   edad: number;
//   activo: boolean;
// }
// por tanto es lo mismo que:
// type TipoUsuario = {
//   nombre: string;
//   edad: number;
//   activo: boolean;
// };
// Y por tanto ya declaramos el tipo TipoUsuario y podemos usarlo para crear nuevas variables de ese tipo:
const otroUsuario = {
    nombre: "Pedro",
    edad: 25,
    activo: false,
};
// La ventaja es que imaginemos que tenemos un objeto recontra grande con muchisimos parametros y no queremos escribir manualmente su estructura como un tipo separado
// entonces podemos usar directamente typeof para obtener el tipo de ese objeto.
// Otro ejemplo:
const configuracion = {
    idioma: "es",
    tema: "oscuro",
    notificaciones: true,
};
// Ahora el tipo TipoConfiguracion representa la estructura del objeto configuracion y podemos usarlo para crear nuevas variables de ese tipo:
const nuevaConfiguracion = {
    idioma: "en",
    tema: "claro",
    notificaciones: false,
};
