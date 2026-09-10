// Entrypoint del servidor — importa la app y abre el puerto.
import { app } from './app.js';

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
