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

  async guardar(obj) {
    try {
      let resultado = await this.listarAll();

      let ids = 1;
      if (resultado.length > 0) {
        ids = resultado[resultado.length - 1].id + 1;
      }

      resultado.push({ ...obj, id: ids });

      await fs.writeFile(`${this.ruta}`, JSON.stringify(resultado));
    } catch (err) {
      console.log(`Error al guardar el Item: ${err}`);
    }
  }

  async actualizar(elem, id) {
    try {
      let elements = await this.listarAll();

      const foundIndex = elements.findIndex((x) => x.id == elem.id);
      elements[foundIndex] = elem;
    } catch (error) {}
  }

  async borrar(id) {
    let elements = await this.listarAll();
    const element = elements.find((el) => el.id === id);
    const index = elements.indexOf(element);
    elements.splice(index, 1);

    await fs.writeFile(`${this.ruta}`, JSON.stringify(elements));
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
