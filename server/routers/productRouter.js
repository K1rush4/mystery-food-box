const Router = require('express')
const productController = require("../Controllers/productController");
const router = new Router()
const checkRole = require("../middleware/ckeckRoleMiddleware")

router.post('/add', checkRole('ADMIN'), productController.create)
router.get('/:id', productController.getOne)
router.get('/', productController.getAll)
router.post('/delete', productController.delete)

module.exports = router