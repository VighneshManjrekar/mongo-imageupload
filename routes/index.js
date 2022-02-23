const router = require('express').Router()
const homeController = require('../controllers/home')

router.get('/',homeController.getIndex)
router.post('/upload',homeController.uploadFiles)
router.get('/files',homeController.getAllFiles)

module.exports = router