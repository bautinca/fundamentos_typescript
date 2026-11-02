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

// Hasta ahora todas las propiedades y metodos que vimos pertenecian
// a una instancia particular de una clase. Pero
// y si queremos que una propiedad o metodo
// pertenezca a la clase en si misma y no a una instancia particular?
// Para eso tenemos los miembros estaticos. Por ejemplo:

class Usuario3 {
  static cantidad: number = 0; // cantidad es un miembro estatico, pertenece a la clase Usuario3 y no a una instancia particular

  constructor() {
    Usuario3.cantidad++; // Cada vez que se crea un nuevo usuario, incrementamos la cantidad de usuarios
  }
}

const usuario3_1 = new Usuario3();
const usuario3_2 = new Usuario3();
const usuario3_3 = new Usuario3();

console.log(Usuario3.cantidad); // 3, accedemos a la propiedad estatica cantidad desde la clase Usuario3

// Un detalle importante es que accedemos a la propiedad usando el nombre DE LA CLASE que es Usuario3.
// y no mediante una instancia como haciamos antes.

// Tambien podemos definir metodos estaticos:

class Calculadora {
  static sumar(a: number, b: number): number {
    return a + b;
  }
}

console.log(Calculadora.sumar(5, 10)); // 15, accedemos al metodo estatico sumar desde la clase Calculadora

// Si nos fijamos no necesitamos crear una instancia de Calculadora para utilizar sumar().
// Esto es util para funcionalidades que no dependen del estado de un objeto particular.

// ---------------------------------
// ---------------------------------
// ---------------------------------

// STATIC BLOCKS

// Son bloques de codigo que se ejecutan una sola vez cuando se inicializa la clase
// y permiten realizar inicializaciones complejas de miembros estaticos.

class Configuracion2 {
  static modo: string;

  // Bloque estatico
  static {
    const entorno = "desarrollo";

    if (entorno === "desarrollo") {
      Configuracion2.modo = "debug";
    } else {
      Configuracion2.modo = "produccion";
    }
  }
}

// Cuando se inicializa la clase se ejecutara ese bloque estatico y se asigna el valor de la
// propiedad estatica modo.

// ---------------------------------
// ---------------------------------
// ---------------------------------

// CLASES GENERICAS

// Ya vimos tipos de datos genericos en funciones
// Tambien el mismo concepto se puede aplicar a clases.
// Supongamos que queremos crear una clase Caja que pueda almacenar cualquier tipo de dato
// entonces:

class Caja<T> { // T es un tipo generico
  contenido: T;

  constructor(contenido: T) {
    this.contenido = contenido;
  }
}

// La <T> significa que la clase recibe un parametro generico. Ese parametro
// representa el tipo de dato que almacenara la caja, entonces podemos crear una caja
// con un tipo de dato especifico, por ejemplo:

const cajaDeNumeros = new Caja<number>(123); // Caja que almacena un numero
const cajaDeCadenas = new Caja<string>("Hola"); // Caja que almacena una cadena

console.log(cajaDeNumeros.contenido); // 123
console.log(cajaDeCadenas.contenido); // Hola

// La ventaja es que podemos reutiizar la misma clase para diferentes tipos de datos sin perder
// el control de tipos

// Una limitante importante es que no podemos
// usar los tipos genericos para definir propiedades estaticas:
class Caja2<T> {
  // static contenido: T; // Esto nos daria error porque no podemos usar un tipo generico en un miembro estatico
}

// ---------------------------------
// ---------------------------------
// ---------------------------------

// EXPRESIONES DE CLASE

// Hasta ahora declaramos clases de esta manera:
class Usuario4 {
  nombre = "Pedro";
}

// Sin embargo tambien podemos crear clases asignandolas a una variable:

const Usuario5 = class {
  nombre = "Juan";
}

const usuario5 = new Usuario5();
console.log(usuario5.nombre); // Juan

// Es tal cual lo mismo, la diferencia es que en la primera forma
// le damos un nombre a la clase y en la segunda forma no.
// En la segunda forma la clase es anonima y se asigna a la variable Usuario5.

// Tambien podemos usar genericos en las expresiones de clase:

const Caja3 = class<T> {
  contenido: T;

  constructor(contenido: T) {
    this.contenido = contenido;
  }
}

const cajaDeBooleanos = new Caja3<boolean>(true);
console.log(cajaDeBooleanos.contenido); // true

// ---------------------------------
// ---------------------------------
// ---------------------------------

// FIRMAS DE CONSTRUCTORES

// Veamos el siguiente caso:

class Auto3 {
  constructor(public marca: string) {}
}

// Tenemos la clase Auto3 con un constructor que podemos invocar con new.
// Las instancias de la clase Auto3 son objetos creados mediante ese constructor

// Por ejemplo la sig. instancia:
const miAuto = new Auto3("Toyota");

// Si queremos obtener e2l tipo de instancia a partir de la clase podemos usar:
type TipoAuto = InstanceType<typeof Auto3>;

