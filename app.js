const express = require('express');
const path = require('path');
const upload = require('express-fileupload');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/userRoutes');
const nanRoutes = require('./routes/nanRoutes');
const mongoose = require('mongoose');
const Lasfile = require('./models/lasFile');

// for parsing las files 
const Lasjs = require('las-js');


app.use(express.static('public'));
app.use(userRoutes);
app.use(upload());
//app.use(nanRoutes);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));

// Connect to database
const MONGODB_URI = 'mongodb+srv://islam:ozyKGjXmWIHhOeMM@cluster0-jrlnr.mongodb.net/logReader';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }).then(()=> {
    console.log('connected to database');
    app.listen(3000, ()=> {
        console.log('Listen to port: 3000');
    });
})
.catch(()=> {
    console.log('cant connect to database');
});

// Main function 

app.post('/upload-file', (req, res, next) => {
    if(req.files) {
        var file = req.files.filename,
            filename = file.md5 + '-' + Date.now(); 
        file.mv('./upload/' + filename , (err) => {
            if (err) {
                res.send('err');
            }
            else {
                async function read() {
                    try {
                        const myLas = new Lasjs('./upload/' + filename);
                        const data = await myLas.dataStripped;
                        const headers = await myLas.header;
                        const headerAndDescr = await myLas.headerAndDescr;
                        const finalData = {};
                        for (var i=0; i < headers.length; i++){
                            var rowArray = [];
                            data.forEach(row => {
                                rowArray.push(row[i]);
                            });
                            finalData[headers[i]] = rowArray;
                        }
                        const myData = new Lasfile({
                            fileName: filename,
                            headers: headers,
                            headersDesc: headerAndDescr,
                            finalData: finalData
                        });
                        myData.save()
                        .then(results=>{
                            headers.shift();
                            res.render('logs', {
                                pageTitle: 'All logs',
                                headers: headers,
                                headersDesc: headerAndDescr,
                                fileName: filename,
                                id: results._id
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
                read();
            }
        });
    }
});