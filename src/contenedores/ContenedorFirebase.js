import admin from "firebase-admin";
import config from "../config.js";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase.uri),
  databaseURL: "https://ecommerce-project-d3583.firebaseio.com",
});

const db = admin.firestore();

class ContenedorFirebase {
  constructor(collection) {
    this.collection = db.collection(collection);
  }

  async listar(id) {
    try {
      const doc = this.collection.doc(`${id}`);
      const item = await doc.get();
      const response = item.data();
      return response;
    } catch (error) {
      throw new Error(`Error al listar por id: ${error}`);
    }
  }

  async listarAll() {
    try {
      const querySnapshot = await this.collection.get();
      let docs = querySnapshot.docs;
      return docs;
    } catch (error) {
      throw new Error(`Error al listar ${error}`);
    }
  }

  async guardar(elem) {
    try {
      const querySnapshot = await this.collection.get();
      let docs = querySnapshot.docs;
      let newId;
      if (docs.length == 0) {
        newId = 1;
      } else {
        newId = newId++;
      }
      const doc = this.collection.doc(`${newId}`);
      let item = await doc.create({ elem });
      return item;
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async actualizar(elem, id) {
    try {
      const doc = this.collection.doc(`${id}`);
      let item = await doc.update({ elem });
      return item;
    } catch (error) {
      throw new Error(`Error al actualizar: ${error}`);
    }
  }

  async borrar(id) {
    try {
      const doc = this.collection.doc(`${id}`);
      let item = await doc.delete();
      return item;
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async borrarAll() {
    try {
      return await this.collection.delete();
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async desconectar() {
    await goOffline(db);
  }
}

export default ContenedorFirebase;
