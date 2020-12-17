const express = require('express')

const upload = require('./../libs/storage')
const UserCtrl = require('../controllers/user-ctrl')

const router = express.Router()

router.post('/user', upload.single('path'), UserCtrl.createUser)
router.put('/user/:id', upload.single('path'), UserCtrl.updateUser)
router.delete('/user/:id', UserCtrl.deleteUser)
router.get('/user/:id', UserCtrl.getUserById)
router.get('/login/:username/:password', UserCtrl.getUserByIdentification)
router.get('/users', UserCtrl.getUsers)

module.exports = router