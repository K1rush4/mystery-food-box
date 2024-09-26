const ApiError = require("../error/ApiError");
const {Category} = require("../models/models");

class categoryController {
  async create(req, res, next) {
    try {
      const {name} = req.body
      const typeCreate = await Category.create({name})
      return res.json(typeCreate)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }


  async getAll(req, res, next) {
    try {
      const categoryAll = await Category.findAll()
      return res.json(categoryAll)
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
      const deleteOne = await Category.destroy({where: {id}})
      return res.json("delete success")
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new categoryController()