// PART 3

// Para el narrowing sirve mucho el typeof guard
// que sirve para chequear el tipo de una variable y hacer un narrowing del tipo de la variable, es decir, si tenemos una variable que puede ser de varios tipos, podemos usar typeof para chequear el tipo de la variable 
// y hacer un narrowing del tipo de la variable.

const nombre = "Juan";
const edad = 28;

console.log(typeof nombre); // string
console.log(typeof edad); // number

// TypeScript utiliza estas comprobaciones para realizar Narrowing
// Que es narrowing? Narrowing es el proceso de reducir el tipo de una variable
// a un tipo mas especifico, es decir, si tenemos una variable que puede ser varios tipos
// podemos usar typeof para chequear el tipo de la variable y hacer un narrowing del tipo
// de la variable. Por ejemplo:

function procesar(valor: string | number) {
  if (typeof valor === "string") {
    // Aqui TypeScript sabe que valor es de tipo string
    console.log(valor.toUpperCase());
  } else {
    // Aqui TypeScript sabe que valor es de tipo number
    console.log(valor.toFixed(2));
  }
}

/*
Algo muy curioso de JavaScript es que al null se les puede hacer typeof
y el resultado es "object" lo cual es un poco confuso.
*/

console.log(typeof null); // object

// Esto puede generar problemas si intentamos identificar arrays mediante typeof:

function imprimirElementos(valores: string[] | string | null) {
  if (valores !== null && typeof valores === "object") { // Tenemos que chequear explicitamente que valores no sea null ya que null tambien es tomado como 'object'
    for (const valor of valores) {
      console.log(valor);
    }
  }
}

// Otra alternativa seria chequear que valores sea explicitamente un array:
function imprimirElementos2(valores: string[] | string | null) {
  if (Array.isArray(valores)) { // Aca TypeScript se asegura que valores es un array y hace el narrowing del tipo de la variable
    for (const valor of valores) {
      console.log(valor);
    }
  }
}

// Por otro lado las condiciones de un if no necesitan ser si o si booleanas:
let nombre_persona = "Juan";

if (nombre_persona) {
  console.log("El nombre de la persona es: " + nombre_persona);
}

/*
Hay valores que TypeScript considera falsy, es decir, que considera que son falsos, y son:
  - false (obviamente)
  - 0
  - -0
  - 0n
  - ""
  - null
  - undefined
  - NaN

Todo lo que no sean estos valores son truthly, es decir, que son verdaderos.
*/

// Imaginemos que tenemos funcion que recibe opcionalmente un nombre
function saludar(nombre?: string) {
  if (nombre) { // Aca TypeScript hace un narrowing del tipo de la variable nombre, ya que si nombre es truthy, entonces sabemos que nombre es de tipo string
    console.log("Hola " + nombre);
  } else {
    console.log("Hola desconocido");
  }
}

saludar("Juan");
saludar(); // Aca no le pasamos ningun nombre, por lo que nombre es undefined y entra en el else

// Ojo con pasarle valores falsy a la funcion saludar:
saludar(""); // Aca le pasamos un string vacio, que es falsy, por lo que entra en el else y nos dice "Hola desconocido"

// Vamos a ver comparaciones de igualdad, se usan operadores como:
// - == (igualdad abstracta)
// - === (igualdad estricta)
// - != (desigualdad abstracta)
// - !== (desigualdad estricta)

// Por ejemplo:

function comparar(x: string | number, y: string | boolean) {
  if (x === y) { // Aca x e y son estrictamente iguales, es decir, tienen el mismo tipo y el mismo valor, por lo tanto es logico que son strings.
    console.log("x y y son iguales");
  } else {
    console.log("x y y son diferentes");
  }
}

comparar("5", true); // Aca x es string y y es boolean, por lo tanto son diferentes
comparar("5", "5"); // Aca x e y son string y tienen el mismo valor, por lo tanto son iguales

