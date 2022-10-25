
const express = require('express');
const { login, signup, deletUserById, getAllUsers, getUserById, editUserById } = require("../controllers/user.controller")
const {checkToken}  = require("../middleware/checkToken");

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);
router.get("/getall", getAllUsers);
router.get("/getuser/:user_id", getUserById);
router.delete("/delete/:user_id", deletUserById);
router.patch("/edituser/:user_id", editUserById);

module.exports = router;
