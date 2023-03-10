const express = require("express");
const router = express.Router();


const Blog = require("../models/blog");
const Category = require("../models/category")

const { Op} = require("sequelize");


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


router.use("/blogs/category/:categoryid", async function(req, res) {
    const id = req.params.categoryid;

    try {
        const blogs = await Blog.findAll({
            where: {
                categoryid: id,
                onay: true
            },
            raw: true
        });
        const categories = await Blog.findAll({ raw: true });

        res.render("users/blogs", {
            title: "Tüm Kurslar",
            blogs: blogs,
            categories: categories,
            selectedCategory: id
    })
}

    catch(err) {
        console.log(err);
    }
});




router.use("/blogs/:blogid", async function(req, res) {
    const id = req.params.blogid;

    try {
        const blog = await Blog.findOne({
            where: {
                blogid: id
            },
            raw: true
        });


        if(blog) {
            return res.render("users/blog-details", {
                title: blog.baslik,
                blog: blog,
                selectedCategory: null

            });
        }

        res.redirect("/");
    }

    catch(err) {
        console.log(err);
    }
});

router.use("/blogs", async function(req, res) {

    try {
        const blogs = await Blog.findAll({
            where: {
                onay: {
                    [Op.eq]: true // onay = 1
                }
            },
            raw: true
        });
        const categories = await Category.findAll({ raw: true});

        res.render("users/blogs", {
            title: "Popüler Kurslar",
            blogs: blogs,
            categories: categories,
            selectedCategory: null

    })
    }

    catch(err) {
        console.log(err);
    }
    });

router.use("/", async function(req, res) {

    try {
        const blogs = await Blog.findAll({
            where: {
                [Op.and]: [
                    {anasayfa: true},
                    {onay: true}
                ]
            },
            raw: true
        });
        const categories = await Category.findAll({ raw: true });

        console.log(blogs);
        console.log(categories);

        res.render("users/anasayfa", {
            title: "Tüm Kurslar",
            blogs: blogs,
            categories: categories,
            selectedCategory: null

    })
    }

    catch(err) {
        console.log(err);
    }

    });


module.exports = router;  // router iceriklerini disariya actik.




