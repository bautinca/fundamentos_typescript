// Importamos la constante, funcion y clase
import { nombreAplicacion, crearUsuario, Usuario } from "./archivo_export2";

// Ahora si podemos hacer uso de ellos
console.log(nombreAplicacion); // Mi sistema de gastos

const usuario1 = crearUsuario("Juan");
console.log(usuario1); // Usuario Juan creado

const usuario2 = new Usuario("Maria");
console.log(usuario2.nombre); // Maria