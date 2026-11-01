// PART 5

// Los objetos en TS nos permite agrupar distintos datos en una unica estructura
// por ejemplo al representar un producto:
const producto = {
  nombre: "Teclado",
  precio: 25000,
  disponible: true,
};

// Asi como lo vemos ya tenemos un objeto, pero tambien podemos definir los tipos de datos que tendra cada propiedad del objeto:

type Producto = {
  nombre: string;
  precio: number;
  disponible: boolean;
};

// En este caso definimos el tipo Producto que tiene 3 propiedades, nombre de tipo string, precio de tipo number y disponible de tipo boolean.
// Esto ultimo es un OBJECT TYPE y ahora podemos declarar una variable utilizando este tipo de objeto:
const producto2: Producto = {
  nombre: "Monitor",
  precio: 50000,
  disponible: false,
};

// -----------------------------------
// -----------------------------------
// -----------------------------------

// FORMAS DE DEFINIR TIPOS DE OBJETOS (OBJECT TYPES)

// Podemos declarar el tipo de objeto directamente donde lo necesitamos:
function mostrarProducto(producto: { nombre: string; precio: number; disponible: boolean }) {
  console.log(`El producto ${producto.nombre} tiene un precio de ${producto.precio} y está disponible: ${producto.disponible}`);
}

// En este ultimo caso el parametro producto debe tener un objeto con las propiedades de nombre, precio y disponible con sus respectivos tipos de datos.
// En invocamos la funcion asi:

console.log(mostrarProducto(producto2));

// Es perfectamente válido, pero si necesitamos reutilizar esa estructura en distintas partes del programa, conviene darle un nombre con TYPE
function mostrarProducto2(producto: Producto) {
  console.log(`El producto ${producto.nombre} tiene un precio de ${producto.precio} y está disponible: ${producto.disponible}`);
}

// En este caso estamos reutilizando el tipo Producto que definimos anteriormente, lo cual es mucho mas limpio y facil de mantener.

// Tambien en lugar de usar TYPE podemos usar INTERFACE, que es otra forma de definir
// tipos de objetos en TypeScript, la diferencia es que INTERFACE permite herencia
// y TYPE no, pero para la mayoria de los casos son equivalentes.
interface ProductoInterface {
  nombre: string;
  precio: number;
  disponible: boolean;
}

// Podemos usar la interface de la misma manera que usamos el type:
const producto3: ProductoInterface = {
  nombre: "Mouse",
  precio: 15000,
  disponible: true,
};

console.log(mostrarProducto2(producto3));

// --------------------------------
// --------------------------------
// --------------------------------

// OPTIONAL PROPERTIES

// Hasta ahora todas las propiedades de los objetos que declaramos son obligatoriasa
// sin embargo las propiedades pueden ser opcionales tambien:

type Usuario = {
  nombre: string;
  edad: number;
  telefono?: string; // El signo de interrogacion indica que la propiedad es opcional
}
 
// Al ser opcional la propiedad telefono entonces estas 2 declaraciones son validas:
const usuario1: Usuario = {
  nombre: "Juan",
  edad: 30,
};

const usuario2: Usuario = {
  nombre: "Maria",
  edad: 25,
  telefono: "123456789",
};

// --------------------------------
// --------------------------------
// --------------------------------

// READONLY PROPERTIES

// A veces queremos solo tener propiedades en objetos que no se pueden modificar, que sean solo de lectura
// Se hace asi:
type Cliente = {
  readonly id: number; // El readonly indica que la propiedad es de solo lectura
  nombre: string;
}

// De esta menra podemos leer el cliente pero no podemos modificar su id
const cliente: Cliente = {
  id: 1,
  nombre: "Pedro",
};

console.log(cliente.id); // 1
console.log(cliente.nombre); // Pedro

// cliente.id = 2; // Esto nos dara un error porque id es readonly
cliente.nombre = "Juan"; // Esto si es valido porque nombre no es readonly

console.log(cliente.nombre); // Juan

// readonly es una restriccion del sistema de tipos de TypeSctript. No congela el objeto en tiempo de ejecucion.
// Si realmente necesitamos impedir modificaciones en runtime, podemos usar Object .freeze()

// --------------------------------
// --------------------------------
// --------------------------------

// INDEX SIGNATURES

// Este concepto es util cuando trabajamos con objetos cuyas propiedades no concoemos de antemano
// Si queremos representar las notas de un estudiante podemos tener:

