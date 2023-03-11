const { DataTypes} = require("sequelize");
const sequelize = require("../data/db");

// Veri tabanında tablo olusturma

const Blog = sequelize.define("blog", {
    baslik: {
        type: DataTypes.STRING,
        allowNull: false
    },
    altbaslik: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aciklama: {
    type: DataTypes.TEXT,
    allowNull: false
    },
    resim: {
        type: DataTypes.STRING,
        allowNull: false
    },
    anasayfa: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    onay: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
},   {
    timestamps: true

});

module.exports = Blog