const express = require('express');
const app = express();
const mongoose = require("mongoose");
const userModel = require("./lib/models/user");
const bodyParser = require('body-parser');
const fs = require('fs');
const jsonFile = require('jsonfile');


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//数据库连接
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://127.0.0.1:27017/logms', { useMongoClient: true });
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));


app.use("/", express.static(__dirname + '/public'));


//登录
app.post('/login', (req, res) => {
    const {username, password} = req.body;
    const jsonData = jsonFile.readFileSync('./mock/user.json');
    const userArr = jsonData.data;

    const user = userArr.find((item, index) => {
        return item.id === username
    });

    if (user) {
        if (user.password === password) {
            res.json({"ret":true,data:user})
        } else {
            res.json({"ret":false,'errorMessage':"密码错误！"})
        }
    } else {
        res.json({"ret": false, 'errorMessage': "工号不存在！"})
    }

});

//添加员工
app.post("/addUser",(req,res)=>{
    const info = req.body;
    const {name,tel,password,idCard,addr,sex,birth,post} = req.body;

    res.json({"ret":true});
});

//获取全部员工
app.get('/getAllUser',function (req,res) {
    const jsonData = jsonFile.readFileSync('./mock/user.json');
    const userArr = jsonData.data;

    res.json(userArr);
});

//根据id查找员工
app.get('/findUserById', (req, res) => {
    const jsonData = jsonFile.readFileSync('./mock/user.json');
    const userArr = jsonData.data;
    const id = req.query.id;
    const user = userArr.find((item, index) => {
        return item.id === id
    });
    if (user) {
        res.json([user]);

    } else {
        res.json([]);
    }
});

//添加订单
app.post("/addOrder",(req,res)=>{
    const info = req.body;
    res.json({"ret":true});
});

//根据id查找订单
app.get('/findOrderById', (req, res) => {
    const jsonData = jsonFile.readFileSync('./mock/order.json');
    const orderArr = jsonData.data;
    const id = req.query.id;
    const order = orderArr.find((item, index) => {
        return item.orderId === id
    });

    if (order) {
        res.json([order]);

    } else {
        res.json([]);
    }
});

//获取全部订单
app.get('/getAllOrder',function (req,res) {
    const jsonData = jsonFile.readFileSync('./mock/order.json');
    const orderArr = jsonData.data;

    res.json(orderArr);
});

//更新订单状态
app.post("/updateOrder",(req,res)=>{
    const info = req.body.infoObj;
    const id = req.body.id;

    console.log(info,id)
    res.json({"ret":true});
});


app.use(function (req, res) {
    // res.set({
    //     "Catch-Control":"no-catch"
    // });
    res.sendFile('index.html', {root: __dirname + '/public'});
})

app.listen(3000, () => {
    console.log("server start success listen at port 3000");
});
