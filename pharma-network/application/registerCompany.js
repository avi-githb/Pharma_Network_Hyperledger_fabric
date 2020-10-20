'use strict';

/*
Node JS app to register company on the network
*/

const helper = require('./contractHelper.js');

async function main(companyCRN, companyName, Location, organisationRole, organisationRole1) {
  try {
    //input organisationRole1 => to point to the right CCP
    const Contract = await helper.getContractInstance(organisationRole1);
    //console.log(Contract);
    console.log('Creating new organisation registeration request');
    const userBuffer = await Contract.submitTransaction('registerCompany', companyCRN, companyName, Location, organisationRole);

    console.log('Processing request to register a new organization');
    let newOrg = JSON.parse(userBuffer.toString());
    console.log(newOrg);
    console.log('New Organization is now registered');
    return newOrg;
  } catch (error) {
    console.log(`\n\n ${error} \n\n`);
    throw new Error(error);
  } finally {
    console.log('Disconnect from fabric');
    helper.disconnect();
  }
}

// main('351', 'd', 'India', 'Transporter').then(() => {
//   console.log("Organization Registration is now completed");
// });

module.exports.execute = main;