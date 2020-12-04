const express = require('express')

const RolCtrl = require('../controllers/rol-ctrl')

const router = express.Router()

router.post('/rol', RolCtrl.createRol)
router.put('/rol/:id', RolCtrl.updateRol)
router.delete('/rol/:id', RolCtrl.deleteRol)
router.get('/rol/:id', RolCtrl.getRolById)
router.get('/rols', RolCtrl.getRols)

module.exports = router