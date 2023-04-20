const multer = require("multer");
const path = require("path");

// CONFIGURATION FOR MULTER
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  
  /*filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },*/

  filename: function (req, file, cb){
    cb(null, file.originalname);
   },

});

const upload = multer({ storage: storage });
module.exports = upload;
