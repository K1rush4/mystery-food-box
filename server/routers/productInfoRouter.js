const Router = require('express')
const productInfoController = require("../Controllers/productInfoController");
const router = new Router()
const checkRole = require("../middleware/ckeckRoleMiddleware")

router.post('/add', checkRole('ADMIN'), productInfoController.create)
router.post('/delete', checkRole('ADMIN'), productInfoController.delete)

module.exports = router