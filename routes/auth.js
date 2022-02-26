const express = require('express');
const Admin = require('../models/Admin');
const router = express.Router();
const bcrypt = require('bcryptjs')
router.get('/login', function (req, res, next) {
    res.render('auth/login', {
        layout: 'auth',
        title: 'Login',
        loginError: req.flash('loginError'),
        success: req.flash('success')
    });
});
router.post('/login', async function (req, res, next) {
    try {
        const { email, password } = req.body
        // password  1123456
        const candidate = await Admin.findOne({ email })
        if (candidate) {
            // const areSame = candidate.password === password
            const areSame = await bcrypt.compare(password, candidate.password)
            if (areSame) {
                req.session.isAuthen = true
                req.session.admin = candidate
                req.session.save((err) => {
                    if (err) {
                        throw new Error
                    }
                    // res.setHeader('Content-type', 'application/json')
                    res.redirect('/admin')
                })
            } else {
                req.flash('loginError', 'Password is incorrect')
                res.redirect('/auth/login')
            }
        } else {
            //Admin baza yo'q
            req.flash('loginError', 'Admin is not found')
            res.redirect('/auth/login')
        }
    } catch (error) {
        console.log(error);
    }
})
router.get('/register', function (req, res, next) {
    res.render('auth/register', {
        layout: 'auth',
        title: 'Register',
        registerError: req.flash('registerError')
    });
});
router.post('/register', async (req, res, next) => {
    try {
        const { name, email, password, img } = req.body
        // password // 123456
        const candidate = await Admin.findOne({ email })
        if (candidate) {
            req.flash('registerError', 'Login is busy')
            res.redirect('/auth/register')
        } else {
            const hashPassword = await bcrypt.hash(password, 12)
            const admin = new Admin({
                name, password: hashPassword, email, img
            })
            await admin.save()
            req.flash('success', 'Admin is registreted successfull')
            res.redirect('/auth/login')
        }
    } catch (error) {
        console.log(error);
    }
})
router.get('/logout', function (req, res, next) {
    // req.session.isAuthen = false
    req.session.destroy(() => {
        res.redirect('/auth/login')
    })
})
router.get('/error', function (req, res, next) {
    res.render('error404', {
        layout: 'auth',
        title: 'Not found'
    })
})
module.exports = router;