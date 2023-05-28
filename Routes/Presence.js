const router = require('express').Router();
const { storePresence, updatePresence } = require('../Controllers/PresenceController');
const { authLogin, authSupervisor } = require('../Middlewares/AuthMiddleware');

router.post("/presence", authLogin, storePresence);
router.put("/presence/:id", authLogin, authSupervisor, updatePresence)

module.exports = router;