const { Router } = require("express");
const UserController = require ("../controllers/user");
const validator = require ("../middleware/validator");

const { validateSignup, validateLogin } = require ("../validations/user");

const router = Router();
const { registerUser, loginUser } = UserController;

router.post("/signin", validator(validateLogin), loginUser);
router.post("/signup", validator(validateSignup), registerUser);

module.exports =  router;