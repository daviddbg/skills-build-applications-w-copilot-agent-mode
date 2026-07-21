import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import db from './config/database.js';
const app = express();
const PORT = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(cors());
app.use(express.json());
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-backend',
        port: PORT,
        baseUrl,
        mongo: db.readyState === 1 ? 'connected' : 'disconnected'
    });
});
app.listen(PORT, () => {
    console.log(`OctoFit backend listening on ${baseUrl}`);
});
