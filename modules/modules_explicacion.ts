// PART 8

// Vamos a organizar nuestro codigo en distintos archivos y hacer que se puedan comunicar entre si.

// Como hacemos para que por ejemplo un archivo encargado de calcular gastos
// use la funcion definida en otro archivo? Aca entran en juego
// los MODULOS y particularmente 2 palabras que vamos a usar constantemente que son

// EXPORT: Permite que otros archivos puedan utilizar algo que definimos
// IMPORT: Permite utilizar algo que otro archivo exporto.

// ------------------------------------------------
// ------------------------------------------------
// ------------------------------------------------

// MODULOS

// Hasta ahora escribiamos todo dentro de un mismo archivo, por ejemplo:

function sumar(a: number, b: number): number {
  return a + b;
}

const resultado = sumar(2, 3);

console.log(resultado);

// Esto funciona en un principio muy bien, pero a medida que la app escala esto
// se hace 0 mantenible. Una solucion seria separar el codigo en distintos archivos segun responsabilidades
// por ejemplo:

//  mi-aplicacion/
//    usuarios.ts -----> Usuarios
//    gastos.ts -----> Gastos
//    calculos.ts ----> Calculos
//    app.ts -----> Entrada de la aplicacion

// Cada archivo tiene sus propias funciones, variables, clases interfaces, etc.
// Por ejemplo ahora creamos los archivos calculos.ts y app.ts
// que hace uso de la funcion sumar que definimos en calculos.ts

// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------

// SCRIPTS Y MODULOS

// Un SCRIPT es un archivo cuyo contenido se encuentra en ambito global. Por ejemplo imaginemos estos 2 archivos:

// archivo1.ts
const nombre = "Pedro";

// archivo2.ts
console.log(nombre);

// En determinados contextos, si estos archivos se cargan como scripts dentro de una misma pagina,
// el segundo puede acceder a la variable declarada en el primero.

// Sin embargo esto ultimo tiene un problema: Todos los scripts comparten el mismo espacio global
// Ya que imaginemos que 2 archivos declaran una variable con el mismo nombre, entonces
// el segundo archivo va a pisar la variable del primero y eso puede traer problemas.

// Por otro lado estan los MODULOS que solucionan este problema.
// Ya que un modulo hace que cada archivo tenga su propio AMBITO.
// Por ejemplo:

// archivo1.ts
const nombre2 = "Pedro";

// archivo2.ts
console.log(nombre2); // Error

// En este caso el archivo2.ts no puede acceder a la variable nombre2
// declarada en archivo1.ts porque cada archivo tiene su propio ambito.

// La variable nombre2 pertenece al ambito privado del modulo archivo1.ts
// Si queremos compartirla debemos si o si exportarla, hacer algo asi en los archivos
// archivo_export.ts y archivo_import.ts

// Una regla importante es que un archivo que contiene una declaracion
// IMPORT o EXPORT en el nivel superior es considerado un MODULO.

// Por lo contrario un archivo sin esas declaraciones puede ser tratado como un SCRIPT

// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------

// IMPORT

// Ya vimos la forma basica para importar que es:
// import { sumar } from "./calculos";

// Pero existen otras variantes para importar, por ejemplo
// importar todo el contenido de un modulo y asignarle un alias:

import { sumar as sumarNumeros } from "./calculos";

// Entonces podemos hacer:
sumarNumeros(2, 3);

// Esto es un alias que le asignamos a la funcion
// sumar(). Tambien podemos reenombrar varias importaciones:

import {
  sumar as sumarNumeros2,
  restar as restarNumeros2,
  multiplicar as multiplicarNumeros2,
  dividir as dividirNumeros2,
} from "./calculos2";

console.log(sumarNumeros2(2, 3));
console.log(restarNumeros2(5, 3));
console.log(multiplicarNumeros2(2, 3));
console.log(dividirNumeros2(10, 2));

// Tambien podemos importar todo el modulo con el *
// O sino tambien podemos importar un modulo sin importar sus elementos, osea
// hacer algo asi:
// import "./calculos2";

// Por ejemplo se puede dar la sig. situacion imaginemos que tenemos este archivo:

// inicializacion.ts
console.log("Inicializando la aplicacion...");

export const version = "1.0.0";

// Cuando otro archovo importa ese modulo:

// app.ts
// import "./inicializacion";

// Lo que sucede en el archivo app.ts es que se ejecuta el codigo
// del archivo inicializacion.ts y luego se puede hacer uso de la constante
// version que exporta el archivo inicializacion.ts

// Esto puede ser util cuando un archivo realiza alguna inicializacion automatica o tiene otros efectos
// secundarios. Por ejemplo registrar componentes, configurara una biblioteca o establecer determinados
// valores iniciales.

// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------

// TYPESCRIPT Y LAS IMPORTACIONES DE TIPOS

// Vamos a estudiar los archivos archivo_export3.ts y archivo_import3.ts respectivamente

// -------------------------------------------------------
// -------------------------------------------------------
// -------------------------------------------------------

// Leer faltante.md