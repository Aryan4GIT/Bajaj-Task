import express from 'express';
import handler from './api/bfhl.js';

const app = express();
app.use(express.json());
app.post('/bfhl', (req, res) => handler(req, res));
app.get('/bfhl', (req, res) => handler(req, res));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Local server listening on http://localhost:${port}`));
