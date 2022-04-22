const express = require("express");
const { Router } = express;

const ContenedorArchivo = require("./contenedores/ContenedorArchivo.js");

//--------------------------------------------
// instancio servidor y persistencia

const app = express();

const productosApi = new ContenedorArchivo("dbProductos.json");
const carritosApi = new ContenedorArchivo("dbCarritos.json");

//--------------------------------------------
// permisos de administrador MIDDLEWARES

const esAdmin = false;

function crearErrorNoEsAdmin(ruta, metodo) {
  const error = {
    error: -1,
  };
  if (ruta && metodo) {
    error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`;
  } else {
    error.descripcion = "no autorizado";
  }
  return error;
}

function soloAdmins(req, res, next) {
  if (!esAdmin) {
    res.json(crearErrorNoEsAdmin());
  } else {
    next();
  }
}

//--------------------------------------------
// configuro router de productos

const productosRouter = new Router();

productosRouter.get("/", async (req, res) => {
  const productos = await productosApi.listarAll();
  res.json(productos);
});

productosRouter.get("/:id", async (req, res) => {
  res.json(await productosApi.listar(req.params.id));
});

productosRouter.post("/", soloAdmins, async (req, res) => {
  res.json({ id: await productosApi.guardar(req.body) });
});

productosRouter.put("/:id", soloAdmins, async (req, res) => {
  res.json(await productosApi.actualizar(req.body, req.params.id));
});

//--------------------------------------------
// configuro router de carritos

const carritosRouter = new Router();

carritosRouter.get("/", async (req, res) => {
  res.json((await carritosApi.listarAll()).map((c) => c.id));
});

carritosRouter.post("/", async (req, res) => {
  res.json({ id: await carritosApi.guardar({ productos: [] }) });
});

carritosRouter.delete("/:id", async (req, res) => {
  res.json(await carritosApi.borrar(req.params.id));
});

carritosRouter.get("/:id/productos", async (req, res) => {});

//--------------------------------------------
// configuro el servidor

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/productos", productosRouter);
app.use("/api/carritos", carritosRouter);

module.exports = app;
