import express, { Request, Response } from "express";

// Version de la aplicacion. Se mantiene sincronizada con package.json.
const APP_VERSION: string = "1.10.1";

// Puerto en el que escucha la app. Se puede indicar por la variable de entorno PORT.
const PORT: number = Number(process.env.PORT) || 3000;

// Creamos la aplicacion Express.
const app = express();

// Middleware para parsear JSON en el body (util si mas adelante agregas POST).
app.use(express.json());

// Endpoint unico: /version
app.get("/version", (_req: Request, res: Response): void => {
  res.json({ version: APP_VERSION });
});

// Arrancamos el servidor.
app.listen(PORT, (): void => {
  console.log(`Servidor TypeScript escuchando en http://localhost:${PORT}`);
  console.log(`Prueba: curl http://localhost:${PORT}/version`);
});
