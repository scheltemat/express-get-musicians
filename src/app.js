const express = require("express");
const app = express();
const { Musician } = require("../models/index");
const { Band } = require("../models/Band");
const { db } = require("../db/connection");
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/musicians", async (req, res) => {
  const musicians = await Musician.findAll();
  res.json(musicians);
});

app.get("/musicians/:id", async (req, res) => {
  const musician = await Musician.findByPk(req.params.id);
  res.json(musician);
});

app.post("/musicians", async (req, res) => {
  const musician = await Musician.create(req.body);
  res.json(musician);
});

app.put("/musicians/:id", async (req, res) => {
  const musician = await Musician.findByPk(req.params.id);
  musician.update(req.body);
  res.json(musician);
});

app.delete("/musicians/:id", async (req, res) => {
  const musician = await Musician.findByPk(req.params.id);
  musician.destroy();
  const musicians = await Musician.findAll();
  res.json(musicians);
});

app.get("/bands", async (req, res) => {
  const bands = await Band.findAll();
  res.json(bands);
});







module.exports = app;