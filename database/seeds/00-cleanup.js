const cleaner = require("knex-cleaner");

function cleanTable(knex) {
  return cleaner
    .clean(knex, {
      mode: "truncate",
      restartIdentity: true,
      ignoreTables: ["knex_migrations", "knex_migrations_lock"],
    })
    .then(() => {
      console.log(`\n All tablestruncated, reay to seed ==\n`);
    });
}

exports.seed = function (knex) {
  if (knex.client.config.client === "sqlite3") {
    return knex.raw("PRAGMA foreign_keys = OFF").then(() => cleanTable(knex));
  } else {
    return cleanTables(knex);
  }
};
