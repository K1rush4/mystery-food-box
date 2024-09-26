const Router = require('express')
const basketController = require('../controllers/basketController')
const router = new Router()

router.post('/new', basketController.add)
router.post('/set', basketController.setCart)

module.exports = router