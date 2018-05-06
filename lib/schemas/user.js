let mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    _id:String,
    base:String,
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
            .findOne({_id:username})
            .exec(cb)
    }
}
module.exports = userSchema;

// {
//     "id": "222223",
//     "password": "222223",
//     "name": "周小明2",
//     "sex": "",
//     "birth": "",
//     "post": "派送员",
//     "addr": "",
//     "tel": "",
//     "idCard": "",
//     "base": "B转运站"
// },