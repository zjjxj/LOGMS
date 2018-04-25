const express = require('express');
const app = express();
const mongoose = require("mongoose");
const userModel = require("./lib/models/user");
const bodyParser = require('body-parser');
//source ~/.bash_profile

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




//数据库连接
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/logms', { useMongoClient: true });
// MongoClient.connect('mongodb://127.0.0.1:27017/logms');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use("/",express.static(__dirname + '/public'));
// var user = new userModel({
//     _id:111111,
//     password:111111,
//     tel:11111111111
// });
// user.save(function(err){
//     console.log(err);
// });

app.get('/', (req, res) => {
    res.sendFile('index.html');
    var user = new userModel({
        _id: 111111,
        password: 111111,
        tel: 11111111111
    });
    user.save(function(err) {
        console.log(err);
    });
});

app.post('/login', (req, res) => {
    res.json(Object.assign({},{"loginTip":"success"},req.body))
});

app.get('/searchOrder/:orderNumber', (req, res) => {
    const orderNumber = req.params.orderNumber;
    console.log(orderNumber)
    res.json({ "tip": "success" });
});



app.listen(3000, () => {
    console.log("server start success listen at port 3000");
});
