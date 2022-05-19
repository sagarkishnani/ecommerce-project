import admin from "firebase-admin";
import config from "../config.js";

class ContenedorFirebase {
  constructor(config, coll) {
    this.firebase = firebase(config);
    this.coll = coll;
  }

  async listar(id) {
    try {
      const doc = this.coll.doc(`${id}`);
      const item = await doc.get();
      const response = item.data();
      return response;
    } catch (error) {
      throw new Error(`Error al listar por id: ${error}`);
    }
  }

  async listarAll() {
    try {
      const querySnapshot = await this.coll.get();
      let docs = querySnapshot.docs;
      return docs;
    } catch (error) {
      throw new Error(`Error al listar ${error}`);
    }
  }

  async guardar(elem) {
    try {
      const doc = query.doc(`${id}`);
      let item = await doc.create({ elem });
      return item;
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async actualizar(elem, id) {
    try {
      const doc = this.coll.doc(`${id}`);
      let item = await doc.update({ elem });
      return item;
    } catch (error) {
      throw new Error(`Error al actualizar: ${error}`);
    }
  }

  async borrar(id) {
    try {
      const doc = this.coll.doc(`${id}`);
      let item = await doc.delete();
      return item;
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async borrarAll() {
    try {
      return await this.coll.delete();
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async desconectar() {
    await goOffline(this.firebase);
  }
}

export default ContenedorFirebase;
