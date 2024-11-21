const ApiError = require("../error/ApiError");
const {Basket_product, Basket} = require("../models/models");

class basketController {
  async setToCart(req, res, next) {
    try {
      const {basketId, productId, counter} = req.body
      let productInCart =
        await Basket_product.findOne({ where: { basketId, productId } })
      if (productInCart) {
        productInCart.productCounter += parseInt(counter)
        await productInCart.save()
      } else {
        await Basket_product.create({ basketId, productId, counter });
      }
      return res.json("succeed")
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async add(req, res, next) {
    try {
      const {userId} = req.body
      const newCart =
        await Basket.create({ userId });
      return res.json(newCart)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
      const { basketId } = req.body;
      const productAll = await Basket_product.findAll({ where: { basketId } })
      return res.json(productAll)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
  //
  // async getOne(req, res, next) {
  //   try {
  //     const productId = req.params.id
  //     const productOne =
  //       await product.findOne({where: {id: productId}});
  //     return res.json(productOne)
  //   } catch (e) {
  //     next(ApiError.badRequest(e.message))
  //   }
  // }
  //
  // async delete(req, res, next) {
  //   try {
  //     const {id} = req.body
  //     if (!id) {
  //       return next(ApiError.badRequest('Не задан id типа'))
  //     }
  //     const productToDelete = await product.findOne({ where: { id } });
  //     if (!productToDelete) {
  //       return next(ApiError.badRequest('Продукт не найден'));
  //     }
  //     const imageName = productToDelete.img;
  //     const imagePath = path.resolve(__dirname, '..', 'static', imageName);
  //     await product.destroy({ where: { id } });
  //     fs.unlink(imagePath, (err) => {
  //       if (err) {
  //         return next(ApiError.badRequest('Ошибка при удалении изображения'));
  //       }
  //     });
  //     return res.json("delete success")
  //   } catch (e) {
  //     next(ApiError.badRequest(e.message))
  //   }
  // }
}

module.exports = new basketController()