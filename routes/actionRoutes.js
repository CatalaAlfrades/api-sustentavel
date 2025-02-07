const express = require("express");
const router = express.Router();
const Action = require("../models/Action");
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");

// Criar ação
router.post("/", auth, async (req, res) => {
  try {
    const action = new Action({ ...req.body, userId: req.user.id });
    await action.save();
    await User.findByIdAndUpdate(req.user.id, { $inc: { points: action.points } });
    res.status(201).json(action);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar ações
router.get("/", async (req, res) => {
  const actions = await Action.find().populate("userId", "name");
  res.json(actions);
});

// Atualizar ação
router.put("/:id", auth, async (req, res) => {
  try {
    const action = await Action.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(action);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar ação
router.delete("/:id", auth, async (req, res) => {
  try {
    await Action.findByIdAndDelete(req.params.id);
    res.json({ message: "Ação deletada!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
