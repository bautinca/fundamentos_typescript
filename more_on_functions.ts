// PART 4

// Las funciones TAMBIEN SON VALORES
// por eso podemos pasarlas como argumentos, guardarlas en variables y describir sus tipos con bastante
// precision

// Funcion que recibe un string y devuelve nada, por eso su tipo de retorno es void
function saludar(nombre: string): void {
  console.log(`Hola ${nombre}`);
}

saludar("Juan"); // Esto va a imprimir "Hola Juan"

// Esta funcion se la puede expresar asi:

//  (nombre: string) => void

// Veamos otro ejemplo de esto ultimo, es una funcion que recibe una funcion y ejecuta
// la funcion que recibe, en este caso la funcion recibe una funcion que tiene como parametro 'nombre' de tipo string y devuelve un void
// usando la firma anterior
function ejecutarFuncion(funcion: (nombre: string) => void): void {
  funcion("Bautista"); // Aca se ejecuta la funcion que recibe por parametro
}

function saludarFormal(nombre: string): void {
  console.log(`Buenos dias ${nombre}`);
}

// Ahora podemos pasar la funcion saludarFormal como argumento a la funcion ejecutarFuncion
ejecutarFuncion(saludarFormal); // Esto va a imprimir "Buenos dias Juan"

// Tambien podemos utilizar un alias con type para no repetir el tipo, por ejemplo:
type FuncionSaludo = (nombre: string) => void;

function ejecutarFuncionConAlias(funcion: FuncionSaludo): void {
  funcion("Bautista");
}

// Ahora podemos pasar la funcion saludarFormal como argumento a la funcion ejecutarFuncionConAlias
ejecutarFuncionConAlias(saludarFormal); // Esto va a imprimir "Buenos dias Bautista"

// ---------------------------------------
// ---------------------------------------
// ---------------------------------------

// Hasta ahora solo vimos funciones que reciben parametros y devuelven valores
// Pero las funciones al igual que los objetos tambien pueden tener PROPIEDADES, veamos:

function comparar(numero: number): boolean {
  return numero > 10;
}

// Le podemos agregar una propiedad a la funcion comparar
// En este caso le agregamos la propiedad de descripcion
// para agregarle una descripcion de lo que hace la funcion
comparar.descripcion = "Esta funcion compara si un numero es mayor a 10";

console.log(comparar.descripcion); // Esto va a imprimir "Esta funcion compara si un numero es mayor a 10"
// Tambien llamamos la funcion normalmente
console.log(comparar(5)); // Esto va a imprimir false

// Entonces a dicha funcion le podemos asignar un alias
// donde en el alias vamos a describir que la funcion
// tiene una propiedad llamada descripcion de tipo string
// y ademas la funcion recibe un numero y devuelve un booleano
type FuncionDescriptable = {
  descripcion: string; // La propiedad
  (numero: number): boolean; // La funcion. No usamos => porque en este caso nos permite combinar propiedades con la capacidad de invocar el objeto como una funcion
};

// Esta funcion recibe como parametro un tipo FuncionDescriptable que este tipo
// tiene una propiedad llamada 'descripcion' y ademas es una funcion que recibe un 
// numero y devuelve un booleano
function ejecutar2(fn: FuncionDescriptable) {
  console.log(fn.descripcion);
  console.log(fn(15));
}

ejecutar2(comparar);

// ---------------------------------------
// ---------------------------------------
// ---------------------------------------

// Creamos la clase persona y le definimos un constructor
class Persona {
  nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre; // this seria self
  }
}

// Ahora creamos un tipo que seria el constructor de la clase Persona
type ConstructorPersona = {
  // Logicamente llamamos a la propiedad 'new' porque es un constructor
  new (nombre: string): Persona; // El constructor recibe un nombre de tipo string y devuelve una instancia de la clase Persona
}

// Ahora escribimos funcion que como parametro reciba este tipo ConstructorPersona y devuelva una instancia de la clase Persona
function crearPersona(ctor: ConstructorPersona, nombre: string): Persona {
  return new ctor(nombre); // Creamos una nueva instancia de la clase Persona usando el constructor que recibimos como parametro
}

const persona = crearPersona(Persona, "Juan");

console.log(persona.nombre);

// ---------------------------------------
// ---------------------------------------
// ---------------------------------------

// TIPOS GENERICOS

