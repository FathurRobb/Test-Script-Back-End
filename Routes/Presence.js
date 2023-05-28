const router = require('express').Router();
const { storePresence, updatePresence, indexPresence } = require('../Controllers/PresenceController');
const { authLogin, authSupervisor } = require('../Middlewares/AuthMiddleware');

router.post("/presence", authLogin, storePresence);
router.put("/presence/:id", authLogin, authSupervisor, updatePresence);
router.get("/presence", authLogin, indexPresence);

module.exports = router;