const express = require("express");

const server = express();
server.use(express.json());
// localhost:3000/teste
const user = ["Rafael", "Janaina", "Pedro"];

function check(req, res, next) {
  if (!user[req.params.index]) {
    return res.status(404).send({ error: "User not found" });
  }

  return next();
}

server.use((req, res, next) => {
  console.log("Passei aqui");
  return next();
});

server.get("/user", (req, res) => {
  return res.json(user);
});

server.get("/user/:index", check, (req, res) => {
  return res.json(user[req.params.index]);
});

server.post("/user", (req, res) => {
  const { name } = req.body;
  user.push(name);
  return res.json(user);
});

server.put("/user/:index", check, (req, res) => {
  const { name } = req.body;
  const { index } = req.params;

  user[index] = name;

  return res.json(user);
});

server.delete("/user/:index", check, (req, res) => {
  const { index } = req.params;

  user.splice(index, 1);
  return res.json(user);
});

server.listen(3000);
