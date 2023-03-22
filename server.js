const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

// Array para almacenar los datos en memoria
let datos = [];

app.get("/", (req, res) => {
  res.render("index", { datos });
});

app.get("/agregar", (req, res) => {
  res.render("agregar");
});

app.post("/agregar", (req, res) => {
  const { nombre } = req.body;
  datos.push({ id: datos.length + 1, nombre });
  res.redirect("/");
});

app.get("/editar/:id", (req, res) => {
  const id = req.params.id;
  const dato = datos.find((d) => d.id == id);
  res.render("editar", { dato });
});

app.post("/editar/:id", (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  const index = datos.findIndex((d) => d.id == id);
  datos[index] = { id, nombre };
  res.redirect("/");
});

app.post("/eliminar/:id", (req, res) => {
  const id = req.params.id;
  datos = datos.filter((d) => d.id != id);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
