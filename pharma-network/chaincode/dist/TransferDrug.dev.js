"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require("fabric-contract-api"),
    Contract = _require.Contract;

var TransferDrug =
/*#__PURE__*/
function (_Contract) {
  _inherits(TransferDrug, _Contract);

  function TransferDrug() {
    _classCallCheck(this, TransferDrug);

    //name of the Smart Contract => registration
    return _possibleConstructorReturn(this, _getPrototypeOf(TransferDrug).call(this, "org.pharma-network.transferDrug"));
  } //All the custom functions are listed below
  // This is a basic user defined function used at the time of instantiating the smart contract
  // to print the success message on console


  _createClass(TransferDrug, [{
    key: "instantiate",
    value: function instantiate(ctx) {
      return regeneratorRuntime.async(function instantiate$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log("Pharmanet Chaincode is Instantiated");

            case 1:
            case "end":
              return _context.stop();
          }
        }
      });
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

  }, {
    key: "createPO",
    value: function createPO(ctx, buyerCRN, sellerCRN, drugName, quantity) {
      var poIDKey, buyerCompKey, buyerKey, sellerCompKey, sellerKey, buyerOrgBuffer, buyerOrgDetails, sellerOrgBuffer, sellerOrgDetails, newPOObj, poDataBuffer;
      return regeneratorRuntime.async(function createPO$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              poIDKey = ctx.stub.createCompositeKey("org.pharma-network.poIDKey", [buyerCRN, drugName]); //creating partial composite key for buyer and seller org to fetch details of both orgs

              _context2.next = 4;
              return regeneratorRuntime.awrap(ctx.stub.getStateByPartialCompositeKey("org.pharma-network.companyId", [buyerCRN]));

            case 4:
              buyerCompKey = _context2.sent;
              _context2.next = 7;
              return regeneratorRuntime.awrap(buyerCompKey.next());

            case 7:
              buyerKey = _context2.sent;
              _context2.next = 10;
              return regeneratorRuntime.awrap(ctx.stub.getStateByPartialCompositeKey("org.pharma-network.companyId", [sellerCRN]));

            case 10:
              sellerCompKey = _context2.sent;
              _context2.next = 13;
              return regeneratorRuntime.awrap(sellerCompKey.next());

            case 13:
              sellerKey = _context2.sent;
              _context2.next = 16;
              return regeneratorRuntime.awrap(ctx.stub.getState(buyerKey.value.key)["catch"](function (err) {
                console.log(err);
              }));

            case 16:
              buyerOrgBuffer = _context2.sent;
              buyerOrgDetails = JSON.parse(buyerOrgBuffer.toString());
              _context2.next = 20;
              return regeneratorRuntime.awrap(ctx.stub.getState(sellerKey.value.key)["catch"](function (err) {
                console.log(err);
              }));

            case 20:
              sellerOrgBuffer = _context2.sent;
              sellerOrgDetails = JSON.parse(sellerOrgBuffer.toString()); //making sure hierarchy is followed when buying drug on the network.
              //Distributor can buy from Manufacturer  || Retailer can buy from Distributor || but retailer can't directly buy from Manufacturer

              if (!(buyerOrgDetails.organisationRole === "Retailer" && sellerOrgDetails.organisationRole === "Distributor" || buyerOrgDetails.organisationRole === "Distributor" && sellerOrgDetails.organisationRole === "Manufacturer")) {
                _context2.next = 30;
                break;
              }

              newPOObj = {
                poID: poIDKey,
                drugName: drugName,
                quantity: quantity,
                //update buyer and seller details
                buyer: buyerKey.value.key,
                seller: sellerKey.value.key
              };
              poDataBuffer = Buffer.from(JSON.stringify(newPOObj));
              _context2.next = 27;
              return regeneratorRuntime.awrap(ctx.stub.putState(poIDKey, poDataBuffer));

            case 27:
              return _context2.abrupt("return", newPOObj);

            case 30:
              return _context2.abrupt("return", {
                error: "Please make sure that the transfer of drug takes place in a hierarchical manner and no organisation in the middle is skipped. "
              });

            case 31:
              _context2.next = 36;
              break;

            case 33:
              _context2.prev = 33;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", {
                error: "Unable to create PO on the network, check input parameters",
                errorTrace: _context2.t0.toString()
              });

            case 36:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 33]]);
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

  }, {
    key: "createShipment",
    value: function createShipment(ctx, buyerCRN, drugName, listOfAssets, transporterCRN) {
      var shipmentKey, poIDCompKey, poIDKey, poIDBuffer, poIDDetails, transporterCompKey, transporterKey, listOfAssetArray, assets, i, drugCompKey, drugKey, drugKeyDetail, drugKeyBuffer, newShipmentObj, shipmentDataBuffer;
      return regeneratorRuntime.async(function createShipment$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return regeneratorRuntime.awrap(ctx.stub.createCompositeKey("org.pharma-network.shipmentKey", [buyerCRN, drugName]));

            case 3:
              shipmentKey = _context3.sent;
              _context3.next = 6;
              return regeneratorRuntime.awrap(ctx.stub.getStateByPartialCompositeKey("org.pharma-network.poIDKey", [buyerCRN]));

            case 6:
              poIDCompKey = _context3.sent;
              _context3.next = 9;
              return regeneratorRuntime.awrap(poIDCompKey.next());

            case 9:
              poIDKey = _context3.sent;
              _context3.next = 12;
              return regeneratorRuntime.awrap(ctx.stub.getState(poIDKey.value.key)["catch"](function (err) {
                console.log(err);
              }));

            case 12:
              poIDBuffer = _context3.sent;
              poIDDetails = JSON.parse(poIDBuffer.toString());
              _context3.next = 16;
              return regeneratorRuntime.awrap(ctx.stub.getStateByPartialCompositeKey("org.pharma-network.companyId", [transporterCRN]));

            case 16:
              transporterCompKey = _context3.sent;
              _context3.next = 19;
              return regeneratorRuntime.awrap(transporterCompKey.next());

            case 19:
              transporterKey = _context3.sent;
              //length of listofAsset == quantity specified in PO
              listOfAssetArray = listOfAssets.split(",");
              assets = []; //make sure quantity == length of list of assets

              if (!(listOfAssetArray.length == poIDDetails.quantity)) {
                _context3.next = 48;
                break;
              }

              _context3.prev = 23;
              i = 0;

            case 25:
              if (!(i < listOfAssetArray.length)) {
                _context3.next = 41;
                break;
              }

              _context3.next = 28;
              return regeneratorRuntime.awrap(ctx.stub.getStateByPartialCompositeKey("org.pharma-network.productIDKey", [listOfAssetArray[i]]));

            case 28:
              drugCompKey = _context3.sent;
              _context3.next = 31;
              return regeneratorRuntime.awrap(drugCompKey.next());

            case 31:
              drugKey = _context3.sent;
              assets.push(drugKey.value.key);
              _context3.next = 35;
              return regeneratorRuntime.awrap(ctx.stub.getState(drugKey.value.key)["catch"](function (err) {
                console.log(err);
              }));

            case 35:
              drugKeyDetail = _context3.sent;
              //veryfiying if the serial number passed in list of assests are valid and if they point to a drug which is registered on the network
              drugKeyBuffer = JSON.parse(drugKeyDetail.toString());
              drugKeyBuffer.owner = transporterKey.value.key;

            case 38:
              i++;
              _context3.next = 25;
              break;

            case 41:
              _context3.next = 46;
              break;

            case 43:
              _context3.prev = 43;
              _context3.t0 = _context3["catch"](23);
              console.log(_context3.t0 + " Error in the Drug validation process.");

            case 46:
              _context3.next = 49;
              break;

            case 48:
              return _context3.abrupt("return", {
                error: "Either the drug Quantity doesn't match with PO, or drug ID is not valid"
              });

            case 49:
              newShipmentObj = {
                shipmentID: shipmentKey,
                creator: poIDDetails.seller,
                assets: assets,
                transporter: transporterKey.value.key,
                status: "in-transit"
              };
              shipmentDataBuffer = Buffer.from(JSON.stringify(newShipmentObj));
              _context3.next = 53;
              return regeneratorRuntime.awrap(ctx.stub.putState(shipmentKey, shipmentDataBuffer));

            case 53:
              return _context3.abrupt("return", newShipmentObj);

            case 56:
              _context3.prev = 56;
              _context3.t1 = _context3["catch"](0);
              return _context3.abrupt("return", {
                error: "Unable to create Shipment on the network, check input parameters",
                errorTrace: _context3.t1.toString()
              });

            case 59:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 56], [23, 43]]);
    }
    /**
     *updateShipment on the network
     * @param ctx - The transaction context object
     * @param buyerCRN
     * @param drugName
     * @param transporterCRN
     * @returns - shipment object
     */

  }, {
    key: "updateShipment",
    value: function updateShipment(ctx, buyerCRN, drugName, transporterCRN) {
      var shipmentKey, shipmentBuffer, shipmentDetail, buyerCompKey, buyerKey, resultArray, i, drugKey, drugBuffer, drugDetail, drugDetailBuffer, shipmentDataBuffer;
      return regeneratorRuntime.async(function updateShipment$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;

              if (!(ctx.clientIdentity.getMSPID() != "transporterMSP")) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt("return", {
                error: "Only Transporter can invoke this function"
              });

            case 3:
              _context4.next = 5;
              return regeneratorRuntime.awrap(ctx.stub.createCompositeKey("org.pharma-network.shipmentKey", [buyerCRN, drugName]));

            case 5:
              shipmentKey = _context4.sent;
              _context4.next = 8;
              return regeneratorRuntime.awrap(ctx.stub.getState(shipmentKey)["catch"](function (err) {
                console.log(err);
              }));

            case 8:
              shipmentBuffer = _context4.sent;
              shipmentDetail = JSON.parse(shipmentBuffer.toString());
              shipmentDetail.status = "delivered";
              _context4.next = 13;
              return regeneratorRuntime.awrap(ctx.stub.getStateByPartialCompositeKey("org.pharma-network.companyId", [buyerCRN]));

            case 13:
              buyerCompKey = _context4.sent;
              _context4.next = 16;
              return regeneratorRuntime.awrap(buyerCompKey.next());

            case 16:
              buyerKey = _context4.sent;
              resultArray = [];
              _context4.prev = 18;
              i = 0;

            case 20:
              if (!(i < shipmentDetail.assets.length)) {
                _context4.next = 35;
                break;
              }

              drugKey = shipmentDetail.assets[i];
              _context4.next = 24;
              return regeneratorRuntime.awrap(ctx.stub.getState(drugKey)["catch"](function (err) {
                console.log(err);
              }));

            case 24:
              drugBuffer = _context4.sent;
              drugDetail = JSON.parse(drugBuffer.toString()); //fetching each drug from assets and updating its shipment and owner keys...

              drugDetail.shipment = shipmentKey;
              drugDetail.owner = buyerKey.value.key;
              drugDetailBuffer = Buffer.from(JSON.stringify(drugDetail));
              resultArray.push(drugDetail);
              _context4.next = 32;
              return regeneratorRuntime.awrap(ctx.stub.putState(drugKey, drugDetailBuffer));

            case 32:
              i++;
              _context4.next = 20;
              break;

            case 35:
              _context4.next = 40;
              break;

            case 37:
              _context4.prev = 37;
              _context4.t0 = _context4["catch"](18);
              console.log(_context4.t0 + " Error while updating drug owner");

            case 40:
              shipmentDataBuffer = Buffer.from(JSON.stringify(shipmentDetail));
              _context4.next = 43;
              return regeneratorRuntime.awrap(ctx.stub.putState(shipmentKey, shipmentDataBuffer));

            case 43:
              return _context4.abrupt("return", resultArray);

            case 46:
              _context4.prev = 46;
              _context4.t1 = _context4["catch"](0);
              return _context4.abrupt("return", {
                error: "Unable to update Shipment on the network, check input parameters",
                errorTrace: _context4.t1.toString()
              });

            case 49:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[0, 46], [18, 37]]);
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

  }, {
    key: "retailDrug",
    value: function retailDrug(ctx, drugName, serialNo, retailerCRN, customerAadhar) {
      var retailerCompKey, companyKey, drugKey, drugBuffer, drugDetail, drugBufferUpdate;
      return regeneratorRuntime.async(function retailDrug$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return regeneratorRuntime.awrap(ctx.stub.getStateByPartialCompositeKey("org.pharma-network.companyId", [retailerCRN]));

            case 3:
              retailerCompKey = _context5.sent;
              _context5.next = 6;
              return regeneratorRuntime.awrap(retailerCompKey.next());

            case 6:
              companyKey = _context5.sent;
              _context5.next = 9;
              return regeneratorRuntime.awrap(ctx.stub.createCompositeKey("org.pharma-network.productIDKey", [serialNo, drugName]));

            case 9:
              drugKey = _context5.sent;
              _context5.next = 12;
              return regeneratorRuntime.awrap(ctx.stub.getState(drugKey)["catch"](function (err) {
                console.log(err);
              }));

            case 12:
              drugBuffer = _context5.sent;
              drugDetail = JSON.parse(drugBuffer.toString());
              console.log("TEWSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
              console.log(drugDetail.owner + "company key " + companyKey.value.key); //making sure retailer who invoke the functions owns the Drug:

              if (!(drugDetail.owner != companyKey.value.key)) {
                _context5.next = 18;
                break;
              }

              return _context5.abrupt("return", {
                error: "This retailer doesn't own the Drug you are trying to buy, Please enter valid RetailerCRN"
              });

            case 18:
              //updating drug owner = customer Aadhar
              drugDetail.owner = customerAadhar;
              drugBufferUpdate = Buffer.from(JSON.stringify(drugDetail));
              _context5.next = 22;
              return regeneratorRuntime.awrap(ctx.stub.putState(drugKey, drugBufferUpdate));

            case 22:
              return _context5.abrupt("return", drugDetail);

            case 25:
              _context5.prev = 25;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", {
                error: "Unable to retail Drug on the network, check input parameters",
                errorTrace: _context5.t0.toString()
              });

            case 28:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[0, 25]]);
    }
  }]);

  return TransferDrug;
}(Contract);

module.exports = TransferDrug;