let mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    id:String,
    tel:String,
    password:String,
    post:String,
    sex:String,
    name:String,
    birth:String,
    addr:String,
    idCard:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});

userSchema.statics ={
    findByName:function(username, cb){
        return this
            .findOne({id:username})
            .exec(cb)
    }
}
module.exports = userSchema;

// {
//     "id": "222222",
//     "password": "222222",
//     "name": "李小明",
//     "sex": "",
//     "birth": "",
//     "post": "站点管理员",
//     "addr": "",
//     "tel": "",
//     "idCard": ""
// }