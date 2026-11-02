// PART 7

// Una clase es una plantilla que define que datos y comportamientos tendran
// los objetos que creamos a partir de ella

class Auto {
  // Los campos
  marca: string;
  modelo: string;
  anio: number;

  // El constructor: Nos sirve cuando instanciamos un objeto de la clase
  constructor(marca: string, modelo: string, anio: number) {
    // this es como self
    this.marca = marca;
    this.modelo = modelo;
    this.anio = anio;
  }

  // Metodo arrancar
  arrancar(): void {
    console.log(`El auto ${this.marca} ${this.modelo} del año ${this.anio} ha arrancado.`);
  }
}

const auto1 = new Auto("Toyota", "Corolla", 2020); // Al hacer new se ejecuta el constructor
const auto2 = new Auto("Honda", "Civic", 2021);

// auto1 y auto2 son 2 objetos creados a partir de la misma clase

auto1.arrancar();
auto2.arrancar();

// Principalmente dentro de una clase vamos a encontrar los siguientes elementos:

//  1. Fields (campos): Son las variables que definen el estado de un objeto, en el caso de la clase Auto son los
//     campos marca, modelo y anio
//  2. Methods (metodos): Son las funciones que definen el comportamiento de un objeto, en el caso de la clase Auto es el metodo arrancar
//  3. Accessors: Permiten controlar como se leen o modifican propiedades de un objeto, en el caso de la clase Auto no tenemos accessors aun

// Respecto a los campos tambien les podemos asignar valor inicialmente, por ejemplo:

class Auto2 {
  marca: string = "Toyota";
  modelo: string = "Corolla";
  anio: number = 2020;
}

// Entonces cuando instanciamos un objeto de la clase Auto2, los campos ya tendran un valor inicial
const auto3 = new Auto2();
console.log(auto3.marca); // Toyota
console.log(auto3.modelo); // Corolla
console.log(auto3.anio); // 2020

// Es decir, no necesitamos usar constructor para inicializar esos campos.

// Ahora vamos a ver el tema de readonly. El readonly sirve tambien para que una propiedad
// no pueda ser modificada despues de ser inicializada. Por ejemplo:

class Usuario {
  readonly dni: string;
  nombre: string;

  constructor(dni: string, nombre: string) {
    this.dni = dni;
    this.nombre = nombre;
  }
}

// Entonces:
const usuario = new Usuario("12345678", "Juan");
console.log(usuario.dni);
console.log(usuario.nombre);

// usuario.dni = "87654321"; // Esto nos va a dar error porque dni es readonly

// ---------------------------------
// ---------------------------------
// ---------------------------------

// CONSTRUCTORES

// Un constructor puede recibir parametros opcionales y valores por defecto igual
// que en las funciones
class Producto {
  nombre: string;
  precio: number

  constructor(nombre: string, precio: number = 0) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

// Entonces podemos instanciar productos de estas 2 maneras:
const producto1 = new Producto("Camiseta", 20);
const producto2 = new Producto("Pantalon"); // precio sera 0 por defecto

// ---------------------------------
// ---------------------------------
// ---------------------------------

// SUPER CALLS

// Este concepto aparece cuando trabajamos con herencia. Imaginemos que tenemos una clase Animal
// y otra clase Perro que hereda de ella, entonces:

class Animal {
  nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }
}

class Perro extends Animal {
  raza: string;

  constructor(nombre: string, raza: string) {
    super(nombre); // super llama al constructor de la clase padre (Animal) y le pasa el nombre
    this.raza = raza;
  }
}

// La regla importante es que cuando una clase hija tiene su propio constructor, debe llamar a super()
// antes de utilizar this ¿Porque? Porque primero tiene que inicialziarse la parte heredada del objeto.

const perro = new Perro("Firulais", "Labrador");

// Entonces el constructor de Perro utiliza super(nombre) para que la clase Animal se encargue de inicializar nombre.
// Despues, la clase hija inicializa raza.

// ---------------------------------
// ---------------------------------
// ---------------------------------

// METODOS

// Un metodo es una funcion pero definida dentro de una clase. Representa una accion o comportamiento
// que puede realizar un objeto

class CuentaBancaria {
  saldo: number;

  constructor(saldoInicial: number) {
    this.saldo = saldoInicial;
  }

  depositar(monto: number): void {
    this.saldo += monto;
    console.log(`Se depositaron ${monto}. Nuevo saldo: ${this.saldo}`);
  }

  consultarSaldo(): number {
    return this.saldo;
  }
}

// Y podemos utilizar los metodos asi, primero instanciamos un objeto de la clase CuentaBancaria y luego llamamos a sus metodos:
const cuenta = new CuentaBancaria(1000);
cuenta.depositar(500); // Se depositaron 500. Nuevo saldo: 1500
console.log(cuenta.consultarSaldo()); // 1500

// ---------------------------------
// ---------------------------------
// ---------------------------------

// GETTERS Y SETTERS

