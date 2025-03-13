const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { Musician } = require("../models/index");

router.get("/", async (req, res) => {
  const musicians = await Musician.findAll();
  res.json(musicians);
});

router.get("/:id", async (req, res) => {
  const musician = await Musician.findByPk(req.params.id);
  res.json(musician);
});

router.post(
  "/",
  [
    check("name").not().isEmpty().trim(),
    check("instrument").not().isEmpty().trim(),
    check("name")
      .isLength({ min: 2, max: 20 })
      .withMessage("Name must be between 2 and 20 characters long"),
    check("instrument")
      .isLength({ min: 2, max: 20 })
      .withMessage("Instrument must be between 2 and 20 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      const musician = await Musician.create(req.body);
      res.json(musician);
    }
  }
);

router.put(
  "/:id",
  [
    check("name").not().isEmpty().trim(),
    check("instrument").not().isEmpty().trim(),
    check("name")
      .isLength({ min: 2, max: 20 })
      .withMessage("Name must be between 2 and 20 characters long"),
    check("instrument")
      .isLength({ min: 2, max: 20 })
      .withMessage("Instrument must be between 2 and 20 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      const musician = await Musician.findByPk(req.params.id);
      musician.update(req.body);
      res.json(musician);
    }
  }
);

router.delete("/:id", async (req, res) => {
  const musician = await Musician.findByPk(req.params.id);
  musician.destroy();
  const musicians = await Musician.findAll();
  res.json(musicians);
});

module.exports = router;
