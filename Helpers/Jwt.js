const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

module.exports = {
    jwtAuthUser: (user) => {
        const payload = {
            id: user.id,
            nama: user.nama,
            email: user.email,
            npp: user.npp,
            role: user.npp_supervisor ? "Supervisor" : "User"
        };
        const token = jwt.sign(payload, secretKey);
        return {
            message: "Log In Success",
            token,
            payload
        };
    },
    jwtAuthVerify: (authorization) => {
        try {
            const token = authorization.split(' ')[1]
            const data = jwt.verify(token, secretKey);
            return data.id;
        } catch (error) {
            return false;
        }
    }
}