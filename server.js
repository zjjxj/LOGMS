const express = require('express');
const app = express();
const mongoose = require("mongoose");
const userModel = require("./lib/models/user");
const orderModel = require("./lib/models/order");
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//数据库连接
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/logms', {useMongoClient: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


app.use("/", express.static(__dirname + '/public'));
// app.get("/u", function (req, res) {
//     let user = new userModel({
//         _id: 1,
//         password: "1",
//         name: "大花",
//         sex: "女",
//         birth: "1996-8-9",
//         post: "系统管理员",
//         addr: "陕西省",
//         tel: "12312134453",
//         idCard: "73847583939202",
//         base: "D站点"
//     });
//     user.save(function (err, res) {
//         console.log(err);
//         console.log(res);
//     });
// });

app.get("/s", function (req, res) {
    let user = new orderModel({
        _id: 22,
        senderInfo: {
            name: "托尼",
            company: "西瓜公司",
            fixPhone: "88888888",
            tel: "15633333333",
            addr: "陕西省西安市长安区",
            addrDetail: "子午大道",
            thingsType: "文件",
            weight: "3"
        },
        receiverInfo: {
            name: "汤姆",
            company: "西瓜公司2",
            fixPhone: "888888882",
            tel: "156333333332",
            addr: "陕西省西安市长安区2",
            addrDetail: "子午大道2"
        },
        orderStatus: [
            {
                date: "2018-1-1",
                state: [
                    {
                        time: "01:45:45",
                        state: "已揽件",
                        remark: "",
                        personBase: "A站点",
                        dealPersonId: "7"
                    }
                ]
            }
        ]
    });
    user.save(function (err, res) {
        console.log(err);
        console.log(res);
    });

});


//登录
app.post('/login', (req, res) => {
    const {username, password} = req.body;
    userModel.findByName(username, function (err, user) {
        if (!user) {
            res.json({"ret": false, 'errorMessage': "工号不存在！"})
        } else {
            if (user.password === password) {
                console.log(user)
                res.json({"ret": true, data: user})

            } else {
                res.json({"ret": false, 'errorMessage': "密码错误！"})
            }
        }

    });
});

//添加员工
app.post("/addUser", (req, res) => {
    const info = req.body;
    let newUser = new userModel(info);
    newUser.save(function (err, data) {
        if (err) {
            return console.log(err)
        }
        res.json({"ret": true, data: data});
    })

});

//获取全部员工
app.get('/getAllUser', function (req, res) {
    userModel.find(function (err, list) {
        if (err) {
            console.log(err);
        }
        res.json(list);
    })

});

//删除员工
app.get('/deleteUser', function (req, res) {
    const id = req.query.id;
    userModel.remove({_id: id}, function (err, data) {
        if (err) {
            return {ret:false};
        }
        res.json({ret:true});
    });
});

//根据id查找员工
app.get('/findUserById', (req, res) => {
    const id = req.query.id;
    userModel.findByName(id, function (err, user) {
        if (!user) {
            res.json([])
        } else {
            res.json([user]);
        }

    });
});

//添加订单
app.post("/addOrder", (req, res) => {
    const info = req.body;
    let newOrder = new orderModel(info);
    newOrder.save(function (err, data) {
        if (err) {
            return {"ret": false}
        }
        res.json({"ret": true, data: data});
    });

});

//根据id查找订单
app.get('/findOrderById', (req, res) => {
    const id = req.query.id;
    orderModel.findById(id, function (err, order) {
        if (!order) {
            res.json([])
        } else {
            res.json([order]);
        }

    });
});

//获取全部订单
app.get('/getAllOrder', function (req, res) {
    orderModel.find(function (err, list) {
        if (err) {
            console.log(err);
        }
        res.json(list);
    })
});

//更新订单状态
app.post("/updateOrder", (req, res) => {
    const info = req.body.infoObj;
    const id = req.body.id;
    orderModel.findById(id, function (err, order) {
        if (!order) {
            res.json({"ret": false});
        } else {
            order.orderStatus = info.orderStatus;
            order.save(function (err) {
                console.log(err)
            });
            res.json({"ret": true});
        }
    });
});


app.use(function (req, res) {
    res.sendFile('index.html', {root: __dirname + '/public'});
});

app.listen(3000, () => {
    console.log("server start success listen at port 3000");
});
