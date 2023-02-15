var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer  = require('multer') // Multer middleware
const upload = multer({ dest: 'uploads/' })

var app = express();

app.use(cors());
app.use(express.json())
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

/**
 * in the 'upload.single('upfile'), the 'upfile' must match the 
 *      '<input id="inputfield" type="file" name="upfile"> name''
 * The req.file has the actual uploded file
 * The req.body will contain the text fields, if there were any
 */
app.post('/api/fileanalyse', upload.single('upfile'), (req, res)=>{
    
    const file = req.file;
    const result = {
        name:file.originalname,
        type: file.mimetype,
        size: file.size
    }
    console.log(file)
    res.json(result);
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
