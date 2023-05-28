
const Presence = require('../Models/Presence');
const { jwtAuthVerify } = require('../Helpers/Jwt');

module.exports = {
    indexPresence: async (req, res) => {
        try {
            const presenceIn = await Presence.findAll({include: ['user'], where: [{'type':'IN'}]});
            const presenceOut = await Presence.findAll({include: ['user'], where: [{'type':'OUT'}]});
            
            const dataPresenceIn = presenceIn.map(pi => ({
                id_user: pi.user.id,
                nama_user: pi.user.nama,
                tanggal: new Date(pi.waktu).getFullYear()+"-"+("0" + (new Date(pi.waktu).getMonth() + 1)).slice(-2)+"-"+("0" + new Date(pi.waktu).getDate()).slice(-2),
                waktu_masuk: ("0" + new Date(pi.waktu).getHours()).slice(-2)+":"+("0" + new Date(pi.waktu).getMinutes()).slice(-2)+":"+("0" + new Date(pi.waktu).getSeconds()).slice(-2),
                status_masuk: pi.is_approve === true ? "APPROVED" : "REJECT",                
            }));

            const dataPresenceOut = presenceOut.map(po => ({
                id_user: po.user.id,
                nama_user: po.user.nama,
                tanggal: new Date(po.waktu).getFullYear()+"-"+("0" + (new Date(po.waktu).getMonth() + 1)).slice(-2)+"-"+("0" + new Date(po.waktu).getDate()).slice(-2),
                waktu_pulang: ("0" + new Date(po.waktu).getHours()).slice(-2)+":"+("0" + new Date(po.waktu).getMinutes()).slice(-2)+":"+("0" + new Date(po.waktu).getSeconds()).slice(-2),
                status_pulang: po.is_approve === true ? "APPROVED" : "REJECT",                
            }));

            const result = dataPresenceIn.map(dpi => ({ ...dpi, ...dataPresenceOut.find(dpo => dpo.id_user === dpi.id_user && dpo.tanggal === dpi.tanggal ) }));

            return res.status(200).json({
                message: "Success get data",
                data: result
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: error
            });
        }
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