// Esta funcion recibe un array de tipo generico y devuelve el primer elemento
// del tipo generico que recibe, en este caso el tipo generico es T
function primerElemento<T>(arr: T[]): T | undefined { // El tipo de retorno es T o undefined si el arreglo esta vacio
  return arr[0];
}

const numero = primerElemento([1, 2, 3]); // El tipo de numero es number
const palabra = primerElemento(["Hola", "Mundo"]); // El tipo de palabra es string
const vacio = primerElemento([]); // El tipo de vacio es undefined

console.log(numero);
console.log(palabra);
console.log(vacio);

// La gran ventaja de usar tipos genericos es que TypeScript puede inferir el tipo
// de retorno de la funcion dependiendo del tipo de argumento que le pasemos,
// por ejemplo si le pasamos un array de numeros, el tipo de retorno sera number
// y si le pasamos un array de strings, el tipo de retorno sera string

// Podriamos haber hecho lo mismo sin usar tipo generico con:
function primerElementoMalo(arr: any[]) {
  return arr[0];
}

// Esto ultimo tambien funciona pero no es recomendable porque perdemos la
// informacion de tipo y TypeScript no puede inferir el tipo de retorno de la
// funcion, por lo que el tipo de retorno sera any y no podremos aprovechar

// Una funcion puede recibir varios tipos genericos, por ejemplo
// esta funcion recibe un array de un tipo generico Entrada y una funcion
// que recibe un item de tipo Entrada y devuelve un item de tipo Salida, y la funcion
// devuelve un array de tipo Salida
function mapear<Entrada, Salida>(arr: Entrada[], fn: (item: Entrada) => Salida): Salida[] {
  return arr.map(fn); // Usamos el metodo map del array para aplicar la funciona a cada elemento del array y devolver un nuevo array con los resultados
}

const numeros = [1, 2, 3];
console.log(numeros);

// Ahora podemos usar la funcion mapear para convertir un array de numeros a un array de strings
// Como vemos mapear recibe un array de numeros y una funcion que recibe un numero y devuelve un string
const textos = mapear(numeros, (n) => {
    return n.toString();
});

console.log(textos); // Esto va a imprimir ["1", "2", "3"]

// A veces necesitamos que una funcion acepte distitnos tipos pero necesitamos que esos tipos
// tengan alguna caracteristica en comun, osea CONSTRAINTS.
// Supongamos que queremos una funcion que compare 2 valores y devuelva el que tiene mayor longitud
// necesitamos que logicamente ambos valores tengan la propiedad length de tipo number

// En este caso la funcion masLargo recibe 2 parametros de tipo generico T
// pero T tiene que extender de un tipo que tenga la propiedad length de tipo number
function masLargo<T extends { length: number }>(a: T, b: T): T {
  if (a.length > b.length) {
    return a;
  } else {
    return b;
  }
}

// El <T extends { length: number }> significa que T puede ser distintos tipos, pero debe cumplir con una condicion
// tener una propiedad length numerica

// Estas invocaciones son validas
console.log(masLargo("Hola", "Mundo")); // Esto va a imprimir "Mundo". Esto es porque el tipo string tiene la propiedad length de tipo number
console.log(masLargo([1, 2, 3], [4, 5])); // Esto va a imprimir [1, 2, 3]. Esto es porque el tipo array tiene la propiedad length de tipo number

// console.log(masLargo(10, 20)); // Esto va a dar error porque el tipo number no tiene la propiedad length de tipo number

//---------------------------------------
//---------------------------------------
//---------------------------------------

// En las funciones sabemos que el ? significa que el parametro es opcional,
// pero tambien podemos usar el signo = para asignarle un valor por defecto
function saludarConValorPorDefecto(nombre: string = "Invitado") {
  console.log(`Hola ${nombre}`);
}

console.log(saludarConValorPorDefecto()); // Esto va a imprimir "Hola Invitado"
console.log(saludarConValorPorDefecto("Juan")); // Esto va a imprimir "Hola Juan"

// Veamos el siguiente caso
function recorrer(numeros: number[], callback: (numero: number, indice?: number) => void) {
  for (let i = 0; i < numeros.length; i++) {
    callback(numeros[i], i); // Aca se ejecuta la funcion que recibe por parametro
  }
}

// Esta funcion lo que hace es recibir un array de numeros y una funcion callback
// La funcion callback recibe un numero y un indice opcional, y devuelve void
// La invocamos asi:

