const db = require("../database/conection");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

async function find() {
  try {
    return db("users").select("id", "username").orderBy("id");
  } catch (err) {
    throw err;
  }
}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");
    return findById(id);
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  try {
    return db("users").where({ id }).first();
  } catch (err) {
    throw err;
  }
}
