# version-app

Proyecto simple para practicar TypeScript con una app web dividida en **frontend** y **backend**.

- **Backend** (`backend/`): servidor Express en TypeScript que expone un unico endpoint `GET /version` -> `{ "version": "1.10.1" }`.
- **Frontend** (`frontend/`): pagina HTML que muestra la version grande en el centro, obtenida del backend via `fetch`.

Sin React. Frontend en TypeScript puro + HTML + CSS.

## Estructura

```
backend/
  src/index.ts        # servidor Express + CORS + /version
  package.json
  tsconfig.json
frontend/
  src/main.ts         # TS puro: fetch + DOM
  index.html
  styles.css
  package.json
  tsconfig.json
```

## Requisitos

- Node.js >= 18
- npm
- (opcional) Python 3 para servir el frontend en desarrollo

## Backend

```bash
cd backend
npm install
npm run dev          # http://localhost:3000
```

Prueba:

```bash
curl http://localhost:3000/version
# {"version":"1.10.1"}
```

Compilar y ejecutar (produccion):

```bash
npm run build
npm start
```

## Frontend

```bash
cd frontend
npm install
npm run build        # compila src/main.ts -> dist/main.js
```

Servir los archivos estaticos (ejemplo con Python):

```bash
cd frontend
python3 -m http.server 5173
# abre http://localhost:5173
```

En desarrollo puedes usar `npm run dev` (tsc --watch) para recompilar al guardar.

## Decisiones del frontend (explicadas)

1. **Sin React**: para mostrar un texto obtenido por fetch, React añade build tooling (Vite), conceptos (componentes, estado, JSX) y peso innecesario. HTML + CSS + TS puro es mas directo para aprender fundamentos.
2. **TypeScript puro en el navegador**: el navegador no ejecuta `.ts`, por eso se compila a `.js` con `tsc`. El `index.html` carga `./dist/main.js` como modulo ES.
3. **CORS en el backend**: al servir frontend y backend en puertos distintos en desarrollo, el navegador bloquea el fetch por politica same-origin. `app.use(cors())` permite la llamada. En produccion, lo ideal es servir frontend desde el mismo origen o configurar CORS estricto.
4. **Tipado de la respuesta**: se define `interface VersionResponse { version: string }` para tipar el JSON del fetch, practicando interfaces y genericos de `fetch`.
5. **Manejo de errores**: try/catch y verificacion de `response.ok`, mostrando "Error" si falla.
6. **CSS con `clamp()`**: tamaño de fuente responsivo sin media queries.
7. **Flexbox centrado**: contenedor a altura completa centrado vertical y horizontalmente.
