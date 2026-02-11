const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const upload = require("../middlewares/upload.middleware");


const {
  creatProduct,
  getProducts
} = require("../controllers/product.controller");

// router.post("/creatProducts", createProduct);

router.post(
  "/creatProduct",
  auth,
  role("admin"),
  upload.array("image",5), // max 5 images
 creatProduct
);

router.get("/getproducts", getProducts);

module.exports = router;