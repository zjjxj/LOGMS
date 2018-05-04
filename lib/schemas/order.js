let mongoose = require('mongoose');


let orderSchema = new mongoose.Schema({
    id:String,
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
            .findOne({id:id})
            .exec(cb)
    }
}
module.exports = userSchema;