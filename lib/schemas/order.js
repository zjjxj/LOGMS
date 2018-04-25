let mongoose = require('mongoose');


let orderSchema = new mongoose.Schema({
    _id:String,
    orderStatus:[],
    senderInfo:{},
    receiverInfo:{},
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

orderSchema.statics ={
    findByID:function(id, cb){
        return this
            .findOne({_id:id})
            .exec(cb)
    }
}
module.exports = userSchema;