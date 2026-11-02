// Imaginemos que exportamos estas cosas:

export interface Usuario {
  nombre: string;
  edad: number;
}

// Exportamos tambien una funcion
export function saludar(): void {
  console.log("Hola!");
}

// Lo vamos a importar en el archivo archivo_import3.ts y hacemos uso de ellos