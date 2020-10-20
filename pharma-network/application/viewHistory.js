'use strict';

/*
Node JS app to view History of drug asset on the network
*/

const helper = require('./contractHelperViewLifeCycle.js');

async function main(drugName, serialNo, organisationRole) {
    try {
        const Contract = await helper.getContractInstance(organisationRole);
        //console.log(Contract);
        console.log('View Drug History Initialized');
        const userBuffer = await Contract.submitTransaction('viewHistory', drugName, serialNo);

        console.log('Processing View Drug History');
        let newOrg = JSON.parse(userBuffer.toString());
        console.log(newOrg);
        console.log('View Drug Historyis now processed');
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
//     console.log("View Drug History.");
// });

module.exports.execute = main;