function comparar2(valor: string | null) {
  if (valor !== null) {
    console.log("El valor es: " + valor); // Aca TypeScript hace un narrowing del tipo de la variable valor, ya que si valor es diferente de null, entonces sabemos que valor es de tipo string
  }
}

// NOTA: Es recomendable mantener !== y === para mantener un codigo mas explicito y predecible, ya que el operador == y != pueden generar resultados inesperados debido a la coercion de tipos que hace JavaScript.

// Ahora el operador IN
const usuario = {
  nombre: "Juan",
  edad: 28,
}

console.log("nombre" in usuario); // true
console.log("apellido" in usuario); // false

// Y tambien esta el INSTANCEOF que sirve para chequear si un objeto es instancia de una clase

function procesarFecha(valor: Date | string) {
  if (valor instanceof Date) {
    console.log("La fecha es: " + valor.toDateString()); // Aca TypeScript hace un narrowing del tipo de la variable valor, ya que si valor es instancia de Date, entonces sabemos que valor es de tipo Date
  } else {
    console.log("El valor es: " + valor); // Aca TypeScript hace un narrowing del tipo de la variable valor, ya que si valor no es instancia de Date, entonces sabemos que valor es de tipo string
  }
}

procesarFecha(new Date());
procesarFecha("2024-06-01");

// Entonces en resumen:

//  - typeof: Identificar tipos primitivos y algunas categorias de valores
//  - instanceof: Identificar instancias de clases
//  - in: Identificar propiedades de objetos

// Veamos el sig. codigo
let valor = Math.random() < 0.5 ? 10 : "Hello"; // El tipo de valor es string | number

// Como el tipo de valor es string | number entonces puede valer tanto string como number:
valor = 20;
console.log(valor);

valor = "Hola";
console.log(valor);

// Veamos esta funcion:
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input; // Aca TypeScript hace un narrowing del tipo de la variable padding, ya que si padding es de tipo number, entonces sabemos que padding es de tipo number
  } else {
    return padding + input; // Aca TypeScript hace un narrowing del tipo de la variable padding, ya que si padding es de tipo string, entonces sabemos que padding es de tipo string
  }
}

// Otro ejemplo:
function ejemplo() {
  let valor: string | number | boolean;

  valor = true;
  console.log(valor);

  if (Math.random() < 0.5) {
    valor = "Hola";
    console.log(valor);
  } else {
    valor = 100;
    console.log(valor);
  }

  return valor;
}

// ------------------------------------
// ------------------------------------
// ------------------------------------

// TYPE PREDICATES

// Un Type Predicate permite definir una función
// que le comunica explícitamente a TypeScript qué tipo tiene un valor cuando la función devuelve true.

type Pez = {
  nadar: () => void;
};

type Ave = {
  volar: () => void;
};

// Creamos funcion que determina si es pez o no, logicamente devuelve un booleano
function esPez(animal: Pez | Ave): animal is Pez {
  // Asumiendo que animal es de tipo Pez entonces tiene la propiedad nadar por tanto:
  return (animal as Pez).nadar !== undefined; // Si animal es Pez entonces la propiedad nadar esta definida.
}

// De esta ultima funcion el 'animal is Pez' es clave ya que le estamos indicando
// a TypeScript que si esPez() devuelve true entonces puede considerar que animal es de tipo Pez.

function mover(animal: Pez | Ave) {
  if (esPez(animal)) {
    animal.nadar(); // Aca TypeScript sabe que animal es de tipo Pez gracias al type predicate
  } else {
    animal.volar(); // Aca TypeScript sabe que animal es de tipo Ave gracias al type predicate
  }
}

// Inicialmente animal puede ser Pez o Ave.
// Invocamos nuestra funcion esPez()
// Si devuelve true, TypeScript considera que animal es Pez
// Si devuelve false, dentro del else considera que es Ave

// Veamos mas usos de la funcion esPez()
// En este caso animales es un array de Pez o Ave
const animales: (Pez | Ave)[] = [
  { nadar: () => console.log("El pez esta nadando") },
  { volar: () => console.log("El ave esta volando") },
];
console.log(animales);

