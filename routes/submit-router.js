const express = require('express')

const SubmitCtrl = require('../controllers/submit-ctrl')

const router = express.Router()

router.post('/submit', SubmitCtrl.createSubmit)
router.put('/submit/:id', SubmitCtrl.updateSubmit)
router.delete('/submit/:id', SubmitCtrl.deleteSubmit)
router.get('/submit/:id', SubmitCtrl.getSubmitById)
router.get('/submits/:page?/:limit?', SubmitCtrl.getSubmits)

module.exports = router