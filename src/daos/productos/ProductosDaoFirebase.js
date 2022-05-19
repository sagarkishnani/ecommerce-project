import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js";

class ProductosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super(config.firebase, config.firebase);
  }
}

export default ProductosDaoFirebase;
