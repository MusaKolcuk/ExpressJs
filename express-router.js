const express = require("express");

const app = express();

app.set("view engine", "ejs");      //template engine ejs olarak belirledik.

// ***************************************************** VERİ TABANİ BAGLANTİSİ ***************************************************************

const mysql = require("mysql2");
const config = require("./config");


let connection = mysql.createConnection (config.db);

connection.connect(function(err) {
    if(err) {
        return console.log(err);
    }

    connection.query("select * from blog", function(err, result) {              // query methodu ile istedigimiz bir tablodan kayit alabiliriz.
        console.log(result);        // tum ozellikleri (baslik, id aciklama vb.) getirir.
        console.log(result[0].baslik);
        console.log(result[1].baslik);
    })

        console.log("mysql server bağlantısı yapıldı");
})




const path = require("path");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");


app.use("/libs", express.static(path.join(__dirname, "node_modules"))); // node module klasorune libs takma adini verdik. Ve anasayfa.html dosyasinda libs ile erisim sagliyicaz.
app.use("/static", express.static(path.join(__dirname, "public")));// public klasorune static takma adini verdik. Ve anasayfa.html dosyasinda static ile erisim sagliyicaz.
// path.join ile __dirname kullanarak islemi ana dizin uzerinden baslattik.

app.use("/admin", adminRoutes);     // admin.js dosyasini buraya ekledik. Karisiklik olmasın diye ayri dosyada yazdik. İstersek bu sayfayada user ve admin dosyalarını yazabilirdik.
app.use(userRoutes);

app.listen(3000, function() {
    console.log("listening on port 3000");
});