import { PrismaClient } from '@prisma/client';
import express from 'express';

const app = express();
const prisma = new PrismaClient();

// HTTP methods / API RESTful / HTTP Codes

/**
 * Query: ...
 * Route: ...
 * Body: ...
 */

app.get('/games', (req, res) => {
  return res.json([]);
});

app.post('/ads', (req, res) => {
  return res.status(201).json([]);
});

app.get('/games/:id/ads', (req, res) => {
  // const gameId = req.params.id;

  return res.json([
    { id: 1, name: 'Anuncio 1' },
    { id: 2, name: 'Anuncio 2' },
    { id: 3, name: 'Anuncio 3' },
    { id: 4, name: 'Anuncio 4' },
  ]);
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
