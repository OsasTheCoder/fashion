const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/response");

require("dotenv").config();

/**
 * @class Authentication
 * @description authenticate token and roles
 * @exports Authentication
 */
module.exports =  class Authentication {
  /**
   * @param {object} req - The res body object
   * @param {object} res - The res body object
   * @param {object} next -  The function to call next
   * @returns {Function} errorResponse | next
   */
  static async verifyToken(req, res, next) {
    try {
      const { authorization } = req.headers;
      let decoded;
      if (authorization) {
        const token = authorization.split(" ")[1];
        try {
          decoded = jwt.verify(token, process.env.JWT_KEY);
        } catch (error) {
          return errorResponse(res, 410, "Please sign in again.");
        }
        req.user = decoded;
        return next();
      }
      return errorResponse(res, 410, "Please login.");
    } catch (error) {
      return errorResponse(res, 500, "Server Error.");
    }
  }
}