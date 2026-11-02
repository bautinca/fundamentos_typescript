## Resolucion de Modulos

Este apatado es muy importante cuando empezamso a trabajar con proyectos que tienen muchos archivos.

Hasta ahora escribiamos importaciones simples como esta:

```TypeScript
import { sumar } from "./operaciones.js"
```

Pero como sabe TS donde esta ese archivo? A ese proceso se le llama **RESOLUCION DE MODULOS**. Para entenderlo imaginemos que tenemso el proyecto con la sig. estructura:

```
mi-proyecto/
├─ app.ts
├─ operaciones.ts
└─ usuarios/
   └─ usuarios.ts
```

Entonces desde `app.ts` podemos importar la funcion `sumar()` del archivo
`operaciones.ts` asi:

```TypeScript
import { sumar } from "./operaciones.js"
```

Y para importar `usuarios.ts` que esta dentro del directorio `usuarios/` podemos hacer lo siguiente:

```TypeScript
import { obtenerUsuarios } from "./usuarios/usuarios.js"
```

Por ejemplo si tuvieramos el sig proyecto con la sig. estructura compleja:

```
mi-proyecto/
├── app.ts
├── operaciones.ts
└── servicios/
    └── usuarios/
        └── usuario.ts
```

Si estamos en `usuario.ts` para importar `operaciones.ts` podemos hacer lo siguiente:

```TypeScript
import { sumar } from "../../operaciones.js"
```

Sin embargo no todas las importaciones apuntan a archivos propios de nuestro proyecto, quiza queremos importar paquetes de terceros como `express`, en ese caso la importacion seria:

```TypeScript
import express from "express"
```

Aca estamos importando un paquete externo llamado `express` y luego TS y el entorno de ejecucion tienen que determinar donde esta instalado ese paquete y que archivo corresponde utilizar.

Generalmente en un proyecto de *NodeJS* los paquetes se instalan dentro de `node_modules/` y TS sabe que tiene que buscar ahi. Entonces por ejemplo podemos tener un proyecto con la sig. estructura:

```
mi-proyecto/
├── node_modules/ ---> Aca estan todos los paquetes de terceros que instalamos
│   └── express/
├── package.json
├── app.ts
└── tsconfig.json
```

## Module Output Options: Como se genera el JavaScript

Vamos a explicar como influye la config. de TS en el JS generado.

Recordeos que TS no se ejecuta directamente en los navegadores como si fuera JavaScript (JS), sino que primero se **compila**. Y en esa compilacion es donde entran en juego 2 opciones importantes dentro del archivo `tsconfig.json`:

- `target`
- `module`

La opcion `target` determina a que version de JS queremos compilar, por ejemplo el archivo `tsconfig.json` lo podemos tener asi:

```json
{
  "compilerOptions": {
    "target": "ES2020"
  }
}
```

Esto indica que al compilar el TS queremos generar JS compatible con las caracteristicas de ES2020.

Esto es util ya que hay veces que queremos usar caracteristicas de JS modernas, pero no todos los navegadores soportan esas caracteristicas, entonces podemos compilar a una version mas antigua de JS para que sea compatible con mas navegadores.

## ¿Porque importamos archivos .js y no .ts?

Nuestros archivos sabemos que se llaman con la extension `.ts` sin embargo cuando importamos hacemos de archivos `.js` como de la sig. manera:

```TypeScript
import { sumar } from "./operaciones.js"
```

La explicacion es que en muchos proyectos modernos que utilizan NodeJS y TypeScript los archivos TS se compilan a JS antes de ser ejecutados. Por lo tanto, cuando importamos un archivo, estamos importando el archivo JS generado a partir del archivo TS original.

TS entiende que esa importacion puede corresponder al archivo fuente `operaciones.ts` durante la comprobacion y compilacion.

Esto evita que tengamos que cambiar manualmente las rutas despues de compilar.

