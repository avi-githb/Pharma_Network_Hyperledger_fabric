"use strict";

const {
    Contract
} = require("fabric-contract-api");

class TransferDrug extends Contract {
    constructor() {
        //name of the Smart Contract => registration
        super("org.pharma-network.transferDrug");
    }
    //All the custom functions are listed below

    // This is a basic user defined function used at the time of instantiating the smart contract
    // to print the success message on console

    async instantiate(ctx) {
        console.log("Pharmanet Chaincode is Instantiated");
    }

    /**
     * Create purchase order on the network
     * @param ctx - The transaction context object
     * @param buyerCRN -  CRN of buyer ORG
     * @param sellerCRN - CRN for seller org
     * @param drugName - name of Drug
     * @param quantity - total number
     * @returns - new purchase order object
     */

    async createPO(ctx, buyerCRN, sellerCRN, drugName, quantity) {
        try {
            const poIDKey = ctx.stub.createCompositeKey("org.pharma-network.poIDKey", [
                buyerCRN,
                drugName,
            ]);

            //creating partial composite key for buyer and seller org to fetch details of both orgs
            const buyerCompKey = await ctx.stub.getStateByPartialCompositeKey(
                "org.pharma-network.companyId",
                [buyerCRN]
            );
            let buyerKey = await buyerCompKey.next();

            const sellerCompKey = await ctx.stub.getStateByPartialCompositeKey(
                "org.pharma-network.companyId",
                [sellerCRN]
            );
            let sellerKey = await sellerCompKey.next();

            let buyerOrgBuffer = await ctx.stub
                .getState(buyerKey.value.key)
                .catch((err) => {
                    console.log(err);
                });

            let buyerOrgDetails = JSON.parse(buyerOrgBuffer.toString());

            let sellerOrgBuffer = await ctx.stub
                .getState(sellerKey.value.key)
                .catch((err) => {
                    console.log(err);
                });

            let sellerOrgDetails = JSON.parse(sellerOrgBuffer.toString());

            //making sure hierarchy is followed when buying drug on the network.
            //Distributor can buy from Manufacturer  || Retailer can buy from Distributor || but retailer can't directly buy from Manufacturer
            if (
                (buyerOrgDetails.organisationRole === "Retailer" &&
                    sellerOrgDetails.organisationRole === "Distributor") ||
                (buyerOrgDetails.organisationRole === "Distributor" &&
                    sellerOrgDetails.organisationRole === "Manufacturer")
            ) {
                let newPOObj = {
                    poID: poIDKey,
                    drugName: drugName,
                    quantity: quantity,
                    //update buyer and seller details
                    buyer: buyerKey.value.key,
                    seller: sellerKey.value.key,
                };
                let poDataBuffer = Buffer.from(JSON.stringify(newPOObj));
                await ctx.stub.putState(poIDKey, poDataBuffer);
                return newPOObj;
            } else {
                return {
                    error: "Please make sure that the transfer of drug takes place in a hierarchical manner and no organisation in the middle is skipped. ",
                };
            }
        } catch (err) {
            return {
                error: "Unable to create PO on the network, check input parameters",
                errorTrace: err.toString()
            };
        }

    }

    /**
     * Create a shipment on the network
     * @param ctx - The transaction context object
     * @param buyerCRN
     * @param drugName - Name of the drug
     * @param listOfAssets - array holding serial number of drugs [001,002,003]
     * @param transporterCRN
     * @returns - shipment object
     */

    async createShipment(ctx, buyerCRN, drugName, listOfAssets, transporterCRN) {
        //creating comp key for shipment to store shipment onj on ledger
        try {
            const shipmentKey = await ctx.stub.createCompositeKey(
                "org.pharma-network.shipmentKey",
                [buyerCRN, drugName]
            );

            //partial key of drug to update drug owner
            let poIDCompKey = await ctx.stub.getStateByPartialCompositeKey(
                "org.pharma-network.poIDKey",
                [buyerCRN]
            );

            let poIDKey = await poIDCompKey.next();

            let poIDBuffer = await ctx.stub.getState(poIDKey.value.key).catch((err) => {
                console.log(err);
            });

            let poIDDetails = JSON.parse(poIDBuffer.toString());

            const transporterCompKey = await ctx.stub.getStateByPartialCompositeKey(
                "org.pharma-network.companyId",
                [transporterCRN]
            );
            let transporterKey = await transporterCompKey.next();

            //length of listofAsset == quantity specified in PO
            let listOfAssetArray = listOfAssets.split(",");
            let assets = [];
            //make sure quantity == length of list of assets
            if (listOfAssetArray.length == poIDDetails.quantity) {
                try {
                    for (let i = 0; i < listOfAssetArray.length; i++) {
                        let drugCompKey = await ctx.stub.getStateByPartialCompositeKey(
                            "org.pharma-network.productIDKey",
                            [listOfAssetArray[i]]
                        );
                        let drugKey = await drugCompKey.next();

                        assets.push(drugKey.value.key);
                        let drugKeyDetail = await ctx.stub
                            .getState(drugKey.value.key)
                            .catch((err) => {
                                console.log(err);
                            });
                        //veryfiying if the serial number passed in list of assests are valid and if they point to a drug which is registered on the network
                        let drugKeyBuffer = JSON.parse(drugKeyDetail.toString());
                        drugKeyBuffer.owner = transporterKey.value.key;
                    }
                } catch (err) {
                    console.log(err + " Error in the Drug validation process.");
                }
            } else {
                return {
                    error: "Either the drug Quantity doesn't match with PO, or drug ID is not valid",
                };
            }

            let newShipmentObj = {
                shipmentID: shipmentKey,
                creator: poIDDetails.seller,
                assets: assets,
                transporter: transporterKey.value.key,
                status: "in-transit",
            };
            let shipmentDataBuffer = Buffer.from(JSON.stringify(newShipmentObj));
            await ctx.stub.putState(shipmentKey, shipmentDataBuffer);
            return newShipmentObj;
        } catch (err) {
            return {
                error: "Unable to create Shipment on the network, check input parameters",
                errorTrace: err.toString()
            };
        }
    }

