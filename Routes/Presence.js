const router = require('express').Router();
const { storePresence } = require('../Controllers/PresenceController');
const { authLogin, authSupervisor } = require('../Middlewares/AuthMiddleware');

router.post("/presence", authLogin, storePresence);


module.exports = router;