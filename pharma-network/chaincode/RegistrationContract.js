"use strict";

const {
  Contract
} = require("fabric-contract-api");

class RegistrationContract extends Contract {
  constructor() {
    //name of the Smart Contract => registration
    super("org.pharma-network.registration");
  }
  //All the custom functions are listed below

  // This is a basic user defined function used at the time of instantiating the smart contract
  // to print the success message on console
  async instantiate(ctx) {
    console.log("Pharmanet Chaincode is Instantiated");
  }

  /**
   * Register an Organization on the network
   * @param ctx - The transaction context object
   * @param companyCRN - unique ID for company 
   * @param companyName - Name of the company 
   * @param location - company location
   * @param organisationRole - can only be anyone Manufacturer,Distributor, Retailer and Transporter 
   * @returns - new organization object 
   */

  async registerCompany(
    ctx,
    companyCRN,
    companyName,
    location,
    organisationRole
  ) {
    try {
      //create composite key companyidy
      const companyIdKey = ctx.stub.createCompositeKey(
        "org.pharma-network.companyId",
        [companyCRN, companyName]
      );

      //get the state from ledger to check if the company already exist
      let fetchCompanyDetail = await ctx.stub
        .getState(companyIdKey)
        .catch((err) => console.log(err));

      //to check if a company is already registered with the given CRN
      try {

        let fetchCompanyData = JSON.parse(fetchCompanyDetail.toString());
        return {
          error: "Company already exist"
        };
      } catch (err) {
        let hierarchyKey;
        let newCompanyObject;
        if (
          organisationRole == "Manufacturer" ||
          organisationRole == "Distributor" ||
          organisationRole == "Retailer"
        ) {
          if (organisationRole == "Manufacturer") {
            hierarchyKey = 1;
          } else if (organisationRole == "Distributor") {
            hierarchyKey = 2;
          } else {
            hierarchyKey = 3;
          }

          newCompanyObject = {
            companyID: companyIdKey,
            name: companyName,
            location: location,
            organisationRole: organisationRole,
            hierarchyKey: hierarchyKey,
          };

          //Hierarchy Key is only added for Manufacturer,Retailer and Distributor and not for Transporter 
        } else if (organisationRole == "Transporter") {
          newCompanyObject = {
            companyID: companyIdKey,
            name: companyName,
            location: location,
            organisationRole: organisationRole,
          };
        } else {
          return {
            error: "Please enter valid organization role"
          };
        }

        let dataBuffer = Buffer.from(JSON.stringify(newCompanyObject));
        console.log(newCompanyObject);
        await ctx.stub.putState(companyIdKey, dataBuffer);

        return newCompanyObject;
      }
    } catch (err) {
      return {
        error: "Unable to execute the function to register the Org, please make sure input parameters are correct.",
        errorTrace: err.toString()
      };
    }
  }
}
module.exports = RegistrationContract;