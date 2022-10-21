const User = require("../models/user");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const e = require("express");

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
      
      const check_password = await bcrypt.compare(password, user.password);
      
      if (check_password) {
        const token = jsonwebtoken.sign(
          {
            user_id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone_number: user.phone_number,
          },
          "LOST_AND_FOUND_SECRET"
        );
        res.json({ success: true, data: token });
        console.log("here");
      }
      else {
        throw new Error("Wrong Password Try Again");
        
      }

    } else {
      throw new Error("Couldn't find your Lost_and_Found account");
    }
  } catch (e) {
    next(e);
  }
};
module.exports.signup = async (req, res, next) => {
  const { phone_number, email, password, first_name, last_name } = req.body;
  try {
    const exUser = await User.findOne({ email });
    if (!exUser) {
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);
      console.log(salt);
      const user = await User.create({
        email,
        password: password_hash,
        first_name,
        last_name,
        phone_number,
      });
      const token = jsonwebtoken.sign(
        {
          user_id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone_number: user.phone_number,
        },
        "LOST_AND_FOUND_SECRET"
      );

      res.status(200).json({ data: token });
    } else {
      res.status(409).json({ message: "User Already Exit" });
    }
  } catch (e) {
    next(e);
  }

};
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const result = await User.find({})
    res.json({success:true,users:result})
    
  }
  catch (e) {
    res.json({err:e.message})
    
    
  }

}
module.exports.getUserById = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const result=await User.findById(user_id)
    res.json({success:true,user:result})
    
  }
  catch(e) {
    res.json({success:false,error:e.message})
    
  }

}
module.exports.deletUserById = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const result = await User.findByIdAndDelete(user_id)
    res.json({success:true,result:"Item Delated Succesfully"})
    
  }
  catch(e) {
    res.json({success:false,error:e.message})
    
  }

}
module.exports.editUserById = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const new_user = req.body;
    const result = await User.findByIdAndUpdate({_id:user_id }, new_user)
    res.json({success:true,result:"User information Updated Succesfully"})
    
  }
  catch (e) {
    res.json({success:false,error:e.message})
    
  }

}



