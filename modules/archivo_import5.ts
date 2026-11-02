// Tambien podemos hacer importaciones mixtas, es decir
// por un lado importar valores y por otro lado tipos juntos:

import { saludar, type Usuario } from "./archivo_export3";

// En este caso estamos importando la funcion
// saludar como un valor que existe en tiempo de ejecucion
// y el tipo Usuario como un tipo que solo existe en tiempo de compilacion

// Entonces podemos usar la funcion saludar en tiempo de ejecucion:
saludar();

// Y podemos usar el tipo Usuario para declarar variables:
const usuario: Usuario = {
  nombre: "Maria",
  edad: 25,
};

console.log(usuario);