const peces: Pez[] = animales.filter(esPez); // Aca TypeScript sabe que peces es un array de Pez gracias al type predicate
console.log(peces);

// ------------------------------------
// ------------------------------------

// ASSSERTION FUNCTIONS

// Es otra tecnica de narrowing, el type predicate devuelve un booleano que permite determinar si un
// valor pertenece a determinado tipo.

// Un assertion function funciona de otra manera, comprueba una condicion y si no se cumple genera una excepcion
function asegurarString(valor: unknown): asserts valor is string {
  if (typeof valor !== "string") {
    throw new Error("Se esperaba un string");
  }
}

// Con el 'asserts valor is string' le estamos diciendo a TypeScript que si la funcion 
// asegurarString() no lanza una excepcion entonces puede considerar que valor es de tipo string.

function procesar2(valor: unknown) {
  asegurarString(valor); // Aca TypeScript sabe que valor es de tipo string gracias al assertion function
  console.log(valor.toUpperCase());
}

// Si no se produjo una excepcion entonces TypeScript sabe que valor es de tipo string y podemos usarlo como tal.
procesar2("Hola mundo"); // Aca no se produce una excepcion y podemos usar valor como string


// ----------------------------
// ----------------------------
// ----------------------------

// Tenemos 2 figuras
type Circulo = {
  kind: "circulo";
  radio: number;
};

type Cuadrado = {
  kind: "cuadrado";
  lado: number;
};

// Creamos tipo que representa ambas posibilidades
type Figura = Circulo | Cuadrado;

// Ambos objetos Circulo y Cuadrado comparten la propiedad
// 'kind' pero que sus valores son diferentes. Esta propiedad
// es una propiedad DISCRIMINANT PROPERTY, es decir, una propiedad que permite discriminar entre los diferentes tipos de un union type.

// Entonces usando la propiedad discriminante podemos hacer narrowing:
function calcularArea(figura: Figura) {
  if (figura.kind == "circulo") {
    return Math.PI * figura.radio ** 2; // Aca TypeScript sabe que figura es de tipo Circulo gracias a la propiedad discriminante
  } else {
    return figura.lado ** 2; // Aca TypeScript sabe que figura es de tipo Cuadrado gracias a la propiedad discriminante
  }
}

let circulo: Circulo = { kind: "circulo", radio: 5 };
let cuadrado: Cuadrado = { kind: "cuadrado", lado: 10 };

console.log(calcularArea(circulo));
console.log(calcularArea(cuadrado));

// La funcion de calcularArea tambien se podia hacer con un switch
function calcularArea2(figura: Figura) {
  switch (figura.kind) {
    case "circulo":
      return Math.PI * figura.radio ** 2; // Aca TypeScript sabe que figura es de tipo Circulo gracias a la propiedad discriminante
    case "cuadrado":
      return figura.lado ** 2; // Aca TypeScript sabe que figura es de tipo Cuadrado gracias a la propiedad discriminante
    default:
      const _exhaustiveCheck: never = figura; // Aca TypeScript nos obliga a cubrir todos los casos posibles de Figura, si agregamos un nuevo tipo de Figura y no lo cubrimos en el switch, TypeScript nos dara un error.
      return _exhaustiveCheck;
  }
}

// Otro ejemplo del switch case
type PedidoPendiente = {
    estado: "pendiente";
    fechaCreacion: Date;
};

type PedidoEnviado = {
    estado: "enviado";
    numeroSeguimiento: string;
};

type PedidoEntregado = {
    estado: "entregado";
    fechaEntrega: Date;
};

type Pedido =
    | PedidoPendiente
    | PedidoEnviado
    | PedidoEntregado;

function procesarPedido(pedido: Pedido) {

    switch (pedido.estado) {

        case "pendiente":
            console.log(pedido.fechaCreacion);
            break;

        case "enviado":
            console.log(pedido.numeroSeguimiento);
            break;

        case "entregado":
            console.log(pedido.fechaEntrega);
            break;
    }
}

