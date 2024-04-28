import express from "express";
import path from "path"
import { fileURLToPath } from 'url';

const PORT = 8001;
const HOST = "0.0.0.0";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const server = express();

server.use(express.static(__dirname));

server.use((req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

server.listen(PORT, () => {
  console.log(`Express server running at http://${HOST}:${PORT}/`);
});