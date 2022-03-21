//const client  = require('../db/redis');
const dbUtils      = require('../db/utils');
const AppError     = require('../errors/appError');
const catchAsync   = require('../utils/catchAsync');
const configParser = require('../utils/processFeesConfig');
const redisClient = require('../db/redis');



// Set fees configurations
exports.configureFees = catchAsync( async (req, res, next) => {
    // Get the payload
    const { FeeConfigurationSpec } = req.body;
    if (!FeeConfigurationSpec) return next( new AppError("Invalid Request!", 400) );

    // Process configurations
    let feeConfigs = configParser.parseConfig(FeeConfigurationSpec);
    if (!feeConfigs) return next( new AppError("Could Not Parse Fee Configurations", 400) );

    // await dbUtils.configureFees(feeConfigs);
    await redisClient.del('Current_Config')
    // set data to redis
    await redisClient.lPush("Current_Config",feeConfigs);

    let test = await redisClient.lRange("Current_Config", 0, 100);
    console.log(test);

    res.status(200).send({
        status: "ok"
    })

})


exports.computeTransactionFee = catchAsync( async (req, res, next) => {
    // Get payload

    // Get the current fee configurations

    // let test = await redisClient.lRange("Current_Config", 0, 100);

    res.status(200).send({
        status: "ok"
    })

})