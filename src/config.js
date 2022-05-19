export default {
  fileSystem: {},
  mongodb: {},
  firebase: {},
  sqlite3: {
    client: "sqlite3",
    connection: {
      filename: "./DB/ecommerce.sqlite",
    },
    useNullAsDefault: true,
  },
  mariaDb: {
    client: "mysql",
    connection: {
      host: "localhost",
      user: "sagar",
      password: "Aakash67",
      database: "ecommerce",
    },
  },
};
