"use strict";
// PART 7
// Una clase es una plantilla que define que datos y comportamientos tendran
// los objetos que creamos a partir de ella
class Auto {
    // Los campos
    marca;
    modelo;
    anio;
    // El constructor: Nos sirve cuando instanciamos un objeto de la clase
    constructor(marca, modelo, anio) {
        // this es como self
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
    }
    // Metodo arrancar
    arrancar() {
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
    marca = "Toyota";
    modelo = "Corolla";
    anio = 2020;
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
    dni;
    nombre;
    constructor(dni, nombre) {
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
    nombre;
    precio;
    constructor(nombre, precio = 0) {
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
    nombre;
    constructor(nombre) {
        this.nombre = nombre;
    }
}
class Perro extends Animal {
    raza;
    constructor(nombre, raza) {
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
    saldo;
    constructor(saldoInicial) {
        this.saldo = saldoInicial;
    }
    depositar(monto) {
        this.saldo += monto;
        console.log(`Se depositaron ${monto}. Nuevo saldo: ${this.saldo}`);
    }
    consultarSaldo() {
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
    _precio = 0;
    // Getter: Nos sirve para consultar el valor de una propiedad privada
    get precio() {
        return this._precio;
    }
    // Setter: Nos sirve para modificar el valor de una propiedad privada
    set precio(valor) {
        if (valor < 0) {
            throw new Error("El precio no puede ser negativo");
        }
        else {
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
const diccionario = {
    "hola": "hello",
    "adios": "goodbye",
    "peperoni": 42
};
// Bueno resulta que tambien podemos usar index signatures dentro de una clase
// para definir propiedades con nombres dinamicos. Por ejemplo:
class Configuracion {
    nombre = "Mi Aplicacion";
    version = 1;
}
const config = new Configuracion();
config.idioma = "es"; // Esto crea una propiedad dinamica llamada idioma
config.maxUsuarios = 100; // Esto crea una propiedad dinamica llamada maxUsuarios
console.log(config.nombre);
console.log(config.idioma);
console.log(config.maxUsuarios);
