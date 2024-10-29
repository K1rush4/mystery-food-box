const ApiError = require("../error/ApiError");
const {Product_info, Product} = require("../models/models");

class productInfoController {
  async create(req, res, next) {
    try {
      const {productId, consist, description} = req.body
      const productIdExist = await Product_info.findOne({ where: { productId } });
      if (productIdExist) {
        return next(ApiError.badRequest('Информация для этого товара уже существует'))
      }
      const productInfoCreate =
        await Product_info.create({productId, consist, description})
      return res.json(productInfoCreate)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async fetch(req, res, next) {
    try {
      const {productId} = req.query
      const productInfo = await Product_info.findOne({ where: { productId } });
      // if (!productInfo) {
      //   return next(ApiError.badRequest('Информации по этому товару нет'))
      // }
      return res.json(productInfo)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async delete(req, res, next) {
    try {
      const {productId} = req.body
      if (!productId) {
        return next(ApiError.badRequest('Не задан productId'))
      }
      const productToDelete = await Product_info.findOne({ where: { productId } });
      if (!productToDelete) {
        return next(ApiError.badRequest('Информация о продукте не найдена'));
      }
      await Product_info.destroy({ where: { productId } });
      return res.json("delete success")
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new productInfoController()