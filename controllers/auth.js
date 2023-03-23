const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.get_register = async function(req, res)  {
    try {
        return res.render("auth/register", {
            title: "register"
        })
    } catch (error) {
        console.log(error);
    }
}

exports.post_register = async function(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;


    const hashedPassword = await bcrypt.hash(password, 10)          //parola hash leme, 10 karakter hash yaptik.

    try {
        await User.create({
            fullname: name,
            email: email,
            password: hashedPassword,
        })

        return res.redirect("login");
    }
    catch(error) {
        console.log(error);
    }
}


exports.get_login = async function(req, res)  {
    try {
        return res.render("auth/login", {
            title: "login"
        })
    } catch (error) {
        console.log(error);
    }
}


exports.post_login = async function(req, res)  {

    const email = req.body.email;
    const password = req.body.password;

    try {

        const user = await User.findOne({               //girmis oldugumuz mail adresi ile veri tabanindan kullaniciyi aldik.
            where: {
                email: email,
            }
        })

        if(!user) {
            return res.render("auth/login", {
                title: "login",
                message: "email hatali"     //undefined degilse bu message bilgisi sayfada goruntulenecek dedik login.ejs sayfasinda
            })
        }

        //Parola Kontrolu bcrypt kutuphanesi

        const match = await bcrypt.compare(password, user.password);

        if(match) {         //eger true ise login olduk demektir, anasayfaya yonlerdirildi.

            
            return res.redirect("/");
        }

            return res.render("auth/login", {
                title: "login",
                message: "password hatali"
            })





    } catch (error) {
        console.log(error);
    }
}


