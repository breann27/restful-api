// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const users = require('../data/users');
const validateUser = require('../middleware/validateUser');

// GET all users
router.get('/users', (req, res) => {
  res.status(200).json(users);
});

// GET user by ID
router.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.status(200).json(user);
});

// POST new user
router.post('/user', validateUser, (req, res) => {
  const newUser = {
    id: (users.length + 1).toString(),
    ...req.body
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
router.put('/user/:id', validateUser, (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.params.id);
  if (userIndex === -1) return res.status(404).json({ error: "User not found" });

  users[userIndex] = { id: req.params.id, ...req.body };
  res.status(200).json(users[userIndex]);
});

// DELETE user
router.delete('/user/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.params.id);
  if (userIndex === -1) return res.status(404).json({ error: "User not found" });

  const deletedUser = users.splice(userIndex, 1);
  res.status(200).json({ message: "User deleted", user: deletedUser[0] });
});

module.exports = router;
