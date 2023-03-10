const express = require("express");

const app = express();

app.set("view engine", "ejs");      //template engine ejs olarak belirledik.


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