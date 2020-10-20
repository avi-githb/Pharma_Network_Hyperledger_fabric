'use strict';

/*
Node JS app to add drug on the network
*/

const helper = require('./contractHelperDrugRegistration.js');

async function main(drugName, serialNo, mfgDate, expDate, companyCRN, organisationRole) {
    try {
        const Contract = await helper.getContractInstance(organisationRole);
        //console.log(Contract);
        console.log('Creating new Drug Add request');
        const userBuffer = await Contract.submitTransaction('addDrug', drugName, serialNo, mfgDate, expDate, companyCRN);

        console.log('Processing request to add a new DRUG');
        let newOrg = JSON.parse(userBuffer.toString());
        console.log(newOrg);
        console.log('New Drug is now added');
        return newOrg;
    } catch (error) {
        console.log(`\n\n ${error} \n\n`);
        throw new Error(error);
    } finally {
        console.log('Disconnect from fabric');
        helper.disconnect();
    }
}

// main('disp', '012', 'Jan', 'Dec', '30', 'Manufacturer').then(() => {
//     console.log("Drug is now added to the pharma Network");
// });

module.exports.execute = main;