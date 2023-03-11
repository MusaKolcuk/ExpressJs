const express = require("express");
const router = express.Router();





// const data = {          //Buraya artık ihtiyacimiz yok cünkü veri tabanindan verileri cekiyoruz.
//     title: "Popüler Kurslar",
//     categories: ["Web Geliştirme","Programlama","Mobil Uygulamalar","Veri Analizi","Ofis Uygulamaları"],
//     blogs: [
//         {
//             blogid: 1,
//             baslik: "Komple Uygulamalı Web Geliştirme",
//             aciklama: "Sıfırdan ileri seviyeye 'Web Geliştirme': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
//             resim: "1.jpeg",
//             anasayfa: true,
//             onay: true
//         },
//         {
//             blogid: 2,
//             baslik: "Python ile Sıfırdan İleri Seviye Python Programlama",
//             aciklama: "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
//             resim: "2.jpeg",
//             anasayfa: true,
//             onay: true
//         },
//         {
//             blogid: 3,
//             baslik: "Sıfırdan İleri Seviye Modern Javascript Dersleri ES7+",
//             aciklama: "Modern javascript dersleri ile (ES6 & ES7+) Nodejs, Angular, React ve VueJs için sağlam bir temel oluşturun",
//             resim: "3.jpeg",
//             anasayfa: true,
//             onay: false,
//         },
//         {
//             blogid: 4,
//             baslik: "Sıfırdan Uygulamalı React Geliştirme: Hooks, Redux & Firebase",
//             aciklama: "En popüler frontend kütüphanesi React'i baştan sona uygulamalı projelerle öğren. Hooks, Redux, Webpack, Firebase ve Fazlası.",
//             resim: "4.jpeg",
//             anasayfa: false,
//             onay: true
//         },
//     ]
// }

const userController = require("../controllers/user");

router.use("/blogs/category/:categoryid", userController.blogs_by_category);


router.use("/blogs/:blogid", userController.blogs_details);

router.use("/blogs", userController.blog_list);

router.use("/", userController.index);


module.exports = router;  // router iceriklerini disariya actik.




