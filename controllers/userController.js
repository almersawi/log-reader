const Lasfile = require('../models/lasFile');
// for parsing las files 
const Lasjs = require('las-js');
const mongoose = require('mongoose');

exports.getIndex = (req, res, next) => {
    res.render('index', {
        pageTitle: 'logReader 2019'
    });
}

exports.getLog = (req, res, next) => {
    const header = req.params.header;
    const filename = req.params.filename;
    
    async function read() {
        try {
            const myLas = new Lasjs('./upload/' + filename);
            const data = await myLas.dataStripped;
            const headers = await myLas.header;
            const headerInex = headers.indexOf(header);
            const depthArr = await myLas.columnStripped('DEPT');
            var headerArr = []
            data.forEach((row) => {
                headerArr.push(row[headerInex])
            });
            res.render('display-D3', {
                header: header,
                depthArr: depthArr,
                headerArr: headerArr,
                pageTitle: header + " Log Display"
            });
        }
        catch {
            console.log('err');
        }
    }
    read();
}


exports.getMulti= (req, res, next) => {

    const id = req.params.id;
    Lasfile.findById(id)
    .then(data => {
        const headers = data.headers;
        const depthArr = data.finalData.DEPT;
        res.render('multi-plot', {
            pageTitle: "Multi Plot Area",
            headers: headers,
            depthArr: depthArr,
            finalData: data.finalData
        });
    })
    .catch(err => {
        console.log(err);
    })

}