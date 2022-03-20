exports.parseConfig = ( FeeConfigurationSpec ) => {

    let configs = FeeConfigurationSpec.split('\n');
    
    let feeConfigs = [];

    for (let i=0; i<configs.length; i++){
        let feeC = configs[i].split(" "), feeConfig = "";
        feeConfig = feeC[0] + " : " + feeC[1] + " " + feeC[2] + " " + feeC[3].split("(")[0] + " " +
        feeC[3].split("(")[1].slice(0, -1) + " " + feeC[6] + ", " + feeC[7];
        feeConfigs.push(feeConfig)
    }
    return feeConfigs;
}