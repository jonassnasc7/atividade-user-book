const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Book = db.define('Book',{
    author: {
        type:DataTypes.STRING,
        allowNull: false
    },
    title: {
        type:DataTypes.STRING,
        allowNull: true
    },
    preco: {
        type:DataTypes.STRING,
        allowNull: true
    },
    newsletter: {
        type:DataTypes.BOOLEAN,
    }
})

module.exports = Book