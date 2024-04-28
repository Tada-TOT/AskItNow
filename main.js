/*import express from "express";      From Module to Commonjs | |
import path from "path";                                       v
import { fileURLToPath } from "url";*/

const express = require("express");
const path = require("path");
const jsonServer = require("json-server");//
const auth = require("json-server-auth");//

const PORT1 = 8001;
const HOST = "127.0.0.1";
var __filename = module.filename; //fileURLToPath();
var __dirname = path.dirname(__filename);
const api = jsonServer.create();//
const router = jsonServer.router("./backend/db.json");//
const PORT2 = 3000;//

api.db = router.db;//
const app = express();

api.use(auth);//
app.use(express.static(__dirname));

api.use((req, res, next) => {//
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

api.use(router);//
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

api.listen(PORT2, () => {//
  console.log(`Express server running at http://${HOST}:${PORT2}/`);
});
app.listen(PORT1, () => {
  console.log(`Express server running at http://${HOST}:${PORT1}/`);
});
