const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Add a new game
app.post('/games', async (req, res) => {
  const { title, platform, releaseYear, condition } = req.body;
  const newGame = await prisma.game.create({
    data: { title, platform, releaseYear, condition },
  });
  res.status(201).json(newGame);
});

// View all games
app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany();
  res.json(games);
});

// Find a specific game
app.get('/games/:id', async (req, res) => {
  const { id } = req.params;
  const game = await prisma.game.findUnique({ where: { id: Number(id) } });
  if (!game) return res.status(404).send('Game not found');
  res.json(game);
});

// Update a game
app.put('/games/:id', async (req, res) => {
  const { id } = req.params;
  const { title, platform, releaseYear, condition } = req.body;
  const updatedGame = await prisma.game.update({
    where: { id: Number(id) },
    data: { title, platform, releaseYear, condition },
  });
  res.json(updatedGame);
});

// Remove a game
app.delete('/games/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.game.delete({ where: { id: Number(id) } });
  res.send('Game removed');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));