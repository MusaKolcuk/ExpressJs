const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Category = sequelize.define("category", {
    // categoryid: {
        // type: DataTypes.INTEGER,
        // autoIncrement: true,
        // allowNull: false,
        // primaryKey: true
    // },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
    },
}
);


module.exports = Category;