const notas = {
  matematica: 9,
  programacion: 10,
  fisica: 8,
}

// Pero que pasa si de antemano no sabiamos las materias? POdemos hacer asi:

type Notas = {
  [materia: string]: number; // Esto indica que el objeto puede tener cualquier propiedad de tipo string y su valor sera de tipo number
}

// Entonces un objeto de este tipo puede ser asi:
const notas2: Notas = {
  matematica: 9,
  programacion: 10,
  fisica: 8,
  quimica: 7,
  biologia: 6,
};

// O sino:

const notas3: Notas = {
  historia: 8,
  geografia: 9,
};

// Tambien podemos acceder a las propiedades de este objeto de la misma manera dinamicamente:
console.log(notas2["matematica"]); // 9

// Esto resulta especialmente util para representar diccionarios o mapas de datos mediante objetos.

// Por ejemplo podemos tneer:
type ListaNombres = {
  [indice: number]: string;
}

const nombres: ListaNombres = {
  0: "Juan",
  1: "Maria",
  2: "Pedro",
};

console.log(nombres[1]); // Maria

// Tambien podemos hacer readonly en index signatures:
type Configuracion = {
  readonly [clave: string]: string; // Esto indica que el objeto puede tener cualquier propiedad de tipo string y su valor sera de tipo string, pero no se podra modificar
}

const config: Configuracion = {
  apiUrl: "https://api.example.com",
  apiKey: "123456789",
};

console.log(config.apiUrl); // https://api.example.com
console.log(config.apiKey); // 123456789

// config.apiKey = "987654321"; // Esto nos dara un error porque apiKey es readonly


// --------------------------------
// --------------------------------
// --------------------------------

// EXTENDER TIPOS

// Tenemos 2 tipos independientes:
type Auto = {
  marca: string;
  modelo: string;
  anio: number;
  cantidadPuertas: number;
};

type Moto = {
  marca: string;
  modelo: string;
  anio: number;
  cilindrada: number;
};

// Estamos repitiendo propiedades, una alternativa es usar extends con interfaces

// Primero definimos una estructura comun entre ambos tipos:
interface Vehiculo {
  marca: string;
  modelo: string;
  anio: number;
}

// Luego extendemos esta interface en las otras:
interface Auto2 extends Vehiculo {
  cantidadPuertas: number;
}

interface Moto2 extends Vehiculo {
  cilindrada: number;
}

// Basicamente con extends estamos diciendo que Auto2 y Moto2 hereden las propiedades
// definidas en Vehiculo dentro de sus respectivos tipos

const miAuto: Auto = {
  marca: "Toyota",
  modelo: "Corolla",
  anio: 2020,
  cantidadPuertas: 4,
};

const miMoto: Moto = {
  marca: "Honda",
  modelo: "CBR500R",
  anio: 2021,
  cilindrada: 500,
};

// Tambien podemos extender multiples interfaces, por ejemplo:
interface VehiculoDeportivo extends Auto2, Moto2 {
  velocidadMaxima: number;
}

// Ahora un objeto de tipo VehiculoDeportivo tendra las propiedades de Auto2, Moto2
// y ademas la propiedad velocidadMaxima
const miVehiculoDeportivo: VehiculoDeportivo = {
  marca: "Ferrari",
  modelo: "488 GTB",
  anio: 2020,
  cantidadPuertas: 2,
  cilindrada: 3902,
  velocidadMaxima: 330,
};

// De esta forma podemos reutilizar estructuras sin repetir declaraciones

// --------------------------------
// --------------------------------
// --------------------------------

// TIPOS DE INTERSECCION

// Antes extendiamos interfaces, pero tambien podemos hacer lo mismo con los tipos
// usando el operador & para crear intersecciones de tipos:

type Motor = {
  potencia: number;
};

type Color = {
  color: string;
}

type Auto3 = Motor & Color

// Ahora Auto3 tendra las propiedades de Motor y Color
const miAuto3: Auto3 = {
  potencia: 150,
  color: "Rojo",
};

// --------------------------------
// --------------------------------
// --------------------------------

// TIPOS DE OBJETOS GENERICOS

// Imaginemos que queremos representar una caja que puede almacenar cualquier tipo de dato, entonces podriamos hacer:
type Caja = {
  contenido: any; // Esto indica que la propiedad contenido puede ser de cualquier tipo
}

