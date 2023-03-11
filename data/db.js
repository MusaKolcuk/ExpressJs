const mysql = require("mysql2");
const config = require("../config");

// **************************************************** SEQUELİZE İle VERİ TABANİ BAGLANTİSİ *******************************************************

const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    dialect: "mysql",
    host: config.db.host,
    define: {
        timestamps: false
    }
});

async function connect () {

    try {
        await sequelize.authenticate();
        console.log("Mysql server bağlantısı yapıldı");
    } catch (error) {
        console.log("Bağlantı hatası ", error);
    }
}

connect();

module.exports = sequelize;

// ***************************************************** VERİ TABANİ BAGLANTİSİ **************************************************************

// let connection = mysql.createConnection(config.db);

// connection.connect(function(err) {
    // if(err) {
        // return console.log(err);
    // }

        // console.log("mysql server bağlantısı yapıldı");
// })

// module.exports = connection.promise();