"use strict";

const {
    Contract
} = require("fabric-contract-api");

class DrugRegistrationContract extends Contract {
    //constructor to provide a name to the Smartcontract 
    constructor() {
        //name of the Smart Contract => registration
        super("org.pharma-network.drugRegistration");
    }

    /* ****** All custom functions are defined below ***** */

    // This is a basic user defined function used at the time of instantiating the smart contract
    // to print the success message on console

    async instantiate(ctx) {
        console.log("Pharmanet Chaincode is Instantiated");
    }

    /**
     * Add and store Drug on the network
     * @param ctx - The transaction context object
     * @param drugName - asset to be added 
     * @param serialNo 
     * @param mfgDate 
     * @param expDate 
     * @param companyCRN - unique company CRN
     * @returns - drug object 
     */

    async addDrug(ctx, drugName, serialNo, mfgDate, expDate, companyCRN) {
        //only Manufacturer org can add drug
        try {
            if (ctx.clientIdentity.getMSPID() != "manufacturerMSP") {
                return {
                    error: "Manufacturer Org can only add drugs on the pharma-network"
                };
            }
            //composite key for storing drug
            const productIDKey = ctx.stub.createCompositeKey(
                "org.pharma-network.productIDKey",
                [serialNo, drugName]
            );
            //fetching manufacturer org details from the ledger using partial composite key 
            let manufacturerCompKey = await ctx.stub.getStateByPartialCompositeKey(
                "org.pharma-network.companyId",
                [companyCRN]
            );
            //manuKey hold the return object from the itterator manuKey.value.key hold the composite key of the Manufacturer org
            let manuKey = await manufacturerCompKey.next();

            let newDrugObj = {
                productID: productIDKey,
                name: drugName,
                manufacturer: manuKey.value.key,
                manufacturingDate: mfgDate,

                expiryDate: expDate,
                owner: manuKey.value.key,
                shipment: "",
            };

            let dataBuffer = Buffer.from(JSON.stringify(newDrugObj));
            //storing the new drug object on the ledger 
            await ctx.stub.putState(productIDKey, dataBuffer);
            return newDrugObj;

        } catch (err) {
            return {
                error: "Unable to register Drug on the network, check input parameters",
                errorTrace: err.toString()
            };
        }

    }
}
module.exports = DrugRegistrationContract;