// Ya sabemos que any LO TENEMOS QUE TRATAR DE EVITAR ya que desaprovechamos gran potencial de TS.
// En cambio podemos usar genericos para definir un tipo de objeto que pueda
// almacenar cualquier tipo de dato pero manteniendo el tipo de dato que se le pase:
type CajaGenerica<T> = {
  contenido: T; // Esto indica que la propiedad contenido sera del tipo que se le pase al generico T
}

// Ahora podemos crear cajas de distintos tipos de datos:
const cajaDeNumeros: CajaGenerica<number> = {
  contenido: 123,
};

const cajaDeStrings: CajaGenerica<string> = {
  contenido: "Hola",
};

const cajaDeBooleanos: CajaGenerica<boolean> = {
  contenido: true,
};

// De esta forma podemos crear cajas de distintos tipos de datos sin perder el tipado
// y sin tener que usar any, lo cual es mucho mas seguro y limpio.

// Tambien podemos usar tipos genericos con interfaces:
interface CajaGenericaInterface<T> {
  contenido: T;
}

const cajaDeNumeros2: CajaGenericaInterface<number> = {
  contenido: 456,
};

const cajaDeStrings2: CajaGenericaInterface<string> = {
  contenido: "Mundo",
};

const cajaDeBooleanos2: CajaGenericaInterface<boolean> = {
  contenido: false,
};

// Y tambien podemos tener varios tipos genericos, por ejemplo:
interface CajaGenericaMultiple<T, U> {
  contenido1: T;
  contenido2: U;
}

const cajaDeNumerosYStrings: CajaGenericaMultiple<number, string> = {
  contenido1: 789,
  contenido2: "Hola Mundo",
};

// --------------------------------
// --------------------------------
// --------------------------------

// ARRAYS DE SOLO LECTURA

// Hasta ahora vimo que podemos utilizar readonly para impedir que se reasigne una propiedad
// a un objeto, pero tambien pdoemos impedir que se modifiqeu un array a traves de una referecia:

const numeros: readonly number[] = [1, 2, 3, 4, 5];

// Logicamente podemos consultar sus elementos pero no modificarlos:
console.log(numeros[0]); // 1
console.log(numeros.length); // 5

// numeros.push(6); // Esto nos dara un error porque el array es readonly
// numeros[0] = 10; // Esto tambien nos dara un error porque el array es readonly

// Tambien a una funcion le podemos pasar un array de solo lectura como parametro:
function mostrarNumeros(numeros: readonly number[]) {
  numeros.forEach((numero) => {
    console.log(numero);
  });
}

mostrarNumeros(numeros); // 1 2 3 4 5

// --------------------------------
// --------------------------------
// --------------------------------

// TUPOS DE TUPLAS

// Hasta ahora usamos arrays como:

const datos: (string | number)[] = ["Juan", 30, "Maria", 25];

// Pero imaginemos que queremos representar exactamente 2 datos:
//  1. Un nombre, que debe ser string
//  2. Una edad, que debe ser number

// Entonces podemos usar una tupla:
type Persona = [string, number]; // Esto indica que la tupla debe tener un string y un number en ese orden

const persona1: Persona = ["Juan", 30];
const persona2: Persona = ["Maria", 25];

// Tienen que ser exactamente 2 elementos y de esos tipos y en ese orden.

// Otro ejemplo:
type Coordenadas = [number, number];
const punto: Coordenadas = [10, 20];

// Y podemos acceder
console.log(punto[0]); // 10
console.log(punto[1]); // 20

// Tambien podemos extraer sus elementos facilmente:
const [x, y] = punto;
console.log(x); // 10
console.log(y); // 20

// Tambien podemos crear tuplas con elementos opcionales:
type CoordenadasOpcionales = [number, number, number?]; // Esto indica que la tupla debe tener un number, un number y un tercer number opcional

// Entonces:
const punto2D: CoordenadasOpcionales = [10, 20]; // Valido
const punto3D: CoordenadasOpcionales = [10, 20, 30]; // Valido

// Tambien podemos combinar elementos definidos con una cantidad variable de otros elementos
type Datos = [string, ...number[]]; // Esto indica que la tupla debe tener un string y luego cualquier cantidad de numbers

const datos1: Datos = ["Juan", 30, 25, 20]; // Valido
const datos2: Datos = ["Maria"]; // Valido

// Y tambien podemos tener tuplas de solo lectura
const coordenadas: readonly [number, number] = [10, 20];
console.log(coordenadas[0]); // 10
console.log(coordenadas[1]); // 20

// coordenadas[0] = 30; // Esto nos dara un error porque la tupla es readonly

