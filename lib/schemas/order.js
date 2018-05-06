let mongoose = require('mongoose');

let orderStatus = [{

}];
let orderSchema = new mongoose.Schema({
    _id: String,
    orderStatus: [],
    senderInfo: {},
    receiverInfo: {},
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

orderSchema.statics = {
    findByID: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}
module.exports = orderSchema;

// {
//     "orderId": "121212",
//     "senderInfo": {
//     "name": "zhoujie",
//         "company": "西瓜公司",
//         "fixPhone": "88888888",
//         "tel": "15633333333",
//         "addr": "陕西省西安市长安区",
//         "addrDetail": "子午大道",
//         "thingsType": "文件",
//         "weight": "3"
// },
//     "receiverInfo": {
//     "name": "zhoujie2",
//         "company": "西瓜公司2",
//         "fixPhone": "888888882",
//         "tel": "156333333332",
//         "addr": "陕西省西安市长安区2",
//         "addrDetail": "子午大道2"
// },
//     "orderStatus": [
//     {
//         "date": "2018-01-01",
//         "state": [
//             {
//                 "time": "02:45:45",
//                 "state": "派送中",
//                 "remark": "快件到达B转运站",
//                 "personBase": "站点A",
//                 "dealPersonId": "444444"
//             },
//             {
//                 "time": "01:45:45",
//                 "state": "已揽件",
//                 "remark": "",
//                 "personBase": "站点A",
//                 "dealPersonId": "111111"
//             }
//         ]
//     }
// ]
// }