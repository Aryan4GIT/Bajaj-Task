import express from 'express';
import handler from './api/bfhl.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json());
app.post('/bfhl', (req, res) => handler(req, res));
app.get('/bfhl', (req, res) => handler(req, res));

// Serve static index.html locally at /
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Local server listening on http://localhost:${port}`));
