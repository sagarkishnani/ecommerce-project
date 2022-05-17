import knex from "knex";
import { asPOJO } from "../utils/objectUtils.js";

class ContenedorSQL {
  constructor(config, tabla) {
    this.knex = knex(config);
    this.tabla = tabla;
  }
}

export default ContenedorSQL;
