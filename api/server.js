const express = require("express");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const authRouter = require("../auth/auth-router");
const userRouter = require("../user/user-router");

const server = express();

server.use(express.json());

const sessionConfig = {
  name: "authsession",
  secret: "This is just to learn logging in and out",
  cookie: {
    makeAge: 3600 * 1000,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,

  store: new KnexSessionStore({
    knex: require("../database/conection"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 3600 * 1000,
  }),
};

server.use(session(sessionConfig));
server.use("/api/auth", authRouter);
server.use("/api/user", userRouter);
server.get("/", (req, res) => {
  res.json({ api: "le api is up" });
});

module.exports = server;
