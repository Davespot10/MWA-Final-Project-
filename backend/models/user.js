const mongoose  = require("mongoose");
const  Schema  = mongoose.Schema;
const userSchema = new Schema({
    email: { type: String, required: true,unique:true},
    first_name:String,
    last_name:String,
    password: { type: String, required: true },
    phone_number: String,
    
})
const User = mongoose.model("User", userSchema);
module.exports = User;