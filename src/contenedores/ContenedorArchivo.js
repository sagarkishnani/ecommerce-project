const { promises: fs } = require("fs");

class ContenedorArchivo {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async listar(id) {
    try {
      const elements = await this.listarAll();
      let element = elements.find((el) => el.id == id);
      element ? element : null;
      return element;
    } catch {
      console.log("Error al buscar elemento por ID");
    }
  }

  async listarAll() {
    try {
      let productos = await fs.readFile(`${this.ruta}`, "utf-8");
      return JSON.parse(productos);
    } catch (err) {
      console.log(`Error al leer los elementos: ${err}`);
      return [];
    }
  }

  async guardar({ title, price, thumbnail }) {
    try {
      let resultado = await this.listarAll();

      let ids = 1;
      if (resultado.length > 0) {
        ids = resultado[resultado.length - 1].id + 1;
      }

      resultado.push({ title, price, thumbnail, id: ids });

      await fs.writeFile(`${this.ruta}`, JSON.stringify(resultado));
      return console.log(resultado);
    } catch (err) {
      console.log(`Error al guardar el Item: ${err}`);
    }
  }

  async actualizar(elem, id) {}

  async borrar(id) {
    const elements = this.listarAll().filter(
      (el) => parseInt(el.id) != parseInt(id)
    );
    this.borrarAll();
    this.guardar(elements);
  }

  async borrarAll() {
    fs.unlink(`${this.ruta}`, (err) => {
      err
        ? console.log(`Error al borrar archivo: ${err}`)
        : console.log(`Archivo borrado con éxito`);
    });
  }
}

module.exports = ContenedorArchivo;
