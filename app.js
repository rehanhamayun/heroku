const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// In-memory data storage (replace with a database in a real application)
const users = [];

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET user points by phone number
app.get('/api/users/:phoneNumber/points', (req, res) => {
  const phoneNumber = req.params.phoneNumber;
  const user = users.find((u) => u.phoneNumber === phoneNumber);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ phoneNumber: user.phoneNumber, points: user.points });
});

// POST to create a new user
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT to update user points by phone number
app.put('/api/users/:phoneNumber/points', (req, res) => {
  const phoneNumber = req.params.phoneNumber;
  const updatedPoints = req.body.points;

  const user = users.find((u) => u.phoneNumber === phoneNumber);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.points = updatedPoints;
  res.json({ phoneNumber: user.phoneNumber, points: user.points });
});

// DELETE user by phone number
app.delete('/api/users/:phoneNumber', (req, res) => {
  const phoneNumber = req.params.phoneNumber;
  const userIndex = users.findIndex((u) => u.phoneNumber === phoneNumber);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

app.listen(port, 'localhost', () => {
  console.log(`Server is running on http://localhost:${port}`);
});
