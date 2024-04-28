import express from "express";
import path from "path"
import { fileURLToPath } from "url";

const PORT = 8001;
const HOST = "127.0.0.1";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.static(__dirname));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Express server running at http://${HOST}:${PORT}/`);
});
