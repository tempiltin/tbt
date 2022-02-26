const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const upload = require('../middleware/fileUpload')//multer
const Slider = require('../models/Slider');//bosh sahifaga rasm joylash
const Briend = require('../models/Briend');//hamkor tashkilotlar briendini qo'shish
const Direction = require('../models/Direction');//sohalar qo'shish
const Statistic = require('../models/Statestic');//statestika qo'shish
const InforBig = require('../models/InforBig');//statestika qo'shish
const fileRemove = require('../middleware/fileRemove');

/* GET Admin listing. */
router.get('/', auth, async function (req, res, next) {
  const static = await Statistic.find() 

  res.render('admin/index', {
    layout: 'layout',
    title: 'AdminPage',
    static
  });
});



router.post('/static', auth, async function (req, res, next) {
 const {direct, student, teacher,partner,} = req.body
 const statistic = new Statistic({direct, student, teacher,partner,})
 await statistic.save()
 res.redirect('/admin')
});


router.get('/update/:id' , auth , async (req , res , next)=>{
  const static = await Statistic.find()
  Statistic.findById(req.params.id , (err  , data)=>{
      if (err) {
          throw new Error
      } else{
          res.render('admin/update' , {
              title:'Update',
              layout:'layout',
              data,
              static
          })
      }
  })
  
})
router.post('/update/:id' , auth ,async (req , res , next)=>{

  const Updatestatic = {}

  Updatestatic.direct = req.body.direct,
  Updatestatic.student = req.body.student,
  Updatestatic.teacher = req.body.teacher,
  Updatestatic.partner = req.body.partner

  const updateid = {_id:req.params.id}
 
  await Statistic.updateOne(updateid , Updatestatic  , (error)=>{
      if (error) {
          throw new Error
      }
      else{
          res.redirect('/admin')
      }
  })

})

/* GET Admin / slider listing. */
router.get('/slider', auth, async function (req, res, next) {
  const carusel = await Slider.find() 
  console.log(carusel);
  res.render('admin/slider', {
    layout: 'layout',
    title: 'AdminPage / slider',
    carusel
  });
});
router.get('/slider/delete/:id', auth, async function (req, res, next) {
   await Slider.findByIdAndDelete(req.params.id)
   res.redirect('/admin/slider')
});
router.post('/slider/add', auth, upload.single('img'), async function (req, res, next) {
  console.log(req.body);
  const slider = new Slider({
    img: req.file.filename,
  })
  await slider.save()
  res.redirect('/admin/slider')
});


/* GET Admin / briend listing. */
router.get('/briend', auth, async function (req, res, next) {
  const logos = await Briend.find() 
  res.render('admin/briend', {
    layout: 'layout',
    title: 'AdminPage / briend',
    logos
 
  });
});
router.post('/briend/add', auth, upload.single('briend'), async function (req, res, next) {

  const briend = new Briend({
    briend: req.file.filename,
  })
  await briend.save()
  res.redirect('/admin/briend')
});


router.get('/briend/delete/:id', auth, async function (req, res, next) {
 
    try {
      const briend = await Briend.findById(req.params.id)
      console.log(briend);
  
      await Briend.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
          throw new Error
        } else {
          fileRemove(briend.briend)
          console.log('briend removed');
          res.redirect('/admin/briend')
        }
      })
    } catch (error) {
      console.log(error);
    }
});

/* GET Admin / directions listing. */
router.get('/directions', auth, async function (req, res, next) {
  const direction = await Direction.find()
  res.render('admin/directions', {
    layout: 'layout',
    title: "AdminPage / Yo'nalishlar",
    direction
  });
});
router.post('/directions/add', auth, upload.single('img'), async function (req, res, next) {
const {name,info} = req.body
  const direction = new Direction({
    name,
    img: req.file.filename,
    info
  })
  await direction.save()
  res.redirect('/admin/directions')
});
/* GET Admin / directions / direction listing. */

router.get('/direction/:id', auth, async function (req, res, next) {
  const direct = await Direction.findById(req.params.id)
  res.render('admin/direction', {
    layout: 'layout',
    title: direct.name,
    direct
  });
});
router.get('/direction/delete/:id', auth, async function (req, res, next) {
  await Direction.findByIdAndDelete(req.params.id)

  res.redirect('/admin/directions')

});



/* GET Admin / information / listing. */

router.get('/axborot-xizmati', auth, async function (req, res, next) {
  const inforBig = await InforBig.find()
 
  res.render('admin/informations', {
    layout: 'layout',
    title: 'Axborot xizmati',
    inforBig,

  });
});

router.post('/informationBig', auth, upload.single('img1') , async function (req, res, next){
const {name , infor} = req.body
const inforBig = new InforBig({
  name ,
  img1: req.file.filename,
  infor
})
console.log(inforBig);
await inforBig.save()
res.redirect('/admin/axborot-xizmati')

})
router.get('/informationbigUpdate/:id' , auth , async (req , res , next)=>{
  const inforBig = await InforBig.find()
  InforBig.findById(req.params.id , (err  , data)=>{

      if (err) {
          throw new Error
      } else{
          res.render('admin/informationbig' , {
              title:'Update',
              layout:'layout',
              inforBig,
              data
              
          })
      }
  })
  
})
router.get('/informationbigUpdate/remove/:id' , auth , async (req , res , next)=>{
  const inforBig = await InforBig.find()
  try {
    const inforBig = await InforBig.findById(req.params.id)
   

    await InforBig.findByIdAndDelete(req.params.id, (err) => {
      if (err) {
        throw new Error
      } else {
        fileRemove(inforBig.img1)
        console.log('InforBig removed');
        res.redirect('/admin/axborot-xizmati')
      }
    })
  } catch (error) {
    console.log(error);
  }
  
})
router.post('/informationbigUpdate/UP/:id' , auth ,upload.single('img1') , async (req , res , next)=>{
  
try {
  const oldinforBig = await InforBig.findById(req.params.id)
  const inforBig = req.body
  if(req.file){
    fileRemove(oldinforBig.img1)
    inforBig.img1 = req.file.filename
  }else{
    oldinforBig.img1 = inforBig.img1
  }
  await InforBig.findByIdAndUpdate(req.params.id ,inforBig ,  (err)=>{
    if (err) {
      throw new Error
    } else {
      res.redirect('/admin/axborot-xizmati')
    }
  })
} catch (error) {
  console.log(error);
}
  
})


module.exports = router;