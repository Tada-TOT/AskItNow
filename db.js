const jsonServer = require("json-server")
const auth = require("json-server-auth")

const api = jsonServer.create()
const router = jsonServer.router("./backend/db.json")

api.db = router.db

api.use(auth)
api.use(router)
api.listen(3000)