// Nos permiten controlar como se accede a una propiedad.
// Supongamos que tenemos una clase que representa un producto y queremos evitar que alguen le asigne
// un precio negativo. UNa posibilidad seria declarara al precio como privado
// y proporcionar metodos para consultarlo y modificarlo. Pero por suerte tenemos los getters y setters

class Producto2 {
  private _precio: number = 0;

  // Getter: Nos sirve para consultar el valor de una propiedad privada
  get precio(): number {
    return this._precio;
  }

  // Setter: Nos sirve para modificar el valor de una propiedad privada
  set precio(valor: number) {
    if (valor < 0) {
      throw new Error("El precio no puede ser negativo");
    } else {
      this._precio = valor;
    }
  }
}

// Y se usa asi, primero instanciamos un objeto
const producto = new Producto2();

// Luego ejecutamos el setter para asignarle un valor a la propiedad precio
producto.precio = 100; // Esto llama al setter y asigna el valor 100 a _precio

// Y luego ejecutamos el getter para consultar el valor de la propiedad precio
console.log(producto.precio); // Esto llama al getter y devuelve el valor 100

// La diferencia es que el get sirve cuando queremos leer la propiedad
// y el set sirve cuando queremos modificarla.

// Lo interesante de todo es que desde afuera parece que trabajamos con una propiedad
// normal ya que hacemos producto.precio = 100, pero en realidad estamos utilizando metodos para controlar el acceso a esa propiedad.

// Esto de los setters y getters es muy util ya que nos permite proteger los datos de una clase
// y establecer reglas para modificarlos
// Por ejemplo podriamos validar que la edad no sea negativa, que un descuento no supere
// cierto porcentaje, etc...

// ---------------------------------
// ---------------------------------
// ---------------------------------

// INDEX SIGNATURES

// Recordemos que los index signatures servian para
// definir un tipo de objeto que puede tener propiedades con nombres dinamicos. Por ejemplo:

interface Diccionario {
  [clave: string]: number | string;
}

const diccionario: Diccionario = {
  "hola": "hello",
  "adios": "goodbye",
  "peperoni": 42
};

// Bueno resulta que tambien podemos usar index signatures dentro de una clase
// para definir propiedades con nombres dinamicos. Por ejemplo:

class Configuracion {
  [clave: string]: number | string; // Propiedad dinamica con nombre de tipo string y valor de tipo number o string
  
  nombre: string = "Mi Aplicacion"; // Propiedad normal
  version: number = 1; // Propiedad normal
}

const config = new Configuracion();
config.idioma = "es"; // Esto crea una propiedad dinamica llamada idioma
config.maxUsuarios = 100; // Esto crea una propiedad dinamica llamada maxUsuarios

console.log(config.nombre);
console.log(config.idioma);
console.log(config.maxUsuarios);

// Sin embargo en la practica no es muy comun usar index signatures dentro de clases
// ya que puede hacer que el codigo sea mas dificil de entender y mantener. Es mejor definir propiedades
// de manera explicita siempre que sea posible.

// ----------------------------------------------
// ----------------------------------------------
// ----------------------------------------------

// CLASS HERITAGE: HERENCIA ENTRE CLASES

// La idea es que una clase pueda reutilizar las caracteristicas de otra. Por ejemplo imaginemos que estamos
// desarrollando un sistema para administrar empleados. Tenemos empleados
// comunes y empleados que son gerentes.

// Sabemos que ambos tienen nombre y sueldo pero los gerentes tambien tienen un dpto a cargo entonces:

class Empleado {
  nombre: string;
  sueldo: number;

  constructor(nombre: string, sueldo: number) {
    this.nombre = nombre;
    this.sueldo = sueldo;
  }

  trabajar(): void {
    console.log(`${this.nombre} esta trabajando.`);
  }
}

// Clase gerente hereda de la clase empleado, entonces tiene acceso a
// los metodos y propiedades de la clase padre y tambien a sus propios
// metodos y propiedades.
class Gerente extends Empleado {
  departamento: string;

  constructor(nombre: string, sueldo: number, departamento: string) {
    super(nombre, sueldo); // Llamamos al constructor de la clase padre (Empleado)
    this.departamento = departamento;
  }

  organizarEquipo(): void {
    console.log(`${this.nombre} esta organizando el equipo del departamento ${this.departamento}.`);
  }
}

// Ahora instanciamos un gerente
const gerente = new Gerente("Juan", 5000, "Ventas");
gerente.trabajar();
gerente.organizarEquipo();

// Entonces el gerente tiene acceso a los metodos y propiedades de la clase padre (Empleado) y tambien a sus propios metodos y propiedades.
// La palabra clave EXTENDS establece la herencia.

// ----------------------------------
// ----------------------------------
// ----------------------------------

// IMPLEMENTS

// Vamos a ver algo que puede confundirse con herencia que son los IMPLEMENTS.
// Supongamos que queremos que determinadas clases obligatoriamente tengan un metodo
// lamado encender() entonces podemos definir una interfaz
// que tenga ese metodo y hacer que las clases la implementen. Por ejemplo:

