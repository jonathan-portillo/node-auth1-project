exports.seed = function (knex) {
  return knex("role").insert([
    { name: "RSM" },
    { name: "Keyholder" },
    { name: "RAM" },
  ]);
};
