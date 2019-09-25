const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');

const pdfTemplate = require('./documents');

const app = express();

const port = process.env.PORT || 5000;

//download pdf
/*app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/create-pdf', (req, res) => {
    var fs = require('fs');
    var dir = './' + req.body.name;
    //create directory for client if not exists
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    //generate PDF template and place into client name folder
    pdf.create(pdfTemplate(req.body)).toFile('./' + dir + '/' + req.body.name + '.pdf', (err) => {
        if (err) {
            res.send(Promise.reject());
        }
        //zip all files under client's folder
        var zipFolder = require('zip-folder');
        zipFolder('./' + dir + '/', req.body.name + '.zip', function (err) {
            if (err) {
                console.log('oh no!', err);
            } else {
                console.log('zip created');
            }
        });
        res.send(Promise.resolve());
    });




});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/` + req.body.name + `.pdf`)
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//upload files function
//var multer = require('multer')
//var storage = multer.diskStorage({
//  destination: function (req, file, cb) {
//    var name = req.body.name
//  cb(null, 'jackie')
// },
// filename: function (req, file, cb) {
//    cb(null, Date.now() + '-' + file.originalname)
// }
//})

//var upload = multer({ storage: storage }).single('file')
    */


    
    app.post('/uploadPic', (req, res) =>{
    var fs = require('fs');
    var dir = './' + req.body.name;

    var name = req.body.name
    //console.log('./'+name)
    //create directory for client if not exists
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    var multer = require('multer')
    var upload = multer({ storage: storage }).single('file')
    //var upload = multer({ storage: storage }).single('file')
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            console.log(name)
            cb(null, name)
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)

    })

});
/*
app.post('/upload', function (req, res) {

    upload(req, res, function (err) {

        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)

    })

});
*/
app.listen(port, () => console.log(`Listening on port ${port}`));