import mongoose from "mongoose";
import config from "../config.js";

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

class ContenedorMongoDb {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }

  async listar(id) {
    try {
      let elem = await this.collection.find({ _id: id });
      return elem;
    } catch (error) {
      throw new Error(`Error al listar por id: ${error}`);
    }
  }

  async listarAll() {
    try {
      let elem = await this.collection.find({});
      return elem;
    } catch (error) {
      throw new Error(`Error al listar ${error}`);
    }
  }

  async guardar(elem) {
    try {
      return await this.collection.insertOne(elem);
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async actualizar(elem, id) {
    try {
      return await this.collection.updateOne({ _id: id }, { $set: { elem } });
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async borrar(id) {
    try {
      return await this.collection.deleteOne({ _id: id });
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async borrarAll() {
    try {
      return await this.collection.remove({});
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async desconectar() {
    await mongoose.disconnect();
  }
}

export default ContenedorMongoDb;
