let mongoose = require('mongoose');
let orderSchema = require("../schemas/order");
let orderModel = mongoose.model('order',orderSchema);

module.exports=orderModel;