import express from 'express';

const app = express();

// HTTP methods / API RESTful / HTTP Codes

/**
 * Query: ...
 * Route: ...
 * Body: ...
 */

app.get('/games', (req, res) => {
  return res.json([]);
});

// Server listen
app.listen(3333);
