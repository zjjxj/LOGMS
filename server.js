const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));


app.get('/',(req,res)=>{
     res.sendFile('index.html');
});

app.get('/searchOrder/:orderNumber',(req,res)=>{
    const orderNumber = req.params.orderNumber;
    console.log(orderNumber)
    res.json({"tip":"success"});
});

app.listen(3000,()=>{
    console.log("server start success listen at port 3000");
});