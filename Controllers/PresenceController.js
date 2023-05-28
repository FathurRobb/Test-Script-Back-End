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
        const { id } = req.params;
        try {
            const existsPresence = await Presence.findOne({
                where: {
                    id
                },
            });
    
            if (existsPresence) {
                await Presence.update(req.body, {where: { id }})
                return res.status(200).json({
                    message: "Presence has been edited",
                });
            } else {
                return res.status(404).json({
                    message: "Presence not found",
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: error
            });
        }

    },

    destoryPresence: async (req, res) => {

    },
}