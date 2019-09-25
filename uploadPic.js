var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
var bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/uploadPic',function(req, res) {    
   //var name = req.fields.name
       // console.log(name)
       var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            var name = req.body.name
            var fs = require('fs');
            var dir = './'+name
            //create directory for client if not exists
        if (!fs.existsSync(dir)) {
           fs.mkdirSync(dir)  
       }
        cb(null, name)
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname )
      }
    })
    var upload = multer({ storage: storage }).array('file')
       

    upload(req, res, function (err) {
        //console.log(upload) 
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
   return res.status(200).send(req.file)

 })

});

app.listen(7000, function() {

    console.log('App running on port 7000');

});