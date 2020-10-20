'use strict';

/*
Node JS app to retail drug on the network
*/

const helper = require('./contractHelperTransferDrug.js');

async function main(drugName, serialNo, retailerCRN, customerAadhar, organisationRole) {
    try {
        const Contract = await helper.getContractInstance(organisationRole);
        //console.log(Contract);
        console.log('Retail Drug Initialized');
        const userBuffer = await Contract.submitTransaction('retailDrug', drugName, serialNo, retailerCRN, customerAadhar);

        console.log('Updating Retail Drug');
        let newOrg = JSON.parse(userBuffer.toString());
        console.log(newOrg);
        console.log('Drug Details are now Updated');
        return newOrg;
    } catch (error) {
        console.log(`\n\n ${error} \n\n`);
        throw new Error(error);
    } finally {
        console.log('Disconnect from fabric');
        helper.disconnect();
    }
}

// main('disp', '010', '34', 'Aadhar123', 'Manufacturer').then(() => {
//     console.log("Drug detail is now Updated.");
// });

module.exports.execute = main;