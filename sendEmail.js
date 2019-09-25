const nodemailer = require('nodemailer')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/sendEmail',(req, res) => { 
    var name = req.body.name+'.zip';
    console.log(name)
var myemail = 'jiachen.hou1201@gmail.com'
var transport = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: myemail,
        pass: 'Hh784553564'
    }
})

var message = {
    from: myemail,
    to: 'jackiecheapest@gmail.com',
    subject: 'New quote received',
    text: 'Hi, you reiceived a quote from '+ req.body.name,
    attachments: [ 
        {
            fileame: name,
            path: '/Users/jiachenhou/Project_for_WoodWorthCabinetry/server/'+name
        }]
};

transport.sendMail(message, function(err,data){
    if(err){
        console.log(err);
        return;
    }
    console.log('email sent');
})

})
app.listen(9000, function() {

    console.log('App running on port 9000');

});