interface Encendible {
  encender(): void;
}

// Esta interfaz establece un CONTRATO: Cualquier clase que la implemente debe tener un metodo
// encender() que no devuelva ningun valor

class Automovil implements Encendible {
  encender(): void {
    console.log("El automovil ha sido encendido.");
  }
}

class Computadora implements Encendible {
  encender(): void {
    console.log("La computadora ha sido encendida.");
  }
}

// Entonces la diferencia fundamental entre implements y extends es que:

// 1. Implements implementa un contrato definido por una interfaz, extends hereda de otra clase
// 2. Implements no hereda la implementacion de metodos, extends hereda metodos y propiedades de la clase base
// 3. En implements una clase puede implementar varias interfaces, en extends una clase solo puede extender de una clase base

// Como dijimos, una clase puede implementar mas de una interfaz:

interface Encendible2 {
  encender(): void;
}

interface Apagable2 {
  apagar(): void;
}

// Esta clase implementa estas 2 interfaces, por ende va a tener que
// tener los metodos encender() y apagar()
class Computadora2 implements Encendible2, Apagable2 {
  encender(): void {
    console.log("La computadora ha sido encendida.");
  }

  apagar(): void {
    console.log("La computadora ha sido apagada.");
  }
}

// ----------------------------------
// ----------------------------------
// ----------------------------------

// SOBREESCRITURA DE METODOS

// Cuando una clase hereda de otra, puede reemplazar el comportamiento de un metodo heredado
// por ejemplo:

class Animal2 {
  hacerSonido(): void {
    console.log("El animal hace un sonido.");
  }
}

class Perro2 extends Animal2 {
  hacerSonido(): void { // Este metodo sobreescribe el metodo hacerSonido() de la clase padre (Animal2)
    console.log("El perro ladra.");
  }
}

class Gato2 extends Animal2 {
  hacerSonido(): void { // Este metodo sobreescribe el metodo hacerSonido() de la clase padre (Animal2)
    console.log("El gato maulla.");
  }
}

const perro2 = new Perro2();
const gato2 = new Gato2();

perro2.hacerSonido(); // El perro ladra.
gato2.hacerSonido(); // El gato maulla.

// unque ambos heredan de Animal, cada uno proporciona su propia implementacion
// de hacerSonido().

// Tambien podemos usar super para ejecutar la implementacion original de la clase padre
// por ejemplo:

class Tigre2 extends Animal2 {
  hacerSonido(): void {
    super.hacerSonido(); // Llama al metodo hacerSonido() de la clase padre (Animal2)
    console.log("El tigre ruge.");
  }
}

const tigre2 = new Tigre2();
tigre2.hacerSonido(); // El animal hace un sonido. El tigre ruge.

// ----------------------------------
// ----------------------------------
// ----------------------------------

// VISIBILIDAD DE LOS MIEMBROS

// Ahora vamos a ver como es el control para establecer
// quien puede acceder a las propiedades y metodos de una clase

// TS ofrece 3 modificadores de visibilidad principales: public, private y protected

// Primero vemos el PUBLIC, basicamente significa que podemos acceder al miembro desde cualquier lugar:

class Usuario2 {
  public nombre: string = "Pedro"; // public es el valor por defecto, asi que no es necesario escribirlo pero aca lo explicitamos
}

const usuario2 = new Usuario2();
console.log(usuario2.nombre); // Pedro
usuario2.nombre = "Juan"; // Podemos modificarlo desde afuera
console.log(usuario2.nombre); // Juan

// Ahora veamos el PRIVATE, significa que un miembro solamente puede utilizarse desde dentro de la propia clase

class CuentaBancaria2 {
  private saldo: number = 1000; // saldo es privado, no se puede acceder desde afuera

  consultarSaldo(): number {
    return this.saldo; // Podemos acceder a saldo desde dentro de la clase
  }
}

const cuenta2 = new CuentaBancaria2();
cuenta2.consultarSaldo(); // Podemos consultar el saldo desde afuera a traves del metodo publico
// cuenta2.saldo; // Esto nos daria error porque saldo es privado

// Esto es muy util para proteger info. interna y obligar a que el acceso se realice mediante metodos controlados

// Por ultimo PROTECTED, es parecido a private pero permite que las clases hijas tambien accedan al miembro, por ejemplo:

class Animal3 {
  protected nombre: string = "Animal"; // nombre es protegido, no se puede acceder desde afuera pero si desde clases hijas
}

class Perro3 extends Animal3 {
  mostrarNombre(): void {
    console.log(`El nombre del perro es ${this.nombre}`); // Podemos acceder a nombre desde la clase hija
  }
}

const perro3 = new Perro3();
perro3.mostrarNombre(); // El nombre del perro es Animal
// perro3.nombre; // Esto nos daria error porque nombre es protected y no se puede acceder desde afuera

// ---------------------------------
// ---------------------------------
// ---------------------------------

// MIEMBROS ESTATICOS

