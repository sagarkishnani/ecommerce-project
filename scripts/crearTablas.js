import knex from "knex";
import config from "../src/config.js";

// opciones SQL: mariaDb, sqlite3

crearTablasProductos(knex(config.sqlite3));
crearTablasCarritos(knex(config.sqlite3));

//------------------------------------------

async function crearTablasProductos(sqlClient) {
  try {
    await sqlClient.schema.dropTableIfExists("productos");

    await sqlClient.schema.createTable("productos", (table) => {
      table.increments("id").primary();
      table.string("title", 30).notNullable();
      table.float("price").notNullable();
      table.string("thumbnail", 1024);
    });

    await sqlClient.destroy();

    console.log("tabla productos en sqlite3 creada con éxito");
  } catch (error) {
    console.log("error al crear tabla productos en sqlite3");
    console.log(error);
  }
}

//------------------------------------------

async function crearTablasCarritos(sqlClient) {
  try {
    await sqlClient.schema.dropTableIfExists("carritos");

    await sqlClient.schema.createTable("carritos", (table) => {
      table.increments("id").primary();
      table.string("autor", 30);
      table.string("texto", 128);
      table.string("fyh", 50);
    });

    await sqliteClient.destroy();

    console.log("tabla mensajes en sqlite3 creada con éxito");
  } catch (error) {
    console.log("error al crear tabla mensajes en sqlite3");
  }
}
