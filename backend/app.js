const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/userModel');
const jsonwebtoken = require('jsonwebtoken');


const app = express();



const { dbConnect } = require('./db/connection');
try {
    dbConnect();
}
catch (err) {
    console.log("database not connected due to : "+err);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("login", async (req, res) => {
    try {
        const { email, password, } = req.body;
        const user = await User.findOne({ email: email })
        if (password == user.password) {
            const token = jsonwebtoken.sign({
                user_id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone_number: user.phone_number,
                password:null
            }, "LOST_AND_FOUND_SECRET")
        
            res.json({ success: true, data: token })
        }
        throw new Error("wrong Password")
    }
    catch (e) {
        next(e)
   
        }
})

    
app.use(('*'), (req, res, next) => {
    next(new Error('Route Not found'))
    
})

app.use((err, req, res, next) => {
    res.status(400).json({
        success: false,
        data: err.message
    })
    

   
})
app.listen(process.env.PORT||3000, () => {
    console.log("running on port 3000");
})




