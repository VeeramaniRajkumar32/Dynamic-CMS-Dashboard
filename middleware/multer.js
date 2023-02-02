const multer  = require('multer')
const path = require('path').join(__dirname, '../public/uploads/about')
const path2 = require('path').join(__dirname, '../public/uploads/slider')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path)
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname)
    }
})
let upload = multer({ 
    storage: storage, 
    // limits: { fileSize: 1000000 }, 
    // array: true, 
});

let storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path2)
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname)
    }
})
let multipleFile = multer({ 
    storage: storage1, 
})

module.exports = {
  upload,
  multipleFile,
}