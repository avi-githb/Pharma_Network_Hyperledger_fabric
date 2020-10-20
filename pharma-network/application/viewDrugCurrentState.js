'use strict';

/*
Node JS app to view Drug current state on the network
*/

const helper = require('./contractHelperViewLifeCycle.js');

async function main(drugName, serialNo, organisationRole) {
    try {
        const Contract = await helper.getContractInstance(organisationRole);
        //console.log(Contract);
        console.log('View Drug current state Initialized');
        const userBuffer = await Contract.submitTransaction('viewDrugCurrentState', drugName, serialNo);

        console.log('Processing View Drug current state');
        let newOrg = JSON.parse(userBuffer.toString());
        console.log(newOrg);
        console.log('View Drug current state is now processed');
        return newOrg;
    } catch (error) {
        console.log(`\n\n ${error} \n\n`);
        throw new Error(error);
    } finally {
        console.log('Disconnect from fabric');
        helper.disconnect();
    }
}

// main('disp', '010', 'Manufacturer').then(() => {
//     console.log("View Drug current state.");
// });

module.exports.execute = main;