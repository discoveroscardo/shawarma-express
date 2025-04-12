// index.js - Backend básico en Express

const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("¡Bienvenido a Shawarma Express!");
});

// Conexión a la base de datos (MongoDB) y otros servicios pueden ir aquí
// También puedes agregar rutas más tarde

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
