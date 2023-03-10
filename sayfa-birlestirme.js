const express = require("express");

const app = express();

const path = require("path");

app.use("/libs",express.static(path.join(__dirname,"node_modules"))); // node module klasorune libs takma adini verdik. Ve anasayfa.html dosyasinda libs ile erisim sagliyicaz.
app.use("/static",express.static(path.join(__dirname,"public")));     // public klasorune static takma adini verdik. Ve anasayfa.html dosyasinda static ile erisim sagliyicaz.
                                                                      // path.join ile __dirname kullanarak islemi ana dizin uzerinden baslattik.
app.use("/blogs/:blogid", function(req, res) {
    console.log(__dirname);
    console.log(__filename);

    res.sendFile(path.join(__dirname, "views/users", "blog-details.html"));
});

app.use("/blogs", function(req, res) {
    res.sendFile(path.join(__dirname, "views/users", "blogs.html"));
});

app.use("/", function(req, res) {
    res.sendFile(path.join(__dirname, "views/users", "anasayfa.html"));
});


app.listen(3000, function() {

    console.log("listening on port 3000");
});