let pedido1: PedidoPendiente = { estado: "pendiente", fechaCreacion: new Date() };
let pedido2: PedidoEnviado = { estado: "enviado", numeroSeguimiento: "123456789" };
let pedido3: PedidoEntregado = { estado: "entregado", fechaEntrega: new Date() };

procesarPedido(pedido1);
procesarPedido(pedido2);
procesarPedido(pedido3);

// ----------------------------
// ----------------------------
// ----------------------------

// El tipo never representa un valor que nunca deberia existir.
function procesar3(valor: string | number) {

    if (typeof valor === "string") {

        console.log(valor.toUpperCase());

    } else if (typeof valor === "number") {

        console.log(valor.toFixed());

    } else {

        // ¿Qué tipo tiene valor acá?, no es ni string ni number por lo tanto el tipo de valor es NEVER
        // Sirve para detectar situaciones que nunca deberian ocurrir
    }
}

// Exhaustive checking es una tecnica que nos permite asegurarnos de que hemos
// cubierto todos los casos posibles de un union type, y si no lo hacemos TypeScript nos dara un error.

// Por ejemplo si recordamos el caso de las figuras geometricas en el switch case,
// si agregamos un nuevo tipo de figura y no lo cubrimos en el switch, TypeScript
// nos dara un error, ya que el tipo de figura no es exhaustivo, es decir, no hemos
// cubierto todos los casos posibles de la union type Figura. Esto nos permite
// detectar errores en tiempo de compilacion y no en tiempo de ejecucion, lo cual
// es muy util para evitar errores en el codigo.

// Recordemos el caso pero ahora con vehiculos

type Auto = {
  tipo: "auto";
  marca: string;
}

type Moto = {
  tipo: "moto";
  marca: string;
}

type Vehiculo = Auto | Moto;

function procesarVehiculo(vehiculo: Vehiculo) {
  switch (vehiculo.tipo) {
    case "auto":
      console.log(vehiculo.marca);
      break;
    case "moto":
      console.log(vehiculo.marca);
      break;
    default:
      const comprobacion: never = vehiculo; // Aca TypeScript nos obliga a cubrir todos los casos posibles de Vehiculo, si agregamos un nuevo tipo de Vehiculo y no lo cubrimos en el switch, TypeScript nos dara un error.
      return comprobacion;
  }
}

// Que estamos haciendo en el default? Lo que le estamos diciendo a TypeScript
// es que esperamos a que vehiculo sea de tipo never, es decir, que no puede
// ser de ningun otro tipo, y si vehiculo es de otro tipo entonces TypeScript nos
// dara un error, ya que no hemos cubierto todos los casos posibles de Vehiculo. Esto nos permite detectar errores en tiempo de compilacion y no en tiempo de ejecucion, lo cual es muy util para evitar errores en el codigo.

// Que sucede si agregamos nuevo vehiculo? Por ejemplo un camion:
type Camion = {
  tipo: "camion";
  marca: string;
}

// Y agregamos el Camion al union type Vehiculo:
type Vehiculo2 = Auto | Moto | Camion;

// Ahora la funcion anterior procesarVehiculo genera un error ya que
// no hemos cubierto el caso del camion en el switch. Cuando llegamos al default TypeScript ya no considera
// que vehiculo es de tipo never ya que puede ser de tipo Camion.

// Esto ultimo es justamente lo que queremos! Asegurarnos de que hemos cubierto
// todos los casos posibles de un union type.

function procesarVehiculo2(vehiculo: Vehiculo2) {
  switch (vehiculo.tipo) {
    case "auto":
      console.log(vehiculo.marca);
      break;
    case "moto":
      console.log(vehiculo.marca);
      break;
    case "camion":
      console.log(vehiculo.marca);
      break;
    default:
      const comprobacion: never = vehiculo; // Aca TypeScript nos obliga a cubrir todos los casos posibles de Vehiculo2, si agregamos un nuevo tipo de Vehiculo2 y no lo cubrimos en el switch, TypeScript nos dara un error.
      return comprobacion;
  }
}

