const router = require('express').Router();
const { storeUser, logIn } = require('../Controllers/UserController');

router.post("/register", storeUser);
router.post("/login", logIn);

module.exports = router;