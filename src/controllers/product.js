const { errorResponse, successResponse, handleError } = require("../utils/response");

const db = require("../models/index");

/**
 * @class AdmintransactionController
 * @description create transaction, get all transactions, get a transaction, delete a transaction
 * @exports AdminController
 */
module.exports =  class productController {
  /**
     * @param {object} req - The user request object
     * @param {object} res - The user response object
     * @returns {object} Success message
     */
  static async createProduct(req, res) {
    try {
      const { id } = req.user;
      const { name, category } = req.body;
      await db.query("INSERT INTO products (ownerid, name, category) VALUES ($1, $2, $3)",
      [id, name, category]);
      return successResponse(res, 201, "Product has been created successfully.");
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
  static async getProducts(req, res) {
    try {
      const { page, limit } = req.query;
      const startIndex = (page - 1) * limit; 
      const endIndex = page * limit; 
      const products = await db.query( `SELECT  id, ownerid, name, category FROM products ORDER BY created_at DESC`);
      const result = products.rows.slice(startIndex, endIndex);
      return successResponse(res, 200, "Successfully retrived all Fashion products.", result);
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
  static async getProductById(req, res) {
    try {
      const { productId } = req.params;
      const product = await db.query("SELECT * FROM products WHERE id = $1", [
        productId,
      ]);
      if (product.rows.length === 0) return errorResponse(res, 404, "Product not found");
      return successResponse(res, 200, "Successfully retrived Product.", product.rows);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Resource not found.");
    }
  }

  /**
     * @param {object} req - The user request object
     * @param {object} res - The user response object
     * @returns {object} Success message
     */
  static async deleteProduct(req, res) {
    try {
      const { productId } = req.params;
      const product = await db.query(`DELETE FROM products WHERE id = $1`,
      [productId]);
      if (!product) return errorResponse(res, 404, "Product not found.");
      return successResponse(res, 200, "Successfully Deleted Product.");
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Resource not found.");
    }
  }

  /**
     * @param {object} req - The user request object
     * @param {object} res - The user response object
     * @returns {object} Success message
     */
   static async updateProduct(req, res) {
    try {
      const { productId } = req.params;
      const { name, category } = req.body;
      const product = await db.query(`UPDATE products SET name = $1, category = $2
      WHERE id = $3 RETURNING id ownerId, name, category`,
  [name, category, productId]);
      if (!product) return errorResponse(res, 404, "Product does not exist.");
      return successResponse(res, 200, "Successfully updated product.");
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Resource not found.");
    }
  }
}