const router        = require('express').Router();
const feeController = require('../controllers/fees');

router.post(
    '/fees',
    feeController.configureFees
);

router.post(
    '/computeTransactionFee',
    feeController.computeTransactionFee
)

module.exports = router;