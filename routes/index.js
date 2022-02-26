const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Slider = require('../models/Slider');
const Briend = require('../models/Briend');
const Statestic = require('../models/Statestic');

/* GET home page. */
router.get('/', async function (req, res, next) {
  const carusel = await Slider.find();
  const briend = await Briend.find(); 
  const static = await Statestic.find(); 
  const home = true
  res.render('index', {
     title: 'Texnikum',
     layout:'main',
     home,
     carusel,
     briend,
     static
     });
});

router.get('/foto-galery', function (req, res, next) {
  res.render('galery', {
    layout: 'main',
    title: 'Qabul'
  });
});
router.get('/biz-haqimizda', function (req, res, next) {
  res.render('about', {
    layout: 'main',
    title: 'biz-haqimizda'

  });

});
router.get('/sohalarimiz', function (req, res, next) {
  res.render('soha', {
    layout: 'main',
    title: "Yo'nalishlar"

  });

});
router.get('/rahbariyat', function (req, res, next) {
  res.render('rahbariyat', {
    layout: 'main',
    title: 'rahbariyat'

  });

});
router.get('/axborot-xizmati', function (req, res, next) {
  res.render('kun', {
    layout: 'main',
    title: 'Axborot-xizmati'

  });

});
router.get('/contact', function (req, res, next) {
  res.render('contact', {
    layout: 'main',
    title: 'contact'

  });

});


module.exports = router;
