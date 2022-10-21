const { Router } = require("express");
const productController = require("../controllers/product");
const Authentication = require("../middleware/auth");
const validator = require("../middleware/validator");

const { validateProduct, validateProductUpdate, validateProductId } = require("../validations/product");

const router = Router();
const { verifyToken } = Authentication;
const {
  createProduct, getProducts, getProductById ,deleteProduct, updateProduct
} = productController;

router.post("/", verifyToken, validator(validateProduct), createProduct);

router.get("/", verifyToken, getProducts);
router.get("/:productId", verifyToken, validator(validateProductId), getProductById);


router.delete("/:productId", verifyToken, validator(validateProductId), deleteProduct);
router.patch("/:productId", verifyToken, validator(validateProductUpdate), updateProduct);

module.exports =  router;