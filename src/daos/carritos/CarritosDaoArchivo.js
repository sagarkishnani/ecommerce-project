import ContenedorArchivo from "../../contenedores/ContenedorArchivo";

class CarritosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("DB/carritos.json");
  }

  async desconectar() {}
}

export default CarritosDaoArchivo;
