const Router = require('express')
const categoryController = require('../controllers/categoryController')
const router = new Router()

router.post('/add', categoryController.create)
router.get('/', categoryController.getAll)
router.post('/del', categoryController.delete)

module.exports = router