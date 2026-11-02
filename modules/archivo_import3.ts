// Vamos a importar ambos
import { Usuario, saludar } from "./archivo_export3";

// Y los usamos, por ejemplo tneemos la interfaz Usuario y la funcion saludar()
const usuario: Usuario = {
  nombre: "Juan",
  edad: 30,
};

console.log(usuario);
saludar();

// Sin embargo hay una particularidad, Usuario es una interfaz, osea un tipo
// y saludar() es una funcion, es decir, un valor que existe en tiempo de ejecucion.

// TypeScript permite utilizar la misma sintaxis de importacion para ambos, pero tambien ofrece una forma
// explicita de indicar que queremos importar solamente los TIPOS usando el IMPORT TYPE
// en el archivo archivo_import4.ts hacemos uso.