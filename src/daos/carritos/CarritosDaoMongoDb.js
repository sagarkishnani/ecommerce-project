import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";

class CarritosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(config.firebase, config.firebase);
  }
}

export default CarritosDaoMongoDb;
