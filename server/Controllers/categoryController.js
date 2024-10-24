const ApiError = require("../error/ApiError");
const {Category, Product} = require("../models/models");
const path = require("path");
const fs = require('fs');

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
      const { id } = req.body;
      if (!id) {
        return next(ApiError.badRequest('Не задан id категории'));
      }

      // Найдем все продукты, связанные с категорией
      const products = await Product.findAll({ where: { categoryId: id } });

      // Удалим изображения каждого продукта
      for (const product of products) {
        const imageName = product.img;
        const imagePath = path.resolve(__dirname, '..', 'static', imageName);

        // Проверяем, существует ли файл изображения, и удаляем его
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error(`Ошибка при удалении изображения продукта ${product.name}:`, err);
          } else {
            console.log(`Изображение продукта ${product.name} успешно удалено.`);
          }
        });
      }

      // Теперь можно удалить саму категорию (без удаления товаров)
      await Category.destroy({ where: { id } });

      return res.json({ message: 'Категория удалена, изображения товаров удалены.' });
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new categoryController()