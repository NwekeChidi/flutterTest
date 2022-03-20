const router        = require('express').Router();
const feeController = require('../controllers/fees');

router.post(
    '/fees',
    feeController.configureFees
)

module.exports = router;