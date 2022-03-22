var feeEntity ="", feeLocale = "", selectedFC = "";

exports.parsePayLoad = ( payLoad, FCS ) => {
    let feeCurrency = payLoad.Currency, paymentEntity = payLoad.PaymentEntity;
    let amount = payLoad.Amount, bearsFee = payLoad.Customer.BearsFee;

    if ( feeCurrency !== "NGN" ) return { "Error": `No fee configuration for ${feeCurrency} transactions.`};
    feeEntity = paymentEntity.Type; feeLocale = paymentEntity.Country === "NG" ? "LOCL" : "INTL";
    let entityProperties = [ "(*)", paymentEntity.Issuer, paymentEntity.Brand, paymentEntity.Number, paymentEntity.SixID ];
    let val = feeLocale+" "+feeEntity;
    let FC = checkFC(val, FCS);

    selectedFC = checkBestFC( entityProperties, FC );

    let chargeMenu = selectedFC.split(",")[1].split(" "), chargeType = chargeMenu[0].trim(), value = chargeMenu[1].trim();
    let charge = computeFee( chargeType, value, amount );

    let settlementAmount = amount, chargeAmount = amount;
    if ( bearsFee ) chargeAmount += charge;
    else settlementAmount -= charge;

    return {
        "AppliedFeeId"     : selectedFC.split(":")[0].trim(),
        "AppliedFeeValue"  : charge,
        "ChargeAmount"     : chargeAmount,
        "SettlementAmount" : settlementAmount,
    }
}

const checkFC = ( val, currFCS ) => {
    let f = []
    for (let i = 0; i<currFCS.length; i++){
        if ( currFCS[i].includes(val) || currFCS[i].includes("* *") ||
            currFCS[i].includes(feeLocale+" *") || currFCS.includes("* "+feeEntity) ) f.push( currFCS[i] )
    }
    return f;
}

const checkBestFC = ( entityProps, FC ) => {
    for (let i=0; i<FC.length; i++){
        if ( FC[i].includes(entityProps[0]) || FC[i].includes(entityProps[1]) ||
        FC[i].includes(entityProps[2]) || FC[i].includes(entityProps[3]) ||
        FC[i].includes(entityProps[4]) ) return FC[i]
    }
}

const computeFee = ( chargeType, val, amt ) => {
    let charge = 0;

    if ( chargeType === "FLAT" ) charge = Number(val);
    else if ( chargeType === "PERC" ) {
        charge = ( Number(val) / 100 ) * amt;
    } else if ( chargeType === "FLAT_PERC" ) {
        let charges = val.split(":"), chargeF = Number(charges[0]), chargeP = Number(charges[1]);
        charge = chargeF + ( (chargeP / 100) * amt )
    }
    return Math.round(charge);
}