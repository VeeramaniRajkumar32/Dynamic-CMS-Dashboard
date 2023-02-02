const router = require('express').Router()
const upload = require('../middleware/multer').upload
const multipleFile = require('../middleware/multer').multipleFile
const login = require('../controller/authentication/login')
const register = require('../controller/authentication/register')
const slider = require('../controller/cms/slider')
const getAboutPage = require('../controller/cms/about').getAboutPage
const about = require('../controller/cms/about').about
const verifyToken = require("../middleware/jwtToken").verifyToken


/* GET home page. */
router.get("/", (req, res) => {
    res.cookie('token', '', { maxAge: 0 })
    res.render("../views/index", {title : 'Login'});
  })
  .post("/login", login)
  .get("/signup", (req, res) => {
    res.render("../views/register", {title : 'Register'});
  })
  .post("/register", register)
  .get("/dashboard",verifyToken, (req, res) => {
    res.render("../views/pages/dashboard" , {title : 'Dashboard'});
  })
  // .get("/slider", (req, res) => {
  //   res.render("../views/pages/slider", {title : 'slider'});
  // })
  .get("/slider",verifyToken, slider.getSlider)
  .post("/sliderForm",verifyToken, multipleFile.array('image', 12), slider.slider)
  .get("/slider/:id",verifyToken, slider.sliderDelete)
  .get("/about",verifyToken, getAboutPage)
  .post("/aboutForm",verifyToken, upload.single('image'), about)
  


module.exports = router