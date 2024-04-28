const jsonServer = require("json-server");
const auth = require("json-server-auth");

const api = jsonServer.create();
const router = jsonServer.router("./backend/db.json");
const PORT = 3000;

api.db = router.db;

api.use(auth);
api.use(router);
api.listen(PORT, () => {
    console.log(`Express server running at http://127.0.0.1:${PORT}/`);
});
