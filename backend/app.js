const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRouter = require("./routes/user.router")
const itemRouter = require('./routes/item.router');
const { dbConnect } = require('./db/connection');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(morgan("dev"))
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const multer = require('multer')

app.use(express.static(path.join(__dirname + "/uploads")))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  },
});

const uploader = multer({ storage: storage }).single('imageUrl');

app.post("/api/items/img",async (req, res) => {
   await  uploader(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        console.log("This is the file", req.files)
        res.json({
            path:req.files
        })
        
    })
})



app.use(itemRouter);
app.use(userRouter);


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