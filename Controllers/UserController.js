const { jwtAuthUser } = require('../Helpers/Jwt');
const User = require('../Models/User');
const bcrypt = require('bcryptjs');

module.exports = {
    indexUser: async (req, res) => {

    },

    indexUserById: async (req, res) => {

    },

    storeUser: async (req, res) => {
        const { nama, email, npp, npp_supervisor, password } = req.body;
        try {
            const emailExists = await User.findOne({
                where: {
                    email
                },
            });
            
            if (emailExists) {
                return res.status(400).json({
                    message: "Email already exists"
                });
            }

            await User.create({ nama, email, npp, npp_supervisor, password });
            return res.status(201).json({
                message: "User created successfully"
            });
        } catch (error) {
            return res.status(500).json({
                message: error
            });
        }
    },

    updateUser: async (req, res) => {

    },

    destoryUser: async (req, res) => {

    },

    logIn: async (req, res) => {
        const { email, password } = req.body;
        await User.findOne({
            where: { email }
        }).then((user) => {
            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    res.status(200).json(jwtAuthUser(user));
                } else {
                    res.status(400).json({
                        message: "Wrong Password"
                    })
                }
            } else {
                res.status(404).json({
                    message: "Email does not exists"
                })
            }
        }).catch((err) => {
            res.status(500).json({
                message: err
            })
        })
    }
}