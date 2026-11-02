// Importamos los tipos
import type { Usuario } from "./archivo_export3";

// Esto significa que estamos importando Usuario exclusivamente como un tipo
// y no como un valor que existe en tiempo de ejecucion

// Entonces el tipo lo podemos usar para declarar variables:
const usuario: Usuario = {
  nombre: "Juan",
  edad: 30,
};

console.log(usuario);

// Pero no podemos usarlo como un valor en tiempo de ejecucion, por ejemplo
// si intentamos hacer algo asi:
// const nuevoUsuario = new Usuario("Pedro"); // Esto generaria un error porque Usuario es un tipo y no un valor

// Ahora vamos al archivo archivo_import5.ts