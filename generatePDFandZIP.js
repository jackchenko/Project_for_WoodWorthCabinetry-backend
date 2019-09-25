const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');

const pdfTemplate = require('./documents');

const app = express();

const port = process.env.PORT || 8000;
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/GeneratePDFandZIP', (req, res) => {
     var dir = './' + req.body.name;
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
        sleep(5000);
    });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/` + req.body.name + `.pdf`)
})

app.listen(port, () => console.log(`Listening on port ${port}`));
