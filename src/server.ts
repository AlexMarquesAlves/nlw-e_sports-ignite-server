import { PrismaClient } from '@prisma/client';
import express from 'express';
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';

const app = express();

app.use(express.json());

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

app.post('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;
  const body: any = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays,
      hoursStart: convertHourStringToMinutes(body.hoursStart),
      hoursEnd: convertHourStringToMinutes(body.hoursEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return res.status(201).json([ad]);
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

  return res.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinutesToHourString(ad.hoursStart),
        hourEnd: convertMinutesToHourString(ad.hoursEnd),
      };
    }),
  );
});

app.get('/ads/:id/discord', async (req, res) => {
  const adId = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return res.json(ad);
});

// Server listen
app.listen(3333);

// HTTP methods / API RESTful / HTTP Codes

/**
 * Query: ...
 * Route: ...
 * Body: ...
 */
