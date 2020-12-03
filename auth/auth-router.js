const router = require("express").Router();
const bcrypt = require("bcryptjs");

const users = require("../user/user-model");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  users
    .add(user)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  try {
    const user = await users.findBy({ username }).first();

    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      res.status(200).json({ message: `welcome ${user.username}` });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// gotta figure out why this way doesn't work
// router.post("/login", (req, res) => {
//   let { username, password } = req.body;
//   const user = users.findBy({ username }).first();

//   if (user && bcrypt.compareSync(password, user.password)) {
//     req.session.user = user;
//     res.status(200).json({ message: "welcome" });
//   } else {
//     res.status(401).json({ message: "invalid" });
//   }
// });

router.get("/logout", (req, res) => {
  if (req.session && req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        res.send("unale to logout");
      } else {
        res.send("douces");
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;
