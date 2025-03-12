const express = require("express");
const router = express.Router();
const { Musician } = require("../models/index");

router.get("/", async (req, res) => {
  const musicians = await Musician.findAll();
  res.json(musicians);
});

router.get("/:id", async (req, res) => {
  const musician = await Musician.findByPk(req.params.id);
  res.json(musician);
});

router.post("/", async (req, res) => {
  const musician = await Musician.create(req.body);
  res.json(musician);
});

router.put("/:id", async (req, res) => {
  const musician = await Musician.findByPk(req.params.id);
  musician.update(req.body);
  res.json(musician);
});

router.delete("/:id", async (req, res) => {
  const musician = await Musician.findByPk(req.params.id);
  musician.destroy();
  const musicians = await Musician.findAll();
  res.json(musicians);
});

module.exports = router;