const express = require('express')

const upload = require('./../libs/storage')
const UserCtrl = require('../controllers/user-ctrl')

const router = express.Router()

router.post('/user', upload.single('imageUrl'), UserCtrl.createUser)
router.put('/user/:id', upload.single('imageUrl'), UserCtrl.updateUser)
router.delete('/user/:id', UserCtrl.deleteUser)
router.get('/user/:id', UserCtrl.getUserById)
router.put('/login', upload.none(), UserCtrl.loginUser)
router.get('/users', UserCtrl.getUsers)

module.exports = router