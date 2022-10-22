const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRouter = require("./routes/user.router")
const itemRouter = require('./routes/item.router');
const { dbConnect } = require('./db/connection');
const morgan = require('morgan');

const app = express();
app.use(morgan("dev"))


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(itemRouter);
app.use("/users",userRouter);



try {
    dbConnect();
}
catch (err) {
    console.log("database not connected due to : "+err);
}



app.use(('*'), (req, res, next) => {
    next(new Error('Route Not found'))
    
})
app.use((err, req, res, next) => {
    res.json({error:err.message})
})



app.listen(process.env.PORT||3000, () => {
    console.log("running on port 3000");
})