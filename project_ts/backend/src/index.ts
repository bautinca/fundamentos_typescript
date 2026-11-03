import express, { Request, Response } from "express";
import cors from "cors";

// Version de la aplicacion (sincronizada con package.json).
const APP_VERSION: string = "1.10.1";

// Puerto configurable por variable de entorno PORT.
const PORT: number = Number(process.env.PORT) || 3000;

const app = express();

// CORS: permite que el frontend (otro origen/puerto en desarrollo) llame al backend.
app.use(cors());

// Parseo de JSON en el body (util si agregas POST mas adelante).
app.use(express.json());

// Unico endpoint expuesto por el backend.
app.get("/version", (_req: Request, res: Response): void => {
  res.json({ version: APP_VERSION });
});

app.listen(PORT, (): void => {
  console.log(`Backend TypeScript escuchando en http://localhost:${PORT}`);
  console.log(`Endpoint: http://localhost:${PORT}/version`);
});
