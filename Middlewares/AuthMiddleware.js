const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
const User = require('../Models/User');

module.exports = {
    authLogin: async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            const decoded = jwt.verify(token, secretKey);
            const user = await User.findByPk(decoded.id);
            if (user) {
                next();
            } else {
                return res.status(401).send({
                    message: "Log In is Required"
                });
            }
        } else {
            return res.status(401).send({
                message: "LogIn is Required"
            });
        }
    },

    authSupervisor: async (req, res, next) => {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, secretKey);
        if (decoded.role === "Supervisor") {
            next();
        } else {    
            return res.status(401).send({
                message: "Unauthorization"
            });
        }
    }
}