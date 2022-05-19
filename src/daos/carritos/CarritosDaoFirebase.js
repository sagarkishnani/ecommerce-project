import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js";

class CarritosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super(config.firebase, config.firebase);
  }
}

export default CarritosDaoFirebase;
