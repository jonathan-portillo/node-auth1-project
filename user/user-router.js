const router = require("express").Router();
const Users = require("./user-model");

router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error finding our users" });
    });
});

module.exports = router;
