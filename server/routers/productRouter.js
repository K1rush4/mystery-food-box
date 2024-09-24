const Router = require('express')
const productController = require("../Controllers/productController");
const router = new Router()

router.post('/add', productController.create)
router.get('/:id', productController.getOne)
router.get('/', productController.getAll)
router.post('/delete', productController.delete)

module.exports = router