const bcrypt = require("bcrypt");
const { errorResponse, successResponse, handleError } = require("../utils/response");
const dotenv = require("dotenv");
const jwtHelper = require("../utils/jwt");

const db = require("../models/index");
dotenv.config();
const { generateToken } = jwtHelper;
/**
 * @class UserController
 * @description create and log in user
 * @exports UserController
 */
module.exports =  class UserController {
  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async registerUser(req, res) {
    try {
      const { email, firstname, lastname, password } = req.body;
      const Email = email.toLowerCase();
      const emailExist = await db.query("SELECT * FROM users WHERE email=$1", [
        email,
      ]);
      const { rows } = emailExist
      if (rows[0]) return errorResponse(res, 409, "Email already used by another user.");
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.query("INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING userId, email, firstname, lastname",
      [firstname, lastname, Email, hashedPassword]);
      return successResponse(res, 201,  "User created Successfuly, Kindly log in!");
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error.");
    }
  }
  

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const Email = email.toLowerCase();
      const user = await db.query("SELECT * FROM users WHERE email=$1", [
        Email,
      ]);
      const {rows} = user
      if (!rows[0]) return errorResponse(res, 404, "Email does not exist.");
      const validpass = await bcrypt.compare(password, rows[0].password);
      if (!validpass) return errorResponse(res, 400, "Password is not correct!.");
      let { firstname, lastname, id } = rows[0];
      const token = await generateToken({
        id: rows[0].userid, firstname, lastname,  email: Email
      });
      return successResponse(res, 200,"User Logged in Successfully.", {token, userDetails: {id: rows[0].userid, email, firstname, lastname }});
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error.");
    }
  }
}