    /**
     *updateShipment on the network
     * @param ctx - The transaction context object
     * @param buyerCRN
     * @param drugName
     * @param transporterCRN
     * @returns - shipment object
     */

    async updateShipment(ctx, buyerCRN, drugName, transporterCRN) {
        //Only Transporter can invoke this function
        try {
            if (ctx.clientIdentity.getMSPID() != "transporterMSP") {
                return {
                    error: "Only Transporter can invoke this function"
                };
            }
            const shipmentKey = await ctx.stub.createCompositeKey(
                "org.pharma-network.shipmentKey",
                [buyerCRN, drugName]
            );

            let shipmentBuffer = await ctx.stub.getState(shipmentKey).catch((err) => {
                console.log(err);
            });

            let shipmentDetail = JSON.parse(shipmentBuffer.toString());

            shipmentDetail.status = "delivered";

            const buyerCompKey = await ctx.stub.getStateByPartialCompositeKey(
                "org.pharma-network.companyId",
                [buyerCRN]
            );
            let buyerKey = await buyerCompKey.next();
            let resultArray = [];
            try {
                for (let i = 0; i < shipmentDetail.assets.length; i++) {
                    let drugKey = shipmentDetail.assets[i];

                    let drugBuffer = await ctx.stub.getState(drugKey).catch((err) => {
                        console.log(err);
                    });
                    let drugDetail = JSON.parse(drugBuffer.toString());
                    //fetching each drug from assets and updating its shipment and owner keys...
                    drugDetail.shipment = shipmentKey;
                    drugDetail.owner = buyerKey.value.key;
                    let drugDetailBuffer = Buffer.from(JSON.stringify(drugDetail));
                    resultArray.push(drugDetail);
                    await ctx.stub.putState(drugKey, drugDetailBuffer);
                }
            } catch (err) {
                console.log(err + " Error while updating drug owner");
            }
            let shipmentDataBuffer = Buffer.from(JSON.stringify(shipmentDetail));
            await ctx.stub.putState(shipmentKey, shipmentDataBuffer);
            return resultArray;
        } catch (err) {
            return {
                error: "Unable to update Shipment on the network, check input parameters",
                errorTrace: err.toString()
            };
        }
    }

    /**
     * Retail drug on the network
     * @param ctx - The transaction context object
     * @param drugName
     * @param serialNo - serial num of drug
     * @param retailerCRN -
     * @param customerAadhar - Aadhar of customer
     * @returns - updated Drug object
     */

    async retailDrug(ctx, drugName, serialNo, retailerCRN, customerAadhar) {
        try {
            //getting retailer composite key
            const retailerCompKey = await ctx.stub.getStateByPartialCompositeKey(
                "org.pharma-network.companyId",
                [retailerCRN]
            );
            let companyKey = await retailerCompKey.next();


            //getting Drug composite key
            const drugKey = await ctx.stub.createCompositeKey(
                "org.pharma-network.productIDKey",
                [serialNo, drugName]
            );
            let drugBuffer = await ctx.stub.getState(drugKey).catch((err) => {
                console.log(err);
            });
            let drugDetail = JSON.parse(drugBuffer.toString());
            console.log("TEWSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
            console.log(drugDetail.owner + "company key " + companyKey.value.key);

            //making sure retailer who invoke the functions owns the Drug:
            if (drugDetail.owner != companyKey.value.key) {
                return {
                    error: "This retailer doesn't own the Drug you are trying to buy, Please enter valid RetailerCRN",
                };
            }

            //updating drug owner = customer Aadhar
            drugDetail.owner = customerAadhar;
            let drugBufferUpdate = Buffer.from(JSON.stringify(drugDetail));
            await ctx.stub.putState(drugKey, drugBufferUpdate);
            return drugDetail;
        } catch (err) {
            return {
                error: "Unable to retail Drug on the network, check input parameters",
                errorTrace: err.toString()
            };
        }
    }
}
module.exports = TransferDrug;