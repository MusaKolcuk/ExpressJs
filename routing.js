const express = require("express");

const app = express();


app.use("/blogs/:blogid/users/:username", function(req, res) {
    console.log(req.params.blogid);                  //req.params – Verilen yönlendirme parametrelerini eşlemek için özellikleri içeren bir nesnedir. Mesela blogid veya username.
    console.log(req.params.username);
    res.send("blog detay sayfası");
});

app.use("/blogs", function(req, res) {
    res.send("blog listesi")
});

app.use("/", function(req, res) {
    res.send("anasayfa")
});


app.listen(3000, function() {

    console.log("listening on port 3000");
});