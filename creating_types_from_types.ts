// PART 6

// Veremos como crear tipos nuevos reutilizando informacion de tipos que ya existen
// Hasta ahora escribiamos tipos nuevos con:
type Usuario = {
  nombre: string;
  edad: number;
  email: string;
};

// Pero imaginemos que mas adelante necesitamos:

//  1. Un tipo que contenga solamente el nombre y el email
//  2. Otro tipo que tenga todas las propiedades opcionales
//  3. Otro tipo que permita obtener el tipo de una propiedad especifica
//  4. Otro que cambie automaticamente las propiedades de un tipo

// En lugar de volver a escribir todo TS nos proporciona herramientas para construir esos tipos
// a partir de los existentes.

// Vamos a usar un mismo ejemplo a lo largo de toda esta parte, un sistema que administra usuarios y productos.

// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------

// GENERICOS

// Son los tipos genericos que ya vimos. Un generico
// permite crear un tipo que puede trabajar con distintos tipos de datos
// Por ejemplo una caja que almacena su contenido:

type Caja<T> = {
  contenido: T;
};

// Caja que almacena un string
const cajaDeString: Caja<string> = {
  contenido: "Hola",
};

// Caja que almacena un number
const cajaDeNumber: Caja<number> = {
  contenido: 123,
};

// Caja que almacena un Usuario
const cajaDeUsuario: Caja<Usuario> = {
  contenido: {
    nombre: "Juan",
    edad: 30,
    email: "juan@example.com",
  },
};

// Basicamente T representa un parametro que indica que tipo de dato vamos a guardar

// Esto de los tipos genericos es muy util ya que nos permite definir una estructura
// una unica vez y luego reutilizarla con distintos tipos de datos.

// Por ejemplo una respuesta de una API que en esa respuesta podria contener un usuario, un producto o una lista de pedidos:
type RespuestaAPI<T> = {
  datos: T;
  exitoso: boolean;
};

// Ahora definimos 2 tipos especificos
type UsuarioX = {
  nombre: string;
};

type ProductoX = {
  nombre: string;
  precio: number;
};

// Si la respuesta de la API contiene un usuario, podemos usar el tipo RespuestaAPI<UsuarioX>
const respuestaUsuario: RespuestaAPI<UsuarioX> = {
  datos: { nombre: "Juan" },
  exitoso: true,
};

// Y si la respuesta de la API contiene un producto, podemos usar el tipo RespuestaAPI<ProductoX> reutilizando la misma estructura de datos
const respuestaProducto: RespuestaAPI<ProductoX> = {
  datos: { nombre: "Camiseta", precio: 19.99 },
  exitoso: true,
};

// Si nos fijamos la estructura RespuestaAPI es la misma, lo unico que cambia es el tipo de datos

// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------

// KEYOF - OBTENER LAS PROPIEDADES DE UN TIPO

// Veamos el operador keyof. Imabinemo que tenemos este tipo:
type UsuarioY = {
  nombre: string;
  edad: number;
  email: string;
};

// Ahora supongamos que queremos crear un tipo nuevo que represente los nombres de
// las propiedades de UsuarioY podriamos hacer entonces:
type PropiedadesUsuarioY = keyof UsuarioY;

// Basicamente lo que hace keyof es obtener los nombres de las propiedades de un tipo y los transforma
// en al union de tipos literales. Es como si hicieramos esto:
// type PropiedadesUsuarioY = "nombre" | "edad" | "email"; // Es tal cual lo mismo a que si hicieramos esto, osea un tipo que es la union de las strings que representan los nombres de las propiedades de UsuarioY

