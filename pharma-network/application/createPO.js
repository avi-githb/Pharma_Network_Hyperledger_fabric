"use strict";

/*
Node JS app to create Purchase order on the network
*/

const helper = require("./contractHelperTransferDrug.js");

async function main(buyerCRN, sellerCRN, drugName, quantity, organisationRole) {
  try {
    const Contract = await helper.getContractInstance(organisationRole);
    //console.log(Contract);
    console.log("Creating new Purchase Order request");
    const userBuffer = await Contract.submitTransaction(
      "createPO",
      buyerCRN,
      sellerCRN,
      drugName,
      quantity
    );

    console.log("Processing new Purchase Order");
    let newOrg = JSON.parse(userBuffer.toString());
    console.log(newOrg);
    console.log("Purchase Order now Created");
    return newOrg;
  } catch (error) {
    console.log(`\n\n ${error} \n\n`);
    throw new Error(error);
  } finally {
    console.log("Disconnect from fabric");
    helper.disconnect();
  }
}

// main("DIST001", "MAN001", "Paracetamol", "3", "Manufacturer").then(() => {
//   console.log("Purchase Order is now created.");
// });

module.exports.execute = main;