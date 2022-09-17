import { PrismaClient } from '@prisma/client';
import express, { query } from 'express';

const app = express();
const prisma = new PrismaClient({
  log: ['query'],
});

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: { ads: true },
      },
    },
  });

  return res.json([games]);
});

app.post('/ads', (req, res) => {
  return res.status(201).json([]);
});

app.get('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hoursStart: true,
      hoursEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return res.json([ads]);
});

app.get('/ads/:id/discord', (req, res) => {
  // const adId = req.params.id;

  return res.json([
    { id: 1, name: 'Anuncio 1' },
    { id: 2, name: 'Anuncio 2' },
    { id: 3, name: 'Anuncio 3' },
    { id: 4, name: 'Anuncio 4' },
  ]);
});

// Server listen
app.listen(3333);

// HTTP methods / API RESTful / HTTP Codes

/**
 * Query: ...
 * Route: ...
 * Body: ...
 */
