const { DataTypes} = require("sequelize");
const sequelize = require("../data/db");

// Veri tabanında tablo olusturma

const Blog = sequelize.define("blog", {
    blogid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
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
    categoryid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},   {
    timestamps: false

});

async function sync() {
    await Blog.sync({alter: true});        //burada force: true dedigimiz icin database her seferinde silinip tekrar olusturuluyor.0
    console.log("blog tablosu eklendi");


    const count = await Blog.count();

if(count == 0) {

    await Blog.create({
        baslik: "Komple Uygulamalı Web Geliştirme Eğitimi",
        altbaslik: "Sıfırdan ileri seviyeye 'Web Geliştirme': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
        aciklama: "Web geliştirme komple bir web sitesinin hem web tasarım (html,css,javascript), hem de web programlama (asp.net mvc) konularının kullanılarak geliştirilmesidir",
        resim: "1.jpeg",
        anasayfa: true,
        onay: true,
        categoryid: 1
    });
    await Blog.create({
        baslik: "Python ile Sıfırdan İleri Seviye Python Programlama",
        altbaslik: "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
        aciklama: "Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır",
        resim: "2.jpeg",
        anasayfa: true,
        onay: true,
        categoryid: 1
    });

}
}

sync();

// migrations

module.exports = Blog;