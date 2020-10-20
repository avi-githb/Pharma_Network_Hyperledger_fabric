'use strict';

/*
Node JS app to create shipment on the network
*/

const helper = require('./contractHelperTransferDrug.js');

async function main(buyerCRN, drugName, listOfAssets, transporterCRN, organisationRole) {
    try {
        const Contract = await helper.getContractInstance(organisationRole);
        //console.log(Contract);
        console.log('Creating new Shipmentrequest');
        const userBuffer = await Contract.submitTransaction('createShipment', buyerCRN, drugName, listOfAssets, transporterCRN);

        console.log('Processing new Shipment');
        let newOrg = JSON.parse(userBuffer.toString());
        console.log(newOrg);
        console.log('Shipment now Created');
        return newOrg;
    } catch (error) {
        console.log(`\n\n ${error} \n\n`);
        throw new Error(error);
    } finally {
        console.log('Disconnect from fabric');
        helper.disconnect();
    }
}

// main('34', 'disp', "010,011,012", '35', 'Manufacturer').then(() => {
//     console.log("Purchase Order is now created.");
// });

module.exports.execute = main;