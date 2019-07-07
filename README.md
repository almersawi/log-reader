# logReader
### Configurations 
We use Node.js and create server of port: 3000
<br>

```javascript
app.listen(3000, ()=> {
        console.log('Listen to port: 3000');
    });
```

<br>
After connecting to mongoDB, which we use to store our parsing data

### Use las-js package from npm 

```javascript
// for parsing las files 
const Lasjs = require('las-js');
```

in the "routes" folder, you can find userRoutes.js where you can add and remove the routes you need. As example: 

```javascript
router.get('/', userController.getIndex);

router.get('/:filename/:header', userController.getLog);

router.get('/:id/multi/plot', userController.getMulti)
```

As we use "MVC" you can find your controllers in the "controllers" folder and code your desired function based on the router you choosed.

### Parsing the .las file
First, we upload the file to the "uploads" folder and then, with the help of las-js package and async function you can read the file, get your desired data. <br>

After that, and the most important, we changed the data from array format to ogject format to suit the model we have created on the "models" folder and save it to our mongoDB database.

```javascript
const finalData = {};
for (var i=0; i < headers.length; i++){
var rowArray = [];
data.forEach(row => {
rowArray.push(row[i]);
});
finalData[headers[i]] = rowArray;
                  }
```

Creating our object and save it to our database

```javascript
const myData = new Lasfile({
                    fileName: filename,
                    headers: headers,
                    headersDesc: headerAndDescr,
                    finalData: finalData
                        });
myData.save()
```

### Display logs

we create a dynamic router containg the filename stored in our database and the desired header to view.

```javascript
router.get('/:filename/:header', userController.getLog);
```

Depending on the header we can find the desired array of data, then render the ejs page with that information. <br>

to display logs, we use D3.js which allows us to represent our data on svg graph created by our own.

### Multi-plot
First, we render the ejs page with a data obtained from our data base. These data contain the object with keys equlas to the headers and each key has its own data of array.
```javascript
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
```

The most important part is to detect the selected arrays that you want to plot 

```javascript
$(document).ready(function() {
      $(":checked").each(function(){
        selectedArray.push($(this).val());
      });
```
After that we send these data to D3.js to plot
