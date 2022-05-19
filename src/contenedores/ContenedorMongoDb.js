import mongoose from "mongoose";
import config from "../config.js";

class ContenedorMongoDb {
  constructor(config, coll) {
    this.mongoose = mongoose(config);
    this.coll = coll;
  }

  async listar(id) {
    try {
      let elem = await this.coll.find({ _id: id });
      return elem;
    } catch (error) {
      throw new Error(`Error al listar por id: ${error}`);
    }
  }

  async listarAll() {
    try {
      let elem = await this.coll.find({});
      return elem;
    } catch (error) {
      throw new Error(`Error al listar ${error}`);
    }
  }

  async guardar(elem) {
    try {
      return await this.coll.insertOne(elem);
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async actualizar(elem, id) {
    try {
      return await this.coll.updateOne({ _id: id }, { $set: { elem } });
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async borrar(id) {
    try {
      return await this.coll.deleteOne({ _id: id });
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async borrarAll() {
    try {
      return await this.coll.remove({});
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async desconectar() {
    await this.mongoose.disconnect();
  }
}

export default ContenedorMongoDb;
