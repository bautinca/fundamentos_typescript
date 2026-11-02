# version-app

Aplicacion web minimalista en **TypeScript** que expone un unico endpoint:

- `GET /version` -> `{ "version": "1.10.1" }`

Sin frontend. Ideal para practicar conceptos basicos de TypeScript y ver como levantar una app HTTP.

## Requisitos

- Node.js >= 18
- npm

## Instalacion

```bash
npm install
```

## Desarrollo (hot reload)

```bash
npm run dev
```

Por defecto escucha en el puerto `3000`. Puedes indicar otro puerto con la variable de entorno `PORT`:

```bash
PORT=4000 npm run dev
```

## Compilar y ejecutar (produccion)

```bash
npm run build
npm start
```

## Probar el endpoint

```bash
curl http://localhost:3000/version
# {"version":"1.10.1"}
```

## Estructura

```
src/
  index.ts   # servidor Express + endpoint /version
tsconfig.json
package.json
```

## Conceptos de TypeScript que se practican

- Tipado estatico (`string`, `number`, `void`).
- Anotaciones de tipo en funciones y parametros.
- Inferencia de tipos (`const app = express()`).
- Tipos de librerias externas (`@types/express`).
- Configuracion del compilador (`tsconfig.json`).
- Scripts de npm para desarrollo y build.
