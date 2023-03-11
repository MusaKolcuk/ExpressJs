const express = require("express");
const router = express.Router();

const imageUpload = require("../helpers/image-upload");

const adminContoller = require("../controllers/admin");


router.get("/blog/delete/:blogid", adminContoller.get_blog_delete);

router.post("/blog/delete/:blogid", adminContoller.post_blog_delete);

// categories delete

router.get("/category/delete/:categoryid", adminContoller.get_category_delete);

router.post("/category/delete/:categoryid", adminContoller.post_category_delete);



router.get("/blog/create", adminContoller.get_blog_create);;


router.post("/blog/create", imageUpload.upload.single("resim"), adminContoller.post_blog_create);

router.get("/category/create", adminContoller.get_category_create);

router.post("/category/create", adminContoller.post_category_create);


router.get("/blogs/:blogid", adminContoller.get_blog_edit);


router.post("/blogs/:blogid", imageUpload.upload.single("resim"), adminContoller.post_blog_edit);

router.get("/blogs", adminContoller.get_blogs);

router.get("/categories/:categoryid", adminContoller.get_category_edit);


// categories edit

router.post("/categories/:categoryid", adminContoller.post_category_edit)

router.get("/categories", adminContoller.get_categories);


module.exports = router;