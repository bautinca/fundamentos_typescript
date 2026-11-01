// PART 1

// Definimos variables de diferentes tipos, const sirve para declarar variables que no van a cambiar su valor, mientras que let sirve para declarar variables que pueden cambiar su valor.
const nombre = "Juan";
const edad = 28;
const activo = true;

// Imprimimos por STDOUT
console.log(nombre);
console.log(edad);
console.log(activo);

const message = "HELLO WORLD";
// Pasamos a minúsculas el mensaje
message.toLowerCase();
console.log(message);

let value: string = "Hello"; // Estamos diciendo que la variable es de tipo string
// Con let le podemos cambiar el valor a la variable, obviamente por otro string
value = "Comida";
console.log(value);

// Esta es una forma de declarar un objeto en TypeScript, podemos definir el tipo de cada propiedad del objeto, en este caso name es de tipo string y age es de tipo number.
const user = {
  name: "Daniel",
  age: 26,
};
console.log(user.name);
console.log(user.age);

const new_value = Math.random() < 0.5 ? 30 : 42; // Asigna 30 si el número aleatorio es menor que 0.5, de lo contrario asigna 42
console.log(new_value);

// Veamos como es el if...else...
if (new_value === 30) {
  console.log("El valor es 30");
} else {
  console.log("El valor es 42");
}

// ----------------------------
// ----------------------------
// ----------------------------

// tsc es el compilador de TypeScript que significa TypeScript Compiler.
// Entonces al ser el compilador es el encargado de analizar el codigo en TypeScript y pasarlo a JavaScript

// Dado un codigo en .ts para compilarlo y ejecutarlo tenemso que hacer
// tsc the_basics.ts -> Esto nos genera el archivo the_basics.js, osea su version en JavaSript

// Luego para ejecutar el JavaScript generado podemos hacer
// node the_basics.js -> Para ejecutar el archivo the_basics.js y ver el resultado de la ejecucion del codigo en TypeScript. Basicamente
// se ejecuta usando el runtime de JavaScript que es Node.js, y este runtime es el encargado de ejecutar el codigo en JavaScript.

// Creamos funcion
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
greet("Alice", new Date());

// TypeScript tambien puede deducirl os tipos
let new_message = "Hello World"; // TypeScript deduce que new_message es de tipo string
console.log(new_message);

// Algo interesante de las anotaciones de tipo es que cuando se compila un archivo TypeScript
// en JavaScript, las anotaciones de tipo se eliminan, ya que JavaScript no tiene un sistema de 
// tipos como TypeScript. Por lo tanto, el código resultante en JavaScript no tendrá ninguna
// información de tipo, y será más ligero y rápido de ejecutar.
// TypeScript utiliza los tipos para analizar el codigo durante la compilacion y luego los elimina para generar el JavaScript
// y que se ejeucte de manera eficiente en el runtime de JavaScript.

let new_value2: any = "Hello World"; // TypeScript no puede deducir el tipo de la variable, por lo que se le asigna el tipo any
// Ojo con usar any ya que perdemos gran parte del potencial de TypeScript, ya que no tendremos la seguridad de tipos que nos ofrece TypeScript. Por lo tanto, es recomendable evitar el uso de any siempre que sea posible.
console.log(new_value2);

let username: string = "Juan";
console.log(username);

// Otra sintaxis nueva es:
let username2: string | null = "Juan"; // Esto es valido ya que estamos diciendo que la variable puede ser de tipo string o null (la variable puede contener string o null)
console.log(username2);

username2 = null;
console.log(username2);