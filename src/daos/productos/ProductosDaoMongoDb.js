import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";

class ProductosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(config.firebase, config.firebase);
  }
}

export default ProductosDaoMongoDb;
