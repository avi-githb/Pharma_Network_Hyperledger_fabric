'use strict';

/*
Node JS app to update Shipment on the network
*/

const helper = require('./contractHelperTransferDrug.js');

async function main(buyerCRN, drugName, transporterCRN, organisationRole) {
    try {
        const Contract = await helper.getContractInstance(organisationRole);
        //console.log(Contract);
        console.log('Updating Shipmentrequest');
        const userBuffer = await Contract.submitTransaction('updateShipment', buyerCRN, drugName, transporterCRN);

        console.log('Updating Shipment');
        let newOrg = JSON.parse(userBuffer.toString());
        console.log(newOrg);
        console.log('Shipment now Updated');
        return newOrg;
    } catch (error) {
        console.log(`\n\n ${error} \n\n`);
        throw new Error(error);
    } finally {
        console.log('Disconnect from fabric');
        helper.disconnect();
    }
}

// main('34', 'disp', '35', 'Manufacturer').then(() => {
//     console.log("Shipment is now Updated.");
// });

module.exports.execute = main;