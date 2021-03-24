var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");

const { getUserById } = require("../controllers/user");
const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  updateProduct,
  removeProduct,
  getAllProducts,
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId",getUserById); 
router.param("productId", getProductById);

// actual routes
//create
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//read
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);
router.get("/products", getAllProducts);

// update
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

//delete
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct
);

//listing
router.get("/products", getAllProducts);
module.exports = router;
