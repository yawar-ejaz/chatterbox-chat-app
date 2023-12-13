const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const Users = require('./users');

const Chats = sequelize.define('chats', {
    _id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    chatName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isGroupChat: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    userIds: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: false,
    },
    latestMessageId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    groupAdminId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
});

// // Define associations
// Chat.belongsToMany(Users, { through: 'ChatUsers', foreignKey: 'chatId' });
// Users.belongsToMany(Chat, { through: 'ChatUsers', foreignKey: 'userId' });

module.exports = Chats;