recorrer([10, 20, 30], (numero) => {console.log(numero)});

// O asi ya que el segundo parametro indice de la funcion callback es opcional:
recorrer([10, 20, 30], (numero, indice) => {console.log(numero, indice)});

// ---------------------------------------
// ---------------------------------------
// ---------------------------------------


// FUNCTION OVERLOADS

function crearFecha(timestamp: number): Date; // Overload signature

function crearFecha(mes: number, dia: number, anio: number): Date; // Overload signature

// Esta funcion tiene 2 overloads, uno que recibe un timestamp y otro
// que recibe mes, dia y anio. La implementacion de la funcion es la siguiente:
function crearFecha(mesOtimestamp: number, dia?: number, anio?: number): Date {
  if (dia !== undefined && anio !== undefined) {
    return new Date(anio, mesOtimestamp - 1, dia);
  } else {
    return new Date(mesOtimestamp);
  }
}

// Esta ultima funcion contiene la implementacion real. Ahora podemos hacer:
const fecha1 = crearFecha(1672531200000); // Esto va a crear una fecha a partir de un timestamp
const fecha2 = crearFecha(1, 1, 2023); // Esto va a crear una fecha a partir de mes, dia y anio

console.log(fecha1);
console.log(fecha2);

// Es valido usar function overloads cuando una funcion tiene distintas formas de invocacion y queremos que TypeScript
// controle cuales son validas. No obstante no conviene abusar de ellas. Si podemos resolver el problema con una union de tipos
// (string | number por ejemplo) muchas veces esa alternativa es la mas sencilla

// ---------------------------------------
// ---------------------------------------
// ---------------------------------------

// VOID indica que una funcion no devuelve un valor que el codigo que la invoca pueda utilizar:
function imprimir(mensaje: string): void {
  console.log(mensaje);
}

// Algo importante es que el void no significa necesariamente que la funcion no tenga un return. Su return puede devolver nada
function imprimir2(mensaje: string): void {
  if (mensaje) {
    console.log(mensaje);
  } else {
    return; // Esto es valido porque no devuelve nada
  }
}

// El UNKNOWN representa un valor cuyo tipo todavia no conocemos. Es parecido al any pero mucho mas seguro
function procesarValor(valor: any) {
  valor.hacerAlgo();
}

// TypeScript permite esto ultimo ya que el any desactiva buena parte de la comprobacion de tipos de TypeScript
// en cambio hacer:

function procesarValorSeguro(valor: unknown) {
  if (typeof valor === "string") {
    console.log(valor.toUpperCase());
  } else if (typeof valor === "number") {
    console.log(valor.toFixed(2));
  } else {
    console.log("Tipo de valor desconocido");
  }
}

// Esta ultima funcion es mucho mas segura ya que TypeScript nos obliga a comprobar
// el tipo de valor antes de usarlo, y no podemos usarlo como si fuera un string
// o un number sin antes comprobar su tipo, lo que nos ayuda a evitar errores en tiempo de ejecucion
// Esto esta muy relacionado a lo de narrowing

// El NEVER ya lo vimos y representa algo que nucna ocurre o un valor q ue nunca llega a observarse
// Una funcion puede retornar never cuando nunca termina normalmente por ejemplo siempre lanza un error
function fallar(mensaje: string): never {
  throw new Error(mensaje);
}

// Otra funcion que retorna never es una funcion que tiene un bucle infinito
function bucleInfinito(): never {
  while (true) {
    // Hacemos algo
  }
}

// Ojo confundir VOID con NEVER ya que VOID la funcion termian normalmente pero no proporciona ningun valor
// de retorno reutilizable, en cambio con NEVER la funcion no termina normalmente ya que
// nunca retorna un valor.

// Por otro lado esta la instruccion FUNCTION que claramente ya sabemos que sirve para
// declarar una funcion, sin embargo si la usamos asi nomas tiene una desventaja que siempre retorna
// un valor de tipo any:
function sumar(a: number, b: number) {
  return a + b;
}

// En cambio si usamos la instruccion FUNCTION con una anotacion de tipo de retorno, TypeScript nos obliga a
// cumplir con ese tipo de retorno y nos da un error si no lo hacemos:
function sumarSeguro(a: number, b: number): number {
  return a + b;
}

