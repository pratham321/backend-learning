// const express=required("express");
const express = require("express");
const router=express.Router();

const {
  registerUser,
  loginUser,
  getProfile
} = require("../controllers/user.controller");

const authMiddleware=require("../middlewares/auth.middleware")
const roleMiddleware = require("../middlewares/role.middleware");
const validate = require("../middlewares/validate.middleware");
// const {adminDashboard}=require("../controllers/admin.controller")
 const{
  adminDashbord
 }=require('../controllers/admin.controller');
const {
  registerValidation,
  loginValidation
} = require("../validators/user.validator");

router.post("/register", registerValidation,validate,registerUser);
router.post("/login",loginValidation ,validate,loginUser);
router.get("/getprofile",authMiddleware,getProfile);
router.get("/admin",authMiddleware,roleMiddleware("admin"),adminDashbord);



// router.post('/login',)

module.exports = router;