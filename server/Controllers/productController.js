const ApiError = require("../error/ApiError");
const {product} = require("../models/models");
const uuid = require("uuid");
const path = require("path");
const fs = require('fs');

class productController {
  async create(req, res, next) {
    try {
      const {name, price, categoryId} = req.body
      const {img} = req.files
      const fileName = uuid.v4() + ".jpeg";
      if (!name) {
        return next(ApiError.badRequest('Не задано имя товара'))
      }
      if (!categoryId) {
        return next(ApiError.badRequest('Не задана категория товаров'))
      }
      const productCreate =
        await product.create({name, price, img: fileName, categoryId})
      img.mv(path.resolve(__dirname, '..', "static", fileName));
      return res.json(productCreate)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
      let productAll
      const { categoryId } = req.query;
      if (categoryId) {
        productAll =
          await product.findAll({ where: { categoryId } })
      } else {
        productAll =
          await product.findAll()
      }
      return res.json(productAll)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getOne(req, res, next) {
    try {
      const productId = req.params.id
      const productOne =
        await product.findOne({where: {id: productId}});
      return res.json(productOne)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async delete(req, res, next) {
    try {
      const {id} = req.body
      if (!id) {
        return next(ApiError.badRequest('Не задан id типа'))
      }
      const productToDelete = await product.findOne({ where: { id } });
      if (!productToDelete) {
        return next(ApiError.badRequest('Продукт не найден'));
      }
      const imageName = productToDelete.img;
      const imagePath = path.resolve(__dirname, '..', 'static', imageName);
      await product.destroy({ where: { id } });
      fs.unlink(imagePath, (err) => {
        if (err) {
          return next(ApiError.badRequest('Ошибка при удалении изображения'));
        }
      });
      return res.json("delete success")
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new productController()