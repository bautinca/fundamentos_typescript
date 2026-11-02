// Exportamos una constante
export const nombreAplicacion = "Mi sistema de gastos";

// Exportamos una funcion
export function crearUsuario(nombre: string): string {
  return `Usuario ${nombre} creado`;
}

// Exportamos una clase
export class Usuario {
  constructor(public nombre: string) {}
}

// Entonces al exportar estos 3 elementos entonces cualquier otro modulo
// puede importarlos, por ejemplo los importamos en el
// archivo archivo_import2.ts y hacemos uso de ellos