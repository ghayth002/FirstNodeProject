const express = require("express");
const app = express();
const productRoute = require('./Routes/product')
const userRoute = require('./Routes/user');
require("./Config/Connect");

app.use(express.json());


//Product crud
app.use('/product',productRoute);
app.use('/user',userRoute);
app.use('/getimage',express.static('./uploads'));
app.listen(3000, () => {
  console.log("server work ");
});
module.exports = app;