// Tambien por ejemplo una funcion que recibe otra funcion donde esta otra funcioon
// tiene un tipo de retorno especifico:
function ejecutarFuncionConRetorno(funcion: (nombre: string) => string, nombre: string) {
  return funcion(nombre); // Aca se ejecuta la funcion que recibe por parametro y devuelve un string
}

console.log(ejecutarFuncionConRetorno((nombre) => `Hola ${nombre}`, "Juan")); // Esto va a imprimir "Hola Juan"

// ---------------------------------------
// ---------------------------------------
// ---------------------------------------

// REST PARAMETERS AND ARGUMENTS

// Podemos crear funciones que aceptan una cant. variable de argumentos asi:

function multiplicar(factor: number, ...numeros: number[]): number[] {
  return numeros.map((numero) => numero * factor);
}

const resultado = multiplicar(2, 1, 2, 3, 4);
console.log(resultado); // Esto va a imprimir [2, 4, 6, 8]

const resultado2 = multiplicar(3, 5, 10);
console.log(resultado2); // Esto va a imprimir [15, 30]

// El ...numeros indica que la funcion puede recibir cualquier cantidada
// de argumentos de tipo number y los agrupa en un array llamado numeros
// El parametro factor es obligatorio y debe ser el primer argumento,
// mientras que los numeros son opcionales y pueden ser 0 o mas argumentos

// Tambien se puede hacer lo siguiente:
const numeros1 = [1, 2, 3];
const numeros2 = [4, 5, 6];

const resultado3 = multiplicar(2, ...numeros1, ...numeros2);
console.log(resultado3); // Esto va a imprimir [2, 4, 6, 8, 10, 12]

// --------------------------------
// --------------------------------
// --------------------------------

// PARAMETER DESTRUCTURING

// Una funcion que recibe un objeto:
function sumar2(objeto: { a: number; b: number; c: number }) {
  console.log(objeto.a + objeto.b + objeto.c);
}

sumar2({ a: 1, b: 2, c: 3 }); // Esto va a imprimir 6

// Otra alternativa de hacerlo seria usando destructuring en los parametros
// de la funcion, de esta manera podemos acceder directamente a las propiedades de
// objeto sin tener que escribir objeto.a, objeto.b, objeto.c osea:

function sumar3({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c); // Sin necesidad de escribir objeto.a, objeto.b, objeto.c
}

sumar3({ a: 1, b: 2, c: 3 }); // Esto va a imprimir 6

// Si el tipo es muy largo podemos usar un alias con type para no repetirlo:
type Coordenadas = {
  x: number;
  y: number;
  z: number;
}

function sumar4({ x, y, z }: Coordenadas) {
  console.log(x + y + z);
}

sumar4({ x: 1, y: 2, z: 3 }); // Esto va a imprimir 6

// Esto ultimo resulta muy util cuando la funcion recibe objetos con muchas propiedades.

// --------------------------------
// --------------------------------
// --------------------------------

// DECLARING THIS IN A FUNCTION

// La palabre clave THIS donde hace referencia al contexto u objeto asociado a una invocacion de funcion. Su valor
// depende de como se invoca la funcion:

const usuario = {
  nombre: "Juan",
  administrador: false,

  convertirseEnAdmin: function () {
    this.administrador = true; // THIS hace referencia al objeto usuario
  }
};

console.log(usuario.administrador); // Esto va a imprimir false
usuario.convertirseEnAdmin();
console.log(usuario.administrador); // Esto va a imprimir true

// Sin embargo en ciertas situaciones queremos especificar explicitamente que tipo debe tener this
// Para esto esta la sig. sintaxis:

interface Usuario {
  nombre: string,
  administrador: boolean,
}

interface BaseDatos {
  filtrarUsuarios(criterio: (usuario: Usuario) => boolean): Usuario[];
}

const db: BaseDatos = {
  filtrarUsuarios: function (criterio) {
    const usuarios: Usuario[] = [
      { nombre: "Juan", administrador: true },
      { nombre: "Maria", administrador: false },
      { nombre: "Pedro", administrador: true },
    ];

    return usuarios.filter(criterio);
  }
};

// El callback recibe cada usuario como argumento, tal como espera Array.filter.
const administadores = db.filtrarUsuarios(function (usuario: Usuario) {
  return usuario.administrador;
});

console.log(administadores); // Esto va a imprimir [{ nombre: "Juan", administrador: true }, { nombre: "Pedro", administrador: true }]