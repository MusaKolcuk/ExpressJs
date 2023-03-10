const express = require("express");
const router = express.Router();

const fs = require("fs");

const db = require("../data/db");
const imageUpload = require("../helpers/image-upload");

const Blog = require("../models/blog");
const Category = require("../models/category")

router.get("/blog/delete/:blogid", async function(req, res) {

    const blogid = req.params.blogid;

    try {

        const [blogs, ] = await db.execute("select * from blog where blogid =?", [blogid]);
        const blog = blogs[0];

        res.render("admin/blog-delete", {
            title: "delete blog",
            blog: blog
        });

    } catch (error) {
        console.log(error);
    }
})

router.post("/blog/delete/:blogid", async function (req, res) {

    const blogid = req.body.blogid;

    try {

        await db.execute("delete from blog where blogid =?", [blogid]);
        res.redirect("/admin/blogs?action=delete");

    } catch (error) {
        console.log(error);

    }
})

// categories delete

router.get("/category/delete/:categoryid", async function(req, res) {

    const categoryid = req.params.categoryid;

    try {

        const [categories, ] = await db.execute("select * from category where categoryid =?", [categoryid]);
        const category = categories[0];

        res.render("admin/category-delete", {
            title: "delete category",
            category: category
        });

    } catch (error) {
        console.log(error);
    }
})

router.post("/category/delete/:categoryid", async function (req, res) {

    const categoryid = req.body.categoryid;

    try {

        await db.execute("delete from category where categoryid =?", [categoryid]);
        res.redirect("/admin/categories?action=delete");

    } catch (error) {
        console.log(error);

    }
})



router.get("/blog/create", async function(req, res) {

    try {

        // const [categories, ] = await db.execute("select * from category"); Veri tabanı sorgu formati

        const categories = await Category.findAll();
        res.render("admin/blog-create", {
            title: "add blog",
            categories: categories
        });

    }

    catch(err) {
        console.log(err);
    }

});


router.post("/blog/create", imageUpload.upload.single("resim"), async function(req, res) {
    const baslik = req.body.baslik;
    const altbaslik = req.body.altbaslik;
    const aciklama = req.body.aciklama;
    const resim = req.file.filename;
    const anasayfa = req.body.anasayfa == "on" ? 1:0 ;
    const onay = req.body.onay == "on" ? 1:0;
    const kategori = req.body.kategori;

    try {
        console.log/(resim);
        await Blog.create({
            baslik: baslik,
            altbaslik: altbaslik,
            aciklama: aciklama,
            resim: resim,
            anasayfa: anasayfa,
            onay: onay,
            categoryid: kategori

        })
        res.redirect("/admin/blogs?action=create"); // URL yi yönlendirmek icin res.redirect yapilir.
    }

    catch(err) {
        console.log(err);
    }

});

router.get("/category/create", async function(req, res) {

    try {

        res.render("admin/category-create", {
            title: "add category",
        });
    }

    catch(err) {
        console.log(err);
    }

});

router.post("/category/create", async function(req, res) {
    const name = req.body.name

    try {
        await Category.create({name: name});
        res.redirect("/admin/categories?action=create");
    }

    catch(err) {
        console.log(err);
    }

});


router.get("/blogs/:blogid", async function(req, res) {

    const blogid = req.params.blogid;

    try {

        const blog = await Blog.findByPk(blogid);
        const categories = await Category.findAll();

        if(blog) {

            return res.render("admin/blog-edit", {
                title: blog.dataValues.baslik,
                blog: blog.dataValues,
                categories: categories
            });
        }

    } catch (error) {
        console.log(err);

    }

    res.redirect("/admin/blogs");
});


router.post("/blogs/:blogid", imageUpload.upload.single("resim"), async function(req, res) {

    const blogid = req.body.blogid;
    const baslik = req.body.baslik;
    const altbaslik = req.body.altbaslik;
    const aciklama = req.body.aciklama;
    let resim = req.body.resim;

    if(req.file) {
        resim = req.file.filename;

        fs.unlink("./public/images/" + req.body.resim, err => { //fs.unlink belirtilen dosyayı silmek için kullanılır.
            console.log(err);
        })
    }


    const anasayfa = req.body.anasayfa == "on" ? 1: 0;
    const onay = req.body.onay == "on" ? 1: 0;
    const kategoriid = req.body.kategori;

    try {

        const blog = await Blog.findByPk(blogid);

        if(blog) {
            blog.baslik = baslik;
            blog.altbaslik = altbaslik;
            blog.aciklama = aciklama;
            blog.resim = resim;
            blog.anasayfa = anasayfa;
            blog.onay = onay;
            blog.categoryid = kategoriid;

            await blog.save();
            return res.redirect("/admin/blogs?action=edit&blogid="+ blogid);

        }
        res.redirect("/admin/blogs");

        // await db.execute("UPDATE blog SET baslik =?, altbaslik =?, aciklama =?, resim =?, anasayfa =?, onay =?, categoryid =? WHERE blogid =?", [baslik,altbaslik,
        // aciklama, resim, anasayfa, onay, kategoriid, blogid]); üstteki veri tabanı ORM sorgusunun SQL sekli budur.

    } catch (error) {
        console.log(err);
    }


})

router.get("/blogs", async function(req, res) {

    try {
        // const [blogs, ] = await db.execute("select blogid, baslik, altbaslik, resim from blog");
        const blogs = await Blog.findAll({attributes: ["blogid","baslik","altbaslik","resim"]});
        console.log(blogs);
        res.render("admin/blog-list", {
            title: "blog list",
            blogs: blogs,
            action: req.query.action,
            blogid : req.query.blogid
        });
    }
    catch(err) {
        console.log(err);
    }

});

router.get("/categories/:categoryid", async function(req, res) {

    const categoryid = req.params.categoryid;

    try {
        // // const [categories, ] = await db.execute("select * from category where categoryid =?", [categoryid]);
        // const category = await Category.findAll({
            // where: {
                // categoryid: categoryid
            // }
        // })

        const category = await Category.findByPk(categoryid);

        if(category) {

            return res.render("admin/category-edit", {
                title: category.dataValues.name,
                category: category.dataValues
            })
        }

    } catch (error) {
        console.log(err);

    }

    res.redirect("admin/categories");
});


// categories edit

router.post("/categories/:categoryid", async function(req, res) {

    const categoryid = req.body.categoryid;
    const name = req.body.name;

    try {

        await db.execute("UPDATE category SET name =? WHERE categoryid =?", [name, categoryid]);
        res.redirect("/admin/categories?action=edit&categoryid="+ categoryid);

    } catch (error) {
        console.log(err);
    }

})

router.get("/categories", async function(req, res) {

    try {
        const categories = await Category.findAll();
        console.log(categories);

        res.render("admin/category-list", {
            title: "category-list",
            categories: categories,
            action: req.query.action,
            categoryid: req.query.categoryid
        });
    } catch (err) {
        console.log(err);

    }
})


module.exports = router;