// Ahora TipoAuto es un tipo que representa la instancia de Auto3, por tanto
// podemos crear una funcion que reciba un parametro de tipo TipoAuto:
function mostrarMarca(auto: TipoAuto) {
  console.log(`La marca del auto es ${auto.marca}`);
}

mostrarMarca(miAuto); // La marca del auto es Toyota

// Entonces typeof Auto3 obtiene el tipo de la propia clase, pero luego cuando
// de eso hacemos InstanceType obtiene el TIPO DE INSTANCIA que produce ese constructor

// Para no confundir, no es que obtenemos el tipo de la clase, sino el TIPO
// DE INSTANCIA que produce el constructor de la clase.

// ---------------------------------
// ---------------------------------
// ---------------------------------

// CLASES Y MIEMBROS ABSTRACTOS

// Esto es un concepto muy imporrtante de la POO.
// Una clase abstracta es una clase que sirve como plantilla para otras clases, pero que no puede
// instanciarse directamente.
// Imaginemos que estamos desarrollando un sistema de figuras geometricas
// Sabemos que todas las figuras tienen un area pero la forma de calcularla varia
// en c/u

// ENtonces podemos en primera instancia definir una clase abstracta que engloba a todas
// las figuras geometricas:

abstract class Figura {
  abstract calcularArea(): number; // Este metodo es abstracto, no tiene implementacion y debe ser implementado por las clases hijas
}

// Entonces Figura es una clase ABSTRACTA. Por otro lado su metodo
// calcularArea() es un metodo ABSTRACTO donde al ser abstracto no tiene implementacion en esta clase abstracta
// sin embargo las clases hijas que hereden de Figura deberan implementar ese metodo.

class Rectangulo3 extends Figura {
  constructor(public ancho: number, public alto: number) {
    super();
  }

  calcularArea(): number {
    return this.ancho * this.alto;
  }
}

// Y otra clase:
class Circulo3 extends Figura {
  constructor(public radio: number) {
    super();
  }

  calcularArea(): number {
    return Math.PI * this.radio * this.radio;
  }
}

// Y creamos instancias de ambos:
const rectangulo = new Rectangulo3(5, 10);
const circulo = new Circulo3(3);

console.log(`Area del rectangulo: ${rectangulo.calcularArea()}`);
console.log(`Area del circulo: ${circulo.calcularArea()}`);

// Entonces la clase Figura es abstracta y no puede instanciarse directamente, pero sirve como plantilla para las clases Rectangulo3 y Circulo3 que implementan el metodo calcularArea() de manera especifica para cada figura.

// Esto no esta permitido
// const figura = new Figura(); // Esto nos daria error porque Figura es abstracta y no puede instanciarse directamente

// Esto ultimo nos daria error porque es una clase ABSTRACTA, no tiene sentido crear una figura generica si no
// sabemos como clacular su area.

// Entonces las clases ABSTRACTAS sirven para definir una estructura comun que todas las clases derivadas deben respetar.

// Tambien podemos definir metodos normales dentro de clases abstractas

abstract class Figura2 {
  abstract calcularArea(): number; // Metodo abstracto

  mostrarArea(): void { // Metodo normal: La logica de este metodo lo van a compartir todas las clases hijas, por eso lo definimos en la clase abstracta.
    console.log(`El area es: ${this.calcularArea()}`);
  }
}

// Esto ultimo define 2 cosas:
// 1. Comportamiento compartido definido en la clase abstracta mostrarArea()
// 2. Comportamiento especifico definido por cada clase concreta calcularArea()

// ---------------------------------
// ---------------------------------
// ---------------------------------

// RELACIONES ENTRE CLASES

// Recordemos que TS generalmente no se fija en el nombre de un tipo, sino en la estructura que tiene
// Por ejemplo supongamos estas 2 clases con nombres distintos pero que sin embargo
// tienen la misma estructura:

class Persona6 {
  nombre = "Pedro";
  edad = 25;
}

class Usuario6 {
  nombre = "Juan";
  edad = 30;
}

// Aunque son 2 clases distintas, ambas tienen exactamente las mismas propiedades y tipos
// Por lo tanto TS toma como valido hacer lo siguiente:

const persona: Persona6 = new Usuario6(); // Esto es valido porque ambas clases tienen la misma estructura

// TS lo acepta porque considera que tiene todo lo necesario para hacerlo compatible con
// la clase Persona6 que seria una propiedad nombre de tipo string y una propiedad edad de tipo number.
// NO IMPORTA QUE LAS CLASES TENGAN NOMBRES DISTINTOS.

// Veamos este otro caso:

class Persona7 {
  nombre = "Pedro";
  edad = 25;
}

class Empleado7 {
  nombre = "Juan";
  edad = 30;
  sueldo = 1000000;
}

// Esto ultimo tambien lo acepta:
const persona7: Persona7 = new Empleado7(); // Esto es valido porque Empleado7 tiene todas las propiedades de Persona7 y ademas tiene una propiedad extra sueldo

// En cambio esto ultimo no funcionaria:
// const empleado7: Empleado7 = new Persona7(); // Esto nos daria error porque Persona7 no tiene la propiedad sueldo que si tiene Empleado7

