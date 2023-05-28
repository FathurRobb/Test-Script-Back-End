const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Database/Config');
const bcrypt = require('bcryptjs');

class User extends Model {};

User.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nama: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    npp: { type: DataTypes.STRING },
    npp_supervisor: { type: DataTypes.STRING, allowNull: true },
    password: { type: DataTypes.STRING }
},{
    sequelize,
    timestamps: true,
    freezeTableName: true,
    tableName: 'users',
    paranoid: true,
    deletedAt: true,
    hooks: {
        beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(user.password, salt);
        },
        beforeUpdate: (user) => {
            if (user.changed('password')) {
                const salt = bcrypt.genSaltSync(10);
                user.password = bcrypt.hashSync(user.get('password'), salt);
            }
        },
    }
});

module.exports = User;