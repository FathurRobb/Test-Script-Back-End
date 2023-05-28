const Presence = require('../Models/Presence');
const User = require('../Models/User');
const { jwtAuthVerify } = require('../Helpers/Jwt');

module.exports = {
    indexPresence: async (req, res) => {

    },

    indexPresenceById: async (req, res) => {

    },

    storePresence: async (req, res) => {
        const token = req.headers.authorization;
        const id_users = await jwtAuthVerify(token);
        const {type,waktu} = req.body;

        await Presence.create({ id_users, type, waktu })
        .then((data) => {
            res.status(201).json({
                message: "Data created successfully",
                data: data
            })
        }).catch((err) => {
            return res.status(500).json({
                message: err
            });
        })
    },

    updatePresence: async (req, res) => {

    },

    destoryPresence: async (req, res) => {

    },
}