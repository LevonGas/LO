import knex from "knex";

const db = knex({
  client: "pg",
  connection: {
    host: "",
    password: "",
    user: "",
    database: "",
    port: ,
  },
});

async function create() {
    const exists = await db.schema.hasTable("links");
    if(exists) return;

    await db.schema.createTable("links", (column) => {
      column.increments("id").primary();
      column.text("link").notNullable();
      column.integer("status")
      column.dateTime("created_at");
      column.dateTime("updated_at");
    });
  }
  
  create()

export default db
