const express = require('express')

const ActionCtrl = require('../controllers/action-ctrl')

const router = express.Router()

router.post('/action', ActionCtrl.createAction)
router.put('/action/:id', ActionCtrl.updateAction)
router.delete('/action/:id', ActionCtrl.deleteAction)
router.get('/action/:id', ActionCtrl.getActionById)
router.get('/actions', ActionCtrl.getActions)

module.exports = router