const { Fcs }  = require('../models/fcs');

exports.configureFees = ( FeeConfigs ) => {
    const newFeeConfig = new Fcs({ FeeConfigs });
    newFeeConfig.save();
    return newFeeConfig;
}