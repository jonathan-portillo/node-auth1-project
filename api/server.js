const express = require("express");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

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
server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
