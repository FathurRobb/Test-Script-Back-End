const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Database/Config');
const User = require('./User');

class Presence extends Model {};

Presence.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_users: { type: DataTypes.INTEGER },
    type: { type: DataTypes.ENUM('IN','OUT') },
    is_approve: { type: DataTypes.BOOLEAN, defaultValue: false },
    waktu: { type: DataTypes.DATE },
},{
    sequelize,
    timestamps: true,
    freezeTableName: true,
    tableName: 'presences',
    paranoid: true,
    deletedAt: true,
});

Presence.belongsTo(User, { foreignKey: 'id_user', as: 'user', onDelete: 'CASCADE' });

module.exports = Presence;