// Para que sirve? Por ejemplo imaginemos una funcion que recibe un Usuario y el nombre de sus propiedades:
function mostrarPropiedad(propiedad: keyof UsuarioY) {
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

// Pero la novedad en TS es que tambien podemos usar typeof directamente en una declaracion de tipo:
const usuario = {
  nombre: "Juan",
  edad: 30,
  activo: true,
};

type TipoUsuario = typeof usuario; // Esto nos devuelve el tipo { nombre: string; edad: number; activo: boolean; }
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

const otroUsuario: TipoUsuario = {
  nombre: "Pedro",
  edad: 25,
  activo: false,
}

// La ventaja es que imaginemos que tenemos un objeto recontra grande con muchisimos parametros y no queremos escribir manualmente su estructura como un tipo separado
// entonces podemos usar directamente typeof para obtener el tipo de ese objeto.

// Otro ejemplo:

const configuracion = {
  idioma: "es",
  tema: "oscuro",
  notificaciones: true,
}

// Obtenemos el tipo de ese objeto
type TipoConfiguracion = typeof configuracion;

// Ahora el tipo TipoConfiguracion representa la estructura del objeto configuracion y podemos usarlo para crear nuevas variables de ese tipo:

const nuevaConfiguracion: TipoConfiguracion = {
  idioma: "en",
  tema: "claro",
  notificaciones: false,
}

// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------

// INDEXED ACCESS TYPES - OBTENER EL TIPO DE UNA PROPIEDAD

// Imaginemos que tenemos:

type ProductoH = {
  nombre: string;
  precio: number;
  disponible: boolean;
};

// E imaginemos ahora que queremos crear un tipo que represente unicamente el tipo de precio
// entonces podriamos hacer, si sabemos que precio es de tipo number entonces que el nuevo
// tipo logicamente sea de tipo number:
type Precio = number;

// Pero hay una forma de obtenerlo directamente desde el tipo ProductoH y es:
type PrecioProductoH = ProductoH["precio"]; // Esto nos devuelve el tipo number

// Es como si le dijeramos a TS que busque la propiedad 'precio' dentro del tipo ProductoH y que nos devuelva su tipo

// Poriamso hacer lo mismo con las demas propiedades
type NombreProductoH = ProductoH["nombre"]; // Esto nos devuelve el tipo string
type DisponibleProductoH = ProductoH["disponible"]; // Esto nos devuelve el tipo boolean

// Tambien podemos indicar mas de una propiedad:
type NombreYPrecioProductoH = ProductoH["nombre" | "precio"]; // Esto nos devuelve el tipo string | number, osea seria lo mismo que hacer esto ultimo manualmente
// Osea seria lo mismo que hacer:
// type NombreYPrecioProductoH = string | number;

// Tambien podemos usar el keyof para obtener el nombre de las propiedades de un tipo y luego usarlo para obtener el tipo de esas propiedades, osea:
type TodosLosValores = ProductoH[keyof ProductoH]; // Esto nos devuelve el tipo string | number | boolean, osea todos los tipos de las propiedades de ProductoH
// TS primero resuelve el keyof ProductoH y obtiene "nombre" | "precio" | "disponible" y luego busca el tipo de cada una de esas propiedades y nos devuelve la union de esos tipos, osea string | number | boolean

// Seria lo mismo que hacer:
// type TodosLosValores = string | number | boolean;

// Tambien podemos utilizar Indexed Access Types con arrays:
type Numeros = number[];

type Elemento = Numeros[number]; // Esto nos devuelve el tipo number, osea el tipo de los elementos del array Numeros
// El resultado seria:
// type Elemento = number;

// Otro ejemplo mas interesante:
const usuariosX = [
  { noombre: "Juan", edad: 30 },
  { noombre: "Pedro", edad: 25 },
  { noombre: "Maria", edad: 28 },
];

type TipoUsuarioX = typeof usuariosX[number]; // Esto nos devuelve el tipo { noombre: string; edad: number; }

// Resumiendo seria para no confundirse:

//  1. keyof Usuario: Obtiene los nombres de las propiedades de un tipo y los transforma en una union de tipos literales

//  2. typeof variable: Obtiene el tipo de una variable

//  3. Usuario["edad"]: Obtiene el tipo de una propiedad especifica de un tipo

// -------------------------------------------------------
// -------------------------------------------------------
// -------------------------------------------------------

// CONDITIONAL TYPES - TIPOS CONDICIONALES

// En programacion utilizamos los condiciones como if para tomar decisiones.

// Pero la novedad es que en TS tambien permite tomar decisiones, pero en lugar de decidir que codigo ejecutar
// decide QUE TIPO UTILIZAR, la sintaxis es:

//    TipoA extends TipoB ? TipoSiSeCumple : TipoSiNoSeCumple

// Se lee: Si TipoA es compatible con TipoB entonces utiliza el primer tipo, de lo contrario
// utiliza el segundo tipo.

// Veamos un ejempllo:

type EsTexto<T> = T extends string ? "Es un texto" : "No es un texto";

// Vemos que el tipo recibe un parametro generico T y comprueba si es compatible con el tipo
// string, si es asi entonces el tipo sera "Es un texto" de lo contrario sera "No es un texto"

// Ahora podemos usar el tipo EsTexto con distintos tipos de datos:
type Resultado1 = EsTexto<string>; // Esto nos devuelve "Es un texto"
type Resultado2 = EsTexto<number>; // Esto nos devuelve "No es un texto"
type Resultado3 = EsTexto<boolean>; // Esto nos devuelve "No es un texto"
type Resultado4 = EsTexto<"Hola">; // Esto nos devuelve "Es un texto" ya que "Hola" es compatible con string

// Veamos un ejemplo mas practico. Imaginemo que tneemos un sistema que recibe identificadores de usuarios
// en algunas partes del programa pueden ser numeros y en otras strings.
// Queremos crear un tipo que convierta cualquier identificador numerico en string, pero que deje los demas tipos como estan, entonces:
type ConvertirId<T> = T extends number ? string : T; // Basicamente si el
// tipo T es compatible con number entonces el tipo sera string, de lo contrario sera
// el mismo tipo T.

// Ahora podemos hacer:
type Id1 = ConvertirId<number>; // Esto nos devuelve string
type Id2 = ConvertirId<boolean>; // Esto nos devuelve boolean
type Id3 = ConvertirId<string>; // Esto nos devuelve string
type Id4 = ConvertirId<"Hola">; // Esto nos devuelve "Hola"

// Basicamente lo que decimos es que si recibe number devuelve el tipo string
// Y si recibe cualquier otro tipo conserva el tipo original.

// Ahora veamos el sig. caso curioso:
