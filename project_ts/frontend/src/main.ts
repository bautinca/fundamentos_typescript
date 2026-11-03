// URL del backend. En desarrollo el backend corre en el puerto 3000.
const VERSION_URL: string = "http://localhost:3000/version";

// Tipo que esperamos recibir del backend.
interface VersionResponse {
  version: string;
}

async function loadVersion(): Promise<void> {
  const element = document.getElementById("version");
  if (!element) {
    return;
  }

  try {
    const response = await fetch(VERSION_URL);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data: VersionResponse = await response.json();
    element.textContent = data.version;
  } catch (error) {
    console.error("Error al obtener la version:", error);
    element.textContent = "Error";
  }
}

// Ejecutamos cuando el DOM esta listo.
loadVersion();
